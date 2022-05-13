#!/usr/bin/env node

const mdLinks = require('./index.js')
const argv = process.argv;


const readOptions = (option) => {
    const option = { validate: false, stats: false };
    if (argv[3] === '--validate' && argv[4] === '--stats') {
        option.validate === true && option.stats === true
    } else if (argv[3] === '--validate') {
        option.validate === true
    } else if (argv[3] === '--stats') {
        option.stats === true
    } else {
        option = {};
    }
    return option
}

//validar que los argv incluyan --validate o --stats
//si incluye validate hacer option.validate === true
//si incluye validate hacer option.stats === true

mdLinks(process.argv[2], readOptions(process)) // pasar options en vez de readOptions
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log("ERROR CLI", error);
    });