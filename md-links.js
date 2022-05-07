// const { existsPath } = require('./index.js');
const index = require('./index.js')
const fs = require('fs');
const pathUser = process.argv[2];
const options = process.argv[3];


const existsPath = (pathUser) => fs.existsSync(pathUser);
console.log('EXISTSPATH', existsPath)
const mdLinks = (pathUser, options) => {
    console.log('OTROEXISTSPATH', existsPath(pathUser));
    console.log('OPTIONS', options);
    return new Promise((resolve, reject) => {
        if (index.existsPath(pathUser) == "false") {
            reject('The path entered is not valid.')
        } else {
            if (!options.validate) {
                console.log('IF !options.validate');
                const validDoLinksRequest = index.readingRoute(pathUser) !== '' ?
                    index.doLinkRequest(pathUser) :
                    console.log('OKKKKKK');
                resolve(validDoLinksRequest);
            } else {
                console.log('ELSE !options.validate');
                const validateStatus = index.readingRoute(pathUser) !== '' ?
                    index.dataLinks(pathUser) :
                    console.log('No hay archivos md');
                resolve(validateStatus);
            }
        }
        /*

                const extractionLink = doLinkRequest(absoluteRoute);

                const allLinksValidate = dataLinks(extractionLink);

                if (options === undefined) {
                    console.log('IF UNDEFINED')
                    resp(extractionLink)
                } else if (options === '--validate') {
                    console.log('ELSE IF --validate')
                    resp(allLinksValidate);
                } else if (options === '--stats') {
                    console.log('ELSE IF --stats')
                    resp(`Existen ${links.length} links en total.`);
                }*/
    });
};


mdLinks(pathUser, options).then(resp => console.log('respuesta final', resp)).catch(err => console.log('error final', err))

module.exports = {
    mdLinks,
};