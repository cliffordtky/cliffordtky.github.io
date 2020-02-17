function check(){
	if (sessionStorage.getItem('name')){
		$('#start').addClass('hide');
		$('#logout').removeClass('hide');
		$('#mem-page').removeClass('hide');
		hide_screen('.login');
		$('.member-page .screen-title').html('Welcome back, '+get_user()+'!');
		if (get_user_attr('picture') != ''){
			$('.member-page #avatar img').attr('src','profile/'+get_user_attr('picture'));
			$('.member-page #avatar').removeClass('hide');
		}else{
			$('.member-page #avatar').addClass('hide');
		}
		show_screen('.member-page');
	}else{
		$('#start').removeClass('hide');
		$('#logout').addClass('hide');
		$('#mem-page').addClass('hide');
		hide_screen('.member-page');
	}
}

function start(){
	show_screen('.login');
	show_members();
	adjust_member_list_scroll()
	$('#password').val('');
}

function login(){
	var auth = false;
	var name='';
	var birth_year='';
	var picture=''
	var photos = '';
	var type = '';
	for (var i=0; i<people.length; i++){
		if (people[i].type == 'admin' || people[i].type == 'member'){
			if ($('#username').val() == people[i].name && $('#password').val() == people[i].password){
				auth = true;
				name = people[i].name;
				birth_year = people[i].birth_year;
				picture = people[i].picture;
				photos = people[i].photos;
				if (window.sessionStorage){
					sessionStorage.setItem('name',name);
				}
				break;
			}
		}else{

		}
	}
	if (auth){
		hide_screen('.login');
		show_screen('.member-page');
	}else{
		$('.login-error').html('Oops either username or password is wrong. Please try again.');
	}
	check();
}

function logout(){
	sessionStorage.clear();
	check();
}

function get_user(){
	if (sessionStorage.getItem('name')){
		return sessionStorage.getItem('name');
	}else{
		return '';
	}
}

function get_user_attr(attr){
	if (sessionStorage.getItem('name')){
		for (var i=0; i<people.length; i++){
			if (people[i].name == get_user()){
				return people[i][attr];
				break;
			}
		}		
	}else{
		return '';
	}		
}

function show_screen(screen){
	$(screen).removeClass('screen-hide').addClass('screen-show');
}

function hide_screen(screen){
	$(screen).addClass('screen-hide').removeClass('screen-show');	
}

function hide_all_screens(){
	var s = ['.login','.member-page','.members'];
	for (var i=0; i<s.length; i++){
		hide_screen(s[i]);
	}
}

async function get_camera(){
	if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
  		const stream = await navigator.mediaDevices.getUserMedia({video: true})
	}
}

function get_member_count(){
	if (people.length > 0){
		var c = 0;
		for (var i=0; i<people.length; i++){
			if (people[i].type == 'admin' || people[i].type == 'member'){
				c++;
			}
		}
		return c;
	}else{
		return 0;
	}
}

function adjust_member_list_scroll(){
	var c = get_member_count();
	$('.member-list .member-wrapper').css('width',(c*170)+"px");
}

function add_member(){
	var friends_html = "";
	for (var j=0; j<people.length; j++){
		if (people[j].type == "friend"){
			friends_html += "<div class='friend'>";
			friends_html += "<img src='profile/"+people[j].picture+"'/>";
			friends_html += "<a href='javascript:;' class='title'>Add</a>";	
			friends_html += "<span class='title'>"+people[j].name+"</span>";	
			friends_html += "<span class='year'>"+people[j].birth_year+"</span>";	
			friends_html += "</div>";			
		}
	}
	$('.friends-page .friends').html(friends_html);	
	show_screen('.friends-page');
}

$('.tabs a').click(function(){
	var id = $(this).attr('id');
	var rel = $(this).attr('rel');
	$('.tabs a').removeClass('active');
	$('#'+id).addClass('active');
	$('.tab-s').addClass('hide');
	$('.members .'+rel).removeClass('hide');

});

function show_members(){
	var members_html = "<div class='member-wrapper'>";
	for (var i=0; i<people.length; i++){
		if (people[i].type == 'admin' || people[i].type == 'member'){
			members_html += "<div class='member' id='member-"+people[i].name+"'>";
			members_html += "<a href='javascript:;' onclick='choose_login_member(\""+people[i].name+"\")'>";
			if (people[i].picture){
				members_html += "<img src='profile/"+people[i].picture+"'>";
			}else{
				members_html += "<div class='ball'></div>";
			}
			members_html += "<span>"+people[i].name+"</span>";
			members_html += "</a>";
			members_html += "</div>";
		}
	}
	members_html += "</div>";
	$('.member-list').html(members_html);
}

function choose_login_member(name){
	$('#username').val(name);
	$('#password').focus();
	$('.member').removeClass('member-chosen');
	$('#member-'+name).addClass('member-chosen');
}

$(document).ready(function(){
	check();
});