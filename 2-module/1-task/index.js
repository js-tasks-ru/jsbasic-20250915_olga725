function sumSalary(salaries) {
  let sum = 0; 
  for (let k in salaries) { 
    const zp = salaries[k];
    if (typeof zp === 'number' && isFinite(zp)) { 
      sum += zp; 
    } 
  } 
  return sum; 
};
