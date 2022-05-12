#!/usr/bin/env node

const path = process.argv[2];
const options = process.argv;
const {mdLinks} = require ('./index.js')

const validate = options.includes("--v") || options.includes("--validate") ? true : false;
const stats = options.includes("--s") || options.includes("--stats") ? true: false;

mdLinks(path, { validate, stats })
.then((resolve) => {
    if(stats || (validate && stats)) console.table(resolve)
    else console.log(resolve)
}) 