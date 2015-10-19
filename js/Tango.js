/*
 * @class: Tango ui Class
 * @description: Namespace for all the methods and props for the tango page
 */
var Tango = {
    /*
     * @method : openRegisterForm
     * @description : opens the registration page
     */
    openRegisterForm: function() {
        $("#loginForm,.login-text").hide("slow");

        $("#registerForm,.register-text").show("slow");
    },
    /*
     * @method : loadLightBox
     * @description : loading the light box
     */
    loadLightBox: function(e) {
        var self = Tango;
        var closeText = "Close [X]"
            //write logic to load the lightbox

        //prevent default action (hyperlink)
        e.preventDefault();

        //Get clicked link href
        var image_href = $(e.currentTarget).data("imgpath");

        /*  
            If the lightbox window HTML already exists in document, 
            change the img src to to match the href of whatever link was clicked
        
            If the lightbox window HTML doesn't exists, create it and insert it.
            (This will only happen the first time around)
            */

        if ($('#lightbox').length > 0) { // #lightbox exists

            //place href as img src value
            $('#content').html('<img src="' + image_href + '" />');

            //show lightbox window - you could use .show('fast') for a transition
            $('#lightbox').fadeIn("slow");
        } else { //#lightbox does not exist - create and insert (runs 1st time only)

            //create HTML markup for lightbox window
            var lightbox =
                '<div id="lightbox">' +
                '<p>' + closeText + '</p>' +
                '<div id="content">' + //insert clicked link's href into img src
                '<img src="' + image_href + '" />' +
                '</div>' +
                '</div>';

            //insert lightbox HTML into page
            $('body').append(lightbox);
        }

        //Click anywhere on the page to get rid of lightbox window
        $('#lightbox').on('click', function() { //must use live, as the lightbox element is inserted into the DOM
            self._closeLightBox();
        });
        //press escape to quit
        $(document).on('keyup', function(e) {
            if (e.keyCode === 27) {
                self._closeLightBox();
            }
        });
        //allow user to click on content.Provision for video.
        $('#content').on('click', function(e) {
            e.stopPropagation();
        });
    },
    /*
     * @method : _closeLightBox
     * @description : closing the lightbox
     */
    _closeLightBox: function() {
        $('#lightbox').fadeOut("slow");
    },
    /*
     * @method : validateRegister
     * @description : validate the register form
     * @return : isValidate (Boolean)
     */
    _validateLogin: function() {
        var isValidate = true;

        var user = {
            uname: $("#username").val(),
            pwd: $("#password").val()
        };

        return {
            user: user,
            isValidate: isValidate
        };
    },
    /*
     * @method : validateRegister
     * @description : validate the register form
     * @return : isValidate (Boolean)
     */
    validateRegister: function() {
        var isValidate = true;
        return isValidate;
    },
    /*
     * @method : validateLogin
     * @description : validate the login form
     * @return : isValidate (Boolean)
     */
    authenticateUser: function() {
        var valid = Tango._validateLogin();
        if (valid.isValidate) {
            //make ajax call to fetch user authentication
            console.log("user is valid ", valid.user);
        }

    },
    /*
     * @method : _fetchData
     * @description : makes ajax call to fetch data
     * @param : URL for the call
     * @return : isValidate (Boolean)
     */
    _fetchData: function(url, parameters, successCallback) {
        var data = null;
        $.ajax({
            type: 'GET',
            url: url,
            data: JSON.stringify(parameters),
            contentType: 'application/json;',
            dataType: 'json',
            success: successCallback
        });
        return data;
    },
    /*
     * @method : _sendData
     * @description : makes ajax call to send data
     * @param : URL for the call
     * @param : parameters (Object)
     * @param : successCallback (Function)
     */
    _sendData: function(url, parameters, successCallback) {
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(parameters),
            contentType: 'application/json;',
            dataType: 'json',
            success: successCallback
        });
    },
    /*
     * @method : loginUiSetup
     * @description : validate the register form
     * @return : isValidate (Boolean)
     */

    loginUiSetup: function() {
        var self = Tango;
        var usrName = $("#username").val();
        var pwd = $("#password").val();
        var isUsrNameBlank = true;
        var isPwdBlank = true;

        if (usrName === "") {
            $("#username").addClass("error")
        } else {
            isUsrNameBlank = false;
            $("#username").removeClass("error")
        }

        if (pwd === "") {
            $("#password").addClass("error")
        } else {
            isPwdBlank = false;
            $("#password").removeClass("error")
        }

        //if any field is blank
        var isFieldBlank = (isPwdBlank || isUsrNameBlank);
        //if all fields are filled
        if (!isFieldBlank) {
            $("#login-btn").removeAttr('disabled');
        } else {
            $("#login-btn").prop('disabled', true);
        }

    },
    /*
     * @method : registerFormValidate
     * @description : validate the register form
     * @return : isValidate (Boolean)
     */
    registerFormValidate: function() {
        var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var isValid = false;

        var $email = $("#registerForm #email");
        var $uname = $("#registerForm #username");
        var $pwd = $("#registerForm #password");
        var $cnPwd = $("#registerForm #cnfPassword");
        var $gender = $("#registerForm #gender");

        // email validation
        if ($email.val() === "") {
            $email.addClass("error");
            isValid = false;
        } else if ($email.val().length > 0 && !emailRegex.test($email.val())) {
            $email.addClass("error");
            $email.next(".err-msg").text("Not a valid email");
            if ($email.next().hasClass('suc-msg')) {
                $email.next(".suc-msg").removeClass("suc-msg").addClass("err-msg").text("Not a valid email");
            }
            isValid = false;
        } else if (Tango.doesEmailExist($email.val())) {
            $email.addClass("error");
            $email.next(".err-msg").html("Email already registered, <a href='#' id='open-login'>Login</a>");
            $("#open-login").on("click", Tango.openLogin);
            if ($email.next().hasClass('suc-msg')) {
                $email.next(".suc-msg").removeClass("suc-msg").addClass("err-msg").html("Email already registered, <a href='#' id='open-login'>Login</a>");
            }
            isValid = false;
        } else {
            $email.removeClass("error").addClass("success");
            $email.next(".err-msg").removeClass("err-msg").addClass("suc-msg").text("Looks great");
            isValid = true;
        }

        //user name validation
        if ($uname.val() === '') {
            $uname.addClass('error');
            isValid = false;
        } else {
            $uname.removeClass("error").addClass("success");
            $uname.next(".err-msg").removeClass("err-msg").addClass("suc-msg").text("Looks great");
            isValid = true;
        }

        //password validation
        if ($pwd.val() === '') {
            $pwd.addClass('error');
            isValid = false;
        } else if ($pwd.val() != "" && $cnPwd.val() == "") {
            $cnPwd.addClass('error');
            $pwd.addClass('success').removeClass('error');
            isValid = false;
        } else if ($pwd.val() !== $cnPwd.val()) {
            $cnPwd.addClass('error');
            $cnPwd.next(".err-msg").text("Passwords donot match");
            if ($cnPwd.next().hasClass('suc-msg')) {
                $cnPwd.next(".suc-msg").removeClass("suc-msg").addClass("err-msg").text("Passwords do not match");
            }
            isValid = false;
        } else {
            $pwd.addClass('success').removeClass('error');
            $cnPwd.addClass('success').removeClass('error');

            $pwd.next(".err-msg").removeClass("err-msg").addClass("suc-msg").text("Looks great");
            $cnPwd.next(".err-msg").removeClass("err-msg").addClass("suc-msg").text("Password match");

            isValid = true;
        }

        if ($gender.val() === '-999') {
            $gender.addClass('error');
            isValid = false;
        }
        $gender.on('change', function(e) {
            if ($gender.val() === '-999') {
                $gender.addClass('error');
                $gender.next(".suc-msg").removeClass("suc-msg").addClass("err-msg").text("* Required field");
                isValid = false;
            } else {
                $gender.addClass('success').removeClass('error');
                $gender.next(".err-msg").removeClass("err-msg").addClass("suc-msg").text("Looks great");
                isValid = true;
            }

            if (isValid) {
                $("#register-btn").removeAttr('disabled');
            } else {
                $("#register-btn").prop('disabled', true);
            }
        });
        // $(".error").length == 5 || isValid
        if (isValid) {
            $("#register-btn").removeAttr('disabled');
        } else {
            $("#register-btn").prop('disabled', true);
        }
    },
    /*
     * @method : doesEmailExist
     * @description : check if email id is already registered
     * @return : emailExists (Boolean)
     */
    doesEmailExist: function(userEmail) {
        //Fetch data from ajax. Right now initialised;     
        var registeredUsers = ['abc@tango.com', 'joe@tango.com', 'admin@tango.com'];
        var emailExists = registeredUsers.indexOf(userEmail) != -1 ? true : false;

        return emailExists;
    },
    /*
     * @method : openLogin
     * @description : opens login form
     */
    openLogin: function() {
        $("#loginForm,.login-text").show("slow");
        $("#registerForm,.register-text").hide("slow");

        $("#username").val($("#registerForm #email").val());
        $("#password").focus();
    },
    createUser: function(e) {
        //stopping form to submit to view user details
        e.preventDefault();
        var newUser = {
                email: $("#registerForm #email").val(),
                uname: $("#registerForm #username").val(),
                pwd: $("#registerForm #password").val(),
                gender: $("#registerForm #gender").val()
            }
            //make ajax call to fetch user authentication
        console.log("user is created ", newUser);


    }
};
