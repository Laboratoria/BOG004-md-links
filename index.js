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
        getLinksMdFiles(convertedRoute)
            // .then((result) => {
            //     if ((option.validate !== true) && (option.stats !== true)) {
            //         console.log('RESult1', result)
            //         return (result);
            //     } else if ((option.validate === true) && (option.stats === true)) {
            //         return (Promise.all(result.map((e) => getObjetsLinks(e))));
            //     } else if (option.stats === true) {
            //         return (totalAndUnique(result));
            //     } else {
            //         return (Promise.all(result.map((e) => getObjetsLinks(e))));
            //     }
            // })
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
                        // console.log('eeeee', e);
                        resolve(getObjetsLinks(e))
                    });

                    // resolve(res.map((e) => `${e.href} ${e.text} ${e.file} ${e.status} ${e.message}\n`).join(''));
                }
            })
            .catch((error) => {
                console.log(error);
                reject('Execution Failed');
            });
    });
};


// mdLinks(process.argv[2], { validate: process.argv[3], stats: process.argv[4] })
//     .then(resp => console.log(resp))
//     .catch(err => console.log(err))


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