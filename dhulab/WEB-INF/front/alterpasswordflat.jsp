<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page	import="com.opensymphony.xwork2.ActionContext,java.util.List,com.domain.Resources "%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String message=(String) ActionContext.getContext().get("message");
	Boolean success=(Boolean) ActionContext.getContext().get("success");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>东华大学合胜联合实验室</title>
    <link href="css/style.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript">
    	function checkdata()
    	{
	        	if(loginform.oldpassword.value=="")
	        	{
	            	alert('请输入旧密码！');
	            	document.loginform.oldpassword.focus();
	            	return false;
	        	}else
		        	if(loginform.newpassword.value=="")
		        	{
		            	alert('请输入新密码！');
		            	document.loginform.newpassword.focus();
		            	return false;
		        	}else
		        		if(loginform.confirmpassword.value=="")
			        	{
			            	alert('请再次输入新密码！');
			            	document.loginform.confirmpassword.focus();
			            	return false;
			        	}else
				        	if(loginform.newpassword.value!=loginform.confirmpassword.value)
				        	{
					        	alert('两次输入的新密码不匹配！');
					        	return false;
				        	}else
	            				loginform.submit();
    	}
    </script>
</head>
<body>
	<div align="center">
    <%@ include file="header.jsp" %>
   <!-- 实验室风采 -->
 	<table width="778" border="0" cellspacing="0" cellpadding="0" align="center">
        <tr>
          <td>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="14"><img src="images/subrighttitle2_03.gif" width="14" height="25" /></td>
                <td valign="bottom" background="images/subrighttitle2_06.gif">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left" > 当前位置:
                        <a href='index.action'>首页</a>
                      	<span>></span>
                      	<a href='zyxz.action' title='资源下载'>资源下载</a>
                      </td>
                      <td align='right'>
                      		<a href='sczy.action'>上传资源</a>
                      </td>
                      <!--  
                      <td width="9%" align="right" valign="bottom">
                      </td>
                      <td width="3%">&nbsp;</td>
                      -->
                    </tr>
                </table>
                </td>
                <td width="14"><img src="images/subrighttitle2_08.gif" width="14" height="25" /></td>
              </tr>
          </table>
          </td>
        </tr>
        <tr>
        	<td bgcolor="#679eb9" class="Padding1">
        		<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td valign="top" align="left" width="19%" bgcolor="#FFFFFF">
								<br/>
								<%@ include file="personalflat.jsp" %>	
								</td>
								<td width="1%" bgcolor="#679eb9">
									&nbsp;
								</td>
								<td width="100%" bgcolor="#FFFFFF" valign="top">
										<form name="loginform" action="alterpwd.action" method="post" onkeydown="if(event.keyCode==13) checkdata();">
										<table style="BORDER-COLLAPSE: collapse"  cellspacing=0 width=100% align=center bgcolor=#ffffff border=0>
									      <tr bgcolor="#99ccff">
											<td height="25" colspan="4">
												<div align="center"><strong>密码修改</strong></div>
											</td>
										</tr>
											<%
												if(message!=null)
												{
											%>
											 <tr>
											 	<td colspan="4">&nbsp;</td>
											 </tr>
											 <tr>
											 	<td colspan="4">&nbsp;</td>
											 </tr>
											 <tr>
											 	<td colspan="4">&nbsp;</td>
											 </tr>
									         <tr>
									         	<td colspan="4" align="center">
									         	<font color="#f00"><%=message %></font>
									         	</td>
									         </tr>
									         <%
												}
									         %>
									         <%
									         	if(success!=null&&!success)
									         	{
									         %>
									         <tr>
											 	<td colspan="4">&nbsp;</td>
											 </tr>
									         <tr>
									         	<td width="35%">&nbsp;</td>
							                    <td nowrap="nowrap" align="right">旧密码：</td>
							                    <td><input type="password" name="oldpassword"/></td>
							                    <td width="35%">&nbsp;</td>
							                  </tr>
							                  <tr>
							                  	<td colspan="4">&nbsp;</td>
							                  </tr>
							                  <tr>
									         	<td width="35%">&nbsp;</td>
							                    <td nowrap="nowrap" align="right">新密码：</td>
							                    <td><input type="password" name="newpassword"/></td>
							                    <td width="35%">&nbsp;</td>
							                  </tr>
							                  <tr>
							                  	<td colspan="4">&nbsp;</td>
							                  </tr>
							                  <tr>
									         	<td width="35%">&nbsp;</td>
							                    <td nowrap="nowrap" align="right">确认新密码：</td>
							                    <td><input type="password" name="confirmpassword"/></td>
							                    <td width="35%">&nbsp;</td>
							                  </tr>
							                  <tr>
							                  	<td colspan="4">&nbsp;</td>
							                  </tr>
						              		  <tr>	
						              		  	<td width="35%">&nbsp;</td>
							                    <td nowrap="nowrap" align="center" colspan="2">
							                    	<input type="button" value="保存" onclick="checkdata();"/>
													<input type="reset" value="重置"/>    
												</td>              					
							                    <td width="35%">&nbsp;</td>
							                  </tr>
							                  <%
									         	}
							                  %>
             						 	</table>
             						 	</form>
								</td>
								</tr>
				</table>
              	</td>
           </tr>
    </table>
    <%@ include file="footer.jsp" %>
    </div>
</body>
</html>
