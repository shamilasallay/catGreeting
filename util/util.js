
import mergeImg from 'merge-img';

export const utilFunctions = {
  getUrl: (urlTemplate, params) => {
    return urlTemplate.replace(/{(\w+)}/g, (placeholderWithDelimiters, placeholderWithoutDelimiters) => {
      if (params[placeholderWithoutDelimiters]) return params[placeholderWithoutDelimiters];
      throw Error(`param not found: ${placeholderWithDelimiters}`);
    })
  },
  mergeImages: async (images) => {
    try {
      return await mergeImg(images);
    } catch (err) {
      console.error('Error merging images:', err);
      throw Error('Error merging images:', err.message);
    }
  },
  writeImagetoFile: (image,fileName) => {
    try{
      return image.write(fileName);
    }catch(err){
      console.error('Error when writing images to file:', err.message);
      throw Error('Error when writing images to file:',err)
    }
  }
}