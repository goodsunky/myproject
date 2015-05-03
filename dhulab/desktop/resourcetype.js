function resourcetypeManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var resourcetypeRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'type',
				mapping : 'type'
			}, {
				name : 'modifytime',
				mapping : 'modifytime'
			}]);

	var resourcetypeJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pageresourcetypeList',
				id : 'id'
			}, resourcetypeRecord);

	var resourcetypeDS = new Ext.data.Store({
				id : 'resourcetypeDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'resourcetype/pageresourcetypeList.action',
							method : 'POST'
						}),
				reader : resourcetypeJsReader,
				remoteSort : true
			});
	resourcetypeDS.load({
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
				header : "项目类别",
				dataIndex : 'type',
				sortable : true
			}, {
				header : "修改时间",
				dataIndex : 'modifytime',
				sortable : true,
				renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}
				]);

	var resourcetypeGrid = new Ext.grid.GridPanel({
				ds : resourcetypeDS,
				sm : sm,
				cm : cm,
				id : 'resourcetypeManager',
				width : 1000,
				autoHeight : false,
				//height : 500,
				title : '项目类别管理',
				iconCls : 'resourcetype',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加项目类别',
							tooltip : '添加一个新项目类别',
							iconCls : 'add',
							handler : resourcetypeAddF
						}, '-', {
							text : '删除项目类别',
							tooltip : '删除所选中的项目类别',
							iconCls : 'remove',
							handler : resourcetypeDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改项目类别信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									resourcetypeUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : resourcetypeDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有项目类别'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						resourcetypeUpdateF(record, 'showOne');
					}
				}
			});

	return resourcetypeGrid;

	// 添加新项目类别
	function resourcetypeAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelresourcetypeAdd = new Ext.FormPanel({
					id : 'panelresourcetypeAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 400,
					bodyStyle : 'padding:5px 5px 0',
					//fileUpload : true,
					items : {
						fieldLabel : '项目类别',
					    id : 'resourcetype.type', // 元素名称
					    width: 200,
					    allowBlank: false,
						blankText : '项目类别不能为空'
					},
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panelresourcetypeAdd.form.doAction('submit', {
										url : 'resourcetype/resourcetypeAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winresourcetypeAdd.destroy();
											resourcetypeDS.reload();											
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
							panelresourcetypeAdd.form.reset();
						}
					}]
		});

		var winresourcetypeAdd = new Ext.Window({
					id : 'winresourcetypeAdd',
					title : "添加项目类别",
					layout : 'fit',
					autoHeight :true,
					width : 400,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelresourcetypeAdd
				});
		winresourcetypeAdd.show();
	}

	// 更新项目类别信息,查看单个项目类别的信息
	// 添加新项目类别
	function resourcetypeUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelresourcetypeUpdate = new Ext.FormPanel({
					id : 'panelresourcetypeUpdate',
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
						fieldLabel : '项目类别',
					    id : 'resourcetype.type', // 元素名称
					    width: 200,
					    allowBlank: false,
						blankText : '项目类别不能为空',
						value : obj.data.type
					},
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panelresourcetypeUpdate.form.doAction('submit', {
										url : 'resourcetype/resourcetypeUpdate.action',
										params : 'resourcetype.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winresourcetypeUpdate.destroy();
											resourcetypeDS.reload();											
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
							winresourcetypeUpdate.destroy();
						}
					}]
		});

		var winresourcetypeUpdate = new Ext.Window({
					id : 'winresourcetypeUpdate',
					title : "更新项目类别",
					layout : 'fit',
					autoHeight :true,
					width : 400,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelresourcetypeUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winresourcetypeUpdate.setTitle("项目类别信息");
			winresourcetypeUpdate.show();			
		} else {
			winresourcetypeUpdate.show();
		}
	}

	// 删除项目类别
	function resourcetypeDeleteF() {
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
										url : 'resourcetype/resourcetypeDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											resourcetypeDS.reload();
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