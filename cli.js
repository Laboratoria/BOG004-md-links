#!/usr/bin/env node

const mdLinks = require('./index.js')
const { getObjetsLinks, convertPath } = require('./functions')
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
    return options
}


mdLinks.mdLinks(argv[2], readOptions(argv))
    .then((res) => {
        if ((option.validate !== true) && (option.stats !== true)) {
            resolve(clc.yellow(res.map((e) => `${e.file} ${e.href} ${e.text}\n`).join('')));
        } else if ((option.validate === true) && (option.stats === true)) {
            resolve(clc.yellow(totalAndUnique(res) + broken(res)));
        } else if (option.stats === true) {
            resolve(clc.yellow(totalAndUnique(res)));
        } else {
            Promise.all(res).then(e => {
                resolve(clc.yellow(res.map((e) => `${e.file} ${e.href} ${e.message} ${e.status} ${e.text}\n`).join('')));
            });
        }
    })
    .catch((error) => {
        console.log(clc.red('Ruta no valida'));
    });