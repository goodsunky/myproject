function cooperatecompanyManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var cooperatecompanyRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'name',
				mapping : 'name'
			}, {
				name : 'introduction',
				mapping : 'introduction'
			},{
				name : 'resp',
				mapping : 'resp'
			},{
				name : 'link',
				mapping : 'link'
			},{
				name : 'time',
				mapping : 'time'
			}]);

	var cooperatecompanyJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pagecooperatecompanyList',
				id : 'id'
			}, cooperatecompanyRecord);

	var cooperatecompanyDS = new Ext.data.Store({
				id : 'cooperatecompanyDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'cooperatecompany/pagecooperatecompanyList.action',
							method : 'POST'
						}),
				reader : cooperatecompanyJsReader,
				remoteSort : true
			});
	cooperatecompanyDS.load({
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
				header : "公司名称",
				dataIndex : 'name',
				sortable : true
			}, {
				header : "公司简介",
				dataIndex : 'introduction',
				sortable : true,
				renderer : function (value, cellmeta, record, rowIndex, columnIndex, store){
					return Ext.util.Format.substr(value,0,10);
				}
				}, {
				header : "公司负责人",
				dataIndex : 'resp',
				sortable : true
				}, {
				header : "公司链接",
				dataIndex : 'link',
				sortable : true
				},
				{
				header : "修改时间",
				dataIndex : 'time',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
				sortable : true
				}
				]);

	var cooperatecompanyGrid = new Ext.grid.GridPanel({
				ds : cooperatecompanyDS,
				sm : sm,
				cm : cm,
				id : 'cooperatecompanyManager',
				width : 1000,
				height : 500,
				title : '合作企业管理',
				iconCls : 'cooperatecompany',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加合作企业',
							tooltip : '添加一个新合作企业',
							iconCls : 'add',
							handler : cooperatecompanyAddF
						}, '-', {
							text : '删除合作企业',
							tooltip : '删除所选中的合作企业',
							iconCls : 'remove',
							handler : cooperatecompanyDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改合作企业信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									cooperatecompanyUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : cooperatecompanyDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有合作企业'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						cooperatecompanyUpdateF(record, 'showOne');
					}
				}
			});

	return cooperatecompanyGrid;

	// 添加新合作企业
	function cooperatecompanyAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelcooperatecompanyAdd = new Ext.FormPanel({
					id : 'panelcooperatecompanyAdd',
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
						fieldLabel : '公司名称',
						id : 'cooperatecompany.name', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '公司名称不能为空', // 错误提示内容
						width : 450
					},new Ext.form.HtmlEditor({
						fieldLabel : '公司简介',
					    id : 'cooperatecompany.introduction', // 元素名称
					    width: 450,
					    height: 300
					}),{
						fieldLabel : '公司负责人',
						id : 'cooperatecompany.resp', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '公司负责人不能为空', // 错误提示内容
						width : 450
					},{
						fieldLabel : '公司链接',
						id : 'cooperatecompany.link', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '公司链接不能为空', // 错误提示内容
						width : 450
					}
					],
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panelcooperatecompanyAdd.form.doAction('submit', {
										url : 'cooperatecompany/cooperatecompanyAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											wincooperatecompanyAdd.destroy();
											cooperatecompanyDS.reload();											
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
							panelcooperatecompanyAdd.form.reset();
						}
					}]
		});

		var wincooperatecompanyAdd = new Ext.Window({
					id : 'wincooperatecompanyAdd',
					title : "添加合作企业",
					layout : 'fit',
					autoHeight :true,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelcooperatecompanyAdd
				});
		wincooperatecompanyAdd.show();
	}

	// 更新合作企业信息,查看单个合作企业的信息
	// 添加新合作企业
	function cooperatecompanyUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelcooperatecompanyUpdate = new Ext.FormPanel({
					id : 'panelcooperatecompanyUpdate',
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
						fieldLabel : '公司名称',
						id : 'cooperatecompany.name', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '公司名称不能为空', // 错误提示内容
						value : obj.data.name,
						width : 450
					},new Ext.form.HtmlEditor({
						fieldLabel : '公司简介',
					    id : 'cooperatecompany.introduction', // 元素名称
					    width: 450,
					    value : obj.data.introduction,
					    height: 300
					}),{
						fieldLabel : '公司负责人',
						id : 'cooperatecompany.resp', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '公司负责人不能为空', // 错误提示内容
						value : obj.data.resp,
						width : 450
					},{
						fieldLabel : '公司链接',
						id : 'cooperatecompany.link', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '公司链接不能为空', // 错误提示内容
						value : obj.data.link,
						width : 450
					}
					],
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panelcooperatecompanyUpdate.form.doAction('submit', {
										url : 'cooperatecompany/cooperatecompanyUpdate.action',
										params : 'cooperatecompany.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											wincooperatecompanyUpdate.destroy();
											cooperatecompanyDS.reload();											
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
							wincooperatecompanyUpdate.destroy();
						}
					}]
		});

		var wincooperatecompanyUpdate = new Ext.Window({
					id : 'wincooperatecompanyUpdate',
					title : "更新合作企业",
					layout : 'fit',
					autoHeight :true,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelcooperatecompanyUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			wincooperatecompanyUpdate.setTitle("合作企业信息");
			wincooperatecompanyUpdate.show();			
		} else {
			wincooperatecompanyUpdate.show();
		}
	}

	// 删除合作企业
	function cooperatecompanyDeleteF() {
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
										url : 'cooperatecompany/cooperatecompanyDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											cooperatecompanyDS.reload();
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