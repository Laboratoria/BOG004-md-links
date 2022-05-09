const {mdLinks
} = require('../md-links');

describe('mdlinks', () => {
    it('should be a function', () => {
      expect(typeof mdLinks).toBe('function');
    });
    test('should return un array con dos links', () => {
      return mdLinks('./test/single_link.md', {validate: true}).then( links => {
        expect(links.length).toBe(2);
      });
    });
    test('should return un array con dos links', () => {
      return mdLinks('./test/single_link.md', {validate: true}).then( links => {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
        links.forEach(
          (link)=>{
            console.table(link);
          }
        );
        expect(links.length).toBe(2);
      });
    });
    test('should return un array con dos links', () => {
      return mdLinks('./test', {validate: false}).then( links => {
        expect(links.length).toBe(2);
      });
    });

  });