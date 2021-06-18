##########알고리즘 문제풀이 5일차!!!!!##########

#문제는 이 링크를 확인할것.!

https://www.acmicpc.net/problem/10828
  
  import sys

n = int(sys.stdin.readline())

stack = list()

for i in range(n):
    a = sys.stdin.readline().split()

    if a[0] == "push":
        stack.append(int(a[1]))

    elif a[0] == "pop":
        if not stack:
            print('-1')
        else:
            print(stack[-1])
            stack.pop()

    elif a[0] == "size":
        print(len(stack))

    elif a[0] == "empty":
        if not stack:
            print(1)
        else:
            print(0)
    elif a[0] == "top":
        if not stack:
            print(-1)
        else:
            print(stack[-1])
