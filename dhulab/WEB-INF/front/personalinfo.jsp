<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page	import="com.opensymphony.xwork2.ActionContext,java.util.List,com.domain.Userinfo "%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	Userinfo ui = (Userinfo) ActionContext.getContext().get("userinfo");
	String message = (String) ActionContext.getContext().get("message");
	String image="xyz.jpg";
	if(ui.getImage().split("/").length==3)
		image=ui.getImage().split("/")[2];
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>东华大学合胜联合实验室</title>
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <script language="javascript" type="text/javascript" src="script/DatePicker/WdatePicker.js"></script>
    <script type="text/javascript">
    	function checkdata()
    	{
    		updateform.submit();
    	}    	
    	function getFullPath(obj)
    	{
	    	if(obj)
	    	{
		    	//ie
		    	if (window.navigator.userAgent.indexOf("MSIE")>=1)
		    	{
		    		obj.select();
		    		obj.blur();
		    		return document.selection.createRange().text;
		    	}
		    	//firefox
		    	else 
			    	if(window.navigator.userAgent.indexOf("Firefox")>=1)
		    		{
		    			if(obj.files)
		    			{
		    				//return obj.files.item(0).getAsDataURL();
		    				return window.URL.createObjectURL(obj.files[0]);
		    			}
		    			return obj.value;
		    		}
		    	return obj.value;
	    	}
    	}
    	
    	/*function changeimage(obj)
    	{
    		var file = document.getElementById('file');
    		file.click();
    		file.change();
    		//file.blur();
    		obj.src=getFullPath(file);
    	}*/
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
								<td width="80%" bgcolor="#FFFFFF" valign="top">
									<form action="save.action" enctype ="multipart/form-data" name="updateform" method="post" >									
									<input type="hidden" name="userinfo.id" value="<%=ui.getId() %>"/>
									<input type="hidden" name="userinfo.image" value="<%=image %>"/>
									<input type="hidden" name="userinfo.password" value="<%=ui.getPassword() %>"/>
									<input type="hidden" name="userinfo.role" value="<%=ui.getRole() %>"/>
									<table style="BORDER-COLLAPSE: collapse"  cellspacing=0 width=100% align=center bgcolor=#ffffff border=1>
										<tr bgcolor="#99ccff">
											<td height="25" colspan="7">
												<div align="center"><strong>个人信息	</strong></div>
											</td>
										</tr>
										<tr> 
										 	<td nowrap="nowrap" align="center"><strong>用户名</strong></td>
										    <td align="left">
										    	<input size="30" type=text name=userinfo.username value="<%=ui.getUsername() %>" readonly="readonly"/></td>
										    <td nowrap="nowrap" align="center"><strong>姓名</strong></td>
										    <td align="left">
										    	<input size="30" type=text name=userinfo.name value="<%=ui.getName() %>" />
										    </td>									    
										    <td rowspan="5" valign="top" >
										    	<img id="image"  src="<%=ui.getImage().split("/").length==3?ui.getImage():image %>"  title="我的头像" width="100" height="100"   />
								    	
										    </td>
										 </tr>
										 <tr> 
										 	<td nowrap="nowrap" align="center"><strong>工/学号</strong></td>
										    <td align="left">
										    	<input size="30" type=text name=userinfo.number value="<%=ui.getNumber() %>"/></td>
										    <td nowrap align="center"><strong>性别</strong></td>
										    <td align="left">
										    	<select name="userinfo.sex">
											    	<option value="男" <%="男".equals(ui.getSex())?"selected":"" %>>男</option>
											    	<option value="女" <%="女".equals(ui.getSex())?"selected":"" %>>女</option>
											    </select>											    
										    </td>										    
										 </tr>
										 <tr> 
										 	<td nowrap="nowrap" align="center"><strong>职称</strong></td>
										    <td align="left">
											    <select name="userinfo.position">
											    	<option value="" <%="".equals(ui.getPosition())?"selected":"" %>></option>
											    	<option value="教授" <%="教授".equals(ui.getPosition())?"selected":"" %>>教授</option>
											    	<option value="副教授" <%="副教授".equals(ui.getPosition())?"selected":"" %>>副教授</option>
											    	<option value="讲师" <%="讲师".equals(ui.getPosition())?"selected":"" %>>讲师</option>
											    	<option value="研究员" <%="研究员".equals(ui.getPosition())?"selected":"" %>>研究员</option>
											    	<option value="副研究员" <%="副研究员".equals(ui.getPosition())?"selected":"" %>>副研究员</option>
											    	<option value="高级工程师" <%="高级工程师".equals(ui.getPosition())?"selected":"" %>>高级工程师</option>
											    	<option value="学生" <%="学生".equals(ui.getPosition())?"selected":"" %>>学生</option>
											    </select>
										    </td>
										    <td nowrap="nowrap" align="center"><strong>角色</strong></td>
										    <td align="left" colspan="1">
										    	<select name="role" disabled="disabled">
											    	<option value="系统管理员" <%="系统管理员".equals(ui.getRole())?"selected":"" %>>系统管理员</option>
											    	<option value="教师" <%="教师".equals(ui.getRole())?"selected":"" %>>教师</option>
											    	<option value="学生" <%="学生".equals(ui.getRole())?"selected":"" %>>学生</option>
											    </select>
										    </td>
										 </tr>
										 <tr> 
										 	 <td nowrap="nowrap" align="center"><strong>电话</strong></td>
										    <td align="left">
											    <input size="30" type=text name=userinfo.telphone value="<%=ui.getTelphone() %>" />
										    </td>
										    <td nowrap="nowrap" align="center"><strong>邮箱</strong></td>
										    <td align="left" colspan="1">
										    	<input size="30" type=text name=userinfo.mail value="<%=ui.getMail() %>" />
										    </td>								    					    
										 </tr>
										 <tr>
										 	<td nowrap="nowrap" align="center"><strong>专业</strong></td>
										    <td align="left">
										    	<input size="30" type=text name=userinfo.major value="<%=ui.getMajor() %>" />
										    </td>
										    <td nowrap="nowrap" align="center"><strong>研究方向</strong></td>
										    <td align="left" colspan="1">
										    	<input size="30" type=text name=userinfo.resguid value="<%=ui.getResguid() %>"/>
										    </td>									    
										 </tr>
										 <tr>
										 	<td nowrap="nowrap" align="center"><strong>入学时间</strong></td>
										    <td align="left">
										    	<input class="Wdate" size="30" type=text id="userinfo.entrytime" name="userinfo.entrytime" onclick="WdatePicker()" value="<%=ui.getEntrytime() %>"/>
										    </td>			
										    <td align="center">
										    	<strong>头像</strong>
										    </td>		
										    <td align="left" colspan="2">										    	
										    	<input type="file" id="file" name="file" onchange="javascript:document.getElementById('image').src=getFullPath(this);"/>	
										    </td>
										 </tr>
										 <tr>
										 	<td nowrap="nowrap" align="center"><strong>在校事迹</strong></td>
										    <td align="left" colspan="4">
											    <textarea cols="50"  name="userinfo.story"><%=ui.getStory() %></textarea>
										    </td>
										 </tr>
										 <tr>
										 <td colspan="5" align="center">
										 <input type="button"  onclick="checkdata()"  value="保存"/>
										 <input type="button"  onclick="javascript:window.location.href='grxx.action'"  value="刷新"/>
										 </td>
										 </tr>
										 <%
										 	if(message!=null)
										 	{
										 %>
										 <tr>
										 <td colspan="5" align="center">
										 <font color="#f00"><%=message %></font>
										 </td>
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
