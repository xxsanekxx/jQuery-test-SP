import translate from '../services/translate';
import validator from 'validator';
import api from '../services/api';
import htmlLoad from '../services/htmlLoader';
import Handlebars from 'handlebars';

export default class {
    constructor(handleSubmit) {
        this.title = 'LoginForm';
        this.fields = [];
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.render = this.render.bind(this);
        this.handleSubmit = handleSubmit;
    }

    init() {
        // load settings for form
        return api.getData('/user/login')
            .then((result) => {
                // check if logged in
                // todo create User model, in router add checker for authorization and add parameter to router for this url(hash)
                if (result.status === 'ok' && result.user) {
                    location.hash = '';
                    return Promise.reject(new Error('already logged'));
                }
                this.title = translate.locale(result.title);
                this.fields = result.fields || [];
                this.fields = jQuery.map(this.fields, function (value, key) {
                    // for handlebars {#if}, I don't want create helper
                    value.bool = value.type === 'boolean';
                    value.name = result.model + '[' + key +']';
                    value.id = result.model + '[' + key +']';
                    value.title = translate.locale(value.title);
                    return value;
                });

                return htmlLoad('ui/elements/form.html', {title: this.title, fields: this.fields, _csrf: result._csrf});
            })
            .then(({html, params}) => {
                this.template = Handlebars.compile(html);
                return params;
            });
    }
    render($wrapper, settings={title: this.title, fields: this.fields}) {
        this.$element = jQuery(this.template({
            _csrf: settings._csrf,
            fields: settings.fields
        }));
        this.$element.submit(this.onSubmit);
        $wrapper.append(this.$element);
        return this.$element;
    }

    onSubmit(e) {
        e.preventDefault();
        const valid = this.validate();
        if (valid !== true) {
            return this.handleSubmit(valid.error);
        }

        api.sendData('/user/login', jQuery(e.target).serialize())
            .then((data) => {
                this.handleSubmit(null, data);
            })
            .catch(this.handleSubmit);
    }

    validate() {
        if (validator.isEmail(this.$element.find('input[name="LoginForm[email]"]').val())) {
            console.log('email is valid');
        }
        return true;
    }
}
