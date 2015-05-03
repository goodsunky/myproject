function friendlylinkManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var friendlylinkRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'name',
				mapping : 'name'
			}, {
				name : 'address',
				mapping : 'address'
			}]);

	var friendlylinkJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pagefriendlylinkList',
				id : 'id'
			}, friendlylinkRecord);

	var friendlylinkDS = new Ext.data.Store({
				id : 'friendlylinkDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'friendlylink/pagefriendlylinkList.action',
							method : 'POST'
						}),
				reader : friendlylinkJsReader,
				remoteSort : true
			});
	friendlylinkDS.load({
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
				header : "名称 ",
				dataIndex : 'name',
				sortable : true
			}, {
				header : "链接",
				dataIndex : 'address',
				sortable : true
				}
				]);

	var friendlylinkGrid = new Ext.grid.GridPanel({
				ds : friendlylinkDS,
				sm : sm,
				cm : cm,
				id : 'friendlylinkManager',
				width : 1000,
				height : 500,
				title : '友情链接管理',
				iconCls : 'friendlylink',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加友情链接',
							tooltip : '添加一个新友情链接',
							iconCls : 'add',
							handler : friendlylinkAddF
						}, '-', {
							text : '删除友情链接',
							tooltip : '删除所选中的友情链接',
							iconCls : 'remove',
							handler : friendlylinkDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改友情链接信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									friendlylinkUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : friendlylinkDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有友情链接'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						friendlylinkUpdateF(record, 'showOne');
					}
				}
			});

	return friendlylinkGrid;

	// 添加新友情链接
	function friendlylinkAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelfriendlylinkAdd = new Ext.FormPanel({
					id : 'panelfriendlylinkAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 450,
					bodyStyle : 'padding:5px 5px 0',
					items : [{
						fieldLabel : '名称',
						id : 'friendlylink.name', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '名称不能为空', // 错误提示内容
						width : 300
					},{
						fieldLabel : '链接',
						id : 'friendlylink.address', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '链接不能为空', // 错误提示内容
						width : 300
					}
					],
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panelfriendlylinkAdd.form.doAction('submit', {
										url : 'friendlylink/friendlylinkAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winfriendlylinkAdd.destroy();
											friendlylinkDS.reload();											
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
							panelfriendlylinkAdd.form.reset();
						}
					}]
		});

		var winfriendlylinkAdd = new Ext.Window({
					id : 'winfriendlylinkAdd',
					title : "添加友情链接",
					layout : 'fit',
					autoHeight :true,
					width : 450,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelfriendlylinkAdd
				});
		winfriendlylinkAdd.show();
	}

	// 更新友情链接信息,查看单个友情链接的信息
	// 添加新友情链接
	function friendlylinkUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelfriendlylinkUpdate = new Ext.FormPanel({
					id : 'panelfriendlylinkUpdate',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 450,
					bodyStyle : 'padding:5px 5px 0',
					items : [{
						fieldLabel : '名称',
						id : 'friendlylink.name', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '名称不能为空', // 错误提示内容
						width : 300,
						value : obj.data.name
					},{
						fieldLabel : '链接',
						id : 'friendlylink.address', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '链接不能为空', // 错误提示内容
						width : 300,
						value : obj.data.address
					}
					],
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panelfriendlylinkUpdate.form.doAction('submit', {
										url : 'friendlylink/friendlylinkUpdate.action',
										params : 'friendlylink.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winfriendlylinkUpdate.destroy();
											friendlylinkDS.reload();											
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
							winfriendlylinkUpdate.destroy();
						}
					}]
		});

		var winfriendlylinkUpdate = new Ext.Window({
					id : 'winfriendlylinkUpdate',
					title : "更新友情链接",
					layout : 'fit',
					autoHeight :true,
					width : 450,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelfriendlylinkUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winfriendlylinkUpdate.setTitle("友情链接信息");
			winfriendlylinkUpdate.show();			
		} else {
			winfriendlylinkUpdate.show();
		}
	}

	// 删除友情链接
	function friendlylinkDeleteF() {
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
										url : 'friendlylink/friendlylinkDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											friendlylinkDS.reload();
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