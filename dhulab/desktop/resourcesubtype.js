function resourcesubtypeManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var resourcesubtypeRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'subtype',
				mapping : 'subtype'
			}, {
				name : 'modifytime',
				mapping : 'modifytime'
			}]);

	var resourcesubtypeJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pageresourcesubtypeList',
				id : 'id'
			}, resourcesubtypeRecord);

	var resourcesubtypeDS = new Ext.data.Store({
				id : 'resourcesubtypeDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'resourcesubtype/pageresourcesubtypeList.action',
							method : 'POST'
						}),
				reader : resourcesubtypeJsReader,
				remoteSort : true
			});
	resourcesubtypeDS.load({
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
				header : "项目子类别",
				dataIndex : 'subtype',
				sortable : true
			}, {
				header : "修改时间",
				dataIndex : 'modifytime',
				sortable : true,
				renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}
				]);

	var resourcesubtypeGrid = new Ext.grid.GridPanel({
				ds : resourcesubtypeDS,
				sm : sm,
				cm : cm,
				id : 'resourcesubtypeManager',
				width : 1000,
				autoHeight : false,
				//height : 500,
				title : '项目子类别管理',
				iconCls : 'resourcesubtype',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加项目子类别',
							tooltip : '添加一个新项目子类别',
							iconCls : 'add',
							handler : resourcesubtypeAddF
						}, '-', {
							text : '删除项目子类别',
							tooltip : '删除所选中的项目子类别',
							iconCls : 'remove',
							handler : resourcesubtypeDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改项目子类别信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									resourcesubtypeUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : resourcesubtypeDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有项目子类别'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						resourcesubtypeUpdateF(record, 'showOne');
					}
				}
			});

	return resourcesubtypeGrid;

	// 添加新项目子类别
	function resourcesubtypeAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelresourcesubtypeAdd = new Ext.FormPanel({
					id : 'panelresourcesubtypeAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 400,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : {
						fieldLabel : '项目子类别',
					    id : 'resourcesubtype.subtype', // 元素名称
					    width: 200,
					    allowBlank: false,
						blankText : '项目子类别不能为空'
					},
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panelresourcesubtypeAdd.form.doAction('submit', {
										url : 'resourcesubtype/resourcesubtypeAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winresourcesubtypeAdd.destroy();
											resourcesubtypeDS.reload();											
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
							panelresourcesubtypeAdd.form.reset();
						}
					}]
		});

		var winresourcesubtypeAdd = new Ext.Window({
					id : 'winresourcesubtypeAdd',
					title : "添加项目子类别",
					layout : 'fit',
					autoHeight :true,
					width : 400,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelresourcesubtypeAdd
				});
		winresourcesubtypeAdd.show();
	}

	// 更新项目子类别信息,查看单个项目子类别的信息
	// 添加新项目子类别
	function resourcesubtypeUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelresourcesubtypeUpdate = new Ext.FormPanel({
					id : 'panelresourcesubtypeUpdate',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 400,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : {
						fieldLabel : '项目子类别',
					    id : 'resourcesubtype.subtype', // 元素名称
					    width: 200,
					    allowBlank: false,
						blankText : '项目子类别不能为空',
						value : obj.data.subtype
					},
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panelresourcesubtypeUpdate.form.doAction('submit', {
										url : 'resourcesubtype/resourcesubtypeUpdate.action',
										params : 'resourcesubtype.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winresourcesubtypeUpdate.destroy();
											resourcesubtypeDS.reload();											
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
							winresourcesubtypeUpdate.destroy();
						}
					}]
		});

		var winresourcesubtypeUpdate = new Ext.Window({
					id : 'winresourcesubtypeUpdate',
					title : "更新项目子类别",
					layout : 'fit',
					autoHeight :true,
					width : 400,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelresourcesubtypeUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winresourcesubtypeUpdate.setTitle("项目子类别信息");
			winresourcesubtypeUpdate.show();			
		} else {
			winresourcesubtypeUpdate.show();
		}
	}

	// 删除项目子类别
	function resourcesubtypeDeleteF() {
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
										url : 'resourcesubtype/resourcesubtypeDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											resourcesubtypeDS.reload();
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