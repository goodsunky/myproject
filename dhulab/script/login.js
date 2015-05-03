Ext.onReady(function() {
			Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
			// 使用表单提示
			Ext.QuickTips.init();
			Ext.form.Field.prototype.msgTarget = 'qtip';
//			var store=new Ext.data.SimpleStore({
//				fields:['usertype'],
//				data :[['普通用户'],['系统管理员']]
//			});
			// 定义表单
			var login = new Ext.FormPanel({
						labelWidth : 75,
						monitorValid : true, // 把有formBind:true的按钮和验证绑定
						baseCls : 'x-plain',
						defaults : {
							width : 150
						},
						defaultType : 'textfield', // 默认字段类型

						items : [{
									fieldLabel : '用户名',
									id : 'username', // 元素名称
									allowBlank : false, // 不允许为空
									blankText : '用户名不能为空!' // 错误提示内容
								}, {
									inputType : 'password',
									fieldLabel : '密码',
									id : 'password',
									allowBlank : false,
									blankText : '密码不能为空!'
								},
//									new Ext.form.ComboBox({
//									id :'usertype',
//									fieldLabel :'用户类型',
//									triggerAction :'all',
//									displayField :'usertype',
//									editable:false,
//									mode : 'local',
//									value :'普通用户',
//									store : store
//								}), 
								{
									id : 'randcode',
									width : 90,
									fieldLabel : "验证码",
									allowBlank : false,
									blankText : "验证码必须输入"
								}],
						keys : [{
									key : 13, // 13代表回车
									fn : function() {
										document.getElementById('login')
												.click();
									},
									scope : this
								}],
						buttons : [{
							id : 'login',
							text : '登录',
							formBind : true,
							type : 'submit',
							handler : function() {
								// 加载进度条
								Ext.MessageBox.show({
											title : '请稍等',
											msg : '正在登录...',
											width : 300,
											closable : false,
											animEl : 'loading'
										});
								// 提交到服务器操作
								login.form.doAction('submit', {
											url : "login.action",
											method : 'post',
											params : '',
											success : function(form, action) {
												if (action.result.success == true) {
													window.location = 'desktop.action';
												} else {
													Ext.Msg.alert('登录失败',action.result.message);
												}
											},
											failure : function(form, action) {
												Ext.Msg.alert('错误',action.result.message);
											}
										});
							}
						}, {
							text : '重置',
							handler : function() {
								login.form.reset();
							}
						}]
					});

			var win = new Ext.Window({
						id : 'loginWin',
						title : '管理员登录',
						layout : 'fit',
						width : 300,
						height : 170,
						modal : true,
						plain : true,
						bodyStyle : 'padding:5px;',
						maximizable : false,
						closeAction : 'close',
						closable : false,
						collapsible : true,
						plain : true,
						buttonAlign : 'center',
						items : login
					});
			win.show();
			var rc = Ext.getDom('randcode');
			var rcp = Ext.get(rc.parentNode);
			rcp.createChild({
						tag : 'img',
						src : 'desktop/image.jsp',
						align : 'absbottom'
					});
			Ext.getCmp('username').focus(false, 500);
		});
