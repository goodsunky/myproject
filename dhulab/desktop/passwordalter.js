var oldpwd='';
function passwordAlter()  {
			Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
			// 使用表单提示
			Ext.QuickTips.init();
			Ext.form.Field.prototype.msgTarget = 'qtip';
//			var requestConfig={
//				url:'getUserPassword.action',
//				callback:function(options,success,response){
//					var object = Ext.decode(response.responseText);
//					oldpwd=object.oldpassword;
//					pwdalter.getForm().findField('oldpassword').setValue(oldpwd);
//				}	
//			}
//			Ext.Ajax.request(requestConfig);
			// 定义表单
			var pwdalter = new Ext.FormPanel({
						labelWidth : 75,
						monitorValid : true, // 把有formBind:true的按钮和验证绑定
						baseCls : 'x-plain',
						defaults : {
							width : 150
						},
						defaultType : 'textfield', // 默认字段类型
						items : [{
									inputType : 'password',
									fieldLabel : '旧密码',
									id : 'oldpassword', // 元素名称
									allowBlank : false, // 不允许为空
									blankText : '旧密码不能为空!' // 错误提示内容
								}, {
									inputType : 'password',
									fieldLabel : '新密码',
									id : 'newpassword', // 元素名称
									allowBlank : false, // 不允许为空
									blankText : '新密码不能为空!' // 错误提示内容
								}, {
									inputType : 'password',
									fieldLabel : '确认密码',
									id : 'confirmpassword',
									allowBlank : false,
									blankText : '确认密码不能为空!'
								}],
						keys : [{
									key : 13, // 13代表回车
									fn : function() {
										document.getElementById('ok')
												.click();
									},
									scope : this
								}],
						buttons : [{
							id : 'ok',
							text : '确认',
							formBind : true,
							type : 'submit',
							handler : function() {
								// 加载进度条
								Ext.MessageBox.show({
											title : '请稍等',
											msg : '正在修改...',
											width : 300,
											closable : false,
											animEl : 'loading'
										});
								// 提交到服务器操作
								pwdalter.form.doAction('submit', {
											url : "passwordalter.action",
											method : 'post',
											params : '',
											success : function(form, action) {
												if (action.result.message == '修改成功') {
													Ext.Msg.alert('提示',action.result.message);
													win.close();
												} else {													
													Ext.Msg.alert('提示',action.result.message);
													pwdalter.form.reset();
												}
											},
											failure : function(form, action) {
												Ext.Msg.alert('错误',action.result.message);
											}
										});
							}
						}, {
							text : '取消',
							handler : function() {
								win.close();
							}
						}]
					});
			var win = new Ext.Window({
						id : 'pwdalterWin',
						title : '用户密码修改',
						layout : 'fit',
						width : 300,
						height : 170,
						modal : true,
						plain : true,
						bodyStyle : 'padding:5px;',
						closeAction : 'close',
						plain : true,
						buttonAlign : 'center',
						items : pwdalter
					});
			win.show();
			Ext.getCmp('oldpassword').focus(false, 500);
		};

