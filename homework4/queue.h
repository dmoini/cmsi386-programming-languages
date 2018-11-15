#include <cassert>
#include <iostream>
using namespace std;

template <typename T>
class Queue {
    struct Node {
        T data;
        Node* next;
    };
    
private:
    Node* head;
    Node* tail;
    int size;

public:
    // Default Constructor
    Queue(): head(nullptr), tail(nullptr), size(0) {}

    // Destructor
    ~Queue() {
        while (head != nullptr) {
            dequeue();
        }
    }

    // Move constructor
    Queue(Queue&& other): head(other.head), tail(other.tail), size(other.size) {
        other.head = nullptr;
        other.tail = nullptr;
        other.size = 0;
    }

    // Move assignment operator.
    Queue& operator=(Queue&& other) {
        if (&other != this) {
            head = other.head;
            tail = other.tail;
            size = other.size;
            other.head = nullptr;
            other.tail = nullptr;
            other.size = 0;
        }
        return *this;
    }

    friend ostream& operator << (ostream& os, const Queue& q) {
        os << "Head node: " << q.head -> data << "\nTail data: " << q.tail -> data << "\nQueue size: " << q.size << endl;
        return os;
    }

    int getSize() {
        return size;
    }
    
    void enqueue(T newData) {
        Node *newNode = new Node {newData, nullptr};
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            tail -> next = newNode;
            tail = newNode;
        }
        size++;
    }

    T dequeue() {
        if (size == 0) {
            throw underflow_error("Cannot dequeue an empty Queue.");
        }
        Node* toDelete = head; 
        T data = head -> data;
        head = head -> next;
        delete toDelete;
        size--;
        return data;
    }
};