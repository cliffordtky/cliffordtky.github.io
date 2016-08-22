
(function () { 

	if (!($ = window.jQuery)) {
	   starmark_jquery = document.createElement('script');
	   starmark_jquery.id = 'starmark_jquery';
	   starmark_jquery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'; 
	   starmark_jquery.onload=starmark_init;
	   document.body.appendChild(starmark_jquery);
	} 
	else {
	    starmark_init();
	}

	function starmark_init(){
		if (jQuery('#starmark_style_font').length == 0){	
			starmark_font = document.createElement('link');
			starmark_font.rel = 'stylesheet';
			starmark_font.id = 'starmark_style_font';
			starmark_font.href = 'https://fonts.googleapis.com/css?family=Roboto';
			jQuery('head').append(starmark_font);
		}else{
			jQuery('#starmark_style_font').remove();
		}
		if (jQuery('#starmark_style_fa').length == 0){	
			starmark_icons = document.createElement('link');
			starmark_icons.rel = 'stylesheet';
			starmark_icons.id = 'starmark_style_fa';
			starmark_icons.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css';
			jQuery('head').append(starmark_icons);
		}else{
			jQuery('#starmark_style_fa').remove();
		}		
		if (jQuery('#starmark_inline_css').length == 0){	
			starmark_run_css();
		}else{
			jQuery('#starmark_inline_css').remove();
		}
		if (jQuery('#starmark_container').length == 0){	
			jQuery('body').prepend('<div id="starmark_container"></div>');
			var html = starmark_top();
			jQuery('#starmark_container').html(html).slideDown('fast');
			jQuery('#starmark_universal_input').focus();
		}else{
			jQuery('#starmark_container').slideUp('fast',function(){
				jQuery(this).remove();
				jQuery('#starmark_jquery').remove();
				
				jQuery('#starmark_style_fa').remove();
			});
		}
		jQuery('.starmark_search_option_selected a').html(jQuery('#starmark_search_type li.starmark_search_option a').first().html());
	}

	function starmark_run_css(){
		jQuery("head").append(
			"<style id='starmark_inline_css'>
				#starmark_container{
					font-family: 'Roboto', sans-serif !important;
					z-index:999999 !important;
					position:fixed;
					top:0;
					left:0;
					right:0;
					bottom:0px;
					background:#e4e4e4;
					color:#ffffff;
					display:none;
					overflow-y:scroll;
					padding:0;
					margin:0;
				}
				#starmark_top{
					float:left;
					width:100%;
					background:#ffffff;
					padding:0px;
					margin:0px;
				}
				#starmark_search_label{
					color:#777777;
					display:block;
					float:left;
				}
				#starmark_searchform{
					box-sizing:border-box;
					float:left;
					padding:2px;
					width:100%;
					max-width:950px;					
					border-right:1px solid #cccccc;
				}
				#starmark_searchform input{
					float:left;
					font-size:20px !important;
					color:#333333;
					width:75%;
					padding:12px 8px;
					border:none !important;
					box-shadow:0px 0px transparent;
					background:transparent !important;
				}
				#starmark_searchform input:focus{
					outline: none;
				}
				#starmark_searchform button{
					border:none;
					background:transparent;
					padding:6px;
					box-shadow:0px 0px transparent;
				}
				#starmark_searchform i.fa{
					margin-top:5px;
					color:#cccccc;
					font-size:20px;
				}
				#starmark_search_type{
					list-style-type:none;
					float:left;
					padding:10px 15px;
				}
				.starmark_search_option{
					display:none;
					border-bottom:1px solid #cccccc;
					color:#cccccc;
				}
				.starmark_search_option_selected{
					display:block;
					border:none;
					color:#cccccc;
				}
				.starmark_search_option a, .starmark_search_option_selected a{
					color:#cccccc !important;
					text-decoration:none;
				}
			</style>"
		);
	}

	function starmark_top(){
		var html = '<div id="starmark_top">';
		html += '<form id="starmark_searchform" action="https://www.google.com/search">';
		html += '<input id="starmark_universal_input" placeholder="Type a keyword" type="text" name="q">';
		html += '<ul id="starmark_search_type">';
		html += '<li class="starmark_search_option_selected"><a href="javascript:;"></a></li>';
		html += '<li class="starmark_search_option" id="st_google"><a href="javascript:;">Google</a></li>';
		html += '<li class="starmark_search_option" id="st_starhub"><a href="javascript:;">StarHub</a></li>';
		html += '<li class="starmark_search_option" id="st_images"><a href="javascript:;">Images</a></li>';
		html += '<li class="starmark_search_option" id="st_videos"><a href="javascript:;">Videos</a></li>';
		html += '</ul>';
		html += '<button type="submit"><i class="fa fa-search"></i></button>';
		html += '</form>';
		html += '</div>';
		return html;
	}

}());