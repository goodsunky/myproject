function userManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var DEFAULT_IMAGE = 'ext-3.2.0/resources/images/default/gradient-bg.gif';
	var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
	var usertypestore=new Ext.data.SimpleStore({
			fields:['usertype'],
			data :[['系统管理员'],['教师'],['学生']]
		});
	var usersex=new Ext.data.SimpleStore({
		fields:['usersex'],
		data :[['男'],['女']]
	});
	var userposition=new Ext.data.SimpleStore({
		fields:['userposition'],
		data :[['教授'],['副教授'],['讲师'],['研究员'],['副研究员'],['高级工程师'],['学生']]
	});
	var usertypecombox = new Ext.form.ComboBox({
		id : 'userinfo.role',
		fieldLabel : '角色',
		store: usertypestore,
		emptyText: '请选择',
		mode: 'local',
		width : 128,
		triggerAction : 'all',
		valueField: 'usertype',
		displayField: 'usertype'
	});
	var usersexcombox = new Ext.form.ComboBox({
		id : 'userinfo.sex',
		fieldLabel : '性别',
		store: usersex,
		emptyText: '请选择',
		mode: 'local',
		width : 128,
		triggerAction : 'all',
		valueField: 'usersex',
		displayField: 'usersex'
	});
	var userpositioncombox = new Ext.form.ComboBox({
		id : 'userinfo.position',
		fieldLabel : '职称',
		store: userposition,
		emptyText: '请选择',
		mode: 'local',
		width : 128,
		triggerAction : 'all',
		valueField: 'userposition',
		displayField: 'userposition'
	});
	var pageStart = 0;
	var myPageSize = 20;
	var userRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'username',
				mapping : 'username'
			}, {
				name : 'password',
				mapping : 'password'
			}, {
				name : 'name',
				mapping : 'name'
			}, {
				name : 'sex',
				mapping : 'sex'
			}, {
				name : 'mail',
				mapping : 'mail'
			}, {
				name : 'role',
				mapping : 'role'
			}, {
				name : 'position',
				mapping : 'position'
			}, {
				name : 'image',
				mapping : 'image'
			}, {
				name : 'resguid',
				mapping : 'resguid'
			}, {
				name : 'number',
				mapping : 'number'
			}, {
				name : 'major',
				mapping : 'major'
			}, {
				name : 'telphone',
				mapping : 'telphone'
			}, {
				name : 'entrytime',
				mapping : 'entrytime'
			}, {
				name : 'story',
				mapping : 'story'
			}]);

	var userJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pageUserList',
				id : 'id'
			}, userRecord);

	var userDS = new Ext.data.Store({
				id : 'userDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'user/pageUserList.action',
							method : 'POST'
						}),
				reader : userJsReader,
				remoteSort : true
			});
	userDS.load({
				params : {
					start : pageStart,
					limit : myPageSize
				}
			});
	var sm = new Ext.grid.CheckboxSelectionModel();

	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), sm, {
				header : "ID",
				dataIndex : 'id',
				sortable : true,
				hidden : true
			}, {
				header : "用户名",
				dataIndex : 'username',
				sortable : true
			}, {
				header : "密码",
				dataIndex : 'password',
				sortable : true,
				hidden : true
			}, {
				header : "姓名",
				dataIndex : 'name',
				sortable : true
			}, {
				header : "性别",
				dataIndex : 'sex',
				sortable : true
			}, {
				header : "邮箱",
				dataIndex : 'mail',
				sortable : true
			}, {
				header : "角色",
				dataIndex : 'role',
				sortable : true
			}, {
				header : "职称",
				dataIndex : 'position',
				sortable : true,
				hidden : true
			}, {
				header : "头像",
				dataIndex : 'image',
				sortable : true,
				hidden : true
			}, {
				header : "研究方向",
				dataIndex : 'resguid',
				sortable : true,
				hidden : true
			}, {
				header : "工/学号",
				dataIndex : 'number',
				sortable : true
			}, {
				header : "专业",
				dataIndex : 'major',
				sortable : true,
				hidden : true
			}, {
				header : "联系方式",
				dataIndex : 'telphone',
				sortable : true
			}, {
				header : "入学时间",
				dataIndex : 'entrytime',
				sortable : true,
				hidden : true
			}, {
				header : "在校事迹",
				dataIndex : 'story',
				sortable : true,
				hidden : true
			}]); 

	var userGrid = new Ext.grid.GridPanel({
				ds : userDS,
				sm : sm,
				cm : cm,
				id : 'userManager',
				width : 1000,
				height : 500,
				title : '用户管理',
				iconCls : 'user',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加用户',
							tooltip : '添加一个新用户',
							iconCls : 'user-add',
							handler : userAddF
						}, '-', {
							text : '删除用户',
							tooltip : '删除所选中的用户',
							iconCls : 'user-delete',
							handler : userDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改用户信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									userUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : userDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有用户'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						userUpdateF(record, 'showOne');
					}
				}
			});

	return userGrid;

	// 添加新用户
	function userAddF() {
		var panelUserAdd = new Ext.FormPanel({
					id : 'panelUserAdd',
					frame : false,
					bodyStyle : 'padding:5px 5px 0',
					monitorValid : true,
					width : 630,
					autoHeight : true,
					buttonAlign : 'center',
					layout : 'column',
					border : false,
					fileUpload : true,
					items : [{
							columnWidth : .5,
							layout : 'form',
							border : false,
							items: [{
										xtype : 'textfield',
										fieldLabel : '用户名',
										id : 'userinfo.username', // 元素名称
										allowBlank : false, // 不允许为空
										blankText : '用户名不能为空!' // 错误提示内容
									},{
										xtype : 'textfield',
										inputType : 'password',
										fieldLabel : '密码',
										id : 'userinfo.password',
										allowBlank : false,
										blankText : '密码不能为空!'
									},{
										xtype : 'textfield',
										fieldLabel : '姓名',
										id : 'userinfo.name', // 元素名称
										allowBlank : false, // 不允许为空
										blankText : '姓名不能为空!' // 错误提示内容
									},
										new Ext.form.ComboBox({
										id : 'userinfo.sex',
										fieldLabel : '性别',
										store: usersex,
										emptyText: '请选择',
										mode: 'local',
										width : 128,
										triggerAction : 'all',
										valueField: 'usersex',
										displayField: 'usersex'
									}), {
										xtype : 'textfield',											
										fieldLabel : '邮箱',
										id : 'userinfo.mail',
										allowBlank : false,
										regex : /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/,
										regexText : '请按如下格式填写：test@163.com',
										//anchor : '90%',
										blankText : '邮箱不能为空!'
									},
										new Ext.form.ComboBox({
										id : 'userinfo.role',
										fieldLabel : '角色',
										store: usertypestore,
										emptyText: '请选择',
										mode: 'local',
										width : 128,
										triggerAction : 'all',
										valueField: 'usertype',
										displayField: 'usertype',
										allowBlank : false,
										blankText : '请选择角色'
									}),{
										xtype : 'textarea',											
										fieldLabel : '在校事迹',
										id : 'userinfo.story',
										width : 180,
										height: 158,
										allowBlank : true
									}]},
							{
							columnWidth : .5,
							layout : 'form',
							border : false,
							items: [
										new Ext.form.ComboBox({
										id : 'userinfo.position',
										fieldLabel : '职称',
										store: userposition,
										emptyText: '请选择',
										mode: 'local',
										width : 128,
										triggerAction : 'all',
										valueField: 'userposition',
										displayField: 'userposition'
									}),
									{
										xtype : 'textfield',
										fieldLabel : '研究方向',
										id : 'userinfo.resguid',
										allowBlank : true
									},{
										xtype : 'textfield',
										fieldLabel : '工/学号',
										id : 'userinfo.number', // 元素名称
										allowBlank : true
									},{
										xtype : 'textfield',											
										fieldLabel : '专业',
										id : 'userinfo.major',
										allowBlank : true
									}, {
										xtype : 'textfield',											
										fieldLabel : '电话',
										id : 'userinfo.telphone',
										allowBlank : true
									},{
										xtype : 'datefield',
										fieldLabel : '入学时间',
										width : 128,
										id : 'userinfo.entrytime',
										format : 'Y-m-d',
										allowBlank : true
									},new Ext.form.TextField({
											id : "file",
											fieldLabel : "头像",
											inputType : 'file'
									})]
							},
							{
								columnWidth : .5,
								layout : 'form',
								border : false,
								items: [
								{
								xtype : 'box',
								id : 'browseImage',
								fieldLabel : "头像预览",
								autoEl : {
									width : 130,
									height : 130,
									tag : 'img',
									src : DEFAULT_IMAGE,// Ext.BLANK_IMAGE_URL
									style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',
									complete : 'off',
									id : 'imageBrowse'
								}}]
							}],
					keys : [{
								key : 13, // 13代表回车
								fn : function() {
									document.getElementById('userSave').click();
								},
								scope : this
							}],
					buttons : [{
						id : 'userSave',
						text : '保存',
						formBind : true,
						handler : function() {
							panelUserAdd.form.doAction('submit', {
										url : 'user/userAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winUserAdd.destroy();
											userDS.reload();											
										},
										failure : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
										}
									});
						}
					}, {
						text : '重置',
						formBind : true,
						handler : function() {
							panelUserAdd.form.reset();
						}
					}],
					listeners : {
					'render' : function(f) {
						// upload file
						this.form.findField('file').on('render', function() {
							// 通過change事件
							Ext.get('file').on('change',
									function(field, newValue, oldValue) {
										var url = 'file:///'+ Ext.get('file').dom.value;
										// alert("url = " + url);
										if (img_reg.test(url)) {
											if (Ext.isIE) {
												var image = Ext.get('imageBrowse').dom;
												image.src = DEFAULT_IMAGE;// 覆盖原来的图片Ext.BLANK_IMAGE_URL
												image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
											}// 支持FF
											else {
												// console.log(Ext.get('uploadStyle').dom.files.item(0));
												// 火狐7以下用下面这句话
												// Ext.get('imageBrowse').dom.src =
												// top.Ext.get('uploadStyle').dom.files.item(0).getAsDataURL();
												// 从火狐7开始不再支持getAsDataURL
												var file = document.getElementById("file");
												var objectURL = window.URL.createObjectURL(file.files[0]);
												Ext.get('imageBrowse').dom.src = objectURL;
											}
										}
									}, this);
							}, this);
						}
					}
				});

		var winUserAdd = new Ext.Window({
					id : 'winUserAdd',
					title : "添加用户",
					layout : 'fit',
					width : 630,
					autoHeight : true,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelUserAdd
				});
		winUserAdd.show();
	}

	// 更新用户信息,查看单个用户的信息
	function userUpdateF(obj, choose) {		
		var panelUserUpdate = new Ext.FormPanel({
					id : 'panelUserUpdate',
					frame : false,
					bodyStyle : 'padding:5px 5px 0',
					monitorValid : true,
					width : 630,
					autoHeight : true,
					buttonAlign : 'center',
					layout : 'column',
					border : false,
					fileUpload : true,
					items : [{
							columnWidth : .5,
							layout : 'form',
							border : false,
							items: [{
										id : 'userinfo.image',
										xtype : 'textfield',
										hidden : true,
										value : obj.data.image							
									},
									{
										xtype : 'textfield',
										fieldLabel : '用户名',
										id : 'userinfo.username', // 元素名称
										allowBlank : false, // 不允许为空
										blankText : '用户名不能为空!', // 错误提示内容
										value : obj.data.username										
									},{
										xtype : 'textfield',
										inputType : 'password',
										fieldLabel : '密码',
										id : 'userinfo.password',
										allowBlank : false,
										blankText : '密码不能为空!',
										value : obj.data.password
									},{
										xtype : 'textfield',
										fieldLabel : '姓名',
										id : 'userinfo.name', // 元素名称
										allowBlank : false, // 不允许为空
										blankText : '姓名不能为空!', // 错误提示内容,
										value : obj.data.name
									},
										new Ext.form.ComboBox({
										id : 'userinfo.sex',
										fieldLabel : '性别',
										store: usersex,
										emptyText: '请选择',
										mode: 'local',
										width : 128,
										triggerAction : 'all',
										valueField: 'usersex',
										displayField: 'usersex',
										value : obj.data.sex
									}), {
										xtype : 'textfield',											
										fieldLabel : '邮箱',
										id : 'userinfo.mail',
										allowBlank : false,
										regex : /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/,
										regexText : '请按如下格式填写：test@163.com',
										//anchor : '90%',
										blankText : '邮箱不能为空!',
										value : obj.data.mail
									},
										new Ext.form.ComboBox({
										id : 'userinfo.role',
										fieldLabel : '角色',
										store: usertypestore,
										emptyText: '请选择',
										mode: 'local',
										width : 128,
										triggerAction : 'all',
										valueField: 'usertype',
										displayField: 'usertype',
										value : obj.data.role
									}),{
										xtype : 'textarea',											
										fieldLabel : '在校事迹',
										id : 'userinfo.story',
										width : 180,
										height: 150,
										allowBlank : true,
										value : obj.data.story
									}]},
							{
							columnWidth : .5,
							layout : 'form',
							border : false,
							items: [
										new Ext.form.ComboBox({
										id : 'userinfo.position',
										fieldLabel : '职称',
										store: userposition,
										emptyText: '请选择',
										mode: 'local',
										width : 128,
										triggerAction : 'all',
										valueField: 'userposition',
										displayField: 'userposition',
										value : obj.data.position
									}),
									{
										xtype : 'textfield',
										fieldLabel : '研究方向',
										id : 'userinfo.resguid',
										allowBlank : true,
										value : obj.data.resguid
									},{
										xtype : 'textfield',
										fieldLabel : '工/学号',
										id : 'userinfo.number', // 元素名称
										allowBlank : true,
										value : obj.data.number
									},{
										xtype : 'textfield',											
										fieldLabel : '专业',
										id : 'userinfo.major',
										allowBlank : true,
										value : obj.data.major
									}, {
										xtype : 'textfield',											
										fieldLabel : '电话',
										id : 'userinfo.telphone',
										allowBlank : true,
										value : obj.data.telphone
									},{
										xtype : 'datefield',
										fieldLabel : '入学时间',
										width : 128,
										id : 'userinfo.entrytime',
										format : 'Y-m-d',
										allowBlank : true,
										value : obj.data.entrytime
									},new Ext.form.TextField({
											id : "file",
											fieldLabel : "头像",
											inputType : 'file'
									})]
							},
							{
								columnWidth : .5,
								layout : 'form',
								border : false,
								items: [
								{
								xtype : 'box',
								id : 'browseImage',
								fieldLabel : "头像预览",
								autoEl : {
									width : 130,
									height : 130,
									tag : 'img',
									src : obj.data.image,// Ext.BLANK_IMAGE_URL
									style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',
									complete : 'off',
									id : 'imageBrowse'
								}}]
							}],
					buttons : [{
						id : 'updateB',
						text : '修改',
						formBind : true,
						type : 'submit',
						scope : this,
						handler : function() {
							panelUserUpdate.form.doAction('submit', {
										url : 'user/userUpdate.action',
										params : 'userinfo.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winUserUpdate.destroy();
											userDS.reload();
										},
										failure : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
										}
									});
						}
					}, {
						id : 'resetB',
						text : '取消',
						scope : this,
						formBind : true,
						handler : function() {
							winUserUpdate.destroy();
						}
					}],
					listeners : {
					'render' : function(f) {
						// upload file
						this.form.findField('file').on('render', function() {
							// 通過change事件
							Ext.get('file').on('change',
									function(field, newValue, oldValue) {
										var url = 'file:///'+ Ext.get('file').dom.value;
										// alert("url = " + url);
										if (img_reg.test(url)) {
											if (Ext.isIE) {
												var image = Ext.get('imageBrowse').dom;
												image.src = DEFAULT_IMAGE;// 覆盖原来的图片Ext.BLANK_IMAGE_URL
												image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
											}// 支持FF
											else {
												// console.log(Ext.get('uploadStyle').dom.files.item(0));
												// 火狐7以下用下面这句话
												// Ext.get('imageBrowse').dom.src =
												// top.Ext.get('uploadStyle').dom.files.item(0).getAsDataURL();
												// 从火狐7开始不再支持getAsDataURL
												var file = document.getElementById("file");
												var objectURL = window.URL.createObjectURL(file.files[0]);
												Ext.get('imageBrowse').dom.src = objectURL;
											}
										}
									}, this);
							}, this);
						}
					}
				});

		var winUserUpdate = new Ext.Window({
					id : 'winUserUpdate',
					title : "更新用户信息",
					layout : 'fit',
					width : 630,
					autoHeight : true,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelUserUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winUserUpdate.setTitle("用户信息");
			winUserUpdate.show();			
		} else {
			winUserUpdate.show();
		}
	}

	// 删除用户
	function userDeleteF() {
		var records = sm.getSelections();
		var del_ids = new Array();
		if (records.length == 0) {
			Ext.Msg.alert('提示', '未选中任何记录');
		} else {
			for (i = 0; i < records.length; i++) {
				del_ids.push(records[i].data.id);
			}
			Ext.Msg.confirm('提示', '确实要删除选中的记录吗？', function del(button) {
						if (button == 'yes') {
							Ext.Ajax.request({
										url : 'user/userDelete.action?del_ids='
												+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext
													.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											userDS.reload();
											Ext.Msg.alert('提示', object.message);
										},
										failure : function(response, options) {
											Ext.Msg.alert('提示', object.message);
										}
									});
						}
					})
		}
	}

};