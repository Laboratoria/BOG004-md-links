//modulos utilizados de node
const process = require("process");
const userPath = process.argv[2];
let validateConsole = process.argv[3];

const {
  validatePath,
  routePath,
  validateUrl,
  getObject,
} = require("./functions.js");

let response = {
  data: [],
  errors: " ",
};

function mdLinks(path = " ", options = { validate: false }) {
  const { validate } = options;
  return new Promise((resolve, reject) => {
    const resultVP = validatePath(userPath);
    const mdFiles = routePath(resultVP);
    getObject(mdFiles)
      .then((resolve) => {
        response.data = resolve;
      })
      .then(() => {
        if (validate === "--validate") {
          let validateUrlList = response.data.map((objeto) =>
            validateUrl(objeto.href)
              .then((res) => {
                objeto.status = res.statusCode;
                objeto.ok =
                  res.statusCode >= 200 && res.statusCode <= 399
                    ? "ok"
                    : "fail";
              })
              .catch((error) => {
                objeto.status = error.code;
                objeto.ok = "fail";
              })
          );
          Promise.all(validateUrlList).then(() => {
            resolve(response.data);
          });
        } else {
          if (!response.errors) {
            resolve(response.data);
          } else {
            reject(response.errors);
          }
        }
      });
  });
}
mdLinks(userPath, { validate: validateConsole })
  .then((elem) => {
    console.log(elem);
  })
  .catch(console.error);
