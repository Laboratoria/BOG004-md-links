const {pathExists, isRelative, convertToAbsolut, isFolder, listFolder, isMarkdownFile, readMarkdownFile

} = require('../index');

describe('pathExists', () => {

  it('should be a function', () => {
    expect(typeof pathExists).toBe('function');
  });
  // Probando con una ruta relativa (la carpeta padre ../), la funcion debe devolver true
  it('should return true with a relative path', () => {
    expect(pathExists('../')).toBe(true);
  });
  // Probando con una ruta absoluta, la funcion debe devolver true
  it('should return true with a absolute path', () => {
    expect(pathExists('C:\\Users\\natyc\\md-links\\test')).toBe(true);
  });
  // Probando con una ruta absoluta invalida, la funcion debe devolver false
  it('should return false with an invalid path', () => {
    expect(pathExists('C:\\Users\\natyc\\md-links\\sss')).toBe(false);
  });
});

describe('isRelative', () => {
  it('should be a function', () => {
    expect(typeof isRelative).toBe('function');
  });
  // Probando con una ruta relativa (la carpeta padre ../), la funcion debe devolver true
  it('should return true with a relative path', () => {
    expect(isRelative('../')).toBe(true);
  });
  // Probando con una ruta absoluta, la funcion debe devolver False
  it('should return true with a absolute path', () => {
    expect(isRelative('C:\\Users\\natyc\\md-links\\test')).toBe(false);
  });
});

describe('convertToAbsolut', () => {
  it('should be a function', () => {
    expect(typeof convertToAbsolut).toBe('function');
  });
  // Probando con una ruta relativa (la carpeta padre ../), la funcion debe devolverla convertida
  it('should return true with a relative path', () => {
    expect(convertToAbsolut('../')).toBe('C:\\Users\\natyc');
  });  

  it('should return true with a relative path', () => {
    expect(convertToAbsolut('./')).toBe('C:\\Users\\natyc\\md-links');
  });  

  it('should return true with a relative path', () => {
    expect(convertToAbsolut('./img')).toBe('C:\\Users\\natyc\\md-links\\img');
  });  
});

describe('isFolder', () => {
  it('should be a function', () => {
    expect(typeof isFolder).toBe('function');
  });
  // Probando con una ruta a  un directorio 
  it('should return true with a directory', () => {
    expect(isFolder('../')).toBe(true);
  });  
// Probando con una ruta a un archivo 
  it('should return false with an archive', () => {
    expect(isFolder('./package.json')).toBe(false);
  });  
});

describe('listFolder', () => {
  it('should be a function', () => {
    expect(typeof listFolder).toBe('function');
  });
  // Probando contenido de un directory que no este vacio
  it('should return an array that is not empty', () => {
    expect(listFolder('./').lenght).not.toBe(0);
  });  
});

describe('isMarkdownFile,', () => {
  it('should be a function', () => {
    expect(typeof isMarkdownFile).toBe('function');
  });
  it('should return true if is markdown file', () =>{
    expect(isMarkdownFile('test.md')).toBe(true);
  });

  it('should return False if is not markdown file', () =>{
    expect(isMarkdownFile('test.html')).toBe(false);
  });
});

describe('readMarkdownFile', () => {

  it('should...', () => {
    console.log('FIX ME!');
    console.log(typeof readMarkdownFile);
    
    readMarkdownFile("./test/single_link.md");
  });
});