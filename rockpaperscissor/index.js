//global variables- keep track of score and state
let computer_choice=null;
let user_choice=null;
let user_choices=[];
let computer_choices=[];

//keypress event-listener
document.addEventListener("keydown", (event) => {
    userChoice(event.key);
});

//click event listener
for(let i=0;i<document.querySelectorAll(".options").length;i++){
    let option=document.querySelectorAll(".options")[i];
    option.addEventListener("click",()=>{
       userChoice(option.innerHTML); 
    })
}

//function to keep track of scores and winner
function rpsLogic(a,b){
    if(a==b){
        return "draw"
    }
    if ((a == 'P' && b == 'R') || 
    (a == 'S' && b == 'P') || 
    (a == 'R' && b == 'S'))
    {
        return 1 
    }
    if ((b == 'P' && a == 'R') || 
    (b == 'S' && a == 'P') || 
    (b == 'R' && a == 'S')) {
        return 0
    }



}
function checkWinner(){
    let roundResults = [];
    if(computer_choices.length<3||user_choices<3){
        return;
    }
    else{
        let c_score=0;
        let u_score=0;
        for(let i=0;i<3;i++){
            if(rpsLogic(user_choices[i],computer_choices[i])=='draw'){
                roundResults.push(`Round ${i + 1}: Draw (${user_choices[i]} vs ${computer_choices[i]})`);
                continue;
            }
            if(rpsLogic(user_choices[i],computer_choices[i]))
            {
                c_score += 1;
                roundResults.push(`Round ${i + 1}: Computer wins (${computer_choices[i]} beats ${user_choices[i]})`);}
            else{
                u_score += 1;
                roundResults.push(`Round ${i + 1}: You win (${user_choices[i]} beats ${computer_choices[i]})`);

            }

        }
        setTimeout(() => {
            let finalMessage = roundResults.join('\n');

            if (c_score > u_score) {
                finalMessage += `\n\nFinal Result: Computer wins the game! (Computer: ${c_score}, You: ${u_score})`;
            } else if (u_score > c_score) {
                finalMessage += `\n\nFinal Result: You win the game! (You: ${u_score}, Computer: ${c_score})`;
            } else {
                finalMessage += `\n\nFinal Result: It's a draw! (You: ${u_score}, Computer: ${c_score})`;
            }

            alert(finalMessage);

            
            resetGame();
        }, 1000);
        
    }
}




//function to choose randomly between r,p,s for computer
function randomChar(){
    return ['R', 'P', 'S'][Math.floor(Math.random() * 3)];
}


//random generator for computer-console
function computerChoice(){
    computer_choice=randomChar();
    document.querySelectorAll(".circle-console")[0].textContent=computer_choice;
    computer_choices.push(computer_choice);
}

//function for event handling(through keypress)
function userChoice(key){
    key=key.toUpperCase();
    if(key=='P'||key=='R'||key=='S'){
        user_choice=key;
        document.querySelectorAll(".circle-console")[1].textContent=user_choice
        user_choices.push(user_choice);
        computerChoice();
        checkWinner();
    }
   
   
}

//resetGame
function resetGame(){
  computer_choice=null;
  user_choice=null;
  user_choices=[];
  computer_choices=[];
  document.querySelectorAll(".circle-console")[1].textContent=user_choice;
  document.querySelectorAll(".circle-console")[0].textContent=computer_choice;

}







