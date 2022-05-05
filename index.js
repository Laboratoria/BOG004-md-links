const path = require('path');
const fs = require('fs');
const [, , pathUser] = process.argv;
var clc = require('cli-color');

//Función para validar si la ruta existe
const existsPath = (pathUser) => fs.existsSync(pathUser);

//Expresiones regulares para la extracción de links
const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

//Convirtiendo ruta de relativa a absoluta
const validatePath = (pathUser) => {
    if (path.isAbsolute(pathUser)) {
        return pathUser;
    } else {
        const pathAbsolute = path.resolve(pathUser).normalize();
        return pathAbsolute;
    }
};

let myRoute = validatePath(pathUser);


//Validando si la ruta que ingreso el usuario es directorio o archivo, y si es .md
function readingRoute(pathUser) {
    let filesPath = [];
    if (fs.statSync(pathUser).isFile() && path.extname(pathUser) === '.md') {
        filesPath.push(pathUser);
    } else {
        if (fs.statSync(pathUser).isDirectory()) {
            const directory = pathUser;
            let contentDirectory = fs.readdirSync(directory)
            contentDirectory.forEach(elem => {
                readingRoute(pathUser + '\\' + elem).forEach(elem => {
                        filesPath.push(elem);
                    })
                    //Aquí aplica la recursividad donde se pasa al primer if y se pregunta si es .md o no
            })
        }
    }
    return filesPath;
}

console.log(readingRoute(myRoute));

//myFilesPath es el resultado de mi función recursiva
let myFilesPath = readingRoute(myRoute);

//Función que lee los archivos que estan en un array
const readingMdFiles = (MdArray) => {
    MdArray.forEach(md => {
        fs.promises.readFile(md, 'utf-8')
            .then((result) => {
                console.log(clc.yellow('este es el contenido de cada archivo.md'), result)
            })
            .catch((error) => {
                console.log(clc.red('este es el error'), error);
            })
    })
}

readingMdFiles(myFilesPath)

//Función para extraer links de un archivo
const doLinkRequest = (pathAbsolute) => {
    let arrayLinks = [];
    pathAbsolute.forEach((file) => {
        const MdFile = fs.readFile(file);
        if (regExp.test(MdFile)) {
            let allLinks = MdFile.match(regExp);
            console.log(clc.blue('En ${file} existen ${allLinks.length} links para analizar.'));
            allLinks.forEach(links => {
                arrayLinks.push({
                    'file': file,
                    'href': links,
                })
            })
        } else {
            console.log(clc.red('No links found in ${file}'));
        }
    });
    return arrayLinks;
};

//Función para info de los links
const dataLinks = (links) => {
    const obj = links.map(e => {
        return fetch(e)
            .then((response) => {
                return {
                    href: e.href,
                    text: e.text,
                    file: e.file,
                    status: response.status,
                    ok: 'ok',
                }
            })
            .catch((error) => {
                return {
                    href: e.href,
                    text: e.text,
                    file: e.file,
                    status: error.status === undefined ? 'No status' : error.status,
                    ok: 'ok',
                }
            })
    });
    return Promise.all(obj)
}


module.exports = () => {
    existsPath,
    validatePath,
    myRoute,
    readingRoute,
    myFilesPath,
    readingMdFiles,
    doLinkRequest,
    dataLinks
};