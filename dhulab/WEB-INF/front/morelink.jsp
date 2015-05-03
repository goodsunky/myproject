<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page
	import="com.opensymphony.xwork2.ActionContext,java.util.List,com.domain.FriendlyLink "%>
<%
	List<FriendlyLink> linkinfolist = (List<FriendlyLink>) ActionContext.getContext().get("linkinfolist");
	int totalcount = (Integer) ActionContext.getContext().get("totalcount");
	int limit = (Integer) ActionContext.getContext().get("limit");
	if (limit == 0)
		limit = 20;
	int start = (Integer) ActionContext.getContext().get("start");
	int pagecount = (int) Math.ceil((double) totalcount / limit);
	int currentpage = (int) Math.ceil((double) start / limit) + 1;
	//LabPicture lp=(LabPicture)ActionContext.getContext().get("labpicture");
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
			<%@ include file="header.jsp"%>
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
											<td align="left">
												当前位置:
												<a href='index.action'>首页</a>
												<span>></span>
												<a href='moreyqlj.action' title='友情链接'>友情链接</a>
											</td>
											<td width="9%" align="right" valign="bottom">
											</td>
											<td width="3%">
												&nbsp;
											</td>
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
											<table border="0" cellpadding="0" cellspacing="0"
												style="width: 100%; border-collapse: collapse;">
												<tr>
													<td>
														&nbsp;
														<img src="images/thumb.gif" vspace="2" />
														<a href='moreyqlj.action' title='友情链接'>友情链接</a>
													</td>
												</tr>
											</table>
								</td>
								<td width="1%" bgcolor="#679eb9">
									&nbsp;
								</td>
								<%
									if(linkinfolist!=null&&linkinfolist.size()==0)
									{
								%>
								<td width="100%" bgcolor="#FFFFFF">
										<table border="0" cellpadding="0" cellspacing="0"
											style="width: 100%; border-collapse: collapse;">
											<tr>
												<td height="30" align="center">
												<b>暂无相关信息！</b>
												</td>
											</tr>
										</table>
								</td>
								<%
									}else
									{
								%>
								<td width="100%" bgcolor="#FFFFFF">
										<table border="0" cellpadding="0" cellspacing="0"
											style="width: 100%; border-collapse: collapse;">
											<%
												for(FriendlyLink fl:linkinfolist)
												{
											%>
											<tr>
												<td height="30" align="left">
													<img src="images/linklogo.gif" width="11" height="11" />
													<a href="<%=fl.getAddress() %>" target="_blank"><%=fl.getName() %></a>
												</td>
											</tr>
											<%
												}
											%>
										</table>
										<table border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
											<tr>
												<%
													if (start == 0) {
												%>
												<td nowrap="nowrap">
													[首页]
												</td>
												<td nowrap="nowrap">
													[上一页]
												</td>
												<%
													} else {
												%>
												<td nowrap="nowrap">
													<a href="moreyqlj.action">[首页]</a>
												</td>
												<td nowrap="nowrap">
													<a href="moreyqlj.action?start=<%=start - limit%>">[上一页]</a>
												</td>
												<%
													}
												%>
												<%
													if (currentpage == pagecount) {
												%>
												<td nowrap="nowrap">
													[下一页]
												</td>
												<td nowrap="nowrap">
													[尾页]
												</td>
												<%
													} else {
												%>
												<td nowrap="nowrap">
													<a href="moreyqlj.action?start=<%=start + limit%>">[下一页]</a>
												</td>
												<td nowrap="nowrap">
													<a href="moreyqlj.action?start=<%=(pagecount - 1) * limit%>">[尾页]</a>
												</td>
												<%
													}
												%>
												<td nowrap="nowrap">
													共<%=totalcount%>条
												</td>
												<td nowrap="nowrap">
													每页显示<%=limit%>条
												</td>
												<td nowrap="nowrap">
													第<%=currentpage%>页/共<%=pagecount%>页
												</td>
												<td nowrap="nowrap">
													转到
													<select onchange="javascript:location=this.value" size="1" style="width:35px"> 
														<%
															for (int i = 1; i <= pagecount; i++) {
																if (i == currentpage) {
														%>
														<option value="<%="moreyqlj.action?start=" + (i - 1) * limit%>"
															selected="selected"><%=i%></option>
														<%
															} else {
														%>
														<option value="<%="moreyqlj.action?start=" + (i - 1) * limit%>"><%=i%></option>
														<%
															}
															}
														%>
													</select>
													页
												</td>
											</tr>
										</table>
										</td>
										<%
									}
										%>
										</tr>
						</table>
					</td>
				</tr>
			</table>
			<!-- 资源列表 -->
			<%@ include file="footer.jsp"%>
		</div>
	</body>
</html>
