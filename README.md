# Markdown Links

## Índice

- [Markdown Links](#markdown-links)
  - [Índice](#índice)
  - [Preámbulo](#preámbulo)
  - [Planificación.](#planificación)
  - [Documentación técnica](#documentación-técnica)
    - [Instalación](#instalación)
      - [Libreria global](#libreria-global)
      - [Dependencia en un proyecto](#dependencia-en-un-proyecto)

***

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)


## Planificación.

 ![Diagrama de Flujo](Img/Diagrama%20de%20Flujo%20de%20MDLinks%20version2.png)

Voy a implementar la metodolgia TDD(test driven development), diseñando primero los test unitarios para evaluar calidad, eficiencia en las funciones que se crearan en el proyecto. Asi se podra hacer pruebas a los cambios y asegurarse que los nuevos cambios se introduzcan sin defecto, saber como utilizar el codigo y detectar errores en el mismo, de ser necesario realizar los cambios pertinentes a las funciones.

## Documentación técnica

mdlinks es una libreria que te permitira escontrar vinculos en tus archivos de markdown.

### Instalación

md-links se puede instalar como una herramienta global o puede incluirse como libreria en tu proyecto javascript

#### Libreria global

```
npm install -g natarivera/md-links
```

Para buscar en un directorio:

```
md-links ./ruta_al_directorio
```

Para buscar en un archivo especifico

```
md-links ./ruta_al_directorio/ejemplo.md
```

Argumentos

| Argumento   | Descripción                                                                           | Ejemplo    |
| ----------- | ------------------------------------------------------------------------------------  |----------- |
| --validate  | Indica que se quiere verificar si el link es valido o no                              | `md-links ./ --validate`|
| --stats     | No muestra el listado de links sino que muestra una tabla con las estadisticas        |  `md-links ./ --stats`|

Ejemplos

Llamado con solo el path, en este caso solo lista el archivo, URL y texto del vinculo.

```
md-links README.md
C:\Users\README.md https://nodejs.org/es/ Node.js
C:\Users\README.md https://developers.google.com/v8/ motor de JavaScript V8 de Chrome
C:\Users\README.md Img/Diagrama%20de%20Flujo%20de%20MDLinks%20version2.png Diagrama de Flujo
```
Llamado con la opcion validate, en este caso devuelve path, url, indica si fue exitoso o fallo status http y el texto del vinculo


```
$ md-links README.md --validate
C:\Users\README.md https://nodejs.org/es/ ok 200 Node.js
C:\Users\README.md https://developers.google.com/v8/ fail 301 motor de JavaScript V8 de Chrome
C:\Users\README.md Img/Diagrama%20de%20Flujo%20de%20MDLinks%20version2.png fail undefined Diagrama de Flujo
```

Llamado con la opcion stats, en este caso devuelve el total de los links y cuantos de esos links son unicos.

```
$ md-links README.md --stats
Total: 3
Unique: 3

```

llamado con la opcion stats y validate, en este caso devuelve el total de los links, cuantos son unicos y cuales son estan en rotos.

```
$ md-links README.md --stats --validate
Total: 3
Unique: 3
Broken: 2

```

#### Dependencia en un proyecto 

```
npm install -s natarivera/md-links
```

Para buscar en un directorio:

```
const {mdLinks} = require('md-links');
mdLinks('./ruta_al_directorio') 
```

Para buscar en un archivo especifico

```
const {mdLinks} = require('md-links');
mdLinks('./ruta_al_directorio/ejemplo.md') 
```

Parametros

| Argumento   | Descripción                                                                           | Ejemplo    |
| ----------- | ------------------------------------------------------------------------------------  |----------- |
| path  | Es el path al directorio o al archivo                             | `./path_al_directorio`|
| options     | Un objeto con las opciones disponibles (actualmente solo validate)         |  `{validate:true}`|

Valor de retorno

```
Promise<[]>: Un arreglo con objetos de acuerdo a las opciones (ver ejemplos)
```

Validate = `false`

```
mdLinks('./README.md')
 .then(
     (links)=>{
         console.log(table);
         //Cada link tiene los siguientes atributos: file, href, text
     }
 );
```

Validate = `true`

```
mdLinks('./README.md', {validate:true})
 .then(
     (links)=>{
         console.log(table);
         //Cada link tiene los siguientes atributos: href, text, file, status,ok
     }
 );
```