const {pathExists, isRelative, convertToAbsolut, isFolder, listFolder, isMarkdownFile, readMarkdownFile, searchLinks, testLinkByRequests
} = require('./functions');
/**
 * Funcion retorna una promesa que resuelve un array de object donde cada 
 * objeto representa un link
 * @param {*} path 
 * @param {*} options 
 * @returns una promesa
 */

function mdLinks(path, options){
  console.log("mdLinks("+path+", "+options+")");
  return new Promise(
    (resolve, reject) => {
      // path existe?
      if(pathExists(path)){
        // Es relativo?
        if(isRelative(path)){
          // convertir a ruta absoluta
          path = convertToAbsolut(path); 
        }
        // Es directorio ?
        if(isFolder(path)){
          // Listar contenido
          let subFolders = listFolder(path);// Aqui se guarda el contenido
          // map: subfolder(string) -> mdLinks: Promise<[]>
          // convierte el arreglo de subfolders en promesas devueltas por mdlinks
          // 1. path + "\\" + subFolder es el nombre del directorio concatenado con el nombre del contenido (uno del listado)
          // 2. Llama a mdLinks, mdLinks devuelve una promesa de un arreglo (Promise<[]>)
          // 3. subMdLinks es un arreglo, de promesas de arreglo [Promise<[]>, Promise<[]>, Promise<[]>..]
          let subMdLinks = subFolders.map(subFolder => mdLinks(path + "\\" + subFolder, options));//recursividad 
          // 4. Se resuelven todas las promesas (allSettled porque alguna puede fallar y las necesitamos todas)
          Promise.allSettled(subMdLinks)
            .then(
              (results)=>{
                let arrayLinks = [];    
                //Recorrer los resultados            
                results.forEach(
                  (result)=>{
                    //Si el resutado es ok, concatenamos el arreglo a arrayLinks
                    if(result.status === "fulfilled"){
                      arrayLinks = arrayLinks.concat(result.value);                      
                    } else {
                      //Si falla, imprimimos el error y no concatenamos nada
                      console.log(result.reason);
                    }                                 
                  }
                );                
                //Resolvemos con el arreglo concatenado
                resolve(arrayLinks);
              }
            );
        } else { // Es directorio? si no
          // Es .md ?
          if (isMarkdownFile(path)){
             // Abrir archivo
             readMarkdownFile(path)
             .then(
               (content) => {//Content es el contenido del archivo en un string
                let arrayLinks = [];
                // Buscar links
                let links = searchLinks(content);
                // Por cada link 
                for (var i=0 ; i<links.length; i++){
                  // validate?
                  if(options.validate){                    
                    // Como la funcion que evalua cada link devuelve una promesa
                    // Llenamos el arreglo con esas promesas
                    arrayLinks.push(
                      new Promise(
                        (resolve1, reject1)=>{
                          const link = links[i];
                          // Validar link
                          testLinkByRequests(link.href)
                            .then(
                              (resultCode)=>{// resultCode es el codigo http de la respuesta
                                // url, texto, nombre del archivo, codigo de la ruta
                                resolve1( {
                                  href: link.href,
                                  text: link.text,
                                  file: path,
                                  status: resultCode,
                                  ok: resultCode >= 200 && resultCode <= 299 ? 'ok' : 'fail' // codigo de status
                                });                                
                              }
                            );                        
                        }
                      )
                    );                      
                  } else{// validate? si no    
                    // url, texto y nombre del archivo                
                    arrayLinks.push({
                      href: links[i].href,
                      text: links[i].text,
                      file: path
                    });
                  }                
                }
                //Con el arreglo lleno, retorno los valores
                if(options.validate){      
                  //Resuelvo todas las promesas con las validaciones de los links            
                  Promise.allSettled(arrayLinks)
                    .then(
                      (results)=>{                        
                        // allSettled retorna un objeto con el status y el value, value es la verdadera respuesta
                        resolve(
                          //El map es para retornar solo los objetos de la validacion: result.value
                          results.map(
                          (result)=>result.value
                        ));
                      }
                    );
                }
                else{
                  //resuelve con el arreglo de los links
                  resolve(arrayLinks);
                }              
               }
             );
          } else {
            reject(path + ": No es un archivo de markdown!");
          }          
        }
      } else {
        reject(path + ": Error, archivo no encontrado");
      }  
    }
  );

}

module.exports =  {mdLinks}