# splice()
- 기존 배열을 변형하고 새로운 배열을 반환합니다.
- splice(start,deleteCount,items...)
- 배열의 start부터 deleteCount만큼 요소를 제거한 다음 그 자리에 items를 삽입한다.
- 
## const array = [1,2,3,4,5,6];
## array.splice(0,4); // [1,2,3,4]
## array // [5,6]

# slice()
- 기존 배열을 변형하지 않고 기존 요소를 참조하는 새로운 배열을 만들어 리턴합니다.
- slice(begin,end)
- 배열 begin부터 end까지 잘라낸다
## const array = [1,2,3,4,5,6];
## array.slice(0,4) // [1,2,3,4]
## array // [1,2,3,4,5,6]

# split()
- 문자열을 delimeter 기준으로 잘라서 배열로 만든 후 배열을 리턴합니다.
- split(delimeter)
## const a = '1,2,3,4,5'
## a.split(','); // ["1","2","3","4","5"]
