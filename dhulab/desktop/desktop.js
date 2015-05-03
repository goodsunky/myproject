/*
 * ! Ext JS Library 3.2.0 Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com http://www.extjs.com/license
 */

// Sample desktop configuration
// all above is test
MyDesktop = new Ext.app.App({
	init : function() {
		Ext.QuickTips.init();
	},
//start menu
	getModules : function() {
		return [new MyDesktop.userWindow,
		new MyDesktop.noticeinfoWindow,
		new MyDesktop.researchWindow,
		new MyDesktop.academicfruitWindow,
		new MyDesktop.labWindow,
		new MyDesktop.routinescheduleWindow
		];
	},

	// config for the start menu
	getStartConfig : function() {
		return {
			title : '东华大学合胜联合实验室后台管理系统',
			iconCls : 'user',
			toolItems : [{
				text : '密码修改',
				iconCls : 'settings',
				handler :passwordAlter,
				scope : this
			}, '-', {
				text : '注销',
				iconCls : 'logout',
				handler:function(){
            	window.location = 'quit.action';
            	},
				scope : this
			}]
		};
	}
});

//click start
MyDesktop.userWindow = Ext.extend(Ext.app.Module, {
	id : 'userWin',
	init : function() {
		this.launcher = {
			text : '用户信息管理',
			iconCls : 'usermgr',
			handler : this.createWindow,				
			scope : this
		}		
	},
	
	createWindow : function() {		
		var desktop = this.app.getDesktop();
		var root1 = new Ext.tree.TreeNode({
			id : 'userRoot',
			text : '用户信息管理',
			iconCls : 'user-suit'
		});
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'userManager',
			text : '用户信息管理',
			iconCls : 'usermgr'
		}));

		var treePanel = new Ext.tree.TreePanel({
			title : '导航',
			region : 'west',
			root : root1,
			split : true,
			width : 200,
			collapsible : true,
			margins : '3 0 1 3',
			cmargins : '3 3 3 3',
			layout : 'form',
			listeners : {
				click : function(obj) {
					var id = obj.attributes.id;
					if (center.getItem(id)) {
						// 表示标签已打开则激活
						center.setActiveTab(id);
					} else {
						// 加载前的等待标志
						var mask = new Ext.LoadMask(Ext.get('centerId'), {
							removeMask : true,
							msg : '正在加载数据......'
						});
						mask.enable();
						mask.show();
						// 表示标签还没有打开，创建新的页面
						if (id == "userManager") {							
							var userGrid = userManager();
							center.add(userGrid);
							center.setActiveTab(userGrid);
							userGrid.on('close', function() {
								this.destroy(true);
							});
							mask.hide();
							mask.destroy();
							mask = null;
						} 
					}
				}
			}
		});
		
		var center = new Ext.TabPanel({
			id : 'centerId',
			region : 'center',
			items : [{
				title : '欢迎',
				html : '<td><td><center><h1>欢迎使用本系统！<tr> 具体功能请见导航栏</h1></center>',
				id : 'userRoot'
			}],
			enableTabScroll : true
		});
		center.setActiveTab('userRoot');
		var win = desktop.getWindow('userWin');
		///任务栏中显示的
		if (!win) {
			win = desktop.createWindow({
				id : 'userWin',
				title : "用户信息管理",
				iconCls : 'usermgr',
				layout : 'border',
				width : 800,
				height : 500,
				shim : false,
				animCollapse : false,
				constrainHeader : true,
				minimizable : true,
				maximizable : true,
				items : [treePanel, center]
			});
		}
		win.show();	//桌面上显示的
	}
});

//click start
MyDesktop.noticeinfoWindow = Ext.extend(Ext.app.Module, {
	id : 'noticeinfoWin',
	init : function() {
		this.launcher = {
			text : '公告通知管理',
			iconCls : 'noticeinfo',
			handler : this.createWindow,				
			scope : this
		}		
	},
	
	createWindow : function() {		
		var desktop = this.app.getDesktop();
		var root1 = new Ext.tree.TreeNode({
			id : 'noticeinfoRoot',
			text : '公告通知管理',
			iconCls : 'noticeinfo-suit'
		});
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'noticeinfoManager',
			text : '公告通知管理',
			iconCls : 'noticeinfo'
		}));

		var treePanel = new Ext.tree.TreePanel({
			title : '导航',
			region : 'west',
			root : root1,
			split : true,
			width : 200,
			collapsible : true,
			margins : '3 0 1 3',
			cmargins : '3 3 3 3',
			layout : 'form',
			listeners : {
				click : function(obj) {
					var id = obj.attributes.id;
					if (center.getItem(id)) {
						// 表示标签已打开则激活
						center.setActiveTab(id);
					} else {
						// 加载前的等待标志
						var mask = new Ext.LoadMask(Ext.get('centerId'), {
							removeMask : true,
							msg : '正在加载数据......'
						});
						mask.enable();
						mask.show();
						// 表示标签还没有打开，创建新的页面
						if (id == "noticeinfoManager") {							
							var noticeinfoGrid = noticeinfoManager();
							center.add(noticeinfoGrid);
							center.setActiveTab(noticeinfoGrid);
							noticeinfoGrid.on('close', function() {
								this.destroy(true);
							});
							mask.hide();
							mask.destroy();
							mask = null;
						} 
					}
				}
			}
		});
		
		var center = new Ext.TabPanel({
			id : 'centerId',
			region : 'center',
			items : [{
				title : '欢迎',
				html : '<td><td><center><h1>欢迎使用本系统！<tr> 具体功能请见导航栏</h1></center>',
				id : 'noticeinfoRoot'
			}],
			enableTabScroll : true
		});
		center.setActiveTab('noticeinfoRoot');
		var win = desktop.getWindow('noticeinfoWin');
		///任务栏中显示的
		if (!win) {
			win = desktop.createWindow({
				id : 'noticeinfoWin',
				title : "公告通知管理",
				iconCls : 'noticeinfo',
				layout : 'border',
				width : 800,
				height : 500,
				shim : false,
				animCollapse : false,
				constrainHeader : true,
				minimizable : true,
				maximizable : true,
				items : [treePanel, center]
			});
		}
		win.show();	//桌面上显示的
	}
});

//click start
MyDesktop.researchWindow = Ext.extend(Ext.app.Module, {
	id : 'researchWin',
	init : function() {
		this.launcher = {
			text : '科研管理',
			iconCls : 'researchproject',
			handler : this.createWindow,				
			scope : this
		}		
	},
	
	createWindow : function() {		
		var desktop = this.app.getDesktop();
		var root1 = new Ext.tree.TreeNode({
			id : 'researchRoot',
			text : '科研管理',
			iconCls : ''
		});
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'researchtypeManager',
			text : '科研方向管理',
			iconCls : ''
		}));
		// 异步加载树
		var treeLoader = new Ext.tree.TreeLoader({
			url : "researchtype/researchtypeTreeList.action"
		});
		var researchprojectManagerNode = new Ext.tree.AsyncTreeNode({
			id : 'researchprojectManager',
			text : '科研项目管理',
			iconCls : '',
			loader : treeLoader
		});
		root1.appendChild(researchprojectManagerNode);
		/*
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'researchprojectManager',
			text : '科研项目管理',
			iconCls : 'researchproject'
		}));	*/	

		var treePanel = new Ext.tree.TreePanel({
			title : '导航',
			region : 'west',
			root : root1,
			split : true,
			width : 200,
			collapsible : true,
			margins : '3 0 1 3',
			cmargins : '3 3 3 3',
			layout : 'form',
			listeners : {
				click : function(obj) {
					var id = obj.attributes.id;
					var nodeTxt = obj.attributes.text;
					if (center.getItem(id)) {
						// 表示标签已打开则激活
						center.setActiveTab(id);
					} else {
						// 表示标签还没有打开，创建新的页面
						/*if (id != "researchprojectManager") {							
							var researchprojectGrid = researchprojectManager();
							center.add(researchprojectGrid);
							center.setActiveTab(researchprojectGrid);
							researchprojectGrid.on('close', function() {
								this.destroy(true);
							});
							mask.hide();
							mask.destroy();
							mask = null;
							
						}else*/
							if( id == "researchtypeManager")
							{
								// 加载前的等待标志
								var mask = new Ext.LoadMask(Ext.get('centerId'), {
								removeMask : true,
								msg : '正在加载数据......'
								});
								mask.enable();
								mask.show();
								var researchtypeGrid = researchtypeManager();
								center.add(researchtypeGrid);
								center.setActiveTab(researchtypeGrid);
								researchtypeGrid.on('close', function() {
									this.destroy(true);
								});
								mask.hide();
								mask.destroy();
								mask = null;
							}else
								if(id != "researchprojectManager")
								{
									// 加载前的等待标志
									var mask = new Ext.LoadMask(Ext.get('centerId'), {
									removeMask : true,
									msg : '正在加载数据......'
									});
									mask.enable();
									mask.show();
									var researchprojectGrid=researchprojectManager(nodeTxt, id, center);
									/*var tabPage = center.add({ // 动态添加选项页
										id : id,
										title : nodeTxt, // 选项页标题
										autoHeight : false,
										//height : 500, // 高度
										layout : "fit", // 布局方式
										items : [ // 子面板
										researchprojectGrid// 添加表单面板
										],
										listeners : { // 注册监听器
										},
										closable : true
											// 允许关闭
									})
									center.setActiveTab(tabPage); // 设置当前选项页
									tabPage.on('close', function() {
												this.destroy(true);
												researchprojectGrid.destroy(true);
											});*/
									center.add(researchprojectGrid);
									center.setActiveTab(researchprojectGrid); // 设置当前选项页
									researchprojectGrid.on('close', function() {
										this.destroy(true);
									});
									mask.hide();
									mask.destroy();
									mask = null;
								}
					}
				}
			}
		});
		
		
		
		var rightClickMenu = new Ext.menu.Menu({ // 菜单treePanel.menu
			// rightClickMenu
			items : [{
				text : '刷新',
				listeners : {
					click : function() {
						researchprojectManagerNode.reload();
					}
				}
			}]
		});
		treePanel.on("contextmenu", function(node, e) { // 注册右键菜单事件
					e.stopEvent();
					if (node.id == 'researchprojectManager') {
						node.select(); // 选择该节点
						rightClickMenu.showAt(e.getXY()); // 显示菜单
					}
				});
		
		var center = new Ext.TabPanel({
			id : 'centerId',
			region : 'center',
			items : [{
				title : '欢迎',
				html : '<td><td><center><h1>欢迎使用本系统！<tr> 具体功能请见导航栏</h1></center>',
				id : 'researchRoot'
			}],
			enableTabScroll : true
		});
		center.setActiveTab('researchRoot');
		var win = desktop.getWindow('researchWin');
		///任务栏中显示的
		if (!win) {
			win = desktop.createWindow({
				id : 'researchWin',
				title : "科研管理",
				iconCls : 'research',
				layout : 'border',
				width : 800,
				height : 500,
				shim : false,
				animCollapse : false,
				constrainHeader : true,
				minimizable : true,
				maximizable : true,
				items : [treePanel, center]
			});
		}
		win.show();	//桌面上显示的
	}
});

//click start
MyDesktop.academicfruitWindow = Ext.extend(Ext.app.Module, {
	id : 'academicfruitWin',
	init : function() {
		this.launcher = {
			text : '学术成果管理',
			iconCls : 'academicfruit',
			handler : this.createWindow,				
			scope : this
		}		
	},
	
	createWindow : function() {		
		var desktop = this.app.getDesktop();
		var root1 = new Ext.tree.TreeNode({
			id : 'academicfruitRoot',
			text : '学术成果管理',
			iconCls : 'academicfruit-suit'
		});
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'academicfruitManager',
			text : '学术成果管理',
			iconCls : 'academicfruit'
		}));

		var treePanel = new Ext.tree.TreePanel({
			title : '导航',
			region : 'west',
			root : root1,
			split : true,
			width : 200,
			collapsible : true,
			margins : '3 0 1 3',
			cmargins : '3 3 3 3',
			layout : 'form',
			listeners : {
				click : function(obj) {
					var id = obj.attributes.id;
					if (center.getItem(id)) {
						// 表示标签已打开则激活
						center.setActiveTab(id);
					} else {
						// 加载前的等待标志
						var mask = new Ext.LoadMask(Ext.get('centerId'), {
							removeMask : true,
							msg : '正在加载数据......'
						});
						mask.enable();
						mask.show();
						// 表示标签还没有打开，创建新的页面
						if (id == "academicfruitManager") {							
							var orderGrid = academicfruitManager();
							center.add(orderGrid);
							center.setActiveTab(orderGrid);
							orderGrid.on('close', function() {
								this.destroy(true);
							});
							mask.hide();
							mask.destroy();
							mask = null;
						} 
					}
				}
			}
		});
		
		var center = new Ext.TabPanel({
			id : 'centerId',
			region : 'center',
			items : [{
				title : '欢迎',
				html : '<td><td><center><h1>欢迎使用本系统！<tr> 具体功能请见导航栏</h1></center>',
				id : 'academicfruitRoot'
			}],
			enableTabScroll : true
		});
		center.setActiveTab('academicfruitRoot');
		var win = desktop.getWindow('academicfruitWin');
		///任务栏中显示的
		if (!win) {
			win = desktop.createWindow({
				id : 'academicfruitWin',
				title : "学术成果管理",
				iconCls : 'academicfruit',
				layout : 'border',
				width : 800,
				height : 500,
				shim : false,
				animCollapse : false,
				constrainHeader : true,
				minimizable : true,
				maximizable : true,
				items : [treePanel, center]
			});
		}
		win.show();	//桌面上显示的
	}
});

//click start
MyDesktop.labWindow = Ext.extend(Ext.app.Module, {
	id : 'labWin',
	init : function() {
		this.launcher = {
			text : '实验室管理',
			iconCls : 'lab',
			handler : this.createWindow,				
			scope : this
		}		
	},
	
	createWindow : function() {		
		var desktop = this.app.getDesktop();
		var root1 = new Ext.tree.TreeNode({
			id : 'labRoot',
			text : '实验室管理',
			iconCls : 'lab-suit'
		});
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'labinstitutionManager',
			text : '实验室研究团队管理',
			iconCls : 'lab'
		}));
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'labintroductionManager',
			text : '实验室概述管理',
			iconCls : 'lab'
		}));
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'labpictureManager',
			text : '实验室图片管理',
			iconCls : 'lab'
		}));
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'corpcompanyManager',
			text : '合作企业管理',
			iconCls : 'lab'
		}));
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'labmemberManager',
			text : '实验室成员管理',
			iconCls : 'lab'
		}));
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'contactusManager',
			text : '联系我们',
			iconCls : 'lab'
		}));
		var treePanel = new Ext.tree.TreePanel({
			title : '导航',
			region : 'west',
			root : root1,
			split : true,
			width : 200,
			collapsible : true,
			margins : '3 0 1 3',
			cmargins : '3 3 3 3',
			layout : 'form',
			listeners : {
				click : function(obj) {
					var id = obj.attributes.id;
					if (center.getItem(id)) {
						// 表示标签已打开则激活
						center.setActiveTab(id);
					} else {
						// 加载前的等待标志
						var mask = new Ext.LoadMask(Ext.get('centerId'), {
							removeMask : true,
							msg : '正在加载数据......'
						});
						mask.enable();
						mask.show();
						// 表示标签还没有打开，创建新的页面
						if (id == "labintroductionManager") {							
							var labGrid = labintroductionManager();
							center.add(labGrid);
							center.setActiveTab(labGrid);
							labGrid.on('close', function() {
								this.destroy(true);
							});
							mask.hide();
							mask.destroy();
							mask = null;
						}else
							if(id == "labpictureManager"){
								mask.enable();
								mask.show();
								labpictureManager(center);
								mask.hide();
								mask.destroy();
								mask = null;
							}else
								if(id == "corpcompanyManager"){
									var labGrid = cooperatecompanyManager();
									center.add(labGrid);
									center.setActiveTab(labGrid);
									labGrid.on('close', function() {
										this.destroy(true);
									});
									mask.hide();
									mask.destroy();
									mask = null;
								}else
									if(id == "labmemberManager"){
										var labGrid = labmemberManager();
										center.add(labGrid);
										center.setActiveTab(labGrid);
										labGrid.on('close', function() {
											this.destroy(true);
										});
										mask.hide();
										mask.destroy();
										mask = null;
									}else
										if(id == "contactusManager"){
											var labGrid = contactusManager();
											center.add(labGrid);
											center.setActiveTab(labGrid);
											labGrid.on('close', function() {
												this.destroy(true);
											});
											mask.hide();
											mask.destroy();
											mask = null;
										}else
											if(id == "labinstitutionManager")
											{
												var labGrid = labinstitutionManager();
												center.add(labGrid);
												center.setActiveTab(labGrid);
												labGrid.on('close', function() {
													this.destroy(true);
												});
												mask.hide();
												mask.destroy();
												mask = null;
											}
					}
				}
			}
		});
		
		var center = new Ext.TabPanel({
			id : 'centerId',
			region : 'center',
			items : [{
				title : '欢迎',
				html : '<td><td><center><h1>欢迎使用本系统！<tr> 具体功能请见导航栏</h1></center>',
				id : 'labRoot'
			}],
			enableTabScroll : true
		});
		center.setActiveTab('labRoot');
		var win = desktop.getWindow('labWin');
		///任务栏中显示的
		if (!win) {
			win = desktop.createWindow({
				id : 'labWin',
				title : "实验室管理",
				iconCls : 'lab',
				layout : 'border',
				width : 800,
				height : 500,
				shim : false,
				animCollapse : false,
				constrainHeader : true,
				minimizable : true,
				maximizable : true,
				items : [treePanel, center]
			});
		}
		win.show();	//桌面上显示的
	}
});


MyDesktop.routinescheduleWindow = Ext.extend(Ext.app.Module, {
	id : 'routinescheduleWin',
	init : function() {
		this.launcher = {
			text : '日常活动管理',
			iconCls : 'routineschedule',
			handler : this.createWindow,				
			scope : this
		}		
	},
	
	createWindow : function() {		
		var desktop = this.app.getDesktop();
		var root1 = new Ext.tree.TreeNode({
			id : 'routinescheduleRoot',
			text : '日常活动管理',
			iconCls : 'routineschedule-suit'
		});
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'majorManager',
			text : '专业管理',
			iconCls : 'routineschedule'
		}));
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'dutyManager',
			text : '值日安排管理',
			iconCls : 'routineschedule'
		}));
		// 异步加载树
		var treeLoader = new Ext.tree.TreeLoader({
			url : "resourcetype/resourcetypeTreeList.action"
		});
		var resourceManagerNode = new Ext.tree.AsyncTreeNode({
			id : 'resourceManager',
			text : '资源管理',
			iconCls : '',
			loader : treeLoader
		});
		root1.appendChild(resourceManagerNode);
		
		root1.appendChild(new Ext.tree.TreeNode({
			id : 'friendlylinkManager',
			text : '友情连接管理',
			iconCls : 'routineschedule'
		}));

		var treePanel = new Ext.tree.TreePanel({
			title : '导航',
			region : 'west',
			root : root1,
			split : true,
			width : 200,
			collapsible : true,
			margins : '3 0 1 3',
			cmargins : '3 3 3 3',
			layout : 'form',
			listeners : {
				click : function(obj) {
					var id = obj.attributes.id;
					var nodeText = obj.attributes.text;
					var parentnodeText =obj.parentNode.text;
					if (center.getItem(id)) {
						// 表示标签已打开则激活
						center.setActiveTab(id);
					} else {
						// 表示标签还没有打开，创建新的页面
						if (id == "dutyManager") {		
							// 加载前的等待标志
							var mask = new Ext.LoadMask(Ext.get('centerId'), {
							removeMask : true,
							msg : '正在加载数据......'
							});
							mask.enable();
							mask.show();
							var routinescheduleGrid = dutyManager();
							center.add(routinescheduleGrid);
							center.setActiveTab(routinescheduleGrid);
							routinescheduleGrid.on('close', function() {
								this.destroy(true);
							});
							mask.hide();
							mask.destroy();
							mask = null;
						}else
								if(id == "friendlylinkManager"){
									// 加载前的等待标志
									var mask = new Ext.LoadMask(Ext.get('centerId'), {
									removeMask : true,
									msg : '正在加载数据......'
									});
									mask.enable();
									mask.show();
									var routinescheduleGrid = friendlylinkManager();
									center.add(routinescheduleGrid);
									center.setActiveTab(routinescheduleGrid);
									routinescheduleGrid.on('close', function() {
										this.destroy(true);
									});
									mask.hide();
									mask.destroy();
									mask = null;
								}else
									if(id == "majorManager"){
										// 加载前的等待标志
										var mask = new Ext.LoadMask(Ext.get('centerId'), {
										removeMask : true,
										msg : '正在加载数据......'
										});
										mask.enable();
										mask.show();	
										var routinescheduleGrid = majorManager();
										center.add(routinescheduleGrid);
										center.setActiveTab(routinescheduleGrid);
										routinescheduleGrid.on('close', function() {
											this.destroy(true);
										});
										mask.hide();
										mask.destroy();
										mask = null;
									}else
										if(id == "resourcetype"){//项目类别管理
											// 加载前的等待标志
											var mask = new Ext.LoadMask(Ext.get('centerId'), {
											removeMask : true,
											msg : '正在加载数据......'
											});
											mask.enable();
											mask.show();
											var routinescheduleGrid = resourcetypeManager();
											center.add(routinescheduleGrid);
											center.setActiveTab(routinescheduleGrid);
											routinescheduleGrid.on('close', function() {
												this.destroy(true);
											});
											mask.hide();
											mask.destroy();
											mask = null;
										}else
											if(id == "resourcesubtype")
											{
												// 加载前的等待标志
												var mask = new Ext.LoadMask(Ext.get('centerId'), {
												removeMask : true,
												msg : '正在加载数据......'
												});
												mask.enable();
												mask.show();
												var routinescheduleGrid = resourcesubtypeManager();
												center.add(routinescheduleGrid);
												center.setActiveTab(routinescheduleGrid);
												routinescheduleGrid.on('close', function() {
													this.destroy(true);
												});
												mask.hide();
												mask.destroy();
												mask = null;
											}else
												{
													var ids= id.split('/');
													//Ext.Msg.alert('',parentnodeText);
													if(ids[0] == "resource"){//项目子类别管理
													// 加载前的等待标志
													var tabText = parentnodeText+'|'+nodeText;
													var mask = new Ext.LoadMask(Ext.get('centerId'), {
													removeMask : true,
													msg : '正在加载数据......'
													});
													mask.enable();
													mask.show();
													var routinescheduleGrid = resourcesManager(id,tabText);
													center.add(routinescheduleGrid);
													center.setActiveTab(routinescheduleGrid);
													routinescheduleGrid.on('close', function() {
													this.destroy(true);
													});
													mask.hide();
													mask.destroy();
													mask = null;
													}
												}
					}
				}
			}
		});
		var rightClickMenu = new Ext.menu.Menu({ // 菜单treePanel.menu
			// rightClickMenu
			items : [{
				text : '刷新',
				listeners : {
					click : function() {
						resourceManagerNode.reload();
					}
				}
			}]
		});
		treePanel.on("contextmenu", function(node, e) { // 注册右键菜单事件
					e.stopEvent();
					if (node.id == 'resourceManager') {
						node.select(); // 选择该节点
						rightClickMenu.showAt(e.getXY()); // 显示菜单
					}
				});
		
		var center = new Ext.TabPanel({
			id : 'centerId',
			region : 'center',
			items : [{
				title : '欢迎',
				html : '<td><td><center><h1>欢迎使用本系统！<tr> 具体功能请见导航栏</h1></center>',
				id : 'routinescheduleRoot'
			}],
			enableTabScroll : true
		});
		center.setActiveTab('routinescheduleRoot');
		var win = desktop.getWindow('routinescheduleWin');
		///任务栏中显示的
		if (!win) {
			win = desktop.createWindow({
				id : 'routinescheduleWin',
				title : "日常活动管理",
				iconCls : 'routineschedule',
				layout : 'border',
				width : 800,
				height : 500,
				shim : false,
				animCollapse : false,
				constrainHeader : true,
				minimizable : true,
				maximizable : true,
				items : [treePanel, center]
			});
		}
		win.show();	//桌面上显示的
	}
});