/*
 * A collection of functions illustrating some basic JavaScript.
 */

const request = require('request-promise');
const cryptoKey = require('crypto');

/*
 * Returns an array with the minimum number of U.S. quarters, dimes, nickels, and
 * pennies, respectively, that make the given amount. This solution uses mutable
 * variables because it's rather common in JavaScript. If you want a more functional
 * solution see http://cs.lmu.edu/~ray/notes/functionalprogramming/.
 */
const change = (amount: number): [number, number, number, number] => {
  if (amount < 0) {
    throw new RangeError('amount cannot be negative')
  } 
  let [remaining, quarters, dimes, nickels, pennies] = [amount, 0, 0, 0, 0]
  quarters = Math.floor(remaining / 25), remaining %= 25
  dimes = Math.floor(remaining / 10), remaining %= 10
  nickels = Math.floor(remaining / 5), remaining %= 5
  pennies = remaining
  return [quarters, dimes, nickels, pennies]
};

/*
 * Returns a copy of the string with apostrophes and double quotes removed.
 */
 const stripQuotes = (s: string): string => s.replace(/['"]/g, '');

/*
 * Returns a random permutation of a string. This is a swap-based implementation of
 * the Fisher-Yates shuffle, which is awesome. Don't use the random technique! See
 * http://sroucheray.org/blog/2009/11/array-sort-should-not-be-used-to-shuffle-an-array/.
 * This implementation works by swapping elements of an array in place. We should do
 * performance testing to compare it with a version that destroys one array or string
 * as it pulls characters from it and adds them to a result.
 */
const scramble = (s: string): string => {
  const characters = s.split('');
  let j = characters.length;
  while (j) {
    const i = Math.floor(Math.random() * j--); // eslint-disable-line no-plusplus
    [characters[j], characters[i]] = [characters[i], characters[j]];
  }
  return characters.join('');
};

/*
 * Produces successive powers of a base, up to the given limit, passing each to a
 * callback. This is one of the few fairly decent uses of the classic for-statement,
 * I think.
 */

//  Using void is safer because it prevents you from accidently using the return value of x in an unchecked way:
const powers = (base: number, limit: number, callback: (p: number) => void) => { 
  let power: number = 1;
  while (power <= limit) {
    callback(power);
    power *= base;
  }
};

/*
 * A generator that generates successive powers of a base, up to the given limit.
 */
const powersGenerator = function* (base: number, limit: number): IterableIterator<number> { // eslint-disable-line func-names
  for (let power = 1; power <= limit; power *= base) {
    yield power;
  }
};

/*
 * The famous chainable function problem, implemented in a readable fashion. It is
 * possible to code golf this problem, producing a function s, implemented like this:
 *
 *   s=a=>a?b=>b?s(a+' '+b):a:''
 *
 * The golfed version is very cool but isn't quite accurate, because it uses falsiness,
 * not undefinedness, as determining whether or not an argument was passed.
 */
const say = (firstWord: string): string | ((word: string) => string | any) => {
  const words = [];
  function sayMore(word: string) {
    if (word === undefined) {
      return words.join(' ');
    }
    words.push(word);
    return sayMore;
  }
  return sayMore(firstWord);
};

/*
 * Returns the interleaving of an array with a bunch of values. The lengths of the
 * array and the number of values do not need to be the same.
 */
const interleave = (a: any[], ...b: any[]): any[] => {
  const firstLength = a.length;
  const secondLength = b.length;
  const max = Math.max(firstLength, secondLength);
  const result = [];
  for (let i = 0; i < max; i += 1) {
    if (i < firstLength) result.push(a[i]);
    if (i < secondLength) result.push(b[i]);
  }
  return result;
};

// TODO:
/*
 * Creates a cylinder object in the "Crockford Classes" style. There are no units for
 * the radius and height.
 */
// TODO: update to actual class
class Cylinder {
  radius: number = 1
  height: number = 1
  
  // TODO: constructor, possibly redo for input as object
  constructor(radius: number = 1, height: number = 1) {
    this.radius = radius
    this.height = height
  }

  capArea(): number {
    return Math.PI * this.radius * this.radius
  }

  surfaceArea(): number {
    return (2 * this.capArea()) + (2 * Math.PI * this.radius * this.height)
  }

  stretch(factor: number): void {
    this.height *= factor
  }

  widen(factor: number): void {
    this.radius *= factor
  }

  volume(): number {
    return Math.PI * this.radius * this.radius * this.height
  }

  toString(): string {
    return `Cylinder with radius ${this.radius} and height ${this.height}`
  }
  // TODO: return Object.freeze equivalent
}

// const cylinder = (specification) => {
//   let { radius = 1, height = 1 } = specification;
//   const capArea = () => Math.PI * radius * radius;
//   const surfaceArea = () => (2 * capArea()) + (2 * Math.PI * radius * height);
//   const stretch = (factor) => { height *= factor; };
//   const widen = (factor) => { radius *= factor; };
//   const volume = () => Math.PI * radius * radius * height;
//   const toString = () => `Cylinder with radius ${radius} and height ${height}`;
//   return Object.freeze({
//     volume,
//     surfaceArea,
//     get radius() { return radius; },
//     get height() { return height; },
//     stretch,
//     widen,
//     toString,
//   });
// };

// TODO
/*
 * Returns an array of two functions, an encyptor and a decryptor, each using a
 * given key and a given encryption algorithm. The encryptor turns a UTF-8 encoded
 * string into a hex-string; the decryptor does the reverse.
 */
const makeCryptoFunctions = (key, algorithm) => [
  (data) => {
    const cipher = crypto.createCipher(algorithm, key);
    return cipher.update(data, 'utf-8', 'hex') + cipher.final('hex');
  },
  (data) => {
    const cipher = crypto.createDecipher(algorithm, key);
    return cipher.update(data, 'hex', 'utf-8') + cipher.final('utf-8');
  },
];

/*
 * Returns a promise for a name of the form "surname, name" obtained from the Uinames
 * API, for the given region and gender.
 */

// TODO
const randomName = ({ region, gender }: { region: string, gender: string }): Promise<any> => request({ //Promise<string> ?
  method: 'GET',
  uri: 'https://uinames.com/api/',
  json: true,
  headers: { 'User-Agent': 'Homework Assignment from LMU' },
  qs: { region, gender, amount: 1 },
}).then(p => `${p.surname}, ${p.name}`); //Does this need a type?