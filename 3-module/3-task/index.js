function camelize(str) {
  const word = str.split('-');
  for (let i = 1; i < word.length; i++) {
    word[i] = word[i][0].toUpperCase() + word[i].slice(1);
  }
  return word.join('');
}

  