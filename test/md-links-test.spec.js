const { mdLinks } = require("../index.js");
const path = process.argv[2];

describe("mdLinks", () => {
    it("es una funcion", () => {
      expect(typeof mdLinks).toBe("function");
    });
  });



it('Ejecuta la funcion mdLinks con validate false y retorna un objeto con 3 keys', () => {
    let pathTest = "pruebas";
    let result = [
    {
      href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
      text: 'Array.prototype.map() - MDN',
      file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md'
    },
    {
      href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
      text: 'Array.prototype.filter() - MDN',
      file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md'
    },
    {
      href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
      text: 'Array.prototype.reduce() - MDN',
      file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md'
    },
    {
      href: 'hps://developer.mozilla.org/es//Global_Objects/Array/Reduce',
      text: 'Array.prototype.reduce() - MDN',
      file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md'
    },
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba1.md'
    },
    {
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: '[md-links',
      file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba1.md'
    },
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba1.md'
    },
    {
      href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
      text: 'Píldora recursión - YouTube Laboratoria Developers',
      file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba2.md'
    },
    {
      href: 'https://medium.com/laboratoria-developers/recursi%C3%B3n-o-recursividad-ec8f1a359727',
      text: 'Recursión o Recursividad - Laboratoria Developers ',
      file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba2.md'
    }
  ]
  return mdLinks(pathTest).then((test) => {
    expect(test).toEqual(result);
})
});

it('Ejecuta la funcion mdLinks con validate true y retorna el objeto con status "fail" u "OK" y status HTTPS', () => {
    let pathTest = "pruebas";
    let result = [
        {
          href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
          text: 'Array.prototype.map() - MDN',
          file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
          text: 'Array.prototype.filter() - MDN',
          file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
          text: 'Array.prototype.reduce() - MDN',
          file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'hps://developer.mozilla.org/es//Global_Objects/Array/Reduce',
          text: 'Array.prototype.reduce() - MDN',
          file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba.md',
          status: 'ERR_INVALID_PROTOCOL',
          ok: 'fail'
        },
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba1.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
          text: '[md-links',
          file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba1.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba1.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
          text: 'Píldora recursión - YouTube Laboratoria Developers',
          file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba2.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://medium.com/laboratoria-developers/recursi%C3%B3n-o-recursividad-ec8f1a359727',
          text: 'Recursión o Recursividad - Laboratoria Developers ',
          file: 'C:\\Users\\gisbe\\OneDrive\\Escritorio\\PROYECTOS LAB\\BOG004-md-links\\pruebas\\prueba2.md',
          status: 200,
          ok: 'ok'
        }
      ]
  return mdLinks(pathTest, {validate : true}).then((test) => {
    expect(test).toEqual(result);
})
});

it('Ejecuta la funcion mdLinks con stats true para retornar el total de links y unicos', () => {
  let pathTest = "pruebas"
  let result = {"Total":9, "Unique":9}
  return mdLinks(pathTest, {stats : true}).then((test) => {
    expect(test).toEqual(result);
})
});

it('Ejecuta la funcion mdLinks con validate true y stats true para retonrar el total de links, unicos y rotos', () => {
  let pathTest = "pruebas"
  let result = {"Total":9, "Unique":9, "Broken":1}
  return mdLinks(pathTest, {stats : true, validate : true}).then((test) => {
    expect(test).toEqual(result);
})
});