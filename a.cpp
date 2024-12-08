#include <iostream>
#include <vector>
using namespace std;

struct Point {
    int x, y;
};

int main() {
    vector<Point> points;

    Point p1;
    p1.x = 1;
    p1.y = 2;
    points.push_back(p1);

    Point p2;
    p2.x = 3;
    p2.y = 4;
    points.push_back(p2);

    Point p3;
    p3.x = 5;
    p3.y = 6;
    points.push_back(p3);

    cout << points[1] << " " << points[1] << endl;

    return 0;
}
