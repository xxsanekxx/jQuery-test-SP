import translate from '../services/translate';
import api from '../services/api';

export default class {
    constructor(handle) {
        this.title = 'UserInfo';
        this.handle = handle;
    }

    init() {
        return api.getData('/user/index')
            .then(function (settings) {
                settings.title = translate.locale(settings.title);
                settings.content = translate.locale(settings.content);
                if (settings.account) {
                    settings.account.title = translate.locale(settings.account.title);
                }
                if (settings.balance) {
                    if (settings.balance.real && settings.balance.real.title) {
                        settings.balance.real.title = translate.locale(settings.balance.real.title);
                    }
                    if (settings.balance.bonus && settings.balance.bonus.title) {
                        settings.balance.bonus.title = translate.locale(settings.balance.bonus.title);
                    }
                    if (settings.balance.partner && settings.balance.partner.title) {
                        settings.balance.partner.title = translate.locale(settings.balance.partner.title);
                    }
                }
                if (settings.forecast && settings.forecast.title) {
                    settings.forecast.title = translate.locale(settings.forecast.title);
                    settings.forecast.value = settings.forecast.value ? new Date(settings.forecast.value) : false;
                }
                return settings;
            });
    }
}
