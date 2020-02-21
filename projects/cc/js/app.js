function get_param(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function scan_check(){
	if (get_param('action') == 'scan'){
		if (localStorage){
			if (localStorage.getItem('incoming-scan')){
				window.location.href = window.location.href.replace('?action=scan','');
			}else{
				localStorage.setItem('incoming-scan','yes');
				window.location.href = window.location.href.replace('?action=scan','');
			}
		}
	}else{
		if (localStorage){
			if (localStorage.getItem('incoming-scan') == 'yes'){
				if (localStorage.getItem('name')){
					var c_user = localStorage.getItem('name');
					for (var i=0; i<people.length; i++){
						if (people[i].name == c_user && (people[i].type == 'admin' || people[i].type == 'member')){		
							// show ok
							$('.scan-page .ok-wrapper h4').html('Welcome '+c_user+', you may enter the clubhouse!');
							$('.scan-page .ok-wrapper').removeClass('hide');
							$('.scan-page .not-ok-wrapper').addClass('hide');
							show_screen('.scan-page');
							setTimeout(function(){
								$('.scan-page .ok-wrapper h4').css('visibility','visible');
								$('.circle-loader').toggleClass('load-complete');
								$('.checkmark').toggle();
								localStorage.removeItem('incoming-scan');
							},2000);
							break;
						}else if (people[i].name == c_user && people[i].type != 'admin' && people[i].type != 'member'){		
							// show not ok
							$('.scan-page .not-ok-wrapper').removeClass('hide');
							$('.scan-page .not-ok-wrapper h4').html('You cannot enter, '+c_user+', because you are not a member!');
							$('.scan-page .ok-wrapper').addClass('hide');
							show_screen('.scan-page');
							localStorage.removeItem('incoming-scan');
							break;
						}
					}
				}else{
					// no login
					hide_screen('.scan-page');
					start();
				}
			}
		}
	}
}

function check(){
	if (localStorage.getItem('name')){
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
	}else{
		$('#start').removeClass('hide');
		$('#logout').addClass('hide');
		$('#mem-page').addClass('hide');
	}
}

function start(){
	show_screen('.login');
	show_login_members();
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
				type = people[i].type;
				if (localStorage){
					localStorage.setItem('name',name);
				}
				break;
			}
		}
	}
	if (auth){
		hide_screen('.login');
		check();
		if (localStorage && localStorage.getItem('incoming-scan') == 'yes' && (type == 'admin' || type == 'member')){
			// show ok
			$('.scan-page .ok-wrapper h4').html('Welcome '+name+', you may enter the clubhouse!');
			$('.scan-page .ok-wrapper').removeClass('hide');
			$('.scan-page .not-ok-wrapper').addClass('hide');
			show_screen('.scan-page');
			setTimeout(function(){
				$('.scan-page .ok-wrapper h4').css('visibility','visible');
				$('.circle-loader').toggleClass('load-complete');
				$('.checkmark').toggle();
				localStorage.removeItem('incoming-scan');
			},2000);
		}else if (localStorage && localStorage.getItem('incoming-scan') == 'yes' && type != 'admin' && type != 'member'){
			// show not ok
			$('.scan-page .not-ok-wrapper').removeClass('hide');
			$('.scan-page .not-ok-wrapper h4').html('You cannot enter, '+name+', because you are not a member!');
			$('.scan-page .ok-wrapper').addClass('hide');
			show_screen('.scan-page');
			localStorage.removeItem('incoming-scan');
		}else{
			//scan_check();
			show_screen('.member-page');
		}
	}else{
		$('.login-error').html('Oops either username or password is wrong. Please try again.');
	}
}

function logout(){
	show_screen('.welcome');
	localStorage.clear();
	check();
}

function get_user(){
	if (localStorage.getItem('name')){
		return localStorage.getItem('name');
	}else{
		return '';
	}
}

function get_user_attr(attr){
	if (localStorage.getItem('name')){
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
	if (screen != '.scan-page' && screen != '.login'){
		set_current_screen(screen);	
	}
}

function hide_screen(screen){
	$(screen).addClass('screen-hide').removeClass('screen-show');
}

function hide_all_screens(){
	$('.screen').removeClass('screen-show').addClass('screen-hide');
	show_screen('.welcome');
}

function get_camera(){
	/*
	if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
  		const stream = await navigator.mediaDevices.getUserMedia({video: true})
	}
	
	let scanner = new Instascan.Scanner({ video: document.getElementById('qr-capture') });
		scanner.addListener('scan', function (content) {
		alert(content);
	});
	Instascan.Camera.getCameras().then(function (cameras) {
		if (cameras.length > 0) {
		    scanner.start(cameras[0]);
		} else {
		    console.error('No cameras found.');
		}
	}).catch(function (e) {
		console.error(e);
	});
	show_screen('.camera-page');
	set_current_screen('.camera-page');
	*/
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

function see_friends(){
	var friends_html = "";
	for (var j=0; j<people.length; j++){
		if (people[j].type == "friend"){
			friends_html += "<div class='friend'>";
			if (people[j].picture != ''){
				friends_html += "<img src='profile/"+people[j].picture+"'/>";
			}else{
				friends_html += "<div class='square'><i class='fa fa-user'></i></div>";
			}
			if (get_user_attr('type') == 'admin'){
				friends_html += "<a href='javascript:;' class='title' onclick='alert(\"Cannot add new member. Clubhouse is not ready. Please approach Shayla or Jaymee.\");'>Add</a>";
			}
			friends_html += "<span class='title'>"+people[j].name+"</span>";	
			curr_year = new Date().getFullYear();
			friends_html += "<span class='year'>"+(curr_year - parseInt(people[j].birth_year))+" years old</span>";	
			friends_html += "</div>";			
		}
	}
	$('.friends-page .friends').html(friends_html);	
	show_screen('.friends-page');
}

function see_members(){
	var members_html = "";
	for (var j=0; j<people.length; j++){
		if (people[j].type == 'admin' || people[j].type == 'member'){
			members_html += "<div class='member'>";
			if (people[j].picture != ''){
				members_html += "<img src='profile/"+people[j].picture+"'/>";
			}else{
				members_html += "<div class='square'><i class='fa fa-user'></i></div>";
			}
			if (get_user_attr('type') == 'admin'){
				if (people[j].type != 'admin'){
					members_html += "<a href='javascript:;' class='title'onclick='alert(\"Cannot remove member now. Please approach Shayla or Jaymee.\");'>Remove</a>";	
				}
			}
			members_html += "<span class='title'>"+people[j].name+"</span>";
			curr_year = new Date().getFullYear();	
			members_html += "<span class='year'>"+(curr_year - parseInt(people[j].birth_year))+" years old</span>";	
			members_html += "</div>";			
		}
	}
	$('.members-page .members').html(members_html);	
	show_screen('.members-page');
}

function set_current_screen(screen){
	if (localStorage){
		localStorage.setItem('currscreen',screen);
	}
}

function get_current_screen(){
	if (localStorage.getItem('currscreen')){
		return localStorage.getItem('currscreen');
	}else{
		return '';
	}
}

/*
$('.tabs a').click(function(){
	var id = $(this).attr('id');
	var rel = $(this).attr('rel');
	$('.tabs a').removeClass('active');
	$('#'+id).addClass('active');
	$('.tab-s').addClass('hide');
	$('.members .'+rel).removeClass('hide');

});
*/

function get_photos(){
	//show_screen();
	var pswpElement = document.querySelectorAll('.pswp')[0];
	var options = {
    	index: 0 // start at first slide
	};
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, people[0].photos, options);
	gallery.init();
	//show_screen('.photos-page');
}

function show_login_members(){
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
	scan_check();
	
	if (localStorage.getItem('currscreen')){
		//hide_all_screens();	
		cs = localStorage.getItem('currscreen');
		if (cs == '.members-page'){
			see_members();
		}else if (cs == '.friends-page'){
			see_friends();
		}else if (cs == '.photos-page'){
			get_photos();
		}else if (cs == '.login'){	
			start();
		}else{
			show_screen(cs);	
		}
		
	}
	
});