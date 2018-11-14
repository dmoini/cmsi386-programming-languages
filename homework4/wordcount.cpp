#include <iostream>
#include <string>
#include <map>
#include <vector>

using namespace std;

template<typename T1, typename T2>
struct compareCount {
    typedef pair<T1, T2> type;
    bool operator()(type const& a, type const& b) const {
        return a.second > b.second;
    }
};

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
    
    vector<pair<string, int> > wordCountVector(wordCount.begin(), wordCount.end());
    sort(wordCountVector.begin(), wordCountVector.end(), compareCount<string, int>());

    int wordCountSize = wordCountVector.size();
    for(int i = 0; i < wordCountSize; i++) {
        cout << wordCountVector[i].first << " " << wordCountVector[i].second << endl;
    }
    return 0;
}