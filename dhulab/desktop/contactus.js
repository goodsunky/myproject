function contactusManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var contactusRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'aboutus',
				mapping : 'aboutus'
			},{
				name : 'modifytime',
				mapping : 'modifytime'
			}]);

	var contactusJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pagecontactusList',
				id : 'id'
			}, contactusRecord);

	var contactusDS = new Ext.data.Store({
				id : 'contactusDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'contactus/pagecontactusList.action',
							method : 'POST'
						}),
				reader : contactusJsReader,
				remoteSort : true
			});
	contactusDS.load({
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
				header : "关于我们",
				dataIndex : 'aboutus',
				sortable : true,
				renderer : function (value, cellmeta, record, rowIndex, columnIndex, store){
					return Ext.util.Format.substr(value,0,10);
				}
			},
				{
				header : "修改时间",
				dataIndex : 'modifytime',
				type :'date',
				renderer : new Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
				sortable : true
				}
				]);

	var contactusGrid = new Ext.grid.GridPanel({
				ds : contactusDS,
				sm : sm,
				cm : cm,
				id : 'contactusManager',
				width : 1000,
				height : 500,
				title : '联系我们管理',
				iconCls : 'contactus',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加联系我们',
							tooltip : '添加一个新联系我们',
							iconCls : 'add',
							handler : contactusAddF
						}, '-', {
							text : '删除联系我们',
							tooltip : '删除所选中的联系我们',
							iconCls : 'remove',
							handler : contactusDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改联系我们信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									contactusUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : contactusDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有联系我们'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						contactusUpdateF(record, 'showOne');
					}
				}
			});

	return contactusGrid;

	// 添加新联系我们
	function contactusAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelcontactusAdd = new Ext.FormPanel({
					id : 'panelcontactusAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 600,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [new Ext.form.HtmlEditor({
						fieldLabel : '关于我们',
					    id : 'contactus.aboutus', // 元素名称
					    width: 450,
					    height: 300
					})
					],
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panelcontactusAdd.form.doAction('submit', {
										url : 'contactus/contactusAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											wincontactusAdd.destroy();
											contactusDS.reload();											
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
							panelcontactusAdd.form.reset();
						}
					}]
		});

		var wincontactusAdd = new Ext.Window({
					id : 'wincontactusAdd',
					title : "添加联系我们",
					layout : 'fit',
					autoHeight :true,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelcontactusAdd
				});
		wincontactusAdd.show();
	}

	// 更新联系我们信息,查看单个联系我们的信息
	// 添加新联系我们
	function contactusUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelcontactusUpdate = new Ext.FormPanel({
					id : 'panelcontactusUpdate',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 600,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [new Ext.form.HtmlEditor({
						fieldLabel : '关于我们',
					    id : 'contactus.aboutus', // 元素名称
					    width: 450,
					    height: 300,
					    value : obj.data.aboutus
					})
					],
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panelcontactusUpdate.form.doAction('submit', {
										url : 'contactus/contactusUpdate.action',
										params : 'contactus.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											wincontactusUpdate.destroy();
											contactusDS.reload();											
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
							wincontactusUpdate.destroy();
						}
					}]
		});

		var wincontactusUpdate = new Ext.Window({
					id : 'wincontactusUpdate',
					title : "更新联系我们",
					layout : 'fit',
					autoHeight :true,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelcontactusUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			wincontactusUpdate.setTitle("联系我们信息");
			wincontactusUpdate.show();			
		} else {
			wincontactusUpdate.show();
		}
	}

	// 删除联系我们
	function contactusDeleteF() {
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
										url : 'contactus/contactusDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											contactusDS.reload();
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