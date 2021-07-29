프론트 팀원분의 부탁으로 오늘 jwt 토큰의 하나인 refresh token을 공부하게 되었다..

이 부분을 정리해 보자!!!!! 추가로 구현할수 있으면 너무 좋을꺼 같다!!!!!

# Refresh Token이란?

refresh token을 알기전에 인증 구현방식이 무엇이 있는지 정리해보자.

1. 세션방식

![image](https://user-images.githubusercontent.com/85468215/127512160-a1538b39-3bd3-42ea-b5ab-63f2f59ef43f.png)
출처 :  https://tansfil.tistory.com/58

- 클라이언트에서 로그인을 요청.
- 서버는 세션을 만들어 세션 ID를 HTTP로 클라이언트에 보내 준다.
- 클라이언트는 세션 ID를 쿠키에 저장한다.
- 인증이 필요한 경우 쿠키의 세션 ID와 함께 데이터를 요청한다.
- 서버는 그 세션 ID를 검증한 후 인증을 완료한다.

[장점]
- 세션 ID 변질 시 해당 세션 삭제 가능함.
- 브라우저 저장에 용이

[단점]
- 세션 저장소 필요
- 로그인 유지시 필요 공간이 많아짐.

2. Token방식(JWT등)

![image](https://user-images.githubusercontent.com/85468215/127512790-dd6ae88b-be82-43da-804f-92b4a8dda3b8.png)
출처: https://tansfil.tistory.com/58

- 클라이언트에서 로그인 요청.
- 서버는 D에서 사용자 확인 후, Token 발급
- 클라이언트에서 Token과 함께 데이터를 요창
- 서버는 Token을 검증한 후, 인증을 완료한다.
- 데이터를 넘겨준다.

[장점]
- Back,Front 나누기에 편리.
- 확장성이 뛰어나고 추가 저장소가 필요하지 않음

[단점]
- JWT안에 담을 수 있는 정보가 제한적(payload에 있는 내용은 디코딩 할 경우 볼 수 있음)
- 정보 탈취 가능성 존재( 유효기간 안에 계속 사용 가능하고 해당 토큰을 중간에 삭제할수가 없다.)

2-1 Access Token, Refresh Token

![image](https://user-images.githubusercontent.com/85468215/127513424-ca4e730e-7a32-4400-9382-9dda0e22cc85.png)
출처: https://tansfil.tistory.com/58

- 클라이언트에서 로그인 요청.
- 서버는 DB에서 사용자 확인 후, Access Token, Refresh Token 발급.
- 두개의 토큰을 클라이언트는 안전한 곳에 저장.
- 클라이언트에서 Access Token과 함께 데이터 요청
- 서버는 Token이 유효한지 검증 후, 인증 완료하고 데이터를 넘겨줌.
- 만료된 Access Token으로 데이터를 요청
- 서버에서는 만료를 확인하고, 클라이언트에 보냄
- 클라이언트는 Refresh Token으로 서버에 Acess Token 발급을 요청.
- Refresh Toke 확인 후, 새로운 Access Token과 Refresh Token을 발금함.

[장점]
- Access Token만 있을떄보다 안전.

[단점]
- 구현이 복잡

참고 URL: https://tansfil.tistory.com/58

     app.post('/login', (req, res) => {
         // Authenticate User

         const username = req.body.username
         const user = { name: username }

         const accessToken = generateAccessToken(user)
         const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
          refreshTokens.push(refreshToken)
         res.json({ accessToken: accessToken, refreshToken: refreshToken})
     })

     function generateAccessToken(user) {
         return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
     }
     
     
     app.post('/token', (req, res) => {
         const refreshToken = req.body.token
         if (refreshToken == null) return res.sendStatus(401)
         if (refreshTokens.includes(refreshToken)) return res.sendStatus(403)
         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
             if (err) return res.sendStatus(403)
             const accessToken = generateAccessToken({ name: user.name })
             res.json({ accessToken: accessToken })
         })
     })
     
     function authenticateToken(req, res,nex) {   // 유효성 검증!
         const authHeader = req.headers['authorization']
         const token = authHeader && authHeader.split(' ')[1]
         if (token == null ) return res.sendStatus(401)

         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
             if (err) return res.sendStatus(403)
             req.user = user
         })
     }



