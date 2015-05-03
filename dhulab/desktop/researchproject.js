function researchprojectManager(nodeTxt, researchtypeid, center) {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var researchprojectRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			},{
				name : 'typename',
				mapping : 'researchType.typename'
			}/*,{
				name : 'typeid',
				mapping : 'researchType.id'
			}*/,
			{
				name : 'name',
				mapping : 'name'
			}, {
				name : 'introduction',
				mapping : 'introduction'
			},  {
				name : 'resp',
				mapping : 'resp'
			},{
				name : 'member',
				mapping : 'member'
			},{
				name : 'respcont',
				mapping : 'respcont'
			},{
				name : 'sche',
				mapping : 'sche'
			},{
				name : 'starttime',
				mapping : 'starttime'
			},{
				name : 'endtime',
				mapping : 'endtime'
			},{
				name : 'issuetime',
				mapping : 'issuetime'
			}]);

	var researchprojectJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pageresearchprojectList',
				id : 'id'
			}, researchprojectRecord);
	
	var researchtypestore=new Ext.data.JsonStore({
	url : 'researchtype/allresearchtypeList.action',
	totalProperty :'totalCount',
	root:'researchtypeList',
	fields:['id','typename']
	});
	
	var researchprojectDS = new Ext.data.Store({
				id : 'researchprojectDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'researchproject/pageresearchprojectList.action?researchproject.researchType.id='+researchtypeid,
							method : 'POST'
						}),
				reader : researchprojectJsReader,
				remoteSort : true
			});
	researchprojectDS.load({
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
			},{
				header : "typeid",
				dataIndex : 'typeid',
				sortable : true,
				hidden : true
			},{
				header : "科研方向",
				hidden : true,
				dataIndex : 'typename',
				sortable : true
			}, {
				header : "项目名称",
				dataIndex : 'name',
				sortable : true
			}, {
				header : "项目简介",
				dataIndex : 'introduction',
				sortable : true,
				//hidden : true,
				renderer : function (value, cellmeta, record, rowIndex, columnIndex, store){
					return Ext.util.Format.substr(value,0,10);
				}
				},
				{
				header : "项目负责人",
				dataIndex : 'resp',
				sortable : true
				},
				{
				header : "项目成员",
				dataIndex : 'member',
				sortable : true
				},
				{
				header : "成员负责内容",
				dataIndex : 'respcont',
				sortable : true,
				hidden : true,
				renderer : function (value, cellmeta, record, rowIndex, columnIndex, store){
					return Ext.util.Format.substr(value,0,10);
				}
				},
				{
				header : "项目进度表",
				dataIndex : 'sche',
				sortable : true,
				hidden : true,
				renderer : function (value, cellmeta, record, rowIndex, columnIndex, store){
					return Ext.util.Format.substr(value,0,10);
				}
				},
				{
				header : "开始时间",
				dataIndex : 'starttime',
				sortable : true
				},
				{
				header : "结束时间",
				dataIndex : 'endtime',
				sortable : true
				},
				{
				header : "发布时间",
				dataIndex : 'issuetime',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
				sortable : true
				}
				]);

	var researchprojectGrid = new Ext.grid.GridPanel({
				ds : researchprojectDS,
				sm : sm,
				cm : cm,
				id : 'researchprojectManager'+researchtypeid,
				width : 1000,
				//height : 500,
				autoHeight : false,
				title : nodeTxt,
				iconCls : 'researchproject',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加'+nodeTxt+'项目',
							tooltip : '添加一个新'+nodeTxt+'项目',
							iconCls : 'add',
							handler : researchprojectAddF
						}, '-', {
							text : '删除'+nodeTxt+'项目',
							tooltip : '删除所选中的'+nodeTxt+'项目',
							iconCls : 'remove',
							handler : researchprojectDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改'+nodeTxt+'项目信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									researchprojectUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : researchprojectDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有'+nodeTxt+'项目'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						researchprojectUpdateF(record, 'showOne');
					}
				}
			});

	return researchprojectGrid;

	/*
	var tabPage = center.add({ // 动态添加选项页
		id : researchprojectId,
		title : nodeTxt, // 选项页标题
		height : 500, // 高度
		layout : "fit", // 布局方式
		items : [ // 子面板
		researchprojectGrid// 添加表单面板
		],
		listeners : { // 注册监听器
		},
		closable : true
			// 允许关闭
	})
	center.setActiveTab(tabPage); // 设置当前选项页
	tabPage.on('close', function() {
				this.destroy(true);
				researchprojectGrid.destroy(true);
			});*/

	// 添加新科研项目
	function researchprojectAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelresearchprojectAdd = new Ext.FormPanel({
					id : 'panelresearchprojectAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					width : 600,
					autoHeight : true,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [
						/*new Ext.form.ComboBox({
						fieldLabel : '科研方向',
						store : researchtypestore,
						id : 'researchtype',
						hiddenName : 'researchproject.researchType.id',
						emptyText : '请选择',
						triggerAction : 'all',
						editable : false,
						loadingText : '正在加载科研方向',
						displayField : 'typename',
						valueField : 'id',
						mode : 'remote',
						allowBlank: false,
						blankText:'请选择科研方向'
						}),*/
						{
							id : 'researchproject.researchType.id',
							xtype : 'textfield',
							hidden : true,
							value : researchtypeid		
						},
						{
						fieldLabel : '项目名称',
						id : 'researchproject.name', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '项目名称不能为空', // 错误提示内容
						width : 450 
					},new Ext.form.HtmlEditor({
						fieldLabel : '项目简介',
					    id : 'researchproject.introduction', // 元素名称
					    width: 450,
					    height: 120
					}),new Ext.form.TextField({
						id : "researchproject.resp",
						fieldLabel : "项目负责人",
						width: 450,
						allowBlank : false,
						blankText : '项目负责人不能为空'
					}),new Ext.form.TextField({
						id : "researchproject.member",
						fieldLabel : "项目成员",		
						allowBlank : true,
						width: 450
					}),new Ext.form.HtmlEditor({
						id : "researchproject.respcont",
						fieldLabel : "成员负责内容",
						allowBlank : true,
						width: 450,
					    height: 100
					}),new Ext.form.HtmlEditor({
						id : "researchproject.sche",
						fieldLabel : "项目进度表",
						width: 450,
					    height: 100,
						allowBlank : true
					}),new Ext.form.DateField({
						id : "researchproject.starttime",
						fieldLabel : "开始时间",
						width : 128,
						format : 'Y-m-d',
						allowBlank : true
					}),new Ext.form.DateField({
						id : "researchproject.endtime",
						fieldLabel : "结束时间",
						width : 128,
						format : 'Y-m-d',
						allowBlank : true
					}),new Ext.form.TextField({
						id : "file",
						fieldLabel : "附件",
						inputType : 'file'
					})
					],
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panelresearchprojectAdd.form.doAction('submit', {
										url : 'researchproject/researchprojectAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winresearchprojectAdd.destroy();
											researchprojectDS.reload();											
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
							panelresearchprojectAdd.form.reset();
						}
					}]
		});

		var winresearchprojectAdd = new Ext.Window({
					id : 'winresearchprojectAdd',
					title : "添加"+nodeTxt+"项目",
					layout : 'fit',					
					width : 600,
					autoHeight : true,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelresearchprojectAdd
				});
		winresearchprojectAdd.show();
	}

	// 更新科研项目信息,查看单个公告通知的信息
	// 添加新科研项目
	function researchprojectUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		//researchtypestore.reload();
		var panelresearchprojectUpdate = new Ext.FormPanel({
					id : 'panelresearchprojectUpdate',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					width : 600,
					autoHeight : true,
					frame : false,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [
						/*new Ext.form.ComboBox({
						id : 'researchtype',
						fieldLabel : '科研方向',
						store : researchtypestore,
						//id : 'researchproject.typeid',
						hiddenName : 'researchproject.researchType.id',
						emptyText : '请选择',
						triggerAction : 'all',
						editable : false,
						loadingText : '正在加载科研方向',
						displayField : 'typename',
						valueField : 'id',
						mode : 'remote',
						allowBlank: false,
						blankText:'请选择科研方向',
						value : obj.data.typename
						})*/
						{
							id : 'researchproject.researchType.id',
							xtype : 'textfield',
							hidden : true,
							value : researchtypeid		
						},
						{
						fieldLabel : '项目名称',
						id : 'researchproject.name', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '项目名称不能为空', // 错误提示内容
						width : 450 ,
						value : obj.data.name
					},new Ext.form.HtmlEditor({
						fieldLabel : '项目简介',
					    id : 'researchproject.introduction', // 元素名称
					    width: 450,
					    height: 120,
						value : obj.data.introduction
					}),new Ext.form.TextField({
						id : "researchproject.resp",
						fieldLabel : "项目负责人",
						width: 450,
						allowBlank : false,
						blankText : '项目负责人不能为空',
						value : obj.data.resp
					}),new Ext.form.TextField({
						id : "researchproject.member",
						fieldLabel : "项目成员",		
						allowBlank : true,
						width: 450,
						value : obj.data.member
					}),new Ext.form.HtmlEditor({
						id : "researchproject.respcont",
						fieldLabel : "成员负责内容",
						allowBlank : true,
						width: 450,
					    height: 100,
						value : obj.data.respcont
					}),new Ext.form.HtmlEditor({
						id : "researchproject.sche",
						fieldLabel : "项目进度表",
						width: 450,
					    height: 100,
						allowBlank : true,
						value : obj.data.sche
					}),new Ext.form.DateField({
						id : "researchproject.starttime",
						fieldLabel : "开始时间",
						width : 128,
						format : 'Y-m-d',
						allowBlank : true,
						value : obj.data.starttime
					}),new Ext.form.DateField({
						id : "researchproject.endtime",
						fieldLabel : "结束时间",
						width : 128,
						format : 'Y-m-d',
						allowBlank : true,
						value : obj.data.endtime
					}),new Ext.form.TextField({
						id : "file",
						fieldLabel : "附件",
						inputType : 'file'
					})
					],
					buttons : [{						
						id : 'updateB',
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panelresearchprojectUpdate.form.doAction('submit', {
										url : 'researchproject/researchprojectUpdate.action',
										params : 'researchproject.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winresearchprojectUpdate.destroy();
											researchprojectDS.reload();											
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
							winresearchprojectUpdate.destroy();
						}
					}]
		});

		var winresearchprojectUpdate = new Ext.Window({
					id : 'winresearchprojectUpdate',
					title : "更新"+nodeTxt+"项目",
					layout : 'fit',
					width : 600,
					autoHeight : true,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelresearchprojectUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winresearchprojectUpdate.setTitle(nodeTxt+"项目信息");
			winresearchprojectUpdate.show();			
			//var researchtypecombox= Ext.getCmp('researchtype');
			//researchtypecombox.fireEvent('select',researchtypecombox);
		} else {
			winresearchprojectUpdate.show();
		}
		/*var researchtypecombox= Ext.getCmp('researchtype');
   		researchtypecombox.setValue(obj.data.typeid);
   		researchtypecombox.setRawValue(obj.data.typename);*/
	}

	// 删除科研项目
	function researchprojectDeleteF() {
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
										url : 'researchproject/researchprojectDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											researchprojectDS.reload();
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