const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const http = require("https");

/**
 * Valida si el Path Existe
 * @param {*} originPath
 * @returns true si el path existe false no existe
 */
const pathExists = function (originPath) {
  const exists = fs.existsSync(originPath);
  console.log(`pathExists(${originPath}) ${exists}`);
  return exists;
};

/**
 * Valida si un originPath es relativo o absoluto
 * @param {string} originPath
 * @returns true si es relativo, falso si es absoluto
 */
const isRelative = function (originPath) {
  const relative = !path.isAbsolute(originPath);
  console.log(`isRelative(${originPath}) ${relative}`);
  return relative;
};

/**
 * Convierte una ruta o un path relativo en absoluto
 * @param {*} relativePath
 * @returns
 */
const convertToAbsolut = function (relativePath) {
  const absolutePath = path.resolve(relativePath);
  console.log(`convertToAbsolut(${relativePath}) ${absolutePath}`);
  return absolutePath;
};
/**
 * Valida si path es un directorio
 * @param {*} originPath
 * @returns
 */
const isFolder = function (originPath) {
  const folder = fs.lstatSync(originPath).isDirectory();
  console.log(`isFolder(${originPath}) ${folder}`);
  return folder;
};
/**
 * Lista el contenido de una carpeta
 * @param {*} originPath
 * @returns un arreglo
 */
const listFolder = function (originPath) {
  const list = fs.readdirSync(originPath);
  console.log(`listFolder(${originPath}) ${list}`);
  return list;
};

/**
 * Valida la extension del archivo
 * @param {*} originPath
 * @returns true para .md y falso en otro caso
 */
const isMarkdownFile = function (originPath) {
  const isMarkdown = path.extname(originPath) === ".md";
  console.log(`isMarkdownFile(${originPath}) ${isMarkdown}`);
  return isMarkdown;
};

/**
 * Abre el archivo
 * @param {*} originPath
 * @returns una promesa del contenido del archivo
 */
const readMarkdownFile = function (originPath) {
  return fsPromises
    .open(originPath, "r") // Abre el archivo en modo lectura
    .then((markDownFileHandle) => {      
      console.log(`readMarkdownFile(${originPath})`);
      return markDownFileHandle.readFile({ encoding: "utf8" }); //Lee el contenido del archivo
    });
};
/**
 * Busca los links en una cadena de texto en formato markdown
 * @param {*} markDown
 * @returns un arreglo de objetos con text y href
 */
const searchLinks = function (markDown) {
  const regExt = /\[(.*)\]\((.*)\)/gm;
  const matches = markDown.matchAll(regExt);
  const matchArray = [];
  for (let match of matches) {
    matchArray.push({
      text: match[1],
      href: match[2],
    });
  }
  return matchArray;
};
/**
 * Prueba si una URL es valida ejecutando un request
 * @param {*} url
 * @returns una promesa que resuelve el codigo http de la respuesta
 */
const testLinkByRequests = function (url) {
  return new Promise((resolve, reject) => {
    try{
      http.get(url, (res) => {
        res.on('data', (chunk) => {});
        res.on("end", () => {        
          resolve(res.statusCode);
        });
      })
      .on("error", (e) => {
        console.log(`Got error: ${e.message}`);
        resolve(undefined);
      });
    } catch(error){
      console.log(`Got error: ${error.message}`);
      resolve(undefined);
    }    
  });  
};

module.exports = {
  pathExists,
  isRelative,
  convertToAbsolut,
  isFolder,
  listFolder,
  isMarkdownFile,
  readMarkdownFile,
  searchLinks,
  testLinkByRequests,
};
