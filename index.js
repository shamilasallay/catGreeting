
import path from 'path';
import minimist from 'minimist';
import { helperFunctions } from './util/helpers.js'
import { utilFunctions } from './util/util.js'
import { BASE_URL } from './config.js';
import {
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_COLOR,
  DEFAULT_IMAGE_SIZE,
  DEFAULT_FILE_NAME
} from './util/constants.js'

const argv = minimist(process.argv.slice(2));

export const generateCatGreeting = async () => {
  try {
    const {
      greetings = 'Hello You',
      width = 400, 
      height = 500, 
      color = 'Pink', 
      size = 100,
      fileName = 'cat-card.png'
    } = argv;

    if (fileName && !['.jpg', '.png'].includes(path.extname(fileName).toLowerCase())) {
      throw new Error('Invalid file extension. Supported extensions are .jpg and .png.');
    }

    let greetingsArr = greetings.split(' ');
    if (greetingsArr.length < 2) {
      throw new Error('Greetings sentence should have at least two words')
    }

    const imgFile = fileName || DEFAULT_FILE_NAME;
    let params = {
      width: width || DEFAULT_IMAGE_WIDTH,
      height: height || DEFAULT_IMAGE_HEIGHT,
      color: color || DEFAULT_IMAGE_COLOR,
      size: size || DEFAULT_IMAGE_SIZE
    }

    const catImages = await Promise.all(
      greetingsArr.map((greeting) => {
        params.greeting = greeting;
        return helperFunctions.fetchCatImage(BASE_URL, params);
      })
    )
    const mergedImg = await utilFunctions.mergeImages(catImages);
    utilFunctions.writeImagetoFile(mergedImg, imgFile);
    return "Successfully created a cat card!!!"
  }
  catch (err) {
    console.error('Error generating cat greeting :', err);
    throw Error('Error generating cat greeting :', err.message)
  }
};

generateCatGreeting()