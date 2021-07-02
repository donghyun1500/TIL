
// 삼항 연산자란??
// ex)

else if (done !== undefined) {
        todo.doneAt = done ? new Date() : null;
  
// 위에 구문을 나열해보면

if (done) {
	todo.doneAt = new Date();
} else {
	todo.doneAt = null;
}
  
// 이렇게 된다.
  

// 자바스크립트 삼항 연산자는 참/거짓에 따라 선택적으로 실행되는 조건문이다.
// 삼항연산자는 조건문 ? 선택문1:선택문2 로 구성된다. 
// 조건문이 참이면 선택문1을 실행하고, 조건문이 거짓이면 선택문 2를 실행한다.

//  조건문 ? 선택문1 : 선택문2
// Boolean() ? 선택문 1 : 선택문2

//  이런식으로 작성한다. 알고 있으면 유용하다고 하니 알아놓자!!!!!!

  
  
//   참고한 url: https://velog.io/@daybreak/Javascript-%EC%82%BC%ED%95%AD%EC%97%B0%EC%82%B0%EC%9E%90

 
  
