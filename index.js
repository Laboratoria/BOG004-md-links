const {
    getMdFiles,
    readMdFiles,
    getLinksMdFiles,
    getObjetsLinks,
    absolutePath,
    extMdFile,
    convertPath,
    totalAndUnique,
    broken,
} = require("./functions.js");

const mdLinks = (path, option) => {

    return new Promise((resolve, reject) => {
        //Función para convertir la ruta en absoluta
        const convertedRoute = convertPath(path)
            //Función que evalua si la ruta es un archivo .md
        extMdFile(convertedRoute);
        //Función que lee el archivo y valida opciones
        getObjetsLinks(convertedRoute)
            .then((res) => {
                // console.log('RES1', res)
                if ((option.validate !== true) && (option.stats !== true)) {
                    return (res);
                } else if ((option.validate === true) && (option.stats === true)) {
                    return (Promise.all(res.map((e) => getObjetsLinks(e))));
                } else if (option.stats === true) {
                    return (totalAndUnique(res));
                } else {
                    return (Promise.all(res.map((e) => getObjetsLinks(e))));
                }
            })
            .then((res) => {
                // console.log('RES2', res)
                console.log('ENTRA AQUI?');
                if ((option.validate !== true) && (option.stats !== true)) {
                    resolve(res.map((e) => `${e.href} ${e.text} ${e.file}\n`).join(''));
                } else if ((option.validate === true) && (option.stats === true)) {
                    resolve(broken(res, totalAndUnique(res)));
                } else if (option.stats === true) {
                    resolve(`Total: ${res.total}\nUnique: ${res.unique}`);
                } else {
                    resolve(res.map((e) => `${e.href} ${e.text} ${e.file} ${e.status} ${e.message}\n`).join(''));
                }
            })
            .catch((error) => {
                console.log(error);
                reject('Execution Failed');
            });
    });
};


mdLinks(process.argv[2], { validate: process.argv[3], stats: process.argv[4] })
    .then(resp => console.log(resp))
    .catch(err => console.log(err))


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