const answer = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let correct_times = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const input_letter = block.innerText;
      const answer_letter = answer[i];
      if (input_letter === answer_letter) {
        correct_times += 1;
        block.style.background = "#6aaa64";
      } else if (answer.includes(input_letter))
        block.style.background = "#c9b458";
      else block.style.background = "#787c7e";

      block.style.color = "white";
    }
    if (correct_times === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisblock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (event.key === "Enter") handleEnterKey();
    else if (keyCode >= 65 && keyCode <= 90) {
      thisblock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const start_time = new Date();

    function setTime() {
      const present_time = new Date();
      const flow_time = new Date(present_time - start_time);
      const minute = flow_time.getMinutes().toString().padStart(2, "0");
      const second = flow_time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${minute}:${second}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
  console.log(timer);
}

appStart();
