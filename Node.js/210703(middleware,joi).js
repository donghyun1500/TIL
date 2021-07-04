

// JWT란??
// cost token = jwt.sing({userId: user.userId}, "secret key")
// 단방향 암호화 양방향 암호화의 차이점??
// 단방향: 평문을 암호문으로 암호화 하는것은 가능하지만 암호문을 평문으로 복호화하는 것은 불가능한 암호화 방법.
// 대표적인 경우 "패스워드"
// 양방향: 암호화된 암호문을 평문으로 복호화할 수 있는 암호화 방법.
// 대칭키와 비대칭키 암호화가 여기에 속함.
// 대칭키 비대칭키 관련은 이 URL:https://galid1.tistory.com/338 참조.



// 사용자 인증 미들웨어 구현하는법?
// 로그인이 성공했을때 받아온 토큰을 HTTP header에 Authorization: Bearer JWT토큰내용 이런식으로 넣고 있다.
// res.locals.user = user는 무슨 코드?
// 토큰에 담긴 userId로 해당 사용자가 실제로 존재하는지 확인을 하였고, 이 미들웨어를 사용하는 라우터에서는 굳이 데이터베이스에서 
// 사용자 정보를 가져오지 않게 할수 있도록 express가 제공하는 안전한 변수에 담아두고 언제나 꺼내서 사용할 수 있게 작성한것이다.


// Validation 라이브러리인 joi를 이용하여 검증하기. 
const postUsersSchema = Joi.object({
    nickname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
});

router.post('/', async (req,res) =>{
	try { 
        		const { nickname,email,password,confirmPassword } = await postUsersSchema.validateAsync(req.body);
	} catch (err) {
        		res.status(400).send({
            		errorMessage:""
        		})
    	}
	
})

// Sequalize로 구현하기.
// 모델 생성 명령어.
// npx sequelize model:generate --name .. --attributes....
// api수정 예시
// const { Op } = require("sequelize")
// const {  .. } = require("./..")
// 그리고 where: {}도 써줘야함.
// userId를 가지고 데이터베이스에서 사용자 정보를 불러오도록 하는법.
// findByPK를 사용하자!!!!!
