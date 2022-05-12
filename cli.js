#!/usr/bin/env node

const mdLinks = require('./index.js')


const listLinks = function(links) {
    links.forEach(link => console.log(link));
}

const readOptions = (option) => {
    const { links } = markdownLinkExtractor(result);
    switch (process.argv[3]) {
        case '--validate' || '--v':
            option = { validate: true, stats: true }
            break;
        case '--stats' || '--s':
            option = { stats: true }
            break;
        case '--stats' || '--s' && '--validate' || '--v':
            option = { validate: true }
            break;
        default:
            listLinks(links);
            break;
    }
};

mdLinks(process.argv[2], readOptions(process))
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log("ERROR CLI", error);
    });