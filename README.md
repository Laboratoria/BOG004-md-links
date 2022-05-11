# Markdown Links 

## Índice 📋

* [1. Características de la libreria](#1-Características-de-la-libreria)
* [2. Diagrama de Flujo](#2-Diagrama-de-Flujo)
* [3. Instalación](#3-Instalación)
* [4. Modo de uso](#4-Modo-de-uso)
* [5. Opciones disponibles](#5-Opciones-disponibles)
* [6. Autor](#6-Autor)

***

## 1. Características de la libreria 📃

 Md-links es una libreria que te ayuda a encontrar links válidos y rotos además de las 
 estadísticas de estos en archivos de extensión md.

## 2. Diagrama de Flujo

Diseño del diagrama de flujo, para llevar un orden en la ejecución del proyecto.

## 3. Instalación🔧

Tu puedes instalar esta libreria ingresando este comando en tu terminal 

`$ npm install md-links-gis`

## 4. Modo de uso💻

Una vez instalada la libreria, debes ejecutarlo en la terminal 

`mdlinks (path-to-file) options`

*NOTA: TU RUTA PUEDE SER RELATIVA O ABSOLUTA*

## 5. Opciones disponibles 📓

Si ingresas la ruta sin opciones obtendras como resultado lo siguiente: 

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link.
* `file`: Ruta del archivo donde se encontró el link.

Ejemplo: 

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

Con `--validate` o `--v` : Nos muestra las validaciones de los links

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link.
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

Ejemplo: 

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Con `--stats` o `--s` : Nos muestra una estadística básica de links.

* `Total`: Links totales.
* `Unique`: Links unicos.

Ejemplo:

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```
Si combinamos ambos `--validate` `--stats` o `--v` `--s` : Nos muestra las estadisticas y le agrega los links rotos. 

* `Total`: Links totales.
* `Unique`: Links unicos.
* `Broken`: Links rotos.

Ejemplo:

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
## 6. Autor ♥
`Gisbel Contreras`
* [Git Hub](https://github.com/Gisbelc/BOG004-md-links)




