# CMSI 386 Homework #4 Written Exercises
### Donovan Moini and Ian Lizarda

### 1) Given the C++ declaration:
```C++
struct {
  int n;
  char c;
} A[10][10];    
```
### On your machine, find the address of `A[0][0]` and `A[3][7]`. Explain why these values are what you found them to be.

>A[0][0] gives the memory address 0x10d04c0e0 and A[3][7] gives the memory address 0x10d04c208.
The memory address for A[0][0] is randomly allocated, with the address for A[3][7] being relative to 
A[0][0]'s address. Since each address uses 1 byte of memory and A[3][7] is 37 addresses away, then the 
address for A[3][7] is 37 bytes away, which is 296 bits.

### 2) Explain the meaning of the following C++ declarations:
```C++
adouble *a[n];
double (*b)[n];
double (*c[n])();
double (*d())[n];
```
>`double *a[n]` is an array containing n pointers to doubles

>`double (*b)[n]` is a single pointer to an array of n doubles

>`double (*c[n])()` is an array of n pointers to functions returning doubles

>`double (*d())[n]` is a function returning a pointer to an array of n doubles

### 3) Consider the following declaration in C++:
```C++
double (*f(double (*)(double, double[]), double)) (double, ...);
```
### Describe rigorously, in English, the type of *f*.
>**f** is a function passing a pointer to a function passing in 1) a double and an array of doubles returning a double, and 2) a double, which returns(?) a pointer to a function passing in a double and an arbitrary number of arguments returning a double.

>**f** is a pointer to a function passing in 1) a pointer to a function passing in a double and an array of doubles returning a double, and 2) a double, which passes in a double and a arbitrary number of arguments returning a double.

### 4) What happens when we “redefine” a field in a C++ subclass? For example, suppose we have:
```C++
class Base {
public:
  int a;
  std::string b;
};

class Derived: public Base {
public:
  float c;
  int b;
};
```
### Does the representation of a Derived object contain one b field or two? If two, are both accessible, or only one? Under what circumstances? Tell the story of how things are.
>TODO

### 5) What does the following C++ program output?
```C++
#include <iostream>
int x = 2;
void f() { std::cout << x << '\n'; }
void g() { int x = 5; f(); std::cout << x << '\n'; }
int main() {
  g();
  std::cout << x << '\n';
}
```
### Verify that the answer you obtained is the same that would be inferred from apply the rules of static scoping. If C++ used dynamic scoping, what would the output have been?
>This program outputs
2
5
2


### 6) Suppose you were asked to write a function to scramble (shuffle) a given array, in a mutable fashion. Give the function signature for a shuffle function for (a) a raw array, and (b) a std::array.
>(a)
```C++
char[] shuffle(char[] array, int length)
```
>(b)
```C++
TODO
```
