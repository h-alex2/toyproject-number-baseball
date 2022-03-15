const startBtn = document.querySelector(".startBtn");
const inputContainer = document.querySelector(".input-container");
const input = document.querySelector("input");

// 화면에 표시
const resultNumLabel = document.querySelectorAll(".resultNum")
const userNumLabel = document.querySelectorAll(".userNum")

const ballLabel = document.querySelector(".ball");
const strikeLabel = document.querySelector(".strike");
const retryLabel = document.querySelector(".retry-label");
const outYellow = document.querySelector(".out");


let randomNumber;
let gameNumber = [];
let userNumber = [];
outYellow.classList.remove("out");
inputContainer.hidden = true;
let strike = 0;
let ball = 0;
let tryNumber = 0;


startBtn.addEventListener("click", start);
//START 버튼 클릭
function start(){
	startBtn.hidden = true;
	if(userNumber.length > 0){
		for(let i=0; i<10; i++){
			userNumLabel[i].textContent = "";
			resultNumLabel[i].textContent = "";
			ballLabel.textContent= "";
			strikeLabel.textContent= "";
		}
		retryLabel.textContent = "";
	}

	gameNumber = [];

	for(let i=0; i<3; i++){
		randomNumber = Math.floor(Math.random() * 10);
		if(gameNumber[i-1] !== randomNumber){
			gameNumber.push(randomNumber);
		}else {
			if(i-2 === randomNumber){
				(randomNumber===9 ? 0 : randomNumber+1)
			} else{
				gameNumber.push(randomNumber===0 ? 9 : randomNumber-1);
			}
		}
	}
	console.log("gameNumber : " + gameNumber);
	inputContainer.hidden = false;
}

//게임 끝난 후 실행되는 RESTART 함수
function reStart() {
	startBtn.hidden = false;
	strike = 0;
	ball = 0;
	tryNumber = 0;
}

//유저 숫자 입력 후 버튼 누르면 실행되는 함수
function btnClick() {
	userNumber = [];
	if(input.value.length > 3 || input.value.length < 3){
		alert("3자리 숫자를 입력하세요");
	} else if(input.value === ""){
		alert("3자리 숫자를 입력하세요");
	} else if(input.value.length === 3){
		tryNumber++;
		for(let i=0; i<3; i++){
			userNumber.push(parseInt(input.value[i]));
		}
		input.value = "";
		console.log("tryNumber : " + tryNumber)
		game();
		console.log("userNumber : " + userNumber)
	}
}

//엔터키 눌렀을 때 똑같이 입력되도록
input.addEventListener("keydown", function(e){
	if(e.key  === "Enter"){
		btnClick();
	}
});

//게임 끝내는 함수
function rull() {
	if(tryNumber === 10){
		inputContainer.hidden = true;
		retryLabel.textContent = "실패! 다시 도전하시겠습니까?"; //label
		reStart();
	} else if(strike === 3){
		inputContainer.hidden = true;
		retryLabel.textContent = "성공! 다시 도전하시겠습니까?"; //label
		reStart();
	}
}

//게임 실행 후 카운트되는 함수
function game() {
	strike = 0;
	ball = 0;
	for(let i=0; i<3; i++){
		if(gameNumber[i] === userNumber[i]){
			strike++;
		}else if(gameNumber.indexOf(userNumber[i]) !== -1){
			ball++;
		}else if(strike === 0 && ball === 0){
			outYellow.classList.add("out");
			let timerId = setInterval(() => {
				outYellow.classList.toggle("out");
			}, 200)
			setTimeout(() => { clearInterval(timerId);
				outYellow.classList.remove("out");}, 500);
		}
	}
	createUserTry();
	rull();
}

//화면에 표시되게 만드는 함수
function createUserTry(){
	userNumLabel[tryNumber-1].textContent = `${userNumber[0]}${userNumber[1]}${userNumber[2]}`
	resultNumLabel[tryNumber-1].textContent = strike === 0 && ball === 0 ?
		`OUT` :
		`${strike}S${ball}B`;
	ballLabel.textContent = `${ball}`
	strikeLabel.textContent = `${strike}`
}






