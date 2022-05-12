//Funcion MDLINKS
const {
  validatePath,
  throughDirectory,
  getObject,
  objectOfStats,
  createObjectWithvalidateUrl,
} = require("./functions.js");

let response = {
  data: [],
  errors: "",
};
//funcion para validacion de links
function mdLinks(path = " ", options = { validate: false, stats: false }) {
  //validate: false (para que nos retorne el objeto (href,text,file))
  return new Promise((resolve, reject) => {
    const resultValidatePath = validatePath(path); //resultado de la ruta absoluta
    const mdFiles = throughDirectory(resultValidatePath); //retorna array de md
    getObject(mdFiles)
      .then((resolve) => {
        response.data = resolve;
      })
      .then(() => {
        if (options.validate) {
          resolve(
            createObjectWithvalidateUrl(response.data, options).then(
              (data) => data)
          );
        } else if (options.stats) {
          resolve(objectOfStats(response.data));
        } else {
          if (!response.errors) {
            // console.log(response.data);

            resolve(response.data);
          } else {
            reject(response.errors);
          }
        }
      });
  });
}
module.exports = { mdLinks };
