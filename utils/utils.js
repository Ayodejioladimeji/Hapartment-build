export const getRandomObject = (array) => {
  console.log(array);
  //   const randomArray = [];
  const randomObject = array[Math.floor(Math.random() * array.length)];

  //   return randomArray.push(randomObject);
  return randomObject;
};
