#include <stdio.h>
#include <stdlib.h>

/* Basit BFS ile engelleri asarak hedefe giden yolu bulan ornek kod.
   Bu kod WebAssembly'e cevrilerek tarayici tarafinda da kullanilabilir. */

typedef struct { int x, y; } Point;

int bfs(char board[5][5], Point start, Point goal) {
    int visited[5][5] = {0};
    Point queue[25];
    int head = 0, tail = 0;
    queue[tail++] = start;
    visited[start.y][start.x] = 1;

    int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
    while (head < tail) {
        Point p = queue[head++];
        if (p.x == goal.x && p.y == goal.y) return 1; // bulundu
        for (int i=0;i<4;i++) {
            int nx = p.x + dirs[i][0];
            int ny = p.y + dirs[i][1];
            if (nx<0 || ny<0 || nx>=5 || ny>=5) continue;
            if (board[ny][nx] == '#') continue; // engel
            if (!visited[ny][nx]) {
                visited[ny][nx] = 1;
                queue[tail++] = (Point){nx, ny};
            }
        }
    }
    return 0; // yol yok
}

int main() {
    char board[5][5] = {
        {'S','.','.','#','.'},
        {'.','#','.','#','.'},
        {'.','.','.','#','.'},
        {'B','#','.','.','.'},
        {'.','.','.','#','G'}
    };
    Point start = {0,0};
    Point goal = {4,4};
    if (bfs(board, start, goal))
        printf("Yol bulundu!\n");
    else
        printf("Yol bulunamadi.\n");
    return 0;
}
