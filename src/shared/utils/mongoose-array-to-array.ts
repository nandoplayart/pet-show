export const  mongooseArrayToArray = (mongooseArray) => {
    const array = [];
    for (let i = 0; i < mongooseArray.length; i += 1) {
      array.push(mongooseArray[0]);
    }
    return array;
  };