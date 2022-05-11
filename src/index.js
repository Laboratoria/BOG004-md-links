// -----Importamos Modulos de Node----//
// eslint-disable-next-line import/extensions
  const {convertPathToAbsolut, validatePath, getMdFiles, readFileContent, httpPetition} = require('./node-methods');
// -----Funcion Mdlinks-----//
  const mdLinks = (path, option = {validate: false}) => new Promise((resolve, reject) => {  
//----Convertir la ruta a absoluta---//
  const pathArgAbsolut = convertPathToAbsolut(path);

// ----Validar si la ruta existe---//
  const validatePathRes = validatePath(pathArgAbsolut);

// --- declarar array vacio para guardar archivo .md desde getMdFiles---//
let arrayMdFile = [];

//---condicional, si la ruta es valida obtiene  archivos .md---//
if (validatePathRes === false) {
    reject('| ✿ INVALID PATH ✿ |');
} else if (validatePathRes) {
    const filesMd = getMdFiles(arrayMdFile, pathArgAbsolut); //---Funcion recursiva que revisa el directorio--//
    if (filesMd.length === 0) { //---Si el directorio es vacio---//
      reject('| ✿ EMPTY DIRECTORY ✿ |');
    } else {
      readFileContent(arrayMdFile)
        .then((objectLinks) => {
          if (objectLinks.length === 0) { //---Si el documento no tiene links---//
            reject('|   ✿ EMPTY FILE ✿   |');
          } else {
            if (option.validate === true) {
              httpPetition(objectLinks).then(response => {
                resolve(response)
              })
            } else {
              resolve(objectLinks);
            }
          }
        })
    }
  }
});


module.exports = mdLinks;