function labfacilityManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var labfacilityRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'title',
				mapping : 'title'
			}, {
				name : 'introduction',
				mapping : 'introduction'
			},{
				name : 'time',
				mapping : 'time'
			}]);

	var labfacilityJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pagelabfacilityList',
				id : 'id'
			}, labfacilityRecord);

	var labfacilityDS = new Ext.data.Store({
				id : 'labfacilityDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'labfacility/pagelabfacilityList.action',
							method : 'POST'
						}),
				reader : labfacilityJsReader,
				remoteSort : true
			});
	labfacilityDS.load({
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
				dataIndex : 'introduction',
				sortable : true
				},
				{
				header : "时间",
				dataIndex : 'time',
				sortable : true
				}
				]);

	var labfacilityGrid = new Ext.grid.GridPanel({
				ds : labfacilityDS,
				sm : sm,
				cm : cm,
				id : 'labfacilityManager',
				width : 1000,
				height : 500,
				title : '实验室设施管理',
				iconCls : 'labfacility',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加实验室设施',
							tooltip : '添加一个新实验室设施',
							iconCls : 'add',
							handler : labfacilityAddF
						}, '-', {
							text : '删除实验室设施',
							tooltip : '删除所选中的实验室设施',
							iconCls : 'remove',
							handler : labfacilityDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改实验室设施信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									labfacilityUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : labfacilityDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有实验室设施'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						labfacilityUpdateF(record, 'showOne');
					}
				}
			});

	return labfacilityGrid;

	// 添加新实验室设施
	function labfacilityAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panellabfacilityAdd = new Ext.FormPanel({
					id : 'panellabfacilityAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 600,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [{
						fieldLabel : '标题',
						id : 'labfacility.title', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '标题不能为空', // 错误提示内容
						width : 450
					},new Ext.form.HtmlEditor({
						fieldLabel : '内容',
					    id : 'labfacility.introduction', // 元素名称
					    width: 450,
					    height: 300
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
							panellabfacilityAdd.form.doAction('submit', {
										url : 'labfacility/labfacilityAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winlabfacilityAdd.destroy();
											labfacilityDS.reload();											
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
							panellabfacilityAdd.form.reset();
						}
					}]
		});

		var winlabfacilityAdd = new Ext.Window({
					id : 'winlabfacilityAdd',
					title : "添加实验室设施",
					layout : 'fit',
					autoHeight :true,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panellabfacilityAdd
				});
		winlabfacilityAdd.show();
	}

	// 更新实验室设施信息,查看单个实验室设施的信息
	// 添加新实验室设施
	function labfacilityUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panellabfacilityUpdate = new Ext.FormPanel({
					id : 'panellabfacilityUpdate',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 600,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [{
						fieldLabel : '标题',
						id : 'labfacility.title', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '标题不能为空', // 错误提示内容
						width : 450,
						value : obj.data.title
					},new Ext.form.HtmlEditor({
						fieldLabel : '内容',
					    id : 'labfacility.introduction', // 元素名称
					    width: 450,
					    height: 300,
						value : obj.data.introduction
					}),new Ext.form.TextField({
						id : "file",
						fieldLabel : "附件",
						inputType : 'file'
					})
					],
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panellabfacilityUpdate.form.doAction('submit', {
										url : 'labfacility/labfacilityUpdate.action',
										params : 'labfacility.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winlabfacilityUpdate.destroy();
											labfacilityDS.reload();											
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
							winlabfacilityUpdate.destroy();
						}
					}]
		});

		var winlabfacilityUpdate = new Ext.Window({
					id : 'winlabfacilityUpdate',
					title : "更新实验室设施",
					layout : 'fit',
					autoHeight :true,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panellabfacilityUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winlabfacilityUpdate.setTitle("实验室设施信息");
			winlabfacilityUpdate.show();			
		} else {
			winlabfacilityUpdate.show();
		}
	}

	// 删除实验室设施
	function labfacilityDeleteF() {
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
										url : 'labfacility/labfacilityDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											labfacilityDS.reload();
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