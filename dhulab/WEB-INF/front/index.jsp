<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@page import="com.opensymphony.xwork2.ActionContext,java.util.List , com.domain.LabPicture " %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	List<LabPicture> lplist=(List<LabPicture>)ActionContext.getContext().get("labpicturelist");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>东华大学合胜联合实验室</title>
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <!--  
    <script type="text/javascript" src="script/changepics.js"></script>
    -->
    <script type="text/javascript" src="script/jquery.js"></script>
    <script language="javascript" runat="server">
		setInterval("currentdatetime.innerHTML='今天是'+new Date().toLocaleString();",1000); 
	</script>    
	
	<script type="text/javascript">
	function remindInfo()
	{
	 	alert('今天你值日了吗？\n不要偷懒哦...');
	 	return false;
	} 
	</script>
	<style type="text/css">
	    .banner {position:relative;float:left;margin:0; width:255px; height:255px; overflow:hidden;}
	    .banner_list img{width:255px; height:255px;}
	    .banner_bg {width:255px;position:absolute; bottom:0;background-color:#000;height:24px;filter: Alpha(Opacity=50);opacity:0.5;z-index:1;cursor:pointer;}
	    .banner_info{position:absolute; bottom:0; left:3px;height:20px;color:#fff;z-index:2;font-size:12px;cursor:pointer}
	    /*.banner_text {position:absolute;width:120px;z-index:3; right:3px; bottom:3px;}*/
	    /*右下角编号 relative*/
	    .banner_ul {position:absolute;list-style-type:none;z-index:4;margin:0px 0px 0px 0px;padding:0; bottom:1px; right:1px;}
	    .banner_ul li {width:20px;line-height:20px;text-align:center;float:left;display:block;color:#ff6666;border:#e7f2fd 1px solid;background:#FFF;cursor:pointer}
	    .banner_ul .banner_on { background:#ff6666;color:#FFF}
	    .banner_list a{position:absolute;}
	</style>
	<script type="text/javascript">
    jQuery.fn.extend({
        picture:function(t){
            var id="#"+$(this).attr("id");
            var n = -1, i_count,interval="<ul class='banner_ul'>";
            i_count=$(id+"_list a").length;
            for(var i=0;i<i_count;i++){
                interval+="<li>"+(i+1)+"</li>";
            }
            $(id+"_info").after(interval+"<\/ul>");
            $(id+" li").click(function(e) {
                e.stopPropagation();
                n=$(this).index();
                $(id+"_info").html($(id+"_list a").eq(n).find("img").attr('title'));
                $(id+"_list a").filter(":visible").fadeOut(500).parent().children().eq(n).fadeIn(1000);
                $(this).addClass("banner_on");
                $(this).siblings().removeAttr("class");
            });
            interval = setInterval(showAuto, t);
            $(this).hover(function(){clearInterval(interval)}, function(){interval = setInterval(showAuto, t)});
            function showAuto(){
                n = n >=(i_count-1) ? 0 : ++n;
                $(id+" li").eq(n).click();
            }
            showAuto();
        }
    });
    $(document).ready(function(){
        $("#banner").picture(5000);
        $("#bann").picture(4000);
        //还可继续加
    });
</script>
</head>
<body>
	<div align="center">
    <%@ include file="header.jsp" %>    
    <table width="778" border="0" cellspacing="0" cellpadding="0" align="center">
        <tr>                   
            <td width="778" bgcolor="#cce6f7">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td width="80" height="29" align="center">
                            <img src="images/topmenu_22.gif" width="71" height="23" />
                        </td>
                        <td width="100%" align="center">
                            <marquee direction="left" scrollamount="2" loop="-1" onmouseover="this.stop()" onmouseout="this.start()"  width="98%">
								<table cellpadding="0" border="0" cellspacing="0">
								<tr>
									   <td>&nbsp;<img src="images/con_2_navarrow.gif"  vspace="2" />&nbsp;</td>
									   <td  style="white-space: nowrap;">
									      <a href="#" class="blueHead" target="_blank" title="标题：欢迎访问东华大学合胜联合实验室网站&#13&#10时间：2009-9-2 22:01:40">欢迎访问东华大学合胜联合实验室网站！</a>&nbsp;&nbsp;
									      <span id="currentdatetime"></span>
									   </td> 
								</tr>
								</table>
							</marquee>
                        </td>
                    </tr>
                </table>
             </td>
        </tr>
    </table>    
    
<table width="778" align="center" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="266" valign="top" bgcolor="#e6edf1">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
        	<img src="images/left_03.jpg" width="266" height="44" />
        </td>
      </tr>
      <tr>
        <td align="center">
        <table width="95%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="left">                        	
				<div id="banner" class="banner">
				    <div id="banner_bg" class="banner_bg"></div>
				    <div id="banner_info" class="banner_info"></div>
				    <div id="banner_list" class="banner_list">
				        <%
				        	if(lplist!=null&&lplist.size()>=4)
				        	{
								for(int i=0;i<4;i++)
								{
						%>
							<a href="#"><img src="<%=lplist.get(i).getFilename() %>"  title="<%=lplist.get(i).getDescribes() %>" border="0" /></a>
						<%
								}
				        	}
						%>
				    </div>
				</div>
               <!--<img src="images/left_07.gif" width="252" height="138" /> 235-->
            </td>
          </tr>
          <tr>
            <td align="left" style="padding:6px 0;" >
            <div id=demo style="overflow:hidden;height:248px;width:254px;font-color=#5c5b5b"> 
			<div id=demo1>
				<div class="ScrollContent">
					<p>
					<span style="color:#e83a05;font-weight:bold;">东华大学合胜联合实验室<br/></span>
					<s:iterator value="#request.labintroductionlist">
					&nbsp;${introduction}
					</s:iterator>
					</p>
				</div>
			</div> 
 			<div id=demo2></div> 
 			</div>
	<script> 
	var speed=80 
		demo2.innerHTML=demo1.innerHTML //克隆demo1为demo2 
	function Marquee(){ 
		//当滚动至demo1与demo2交界时 
		if(demo2.offsetTop-demo.scrollTop<=0)   
		demo.scrollTop-=demo1.offsetHeight //demo跳到最顶端 
		else{ 
		demo.scrollTop++ 
		   } 
		   } 
		   var MyMar=setInterval(Marquee,speed)//设置定时器 
		//鼠标移上时清除定时器达到滚动停止的目的 
		   demo.onmouseover=function() {clearInterval(MyMar)} 
		//鼠标移开时重设定时器 
		   demo.onmouseout=function(){MyMar=setInterval(Marquee,speed)} 
	</script> 
	</td>
	</tr>
	</table>
	</td>
	</tr>
	</table>
	
	<!--start 值日安排 -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td bgcolor="#FFFFFF"><img src="images/space.gif" width="8" height="8" /></td>
        </tr>
        <tr>
          <td align="center">          
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="14">
                	<img src="images/righttitle2_03.gif" width="14" height="43" /></td>
                <td valign="bottom" background="images/righttitle2_06.gif">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left"><img src="images/routineschedule.gif" width="126" height="43" /></td>
                      <td width="9%" align="right" valign="bottom">
                      </td>
                      <td width="3%">&nbsp;</td>
                    </tr>
                </table>
                </td>
                <td width="14"><img src="images/righttitle2_08.gif" width="14" height="43" /></td>
              </tr>
          </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#679eb9" class="Padding1"><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
              <tr>
                <td align="center">
                    <table  cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
						<tr onclick="remindInfo()">
							<td>
				      			<table width="100%" border="0"   cellspacing="0" cellpadding="0" class="BgLine">
				                  <s:iterator value="#request.dutylist">
				                  <s:set name="assignment" value="assignment"/>
				                  <s:set name="isduty" value="@com.action.IndexAction@istodayDuty(week)" />
				                  <!--  
				                  <s:if test="#isduty=1">
				                    	<tr>
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif"  vspace="2" />
						                                                     星期一
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    ${monday}(值日)          
						                    </td>				                    
						          		</tr>
				                    </s:if>
				                    <s:else>
				                   	 	<tr>
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif"  vspace="2" />
						                    ${week}
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    ${member}           
						                    </td>				                    
						                 </tr>
				                    </s:else>
				                  -->
				                  <tr>
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif"  vspace="2" />
						                                                     星期一
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    ${monday}          
						                    </td>				                    
						          </tr>
						          <tr>
                        			<td colspan="2" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1">
                        			</td>
                      			  </tr>
						          <tr>
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif"  vspace="2" />
						                                                     星期二
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    ${tuesday}          
						                    </td>				                    
						          </tr>
						          <tr>
                        			<td colspan="2" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1">
                        			</td>
                      			  </tr>
						          <tr>
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif"  vspace="2" />
						                                                     星期三
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    ${wendesday}          
						                    </td>				                    
						          </tr>
						          <tr>
                        			<td colspan="2" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1">
                        			</td>
                      			  </tr>
						          <tr>
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif"  vspace="2" />
						                                                     星期四
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    ${thursday}          
						                    </td>				                    
						          </tr>
						          <tr>
                        			<td colspan="2" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1">
                        			</td>
                      			  </tr>
						          <tr>
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif"  vspace="2" />
						                                                     星期五
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    ${friday}          
						                    </td>				                    
						          </tr>
						          <tr>
                        			<td colspan="2" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1">
                        			</td>
                      			  </tr>
						          <tr>
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif"  vspace="2" />
						                                                     星期六
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    ${saturday}          
						                    </td>				                    
						          </tr>
						          <tr>
                        			<td colspan="2" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1">
                        			</td>
                      			  </tr>
						          <tr>
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif"  vspace="2" />
						                                                     星期日
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    ${sunday}          
						                    </td>				                    
						          </tr>
				                  <!--  
				                    <s:if test="%{#isduty}">
				                    	<tr>		                    		
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif" vspace="2"  />
						                    <b>${week}
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    <b>${member}(值日)      
						                    </td>				                    
						                 </tr>
				                    </s:if>
				                    <s:else>
				                   	 	<tr>
						                    <td width="30%" align="left">&nbsp;
						                    <img src="images/con_2_navarrow.gif"  vspace="2" />
						                    ${week}
						                    </td>
						                    <td width="70%" height="22" align="left">
						                    ${member}           
						                    </td>				                    
						                 </tr>
				                    </s:else>
				                    -->				                  
				                  <tr>
                        			<td colspan="2" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1">
                        			</td>
                      			  </tr>
				                  </s:iterator>	
				                  <!--  
				                  <tr>
					                  <td colspan="2" nowrap="nowrap" align="left">&nbsp;
					                  </td>
				                  </tr>	
				                  -->	                  
				                </table>
				    		</td>
						</tr>
					</table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td><img src="images/space.gif" width="1" height="10" /></td>
                      </tr>
                  	</table>
                  </td>
              </tr>
          </table>
          </td>
        </tr>
      </table>           
          </td>
        </tr>
      </table>
      
      <!--end 值日安排 -->	 
	
	
	<!--start 友情链接 -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td bgcolor="#FFFFFF"><img src="images/space.gif" width="8" height="8" /></td>
        </tr>
        <tr>
          <td align="center">          
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="14"><img src="images/righttitle2_03.gif" width="14" height="43" /></td>
                <td valign="bottom" background="images/righttitle2_06.gif">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left">
                      	<img src="images/friendlylink.gif" width="126" height="43" /></td>
                      <td width="9%" align="right" valign="bottom">
                      <a href="moreyqlj.action">
                      	<img src="images/more.gif" width="44" height="16" border="0" /></a>
                      </td>
                      <td width="3%">&nbsp;</td>
                    </tr>
                </table>
                </td>
                <td width="14"><img src="images/righttitle2_08.gif" width="14" height="43" /></td>
              </tr>
          </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#679eb9" class="Padding1"><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
              <tr>
                <td align="center">
                    <table cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
						<tr>
							<td class="CopyColor1">
							<s:set name="beginindex" value="0"/>	
							<div style="height:183px;">    
				      			<table width="100%" border="0"   cellspacing="0" cellpadding="0" class="BgLine">
								<s:iterator begin="#beginindex" end="15" step="2">
				                  <s:set name="flindex" value="#beginindex"/>				    
				                  <tr>
				                    <td width="15">
				                    	<img src="images/ico.gif" width="10" height="10" /></td>
				                    <td width="372" height="22" align="left">
				                    	<a href="<s:property value='#request.friendlylinklist[#flindex].address'/>" target="_blank">
				                    		<s:property value="#request.friendlylinklist[#flindex].name"/>
				                    	</a>
				                    </td>
				                    <td width="15"><img src="images/ico.gif" width="10" height="10" /></td>
				                    <td width="372" height="22" align="left" class="CopyColor1">
				                    	<a href="<s:property value='#request.friendlylinklist[#flindex+1].address'/>" target="_blank">
				                    		<s:property value="#request.friendlylinklist[#flindex+1].name"/>
				                    	</a>
				                    </td>
				                  </tr>
				                  <s:set name="beginindex" value="#flindex+2"/>	
				                  <tr>
                        			<td colspan="4" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1">
                        			</td>
                      			  </tr>
                      			  </s:iterator>
				                </table>
				                </div>
				    		</td>
						</tr>
						<tr>
                        	<td colspan="2" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1">
                        	</td>
                      	</tr>
					</table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td><img src="images/space.gif" width="1" height="10" /></td>
                      </tr>
                  	</table>
                  </td>
              </tr>
          </table>
          </td>
        </tr>
      </table>           
          </td>
        </tr>
      </table>
      <!--end 友情链接 -->	  
      </td>
      
    <td width="8" valign="top">
    <img src="images/space.gif" width="8" height="5" />
    </td>
    <td valign="top"> 
    
    <s:set name="totalcount" value="8"/>
    <!--start 公告通知 -->
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="14">
                	<img src="images/righttitle2_03.gif" width="14" height="43" /></td>
                <td valign="bottom" background="images/righttitle2_06.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left"><img src="images/noticeinfor.gif" width="126" height="43" /></td>
                      <td width="9%" align="right" valign="bottom">
                      <a href="moreggtz.action">
                      <img src="images/more.gif" width="44" height="16" border="0" /></a>
                      </td>
                      <td width="3%">&nbsp;</td>
                    </tr>
                </table></td>
                <td width="14"><img src="images/righttitle2_08.gif" width="14" height="43" /></td>
              </tr>
          </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#679eb9" class="Padding1"><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
              <tr>
                <td align="center">
                    <table id="" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
	<tr>
		<td>
	<div style="height:195px;">    
      <table width="100%" border="0"    cellspacing="0" cellpadding="0">
      <s:subset source="#request.noticeinfolist" start="0" count="#totalcount">    
		<s:iterator status="status"> 				
                  <tr>
                    <td width="15" align="center">        
                    <s:set name="noticeinfocount" value="#status.count" />
                    <s:set name="noticeinfoisnew" value="@com.action.IndexAction@compareDate(time)" />
                    <s:if test="%{#noticeinfoisnew==1}">
                    	<img src="images/new.gif" width="28" height="10" />
                    </s:if> 
                    <s:else>
                   	 	<img src="images/dot.jpg" width="10" height="10" />
                    </s:else>
                    </td>                                      
                    <td width="372" height="22" align="left" nowrap="nowrap">
                    <a href="noticedetail.action?noticeinfo.id=${id}" title="标题：${title}&#13&#10时间：<s:date name="time"  format="yyyy-MM-dd HH:mm:ss"/>" target='_blank'>${title}</a>
                    </td>
                    <td nowrap="nowrap" width="50%" align="right">[&nbsp;<s:date name="time"  format="yyyy-MM-dd"/>&nbsp;]</td>
                  </tr>
                  <tr>
                     <td colspan="3" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1"></td>
                  </tr>
         </s:iterator>
         <%-- 
         <s:bean name="org.apache.struts2.util.Counter" id="counter">    
			<s:param name="first" value="1" />    
			<s:param name="last" value="#totalcount-#noticeinfocount" />    
			<s:iterator>
				<tr>
				<td colspan="3">
					&nbsp; 
				</td> 
				</tr>    
			 </s:iterator>    
		</s:bean>
		--%>
        </s:subset>
       </table>
       </div>
    </td>
	</tr>
</table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td><img src="images/space.gif" width="1" height="10" /></td>
                      </tr>
                  </table>
                  </td>
              </tr>
          </table>
          </td>
        </tr>
      </table>  
      
    <!--end 公告通知 -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td><img src="images/space.gif" width="8" height="8" /></td>
        </tr>
      </table>
       <!--start 学术活动 -->
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="14">
                	<img src="images/righttitle2_03.gif" width="14" height="43" /></td>
                <td valign="bottom" background="images/righttitle2_06.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left"><img src="images/researchseminar.gif" width="126" height="43" /></td>
                      <td width="9%" align="right" valign="bottom">
                      <a href="morexshd.action">
                      <img src="images/more.gif" width="44" height="16" border="0" /></a>
                      </td>
                      <td width="3%">&nbsp;</td>
                    </tr>
                </table></td>
                <td width="14"><img src="images/righttitle2_08.gif" width="14" height="43" /></td>
              </tr>
          </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#679eb9" class="Padding1"><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
              <tr>
                <td align="center">
                    <table id="" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
	<tr>
		<td>
		<div style="height:190px;">
      <table width="100%" border="0"   cellspacing="0" cellpadding="0">
      <s:subset source="#request.seminarinfolist" start="0" count="#totalcount">    
		<s:iterator status="status"> 				
                  <tr>                  
                    <td width="15" align="center">        
                    <s:set name="seminarcount" value="#status.count"/>
                    <s:set name="seminarisnew" value="@com.action.IndexAction@compareDate(time)" />
                    <s:if test="%{#seminarisnew==1}">
                    	<img src="images/new.gif" width="28" height="11" />
                    </s:if>
                    <s:else>
                   	 	<img src="images/dot.jpg" width="10" height="10" />
                    </s:else>
                    </td>                    
                    <td nowrap="nowrap" width="372" height="22" align="left" >
                    <a href="noticedetail.action?noticeinfo.id=${id}" title="标题：${title}&#13&#10时间：<s:date name="time"  format="yyyy-MM-dd HH:mm:ss"/>" target='_blank'>${title}</a></td>
                    <td nowrap="nowrap" width="50%" align="right">[&nbsp;<s:date name="time"  format="yyyy-MM-dd"/>&nbsp;]</td>
                  </tr>
                  <tr>
                     <td colspan="3" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1"></td>
                  </tr>
         </s:iterator>
         <%-- 
         <s:bean name="org.apache.struts2.util.Counter" id="counter">    
			<s:param name="first" value="1" />    
			<s:param name="last" value="#totalcount-#seminarcount" />    
			<s:iterator>
				<tr>
				<td colspan="3">
					&nbsp;
				</td> 
				</tr>    
			 </s:iterator>    
		</s:bean>
		--%>
        </s:subset>
       </table>
       </div>
    </td>
	</tr>
</table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td><img src="images/space.gif" width="1" height="10" /></td>
                      </tr>
                  </table>
                  </td>
              </tr>
          </table>
          </td>
        </tr>
      </table>  
    <!--end 学术活动-->
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td><img src="images/space.gif" width="8" height="8" /></td>
        </tr>
      </table>
      <!--start 科研项目 -->
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="14"><img src="images/righttitle2_03.gif" width="14" height="43" /></td>
                <td valign="bottom" background="images/righttitle2_06.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left"><img src="images/research.gif" width="126" height="43" /></td>
                      <td width="9%" align="right" valign="bottom">
                      <a href="morekyxm.action">
                      <img src="images/more.gif" width="44" height="16" border="0" /></a></td>
                      <td width="3%">&nbsp;</td>
                    </tr>
                </table></td>
                <td width="14"><img src="images/righttitle2_08.gif" width="14" height="43" /></td>
              </tr>
          </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#679eb9" class="Padding1"><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
              <tr>
                <td align="center">
                    <table id="" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
	<tr>
		<td>
		<div style="height:189px;">
      <table width="100%" border="0"  cellspacing="0" cellpadding="0">
     	<s:subset source="#request.researchprojectlist" start="0" count="#totalcount">    
		<s:iterator status="status"> 				
                  <tr>                  
                    <td width="15" align="center">        
                    <s:set name="researchprojectcount" value="#status.count" />
                    <s:set name="researchprojectcountisnew" value="@com.action.IndexAction@compareDate(issuetime)" />
                    <s:if test="%{#researchprojectcountisnew==1}">
                    	<img src="images/new.gif" width="28" height="11" />
                    </s:if>
                    <s:else>
                   	 	<img src="images/dot.jpg" width="10" height="10" />
                    </s:else>
                    </td>                    
                    <td nowrap="nowrap" width="372" height="22" align="left" ><a href="researchprojectdetail.action?researchproject.id=${id}" title="标题：${name}&#13&#10时间：<s:date name="issuetime"  format="yyyy-MM-dd HH:mm:ss"/>" target='_blank'>${name}</a></td>
                    <td nowrap="nowrap" width="50%" align="right">[&nbsp;<s:date name="issuetime"  format="yyyy-MM-dd"/>&nbsp;]</td>
                  </tr>
                  <tr>
                     <td colspan="3" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1"></td>
                  </tr>
         </s:iterator>
         <%-- 
         <s:bean name="org.apache.struts2.util.Counter" id="counter">    
			<s:param name="first" value="1" />    
			<s:param name="last" value="#totalcount-#researchprojectcount" />    
			<s:iterator>
				<tr>
				<td colspan="3">
					&nbsp; 
				</td> 
				</tr>    
			 </s:iterator>    
		</s:bean>--%>
        </s:subset>
                </table>
                </div>
    </td>
	</tr>
</table>

                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td><img src="images/space.gif" width="1" height="10" /></td>
                      </tr>
                  </table>
                  
      </td>
              </tr>
          </table>
          </td>
        </tr>
      </table>  
 	<!-- end 科研项目 -->
 	
 	   <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td><img src="images/space.gif" width="8" height="8" /></td>
        </tr>
      </table>
      <!-- start 学术成果 -->
 	<table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="14"><img src="images/righttitle2_03.gif" width="14" height="43" /></td>
                <td valign="bottom" background="images/righttitle2_06.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left"><img src="images/researchresult.gif" width="126" height="43" /></td>
                      <td width="9%" align="right" valign="bottom">
                      <a href="morexscg.action"><img src="images/more.gif" width="44" height="16" border="0" /></a></td>
                      <td width="3%">&nbsp;</td>
                    </tr>
                </table></td>
                <td width="14"><img src="images/righttitle2_08.gif" width="14" height="43" /></td>
              </tr>
          </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#679eb9" class="Padding1"><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
              <tr>
                <td align="center">
                    <table id="" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
	<tr>
		<td>
		<div style="height:183px;">
      <table width="100%" border="0"   cellspacing="0" cellpadding="0">
     	<s:subset source="#request.academicfruitlist" start="0" count="#totalcount">    
		<s:iterator status="status"> 				
                  <tr>                  
                    <td width="15" align="center">        
                    <s:set name="academicfruitcount" value="#status.count" />
                    <s:set name="academicfruitisnew" value="@com.action.IndexAction@compareDate(time)" />
                    <s:if test="%{#academicfruitisnew==1}">
                    	<img src="images/new.gif" width="28" height="11" />
                    </s:if>
                    <s:else>
                   	 	<img src="images/dot.jpg" width="10" height="10" />
                    </s:else>
                    </td>                    
                    <td nowrap="nowrap" width="372" height="22" align="left" ><a href="academicfruitdetail.action?academicfruit.id=${id}"  title="标题：${title}&#13&#10时间：<s:date name="time"  format="yyyy-MM-dd HH:mm:ss"/>" target='_blank'>${title}</a></td>
                    <td nowrap="nowrap" width="50%" align="right">[&nbsp;<s:date name="time"  format="yyyy-MM-dd"/>&nbsp;]</td>
                  </tr>
                  <tr>
                     <td colspan="3" style="background-image:url(images/line.gif); background-repeat:repeat-x" height="1"></td>
                  </tr>
         </s:iterator>
         <%-- 
         <s:bean name="org.apache.struts2.util.Counter" id="counter">    
			<s:param name="first" value="1" />    
			<s:param name="last" value="#totalcount-#academicfruitcount" />    
			<s:iterator>
				<tr>
				<td colspan="3">
					&nbsp; 
				</td> 
				</tr>    
			 </s:iterator>    
		</s:bean>
		--%>
        </s:subset>
                </table>
                </div>
    </td>
	</tr>
</table>

                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td><img src="images/space.gif" width="1" height="10" /></td>
                      </tr>
                  </table>
                  
      </td>
              </tr>
          </table>
          </td>
        </tr>
      </table>  
 	<!-- end 学术成果 -->
      </td>
  </tr>
</table>

<!-- 实验室风采 -->
 	<table width="778" border="0" cellspacing="0" cellpadding="0" align="center">
 		<tr>
          <td bgcolor="#FFFFFF"><img src="images/space.gif" width="8" height="8" /></td>
        </tr>
        <tr>    
        <td>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="14"><img src="images/righttitle2_03.gif" width="14" height="43" /></td>
                <td valign="bottom" background="images/righttitle2_06.gif">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="left"><img src="images/labphotos.gif" width="126" height="43" /></td>
                      <td width="9%" align="right" valign="bottom">
                      </td>
                      <td width="3%">&nbsp;</td>
                    </tr>
                </table>
                </td>
                <td width="14"><img src="images/righttitle2_08.gif" width="14" height="43" /></td>
              </tr>
          </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#679eb9" class="Padding1">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
              <tr>
              <td align="center">
              <div style="height:150px;">
              <table id="ctl00_ContentPlaceHolder1_NewsUserControl2_DataList1" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
			  <tr>
		        <td>
			      <table width="100%" border="0"   cellspacing="0" cellpadding="0" class="BgLine">
	                  <tr>
	                    <td align="center">
								<div id="image_left" style="overflow:hidden;width:750px;">
									<table cellpadding="0" cellspacing="0" border="0">
										<tr>
										<td id="image_left1" valign="middle" align="center">
											<table cellpadding="2" cellspacing="0" border="0">
											<tr align="center">
											<s:subset source="#request.labpicturelist" start="0" count="#totalcount">    
											<s:iterator status="status">
									            <td><img width="170px" height="158px" src="${filename}" title="${describes}" /></td>
												<td>&nbsp;</td>
									         </s:iterator>
									        </s:subset>																							
											</tr>
											</table>
										</td>
										<td id="image_left2" valign="middle"></td>
										</tr>
									</table>
								</div>
								<script>
									var imagespeed=30//速度数值越大移动速度越慢
									image_left2.innerHTML=image_left1.innerHTML
									function Marquee3(){
										if(image_left2.offsetWidth-image_left.scrollLeft<=0)
											image_left.scrollLeft-=image_left1.offsetWidth
										else{
											image_left.scrollLeft++;
										}
									}
									var MyMar3=setInterval(Marquee3,imagespeed)
									image_left.onmouseover=function() {clearInterval(MyMar3)}
									image_left.onmouseout=function() {MyMar3=setInterval(Marquee3,imagespeed)}
								</script>
	                    </td>	                    
	                  </tr>
			       </table>
                </td>
			  </tr>
              </table>
              </div>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                   <tr>
                      <td>
                      	<img src="images/space.gif" width="1" height="10" />
                      </td>
                   </tr>
              </table>
              </td>
              </tr>
          </table>
          </td>
        </tr>
      </table>  
            </td>
        </tr>
    </table>
<!-- 实验室风采 -->

	<%@ include file="footer.jsp" %>
     </div>
    
</body>
</html>
