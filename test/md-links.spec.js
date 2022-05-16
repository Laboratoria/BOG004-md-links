const { mdLinks } = require('../index.js');
const {
    getMdFiles,
    readMdFiles,
    getLinksMdFiles,
    getObjetsLinks,
    absolutePath,
    extMdFile,
    convertPath,
    totalAndUnique,
    broken,
} = require('../functions.js');


describe('mdLinks', () => {

    it('should be a function', () => {
        expect(typeof mdLinks).toBe('function');
    });
});

describe('mdLinks', () => {
    const path = 'test/test-folder1.md';

    it('debe retornar promesa', () => {
        expect(mdLinks(path) instanceof Promise).toBeTruthy();
    });

    it('debe ser un array de objetos', () => mdLinks(path).then((res) => {
        expect(res).toHaveLength(3);
    }));
});