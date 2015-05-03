<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page	import="com.opensymphony.xwork2.ActionContext,com.domain.ResourceType,com.domain.ResourceSubtype ,java.util.List,com.domain.Resources "%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	List<ResourceSubtype> rstlist=(List<ResourceSubtype>) ActionContext.getContext().get("rstlist");
	List<ResourceType> rtlist=(List<ResourceType>) ActionContext.getContext().get("rtlist");
	List<Resources> resourceslist=(List<Resources>) ActionContext.getContext().get("resourcelist");
	int typeid = (Integer) ActionContext.getContext().get("typeid");
	int subtypeid = (Integer) ActionContext.getContext().get("subtypeid");
	int totalcount = (Integer) ActionContext.getContext().get("totalcount");
	int limit = (Integer) ActionContext.getContext().get("limit");
	if (limit == 0)
		limit = 20;
	int start = (Integer) ActionContext.getContext().get("start");
	int pagecount = (int) Math.ceil((double) totalcount / limit);
	int currentpage = (int) Math.ceil((double) start / limit) + 1;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>东华大学合胜联合实验室</title>
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
		function deleteconfirm(id)
		{
			var tid=document.getElementById("resources.resourceType.id").value;
			var subid=document.getElementById("resources.resourceSubtype.id").value;
			var url="deleters.action?action=search&start=0&resources.resourceType.id="+tid+"&resources.resourceSubtype.id="+subid+"&del_ids="+id;
			if(confirm('您确定要删除吗？'))
				window.location=url;
				//window.location='deleters.action?del_ids='+id;
		}	
		function submitlocation(start)
		{
			var tid=document.getElementById("resources.resourceType.id").value;
			var subid=document.getElementById("resources.resourceSubtype.id").value;
			var url="myzy.action?action=search&start="+start+"&resources.resourceType.id="+tid+"&resources.resourceSubtype.id="+subid;
			window.location=url;
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
									<table style="BORDER-COLLAPSE: collapse"  cellspacing=0 width=100% align=center bgcolor=#ffffff border=1>
							         <tr bgcolor="#99ccff">
											<td height="25" colspan="5">
												<div align="center"><strong>我的资源	</strong></div>
											</td>
										</tr>
									<tr>
											 	<td align="left" height="25" colspan="5">
											 		<form id="searchform" action="myzy.action">
											 		<input type="hidden" id="action" name="action" value="search"/>
											 		项目类别：<select name="resources.resourceType.id" id="resources.resourceType.id">
											 			<option value="0">所有</option>
											 			<%
											 				for(ResourceType rt:rtlist)
											 				{
											 			%>
											 			<option  value="<%=rt.getId() %>" <%=typeid==rt.getId()?"selected":"" %>><%=rt.getType() %></option>
											 			<%
											 				}
											 			%>
											 		</select>
											 			项目子类别：<select name="resources.resourceSubtype.id" id="resources.resourceSubtype.id">
											 			<option value="0">所有</option>
											 			<%
											 				for(ResourceSubtype rst:rstlist)
											 				{
											 			%>
											 			<option  value="<%=rst.getId() %>" <%=subtypeid==rst.getId()?"selected":"" %>><%=rst.getSubtype() %></option>
											 			<%
											 				}	
											 			%>
												 		</select>
												 		<input type="button" onclick="javascript:submitlocation(0)" value="查询"/>
												 		</form>
												 	</td>
												 </tr>

							         <tr style="font-weight:bold;" bgcolor="#FFFFFF">
					                    <td height="25" align="center">文件名</td>
					                    <td align="center">文件大小</td>
					                    <td align="center">上传时间</td>
					                    <td align="center">下载次数</td>
					                    <td align="center">操作</td>
					                  </tr>
					                  <s:subset source="#request.resourcelist" start="0" count="#totalcount">    
										<s:iterator status="status">
						                  <tr bgcolor="#FFFFFF">
						                    <td height="25" align="center" title="${filename}">${filename}</td>
						                    <td align="center">${filesize}</td>
						                    <td align="center">${uploadtime}</td>
						                    <td align="center">${downloadcounts}</td>
						                    <td align="center" nowrap="nowrap"><a href="resources/resourcesDownload.action?resources.id=${id}"  title="右键另存为下载" target='_blank'>下载</a>
						                    <a href="#" title="删除" onclick="deleteconfirm(${id})">删除</a>
						                    </td>
						                  </tr>
						               	</s:iterator>
						               </s:subset>
				              		</table>
				              		<%
				              			if(resourceslist!=null&&resourceslist.size()==0)
				              			{
				              		%>
				              		<table border="0" cellpadding="0" cellspacing="0"
											style="width: 100%; border-collapse: collapse;">
											<tr>
												<td height="30" align="center">
												<b>暂无相关信息！</b>
												</td>
											</tr>
									</table>
									<%
				              			}else
				              			{
									%>
              						<table  style="BORDER-COLLAPSE: collapse"  cellspacing=0 width=100% align=center bgcolor=#ffffff border=0>
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
													<a href="#" onclick="javascript:submitlocation(0);">[首页]</a>
												</td>
												<td nowrap="nowrap">
													<a href="#" onclick="javascript:submitlocation(<%=start-limit %>)">[上一页]</a>
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
													<a href="#" onclick="javascript:submitlocation(<%=start+limit %>)">[下一页]</a>
												</td>
												<td nowrap="nowrap">
													<a href="#" onclick="javascript:submitlocation(<%=(pagecount-1) * limit %>)">[尾页]</a>
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
													<select onchange="javascript:submitlocation(this.value)" size="1" style="width:35px"> 
														<%
															for (int i = 1; i <= pagecount; i++) {
																if (i == currentpage) {
														%>
														<option value="<%=(i - 1) * limit%>"
															selected="selected"><%=i%></option>
														<%
															} else {
														%>
														<option value="<%=(i - 1) * limit%>"><%=i%></option>
														<%
															}
															}
														%>
													</select>
													页
												</td>
											</tr>
										</table>
										<%
				              				}
										%>
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
