$(document).ready(function() {
    /* TODO
    * Add the on fail handler of a request
    * */
    initVkApi();

    /**
    * Authorize user in it the Vkontakte account
    */
    $('button#connect_Vkontakte_account').on('click', function (e) {
        $(e.target).remove();

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

    /**
     * Initiate the Vkontakte API
     */
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

    /**
     * Show a user the Vkontakte social account block on the profile page
     * @param account : account of a user
     */
    function boundUserVkData(account) {
        let section = `<p>Подключен VK - аккаунт : <br> 
            <b>${ user.first_name } ${ user.last_name }</b></p>`;

        $('.accounts-list').prepend(section);
    }
});
