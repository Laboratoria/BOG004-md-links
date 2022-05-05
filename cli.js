const { rejects } = require("assert");
const fs = require("fs");
const markdownLinkExtractor = require('markdown-link-extractor');
const axios = require('axios');
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
const listLinks = function(links) {
    links.forEach(link => console.log(link));
}

//Opción --validate
readingFile(process.argv[2])
    .then((result) => {
        const { links } = markdownLinkExtractor(result);

        switch (process.argv[3]) {
            case '--validate':
                links.forEach(link => doHTTPRequest(process.argv[2], link));
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




// node index.js "./files-md/example1.md" --validate