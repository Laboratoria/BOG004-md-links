const mdLinks = require('../src/index.js');

const path = 'test/test-pruebas';
const invalidPath = 'test/test-prueba'
const path2 = 'C:\\Users\\Ana Margarita Garcia\\Desktop\\Laboratoria\\BOG004-md-links\\test\\doc-test\\doc2-test\\prueba2-test.md';
const arrayLinksTest = [
    {
        href: 'https://www.facebook.com/',
        text: 'Facebook',
        fileName: "C:\\Users\\Angelica Losada\\Dropbox\\PC\\Documents\\Proyectos\\BOG004-md-links\\test\\test-pruebas\\prueba-test.md",
        status: 200,
        ok: 'OK',
    },
    {
        href: 'https://www.feisbu.com/',
        text: 'Facebook-Roto',
        file: 'C:\\Users\\Angelica Losada\\Dropbox\\PC\\Documents\\Proyectos\\BOG004-md-links\\test\\test-pruebas\\pruebas-test.md',
        status: 404,
        ok: 'FAIL',
    },
];

describe('mdLinks', () => {
    it('should be a function', () => {
        expect(typeof mdLinks).toBe('function');
    });
    it('Debe retornar una promesa', () => {
        expect(mdLinks(path) instanceof Promise).toBeTruthy()
    });
    it('Debería retornar un arreglo de objetos de links validados',
        () => {
            return mdLinks(path, { validate: false })
                .then(e => {
                    expect(e).toMatch('arrayLinksTest')
                })
                .catch((error) => {
                    return error;
                })
        });
    it('debe ser un array de objetos con peticion HTTP', () => mdLinks(path2, { validate: true })
        .then((data) => {
            expect(data[0].value.statusText).toBe('ok');
        }));
    it('It should return an error message', () => {
        return mdLinks(invalidPath, { validate: true }).catch(e => expect(e).toMatch('| ✿ INVALID PATH ✿ |'))
    })

});
