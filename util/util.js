
const helperFunctions = {

getUrl: (urlTemplate, params) => {
  return urlTemplate.replace(/{(\w+)}/g, (placeholderWithDelimiters, placeholderWithoutDelimiters) => {
    if (params[placeholderWithoutDelimiters]) return params[placeholderWithoutDelimiters];
    throw Error(`param not found: ${placeholderWithDelimiters}`);
  })
},
}

export default helperFunctions;