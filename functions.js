const path = require("path");
const fs = require("fs");
const clc = require('cli-color');
const { url } = require("inspector");
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

console.log(getMdFiles(route));

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

readMdFiles(route).then(response => console.log('SE LEYÓ', response)).catch(err => console.error('NO SE LEYÓ')); //Lo que debe hacer cuando la promesa se cumpla o falle


//Extrae links de archivo .md
const getLinksMdFiles = (routeMDfile) => new Promise((resolve, reject) => {
    const regExp = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
    const regxUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
    const regxText = /\[[\w\s\d.()]+\]/;

    readMdFiles(routeMDfile).then((contentFile) => {
            const arrayLinks = contentFile.match(regExp);

            if (arrayLinks === null) {
                resolve([])
            }

            const linkConverted = arrayLinks.map((objLinks) => {
                const objhref = objLinks.match(regxUrl).join().slice(1, -1);
                const objtext = objLinks.match(regxText).join().slice(1, -1);
                return {
                    href: objhref,
                    text: objtext.substring(0, 50),
                    fileName: path.basename(routeMDfile),
                };
            })
            resolve(linkConverted);
        })
        .catch((err) => {
            const errorMsj = ("Links could not be obtained");
            reject(errorMsj)
        });

});

getLinksMdFiles(route).then(response => console.log('PASÓ', response)).catch(err => console.error('NO PASÓ')); //Lo que debe hacer cuando la promesa se cumpla o falle


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



// const getLinksMdFiles = (MDarray) => Promise.all(MDarray.map(readMdFiles))
//     .then((data) => {
//         data.forEach((elem) => {
//             const myLinks = [...elem.fileContent.toString().match(regExp)];
//             myLinks.forEach((url) => {
//                 urlText.push(url);
//                 pathText.push(elem.route);
//             });
//         });

//         objetResult = urlText.map((linksResult) => {
//             let index =urlText.indexOf(linksResult);
//             const arrUrl = linksResult.split('](');
//             const text = arrUrl[0].slice(1);
//             const href = arrUrl[1].slice(0, -1);

//             return (
//                 href: href,
//                 text: text.substring(0, 50),
//                 file: pathText[index],
//             );
//         });
//         return objetResult
//     })
//     .catch((err) => reject(err));