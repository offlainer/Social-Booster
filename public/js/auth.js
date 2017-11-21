const loc = window.location;

function showLogin(){
    $("#login-form").delay(50).fadeIn(100);
    $("#register-form").fadeOut(50);
    $('#signup').removeClass('active');
    $('#login').addClass('active');
}

function showSignUp(){
    $("#register-form").delay(50).fadeIn(100);
    $("#login-form").fadeOut(50);
    $('#login').removeClass('active');
    $('#signup').addClass('active');
}

$( document ).ready(function() {
    if (loc.hash == '#login') {
        showLogin();
    } else {
        showSignUp();
    }

    $('#login, #login-link').click(function (e) {
        showLogin();
        e.preventDefault();
    });

    $('#signup, #signup-link').click(function (e) {
        showSignUp();
        e.preventDefault();
    });

});
