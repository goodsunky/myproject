<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>东华大学合胜联合实验室后台管理系统</title>
	<!-- ExtJs-3.2.0 -->
    <link rel="stylesheet" type="text/css" href="ext-3.2.0/resources/css/ext-all.css" />
 	<script type="text/javascript" src="ext-3.2.0/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="ext-3.2.0/ext-all-debug.js"></script>
    <!-- DESKTOP -->
    <link rel="stylesheet" type="text/css" href="desktop/css/desktop.css" />
    <link rel="stylesheet" type="text/css" href="desktop/css/dataview.css" />    
    <script type="text/javascript" src="desktop/js/StartMenu.js"></script>
    <script type="text/javascript" src="desktop/js/TaskBar.js"></script>
    <script type="text/javascript" src="desktop/js/Desktop.js"></script>
    <script type="text/javascript" src="desktop/js/App.js"></script>
    <script type="text/javascript" src="desktop/js/Module.js"></script>
    <script type="text/javascript" src="desktop/desktop.js"></script>
    <script type="text/javascript" src="desktop/passwordalter.js"></script>
    <script type="text/javascript" src="desktop/user.js"></script>
    <script type="text/javascript" src="desktop/noticeinfo.js"></script>
    <script type="text/javascript" src="desktop/researchproject.js"></script>
    <script type="text/javascript" src="desktop/academicfruit.js"></script>
    <script type="text/javascript" src="desktop/labintroduction.js"></script>
    <script type="text/javascript" src="desktop/labfacility.js"></script>
    <script type="text/javascript" src="desktop/labmember.js"></script>
    <script type="text/javascript" src="desktop/corpcompany.js"></script>
    <script type="text/javascript" src="desktop/duty.js"></script>
    <script type="text/javascript" src="desktop/friendlylink.js"></script>
    <script type="text/javascript" src="desktop/contactus.js"></script>
    <script type="text/javascript" src="desktop/resources.js"></script>
    <script type="text/javascript" src="desktop/labpicture.js"></script>
    <script type="text/javascript" src="desktop/labinstitution.js"></script>
    <script type="text/javascript" src="desktop/major.js"></script>
    <script type="text/javascript" src="desktop/contactus.js"></script>
    <script type="text/javascript" src="desktop/researchtype.js"></script>
    <script type="text/javascript" src="desktop/resourcetype.js"></script>
    <script type="text/javascript" src="desktop/resourcesubtype.js"></script>    
</head>
<body scroll="no">
<!-- 下面的dt中必须命名为*-shortcut,看一下Desktop.js最后就明白了 -->
<div id="x-desktop">
    <dl id="x-shortcuts">
        <dt id="userWin-shortcut">
            <a href="#">
            <img src="desktop/images/s.gif" />
            <div><b>用户信息管理</b></div></a>
            <br>
        </dt>
        <dt id="noticeinfoWin-shortcut">
            <a href="#"><img src="desktop/images/s.gif" />
            <div><b>公告通知管理</b></div></a>
            <br>
        </dt>
        <dt id="researchWin-shortcut">
            <a href="#"><img src="desktop/images/s.gif" />
            <div><b>科研管理</b></div></a>
            <br>
        </dt>
        <dt id="academicfruitWin-shortcut">
            <a href="#"><img src="desktop/images/s.gif" />
            <div><b>学术成果管理</b></div></a>
            <br>
        </dt>        
        <dt id="labWin-shortcut">
            <a href="#"><img src="desktop/images/s.gif" />
            <div><b>实验室管理</b></div></a>
            <br>
        </dt>
        <dt id='routinescheduleWin-shortcut'>
            <a href="#"><img src="desktop/images/s.gif" />
            <div><b>日常活动管理</b></div></a>
            <br>
        </dt>
    </dl>
</div>
<div id="ux-taskbar">
	<div id="ux-taskbar-start"></div>
	<div id="ux-taskbuttons-panel"></div>
	<div class="x-clear"></div>
</div>
</body>
</html>
