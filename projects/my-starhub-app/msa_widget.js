var msa_widget = function(){
    var widget = {
        messages : {
            'widget_tooltip' : 'Get My StarHub app!',
            'widget_headline' : 'My StarHub app',
            'widget_cta_headline_universal' : 'Manage your StarHub services anytime, anywhere!',
            'widget_cta_headline_ios' : 'Manage your StarHub services anytime, anywhere!',
            'widget_cta_headline_android' : 'Manage your StarHub services anytime, anywhere!',
            'widget_cta_description' : 'Now you can easily manage all your StarHub services in one place! Get our free My StarHub app today to track mobile usage, pay bills, redeem rewards, check your contract status and more. You can even personalise it to have your favourite features on the home screen.<br/><br/>Download My StarHub app on your phone now!'
        },
        settings : {
            'use_store_link' : true,
            'android_link' : 'http://www.starhub.com/personal/redirect.html?product=msa-android&campaign=generic-floating-box',
            'ios_link' : 'http://www.starhub.com/personal/redirect.html?product=msa-ios&campaign=generic-floating-box',
            'android_store_link' : 'market://details?id=com.starhub.csselfhelp',
            'ios_store_link' : 'itms://itunes.apple.com/sg/app/my-starhub/id470460379?mt=8',
            'youtube_video' : 'https://www.youtube.com/embed/QOsER-Pw2EQ?autoplay=1',
            'msa_image' : 'https://www.starhub.com/content/dam/edm/library/img/featured-my-starhub-app.jpg'
        },              
        addToHead : function(html){
            document.getElementsByTagName('head')[0].appendChild(html);
        },
        addToBody : function(html){
            document.getElementsByTagName('body')[0].appendChild(html);
        },
        is_cq : function(){
            var page_url = window.location.href;
            var is_author = false;
            if (page_url.indexOf('author.starhub.com') > -1 && page_url.indexOf('wcmmode=disabled') === -1){
                is_author = true;
            }
            return is_author;
        },                
        is_mobile : function(platform){
            var isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };
            if (platform == 'android'){
                if (isMobile.Android()){
                    return true;
                }else{
                    return false;
                }
            }else if (platform == 'ios'){
                if (isMobile.iOS()){
                    return true;
                }else{
                    return false;
                }
            }else {
                if (isMobile.any()){
                    return true;
                }else{
                    return false;
                }
            }
        },  
        cookies : {
            set : function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            },
            get : function(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }
        },                                                
        msa_css : function(){
            var css = '@import "msa_widget.css" screen;';
            return css;
        },
        msa_open : function(){
            document.querySelector('.msa-box').style.right =  '-200px';
            document.querySelector('.msa-mask').style.display =  'block';
            document.querySelector('.msa-video').style.left =  '0px';
            document.querySelector('.msa-video').style.right =  '280px';
            document.querySelector('body').style.overflowY =  'hidden';
            document.querySelector('.msa-full').style.right =  '0px';
            if (!widget.is_mobile('any')){
                document.getElementById('msavid').setAttribute('src',widget.settings.youtube_video);    
            }
        },
        msa_close : function(){
            document.getElementById('msavid').setAttribute('src','');
            document.querySelector('.msa-mask').style.display =  'none';
            document.querySelector('.msa-video').style.left =  '-3280px';
            document.querySelector('.msa-video').style.right =  '3280px';
            document.querySelector('body').style.overflowY =  'auto';
            document.querySelector('.msa-full').style.right =  '-500px';
            document.querySelector('.msa-box').style.right =  '-77px';
        },  
        msa_dismiss : function(){
            document.querySelector('.msa-box').style.right =  '-500px';
            widget.cookies.set('dismissed','yes',1);
        },      
        msa_widget : function(){
            var html = '';
            html += '<div class="msa-box">';
            html += '<div class="msa-dismiss"><a title="Dismiss" href="javascript:;" onclick="msa_widget().msa_dismiss()">&times;</a></div>';
            html += '<a class="msa-open" href="javascript:;" onclick="msa_widget().msa_open()" title="'+widget.messages.widget_tooltip+'">';
            html += '<div class="msa-logo">';
            html += '<img src="img/icon-msa.png"/>';
            html += '</div>';
            html += '<div class="msa-text">';
            html += '<h5>'+widget.messages.widget_headline+'</h5>';
            html += '</div>';
            html += '</a>';        
            html += '</div>';
            return html;
        },
        msa_full : function(){
            var html = '';
            html += '<div class="msa-video">';
            html += '<iframe id="msavid" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>';
            html += '</div>';
            html += '<div class="msa-mask"></div>';
            html += '<div class="msa-full">';
            html += '<div class="msa-close"><a title="Close" href="javascript:;" onclick="msa_widget().msa_close()">&times;</a></div>';
            html += '<div class="msa-masthead">';
            html += '<img src="'+widget.settings.msa_image+'"/>';
            html += '</div>';
            html += '<div class="msa-body">';
            if (widget.is_mobile('android')){
                html += '<h4>'+widget.messages.widget_cta_headline_android+'</h4>';
            }else if (widget.is_mobile('ios')){
                html += '<h4>'+widget.messages.widget_cta_headline_ios+'</h4>';
            }else{
                html += '<h4>'+widget.messages.widget_cta_headline_universal+'</h4>';
            }
            html += '<p>'+widget.messages.widget_cta_description+'</p>';
            html += '<p>';
            var android_link = widget.settings.android_link;
            var ios_link = widget.settings.ios_link;
            var android_store_link = widget.settings.android_store_link;
            var ios_store_link = widget.settings.ios_store_link;
            if (widget.is_mobile('android')){
                if (widget.settings.use_store_link){
                    html += '<a href="'+android_store_link+'" target="_top"><img src="img/badge-google-play.png"/></a>';    
                }else{
                    html += '<a href="'+android_link+'" target="_blank"><img src="img/badge-google-play.png"/></a>';    
                }
            }else if (widget.is_mobile('ios')){
                if (widget.settings.use_store_link){
                    html += '<a href="'+ios_store_link+'" target="_top"><img src="img/badge-app-store.png"/></a>';
                }else{                
                    html += '<a href="'+ios_link+'" target="_blank"><img src="img/badge-app-store.png"/></a>';
                }
            }else{
                html += '<a href="'+ios_link+'" target="_blank"><img src="img/badge-app-store.png"/></a> ';
                html += '<a href="'+android_link+'"><img src="img/badge-google-play.png"/></a>';
            }
            html += '</p>';
            html += '</div>';
            html += '</div>';
            return html;
        },
        shouldDismiss : function() {
            if (widget.cookies.get('dismissed') == 'yes') {
                return true;
            } else {
                return false;
            }
        },        
        run : function(){
            if (widget.shouldDismiss()){
                console.log('User dismissed widget.');
            }else{
                if (!widget.is_cq()){
                    document.addEventListener('DOMContentLoaded',function(){
                        var add_head = document.createElement('style');
                        add_head.innerHTML = widget.msa_css();
                        widget.addToHead(add_head);
                        var add_body = document.createElement('div');
                        add_body.innerHTML = widget.msa_widget()+widget.msa_full();
                        widget.addToBody(add_body);
                    });                        
                }else{
                    console.log('CQ environment detected. My StarHub app widget not initiated.');
                }
            }
        }        
    };
    return widget;
};
