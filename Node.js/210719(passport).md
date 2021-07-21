# Passport 모듈 알아보기!

- 참조URL: https://lgphone.tistory.com/95
- 공식문서 : http://www.passportjs.org/

Passport란?✈

말그대로 여권 같은 역할의 로그인 모듈이다. local에서 회원가입 및 로그인도 가능하고 우리가 사용하는 SNS로도 로그인이 가능하다.

- 전체 과정

1. 라우터를 통해 로그인 요청이 들어옴.
2. 라우터에서 passport.authenticate 메서드 호출
3. 로그인 전략 수행
4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
5. req.login 메서드가 passport.serializeUser 호출
6. req.session에 사용자 아이디만 저장
7. 로그인 완료

로그인 이후

1. 요청이 들어옴
2. 라우터에 요청이 도달하기 전에 passport.session 미들웨어가 passport.deserializeUser 메서드 호출
3. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
4. 조회된 사용자 정보를 req.user에 저장
5. 라우터에서 req.user 객체 사용 가능

- 구현 방법

Passport와 관련된 패키지들을 설치한다.
(passport, passport-local,passport-kakao,...등등)

# 1. passport 모듈을 메인서버와 연결 시킵니다.(app.js나 index.js등등)

     ...
     const passport = require('passport');
     ...
     const passportConfig = require('./passport');
     ...
     const app = express();
     passportConfig();
     ...
     app.use(passport.initialize());
     app.use(passport.session());
     ...
     
passport.initialize 미들웨어는 요청(req 객체)에 passport 설정을 심고, passport.session 미들웨어는 req.session 객체에 passport를 저장합니다.
req.session 객체는 express-session에서 생성하는 것이므로 passport 미들웨어는 express-session 미들웨어볻 뒤에 연결되어야 한다.

# 2. passport 폴더 내부에 index.js 파일을 만들고 passport 관련 코드를 작성한다.

       const passport = require('passport');
       const local = require('./localStrategy');
       const kakao = require('./kakaoStrategy');
       const User = require('../models/user');

       module.exports = () => {
           passport.serializeUser((user, done) => {
               done(null, user.id);
           });

           passport.deserializeUser((id, done) => {
               User.findOne({ where: { id } })
                   .then(user => done(null, user))
                   .catch(err => done(err));
           });

           local();
           kakao();
        }
        
이 모듈 내부의 핵심은 passport.serializeUser와 passport.deserializeUser가 Passport를 이해햐는 핵심이다.

serializeUser는 로그인 시에만 실행되며, req.session(세션) 객체에 어떤 데이터를 저장할지 정하는 메서드.

매개변수로 user를 받고나서, done 함수에 두번째 인수로 user.id를 넘기고 있다.

done 함수의 첫번째 인수는 에러 발생 시 사용, 두번째 인수에는 저장하고 싶은 데이터를 넣는다.

deserializeUser는 매 요청시 실행.

passport.session 미들웨어가 이 메서드를 호출 -> serializeUser의 done의 두번쨰 인수로 넣었던 데이터가 deserializeUser의 매개변수가 됨.

아이디를 받아 데이터베이스에서 사용자 정보를 조회해서 req.user에 저장하므로 req.user를 통해 로그인한 사용자의 정보를 가져올 수 있다.

# 3. 로컬 로그인 구현하기.

       exports.isLoggedIn = (req, res, next) => {
           if (req.isAuthenticated()) {
               next();
           } else {
               res.status(403).send('로그인 필요');
           }
       };

       exports.isNotLoggedIn = (req, res, next) => {
           if (!req.isAuthenticated()) {
               next();
           } else {
               const message = encodeURIComponent('로그인한 상태입니다.');
               res.redirect(`/?error=${message}`);
           }
       };
       
우리가 설치한 passport-local 모듈은 로그인에 해당하는 전략이므로 회원가입은 따로 만들어야함.

회원가입과 로그인시 해당 라우터에 접근 권한을 제어하는 미들웨어가 필요하다.

미들웨어를 만들때 passport가 req객체에 추가해주는 req.isAuthenticated 메서드를 사용해보자!

    exports.isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(403).send('로그인 필요');
        }
    };

    exports.isNotLoggedIn = (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        } else {
            const message = encodeURIComponent('로그인한 상태입니다.');
            res.redirect(`/?error=${message}`);
        }
    };
    
로그인 중이면 req.isAuthenticated()가 true이고 그렇지 않으면 false입니다.

로그인 여부를 이 메서드로 파악해서 라우터에 로그인 여부를 검사하는 미들웨어를 넣어 걸러낼 수 있습니다.

# 4. 회원가입,로그인,로그아웃 라우터 작성해보기

       const express = require('express');
       const passport = require('passport');
       const bcrypt = require('bcrypt');
       const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
       const User = require('../models/user');

       const router = express.Router();

       router.post('/join', isNotLoggedIn, async (req, res, next) => {
           const { email, nick, password } = req.body;
           try {
               const exUser = await User.findOne({ where: { email } });
               if (exUser) {
                   return res.redirect('./join?error=exist');
               }
               const hash = await bcrypt.hash(password, 12);
               await User.create({
                   email,
                   nick,
                   password: hash,
               });
               return res.redirect('/');
           } catch (err) {
               console.error(err);
               return next(err);
           }
       });

       router.post('/login', isNotLoggedIn, (req, res, next) => {
           passport.authenticate('local', (authError, user, info) => {
               if (authError) {
                   console.error(authError);
                   return next(authError);
               }
               if (!user) {
                   return res.redirect(`/?loginError=${info.message}`);
               }
               return req.login(user, (loginError) => {
                   if (loginError) {
                       console.error(loginError);
                       return next(loginError);
                   }
                   return res.redirect('/');
               });
           })(req, res, next); //미들웨어 내의 미들웨어에는 (req, res, next) 를 붙여준다.
       });

       router.get('/logout', isLoggedIn, (req, res) => {
           req.logout();
           req.session.destroy();
           res.redirect('/');
       });

       module.exports = router;
       
1. 회원가입시 같은 이메일이 있으면 조회 후 회원가입 페이지로 돌려보냅니다. 단, 주소 뒤에 에러를 쿼리스트링으로 표시합니다.

없다면 비밀번호를 암호화하고 사용자 정보를 생성합니다.

암호호시 bcrypt 모듈을 사용하였고, hash메서드를 사용하면 손쉽게 비밀번호를 암호화 할 수 있습니다. 두번째 인수는 pbkdf2의 반복 횟수와 비슷한 기능을 합니다.

12 이상 추천! 프로미스를 지원하는 함수이므로 await를 사용했습니다.

2. 로그인 요청이 들어오면 passport.authenticate('local') 미들웨어가 로컬 로그인 전략을 수행합니다.

미들웨어인데 라우터 미들웨어 안에 들어 있고, 미들웨어에 사용자 정의 기능을 추가하고 싶을 때 이렇게 하면 된다. 내부 미들웨어에 (req,res,next)를 인수로 제공해서 호출하면 됩니다.

authenticate 메서드의 콜백 함수가 실행되고 첫번쨰 매개변수(autherr) 값이 있다면 실패! 두번쨰 매개변수 값이 있다면 성공-> req.login 메서드를 호출합니다!

passport는 req 객체에 login과 logout 메서드를 추가합니다. req.login은 passport.serializeUser를 호출하고 req.login에 제공하는 user 객체가 serializeUser로 넘어갑니다!

3. 로그아웃 req.logout 메서드는 req.user 객체를 제거하고 req.session.destory는 req.session 객체의 내용을 제거합니다!

# 5. 로그인 전략 구현하기

     const passport = require('passport');
     const LocalStrategy = require('passport-local').Strategy;
     const bcrypt = require('bcrypt');

     const User = require('../models/user');

     module.exports = () => {
         passport.use(new LocalStrategy({
             usernameField: 'email',
             passwordField: 'password'
         }, async (email, password, done) => {
             try {
                 const exUser = await User.findOne({ where: { email } });
                 if (exUser) {
                     const result = await bcrypt.compare(password, exUser.password);
                     if (result) {
                         done(null, exUser);
                     } else {
                         done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                     }
                 } else {
                     done(null, false, { message: '가입되지 않은 회원입니다.' });
                 }
             } catch (err) {
                 console.error(err);
                 done(err);
             }
       }));
     };

passport-local 모듈에서 Strategy생성자를 불러와서 구현하였다.

1.LocalStrategy 생성자의 첫번째 인수로 주어진 객체는 전략에 관한 설정을 하는 곳입니다.

usernameField, passwordField에는 일치하는 로그인 라우터의 req.body 속성명을 적으면 됩니다.

2. 실제 전략을 수행하는 async 함수입니다. LocalStrategy 생성자의 두번쨰 인수로 들어갑니다.

첫번째 인수에서 넣어준 email과 password는 각각 async 함수의 첫번쨰와 두번째 매개변수가 됩니다. 세번째 매개변수인 done 함수는 passport.authenticate의 콜백 함수 입니다.

이걸 정리하자면 사용자 데이터베이스에서 일치하는 이메일이 있는지 찾은 후, 있다면 bcrypt의 compare 함수로 비밀번호를 비교하고 일치한다면 done함수 두번째 인수로 사용자 정보를 넣어 보냅니다.

두번째 인수를 사용하지 않는 경우는 로그인에 실패했을 때뿐입니다. done 함수의 첫번쨰 인수를 사용하는 경우는 서버 쪽에서 에러가 발생했을 떄고,

세번째 인수를 사용하는 경우는 사용자 정의 에러가 발생했을 때입니다.(비밀번호 불일치, 존재하지 않는 회원등등)

done이 호출된 후에는 다시 passport.authenticate의 콜백 함수에서 나머지 로직이 실행됩니다.!

참조: Node.js 교과서 라고함.
