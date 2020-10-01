const isAllLetters = (str) => {
  const lettersRegex = /^[A-Za-z]+$/;
  if (str.match(lettersRegex)) {
    return true;
  } else {
    return false;
  }
};

const myStringValidator = (str) => {
  if (!isAllLetters(str) || str.length < 3) {
    console.log("Entrée invalide.");
    return false;
  } else return true;
};

const myNumberValidator = (nb) => {
  if (Number.isNaN(parseInt(nb)) || parseInt(nb) <= 0) {
    console.log("Entrée invalide.");
    return false;
  } else return true;
};

module.exports = {
  myStringValidator,
  myNumberValidator,
};
