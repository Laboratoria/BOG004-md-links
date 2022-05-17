const { mdLinks } = require('../index.js');

const route = "test//test-folder//test-file.md";
const invalidRoute = "test//test-folder//test-file1.md";
const fileWithoutLinks = "test//test-folder//anotherFiles1.md//hola.md";

const arrayLinksValidated = [{
        href: "https://www.google.com.co/",
        text: "Google",
        file: "C://Users//yduqu//OneDrive//Escritorio//Laboratoria//md-links//test//test-folder//test-file.md",
        status: 200,
        ok: "OK",
    },
    {
        href: "https://www.googlee.com.coo/",
        text: "Guugle",
        file: "C://Users//yduqu//OneDrive//Escritorio//Laboratoria//md-links//test//test-folder//test-file1.md",
        status: 404,
        ok: "fail",
    },
];


describe('mdLinks', () => {

    it('should be a function', () => {
        expect(typeof mdLinks).toBe('function');
    });
});

describe('mdLinks', () => {

    it('debe retornar promesa', () => {
        expect(mdLinks(route) instanceof Promise).toBeTruthy();
    });

    it("Debe retornar array de objetos de links validos", () =>
        mdLinks(route, { validate: true }).then((e) =>
            expect(e).toEqual(arrayLinksValidated)
        ));

    it('debe ser un string de ruta no valida', () =>
        mdLinks(invalidRoute).then((e) =>
            expect(e).toBe(arrayLinksValidated)
        ));

    it("Debe retornar mensaje de que el archivo no contiene links", () => {
        mdLinks(fileWithoutLinks).catch((e) => {
            expect(e).toMatch('El archivo no contiene Links')
        });
    });
});