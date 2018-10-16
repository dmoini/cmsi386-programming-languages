# Homework2
import math
from random import sample
from cryptography.fernet import Fernet
import requests
from itertools import product


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
    return '' if not word else lambda next=None: (say(f'{word} {next}') if next else word)


def triples(limit):
    return [(a, b, c) for a, b, c in product(range(1, limit + 1), repeat=3)
            if a < b < c and a ** 2 + b ** 2 == c ** 2]


def powers(base, limit):
    current_power = 0
    while base ** current_power <= limit:
        yield base ** current_power
        current_power += 1


def interleave(a, *b):
    min_len = min(len(a), len(b))
    interleaved = [val for pair in zip(a, b) for val in pair]
    return interleaved + (a[min_len:] if len(a) > len(b) else list(b)[min_len:])


class Cylinder():
    def __init__(self, radius=1, height=1):
        self.radius = radius
        self.height = height

    @property
    def volume(self):
        return math.pi * (self.radius ** 2) * self.height

    @property
    def surface_area(self):
        return (2 * math.pi * self.radius * self.height) + (2 * math.pi * (self.radius ** 2))

    def widen(self, factor):
        self.radius *= factor
        return self

    def stretch(self, factor):
        self.height *= factor
        return self


# https://cryptography.io/en/latest/
def make_crypto_functions(fernet_key):
    cipher = Fernet(fernet_key)

    def encrypt(bytes):
        return cipher.encrypt(bytes)

    def decrypt(bytes):
        return cipher.decrypt(bytes)
    return (encrypt, decrypt)


# https://www.dataquest.io/blog/python-api-tutorial/
def random_name(**data):
    data.update({'amount': 1})
    r = requests.get('https://uinames.com/api/', params=data)
    info = r.json()
    if 'error' in info:
        raise ValueError(f'{{"error": "{info["error"]}"}}')
    return f'{info["surname"]}, {info["name"]}'
