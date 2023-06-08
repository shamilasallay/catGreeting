import axios from 'axios';
import { BASE_URL, IMAGE_RESPONSE_TYPE, ENCODING } from '../constants.js';

// fetch the cat image with custome text from cataas and return buffer data
export const fetchCatImage = async ({ greeting, width, height, color, size }) => {
    const reqUrl = `${BASE_URL}${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`;
    const response = await axios.get(reqUrl, { responseType: IMAGE_RESPONSE_TYPE });
    const catImageData = Buffer.from(response.data, ENCODING);
    return catImageData;
}