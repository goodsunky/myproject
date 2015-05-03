function labinstitutionManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var labinstitutionRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'researchguid',
				mapping : 'researchguid'
			}, {
				name : 'researchmember',
				mapping : 'researchmember'
			},{
				name : 'modifytime',
				mapping : 'modifytime'
			}]);

	var labinstitutionJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pagelabinstitutionList',
				id : 'id'
			}, labinstitutionRecord);

	var labinstitutionDS = new Ext.data.Store({
				id : 'labinstitutionDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'labinstitution/pagelabinstitutionList.action',
							method : 'POST'
						}),
				reader : labinstitutionJsReader,
				remoteSort : true
			});
	labinstitutionDS.load({
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
				header : "研究方向",
				dataIndex : 'researchguid',
				sortable : true
			}, {
				header : "研究团队",
				dataIndex : 'researchmember',
				sortable : true
				},
				{
				header : "修改时间",
				dataIndex : 'modifytime',
				type : 'date',
				renderer : new Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
				sortable : true
				}
				]);

	var labinstitutionGrid = new Ext.grid.GridPanel({
				ds : labinstitutionDS,
				sm : sm,
				cm : cm,
				id : 'labinstitutionManager',
				width : 1000,
				height : 500,
				title : '实验室研究团队管理',
				iconCls : 'labinstitution',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加实验室研究团队',
							tooltip : '添加一个新实验室研究团队',
							iconCls : 'add',
							handler : labinstitutionAddF
						}, '-', {
							text : '删除实验室研究团队',
							tooltip : '删除所选中的实验室研究团队',
							iconCls : 'remove',
							handler : labinstitutionDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改实验室研究团队信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									labinstitutionUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : labinstitutionDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有实验室研究团队'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						labinstitutionUpdateF(record, 'showOne');
					}
				}
			});

	return labinstitutionGrid;

	// 添加新实验室研究团队
	function labinstitutionAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panellabinstitutionAdd = new Ext.FormPanel({
					id : 'panellabinstitutionAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 450,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [{
						fieldLabel : '研究方向',
						id : 'labinstitution.researchguid', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '研究方向不能为空', // 错误提示内容
						width : 300
					},{
						fieldLabel : '研究团队',
						id : 'labinstitution.researchmember', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '研究团队不能为空', // 错误提示内容
						width : 300
					}
					],
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panellabinstitutionAdd.form.doAction('submit', {
										url : 'labinstitution/labinstitutionAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winlabinstitutionAdd.destroy();
											labinstitutionDS.reload();											
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
							panellabinstitutionAdd.form.reset();
						}
					}]
		});

		var winlabinstitutionAdd = new Ext.Window({
					id : 'winlabinstitutionAdd',
					title : "添加实验室研究团队",
					layout : 'fit',
					autoHeight :true,
					width : 450,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panellabinstitutionAdd
				});
		winlabinstitutionAdd.show();
	}

	// 更新实验室研究团队信息,查看单个实验室研究团队的信息
	// 添加新实验室研究团队
	function labinstitutionUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panellabinstitutionUpdate = new Ext.FormPanel({
					id : 'panellabinstitutionUpdate',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 450,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [{
						fieldLabel : '研究方向',
						id : 'labinstitution.researchguid', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '研究方向不能为空', // 错误提示内容
						width : 300,
						value : obj.data.researchguid
					},{
						fieldLabel : '研究团队',
						id : 'labinstitution.researchmember', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '研究团队不能为空', // 错误提示内容
						width : 300,
						value :obj.data.researchmember
					}
					],
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panellabinstitutionUpdate.form.doAction('submit', {
										url : 'labinstitution/labinstitutionUpdate.action',
										params : 'labinstitution.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winlabinstitutionUpdate.destroy();
											labinstitutionDS.reload();											
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
							winlabinstitutionUpdate.destroy();
						}
					}]
		});

		var winlabinstitutionUpdate = new Ext.Window({
					id : 'winlabinstitutionUpdate',
					title : "更新实验室研究团队",
					layout : 'fit',
					autoHeight :true,
					width : 450,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panellabinstitutionUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winlabinstitutionUpdate.setTitle("实验室研究团队信息");
			winlabinstitutionUpdate.show();			
		} else {
			winlabinstitutionUpdate.show();
		}
	}

	// 删除实验室研究团队
	function labinstitutionDeleteF() {
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
										url : 'labinstitution/labinstitutionDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											labinstitutionDS.reload();
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