import api from './services/api';
import translate from './services/translate';
import Router from './services/router';

import LoginForm from './models/LoginForm';
import UserInfoPage from './models/UserInfo';
import Alert from './models/Alert';

class App {
    constructor($htmlMain) {
        this.$htmlMain = $htmlMain;
        this.$htmlContent = $htmlMain.find('#content');
        this.$htmlAlertContainer = $htmlMain.find('#alert');
        this.alert = new Alert();
        this.init = this.init.bind(this);
        this.load = this.load.bind(this);
        this.catchError = this.catchError.bind(this);
    }

    load() {
        return api.getData('/text/all/locale.json')
            .then((data) => {
                translate.setLanguage('ru');
                translate.loadLocales(data.result);
            });
    }

    init() {
        this.$htmlMain.find('#loadingIndicator').removeClass('hidden');

        this.load()
            .then(() => {
                this.router = new Router({
                    routes: {
                        'user/login': {
                            model: new LoginForm((err, data) => {
                                if (err ) {
                                    return this.catchError(err);
                                }
                                if (data.status === 'error') {
                                    return this.catchError(new Error(translate.locale(data.title)));
                                }
                                location.hash = '';
                            }),
                            src: 'ui/pages/login.html'
                        },
                        'default': {
                            model: new UserInfoPage((err) => {
                                if (err) {
                                    return this.catchError(err);
                                }
                            }),
                            src: 'ui/pages/userInfo.html'
                        },
                        'user/logout': function (callback) {
                            api.getData('/user/logout')
                                .then(function () {
                                    location.hash = '#user/login';
                                })
                                .catch(callback);
                        },
                        '404': 'ui/pages/404.html',
                        '500': 'ui/pages/500.html'
                    },
                    renderPageFunc: (err, $page) => {
                        if (err) {
                            if (err.statusCode == 401) {
                                location.hash = '#user/login';
                                return;
                            }
                            return this.catchError(err);
                        }
                        const $logoutButton = $page.find('#logoutBtn');

                        if ($logoutButton.length > 0) {
                            $logoutButton.on('click', function (e) {
                                e.preventDefault();
                                location.hash = '#user/logout';
                            })
                        }
                        // function page render
                        this.$htmlContent.empty().append($page);
                    }
                });
                console.log('app is initialized');
            })
            .catch(this.catchError);
    }

    catchError(err={}) {
        this.$htmlAlertContainer.append(this.alert.html(err.message || 'Unknown error', 'danger'));
    }
}
window.app = new App(jQuery('#main'));
app.init();
