// // ********Función que retorna el total de links y de links únicos********
// const totalAndUnique = (arraylinks) => {
//     const totalLinks = arraylinks.length;
//     const uniqueLinks = new Set(arraylinks.map((element) => element.href)); // crear una colección de links únicos(no se repiten);
//     const stats = `${ 'Total' } ${ (totalLinks) }\n${ ('Unique :') } ${ (uniqueLinks.size) }`;
//     return stats;
// }

// // *******Función que verifica si hay algun link roto*********//
// const broken = (arraylinks) => {
//     const broken = arraylinks.filter(link => link.message === 'Fail')
//     const stats = `${ ('Broken :') } ${ (broken.length) }`;
//     return stats;
// }

// module.exports = {
//     totalAndUnique,
//     broken,
// };