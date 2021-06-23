########## 알고리즘 문제풀이 10일차!!!!! ##########


# 문제 : 1002번:터렛
# 주제 : 기본 수학2
# 난이도 : 중
# 문제 설명이 너무길어서 url을 참조해 주시길 바랍니다. <참조 : https://www.acmicpc.net/problem/1002>
# 문제 해설 참고 : https://velog.io/@junyp1/%EB%B0%B1%EC%A4%80-1002-Python-%ED%84%B0%EB%A0%9B


import sys, math

input = sys.stdin.readline

t = int(input())

for i in range(t):
    x1, y1, r1, x2, y2, r2 = map(int, input().split())
    distance = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
    # distance = (math.sqrt(math.pow(x1-x2,2)+math.pow(y1-y2,2)))  #위 식과 동일한 결과, math 라이브러리 sqrt(x)(x제곱근 반환(루트 씌운 값을 반환)) pow(x,y) x의 y의 거듭제곱

    if distance == 0:
        if r1 == r2:
            print(-1)

        else:
            print(0)


    else:
        if distance > r1 + r2 or distance < abs(r1 - r2):  # abs함수는 절대값!
            print(0)

        elif distance == r1 + r2 or distance == abs(r1 - r2):  #외접,내접(r2==r+r1)
            print(1)

        else:
            print(2)
