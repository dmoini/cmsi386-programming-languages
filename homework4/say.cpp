#include <iostream>
#include <cassert>
#include <string>

using namespace std;

struct Say {
    private:
        string result;
    public:
        Say(string s = ""): result(s) {};
        Say operator()(string word) {
            return Say(result + " " + word);
        }
        string operator()() {
            return result.length() ? result.substr(1) : result;
        }
};

int main() {
    Say sayFunction;
    assert(sayFunction() == "");
    assert(sayFunction("")() == "");
    assert(sayFunction(" ")() == " ");
    assert(sayFunction("hi")() == "hi");
    assert(sayFunction("hi")("there")() == "hi there");
    assert(sayFunction("hello")("my")("name")("is")("Colette")() == "hello my name is Colette");
    cout << "All tests passed!\n";
    return 0;
}