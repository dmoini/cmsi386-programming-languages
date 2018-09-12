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


# TODO
def triples(limit):
    # vals = []
    # for c in range(1, limit + 1):
    #     for b in range(1, c):
    #         for a in range(1, b):
    #             mylist = tuple(list(a, b, c))
    #
    #             if (a ** 2) + (b ** 2) == (c ** 2) and mylist not in vals:
    #                 vals.append(mylist)
    # return vals
    pass


# TODO
def powers(base, limit, callback):
    pass


# TODO
def interleave():
    pass


# TODO
def Cylinder(spec):
    pass


# TODO
def make_crypto_functions():
    pass


# TODO
def random_name():
    pass
