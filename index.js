const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
// const fsPromises = require('fs').promises;
const promesaPrueba = route => new Promise((resolve, reject) => {
    resolve(
        fs.promises.readFile(route, 'utf-8')
        .then(result => {
            // console.log('RESULTADOO', result);
            return result
        })
        .catch(error => {
            console.log('ERROOOR', error);
        })
    )
});

// Use fsPromises.readFile() method
// to read the file

promesaPrueba(process.argv[2])
    .then((result) => {
        console.log("RESULT" + result);
    })
    .catch((error) => {
        console.log("ERROOOOOOOOOOOOR", error);
    });

// module.exports = () => {
//   // ...
// };