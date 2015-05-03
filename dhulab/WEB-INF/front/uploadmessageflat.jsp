<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page	import="com.opensymphony.xwork2.ActionContext,java.util.List,com.domain.Resources "%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String message=(String) ActionContext.getContext().get("message");
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
										<form name="uploadform" action="upload.action" enctype ="multipart/form-data" method="post" >
										<table style="BORDER-COLLAPSE: collapse"  cellspacing=0 width=100% align=center bgcolor=#ffffff border=0>
									      	<tr bgcolor="#99ccff">
												<td height="25" colspan="1">
													<div align="center"><strong>资源上传</strong></div>
												</td>
											</tr>
									         <tr>
							                  	<td align="center">
							                  	<%=message %><a href='myzy.action'><font color="blue">我的资源</font></a>
							                  	</td>
							                 </tr>
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
