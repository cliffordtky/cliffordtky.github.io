$('#start').click(function(){
	//$('.welcome').removeClass('screen-show').addClass('screen-hide');
	$('.login').removeClass('screen-hide').addClass('screen-show');
});

$('#login').click(function(){
	if ($('#password').val() == "15253545"){
		//alert('Hi, welcome Crystal!');
		$('.first').slideUp();
		$('.second #second-title').html("Welcome back, Crystal!");
		$('.second').removeClass('hide').slideDown();
	}else{
		alert('Wrong password, please try again.');
	}
});

function close_screen(screen){
	$('.'+screen).removeClass('screen-show').addClass('screen-hide');
}