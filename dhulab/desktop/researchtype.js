function researchtypeManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var researchtypeRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'typename',
				mapping : 'typename'
			}]);

	var researchtypeJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pageresearchtypeList',
				id : 'id'
			}, researchtypeRecord);

	var researchtypeDS = new Ext.data.Store({
				id : 'researchtypeDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'researchtype/pageresearchtypeList.action',
							method : 'POST'
						}),
				reader : researchtypeJsReader,
				remoteSort : true
			});
	researchtypeDS.load({
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
				header : "科研方向",
				dataIndex : 'typename',
				sortable : true
			}
				]);

	var researchtypeGrid = new Ext.grid.GridPanel({
				ds : researchtypeDS,
				sm : sm,
				cm : cm,
				id : 'researchtypeManager',
				width : 1000,
				autoHeight : false,
				//height : 500,
				title : '科研方向管理',
				iconCls : 'researchtype',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加科研方向',
							tooltip : '添加一个新科研方向',
							iconCls : 'add',
							handler : researchtypeAddF
						}, '-', {
							text : '删除科研方向',
							tooltip : '删除所选中的科研方向',
							iconCls : 'remove',
							handler : researchtypeDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改科研方向信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									researchtypeUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : researchtypeDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有科研方向'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						researchtypeUpdateF(record, 'showOne');
					}
				}
			});

	return researchtypeGrid;

	// 添加新科研方向
	function researchtypeAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelresearchtypeAdd = new Ext.FormPanel({
					id : 'panelresearchtypeAdd',
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
						fieldLabel : '科研方向',
					    id : 'researchtype.typename', // 元素名称
					    width: 200,
					    allowBlank: false,
						blankText : '科研方向不能为空'
					},
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panelresearchtypeAdd.form.doAction('submit', {
										url : 'researchtype/researchtypeAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winresearchtypeAdd.destroy();
											researchtypeDS.reload();											
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
							panelresearchtypeAdd.form.reset();
						}
					}]
		});

		var winresearchtypeAdd = new Ext.Window({
					id : 'winresearchtypeAdd',
					title : "添加科研方向",
					layout : 'fit',
					autoHeight :true,
					width : 400,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelresearchtypeAdd
				});
		winresearchtypeAdd.show();
	}

	// 更新科研方向信息,查看单个科研方向的信息
	// 添加新科研方向
	function researchtypeUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelresearchtypeUpdate = new Ext.FormPanel({
					id : 'panelresearchtypeUpdate',
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
						fieldLabel : '科研方向',
					    id : 'researchtype.typename', // 元素名称
					    width: 200,
					    allowBlank: false,
						blankText : '科研方向不能为空',
						value : obj.data.typename
					},
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panelresearchtypeUpdate.form.doAction('submit', {
										url : 'researchtype/researchtypeUpdate.action',
										params : 'researchtype.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winresearchtypeUpdate.destroy();
											researchtypeDS.reload();											
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
							winresearchtypeUpdate.destroy();
						}
					}]
		});

		var winresearchtypeUpdate = new Ext.Window({
					id : 'winresearchtypeUpdate',
					title : "更新科研方向",
					layout : 'fit',
					autoHeight :true,
					width : 400,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelresearchtypeUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winresearchtypeUpdate.setTitle("科研方向信息");
			winresearchtypeUpdate.show();			
		} else {
			winresearchtypeUpdate.show();
		}
	}

	// 删除科研方向
	function researchtypeDeleteF() {
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
										url : 'researchtype/researchtypeDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											researchtypeDS.reload();
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