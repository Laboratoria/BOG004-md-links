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
// const promesaPrueba = ms => new Promise(resolve => setTimeout(resolve, ms));
// wait(0).then(() => console.log(4));

promesaPrueba(process.argv[2])
    .then((result) => {
        console.log("RESULT" + result);
    })
    .catch((error) => {
        console.log("ERROOOOOOOOOOOOR", error);
    });


// console.log(process.argv[2]);
// promesaPrueba(process.argv[2]);

// module.exports = () => {
//   // ...
// };