const {
    getMdFiles,
    getLinksMdFiles,
    getObjetsLinks,
    convertPath,
    totalAndUnique,
    broken,
} = require("./functions.js");

const mdLinks = (path, option) => {
    // console.log('OPTIOOONS', option) //validar que recibo objeto con estructura desarrollada en cli js con validate y stats);
    return new Promise((resolve, reject) => {
        //Función para convertir la ruta en absoluta
        const convertedRoute = convertPath(path)
            //Función que evalua si la ruta es un archivo .md
        getMdFiles(convertedRoute).then((listLinks) => {
            // console.log('GETMDFILES PASA POR AQUI?', listLinks);
        });
        //Función que lee el archivo y valida opciones
        getObjetsLinks(convertedRoute)
            .then((res) => {
                // console.log('ENTRA AQUI?');
                if ((option.validate !== true) && (option.stats !== true)) {
                    resolve(res.map((e) => `${e.href} ${e.text} ${e.file}\n`).join(''));
                } else if ((option.validate === true) && (option.stats === true)) {
                    resolve(totalAndUnique(res) + broken(res));
                } else if (option.stats === true) {
                    resolve(totalAndUnique(res));
                } else {
                    Promise.all(res).then(e => {
                        resolve(getObjetsLinks(e))
                    });
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

module.exports = {
    mdLinks,
};