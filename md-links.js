// const mdLinks = (args) => {
//   console.log("llego a md", args);

//   module.exports = { mdLinks };
// };
//modulos utilizados de node
const fs = require("fs");
const path = require("path");
const https = require("https");
const process = require("process");
const [, , route] = process.argv;

//Convierte ruta relativa en absoluta
function validatePath(pathUser) {
  if (path.isAbsolute(pathUser)) {
    return pathUser;
  } else {
    const pathAbsolute = path.resolve(pathUser).normalize();
    return pathAbsolute;
  }
}
//se guarda el resultado de la funcion validatePath en una variable
const resultVP = validatePath(route);

//funcion que recorre los directorios en busca de archivos md y los empuja a un array
function routePath(pathUser) {
  const backslash = process.platform === "win32" || process.platform === "win64" ? "\\" : "/";
  let filesPath = []; 
  if (fs.statSync(pathUser).isFile() && path.extname(pathUser) === ".md") {
    filesPath.push(pathUser);
  } else {
    if (fs.statSync(pathUser).isDirectory()) {
      const directory = pathUser;
      let contentDirectory = fs.readdirSync(directory);
      contentDirectory.forEach((elem) => {
        routePath(pathUser + backslash + elem).forEach((elem) => {
          filesPath.push(elem);
        });
      });
    }
  }
  return filesPath;
}

//Resultado de la funcion recursiva, y le doy como argumento mi ruta absoluta
const mdFiles = routePath(resultVP);


//promesa para leer archivos en el array
const links = []; //array para guardar los links
const paths = []; //array que guarda las rutas
let object = []; //objecto final

const readMd = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error,data) => {
        if (error) return reject(error); 
        else {
          resolve ({
           //Si se resuelve la promesa captura la informaciòn del objeto 
              route : file,
              fileContent : data
          })
      };
  })
})
}
const getObject = Promise.all(mdFiles.map(readMd)) //recorre los md 
.then((data) => { 
  const regExp = /!*\[(.+?)\]\((.+?)\)/gi;
  data.forEach(item => {
  const linkFind = [...item.fileContent.toString().match(regExp)]; //compara los archivos que estamos buscando con los simbolos en la expresion
  linkFind.forEach(elem => {
links.push(elem);
paths.push(item.route)

  });
})


object = links.map((linkAll) => {
  let index = links.indexOf(linkAll);
  const cutLink = linkAll.split("](");
  const text = cutLink[0].slice(1);
  const href = cutLink[1].slice(0, -1);
  return {
    href,
    text : text.substring(0,50),
    file : paths[index]
    }
})

return object
})
.catch(error => reject(error))

getObject.then(response => {
  console.log("HOLAAA SOY UN OBJECTO",object)
})