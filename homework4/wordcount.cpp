#include <iostream>
#include <string>
#include <map>
#include <iterator>
#include <vector>

using namespace std;
typedef std::pair<std::string,int> pair;

int main() {
    string text;
    cout << "Please input a sentence:\n";
    getline(cin, text);
    map<string, int> wordCount;

    std::transform(text.begin(), text.end(), text.begin(), ::tolower);
    int textLength = text.size();
    string word = "";
    for (int i = 0; i < textLength; i++) {
        if (isalpha(text[i])) {
            word += text[i];
        } else if (!isalpha(text[i]) && word != "") {
            ++wordCount[word];
            word = "";
        }
    }
    
    vector<pair<string, int> > 

    std::copy(map.begin(), map.end()),
        [](const pair& l, const pair& r) {
            if (l.second != r.second)
        }
    int wordCountLength = wordCount.size();
    for (std::map <string, int>::iterator it = wordCount.begin(); it != wordCount.end(); ++it) {
        cout << it -> first << " " << it -> second << endl;
    }
    return 0;
}