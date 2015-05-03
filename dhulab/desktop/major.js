function majorManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var majorRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'major',
				mapping : 'major'
			}, {
				name : 'modifytime',
				mapping : 'modifytime'
			}]);

	var majorJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pagemajorList',
				id : 'id'
			}, majorRecord);

	var majorDS = new Ext.data.Store({
				id : 'majorDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'major/pagemajorList.action',
							method : 'POST'
						}),
				reader : majorJsReader,
				remoteSort : true
			});
	majorDS.load({
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
				header : "专业",
				dataIndex : 'major',
				sortable : true
			}, {
				header : "修改时间",
				dataIndex : 'modifytime',
				sortable : true,
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
				}
				]);

	var majorGrid = new Ext.grid.GridPanel({
				ds : majorDS,
				sm : sm,
				cm : cm,
				id : 'majorManager',
				width : 1000,
				height : 500,
				title : '专业管理',
				iconCls : 'major',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加专业',
							tooltip : '添加一个新专业',
							iconCls : 'add',
							handler : majorAddF
						}, '-', {
							text : '删除专业',
							tooltip : '删除所选中的专业',
							iconCls : 'remove',
							handler : majorDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改专业信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									majorUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : majorDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有专业'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						majorUpdateF(record, 'showOne');
					}
				}
			});

	return majorGrid;

	// 添加新专业
	function majorAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelmajorAdd = new Ext.FormPanel({
					id : 'panelmajorAdd',
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
						fieldLabel : '专业',
					    id : 'major.major', // 元素名称
					    width: 200,
					    allowBlank: false,
						blankText : '专业不能为空'
					},
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panelmajorAdd.form.doAction('submit', {
										url : 'major/majorAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winmajorAdd.destroy();
											majorDS.reload();											
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
							panelmajorAdd.form.reset();
						}
					}]
		});

		var winmajorAdd = new Ext.Window({
					id : 'winmajorAdd',
					title : "添加专业",
					layout : 'fit',
					autoHeight :true,
					width : 400,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelmajorAdd
				});
		winmajorAdd.show();
	}

	// 更新专业信息,查看单个专业的信息
	// 添加新专业
	function majorUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelmajorUpdate = new Ext.FormPanel({
					id : 'panelmajorUpdate',
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
						fieldLabel : '专业',
					    id : 'major.major', // 元素名称
					    width: 200,
					    allowBlank: false,
						blankText : '专业不能为空',
						value : obj.data.major
					},
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panelmajorUpdate.form.doAction('submit', {
										url : 'major/majorUpdate.action',
										params : 'major.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winmajorUpdate.destroy();
											majorDS.reload();											
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
							winmajorUpdate.destroy();
						}
					}]
		});

		var winmajorUpdate = new Ext.Window({
					id : 'winmajorUpdate',
					title : "更新专业",
					layout : 'fit',
					autoHeight :true,
					width : 400,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelmajorUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winmajorUpdate.setTitle("专业信息");
			winmajorUpdate.show();			
		} else {
			winmajorUpdate.show();
		}
	}

	// 删除专业
	function majorDeleteF() {
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
										url : 'major/majorDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											majorDS.reload();
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