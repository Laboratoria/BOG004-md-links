const { options } = require("markdown-it/lib/presets/default");

const mdLinks = (pathUser, options) => {
    return new Promise((resolve, reject) => {
        if (!existsPath(pathUser)) {
            reject('The path entered is not valid.')
        } else {
            if (!options.validate) {
                const validDoLinksRequest = meth
            }
        }
    })
}