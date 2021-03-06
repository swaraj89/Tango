$(document).ready(function(){
	$("#loginForm input[type='text'],#loginForm input[type='password']").on("blur",Tango.loginUiSetup);
	$("#login-btn").on("click",Tango.authenticateUser);

	//showing up register
	$("#register").click(Tango.openRegisterForm);
	
	//Play video in lightbox
	$("#play-btn").click(Tango.loadLightBox);

	$("#registerForm input[type='text'],#registerForm input[type='password']").on("blur",Tango.registerFormValidate);
	$("#register-btn").on("click",Tango.createUser);

	$("#open-login").on("click",Tango.openLogin);
});
