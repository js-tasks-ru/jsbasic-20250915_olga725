function getMinMax(str) {
  const mass = str.split(' ');
  const numericElements = mass.filter(item => {
    return !isNaN(parseFloat(item));
  });
  const nums = numericElements.map(item => parseFloat(item));
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  return { min, max };
}