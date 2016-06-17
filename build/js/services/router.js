import Handlebars from 'handlebars';
import htmlLoad from '../services/htmlLoader';

export default class {

    constructor({routes, renderPageFunc}) {
        this.$loadingIndicator = jQuery('#loadingIndicator');
        this.renderPageFunc = renderPageFunc;
        this.onHashChange = this.onHashChange.bind(this, routes, renderPageFunc);

        window.onhashchange = this.onHashChange;
        this.onHashChange();
    }

    onHashChange(routes, renderPageFunc) {
        this.$loadingIndicator.removeClass('hidden');
        const hash = location.hash.replace(/^#/, '');
        let router;

        if (hash === '' || !routes[hash]) {
            router = routes['default'];
        } else {
            router = routes[hash];
        }
        if (typeof router === 'function') {

            return router(renderPageFunc);
        }

        if (router['src'] || typeof router === 'string') {
            return this.loadingPage(router['src'] || router, router['model'])
                .then(() => {
                    this.$loadingIndicator.addClass('hidden');
                })
                .catch((err) => {
                    this.$loadingIndicator.addClass('hidden');
                    this.renderPageFunc(err);
                });
        }

        location.hash = '#404';

    };

    loadingPage (src, model) {
        return htmlLoad(src)
            .then(({html}) => {

                if (model) {
                    return model.init()
                        .then((settings) => {
                            const templatePage = Handlebars.compile(html);
                            const $page = jQuery(templatePage(settings));

                            if (model.render && typeof model.render === 'function') {
                                model.render($page.find('#wrapper'), settings);
                            }
                            this.renderPageFunc(null, $page);
                        })
                        .catch(this.renderPageFunc);
                }
                this.renderPageFunc(null, jQuery(html));
            });
    }
}
