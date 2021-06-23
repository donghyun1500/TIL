########## 알고리즘 문제풀이 10일차!!!!! ##########

# 문제 : 백준 2798 블랙잭
# 주제 : 브루트포스
# 난이도 : 중
# 문제 설명 : N장의 카드 중 3장을 뽑아 그 합이 M을 넘지 않고 최대한 M과 가까워야 한다.

#1
n, m = map(int, input().split())
cards = list(map(int, input().split()))
result = 0

for i in range(N):
    for j in range(i+1, N):
        for k in range(j+1, N):
            if cards[i] + cards[j] + cards[k] <= M:
                result = max(result, cards[i] + cards[j] + cards[k]) # 현재 result와 비교해서 result에는 항상 큰 값이 담길 수 있도록 한다.

print(result)


#2
n,m = map(int,input().split())
cards = list(map(int,input().split()))
result = []

for i in range(n):
    for j in range(i+1,n):
        for k in range(j+1,n):
            sum = cards[i]+cards[j]+cards[k]
            if sum <= m:
                result.append(sum)

print(max(result))

