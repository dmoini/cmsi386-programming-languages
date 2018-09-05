const crypto = require('crypto');
const rp = require('request-promise');

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
  return s.split(/['"]+/g).join('');
}

function scramble(s) {
  const array = s.split('');
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array.join('');
}

function powers(base, limit, callback) {
  let currentValue = 1;
  while (currentValue <= limit) {
    callback(currentValue);
    currentValue *= base;
  }
}

function* powersGenerator(base, limit) {
  let currentPower = 0;
  while (base ** currentPower <= limit) {
    yield base ** currentPower;
    currentPower += 1;
  }
}

function say(a) {
  return !a ? '' : b => (b ? say(`${a} ${b}`) : a);
}

function interleave(a, ...b) {
  const [aLen, bLen, minLength] = [a.length, b.length, Math.min(a.length, b.length)];
  const interleaved = a.slice(0, minLength)
    .map((v, i) => [v, b[i]])
    .reduce((x, y) => [...x, ...y], []);
  return [...interleaved, ...(aLen < bLen ? b : a).slice(minLength)];
}

function cylinder(spec) {
  let { radius = 1, height = 1 } = spec;
  const volume = () => (Math.PI * (radius ** 2) * height);
  const surfaceArea = () => (2 * Math.PI * radius * height) + (2 * Math.PI * (radius ** 2));
  const widen = (factor) => { radius *= factor; };
  const stretch = (factor) => { height *= factor; };
  const toString = () => `Cylinder with radius ${radius} and height ${height}`;
  return Object.freeze({
    get radius() { return radius; },
    get height() { return height; },
    volume,
    surfaceArea,
    widen,
    stretch,
    toString,
  });
}

// https://www.w3schools.com/nodejs/ref_crypto.asp
function makeCryptoFunctions(cryptoKey, cryptoAlgorithm) {
  function encrypt(s) {
    const cipher = crypto.createCipher(cryptoAlgorithm, cryptoKey);
    let encryption = cipher.update(s, 'utf8', 'hex');
    encryption += cipher.final('hex');
    return encryption;
  }

  function decrypt(s) {
    const decipher = crypto.createDecipher(cryptoAlgorithm, cryptoKey);
    let decryption = decipher.update(s, 'hex', 'utf8');
    decryption += decipher.final('utf8');
    return decryption;
  }
  return [encrypt, decrypt];
}

function randomName(info) {
  const { gender, region } = info;
  const options = {
    method: 'GET',
    uri: 'https://uinames.com/api/?amount=1',
    qs: {
      gender,
      region,
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true, // Automatically stringifies the body to JSON
  };
  return rp(options).then(data => `${data.surname}, ${data.name}`);
}

module.exports = {
  change,
  stripQuotes,
  scramble,
  powers,
  powersGenerator,
  say,
  interleave,
  cylinder,
  makeCryptoFunctions,
  randomName,
};
