<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page import="com.opensymphony.xwork2.ActionContext,java.util.List , com.domain.LabMember " %>
<%
	List<LabMember> lmlist=(List<LabMember>)ActionContext.getContext().get("labmemberlist");
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
                      	
                      	<a href='chengyuan.action' title='实验室成员'>实验室成员</a>
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
              <br/>
              <div>
              <table border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
	                  <tr>
	                    <td nowrap="nowrap">
	                    	&nbsp;
	                    	<img src="images/thumb.gif"  vspace="2" />
	                    	<a href='chengyuan.action' title='实验室成员'>实验室成员</a>
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
              <td align="center" width="80%"  bgcolor="#FFFFFF">
              <table style="BORDER-COLLAPSE: collapse"  cellspacing=0 width=100% align=center bgcolor=#ffffff border=1>
              <tr bgcolor="#99ccff">
											<td height="40" colspan="7">
												<div align="center"><h3>实验室成员</h3></div>
											</td>
										</tr>
              <tr>
              	<td height="30" align="center">
              		<b>年级</b>
              	</td>
              	<td align="center">
              		<b>专业</b>
              	</td>
              	<td align="center">
              		<b>成员</b>
              	</td>
              </tr>
              	<%
              		for(LabMember lm:lmlist)
              		{
              	%>
			         <tr>
			         	<td height="30" align="center">
			         	<%=lm.getGrade() %>
			         	</td>
	                    <td align="center">
	                     <%=lm.getMajor() %>
	                    </td>
	                    <td align="center">
	                     <%=lm.getMember() %>
	                    </td>
	                  </tr>
	             <%
              		}
	             %>
              </table>
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
