#!/usr/bin/env node

const mdLinks = require('./index.js')
const argv = process.argv;
var clc = require('cli-color');

const readOptions = (option) => {
    let options = { validate: false, stats: false };
    if (option.length > 3) {
        if (option[3] === '--validate' && option[4] === '--stats' || option[3] === '--stats' && option[4] === '--validate') {
            options.validate = true;
            options.stats = true;
        } else if (option[3] === '--validate') {
            options.validate = true;
        } else if (option[3] === '--stats') {
            options.stats = true;
        } else {
            options = {};
        }
    }
    // console.log('SOY EL OBJ', options);
    return options
}

//validar que los argv incluyan --validate o --stats
//si incluye validate hacer option.validate === true
//si incluye validate hacer option.stats === true

// console.log('MDLINKKKKK CLI', mdLinks.mdLinks);
// readOptions(argv);

mdLinks.mdLinks(argv[2], readOptions(argv))
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(clc.red('Ruta no valida'));
    });