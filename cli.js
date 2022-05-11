#!/usr/bin/env node

const { rejects } = require("assert");
const fs = require("fs");
const markdownLinkExtractor = require('markdown-link-extractor');
const axios = require('axios');
const objectWhitValidateLinks = require('./functions.js');
const { resolve } = require("path");

//Extrayendo URL´s del archivo 
const doHTTPRequest = function checkURL(file, url) {
    // Make a HTTP request for a given URL
    axios.get(url)
        .then(function(response) {
            console.log(file, url, response.status, response.statusText);
            return 'axios then'
        })
        .catch(function(error) {
            console.log(file, url, error.code);
            return 'axios catch'
        })
}

const doStatsRequest = (arrayObject) => {
    // Make a stats request for a given URL
    axios.get(arrayObject)
        .then(() => {
            const totalLinks = url.length;
            const uniqueLinks = new Set(arraylinks.map((element) => element.href));
            console.table({
                Total: totalLinks,
                Unique: uniqueLinks.size,
            })
        })
};

const validateAndStats = (arrayObject, totalUnique) => {
    let broken = arrayObject.filter((e) => e.status === 'Fail').length;
    //Desestructura el objeto totalUnique para crear uno nuevo que incluya broken 
    return {...totalUnique, broken: broken };
}

//Leyendo archivo
const readingFile = route => new Promise((resolve, reject) => {
    //resolve(
    fs.promises.readFile(route, 'utf-8')
        .then(result => {
            // console.log(result)
            // si la longitud de result es 0, entonces resolve links no encontrados
            //  si no, resolvemos result
            resolve(result)
            if (result.length === 0) {
                console.log('Not Found');
            }
        })
        .catch(error => {
            console.log('ERROOOR', error);
            reject('readingfile catch')

        })
});

//Recorriendo link
const listLinks = (links) => {
    links.forEach(link => console.log(link));
}

//Opción --validate
readingFile(process.argv[2])
    .then((result) => {
        const { links } = markdownLinkExtractor(result);

        switch (process.argv[3]) {
            case '--validate' || '--v':
                links.forEach(link => doHTTPRequest(process.argv[2], link));
                break;
            case '--stats' || '--s':
                links.forEach(link => doStatsRequest(process.argv[2], link))
                break;
            case '--stats' || '--s' && '--validate' || '--v':
                links.forEach(link => validateAndStats(process.argv[2], link))
                break;
            default:
                listLinks(links);
                break;
        }
    })
    .catch((error) => {
        console.log("ERROOOOOOOOOOOOR", error);
    });

//Opción --stats

// Promise.all(objectWhitValidateLinks)
//     .then((result) => {
//         if (options.stats === "--stats" || options.stats === "--s") {
//             const contentDataHref = getTotalLinks(data);
//             const filterDataStats = data.filter((object) => object.ok === "fail");
//             const unique = getUniqueLinks(data);
//             result = {
//                 Total: contentDataHref.length,
//                 Unique: unique.length,
//                 Broken: filterDataStats.length,
//             };
//             console.table(result);
//         } else {
//             console.log("Links desde promesa: ", data);
//         }
//     })
//     .catch((error) => console.log("ERROR", error))


// function objectOfStats(data) {
//     const contentDataHref = getTotalLinks(data);
//     const unique = getUniqueLinks(data);
//     result = {
//         Total: contentDataHref.length,
//         Unique: unique.length,
//     };
//     console.table(result);
// }

// function getUniqueLinks(data) {

//     return [...new Set(data.map((object) => object.href))]
// }

// function getTotalLinks(data) {
//     return data.filter((object) => object.hasOwnProperty("href"));
// }


// node cli "./files-md/example1.md" --validate