const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  return strNums.map(function(x){
    if(isNaN(x)){
      throw new BadRequestError(`${x} is not a number.`);
    } else {
      return Number(x);
    }
  });
}


module.exports = { convertStrNums };