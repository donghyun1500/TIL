#알고리즘 문제풀이 5일차!!!!!#

https://www.acmicpc.net/problem/10773
문제 링크 참조!!!


n = int(input())           # n변수로 정수를 입력받는다.
stack = []                 #스택 값을 받을수 있게 빈 배열 하나를 만든다.

for i in range(n):         #for문으로 num변수를 설정해서 그 다음 정수들을 받음.
    num = int(input())
    if num == 0:           #받은 값이 0인 경우 배열에서 값을 하나 뺸다.pop
        stack.pop()      #원래는 스택이 비어 있으면 pop을 할수 없어서 예외처리를 해야 하지만
    else:                  #이 문제에서는 항상 pop을 보장한다고 했으므로 예외처리 nono!!!
        stack.append(num)   #받은 값이 0이 아닌경우 배열에 추가!!!
print(sum(stack))


#예제 입력 2를 예시로 들자면 n변수로 정수 10을 입력받아서 for문을 통해 10번 반복을 하고
#num 변수에 1부터 10개의 정수를 입력받음.


