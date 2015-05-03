function dutyManager() {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var dutyRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'monday',
				mapping : 'monday'
			}, {
				name : 'tuesday',
				mapping : 'tuesday'
			},{
				name : 'wendesday',
				mapping : 'wendesday'
			},{
				name : 'thursday',
				mapping : 'thursday'
			},{
				name : 'friday',
				mapping : 'friday'
			},{
				name : 'saturday',
				mapping : 'saturday'
			},{
				name : 'sunday',
				mapping : 'sunday'
			},{
				name : 'assignment',
				mapping : 'assignment'
			},{
				name : 'semester',
				mapping : 'semester'
			}]);

	var dutyJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pagedutyList',
				id : 'id'
			}, dutyRecord);

	var dutyDS = new Ext.data.Store({
				id : 'dutyDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'duty/pagedutyList.action',
							method : 'POST'
						}),
				reader : dutyJsReader,
				remoteSort : true
			});
	dutyDS.load({
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
				header : "星期一",
				dataIndex : 'monday',
				sortable : true
			}, {
				header : "星期二",
				dataIndex : 'tuesday',
				sortable : true
				},
				{
				header : "星期三",
				dataIndex : 'wendesday',
				sortable : true
				},
				{
				header : "星期四",
				dataIndex : 'thursday',
				sortable : true
				},
				{
				header : "星期五",
				dataIndex : 'friday',
				sortable : true
				},
				{
				header : "星期六",
				dataIndex : 'saturday',
				sortable : true
				},
				{
				header : "星期日",
				dataIndex : 'sunday',
				sortable : true
				},
				{
				header : "主要任务",
				dataIndex : 'assignment',
				sortable : true
				},
				{
				header : "学年",
				dataIndex : 'semester',
				sortable : true
				}
				]);

	var dutyGrid = new Ext.grid.GridPanel({
				ds : dutyDS,
				sm : sm,
				cm : cm,
				id : 'dutyManager',
				width : 1000,
				height : 500,
				title : '值日安排管理',
				iconCls : 'duty',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '添加值日安排',
							tooltip : '添加一个新值日安排',
							iconCls : 'add',
							handler : dutyAddF
						}, '-', {
							text : '删除值日安排',
							tooltip : '删除所选中的值日安排',
							iconCls : 'remove',
							handler : dutyDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改值日安排信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									dutyUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : dutyDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有值日安排'
						}),
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						dutyUpdateF(record, 'showOne');
					}
				}
			});

	return dutyGrid;

	// 添加新值日安排
	function dutyAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var paneldutyAdd = new Ext.FormPanel({
					id : 'paneldutyAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					autoWidth :true,
					bodyStyle : 'padding:5px 5px 0',
					items : [{
						fieldLabel : '星期一',
						id : 'duty.monday', // 元素名称
						allowBlank :false,
						width : 200
					},{
						fieldLabel : '星期二',
						id : 'duty.tuesday', // 元素名称
						allowBlank :false,
						width : 200
					},{
						fieldLabel : '星期三',
						id : 'duty.wendesday', // 元素名称
						allowBlank :false,
						width : 200
					},{
						fieldLabel : '星期四',
						id : 'duty.thursday', // 元素名称
						allowBlank :false,
						width : 200
					},{
						fieldLabel : '星期五',
						id : 'duty.friday', // 元素名称
						allowBlank :false,
						width : 200
					},{
						fieldLabel : '星期六',
						id : 'duty.saturday', // 元素名称
						allowBlank :false,
						width : 200
					},{
						fieldLabel : '星期日',
						id : 'duty.sunday', // 元素名称
						allowBlank :false,
						width : 200
					},{
						fieldLabel : '主要任务',
						id : 'duty.assignment', // 元素名称
						allowBlank :false,
						width : 200
					},{
						fieldLabel : '学年',
						id : 'duty.semester', // 元素名称
						allowBlank :false,
						width : 200
					}
					],					
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							paneldutyAdd.form.doAction('submit', {
										url : 'duty/dutyAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											windutyAdd.destroy();
											dutyDS.reload();											
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
							paneldutyAdd.form.reset();
						}
					}]
		});

		var windutyAdd = new Ext.Window({
					id : 'windutyAdd',
					title : "添加值日安排",
					layout : 'fit',
					autoHeight :true,
					autoWidth :true,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : paneldutyAdd
				});
		windutyAdd.show();
	}

	// 更新值日安排信息,查看单个值日安排的信息
	// 添加新值日安排
	function dutyUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var paneldutyUpdate = new Ext.FormPanel({
					id : 'paneldutyUpdate',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					autoWidth :true,
					bodyStyle : 'padding:5px 5px 0',
					items : [{
						fieldLabel : '星期一',
						id : 'duty.monday', // 元素名称
						allowBlank :false,
						width : 200,
						value : obj.data.monday
					},{
						fieldLabel : '星期二',
						id : 'duty.tuesday', // 元素名称
						allowBlank :false,
						width : 200,
						value : obj.data.tuesday
					},{
						fieldLabel : '星期三',
						id : 'duty.wendesday', // 元素名称
						allowBlank :false,
						width : 200,
						value : obj.data.wendesday
					},{
						fieldLabel : '星期四',
						id : 'duty.thursday', // 元素名称
						allowBlank :false,
						width : 200,
						value : obj.data.thursday
					},{
						fieldLabel : '星期五',
						id : 'duty.friday', // 元素名称
						allowBlank :false,
						width : 200,
						value : obj.data.friday
					},{
						fieldLabel : '星期六',
						id : 'duty.saturday', // 元素名称
						allowBlank :false,
						width : 200,
						value : obj.data.saturday
					},{
						fieldLabel : '星期日',
						id : 'duty.sunday', // 元素名称
						allowBlank :false,
						width : 200,
						value : obj.data.sunday
					},{
						fieldLabel : '主要任务',
						id : 'duty.assignment', // 元素名称
						allowBlank :false,
						width : 200,
						value : obj.data.assignment
					},{
						fieldLabel : '学年',
						id : 'duty.semester', // 元素名称
						allowBlank :false,
						width : 200,
						value : obj.data.semester
					}
					],
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							paneldutyUpdate.form.doAction('submit', {
										url : 'duty/dutyUpdate.action',
										params : 'duty.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											windutyUpdate.destroy();
											dutyDS.reload();											
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
							windutyUpdate.destroy();
						}
					}]
		});

		var windutyUpdate = new Ext.Window({
					id : 'windutyUpdate',
					title : "更新值日安排",
					layout : 'fit',
					autoHeight :true,
					autoWidth :true,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : paneldutyUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			windutyUpdate.setTitle("值日安排信息");
			windutyUpdate.show();			
		} else {
			windutyUpdate.show();
		}
	}

	// 删除值日安排
	function dutyDeleteF() {
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
										url : 'duty/dutyDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											dutyDS.reload();
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