function labmemberManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	/*var majorstore=new Ext.data.SimpleStore({
			fields:['type'],
			data :[['计算机应用技术'],['计算机软件与理论']]
		});*/
	var majorstore=new Ext.data.JsonStore({
		url : 'major/allmajorList.action',
		totalProperty :'totalCount',
		root:'majorList',
		fields:['id','major']
		});
	var gradestore=new Ext.data.JsonStore({
		url : 'grade/allgradeList.action',
		totalProperty :'totalCount',
		root:'gradeList',
		fields:['id','grade']
		});
	var labmemberRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'grade',
				mapping : 'grade'
			}, {
				name : 'major',
				mapping : 'major'
			}, {
				name : 'member',
				mapping : 'member'
			},{
				name : 'modifytime',
				mapping : 'modifytime'
			}]);

	var labmemberJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pagelabmemberList',
				id : 'id'
			}, labmemberRecord);

	var labmemberDS = new Ext.data.Store({
				id : 'labmemberDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'labmember/pagelabmemberList.action',
							method : 'POST'
						}),
				reader : labmemberJsReader,
				remoteSort : true
			});
	labmemberDS.load({
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
				header : "年级",
				dataIndex : 'grade',
				sortable : true
			}, {
				header : "专业",
				dataIndex : 'major',
				sortable : true
			}, {
				header : "成员",
				dataIndex : 'member',
				sortable : true
				},
				{
				header : "修改时间",
				dataIndex : 'modifytime',
				sortable : true,
				type :'date',
				renderer : new Ext.util.Format.dateRenderer('Y-m-d H:i:s')
				}
				]);

	var labmemberGrid = new Ext.grid.GridPanel({
				ds : labmemberDS,
				sm : sm,
				cm : cm,
				id : 'labmemberManager',
				width : 1000,
				height : 500,
				title : '实验室成员管理',
				iconCls : 'labmember',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加实验室成员',
							tooltip : '添加一个新实验室成员',
							iconCls : 'add',
							handler : labmemberAddF
						}, '-', {
							text : '删除实验室成员',
							tooltip : '删除所选中的实验室成员',
							iconCls : 'remove',
							handler : labmemberDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改实验室成员信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									labmemberUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : labmemberDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有实验室成员'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						labmemberUpdateF(record, 'showOne');
					}
				}
			});

	return labmemberGrid;

	// 添加新实验室成员
	function labmemberAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panellabmemberAdd = new Ext.FormPanel({
					id : 'panellabmemberAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 450,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [new Ext.form.ComboBox({
						fieldLabel : '年级',
						store : gradestore,
						triggerAction : 'all',
						editable : false,
						loadingText : '正在加载年级',
						displayField : 'grade',
						valueField : 'grade',
						id : 'labmember.grade',
						mode : 'remote',
						allowBlank: false,
						emptyText : '请选择',
						blankText:'请选择年级'
						}),new Ext.form.ComboBox({
						fieldLabel : '专业',
						store : majorstore,
						id : 'labmember.major',
						emptyText : '请选择',
						triggerAction : 'all',
						editable : false,
						loadingText : '正在加载专业',
						displayField : 'major',
						valueField : 'major',
						mode : 'remote',
						allowBlank: false,
						blankText:'请选择专业'
						}),
						{
						fieldLabel : '成员',
						id : 'labmember.member', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '成员不能为空', // 错误提示内容
						width : 300
						}
					],
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panellabmemberAdd.form.doAction('submit', {
										url : 'labmember/labmemberAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winlabmemberAdd.destroy();
											labmemberDS.reload();											
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
							panellabmemberAdd.form.reset();
						}
					}]
		});

		var winlabmemberAdd = new Ext.Window({
					id : 'winlabmemberAdd',
					title : "添加实验室成员",
					layout : 'fit',
					autoHeight :true,
					width : 450,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panellabmemberAdd
				});
		winlabmemberAdd.show();
	}

	// 更新实验室成员信息,查看单个实验室成员的信息
	// 添加新实验室成员
	function labmemberUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panellabmemberUpdate = new Ext.FormPanel({
					id : 'panellabmemberUpdate',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 450,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [new Ext.form.ComboBox({
						fieldLabel : '年级',
						id : 'labmember.grade',
						store : gradestore,
						emptyText : '请选择',
						triggerAction : 'all',
						editable : false,
						loadingText : '正在加载年级',
						displayField : 'grade',
						valueField : 'grade',
						mode : 'remote',
						allowBlank: false,
						value:obj.data.grade,
						blankText:'请选择年级'
						}),new Ext.form.ComboBox({
						fieldLabel : '专业',
						store : majorstore,
						emptyText : '请选择',
						id : 'labmember.major',
						triggerAction : 'all',
						editable : false,
						loadingText : '正在加载专业',
						displayField : 'major',
						valueField : 'major',
						mode : 'remote',
						allowBlank: false,
						value:obj.data.major,
						blankText:'请选择专业'
						}),
					{
						fieldLabel : '成员',
						id : 'labmember.member', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '成员不能为空', // 错误提示内容
						width : 300,
						value : obj.data.member
					}
					],
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panellabmemberUpdate.form.doAction('submit', {
										url : 'labmember/labmemberUpdate.action',
										params : 'labmember.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winlabmemberUpdate.destroy();
											labmemberDS.reload();											
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
							winlabmemberUpdate.destroy();
						}
					}]
		});

		var winlabmemberUpdate = new Ext.Window({
					id : 'winlabmemberUpdate',
					title : "更新实验室成员",
					layout : 'fit',
					autoHeight :true,
					width : 450,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panellabmemberUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winlabmemberUpdate.setTitle("实验室成员信息");
			winlabmemberUpdate.show();			
		} else {
			winlabmemberUpdate.show();
		}
	}

	// 删除实验室成员
	function labmemberDeleteF() {
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
										url : 'labmember/labmemberDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											labmemberDS.reload();
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