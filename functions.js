const path = require("path");
const fs = require("fs");
const clc = require('cli-color');
// const { url } = require("inspector");
const [, , route] = process.argv;

// const md = ('markdown-it');

// //Valida si la ruta existe
// const existsPath = (route) => fs.existsSync(route);

//Valida si la es ruta es absoluta
const absolutePath = (route) => path.isAbsolute(route);

//Convirte la ruta de relativa a absoluta
const convertPath = (route) =>
    absolutePath(route) ? route : path.resolve(route);

//Valida si la ruta es una carpeta
const folderPath = (route) => fs.statSync(route).isDirectory();

//Iterrar directorio
const readFolder = (route) => fs.readdirSync(route, "utf-8");

//Valida si hay archivos con extensión .md
const extMdFile = (route) => path.extname(route) === ".md";

// //Lectura de archivo .md
// const readMdFile = (route) => fs.readFileSync(route, "utf-8");

let arrayMdFiles = [];
// let urlText = [];
// let pathText = [];
// let objetResult = [];

//Recorre directorio y almacena archivos .md en un array
const getMdFiles = (currentRoute) => {

    let joinRoute;
    console.log('FOLDERPATH', folderPath(currentRoute)); //Si es folder true
    if (folderPath(currentRoute)) {
        readFolder(currentRoute).forEach((elem) => {
            joinRoute = path.join(currentRoute, elem);
            getMdFiles(joinRoute) //Aplica recursividad en getMdFiles
        });
    } else {
        if (extMdFile(currentRoute)) {
            joinRoute = path.join(currentRoute);
            arrayMdFiles.push(joinRoute)
        }
    }
    return arrayMdFiles;
};

// console.log(getMdFiles(route));

//Lee archivos .md
const readMdFiles = (MDfile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(MDfile, 'utf-8', (err, data) => {
            if (err) {
                const errorMsj = ("Can't read file");
                reject(errorMsj)
                    // console.log(clc.red('Could not read the file'));
            } else {
                resolve({
                    route: MDfile,
                    fileContent: data,
                });
            }
        });
    });
};

// readMdFiles(route).then(response => console.log('SE LEYÓ', response)).catch(err => console.error('NO SE LEYÓ')); //Lo que debe hacer cuando la promesa se cumpla o falle

//Extrae links de archivo .md
const getLinksMdFiles = (routeMDfile) => new Promise((resolve, reject) => {
    const regExp = /\[(.*?)\]\(.*?\)/mg;
    const regUrl = /\(.*?\)/mg;
    const regText = /\[(.*?)\]/mg;
    readMdFiles(routeMDfile)
        .then((fileContent) => {

            const arrayLinks = fileContent.fileContent.match(regExp);

            if (arrayLinks === null) {
                resolve([])
            }

            const arrayLinksConvert = arrayLinks.map((objLinks) => {

                const objhref = objLinks.match(regUrl).join().slice(1, -1);
                const objtext = objLinks.match(regText).join().slice(1, -1);
                return {
                    href: objhref, //URL encontrada
                    text: objtext.substring(0, 50), //Texto que aparecía dentro del link (<a>).
                    fileName: path.basename(routeMDfile), //Ruta del archivo donde se encontró el link.
                };
            })
            resolve(arrayLinksConvert);
        })
        .catch((err) => {
            reject(err)
        });

});

getLinksMdFiles(route).then(arrayLinksConvert => console.log('PASÓ', arrayLinksConvert)).catch(err => console.error('NO PASÓ', err)); //Lo que debe hacer cuando la promesa se cumpla o falle


// const validateLinks = (arrayLinksConvert) => {
//     return Promise.all(arrayLinksConvert.map((link) => {
//         return fetch(link, href)
//             .then(result => {
//                 const statusArr = result.status >= 200 && result.ststus <= 399 ? 'Ok' : 'Fail';
//                 return {
//                     href: link.href,
//                     text: link.text,
//                     file: link.file,
//                     status: result.status,
//                     message: statusArr,
//                 }
//             })
//             .catch(() => {
//                 return {
//                     href: link.href,
//                     text: link.text,
//                     file: link.file,
//                     status: '',
//                     message: 'Fail',
//                 }
//             });
//     }));
// };

// validateLinks(arrayLinksConvert).then(arrayLinksConvert => console.log('PASÓ????', arrayLinksConvert)).catch(err => console.error('NO PASÓ!!!!', err)); //Lo que debe hacer cuando la promesa se cumpla o falle



// const allLinksResult = (MDarray) => new Promise((resolve, reject) => {
//     const linksObjArr = [];
//     MDarray.map((file) => getLinksMdFiles(file)
//         .then((linksArrayResult) => {
//             linksObjArr.push(linksArrayResult); // [[{l1},{l2}...],[{l1}...],[{l1}...]] arr con arr de obj
//             if (linksObjArr.length === MDarray.length) {
//                 resolve(linksObjArr.flat());
//             }
//         })
//         .catch((error) => {
//             reject(error);
//         }));
// });

// allLinksResult(route).then(response => console.log('PASO', response)).catch(error => console.error('NO PASÓ')); //Lo que debe hacer cuando la promesa se cumpla o falle




//node functions "C:\Users\yduqu\OneDrive\Escritorio\Laboratoria\md-links\files-md\example1.md"