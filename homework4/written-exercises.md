# Donovan Moini, Ian Lizarda, and Teddy Chu

### 1) Given the C++ declaration:

```C++
struct {
  int n;
  char c;
} A[10][10];
```

### On your machine, find the address of `A[0][0]` and `A[3][7]`. Explain why these values are what you found them to be.

A[0][0] gives the memory address 0x10d04c0e0 and A[3][7] gives the memory address 0x10d04c208.
The memory address for A[0][0] is randomly allocated, with the address for A[3][7] being relative to
A[0][0]'s address. Since each address uses 1 byte of memory and A[3][7] is 37 addresses away, then the
address for A[3][7] is 37 bytes away, which is 296 bits.

### 2) Explain the meaning of the following C++ declarations:

```C++
double *a[n];
double (*b)[n];
double (*c[n])();
double (*d())[n];
```

`double *a[n]` is an array containing n pointers to doubles

`double (*b)[n]` is a single pointer to an array of n doubles

`double (*c[n])()` is an array of n pointers to functions returning doubles

`double (*d())[n]` is a function returning a pointer to an array of n doubles

### 3) Consider the following declaration in C++:

```C++
double (*f(double (*)(double, double[]), double)) (double, ...);
```

### Describe rigorously, in English, the type of _f_.

**f** is a function passing a pointer to a function passing in 1) a double and an array of doubles returning a double, and 2) a double, which returns(?) a pointer to a function passing in a double and an arbitrary number of arguments returning a double.

**f** is a pointer to a function passing in 1) a pointer to a function passing in a double and an array of doubles returning a double, and 2) a double, which passes in a double and a arbitrary number of arguments returning a double.

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

When we "redefine" a field in a C++ subclass, the field in the subclass will _shadow_ or _hide_ the field in the Base class.
The Base class field `std::string b` is hidden by the Derived Base class field `int b`.
The representation of the Derived object, however, does contain all the fields of the Base. It just needs to be more explicitly called.
It is important to note that both **b** fields in the **Base** and **Derived** classes are _public_ (by default a class fields are _private_) so that both **b** fields are able to be accessed and manipulated in a **Derived** object. If it was private, it would be unaccessible.
The Base field `b` can be accessed or made _visible_ through various ways:

1. Use a qualified field accessor to access Base field b.

```C++
  derived.Base::b = "Python is better";
```

2. Use a base reference on a derived object to access Base field b.

```C++
  Base& bref = derived;
  bref.b = "Even f**king Java is better";
```

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

### Verify that the answer you obtained is the same that would be inferred from applying the rules of static scoping. If C++ used dynamic scoping, what would the output have been?

When run, the given program outputs:

```shell
> g++ -std=c++14 question5.cpp && ./a.out
2
5
2
```

Since C++ uses static scoping, functions will check for variables within the closest scope and then look outwards.
This progam begins with defining a global **int x** equal to **2**.
Then when **main()** is called, it calls **g()** first. When **g()** is called, it defines a new **int x** and equals it to **5**.
It then calls **f()**, which prints out **x**.
Since there is not a locally declared int **x** within **f()**, **f()** looks outward and finds the global **x** that is equal to **2**.
After **f()** prints **x**, **g()** prints **x** as well, but since there is an int **x** equals to **5** defined in **g()**, this **x** is printed.
After **g()** prints **x**, then **main\*()** prints **x**.
But there is no int **x** defined within **main\*()**, so **main()** looks outwards and finds the globally defined int **x** that is equal to **2**.

If C++ used dynamic scoping, the given program would output:

```shell
> g++ -std=c++14 question5.cpp && ./a.out
5
5
2
```

In this case, when **f()** is called, it looks within **g()** to find an int **x**.
Since **g()** does contain an int **x**, **f()** prints this int **x** that is equal to **5** instead of **2**.

### 6) Suppose you were asked to write a function to scramble (shuffle) a given array, in a mutable fashion. Give the function signature for a shuffle function for (a) a raw array, and (b) a std::array.

(a)

```C++
template<typename T>
void shuffle(T array[], int length)
```

(b)

```C++
template<typename T>
void shuffle(std::array<T> array)
```
