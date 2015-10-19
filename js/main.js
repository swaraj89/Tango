$(document).ready(function(){
	$("#loginForm input[type='text']").on("blur",Tango.loginUiSetup);
	$("#login-btn").on("click",Tango.authenticateUser);

	//showing up register
	$("#register").click(Tango.openRegisterForm);
	
	//Play video in lightbox
	$("#play-btn").click(Tango.loadLightBox);
});
