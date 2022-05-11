//Funcion MDLINKS
const {
  validatePath,
  throughDirectory,
  getObject,
  objectOfStats,
  createObjectWithvalidateUrl
} = require("./functions.js");

let response = {
  data: [],
  errors: '',
};
//funcion para validacion de links
function mdLinks(path = ' ', options = { validate: false
  
  , stats: ' ' }) { //validate: false (para que nos retorne el objeto (href,text,file))
  return new Promise((resolve, reject) => {
    const resultValidatePath = validatePath(path); //resultado de la ruta absoluta
    const mdFiles = throughDirectory(resultValidatePath);
    getObject(mdFiles)
      .then((resolve) => {
        response.data = resolve;
      })
      .then(() => {
        if (options?.validate === "--validate" || options?.validate === "--v") {
          createObjectWithvalidateUrl(response.data, options);
          //signo de ? valida si el objeto existe para que no se rompa el codigo
        } else if (
          (options?.validate !== "--validate" || options?.validate !== "--v") &&
          (options?.stats === "--stats" || options?.stats === "--s")
        ) {
          objectOfStats(response.data);
        } else {
          if (!response.errors) {
            console.log(response.data);
            resolve(response.data);
          } else {
            reject(response.errors);
          }
        }
      })
  });
}
module.exports = { mdLinks };
