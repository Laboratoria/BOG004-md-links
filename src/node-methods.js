//---Metodos de Node---//
const fs = require('fs'); // file system
const path = require('path');
const { default: fetch } = require("node-fetch");
const { resolve } = require('path');
const { ok, rejects } = require('assert');

/**
 * 
 * @param {*} isPath 
 * @returns 
 */

//---Convierte la ruta de relativa a absoluta---//
const convertPathToAbsolut = (isPath) => {
    if (path.isAbsolute(isPath)) {
        return isPath;
    } else {
        return path.resolve(isPath).normalize();
    }
};

//---Verifica si la ruta existe---//
const validatePath = (isPath) => fs.existsSync(isPath);

//---Obtener Array de rutas .md---//
const getMdFiles = (allMdFiles, isPath) => {
    const isDirRes = fs.statSync(isPath).isDirectory(); //Verifica si la ruta es directorio (true or False)
    if (isDirRes) { //Si es Directorio
        const allDirFiles = fs.readdirSync(isPath); //Array con el contenido del directorio
        allDirFiles.forEach((file) => {
            const absolutPath = path.join(isPath, file);
            getMdFiles(allMdFiles, absolutPath)
        })
    } else {
        const isMdFiles = path.extname(isPath); //Extencion del archivo
        if (isMdFiles === '.md') { //Si es archivo .md
            allMdFiles.push(isPath);
        }
    }
    return allMdFiles;  //Retorna array de Path .md
};

//---Leer los archivos y extraer los links. [{links}] ---// 
const getLinks = (content, arrayMds) => new Promise((resolve) => {
    const expReg1 = /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg; //---links '[]()'---//
    const expReg2 = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg; //--- Url () ---//
    const expReg3 = /\[([\w\s\d]+)\]/g; //--- Nombre de Url [] ---//
    const fileContent = content;//--- Lee el archivo ---//
    const links = fileContent.match(expReg1);//--- trae todo lo que coincida con Regex de links ---//
    let arrayLinks;
    if (links) {
        arrayLinks = links.map((myLinks) => {
            const myhref = myLinks.match(expReg2).join().slice(1, -1);//--- coincidencias con Url () ---//
            const mytext = myLinks.match(expReg3).join().slice(1, -1);//--- Coincidencias con texto [] ---//
            return {
                href: myhref,
                text: mytext,
                fileName: arrayMds,//---Ruta del archivo donde se encontró el link---//
            };
        });
        resolve(arrayLinks)
    } else if (links === null) {
        resolve([]);
    }
});

//-----Leer contenido de un archivo------//
const readFileContent = (arrayMds) => new Promise((resolve, reject) => {
    const mdArray = [];
    arrayMds.forEach((element) => {
        fs.readFile(element, 'utf8', function (err, data) {
            if (err) {
                const errorMessage = '| ✧ Empty File ✧  |';
                console.log(errorMessage);
            } else {
                getLinks(data, element)
                    .then((resArray) => {
                        mdArray.push(resArray)
                        if (mdArray.length === arrayMds.length) {
                            resolve(mdArray.flat());
                        }
                    })
                }
        });
    })
});

// Peticion con Fetch
const httpPetition = (arrObjLinks) => {
    // console.log('Desde node', arrObjLinks);
    const arrPromise = arrObjLinks.map((obj) => fetch(obj.href)
        .then((res) => ({
            href: obj.href,
            text: obj.text,
            file: obj.fileName,
            status: res.status,
            ok: res.ok ? 'OK' : 'FAIL',
        }))
        .catch(() => ({
            href: obj.href,
            text: obj.text,
            file: obj.fileName,
            status: 404,
            ok: 'FAIL',
        })));
    return Promise.all(arrPromise);
};

module.exports = {
    convertPathToAbsolut,
    validatePath,
    getMdFiles,
    readFileContent,
    httpPetition,
}