$(document).ready(function() {
    VK.init({
        apiId: 6283122
    });

    $('button#connect_vk_account').on('click', function () {
        VK.Auth.login((res) => {
            $.ajax({
                method : 'post',
                url : '/profile/bind-vk/',
                data : res,
                dataType : 'json'
            }).done((res) => {
                if (res) {
                    bindUserVkData(res);
                }
            }).fail((res) => {
                console.error(res.responseJSON.error);
            })
        });
    });

    function bindUserVkData(user) {
        let vkSection = `<p>Подключен VK - аккаунт : <br> 
            <b>${ user.first_name } ${ user.last_name }</b></p>`;
        $('#accounts__vk').empty().append(vkSection);
    }
});

