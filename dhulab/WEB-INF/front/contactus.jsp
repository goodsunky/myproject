﻿<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page import="com.opensymphony.xwork2.ActionContext, com.domain.Contactus " %>
<%
Contactus cus=(Contactus)ActionContext.getContext().get("contactus");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>东华大学合胜联合实验室</title>
    <link href="css/style.css" rel="stylesheet" type="text/css" />
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
                      	<a href='gywm.action' title='联系我们'>联系我们</a>
                      </td>
                      <td width="9%" align="right" valign="bottom">
                      </td>
                      <td width="3%">&nbsp;</td>
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
              <br>
              <div>
              <table border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
			         <tr>
	                    <td nowrap="nowrap">
	                        &nbsp;
	                    	<img src="images/thumb.gif"  vspace="2" />
	                    	<a href='gywm.action' title='联系我们'>联系我们</a>
	                    </td>
	                  </tr>
	                  <tr>
	                  	<td>&nbsp;</td>
	                  </tr>
              </table>
              </div>
              </td>
              <td width="1%" bgcolor="#679eb9">
              &nbsp;
              </td>
              <td align="left" width="80%"  bgcolor="#FFFFFF">
              <div>
              <table border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
              		<tr>
              		<td align="left">
              			<a href="location.html" target="_blank">
              			<img title="点击放大" width="450" height="400" src="images/map.jpg" / border="0">
              			<a>
              		</td>
              		</tr>
			         <tr>
	                    <td>
	                    <p><%=cus.getAboutus() %>
	                    </td>
	                  </tr>
              </table>
              </div>
              </td>
              </tr>
          </table>
          </td>
        </tr>
    </table>
<!-- 资源列表 -->
    
    <%@ include file="footer.jsp" %>
    </div>
</body>
</html>
