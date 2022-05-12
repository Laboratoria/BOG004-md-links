const path = require("path");
const fs = require("fs");
const clc = require("cli-color");
const { default: axios } = require("axios");
// const { options } = require("markdown-it/lib/presets/default");
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

//Lectura de ruta
const getMdFiles = (currentRoute) => new Promise((resolve, reject) => {
    let joinRoute;
    console.log('HOLAAA');
    if (folderPath(currentRoute)) {

        readFolder(currentRoute).forEach((elem) => {
            joinRoute = path.join(currentRoute, elem);
            getMdFiles(joinRoute);
        });
    } else {
        if (extMdFile(currentRoute)) {
            joinRoute = path.join(currentRoute);
            console.log('JOINROUTE', joinRoute);
            arrayMdFiles.push(joinRoute);
        }
    }
    resolve(arrayMdFiles);
}).then(() => {
    console.log('ARRAYMDFILES', arrayMdFiles);
})

// console.log(getMdFiles(route));

//Lee archivos .md
const readMdFiles = (MDfile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(MDfile, "utf-8", (err, data) => {
            if (err) {
                const errorMsj = "Can't read file";
                reject(errorMsj);
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

//Extrayendo URL´s del archivo .md
const getLinksMdFiles = (routeMDfile) =>
    new Promise((resolve, reject) => {
        const regExp = /\[(.*?)\]\(.*?\)/gm;
        const regUrl = /\(.*?\)/gm;
        const regText = /\[(.*?)\]/gm;
        let arrayLinksConvert = [];

        readMdFiles(routeMDfile)
            .then((fileContent) => {
                const arrayLinks = fileContent.fileContent.match(regExp);

                if (arrayLinks === null) {
                    resolve([]);
                }

                arrayLinks.forEach((objLinks) => {
                    const objhref = objLinks.match(regUrl).join().slice(1, -1);
                    const objtext = objLinks.match(regText).join().slice(1, -1);
                    arrayLinksConvert.push({
                        href: objhref, //URL encontrada
                        text: objtext.substring(0, 50), //Texto que aparecía dentro del link (<a>).
                        fileName: path.basename(routeMDfile), //Ruta del archivo donde se encontró el link.
                    });
                });
                resolve(arrayLinksConvert);
                return arrayLinksConvert;
            })
            .catch((err) => {
                reject(err);
            });
    });

// getLinksMdFiles(route).then(response => console.log('SE LEYÓ', response)).catch(err => console.error('NO SE LEYÓ'));

const getObjetsLinks = () =>
    getLinksMdFiles(route).then((arrayLinksConvert) => {
        return Promise.all(
            arrayLinksConvert.map((object) => {
                return axios
                    .get(object.href)
                    .then((result) => {
                        const objStatus =
                            result.status >= 200 && result.ststus <= 399 ? "Ok" : "Fail";
                        return {
                            href: object.href,
                            text: object.text,
                            file: object.fileName,
                            status: result.status,
                            message: "Ok",
                        };
                    })
                    .catch((error) => {
                        return {
                            href: object.href,
                            text: object.text,
                            file: object.fileName,
                            status: "",
                            message: "Fail",
                        };
                    });
            })
        );
    });

getObjetsLinks(route)
    .then((response) => console.log("RESPONDE", response))
    .catch((error) => console.log("NO RESPONDE", error));


module.exports = {
    getMdFiles,
    readMdFiles,
    getLinksMdFiles,
    getObjetsLinks,
};