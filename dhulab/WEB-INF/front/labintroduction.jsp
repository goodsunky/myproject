<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page import="com.opensymphony.xwork2.ActionContext, java.util.* , com.domain.LabIntroduction, com.domain.LabPicture " %>
<%
	LabIntroduction li=(LabIntroduction)ActionContext.getContext().get("labintroduction");
	List<LabPicture> lplist=(List<LabPicture>)ActionContext.getContext().get("labpicturelist");
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
                      	<%
                      		if(li!=null)
                      		{
                      	%>
                      	<a href='introduction.action' title='实验室概况'>实验室概况</a>
                      	<%
                      		}
                      	%>
                      	<%
                      		if(lplist!=null)
                      		{
                      	%>
                      	<a href='labpicture.action' title='实验室风光'>实验室风光</a>
                      	<%
                      		}
                      	%>
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
	                    	<a href='introduction.action' title='实验室概况'>实验室概况</a>
	                    </td>
	                  </tr>
	                  <tr>
	                  	<td>&nbsp;</td>
	                  </tr>
	                  <tr>
	                    <td nowrap="nowrap">
	                    	&nbsp;
	                    	<img src="images/thumb.gif"  vspace="2" />
	                    	<a href='labpicture.action' title='实验室风光'>实验室风光</a>
	                    </td>
	                  </tr>
              </table>
              </div>
              </td>
              <td width="1%" bgcolor="#679eb9">
              &nbsp;
              </td>
              <td align="center" width="80%"  bgcolor="#FFFFFF">
              <div align="center">
              <%
              if(li!=null)
              {
              %>
              <table border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
			         <tr>
	                    <td align="left" style="font-size:15px">
	                    <p>
	                    <%=li.getIntroduction() %>
	                    </p>
	                    </td>
	                  </tr>
              </table>
              <%
              }
              %>
              <%
              if(lplist!=null)
              {
            	  int count_line=3;
            	  double x=(double)lplist.size()/count_line;
            	  int lines=(int)Math.ceil(x);
            	  int index=0;
              %>
              <table border="0" cellspacing="0" align="center" cellpadding="0" style="width:100%;border-collapse:collapse;">
                <tbody>
                    <tr>
                    	<td height="40" align="center" colspan="6" bgcolor="#99ccff">
                    		<h3>实验室风光</h3>
                    	</td>                    	
                    </tr>
                    <!--  
                    <tr>
                    	<td align="center" colspan="6">
                    		&nbsp;
                    	</td>                    	
                    </tr>
                    -->
                    <%
                    	for(int k=1;k<=lines;k++)
                    	{
                    		int temp=index;                	
                    %>
		                    <tr>
		                    	<%
			                    	for(int i=index;i<count_line+temp&&i<lplist.size();i++)
		                        	{
		                    	%>
		                        <td>
		                        	<table>
		                        		<tr>
		                        			<td align="center">
		                        				<img title="<%=lplist.get(i).getDescribes() %>" width="200" height="200" src="<%=lplist.get(i).getFilename() %>" border="1" />
		                        			</td>
		                        			<!--  
		                        			<td>&nbsp;</td>
		                        			-->
		                        		</tr>
		                        		<tr>
		                        			<td align="center">
		                        				<%=lplist.get(i).getDescribes() %>
		                        			</td>
		                        			<!--  
		                        			<td>&nbsp;</td>
		                        			-->
		                        		</tr>
		                        	</table>
		                        </td>
		                        <%
		                        	index++;
		                        	}
		                        %>
		                    </tr> 

                    <%
                    	}
                    %>                 
                </tbody>
            </table>
              <%
              }
              %>
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
