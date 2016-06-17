export default function (src, params) {
    return new Promise(function (resolve, reject) {
        jQuery.get(src, 'html')
            .done(function (html) {
                resolve({html: html, params: params});
            })
            .fail(function (jqXHR, textStatus, error) {
                reject({
                    message: error,
                    statusCode: jqXHR.status
                });
            });
    });
}
