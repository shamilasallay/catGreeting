
import axios from 'axios';
import mergeImg from 'merge-img';
import path  from 'path';

import utils from './util/util.js'
import { BASE_URL } from './config.js';
import { DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT, DEFAULT_IMAGE_COLOR, DEFAULT_IMAGE_SIZE, DEFAULT_FILE_NAME } from './util/constants.js'

export const generateCatGreeting = async (requestParams) => {
  try {
    const { greetings, width, height, color, size, fileName } = requestParams;

    if (!greetings) {
      throw new Error('Should contain greetings sentence with at least two words')
    }
    if(fileName && !path.extname(fileName).toLowerCase().includes('jpg','jpeg', 'png')){
      throw new Error('Invalid file extension. Supported extensions are .jpg and .png.');

    }
    let greetingsArr = greetings.split(' ');
    if (greetingsArr.length < 2) {
      throw new Error('Greetings sentence should have at least two words')
    }
    
    let imgFile = fileName || DEFAULT_FILE_NAME;
    let params = {
      width: width || DEFAULT_IMAGE_WIDTH,
      height: height || DEFAULT_IMAGE_HEIGHT,
      color: color || DEFAULT_IMAGE_COLOR,
      size: size || DEFAULT_IMAGE_SIZE
    }

    const catImages = await Promise.all(
      greetingsArr.map((greeting) => {
        params.greeting = greeting;
        return fetchCatImage(BASE_URL, params);
      })
    )
    const mergedImg = await mergeImages(catImages);
    writeImagetoFile(mergedImg, imgFile);
    return "Successfully created a cat card!!!"
  }
  catch (err) {
    console.error('Error generating cat greeting :', err);
    throw Error('Error generating cat greeting :', err.message)
  }
}

const fetchCatImage = async (BASE_URL, params) => {
  const reqUrl = utils.getUrl(BASE_URL, params);
  const response = await axios.get(reqUrl, { responseType: 'arraybuffer' });
  const catimageData = Buffer.from(response.data, 'binary');
  return catimageData;
}

const mergeImages = async (images) => {
  try {
    return await mergeImg(images);
  } catch (err) {
    console.error('Error merging images:', err);
    throw Error('Error merging images:', err.message);
  }
};

const writeImagetoFile = (image,fileName) => {
  try{
    return image.write(fileName);
  }catch(err){
    console.error('Error when writing images to file:', err.message);
    throw Error('Error when writing images to file:',err)
  }
}




const requestParams = {
  greetings: 'Hey there shamila',
  width: 400, color: 'Pink', size: 100
}
let response = await generateCatGreeting(requestParams)
console.log("response ",response)