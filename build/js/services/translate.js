const LANGUAGE = 'ru';

class Translate {
    constructor() {
        this.language = LANGUAGE;
        this.locales = {};
    }

    loadLocales(locales) {
        this.locales = locales;
    }

    locale(name) {
        return this.locales[name];
    }

    setLanguage(language) {
        this.language = language;
    }

    getLanguage() {
        return this.language;
    }
}

export default new Translate();
