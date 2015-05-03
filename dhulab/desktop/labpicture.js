function showlabpictureWindow(labpictureId, labpictureFilename, labpictureDescribes,
		labpictureModifytime) {
	labpictureModifytime=new Date(labpictureModifytime).format('Y-m-d H:i:s');
	var labpictureDetailPanel = new Ext.Panel({
	id :'labpictureDetailPanel',
	layout :'border',
	frame : true,
	height : 480,
	width : 500,
	modal : true,
	plain : true,
    items: [
	    {
	        xtype : 'box',
			id : 'browseImage',	
			region : 'north',
			autoEl : {
				tag : 'img',	
				width : 500,
				height : 390,
				src : labpictureFilename,// Ext.BLANK_IMAGE_URL
				style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',
				complete : 'off',
				id : 'imageBrowse'
			}
	    },
    	{
    	region :'center',
    	html : "<div align='center'>"
				+ "<table>"
				+ "<tr><td align='right'><font size=2>图片名称：</font></td><td><font size=2>"
				+ labpictureDescribes
				+ "</font></td></tr>"
				+ "<tr><td align='right'><font size=2>最近一次修改时间：</td><td><font size=2>"
				+ labpictureModifytime + "</font></td></tr>" + "</table>"
				+ "</div>"
    	}]
	});
	var win = new Ext.Window({
		title : '图片详细',
		layout : 'fit',
		items : labpictureDetailPanel,
		height :480,
		modal : true,
		plain : true,
		width : 500
		/*buttons : [{
			text : "放大",
			handler : function() {
				imgToSize(50);
			}
		}, {
			text : "缩小",
			handler : function() {
				imgToSize(0);
			}
		}, {
			text : "旋转",
			handler : function() {
				imgRoll();
			}
		}, {
			text : "水平翻转",
			handler : function() {
				imgReverse('H')
			}
		}, {
			text : "垂直翻转",
			handler : function() {
				imgReverse('V')
			}
		}, {
			text : "相框",
			handler : function() {
				addPhotoFrame();
			}
		}, {
			text : "去除相框",
			handler : function() {
				removePhotoFrame();
			}
		}]*/
	});
	win.show();
}

function labpictureManager(center) {
	var pageStart = 0;
	var myPageSize = 20;
	var labpictureDS = new Ext.data.JsonStore({
		url : 'labpicture/pagelabpictureList.action',
		method : 'POST',
		root : 'pagelabpictureList',
		id : 'pagelabpictureListDS',
		totalProperty : 'totalCount',
		fields : ['id', 'filename', 'describes', 'modifytime'],
		remoteSort : true
	});
	labpictureDS.load({
		params : {
			start : pageStart,
			limit : myPageSize
		}
	});
	var view = new Ext.DataView({
		id : 'viewId',
		itemSelector : 'div.thumb-wrap',
		style : 'overflow:auto',
		multiSelect : true,
		/*plugins : new Ext.DataView.DragSelector({
			dragSafe : true
		}),*/
		store : labpictureDS,
		tpl : new Ext.XTemplate(
				'<tpl for=".">',
				'<div class="thumb-wrap" id="{id}">',
				'<div class="thumb"><img src="{filename}" class="thumb-img"></div>',
				'<span>{describes}</span></div>', '</tpl>'),
		listeners : { // 事件处理
			"click" : function() {
				var labpictureId = view.getSelectedRecords()[0].data.id;
				var labpictureFilename = view.getSelectedRecords()[0].data.filename;
				var labpictureDescribes = view.getSelectedRecords()[0].data.describes;
				var labpictureModifytime = view.getSelectedRecords()[0].data.modifytime;
				showlabpictureWindow(labpictureId, labpictureFilename, labpictureDescribes,
						labpictureModifytime);
			},
			contextmenu : labpictureRightClick
		}
	});

	function labpictureRightClick(dataView, index, node, e) {
		var t, idx;
		t = e.getTarget(dataView.itemSelector);
		if (!t)
			return;
		idx = this.indexOf(t);
		dataView.select(idx)
		if (!dataView.menu) {
			dataView.menu = new Ext.menu.Menu({
				id : 'tree-ctx',
				items : [{
					text : '图片下载',
					iconCls : 'edit-icon',
					listeners : {
						"click" : function(dataView, node, e) {
							var labpicture = view.getSelectedRecords()[0];
							var fileStoreName=labpicture.data.filename.split('/');
							window.location = 'labpicture/labpictureDownload.action?labpicture.filename='
									+ fileStoreName[2];
						}
					}
				},{
					text : '重命名',
					iconCls : 'edit-icon',
					listeners : {
						"click" : function(dataView, node, e) {
							var labpicture = view.getSelectedRecords()[0];
							labpictureRenameF(labpicture, view);
						}
					}
				}, {
					text : '删除图片',
					iconCls : 'remove-icon',
					listeners : {
						"click" : function(dataView, node, e) {
							var labpictureId = view.getSelectedRecords()[0].data.id;
							deletelabpictureF(labpictureId, view);
						}
					}
				}/*, {
					text : '编辑信息',
					iconCls : 'remove-icon',
					listeners : {
						"click" : function(dataView, node, e) {

						}
					}
				}*/]
			});

		}
		dataView.menu.showAt(e.getXY());
		e.stopEvent();
	}

	var toolbar = new Ext.Toolbar({ // 创建工具栏
		width : 300
	});
	var textOnlyButton = new Ext.Toolbar.Button({
		text : '上传图片',
		handler : function() {
			labpictureUploadWin(view);
		}
	});
	var refreshButton = new Ext.Toolbar.Button({
		text : '刷新视图',
		handler : function(data) {
			view.getStore().reload(data);
		}
	});
	/*
	var searchToolbar = new Ext.app.SearchField({
		emptyText :'请输入图片描述信息',
		store :labpictureDS,
		width :200
	});*/
	toolbar.addButton(textOnlyButton);
	toolbar.addButton(refreshButton);
	//toolbar.addFill();
	//toolbar.addText("搜索");
	//toolbar.addField(searchToolbar);
	var bottombar = new Ext.PagingToolbar({
		pageSize : myPageSize,
		store : labpictureDS,
		displayInfo : true,
		displayMsg : '显示{0}条 - {1} 条，共 {2}种图片',
		emptyMsg : '没有任何图片',
		doLoad:function(pageStart){
			//var search_val=searchToolbar.getValue();
			var param={start : pageStart,limit  : myPageSize/*,searchvalue : search_val*/};
			this.store.load({params : param});
		}
	});
	var labpictureForm = new Ext.Panel({
		id : 'images',
		title : '实验室图片',
		closable : true,
		region : 'center',
		margins : '5 5 5 0',
		layout : 'fit',
		items : view,
		tbar : toolbar,
		bbar : bottombar
	});

	
	center.add(labpictureForm);
	center.setActiveTab(labpictureForm); // 设置当前选项页
	labpictureForm.on('close', function() {
		this.destroy(true);
	});

	// 删除图片
	function deletelabpictureF(labpictureId, view) {
		Ext.Msg.confirm('提示', '确实要删除选中的图片吗？', function del(button) {
			if (button == 'yes') {
				Ext.Ajax.request({
					url : 'labpicture/labpictureDelete.action?labpicture.id=' + labpictureId,
					method : 'post',
					waitMsg : '正在删除...',
					success : function(response, options) {
						var object = Ext.decode(response.responseText);
						view.getStore().reload();
						Ext.Msg.alert('提示', object.message);
					},
					failure : function(response, options) {
						Ext.Msg.alert('提示', object.message);
					}
				});
			}
		})
	}
	// 上传图片
	function labpictureUploadWin(view) {
		var DEFAULT_IMAGE = 'ext-3.2.0/resources/images/default/gradient-bg.gif';
		var img_reg = /\.([sS][vV][gG]){1}$|\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
		var uploadForm = new Ext.FormPanel({
			id : "uploadFormlabpicture",
			width : 390,
			height : 350,
			frame : true,
			labelAlign : "right",
			monitorValid : true,
			fileUpload : true,
			items : [
			{
				xtype : 'box',
				id : 'browseImage',
				fieldLabel : "预览图片",
				autoEl : {
					width : 200,
					height : 200,
					tag : 'img',
					// type : 'image',
					src : DEFAULT_IMAGE,// Ext.BLANK_IMAGE_URL
					style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',
					complete : 'off',
					id : 'imageBrowse'
				}
			},
			new Ext.form.TextField({
				id : "labpicture.describes",
				fieldLabel : "图片名称",
				//minLength : 3,
				width : 200,
				//minLengthText : "图片名称长度不能小于{0}",
				//maxLength : 12,
				//maxLengthText : "图片名称长度不能大于{0}",
				allowBlank : false,
				blankText : "图片名称必须输入"
			}), new Ext.form.TextField({
				id : "file",
				fieldLabel : "选择图片图片",
				inputType : 'file',
				allowBlank : false,
				blankText : "上传图片不能为空"
			})],
			buttons : [{
				text : "上传",
				formBind : true,
				handler : function() {
					uploadForm.getForm().submit({
						url : "labpicture/labpictureAdd.action",
						method : 'post',
						waitMsg : "请稍等，系统正在进行上传图片!",
						success : function(form, action) {
							Ext.MessageBox.alert("成功", action.result.msg);
							view.getStore().reload();
							uploadFWin.close();
						},
						failure : function(form, action) {
							Ext.MessageBox.alert("失败", action.result.msg);
						}
					});
				}
			}, {
				text : "重置",
				handler : function() {
					var image = Ext.get('imageBrowse').dom;
					image.src = DEFAULT_IMAGE;// 覆盖原来的图片Ext.BLANK_IMAGE_URL
					uploadForm.form.reset();
				}
			}],
			listeners : {
			'render' : function(f) {
				// upload file
				this.form.findField('file').on('render', function() {
					// 通過change事件
					Ext.get('file').on('change',
							function(field, newValue, oldValue) {
								var url = 'file:///'+ Ext.get('file').dom.value;
								// alert("url = " + url);
								if (img_reg.test(url)) {
									if (Ext.isIE) {
										var image = Ext.get('imageBrowse').dom;
										image.src = DEFAULT_IMAGE;// 覆盖原来的图片Ext.BLANK_IMAGE_URL
										image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
									}// 支持FF
									else {
										// console.log(Ext.get('uploadStyle').dom.files.item(0));
										// 火狐7以下用下面这句话
										// Ext.get('imageBrowse').dom.src =
										// top.Ext.get('uploadStyle').dom.files.item(0).getAsDataURL();
										// 从火狐7开始不再支持getAsDataURL
										var file = document.getElementById("file");
										var objectURL = window.URL.createObjectURL(file.files[0]);
										Ext.get('imageBrowse').dom.src = objectURL;
									}
								}
							}, this);
					}, this);
				}
			}
		});

		var uploadFWin = new Ext.Window({
			title : "上传图片",
			width : 400,
			height : 380,
			items : uploadForm
		});

		uploadFWin.show();
	}
	// 重命名
	function labpictureRenameF(obj, view) {
		var fileStoreName2 = obj.data.filename.split('/');
		var panelMaterialUpdate = new Ext.FormPanel({
			id : 'panellabpictureUpdate',
			bodyStyle : 'padding:5px 5px 0',
			width : 300,
			height : 150,
			frame : true,
			labelAlign : 'right',
			buttonAlign : 'center',
			monitorValid : true,
			items : [{
				id : 'labpicture.olddescribes',
				xtype : 'textfield',
				fieldLabel : "图片原名称",
				value : obj.data.describes
			}, {
				id : 'labpicture.describes',
				xtype : 'textfield',
				fieldLabel : "图片新名称",
				//minLength : 3,
				//minLengthText : '图片名称长度不能小于{0}',
				//maxLength : 12,
				//maxLengthText : '图片名称长度不能大于{0}',
				allowBlank : false,
				blankText : '图片名称必须输入'
			}, {
				id : 'labpicture.id',
				xtype : 'textfield',
				hidden : true,
				value : obj.data.id
			}, {
				id : 'labpicture.filename',
				xtype : 'textfield',
				hidden : true,
				value : fileStoreName2[2]
			}],
			buttons : [{
				text : "提交",
				formBind : true,
				handler : function() {
					panelMaterialUpdate.getForm().submit({
						url : "labpicture/labpictureUpdate.action",
						method : 'post',
						waitMsg : "请稍等，系统正在进行修改图片信息!",
						success : function(form, action) {
							Ext.MessageBox.alert("成功", action.result.msg);
							view.getStore().reload();
							winMaterialUpdate.close();
						},
						failure : function(form, action) {
							Ext.MessageBox.alert("失败", action.result.msg);
						}
					});
				}
			}, {
				text : "重置",
				handler : function() {
					panelMaterialUpdate.form.reset();
				}
			}]
		});

		var winMaterialUpdate = new Ext.Window({
			id : 'winMaterialUpdate',
			title : "重命名",
			width : 310,
			height : 180,
			items : panelMaterialUpdate
		});
		winMaterialUpdate.show();
	}

}
