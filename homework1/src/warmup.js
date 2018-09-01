// Problem 1
function change(cents) {
  if (cents < 0) {
    throw new RangeError('amount cannot be negative');
  }
  const denominations = [25, 10, 5, 1];
  const results = [];
  results.length = 3;
  let remainingChange = cents;
  denominations.forEach((denomination, index) => {
    if (index < denominations.length - 1) {
      results[index] = Math.floor(remainingChange / denomination);
      remainingChange %= denomination;
    } else {
      results[index] = remainingChange;
    }
  });
  return results;
}

function stripQuotes(s) {
  // return s.split('').filter(character => character !== '"' && character !== '\'').join('');
  return s.split(/['"]+/g).join('');
}

function scramble(s) {
  const array = s.split('');
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array.join('');
}

function powers(base, limit, callback) {
  let currentValue = 1;
  while (currentValue <= limit) {
    callback(currentValue);
    currentValue *= base;
  }
  return currentValue;
}

function* powersGenerator(base, limit) {
  let currentPower = 0;
  while (base ** currentPower <= limit) {
    yield base ** currentPower;
    currentPower += 1;
  }
}

function interleave(arrayA, ...arrayB) {
  const interleavedArray = [];
  while (arrayA.length > 0 || arrayB.length > 0) {
    if (arrayA.length > 0) {
      interleavedArray.push(arrayA.shift());
    }
    if (arrayB.length > 0) {
      interleavedArray.push(arrayB.shift());
    }
  }
  return interleavedArray;
}


// TODO: Problem 7


// TODO: Problem 8


// TODO: Problem 9


// TODO: Problem 10

module.exports = {
  change,
  stripQuotes,
  scramble,
  powers,
  powersGenerator,
  // say,
  interleave,
  // cylinder,
  // makeCryptoFunctions,
  // randomName,
};
