function resourcesManager(id,tabText) {

	Ext.BLANK_IMAGE_URL = 'ext-3.2.0/resources/images/default/s.gif';
	Ext.QuickTips.init();
	var requiredMark = '<span style="color:red">*</span>';
	var pageStart = 0;
	var myPageSize = 20;
	var ids= id.split('/');
	/*
	var researchtypestore=new Ext.data.JsonStore({
	url : '/resourcetype/allresourcetypeList.action',
	totalProperty :'totalCount',
	root:'resourcetypeList',
	fields:['id','type']
	});*/
	
	var resourcesRecord = Ext.data.Record.create([{
				name : 'id',
				mapping : 'id'
			}, {
				name : 'filename',
				mapping : 'filename'
			}/*, {
				name : 'extendname',
				mapping : 'extendname'
			}*/, {
				name : 'storefilename',
				mapping : 'storefilename'
			},{
				name : 'filesize',
				mapping : 'filesize'
			},{
				name : 'name',
				mapping : 'userinfo.name'
			},{
				name : 'uploadtime',
				mapping : 'uploadtime'
			},{
				name : 'downloadcounts',
				mapping : 'downloadcounts'
			}]);

	var resourcesJsReader = new Ext.data.JsonReader({
				totalProperty : 'totalCount',
				successProperty : 'success',
				root : 'pageresourcesList',
				id : 'id'
			}, resourcesRecord);

	var resourcesDS = new Ext.data.Store({
				id : 'resourcesDS',
				totalProperty : 'totalCount',
				proxy : new Ext.data.HttpProxy({
							url : 'resources/pageresourcesclassList.action?resources.resourceType.id='+ids[1]+'&resources.resourceSubtype.id='+ids[2],
							method : 'POST'
						}),
				reader : resourcesJsReader,
				remoteSort : true
			});
	resourcesDS.load({
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
			}/*,{
				header : "类型",
				width: 40,
				dataIndex : 'extendname',
				renderer :function(value){
					return "<img src='"+value+"' />";
				}}*/,{
				header : "文件名",
				dataIndex : 'filename',
				sortable : true
			}, {
				header : "文件大小",
				dataIndex : 'filesize',
				width: 70,
				sortable : true
				},
				{
				width: 60,
				header : "上传者",
				dataIndex : 'name',
				sortable : true
				},
				{
				header : "上传时间",
				width: 120,
				dataIndex : 'uploadtime',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
				sortable : true
				},
				{
				header : "下载次数",
				width: 60,
				dataIndex : 'downloadcounts',
				sortable : true
				},
				{
				header : "操作",
				width: 60,
				dataIndex : 'id',
				renderer :function(value){
					return "<a href='resources/resourcesDownload.action?resources.id="+value+"' target='_blank'>下载</>";
					//return "<a href='upload/resources/"+value+"'>下载</a>";
				}
				}
				]);

	var resourcesGrid = new Ext.grid.GridPanel({
				ds : resourcesDS,
				sm : sm,
				cm : cm,
				id : 'resourcesManager'+id,
				width : 1000,
				height : 500,
				title : tabText,
				iconCls : 'resources',
				frame : true,
				closable : true,
				loadMask : true,
				stripeRows : true,// 斑马线效果
				tbar : [{
							text : '上传资源',
							tooltip : '上传资源',
							iconCls : 'add',
							handler : resourcesAddF
						}, '-', {
							text : '删除资源',
							tooltip : '删除所选中的资源',
							iconCls : 'remove',
							handler : resourcesDeleteF
						}, '-', {
							text : '修改',
							tooltip : '修改资源信息',
							iconCls : 'settings',
							handler : function() {
								recordUpdate = sm.getSelections();
								if (recordUpdate.length == 0) {
									Ext.Msg.alert('提示', '未选中任何记录！');
								} else if (recordUpdate.length > 1) {
									Ext.Msg.alert('提示', '您选中了多条记录！');
								} else {
									resourcesUpdateF(recordUpdate[0], 'updateOne');
								}
							}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : myPageSize,
							store : resourcesDS,
							displayInfo : true,
							displayMsg : '显示{0}条 - {1} 条，共 {2}条记录',
							emptyMsg : '没有下载资源'
						})/*,
				listeners : {
					rowdblclick : function(grid, rowIndex, e) {
						var record = grid.getStore().getAt(rowIndex);
						resourcesUpdateF(record, 'showOne');
					}
				}*/
			});

	return resourcesGrid;

	//resources.resourceType.id='+ids[1]+'&resources.resourceSubtype.id='+ids[2]
	// 添加新下载资源
	function resourcesAddF() {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelresourcesAdd = new Ext.FormPanel({
					id : 'panelresourcesAdd',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 400,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [
						{
							id : 'resources.resourceType.id',
							xtype : 'textfield',
							hidden : true,
							value : ids[1]		
						},
						{
							id : 'resources.resourceSubtype.id',
							xtype : 'textfield',
							hidden : true,
							value : ids[2]		
						},
						new Ext.form.TextField({
						id : "file",
						fieldLabel : "资源",
						inputType : 'file'
					})
					],
					buttons : [{
						text : "保存",
						formBind : true,
						scope : this,
						handler : function() {
							panelresourcesAdd.form.doAction('submit', {
										url : 'resources/resourcesAdd.action',
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winresourcesAdd.destroy();
											resourcesDS.reload();											
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
							panelresourcesAdd.form.reset();
						}
					}]
		});

		var winresourcesAdd = new Ext.Window({
					id : 'winresourcesAdd',
					title : "上传资源",
					layout : 'fit',
					autoHeight :true,
					width : 400,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelresourcesAdd
				});
		winresourcesAdd.show();
	}

	// 更新下载资源信息,查看单个下载资源的信息
	// 添加新下载资源
	function resourcesUpdateF(obj, choose) {
		//var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var panelresourcesUpdate = new Ext.FormPanel({
					id : 'panelresourcesUpdate',
					monitorValid : true, // 把有formBind:true的按钮和验证绑定
					baseCls : 'x-plain',					
					defaultType : 'textfield', // 默认字段类型
					buttonAlign : 'center',
					frame : false,
					autoHeight :true,
					width : 400,
					bodyStyle : 'padding:5px 5px 0',
					fileUpload : true,
					items : [
						{
							id : 'resources.resourceType.id',
							xtype : 'textfield',
							hidden : true,
							value : ids[1]		
						},
						{
							id : 'resources.resourceSubtype.id',
							xtype : 'textfield',
							hidden : true,
							value : ids[2]		
						},
						new Ext.form.TextField({
						id : "file",
						fieldLabel : "资源",
						inputType : 'file'
					})
					],
					buttons : [{
						id : "updateB",
						text : "修改",
						formBind : true,
						scope : this,
						handler : function() {
							panelresourcesUpdate.form.doAction('submit', {
										url : 'resources/resourcesUpdate.action',
										params : 'resources.id=' + obj.data.id,
										method : 'post',
										waitMsg : '数据保存中...',
										success : function(form, action) {
											Ext.Msg.alert('提示',action.result.msg);
											winresourcesUpdate.destroy();
											resourcesDS.reload();											
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
							winresourcesUpdate.destroy();
						}
					}]
		});

		var winresourcesUpdate = new Ext.Window({
					id : 'winresourcesUpdate',
					title : "更新资源",
					layout : 'fit',
					autoHeight :true,
					width : 400,
					modal : true,
					plain : true,
					bodyStyle : 'padding:5px;',
					closeAction : 'close',
					plain : true,
					items : panelresourcesUpdate
				});
		if ("showOne" == choose) {
			Ext.getCmp('updateB').hide();
			Ext.getCmp('resetB').hide();
			winresourcesUpdate.setTitle("资源信息");
			winresourcesUpdate.show();			
		} else {
			winresourcesUpdate.show();
		}
	}

	// 删除下载资源
	function resourcesDeleteF() {
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
										url : 'resources/resourcesDelete.action?del_ids='+ del_ids,
										waitMsg : '正在删除...',
										success : function(response, options) {
											var object = Ext.decode(response.responseText);
											//console.log(object);//可以到火狐的firebug下面看看obj里面的结构 
											resourcesDS.reload();
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