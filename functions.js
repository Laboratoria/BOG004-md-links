const path = require('path');
const fs = require('fs');
const [, , route] = process.argv;
// const md = ('markdown-it');

//Valida si la ruta existe
const existsPath = (route) => fs.existsSync(route);

//Valida si la es ruta es absoluta
const absolutePath = (route) => path.isAbsolute(route);

//Convirte la ruta de relativa a absoluta
const convertPath = (route) => absolutePath(route) ? (route) : path.resolve(route);

//Valida si la ruta es una carpeta
const folderPath = (route) => fs.statSync(route).isDirectory();

//Iterrar directorio
const readFolder = (route) => fs.readdirSync(route, 'utf-8');

//Valida si hay archivos con extensión .md
const extMdFile = (route) => path.extname(route) === '.md';

//Lectura de archivo .md
const readMdFile = (route) => fs.readFileSync(route, "utf-8");

//Expresiones regulares
const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

//Recorre directorio y almacena archivos .md en un array
const getMdFiles = (route) => {
    let arrayMdFiles = [];
    let joinRoute;
    if (folderPath(route)) {
        readFolder(route).forEach((elem) => {
            joinRoute = path.join(route, elem);
            arrayMdFiles = arrayMdFiles.concat(getMdFiles(convertPath(joinRoute))); //Aplica la recursividad en getMdFiles
        })
    } else if (extMdFile(route)) {
        arrayMdFiles.push(convertPath(route));
    }
    return arrayMdFiles;
}

console.log(getMdFiles(route));

const getLinksMdFiles = route => {
    let arrayLinks = [];
    route.forEach(file => {
        let arrayTextLinks = fs.readFile(file); //Extrae [textoReferenciaDelLink] y el (link) de los links contenidos en cada archivo md

        if (regExp.test(arrayTextLinks)) {
            let result = arrayTextLinks.match(regExp); //Convierte el archivo md en texto HTML
            console.log('- En ${file} existen ${result.length} links para analizar.');
            result.forEach(arrLinks => {
                arrayLinks.push({
                    'file': file,
                    'href': arrLinks,
                })
            })

            // let domMD = new JSDOM(convertMd)
            // arrayTextLinks = domMD.window.document.querySelectorAll("a")
            // console.log('arrayTextLinks', arrayTextLinks);
            // arrayTextLinks.forEach((textLinks) => {
            //     console.log(textLinks);
            //     const link = textLinks.href //Devuelve link de la URL
            //     const text = textLinks.substring(0, 50); //Devuelve texto descriptivo de la URL (del caracter 0 al 49)
            //     arrayLinks.push({
            //         href: link,
            //         text: text,
            //         file: routeAbsolute,
            //     });
            // });
        } else {
            console.log('- En ${file} no existen links para analizar.');
        }
    });
    return arrayLinks;
};

console.log(getLinksMdFiles(route));






// Almacenar nombre y ruta del archivo en un array