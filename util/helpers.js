
import axios from 'axios';
import utils from './util.js'
import { IMAGE_RESPONSE_TYPE, ENCODING } from './constants.js'

const helperFunctions = {
    fetchCatImage: async (BASE_URL, params) => {
        const reqUrl = utils.getUrl(BASE_URL, params);
        const response = await axios.get(reqUrl, { responseType: IMAGE_RESPONSE_TYPE });
        const catimageData = Buffer.from(response.data, ENCODING);
        return catimageData;
    }
}

export default helperFunctions;