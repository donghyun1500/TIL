
// -socket연결 여부 확인하기.
// 공식 문서를 참조하였다!(url:https://socket.io/docs/v3)

const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("새로운 소켓이 연결됐어요!");

  socket.on("message", (data) => {
    console.log(data);
  });
});

// -데이터를 보내는 방법.
// socket.send("메세지값")

io.on("connection", (socket) => {
  socket.send("Hello!");

  socket.on("message", (data) => {
    console.log(data);
  });
});

// -커스텀 이벤트 핸들링 코드 추가하기.
// socket.emit("이벤트이름", "데이터") 이렇게 함수를 호출하면 특정 이벤트에 특정 데이터를 보낼 수 있게 됩니다.
// socket.emit("customEventName", "this is custom event data");

// -express와 같이 사용해보기.
const express = require("express");
const { createServer } = require("http");

const app = express();
const http = createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// http 서버 객체를 원래 있던 코드에서 "3000"을 지우고 대신 넣어주면 express와 socket.io를 동시에 사용할 수 있습니다!
// 기존처럼 API를 개발하거나 프론트엔드 파일을 서빙하는 용도로 사용할 수 있고, io객체도 기존처럼 클라이언트와 데이터를 주고 받는 용도로 사용이 가능하다!
