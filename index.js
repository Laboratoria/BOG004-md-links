const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

/**
 * Valida si el Path Existe
 * @param {*} originPath 
 * @returns true si el path existe false no existe
 */
const pathExists = function(originPath){  
  const exists = fs.existsSync(originPath);
  console.log(`pathExists(${originPath}) ${exists}`);
  return exists;
}

/**
 * Valida si un originPath es relativo o absoluto
 * @param {string} originPath 
 * @returns true si es relativo, falso si es absoluto
 */
 const isRelative = function(originPath){
  const relative = !path.isAbsolute(originPath);
  console.log(`isRelative(${originPath}) ${relative}`);
  return relative;
}

/**
 * Convierte una ruta o un path relativo en absoluto
 * @param {*} relativePath 
 * @returns 
 */
 const convertToAbsolut = function(relativePath){
  const absolutePath = path.resolve(relativePath);
  console.log(`convertToAbsolut(${relativePath}) ${absolutePath}`);
  return absolutePath;
}
/**
 * Valida si path es un directorio
 * @param {*} originPath 
 * @returns 
 */
const isFolder = function(originPath){
  const folder = fs.lstatSync(originPath).isDirectory();
  console.log(`isFolder(${originPath}) ${folder}`);
  return folder;
}
/**
 * Lista el contenido de una carpeta 
 * @param {*} originPath 
 * @returns un arreglo
 */
const listFolder = function(originPath){
  const list = fs.readdirSync(originPath);
  console.log(`listFolder(${originPath}) ${list}`);
  return list;
}

/**
 * Valida la extension del archivo
 * @param {*} originPath 
 * @returns true para .md y falso en otro caso
 */
const isMarkdownFile = function(originPath){
  const isMarkdown = path.extname(originPath) === '.md';  
  console.log(`isMarkdownFile(${originPath}) ${isMarkdown}`);
  return isMarkdown;
}


module.exports = {
  pathExists, isRelative, convertToAbsolut, isFolder,listFolder, isMarkdownFile, readMarkdownFile
};