const chalk = require('chalk');

const arrayTemplate = (arrayLinks) => {
    console.log(chalk.magenta.bold(`\n |     ✿ ALL LINKS: ✿    | \n`));
    arrayLinks.forEach(link => {
        console.log(chalk.yellowBright.bold(` ▷ href:  ${chalk.cyan(link.href)}   \n ▷ text:  ${chalk.magenta(link.text)} \n ▷ fileName: ${chalk.blackBright(link.fileName)} \n ❀`));
    })
};

const statusTemplate = (arrayLinks) => { //--VALIDATE
    console.log(chalk.magenta.bold(`| ✿ LINK STATUS: ✿ |`));
    arrayLinks.forEach(link => {
        if (link.status === 200) {
            console.log(chalk.yellowBright.bold(`▷ href: ${chalk.cyan(link.href)} \n▷ status: ${chalk.cyanBright.bold(link.status)} \n▷ ok: ${chalk.magentaBright.bold(link.ok)}\n `));
        } else {
            console.log(chalk.yellowBright.bold(`▷ href: ${chalk.cyan(link.href)} \n▷ status: ${chalk.cyanBright.bold(link.status)} \n▷ fail: ${chalk.redBright.bold(link.ok)}\n ❀ \n`));
        }
    })
}

const totalLinks = (arraylinks) => { // --STATS
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];
    const brokenLinks = arraylinks.filter(link => link.status != 200)
    return `${chalk.magenta.bold(`
    |  ✿   STATS  ✿  |
            `)}
    ${chalk.yellowBright.bold(`\t▷ Total:${totalArray.length} \n\t▷ Unique:${uniqueLinks.length}\n\t▷ Broken:${brokenLinks.length} ❀ `)}
    `
};

const linkStats = (arraylinks) => { // --STATS
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];
    return `${chalk.magenta.bold(`
    |  ✿   STATS  ✿  |
            `)}
    ${chalk.yellowBright.bold(`\t▷ Total:${totalArray.length} \n\t▷ Unique:${uniqueLinks.length}\n\t`)}
    `
};

module.exports = {
    arrayTemplate,
    statusTemplate,
    totalLinks,
    linkStats,
}
