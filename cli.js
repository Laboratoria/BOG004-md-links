#!/usr/bin/env node

const {mdLinks
} = require('./md-links');

const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

const path = myArgs[0];

if(path == undefined || path.length === 0){    
    process.stderr.write('El path no puede ser vacio');
    process.exit(1);
}

let stats = false;
let validate = false;

//[0]
//[path, --stats] -> debo asumir quer validate = false
//[path, --stats --validate] -> validate true
//[path, --validate --stats] -> validate true
//[path, --validate] -> validate true

for(var i=1; i < myArgs.length; i++){
    switch(myArgs[i]){
        case "--stats":{
            stats = true;
        }break;
        case "--validate":{
            validate = true;
        }break;
        default:
            console.log(myArgs[i]+": opcion invalida");
    }
}

mdLinks(path, {validate})
 .then(
     (links)=>{
         if(stats){
             //Contar agrupar e imprimir las estadisticas
             console.log(`Total: ${links.length}`);
             //Quitar los duplicados (comparando x href)
             let hrefs = links.map((ele) => ele.href);//recorriendo 
             let setHrefs = Array.from(new Set(hrefs));// Queda en valores unicos y no repetidos             //Contar los ok
             console.log(`Unique: ${setHrefs.length}`);
             if(validate){
                 //filtrar y Contar los no fail o rotos
                 const linksFil = links.filter(item => item.ok === 'fail');
                 console.log(`Broken: ${linksFil.length}`);
             }
         } else {
             //Pinta normal el arreglo
             links.forEach(link => {
                 if(validate){
                    console.log(`${link.file} ${link.href} ${link.ok} ${link.status} ${link.text}`);
                 } else {
                    console.log(`${link.file} ${link.href} ${link.text}`);
                 }
                 
             });
         }
         process.exit(0);
     }
 )
 .catch(
     (error)=>{
        process.stderr.write(error);
        process.exit(1);
     }
 );