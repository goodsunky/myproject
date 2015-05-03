function labintroductionManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var labintroductionRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'introduction',
				mapping : 'introduction'
			}, {
				name : 'modifytime',
				mapping : 'modifytime'
			}]);

	var labintroductionJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pagelabintroductionList',
				id : 'id'
			}, labintroductionRecord);

	var labintroductionDS = new Ext.data.Store({
				id : 'labintroductionDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'labintroduction/pagelabintroductionList.action',
							method : 'POST'
						}),
				reader : labintroductionJsReader,
				remoteSort : true
			});
	labintroductionDS.load({
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
				header : "介绍",
				dataIndex : 'introduction',
				sortable : true,
				renderer : function (value, cellmeta, record, rowIndex, columnIndex, store){
					return Ext.util.Format.substr(value,0,10);
				}
			}, {
				header : "修改时间",
				dataIndex : 'modifytime',
				sortable : true,
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
				}
				]);

	var labintroductionGrid = new Ext.grid.GridPanel({
				ds : labintroductionDS,
				sm : sm,
				cm : cm,
				id : 'labintroductionManager',
				width : 1000,
				height : 500,
				title : '实验室概述管理',
				iconCls : 'labintroduction',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加实验室概述',
							tooltip : '添加一个新实验室概述',
							iconCls : 'add',
							handler : labintroductionAddF
						}, '-', {
							text : '删除实验室概述',
							tooltip : '删除所选中的实验室概述',
							iconCls : 'remove',
							handler : labintroductionDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改实验室概述信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									labintroductionUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : labintroductionDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有实验室概述'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						labintroductionUpdateF(record, 'showOne');
					}
				}
			});

	return labintroductionGrid;

	// 添加新实验室概述
	function labintroductionAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panellabintroductionAdd = new Ext.FormPanel({
					id : 'panellabintroductionAdd',
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
						fieldLabel : '介绍',
					    id : 'labintroduction.introduction', // 元素名称
					    width: 450,
					    height: 300,
					    allowBlank: false,
						blankText : '介绍不能为空'
					})
					],
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panellabintroductionAdd.form.doAction('submit', {
										url : 'labintroduction/labintroductionAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winlabintroductionAdd.destroy();
											labintroductionDS.reload();											
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
							panellabintroductionAdd.form.reset();
						}
					}]
		});

		var winlabintroductionAdd = new Ext.Window({
					id : 'winlabintroductionAdd',
					title : "添加实验室概述",
					layout : 'fit',
					autoHeight :true,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panellabintroductionAdd
				});
		winlabintroductionAdd.show();
	}

	// 更新实验室概述信息,查看单个实验室概述的信息
	// 添加新实验室概述
	function labintroductionUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panellabintroductionUpdate = new Ext.FormPanel({
					id : 'panellabintroductionUpdate',
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
						fieldLabel : '介绍',
					    id : 'labintroduction.introduction', // 元素名称
					    width: 450,
					    height: 300,
					    allowBlank: false,
						blankText : '介绍不能为空',
						value : obj.data.introduction
					})
					],
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panellabintroductionUpdate.form.doAction('submit', {
										url : 'labintroduction/labintroductionUpdate.action',
										params : 'labintroduction.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winlabintroductionUpdate.destroy();
											labintroductionDS.reload();											
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
							winlabintroductionUpdate.destroy();
						}
					}]
		});

		var winlabintroductionUpdate = new Ext.Window({
					id : 'winlabintroductionUpdate',
					title : "更新实验室概述",
					layout : 'fit',
					autoHeight :true,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panellabintroductionUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winlabintroductionUpdate.setTitle("实验室概述信息");
			winlabintroductionUpdate.show();			
		} else {
			winlabintroductionUpdate.show();
		}
	}

	// 删除实验室概述
	function labintroductionDeleteF() {
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
										url : 'labintroduction/labintroductionDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											labintroductionDS.reload();
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