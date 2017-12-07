$(document).ready(function() {
    /* TODO
    * add on fail handler of a request
    * */
    initVkApi();

    $('button#connect_vk_account').on('click', function () {
        VK.Auth.login((res) => {
            $.ajax({
                method : 'post',
                url : '/profile/bind-vk/',
                data : res,
                dataType : 'json'
            }).done((res) => {
                if (res) {
                    boundUserVkData(res);
                }
            }).fail(() => {
                alert('Something goes wrong');
            })
        });
    });

    function initVkApi() {
        $.ajax({
            method : 'get',
            url : '/client?method=config&params=social,vk,appId',
            dataType : 'json'
        }).done((res) => {
            if (res) {
                VK.init({
                    apiId : res
                });
            }
        }).fail(() => {
            alert('Something goes wrong');
        });
    }

    function boundUserVkData(user) {
        let section = `<p>Подключен VK - аккаунт : <br> 
            <b>${ user.first_name } ${ user.last_name }</b></p>`;

        $('#accounts__vk').empty().append(section);
    }
});
