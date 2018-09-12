# Homework2
import math
from random import sample


def change(cents):
    if cents < 0:
        raise ValueError('amount cannot be negative')
    denominations = [25, 10, 5, 1]
    results = [0] * len(denominations)
    remaining_change = cents
    for index, coin in enumerate(denominations):
        if index < len(denominations) - 1:
            results[index], remaining_change = divmod(remaining_change, coin)
        else:
            results[index] = remaining_change
    return tuple(results)


def strip_quotes(s):
    return s.replace('"', '').replace('\'', '')


def scramble(s):
    return ''.join(sample(s, k=len(s)))


def say(word=None):
    return '' if not word else lambda next_word=None: (say(f'{word} {next_word}') if next_word else word)


def triples(limit):
    pythagorean_triples = set()
    for c in range(1, limit + 1):
        for b in range(1, c):
            for a in range(1, b):
                abc_tuple = (a, b, c)
                if a * a + b * b == c * c:
                    pythagorean_triples.add(abc_tuple)
    return list(pythagorean_triples)


def powers(base, limit):
    currentPower = 0
    while base ** currentPower <= limit:
        yield base ** currentPower
        currentPower += 1


# TODO 7
def interleave(a, *b):
    aLength, bLength, minLength = len(a), len(b), min(len(a), len(b))
    interleaved = [y for x in a for y in [x, 10*x]]
    return interleaved


# TODO 8
def Cylinder(spec):
    pass


# TODO 9
def make_crypto_functions():
    pass


# TODO 10
def random_name():
    pass
