// Array 
// 1. Declaration
// 2. Index position
// 3. Looping over an array
// a. for
// b. for of
// c. forEach
// 4. Addtion, deletion, copy
// a. push   마지막 인덱스 이후에 추가
// b, pop	마지막 인덱스 제거
// c. unshift	맨 앞 인덱스 제거  (push,pop이 shift보다 훨씬 빠름)
// d. shift	맨 앞 인덱스 추가	
// e. splice 원하는 index 데이터 remove하고 index에 데이터 추가도 가능
// f. combine two arrays 두가지 arrays 합함.
// 5. Searching
// a. indexOf
// b. includes:있으면 true 없으면 false
// c. lastIndexOf: 마지막 인덱스 확인



// Q1. make a string out of an array
{
  const fruits = ['apple', 'banana', 'orange'];
  const result = fruits.join(',');
  console.log(result);
}

// Q2. make an array out of a string
{
  const fruits = '🍎, 🥝, 🍌, 🍒';
  const result = fruits.split(',');
  console.log(result);
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
  const array = [1, 2, 3, 4, 5];
  const result = array.reverse();
  console.log(result);
  console.log(array);
}

// Q4. make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];
  const result = array.slice(2,5);
  conssole.log(result);
  console.log(array);
}

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

// Q5. find a student with the score 90
{
  const result = student.find((student) => student.score === 90;
  console.log(result);
}

// Q6. make an array of enrolled students
{
  const result = students.filter((student) => student.enrolled);
  console.log(result);
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
  const result = students.map((student) => student.score);
  console.log(result);
}

// Q8. check if there is a student with the score lower than 50
{
  console.clear();
  const result = students.some((student) => student.score <50);
  console.log(result);
  
  const result2 = !students.every((student) => student.score >=50);
  console.log(result2);
}

// Q9. compute students' average score
{
  console.clear();
  const result = students.reduce((prev, curr) => {
  console.log(prev);
  console.log(curr);
  return prev + curr.score;
 }, 0);
  console.log(result);
}

{
  const result = students.reduce((prev, curr) => prev+curr.score, 0);
  console.log(result / students.length);
}
// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
  const result = students
  .map(student => student.score)
  .join();
  consoel.log(result);
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
  const result = students.map(student => student.score)
  .sort((a,b) => a-b)
  .join();
  console.log(result);
}
