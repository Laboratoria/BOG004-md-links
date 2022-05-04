


//Metodo extname se utiliza para obtener la extension de la ruta 
const extName = path.extname('prueba.md')
console.log('extension' , extName)
//metodo dirname obtiene la ruta absoluta 
const dirName = path.dirname(__dirname); 
const fileName = path.dirname(__filename);
console.log('directory-name :', dirName, 'file-name :', fileName);

// captura de argumentos desde la terminal  
console.log('number of arguments is '+ args.length + ' index 2 ' +args[2]);





// captura de la ruta
// const terminalPath = args[2]

// //resuelve la ruta absoluta y normaliza
// const terminalPathAbsolute = path.resolve(terminalPath).normalize();
// console.log('ruta absoluta', terminalPathAbsolute);

// //Verifica si es un directorio o un archivo (si es directorio da true, si no es false)
// fs.stat(terminalPathAbsolute , (err, stats) => {
//   if (err) throw err;  
//   const directory = stats.isDirectory(terminalPathAbsolute);
//     console.log("ES UN DIRECTORIO", directory );
//});