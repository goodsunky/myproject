<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page import="com.opensymphony.xwork2.ActionContext, com.domain.NoticeInfo, com.domain.NoticeAttachment " %>
<%
	NoticeInfo ni=(NoticeInfo)ActionContext.getContext().get("noticeinfodetail");
	NoticeAttachment na=(NoticeAttachment)ActionContext.getContext().get("noticeinfoattachment");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<Meta http-equiv="Content-Type" Content="text/html; Charset=utf-8">
	<title><%=ni.getTitle() %></title>	
	<link href="css/pop.css" rel="stylesheet" type="text/css"/>
	<script language="text/javascript">FixSize(796, 615);</script>
	<script type="text/javascript">
 	function exitwindow()
 	{
 		//if(confirm("您是否确定关闭此窗口？"))
 		//{
 			window.parent.window.close();
 			window.parent.location = "about:blank";
 		//}
 	}
	</script>
	
</head>
<body style="overflow:auto;overflow-x:hidden">
    <div class="pop">

        <div class="t">
            <div class="title"></div>
        </div>

        <div class="b">
            <div class="bb">
                <div class="article">
                     <div class="atitle"><b><%=ni.getTitle() %></b></div>
                     <div class="ainfo">发布时间：<%=ni.getTime() %> &nbsp;&nbsp;来源：<%=ni.getType() %>&nbsp;&nbsp;访问次数：<%=ni.getReadcount() %></div>
                     <div class="acontent">
                     	<%=ni.getContent() %>
            	
					 </div>
					 <div class="attachment">
					 <%
                    	 if(na!=null)
                    	 {
                    	%>
                    	<p>
                    	【附件】：
                    	<a href="noticeinfo/noticeattachmentDownload.action?noticeinfo.id=<%=ni.getId() %>" target="_blank"><%=na.getName() %></a>
                    	<p>
                    	请点击鼠标右键用“目标另存为” 方式下载           
                    	<%
                    	}
                    	%>  
                    </div>
                </div>
                <div class="button"><input name="button" type="button" class="button" onClick="javascript:exitwindow()" value="关闭窗口"/></div>
            </div>
         </div>
        <div class="f"></div>
    </div>
    <%@ include file="footer.jsp" %>
</body>
</html>