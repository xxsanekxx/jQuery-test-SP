import Handlebars from 'handlebars';

export default class {
    constructor() {
        jQuery.get('ui/elements/alert.html', 'html')
            .done((html) => {
                this.template = Handlebars.compile(html);
            })
            .fail(function (jqXhr, textStatus, error) {
                console.log(error);
            });
    }

    html(text, type) {
        return this.template({text: text, type:type});
    }
};
