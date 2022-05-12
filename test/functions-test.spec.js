const validatePath = require("../functions.js").validatePath;
const throughDirectory = require("../functions.js").throughDirectory;
const getObject = require("../functions.js").getObject;

let pathTest = "pruebas";
describe("Path", () => {
  it("es una funcion", () => {
    expect(typeof validatePath).toBe("function");
  });
});

it("recibe una ruta relativa y la convierte a absoluta", () => {
  let result = "C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas";
  expect(validatePath(pathTest)).toEqual(result);
});

it("Si recibe un archivo valida si es md. y lo empuja al array : si recibe un directorio lo recorre en busca de archivos md y los empuja a un array", () => {
  let result = [
    "pruebas\\prueba-sin-nada.md",
    "pruebas\\prueba.md",
    "pruebas\\prueba1.md",
    "pruebas\\prueba2.md",
  ];
  expect(throughDirectory(pathTest)).toEqual(result);
});

it("Lee los archivos md en busca de links y si encuentra los almacena en un objecto junto con el text y el file", () => {
  let mdTest = ["C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md"];
  let result = [ 
    {
      href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
      text: "Array.prototype.map() - MDN",
      file: "C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md",
    
    },
    {
      href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
      text: "Array.prototype.filter() - MDN",
      file: "C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md",

    },
    {
      href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce",
      text: "Array.prototype.reduce() - MDN",
      file: "C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md",
 
    },
    {
      href: "hps://developer.mozilla.org/es//Global_Objects/Array/Reduce",
      text: "Array.prototype.reduce() - MDN",
      file: "C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md",
 
    },
  ];
  return getObject(mdTest).then((test) => {
  expect(test).toEqual(result);
})
});
