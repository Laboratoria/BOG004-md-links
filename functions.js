//modulos utilizados de node
const fs = require("fs");
const path = require("path");
const https = require("https");

//Convierte ruta relativa en absoluta
function validatePath(pathUser) {
  if (path.isAbsolute(pathUser)) {
    //isAbsolute() valida si la rutaingresada es absoluta
    return pathUser;
  }
  if (!fs.existsSync(pathUser)) {
    console.log("❌ Ruta ingresada no existe");
    process.exit();
  } else {
    const pathAbsolute = path.resolve(pathUser).normalize(); //mediante el metodo resolve se convierte absoluta y normalize la estandariza
    return pathAbsolute;
  }
}
//funcion que recorre los directorios en busca de archivos md y los empuja a un array
function throughDirectory(pathUser) {
  const backslash =
    process.platform === "win32" || process.platform === "win64" ? "\\" : "/"; //nos coloca los backlash dependiendo del sistema operativo
  let filesPath = [];
  if (fs.statSync(pathUser).isFile() && path.extname(pathUser) === ".md") {
    filesPath.push(pathUser);
  } else {
    if (fs.statSync(pathUser).isDirectory()) {
      const directory = pathUser;
      let contentDirectory = fs.readdirSync(directory); //ingresa al directorio y lo lee
      contentDirectory.forEach((elem) => {
        throughDirectory(pathUser + backslash + elem).forEach((elem) => {
          filesPath.push(elem);
        });
      });
    }
    if (filesPath.length === 0) {
      console.log("No se encontraron archivos md:(");
    }
  }
  return filesPath;
}

//promesa para leer archivos en el array
const readMd = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (error, data) => {
      if (error) return reject(error);
      else {
        resolve({
          //Si se resuelve la promesa captura la informaciòn del objeto
          route: file,
          fileContent: data,
        });
      }
    });
  });
};

const getObject = (mdArray) => {
const links = []; //array para guardar los links
const paths = []; //array que guarda las rutas
let object = []; //objecto final

return  Promise.all(mdArray.map(readMd)) //recorre los md
    .then((data) => {
      const regExp = /!*\[(.+?)\]\((.+?)\)/gi;
      data.forEach((item) => {
        const linkFind = item.fileContent.match(regExp); //compara los archivos que estamos buscando con los simbolos en la expresion
        if (linkFind) {
          linkFind.forEach((elem) => {
            links.push(elem);
            paths.push(item.route);
          });
        }
      });
      //se construye el objecto
      object = links.map((linkAll) => {
        let index = links.indexOf(linkAll); //se obtiene la posicion de los link mediante el indexOf()
        const cutLink = linkAll.split("]("); //separar donde encuentre "]("
        const text = cutLink[0].slice(1); //corta del 0 al 1 corta el signo que abre
        const href = cutLink[1].slice(0, -1);
        return {
          href, //enlace
          text: text.substring(0, 50), //caracteres hasta 50
          file: paths[index], //ruta
        };
      });
      return object;
    })
    .catch((error) =>
      console.log("❌La ruta del archivo o carpeta es obligatorio", error)
    );
  }
//Contiene una promesa que por medio del HTTPS valida los links
function validateUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => resolve(res)).on("error", (e) => reject(false));
  });
}

function createObjectWithvalidateUrl(data, options) {
  let validateUrlList = data.map((object) =>
    validateUrl(object.href)
      .then((res) => {
        object.status = res.statusCode;
        object.ok =
          res.statusCode >= 200 && res.statusCode <= 399 ? "ok" : "fail";
      })
      .catch((error) => {
        object.status = error.code;
        object.ok = "fail";
      })
  );
  return Promise.all(validateUrlList)
    .then(() => {
      if (options.stats) {
        const contentDataHref = getTotalLinks(data);
        const filterDataStats = data.filter((object) => object.ok === "fail");
        const unique = getUniqueLinks(data);
        result = {
          Total: contentDataHref.length,
          Unique: unique.length,
          Broken: filterDataStats.length,
        };
        return result;
      } else {
        // console.log("Links desde promesa:", data);
        return data;
      }
    })
    .catch((error) => console.log("❌ERROR", error));
}
function objectOfStats(data) {
  const contentDataHref = getTotalLinks(data);
  const unique = getUniqueLinks(data);
  result = {
    Total: contentDataHref.length,
    Unique: unique.length,
  };
  // console.table(result);
  return result
}

function getUniqueLinks(data) {
  return [...new Set(data.map((object) => object.href))];
}
function getTotalLinks(data) {
  return data.filter((object) => object.hasOwnProperty("href"));
}

module.exports = {
  validatePath,
  throughDirectory,
  getObject,
  objectOfStats,
  createObjectWithvalidateUrl,
};
