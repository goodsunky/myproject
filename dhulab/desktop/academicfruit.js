function academicfruitManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var academicfruitRecord = Ext.data.Record.create([{
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

	var academicfruitJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pageacademicfruitList',
				id : 'id'
			}, academicfruitRecord);

	var academicfruitDS = new Ext.data.Store({
				id : 'academicfruitDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'academicfruit/pageacademicfruitList.action',
							method : 'POST'
						}),
				reader : academicfruitJsReader,
				remoteSort : true
			});
	academicfruitDS.load({
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
				sortable : true,
				renderer : function (value, cellmeta, record, rowIndex, columnIndex, store){
					return Ext.util.Format.substr(value,0,10);
				}
				},
				{
				header : "时间",
				dataIndex : 'time',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
				sortable : true
				}
				]);

	var academicfruitGrid = new Ext.grid.GridPanel({
				ds : academicfruitDS,
				sm : sm,
				cm : cm,
				id : 'academicfruitManager',
				width : 1000,
				height : 500,
				title : '学术成果管理',
				iconCls : 'academicfruit',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加学术成果',
							tooltip : '添加一个新学术成果',
							iconCls : 'add',
							handler : academicfruitAddF
						}, '-', {
							text : '删除学术成果',
							tooltip : '删除所选中的学术成果',
							iconCls : 'remove',
							handler : academicfruitDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改学术成果信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									academicfruitUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : academicfruitDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有学术成果'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						academicfruitUpdateF(record, 'showOne');
					}
				}
			});

	return academicfruitGrid;

	// 添加新学术成果
	function academicfruitAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelacademicfruitAdd = new Ext.FormPanel({
					id : 'panelacademicfruitAdd',
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
						id : 'academicfruit.title', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '标题不能为空', // 错误提示内容
						width : 450
					},new Ext.form.HtmlEditor({
						fieldLabel : '内容',
					    id : 'academicfruit.introduction', // 元素名称
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
							panelacademicfruitAdd.form.doAction('submit', {
										url : 'academicfruit/academicfruitAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winacademicfruitAdd.destroy();
											academicfruitDS.reload();											
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
							panelacademicfruitAdd.form.reset();
						}
					}]
		});

		var winacademicfruitAdd = new Ext.Window({
					id : 'winacademicfruitAdd',
					title : "添加学术成果",
					layout : 'fit',
					autoHeight :true,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelacademicfruitAdd
				});
		winacademicfruitAdd.show();
	}

	// 更新学术成果信息,查看单个学术成果的信息
	// 添加新学术成果
	function academicfruitUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelacademicfruitUpdate = new Ext.FormPanel({
					id : 'panelacademicfruitUpdate',
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
						id : 'academicfruit.title', // 元素名称
						allowBlank : false, // 不允许为空
						blankText : '标题不能为空', // 错误提示内容
						width : 450,
						value : obj.data.title
					},new Ext.form.HtmlEditor({
						fieldLabel : '内容',
					    id : 'academicfruit.introduction', // 元素名称
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
							panelacademicfruitUpdate.form.doAction('submit', {
										url : 'academicfruit/academicfruitUpdate.action',
										params : 'academicfruit.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winacademicfruitUpdate.destroy();
											academicfruitDS.reload();											
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
							winacademicfruitUpdate.destroy();
						}
					}]
		});

		var winacademicfruitUpdate = new Ext.Window({
					id : 'winacademicfruitUpdate',
					title : "更新学术成果",
					layout : 'fit',
					autoHeight :true,
					width : 600,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelacademicfruitUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winacademicfruitUpdate.setTitle("学术成果信息");
			winacademicfruitUpdate.show();			
		} else {
			winacademicfruitUpdate.show();
		}
	}

	// 删除学术成果
	function academicfruitDeleteF() {
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
										url : 'academicfruit/academicfruitDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											academicfruitDS.reload();
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