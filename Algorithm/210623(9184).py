########## 알고리즘 문제풀어 10일차!!!!! ##########

#문제 : 9184번:신나는 함수 실행
#난이도 : 중
#주제 : 동적계획법(dp)
#문제 설명 : 재귀함수 w(a,b,c)에 세 정수 a,b,c가 주어졌을때 w(a,b,c)를 출력하라! 

import sys

input = sys.stdin.readline


def w(a, b, c):
    if a <= 0 or b <= 0 or c <= 0:
        return 1
    if a > 20 or b > 20 or c > 20:
        return w(20, 20, 20)
    if dp[a][b][c]:                    #메모이제이션!!!!!
        return dp[a][b][c]
    if a < b < c:
        dp[a][b][c] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c)
        return dp[a][b][c]
    dp[a][b][c] = w(a - 1, b, c) + w(a - 1, b - 1, c) + w(a - 1, b, c - 1) - w(a - 1, b - 1, c - 1)
    return dp[a][b][c]


dp = [[[0] * 21 for _ in range(21)] for _ in range(21)]
while True:
    a, b, c, = map(int, input().split())
    if a == -1 and b == -1 and c == -1:
        break
    print(f'w({a}, {b}, {c}) = {w(a, b, c)}')
