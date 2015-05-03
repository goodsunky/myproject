<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page import="com.opensymphony.xwork2.ActionContext,java.util.List,java.util.Iterator, com.domain.Duty " %>
<%
	List<Duty> dutylist=(List<Duty>)ActionContext.getContext().get("dutylist");
	Duty detailduty=(Duty)ActionContext.getContext().get("duty");
	Duty showduty=new Duty();
	if(detailduty==null)
		showduty=dutylist.get(0);
	else
		showduty=detailduty;
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
                      	<a href='rchd.action' title='值日安排'>值日安排</a>
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
			         <%
			         	for(Duty duty:dutylist)
			         	{
			         %>
			         <tr>
	                    <td nowrap="nowrap">
	                        &nbsp;
	                    	<img src="images/thumb.gif"  vspace="2" />
	                    	<a href='detailduty.action?duty.id=<%=duty.getId() %>' title='<%=duty.getSemester() %>'>
	                    		<%=duty.getSemester() %>
	                    	</a>
	                    </td>
	                  </tr>
	                  <tr>
	                  	<td>&nbsp;</td>
	                  </tr>
	                  <%
			         	}
	                  %>
              </table>
              </div>
              </td>
              <td width="1%" bgcolor="#679eb9">
              &nbsp;
              </td>
              <td align="center" width="80%"  bgcolor="#FFFFFF">
              <div>
             <table style="BORDER-COLLAPSE: collapse"  cellspacing=0 width=100% align=center bgcolor=#ffffff border=1>
				<tbody>
				<tr bgcolor="#99ccff">
		              	<td align="center" colspan="7" height="40">
		              		<h3>实验室值日安排表(<%=showduty.getSemester() %>)
		              	</td>
		        </tr>
				<tr>
					<td height="25" nowrap="nowrap">
						<div align=center><b>星期一</div>
					</td>
					<td nowrap="nowrap">
						<div align=center><b>星期二</div>
					</td>
					<td nowrap="nowrap">
						<div align=center><b>星期三</div>
					</td>
					<td nowrap="nowrap">
						<div align=center><b>星期四</div>
					</td>
					<td nowrap="nowrap">
						<div align=center><b>星期五</div>
					</td>
					<td nowrap="nowrap">
						<div align=center><b>星期六</div>
					</td>
					<td nowrap="nowrap">
						<div align=center><b>星期日</div>
					</td>
				</tr>
				<tr>
					<td height="30">
						<div align=center><%=showduty.getMonday() %></div>
					</td>
					<td>
						<div align=center><%=showduty.getTuesday() %></div>
					</td>
					<td>
						<div align=center><%=showduty.getWendesday() %></div>
					</td>
					<td>
						<div align=center><%=showduty.getThursday() %></div>
					</td>
					<td>
						<div align=center><%=showduty.getFriday() %></div>
					</td>
					<td>
						<div align=center><%=showduty.getSaturday() %></div>
					</td>
					<td>
						<div align=center><%=showduty.getSunday() %></div>
					</td>
				</tr>
				<tr>
					<td height="30" colspan="7">
						<div align=center>主要任务：<%=showduty.getAssignment() %></div>
					</td>
				</tr>
				</tbody>
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
