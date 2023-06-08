
import mergeImg from 'merge-img';

export const mergeImages = async (images) => {
  try {
    return await mergeImg(images);
  } catch (err) {
    console.error('Error merging images:', err);
    throw Error('Error merging images:', err.message);
  }
};

export const writeImageToFile = (image,fileName) => {
  try{
    return image.write(fileName);
  }catch(err){
    console.error('Error when writing images to file:', err.message);
    throw Error('Error when writing images to file:',err)
  }
};