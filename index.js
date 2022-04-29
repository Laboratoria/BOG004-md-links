const path = require('path');
const fs = require('fs');

//Convirtiendo ruta de relativa a absoluta
function validatePath(pathUser) {
    if (path.isAbsolute(pathUser)) {
        return pathUser
    } else {
        const pathAbsolute = path.resolve(pathUser).normalize();
        return pathAbsolute
    }
}

//Función de recursividad para validar si la ruta que ingreso el usuario es directorio o archivo y si es md
function doFilesRequest(pathUser) {
    let filesPath = [];
    if (fs.statSync(pathUser).isFile() && path.extname(pathUser) === '.md') {
        filesPath.push(pathUser);
    } else {
        if (fs.statSync(pathUser).isDirectory()) {
            const directory = pathUser;
            let contentDirectory = fs.readdirSync(directory)
            contentDirectory.forEach(elem => {
                doFilesRequest(pathUser + '\\' + elem).forEach(elem => {
                        filesPath.push(elem);
                    })
                    //Aquí pasa al primer if donde se pregunta si es .md o no
            })
        }
    }
    return filesPath;
}

console.log(doFilesRequest("C:\\Users\\yduqu\\OneDrive\\Escritorio\\Proyectos Laboratoria\\md-links"));