const help = `                        
                                                      █▀▄▀█ █▀▀▄ █   █ █▄  █ █ ▄▀ █▀▀ 
                                                      █ ▀ █ █  █ █   █ █ ▀▄█ █▀▄  ▀▀█
                                                      ▀   ▀ ▀▀▀  ▀▀▀ ▀ ▀   ▀ ▀  ▀ ▀▀▀
                                                                 By Alossada
                                                                 
                 ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
                 ║                                                  SINTAXIS BASICA                                              ║
                 ╠═══════════════════╦═══════════════════════════════════════════════════════════════════════════════════════════╣
                 ║                   ║ Muestra los links econtrados con su respectivo texto y ruta.                              ║
                 ║   mdLinks <ruta>  ║ Ejemplo:                                                                                  ║
                 ║                   ║ mdLinks C:\Users\AngelicaLosada\Dropbox\PC\Documents\Proyectos\BOG004-md-links\pruebas-mds║  
                 ╚═══════════════════╩═══════════════════════════════════════════════════════════════════════════════════════════╝
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                               SINTAXIS CON OPCIONES                                                               ║
╠═══════════════════════════════════╦═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                   ║ Muestra los links econtrados con su respectivo texto, ruta, status y mensaje del status.                      ║
║     mdLinks <ruta> --validate     ║ Ejemplo:                                                                                                      ║
║                                   ║ mdLinks C:\Users\AngelicaLosada\Dropbox\PC\Documents\Proyectos\BOG004-md-links\pruebas-mds --validate         ║
╠═══════════════════════════════════╬═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                   ║ Muestra el total de links encontrados y la cantidad de links unicos.                                          ║
║      mdLinks <ruta> --stats       ║ Ejemplo:                                                                                                      ║
║                                   ║ mdLinks C:\Users\AngelicaLosada\Dropbox\PC\Documents\Proyectos\BOG004-md-links\pruebas-mds --stats            ║
╠═══════════════════════════════════╬═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                   ║ Muestra el total de links encontrados, la cantidad de links unicos y la cantidad de links rotos.              ║
║ mdLinks <ruta> --stats --validate ║ Ejemplo:                                                                                                      ║
║                                   ║ mdLinks C:\Users\AngelicaLosada\Dropbox\PC\Documents\Proyectos\BOG004-md-links\pruebas-mds --stats --validate ║
║                                   ║ mdLinks C:\Users\AngelicaLosada\Dropbox\PC\Documents\Proyectos\BOG004-md-links\pruebas-mds --validate --stats ║
╚═══════════════════════════════════╩═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
* NOTA: LA RUTA PUEDE SER RELATIVA O ABSOLUTA`;

module.exports = { help };