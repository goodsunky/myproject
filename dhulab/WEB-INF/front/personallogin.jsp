<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page	import="com.opensymphony.xwork2.ActionContext,java.util.List,com.domain.Resources "%>
<%
	String login=(String) ActionContext.getContext().get("login");
	Boolean success=(Boolean) ActionContext.getContext().get("success");
%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>东华大学合胜联合实验室</title>
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
    	function checkdata()
    	{
	    	if(loginform.username.value=="")
	    	{
	        	alert('请输入用户名！');
	        	document.loginform.username.focus();
	        	return false;
	    	}else
	        	if(loginform.password.value=="")
	        	{
	            	alert('请输入密码！');
	            	document.loginform.password.focus();
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
          <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#000000">
              <%
              	if(login==null)
              	{
              %>
              <tr>
              <td align="center">
              <table style="BORDER-COLLAPSE: collapse"  cellspacing=0 width=100% align=center bgcolor=#ffffff border=0>
			         <tr style="font-weight:bold;">
	                    <td width="50%" nowrap="nowrap" align="center">
	                    	您尚未登录，请先<a href='userlogin.action' style="color:blue">登录</a>!!!
	                    	<br/>
	                    	测试用户名:test，密码：test
	                    </td>
	                  </tr>
              </table>
              </td>
              </tr>
              <%
              	}else
              	{
              %>
              <tr>
              	<td align="center">
              	<form name="loginform" action="clicklogin.action" method="post" onkeydown="if(event.keyCode==13) checkdata();">
              	<table style="BORDER-COLLAPSE: collapse"  cellspacing=0 width=100% align=center bgcolor=#ffffff border=0>
			         <tr>
	                  	<td colspan="4">&nbsp;</td>
	                 </tr>
			         <tr>
			         	<td width="35%">&nbsp;</td>
	                    <td nowrap="nowrap" align="right">用户名：</td>
	                    <td><input type="text" name="username"/></td>
	                    <td width="35%">&nbsp;</td>
	                  </tr>
	                  <tr>
	                  	<td colspan="4">&nbsp;</td>
	                  </tr>
	                  <tr>
			         	<td width="35%">&nbsp;</td>
	                    <td nowrap="nowrap" align="right">密码：</td>
	                    <td><input type="password" name="password"/></td>
	                    <td width="35%">&nbsp;</td>
	                  </tr>     
	                  <tr>
	                  	<td colspan="4">&nbsp;</td>
	                  </tr>
              		  <tr>	
              		  	<td width="35%">&nbsp;</td>
	                    <td nowrap="nowrap" align="center" colspan="2">
	                    	<input type="button" value="登录" onclick="checkdata();"/>
							<input type="reset" value="重置"/>    
						</td>              					
	                    <td width="35%">&nbsp;</td>
	                  </tr>
	                  <tr>
	                  	<td nowrap="nowrap" colspan="4" align="center">
	                  		<%
	                  			if(success!=null&&!success)
	                  			{
	                  		%>
	                  			<font color="#f00">请填写正确的用户信息！</font>
	                  		<%
	                  			}
	                  		%>
	                  	</td>
	                  </tr>
              </table>
              </form>
              	</td>
              </tr>
              <%
              	}
              %>
          </table>
          </td>
        </tr>
    </table>
<!-- 资源列表 -->
    
    <%@ include file="footer.jsp" %>
    </div>
</body>
</html>
