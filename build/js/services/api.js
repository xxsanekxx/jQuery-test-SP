const href = 'https://api2dev.vdsina.ru';
//import Cookie from 'js-cookie';

const mocks = {
    'GET': {
        '/text/all/locale.json': require('../../../mocks/locales.json'),
        '/user/login': require('../../../mocks/userLoginForm.json'),
        '/user/index': require('../../../mocks/userIndex.json')
    },
    'POST': {
        '/user/login': require('../../../mocks/userLoginFormPost.json')
    }
};

class Api {
    constructor(withMocks) {
        this.csrf = null;
        this.withMocks = withMocks;
        this.getData = this.getData.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    //set csrf(csrf) {
    //    //Cookie.set('_csrf', csrf);
    //    console.log('update csrf: ' + csrf );
    //}

    getData(path) {
        return new Promise((resolve, reject) => {
            if (this.withMocks) {
                return resolve(mocks['GET'][path]);
            }
            jQuery.ajax({
                url: href + path,
                crossDomain: true,
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                }
            })
                .done(resolve)
                .fail(function (jqXHR, textStatus, error) {
                    reject({
                        message: error,
                        statusCode: jqXHR.status
                    });
                });
        });
    }

    sendData(path, data) {

        return new Promise((resolve, reject) => {
            if (this.withMocks) {
                return resolve(mocks['POST'][path]);
            }
            jQuery.ajax({
                method: 'POST',
                url: href + path,
                crossDomain: true,
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(resolve)
            .fail(function (jqXHR, textStatus, error) {
                reject({
                    message: error,
                    statusCode: jqXHR.status
                });
            });
        });
    }

}

export default new Api(true);
