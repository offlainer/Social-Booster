const DOM = {
    acts : $('a.panel-action'),
    input : $('.panel--input-values')
};

$(document).ready(function() {
    $('#__welcomeScreen').modal();

    $('a.panel-action').on('click', (e) => {
        e.preventDefault();

        $(DOM.acts).removeClass('active');
        $(e.currentTarget).addClass('active');

        $(DOM.input).animate({height : "0px"}, 300);

        setTimeout(() => {
            $(DOM.input).show().animate({height : "215px"}, 300);
        }, 300);
    })
});
