function noticeinfoManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var noticetypestore=new Ext.data.SimpleStore({
			fields:['type'],
			data :[['公告通知'],['学术活动']]
		});
	var noticeinfoRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'title',
				mapping : 'title'
			}, {
				name : 'content',
				mapping : 'content'
			},  {
				name : 'readcount',
				mapping : 'readcount'
			},{
				name : 'type',
				mapping : 'type'
			},{
				name : 'time',
				mapping : 'time'
			}]);

	var noticeinfoJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pageNoticeInfoList',
				id : 'id'
			}, noticeinfoRecord);

	var noticeinfoDS = new Ext.data.Store({
				id : 'noticeinfoDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'noticeinfo/pageNoticeInfoList.action',
							method : 'POST'
						}),
				reader : noticeinfoJsReader,
				remoteSort : true
			});
	noticeinfoDS.load({
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
				header : "标题",
				dataIndex : 'title',
				sortable : true
			}, {
				header : "内容",
				dataIndex : 'content',
				sortable : true,
				renderer : function (value, cellmeta, record, rowIndex, columnIndex, store){
					return Ext.util.Format.substr(value,0,10);
				}
				},
				{
				header : "阅读次数",
				dataIndex : 'readcount',
				sortable : true
				},
				{
				header : "类型",
				dataIndex : 'type',
				sortable : true
				},
				{
				header : "时间",
				dataIndex : 'time',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
				sortable : true
				}
				]);

	var noticeinfoGrid = new Ext.grid.GridPanel({
				ds : noticeinfoDS,
				sm : sm,
				cm : cm,
				id : 'noticeinfoManager',
				width : 1000,
				//autoHeight : false,
				height : 500,
				title : '公告通知管理',
				iconCls : 'noticeinfo',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加公告通知',
							tooltip : '添加一个新公告通知',
							iconCls : 'add',
							handler : noticeinfoAddF
						}, '-', {
							text : '删除公告通知',
							tooltip : '删除所选中的公告通知',
							iconCls : 'remove',
							handler : noticeinfoDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改公告通知信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									noticeinfoUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : noticeinfoDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有公告通知'
						})/*,
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						noticeinfoUpdateF(record, 'showOne');
					}
				}*/
			});

	return noticeinfoGrid;

	// 添加新公告通知
	function noticeinfoAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelnoticeinfoAdd = new Ext.FormPanel({
					id : 'panelnoticeinfoAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [new Ext.form.ComboBox({
						hiddenName : 'noticeinfo.type',
						fieldLabel : '公告类型',
						store : noticetypestore,
						triggerAction : 'all',
						editable : false,
						loadingText : '正在加载公告类型信息',
						displayField : 'type',
						valueField : 'type',
						mode : 'local',
						allowBlank: false,
						width : 150 ,
						blankText:'请选择公告类型',
						emptyText: '请选择'
					}),{
						fieldLabel : '标题',
						id : 'noticeinfo.title', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '标题不能为空', // 错误提示内容
						width : 450
					},new Ext.form.HtmlEditor({
						fieldLabel : '内容',
					    id : 'noticeinfo.content', // 元素名称
					    width: 450,
					    height: 300,
					    allowBlank: false,
						blankText : '内容不能为空'
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
							panelnoticeinfoAdd.form.doAction('submit', {
										url : 'noticeinfo/noticeinfoAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winnoticeinfoAdd.destroy();
											noticeinfoDS.reload();											
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
							panelnoticeinfoAdd.form.reset();
						}
					}]
		});

		var winnoticeinfoAdd = new Ext.Window({
					id : 'winnoticeinfoAdd',
					title : "添加公告通知",
					layout : 'fit',
					height : 500,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelnoticeinfoAdd
				});
		winnoticeinfoAdd.show();
	}

	// 更新公告通知信息,查看单个公告通知的信息
	// 添加新公告通知
	function noticeinfoUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelnoticeinfoUpdate = new Ext.FormPanel({
					id : 'panelnoticeinfoUpdate',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [new Ext.form.ComboBox({
						id : 'noticeinfo.type',
						fieldLabel : '公告类型',
						store : noticetypestore,
						triggerAction : 'all',
						editable : false,
						loadingText : '正在加载公告类型信息',
						displayField : 'type',
						valueField : 'type',
						mode : 'local',
						allowBlank: false,
						width : 150 ,
						blankText:'请选择公告类型',
						value : obj.data.type,
						emptyText: '请选择'
					}),{
						fieldLabel : '标题',
						id : 'noticeinfo.title', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '标题不能为空', // 错误提示内容
						width : 450,
						value : obj.data.title
					},new Ext.form.HtmlEditor({
						fieldLabel : '内容',
					    id : 'noticeinfo.content', // 元素名称
					    width: 450,
					    height: 300,
					    allowBlank: false,
						blankText : '内容不能为空',
						value : obj.data.content
					}),new Ext.form.TextField({
						id : "file",
						fieldLabel : "附件",
						inputType : 'file'
					}),new Ext.form.TextField({
						id : "noticeinfo.readcount",
						xtype : 'textfield',
						hidden : true,
						value : obj.data.readcount
					})
					],
					buttons : [{
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panelnoticeinfoUpdate.form.doAction('submit', {
										url : 'noticeinfo/noticeinfoUpdate.action',
										params : 'noticeinfo.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winnoticeinfoUpdate.destroy();
											noticeinfoDS.reload();											
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
							winnoticeinfoUpdate.destroy();
						}
					}]
		});

		var winnoticeinfoUpdate = new Ext.Window({
					id : 'winnoticeinfoUpdate',
					title : "更新公告通知",
					layout : 'fit',
					height : 500,
					//autoWidth :false,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelnoticeinfoUpdate
				});
		winnoticeinfoUpdate.show();
	}

	// 删除公告通知
	function noticeinfoDeleteF() {
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
										url : 'noticeinfo/noticeinfoDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											noticeinfoDS.reload();
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