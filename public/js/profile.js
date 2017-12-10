const DOM = {
    accounts : {
        section : "<div id ='account_block_'>" +
                    "<p class='provider-name'></p>" +
                    "<p class='profile-name'></p>" +
                  "</div>"
    }
};

$(document).ready(function() {
    /* TODO
    * Add the on fail handler of a request
    * */
    initVkApi();

    /**
    * Authorize user in it the Vkontakte account
    */
    $('button#connect_Vkontakte_account').on('click', function (e) {
        $(e.target).parent().remove();

        VK.Auth.login((res) => {
            $.ajax({
                method : 'post',
                url : '/profile/bind-account?provider=Vkontakte',
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
        let section = $(DOM.accounts.section);

        $(section).attr('id', $(section).attr('id') + account.provider);
        $(section).find("p:first").html(`Подключен аккаунт <b>${account.provider}</b> : `);
        $(section).find("p:last").html(`<b>${account.first_name} ${account.last_name}</b>`);

        $('.accounts-list').prepend(section);
    }
});
