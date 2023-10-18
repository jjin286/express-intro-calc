"use strict";

const { BadRequestError } = require("./expressError");
const fsP = require("fs/promises");


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

async function writeFile(path, content) {
  try {
    await fsP.writeFile(path, content, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Successfully wrote to file!");
}


module.exports = { convertStrNums, writeFile };