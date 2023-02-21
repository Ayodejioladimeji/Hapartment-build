export const getRandomObject = (array) => {
  //   const randomArray = [];
  const randomObject = array[Math.floor(Math.random() * array.length)];

  //   return randomArray.push(randomObject);
  return randomObject;
};
