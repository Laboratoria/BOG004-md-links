#!/usr/bin/env node

const path = process.argv[2];
const options = process.argv;
const {mdLinks} = require ('./index.js')

const validate = options.includes("--v") || options.includes("--validate") ? "--v" : "";
const stats = options.includes("--s") || options.includes("--stats") ? "--s" : "";

mdLinks(path, { validate, stats })