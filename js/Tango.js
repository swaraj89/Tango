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
     * @method : openVideo
     * @description : opens the video in the light box
     */
    openVideo: function() {
        //grab url to show
        //Load lightbox with the URL
    },
    /*
     * @method : _loadLightBox
     * @description : loading the light box
     */
    _loadLightBox: function() {
        //write logic to load the lightbox
    },
    /*
     * @method : validateRegister
     * @description : validate the register form
     * @return : isValidate (Boolean)
     */
    validateRegister: function() {
        var isValidate = false;
        return isValidate;
    },
    /*
     * @method : validateLogin
     * @description : validate the login form
     * @return : isValidate (Boolean)
     */
    validateRegister: function() {
        var isValidate = false;
        return isValidate;
    },
    /*
     * @method : _fetchData
     * @description : makes ajax call to fetch data
     * @param : URL for the call
     * @return : isValidate (Boolean)
     */
    _fetchData: function(url,parameters,successCallback) {
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
    _sendData: function(url,parameters,successCallback) {
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(parameters),
            contentType: 'application/json;',
            dataType: 'json',
            success: successCallback
        });
    }
};
