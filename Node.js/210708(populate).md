# 공식문서 참조(https://mongoosejs.com/docs/populate.html)

# Population 이란??

Population는 문서의 경로를 다른 컬렉션의 실제 문서로 자동으로 바꾸는 방법입니다. 

예를들어 문서 사용자 ID를 해당 사용자의 데이터로 바꿉니다. 

Mongoose는 우리를 도울 수있는 Population을 가지고 있습니다. 

우리는 우리의 스키마에 ref를 정의하고 mongoose는 해당 ref를 사용하여 다른 컬렉션의 문서를 찾습니다.

# population의 몇 가지 사항

- pupulate가 문서에 없다면 필드는 null이다.

- 문서 배열의 경우 문서가 없으면 빈 배열이다.

- 여러 필드를 populate 하기위해 populate를 묶을 수 있습니다.

- 두 개의 populate이 동일한 필드를 populate하면 두 번째 populate가 첫 번째 populate를 재정의합니다.


이어서 바로 예시를 통해 접근해보자!!!!!
