const {
    getMdFiles,
    getLinksMdFiles,
    getObjetsLinks,
    convertPath,
} = require("./functions.js");

const mdLinks = (path, option) => {
    // console.log('OPTIOOONS', option) //validar que recibo objeto con estructura desarrollada en cli js con validate y stats);
    return new Promise((resolve, reject) => {
        //Función para convertir la ruta en absoluta
        const convertedRoute = convertPath(path)
            //Función que evalua si la ruta es un archivo .md
        getMdFiles(convertedRoute)
            //Función que lee el archivo y valida opciones
        getObjetsLinks(convertedRoute)
            .then((res) => {
                // console.log('ENTRA AQUI?');
                if (option.validate !== true) {
                    resolve(getLinksMdFiles(convertedRoute));
                } else {
                    resolve(getObjetsLinks(convertedRoute))
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