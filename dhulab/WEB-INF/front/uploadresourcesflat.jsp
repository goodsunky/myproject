<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page	import="com.opensymphony.xwork2.ActionContext, java.util.Map,com.domain.ResourceSubtype,com.domain.ResourceType, java.util.List,com.domain.Resources "%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String message=(String) ActionContext.getContext().get("message");
	Boolean success=(Boolean) ActionContext.getContext().get("success");
	List<ResourceSubtype> rstlist=(List<ResourceSubtype>) ActionContext.getContext().get("rstlist");
	List<ResourceType> rtlist=(List<ResourceType>) ActionContext.getContext().get("rtlist");
	ActionContext ctx = ActionContext.getContext();
	Map sessions = ctx.getSession();		
	String username=(String)sessions.get("COMMON_USERNAME");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>东华大学合胜联合实验室</title>
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="uploadify/uploadify.css" />
    <script type="text/javascript" src="uploadify/jquery.js"></script>
	<script type="text/javascript" src="uploadify/swfobject.js"></script>
	<script type="text/javascript" src="uploadify/jquery.uploadify.v2.0.1.js"></script>
    <script type="text/javascript">
	/*
	var i = 1;
	function addFile(dvID, inputNamePrefix)
	{
		if(i>9)
		{
			alert('最多上传十个文件！');
			return false;
		}else
		{
			var dv = document.getElementById(dvID);
            // 添加"选择文件："   
            var newNode1 = document.createElement("span");   
            newNode1.innerHTML = "选择文件：";   
            dv.appendChild(newNode1);  
            // 添加文件表单
			var file = document.createElement("input");
			file.type = "file";
			file.id = file.name = inputNamePrefix;
			dv.appendChild(file);	
			//添加删除按扭
			var btn = document.createElement("input");
			btn.type = "button";
			btn.id = btn.name = "btn" + i; 
			btn.value = "删除" ;	
			dv.appendChild(btn);
			var br1 = document.createElement('br');
			var br2 = document.createElement('br');
			dv.appendChild(br1);
			dv.appendChild(br2);
			i++;
			btn.onclick = function() { 
			var b = document.getElementById(btn.id);
			dv.removeChild(b.nextSibling); //remove <BR>
			dv.removeChild(b.nextSibling); //remove <BR>
			dv.removeChild(newNode1);
			dv.removeChild(b.previousSibling); //file
			dv.removeChild(b); //btn
			i--;
			}
		}		
	}
	function checkdata()
	{
		if(uploadform.file.value=="")
		{
			alert('请添加文件！');
			return false;
		}else
			uploadform.submit();
	}*/
	/*
	function setType(id)
	{
		typeid=id;			
	}
	function setSubType(id)
	{
		subtypeid=id;
	}*/	
</script>
<script type="text/javascript">	
     jQuery(document).ready(function(){
      //API http://www.cnblogs.com/mahaisong/archive/2011/06/25/2090075.html  
      //var script='';     								
                                    $('#file').uploadify(                           	     
                                            {
                                            	 onSelect :function(event,ID,fileObj){                                          	 		
													$("#myfile").val(fileObj.name);
								                   },
                                                   'uploader'       : 'uploadify/uploadify.swf',                                                   
                                                   'script'         :  'upload.action?username=<%=username%>/'+$('#typeid').val()+'/'+$('#subtypeid').val(),
                                                   'cancelImg'      : 'uploadify/cancel.png',
                                                    //'folder'         : '/uploads',     	
                                                    'auto'           :false, //是否自动开始  
                                                    'multi'          : true, //是否支持多文件上传  
                                                    'buttonText'     : 'BROWSE', //按钮上的文字  
                                                    'simUploadLimit' : 1, //一次同步上传的文件数目  
                                                    'sizeLimit'      : 204800000000000, //设置单个文件大小限制，单位为byte  
                                                    'queueSizeLimit' : 10,//队列中同时存在的文件个数限制  
                                                     'fileDataName': 'file',
                                                    'displayData'    : 'percentage',
                                                    //.jpg .gif .jpeg .png .bmp
                                                    'fileDesc'       : '请选择文件', //如果配置了以下的'fileExt'属性，那么这个属性是必须的  
                                                    //'*.jpg;*.gif;*.jpeg;*.png;*.bmp'
                                                    'fileExt'        : '*.*', //允许的格式
									                'height'         : 34,   //设置浏览按钮的宽度 ，默认值：110
										            'width'          : 118,//设置浏览按钮的高度 ，默认值：30。 
									                'buttonImg'      : 'uploadify/picture.jpg', 
									                'simUploadLimit' : 2, //允许同时上传的个数 默认值：1 。 
									                'wmode'          : 'transparent' ,  
									                 
									                onComplete       : function (event, queueID, fileObj, response, data){    
									                  $('<li></li>').appendTo('.files').text(response);
									                   },  
									                    
									              onAllComplete       : function (event,data){ 
									                var tips ="恭喜您，您成功上传了"+
									                data.filesUploaded+"个文件";//，平均上传速率  "+data.speed+" kb/s";
									                  alert(tips);
									                   },     
									                  
									                   
									                onError          : function(event, queueID, fileObj){ 
									                   alert("文件:" + fileObj.name + " 上传失败");} 
                   
                         });			
              });
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
										<!--  
										<form name="uploadform" enctype ="multipart/form-data" method="post" >
										-->
										<table style="BORDER-COLLAPSE: collapse"  cellspacing=0 width=100% align=center bgcolor=#ffffff border=0>
									      	<tr bgcolor="#99ccff">
												<td height="25" colspan="1">
													<div align="center"><strong>资源上传(最多上传十个文件！)</strong></div>
												</td>
											</tr>
											 <tr>
											 	<td align="left">
											 		项目类别：<select name="typeid" id="typeid">
											 			<%
											 				for(ResourceType rt:rtlist)
											 				{
											 			%>
											 			<option  value="<%=rt.getId() %>"><%=rt.getType() %></option>
											 			<%
											 				}
											 			%>
											 		</select>
											 		<br/>
											 		项目子类别：<select name="subtypeid" id="subtypeid">
											 			<%
											 				for(ResourceSubtype rst:rstlist)
											 				{
											 			%>
											 			<option  value="<%=rst.getId() %>"><%=rst.getSubtype() %></option>
											 			<%
											 				}	
											 			%>
												 		</select>
												 	</td>
												 </tr>			
									         <tr>
							                  	<td align="left" colspan="1">
							                  			<div>
							                  				<input type="text" id="myfile" size="50"/>
															<input type="button" value="开始上传" onclick="javascript:jQuery('#file').uploadifySettings('script','upload.action?username=<%=username%>/'+$('#typeid').val()+'/'+$('#subtypeid').val());jQuery('#file').uploadifyUpload()"/>
												            <input type="button" value="取消所有" onclick="javascript:jQuery('#file').uploadifyClearQueue()"/> 
												             <!--  <a href="javascript:jQuery('#file').uploadifyClearQueue()">取消所有上传</a>
												             -->
														</div>
														<div>
															<input type="file" name="file" id="file" />
														</div>
														<div id="list"></div>														
												</td>
							                 </tr>
							                 <!--  
							                   
									         <tr>
									         	<td align="left">
									         		<div id="filediv" align="left">
									         		<input type="button" value="继续添加" onclick="addFile('filediv','file')" />
									         		(最多上传十个文件！)<br/>
									         		选择文件：<input type='file'  name='file'/><br/><br/>
									         		</div>
									         	</td>							         	
							                  </tr>
							                  -->
							                  <tr>
							                  	<td colspan="1">&nbsp;</td>
							                  </tr>
							                  <!--  
						              		  <tr>	
							                    <td nowrap="nowrap" align="center" colspan="1">
							                    	<input type="button" value="保存" onclick="checkdata()"/>
													<input type="reset" value="重置"/>    
												</td>              					
							                  </tr>
							                  -->
             						 	</table>
             						 	<!--  
             						 	</form>
             						 	-->
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
