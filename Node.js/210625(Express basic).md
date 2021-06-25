# Express - Routing

url주소 뒷부분에 path 정보에 따라 다른 결과가 보여진다.

*예시) 

app.get('/', (req, res) => {
  
  res.send('Hello World!')

})
path가 '/'일 때, 뒤에 아무것도 안붙었을떄 Hello World!를 응답함.

app.get('/hi', (req, res) => {
  
  res.send('Hi. This is express router')

})
'/hi'에 접속하면 다른 내용인 Hi,This is express router가 실행됨.

# http method

router가 경로를 구분하는 요소로 url 주소 외에 http method라는 부분이 있습니다.

대표적으로 GET,POST,DELETE 등등이 있다.

# Express - Router 객체 사용하기

Router 객체를 제공해서 비슷한 route끼리 묶어서 파일로 분리 시키는 방법.

방법은 routes 폴더를 만들고 그 안에 .js 파일을 생성하고 나서 기존 index.js파일을 수정한다.

var express = require('express');

var router = express.Router();

const A = require('./routes/a')

app.use('/a',A);

기존 index.js에 있는

app.get('/...)은 삭제!!!

# Exporess - Middleware
        
우리가 매 route를 생성할 때마다 만약에 공통된 처리를 하고 싶은 경우
        
예를 들어, 요청이 들어올 떄마다 이 요청이 어떤 유저의 요청인지 인증검사를 해야할때!
        
route를 하나 만들 때마다 매번 유저 인증을 확인하는 코드를 넣어야 할 것이다.
        
이런 반복되는 작업들,혹은 우리가 정의한 route에 오기 전에 중간에서 미리 처리해야할 것들을 정의해둔 것을 미들웨어라고 한다.  
        
*예시)

app.use((req, res, next) => {
  
  console.log(req);
  
  next();

});

app.use라고 하는 것을 미들웨어를 사용하면 어떤 요청이 들어오던간에 req를 로그로 찍고 나서 실제 route로 전달하게 된다.

*추가)
POST 메서드의 body정보를 전달할떄, 복잡한 절차가 필요한데 이 데이터를 바로 사용하기 쉽게 가공해주는 미들웨어가 있는데 이게 express.json()이다.

app.use(express.urlencoded({extended: false}))

app.use(express.json())

static폴더를 만들어서 이미지,동영상같은 파일을 제공할수도 있다.

app.use(express.static('public'));       <- 이게 사용법이다.

# 템플릿 엔진이란?

일관된 양식의 HTML 파일에다 그떄그때 원하는 데이터를 동적으로 삽입해서 우리가 원하는 형태의 홈페이지를 만들수 있게 하는 것이다.

템플릿 엔진의 장점

1. 많은 코드를 줄일 수 있다.

2. 재사용성이 높다.

3. 유지보수에 용이하다.

.ejs파일을 사요한다.

ejs파일을 추가하고 그곳을 연결하는 router 추가 하는 법.

app.get('/path', (req, res) => {
    
    res.render('파일명');
})
