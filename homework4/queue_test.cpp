#include <iostream>
#include <string>
#include <cassert>
#include "queue.h"
using namespace std;

int destructorCalls = 0;
void testEmptyQueue() {
    Queue<string> q;
    assert(q.getSize() == 0);
}

void testEnqueue() {
    Queue<string> q;
    q.enqueue("Python");
    q.enqueue("is");
    q.enqueue("better");
    assert(q.getSize() == 3);
}

void testDequeue() {
    Queue<string> q;
    q.enqueue("Python");
    q.enqueue("is");
    q.enqueue("better");
    assert(q.getSize() == 3);
    assert(q.dequeue() == "Python");
    assert(q.dequeue() == "is");
    assert(q.dequeue() == "better");
}

void testEnqueueAndDequeueAndSize() {
    Queue<string> q;
    assert(q.getSize() == 0);
    q.enqueue("Python");
    assert(q.getSize() == 1);
    q.enqueue("is");
    assert(q.getSize() == 2);
    q.enqueue("better");
    assert(q.getSize() == 3);
    assert(q.dequeue() == "Python");
    assert(q.getSize() == 2);
    assert(q.dequeue() == "is");
    assert(q.getSize() == 1);
    assert(q.dequeue() == "better");
    assert(q.getSize() == 0);
}

void testDequeueOnEmptyQueue() {
    Queue<string> q;
    try {
        q.dequeue();
        assert(false);
    } catch (const underflow_error& ue) {
        assert(true);
    } catch (...) {
        assert(false);
    }
}

void testDestructor() {
    Queue<string> test1;
    Queue<string> test2;
    Queue<string> test3;
}

void testMoveOperator() {

}
int main() {
    testDestructor();
    assert(destructorCalls == 3);
    testEmptyQueue();
    testEnqueue();
    testDequeue();
    testEnqueueAndDequeueAndSize();
    testDequeueOnEmptyQueue();
    cout << "All tests passed :)\n";
}