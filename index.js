const { writeFile } = require('fs');
const { join } = require('path');
const util = require('util');
const request = util.promisify(require('request'));
const mergeImg = require('merge-img');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));
const {
  greeting = 'Hello' || argv.greeting,
  who = 'You' || argv.who,
  width = 400 || argv.width,
  height = 500 || argv.height,
  color = 'Pink' || argv.color,
  size = 100 || argv.size,
} = argv;

const generateCatGreeting = async () => {
  try {

    let reqUrl = (greetParam) => `https://cataas.com/cat/says/${greetParam}?width=${width}&height=${height}&color=${color}&s=${size}`;

    const res = await Promise.all([
      request({ url: reqUrl(greeting), encoding: 'binary' }),
      request({ url: reqUrl(who), encoding: 'binary' })
    ]);

    let buffer = await getMergedBuffer(res, width);

    const fileOut = join(process.cwd(), `/cat-card.jpg`);

    writeFile(fileOut, buffer, 'binary', (err) => {
      if (err)
        throw `Error in writing merged image buffer to the file. Error => ${err}`
    });

  }
  catch (err) {
    throw `Cat greeting image generation failed with error => ${err}`;
  }
}

const getMergedBuffer = async (res, width) => {
  try {
    const mergedImg = await mergeImg([
      { src: Buffer.from(res[0].body, 'binary'), x: 0, y: 0 },
      { src: Buffer.from(res[1].body, 'binary'), x: width, y: 0 }
    ]);
    let buffer = mergedImg.getBuffer('image/jpeg', (err, buffer) => {
      if (err) {
        console.error(err);
        throw `Error when retrieving buffer of merged image. Error => ${err}`;
      } else {
        return buffer;
      }
    });
    return buffer;
  } catch (err) {
    throw `Error in merging buffer. Error => ${err}`;
  }
}

generateCatGreeting();

