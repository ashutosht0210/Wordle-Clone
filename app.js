//Welcome Section

let playBtn = document.querySelector(".play");
let welcome = document.querySelector(".welcome");
let main = document.querySelector(".main");
playBtn.addEventListener("click",()=> {
    welcome.style.display = "none";
    main.style.display = "block";
});

// Random Word Choose
let ans = answer[Math.floor(Math.random() * answer.length)];

let box = document.querySelectorAll(".box");
let cnt = 0;
let numOfGuess = 0;

let guess = "";

let statMsg = document.querySelector(".status-msg-invalid");

document.addEventListener('keydown', (e) => {
    if(numOfGuess<6){
        const key = e.key.toUpperCase();
        let btn = document.querySelector("#"+key);
        btn.classList.add("press");
        setTimeout(()=>{
            btn.classList.remove("press");
        },300);
        if (key === 'BACKSPACE' && cnt > numOfGuess * 5 ) {
            box[--cnt].innerText = "";
            box[cnt].classList.remove("filled");
            guess = guess.slice(0,-1);
        }

        else if (/^[A-Z]$/.test(key) && cnt < (numOfGuess + 1) * 5) {
            box[cnt++].innerText = key;
            box[cnt-1].classList.add("filled");
            guess+=key.toLowerCase();
        }

        else if (key === 'ENTER' && cnt === (numOfGuess + 1) * 5) {
            if(validGuess.has(guess)){
                let result = [0,0,0,0,0]; // 0: absent 1:wrong place 2:correct place
                let charCount ={}; // keys are the letters and value is its frequency. To avoid duplicate letter problem.
                
                // For present, and in right place
                for(let i=0;i<5;i++) {
                    if(ans[i]===guess[i]) {
                        result[i] = 2; //correct place
                    }
                    else {
                        charCount[ans[i]] = (charCount[ans[i]] || 0) + 1;
                    }
                }

                // For present, but in wrong place
                for(let i=0;i<5;i++) {
                    if(result[i]==2) continue;
                    
                    if(charCount[guess[i]] > 0) {
                        result[i] = 1;
                        charCount[guess[i]]--; //decreasse count by 1
                    }
                }

                for (let i = 0; i < 5; i++) {
                const currentIndex = numOfGuess * 5 + i;
                const currentResult = result[i];
                const currentBox = box[currentIndex];

                setTimeout(() => {
                    let keyboardKey;
                    const letter = currentBox.innerText;

                    switch (currentResult) {
                        case 0:
                            currentBox.classList.add("not-present");
                            keyboardKey = document.querySelector("#" + letter);
                            keyboardKey.classList.add("not-present");
                            break;
                        case 1:
                            currentBox.classList.add("wrong-place");
                            keyboardKey = document.querySelector("#" + letter);
                            keyboardKey.classList.add("wrong-place");
                            break;
                        case 2:
                            currentBox.classList.add("correct-place");
                            keyboardKey = document.querySelector("#" + letter);
                            keyboardKey.classList.add("correct-place");
                            break;
                    }
                }, i * 300);
            }

                if(Math.min(...result)==2) {
                    numOfGuess = 7;
                    statMsg.innerText = "Genius! You guessed it.";
                    if(main.classList.contains("light")) {
                        statMsg.style.color = "#121213";
                    }
                    statMsg.style.backgroundColor = "#06d15b";
                    statMsg.style.display = "block";
                    
                    setTimeout(()=> {
                        statMsg.style.display = "none";
                    },5000);
                }

                numOfGuess++;
                guess = "";
                if(numOfGuess==6) {
                    statMsg.innerText = ans.toUpperCase();
                    statMsg.style.display = "block";
                }
            }
            
            else {
                statMsg.style.display = "block";
                for(let i=0;i<5;i++) {
                    box[numOfGuess*5 +i].classList.add("invalid");
                }

                setTimeout(()=>{
                    statMsg.style.display = "none";
                    for(let i=0;i<5;i++) {
                        box[numOfGuess*5 +i].classList.remove("invalid");
                    }
                },900);
            }
        }
    }

    
});

let keys = document.querySelectorAll(".key");

for (let key of keys) {
    key.addEventListener("click",()=> {
        let id=key.getAttribute("id");
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: id
            })
        );
    });
}


// Mode - light/dark

let mode = document.querySelector("#mode");
mode.addEventListener("click",()=> {
    main.classList.toggle("light");

    if(main.classList.contains("light")){
        mode.setAttribute("class","fa-regular fa-sun");
        statMsg.style.backgroundColor = "#121213" ;
        statMsg.style.color = "white" ;
        for (let key of keys) {
            key.style.backgroundColor = "white";
            key.style.color = "black";
            key.style.border = "2px solid #121213";
        }
    } 
    else {
        statMsg.style.backgroundColor = "white" ;
        statMsg.style.color = "black" ;
        mode.setAttribute("class","fa-solid fa-moon");
        for (let key of keys) {
            key.style.backgroundColor = "gray";
            key.style.color = "white";
        }
    } 
});