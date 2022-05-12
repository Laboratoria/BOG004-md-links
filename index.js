const {
    getMdFiles,
    readMdFiles,
    getLinksMdFiles,
    getObjetsLinks,
} = require("./functions.js");


const mdLinks = (path, option) => {
    return new Promise((resolve, reject) => {
        //Ingresa path
        //Función para convertir la ruta en absoluta
        const absoluteRoute = absolutePath(path);
        //Función que evalua si la ruta es un archivo .md
        extMdFile(absoluteRoute);
        //Función que lee el archivo y valida opciones
        getMdFiles(absoluteRoute)
            .then((res) => {
                if ((option.validate !== true) && (options.stats !== true)) {
                    return (res);
                } else if ((option.validate === true) && (option.stats === true)) {
                    return (Promise.all(res.map((e) => getObjetsLinks(e))));
                } else if (option.stats === true) {
                    return (linkStats(res));
                } else {
                    return (Promise.all(res.map((e) => getObjetsLinks(e))));
                }
            })
            .then((res) => {
                if ((option.validate !== true) && (option.stats !== true)) {
                    resolve(res.map((e) => `${e.file} ${e.href} ${e.test}\n`).join(''));
                } else if ((option.validate === true) && (option.stats === true)) {
                    resolve(validateAndStats(res, linkStats(res)));
                } else if (option.stats === true) {
                    resolve(`Total: ${res.total}\nUnique: ${res.unique}`);
                } else {
                    resolve(res.map((e) => `${e.file} ${e.href} ${e.statusCode} ${e.status} ${e.text}\n`).join(''));
                }
            })
            .catch((error) => {
                console.log(error);
                reject('Execution Failed');
            });
    });
};

module.exports = {
    mdLinks,
};

// mdLinks = (ruta, options) => {
//     return new Promise((resolve, reject) => {
//         // si options.validate === false
//         // respondo con función que retorna { href, text, file}
//         // si options.validate === true 
//         // respondo con objectWithValidateLinks --> {jref, text, file, status, ok}
//     })
// }