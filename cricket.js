var userInput = document.getElementById("userInput");
var totalScore = 0;
var scanWicketStatus = document.getElementById("printWicketStatus");
var scanPlayerTotal = document.getElementById("printPlayerTotal");
var scanCpuTotal = document.getElementById("printCpuTotal");
var scanInitialRun = document.getElementById("printInitialRun");
var scanCpuRun = document.getElementById("printCpuRun");
var firstInningsScore;
var secondInningsScore;
var batsmenRun;
var bowlerRun;
var cpuTotalScore;
var playerTotalScore;
var isPlayerBatting;
var buttonBat = document.getElementById("buttonBat");
var buttonBowl = document.getElementById("buttonBowl");
var comment =document.getElementById("comment");
var notify = document.querySelector("h6");

function commentator(){
    comment.style.color = "";
    notify.innerHTML="";
    if(isPlayerBatting){
        comment.innerHTML = "";
        comment.appendChild(document.createTextNode("You are Batting"));
    }
    else{
        comment.innerHTML = "";
        comment.appendChild(document.createTextNode("You are Bowling"));
    }
}

// Player is batting
function choseBat(){
    isPlayerBatting = true;
    // console.log(isPlayerBatting);
    commentator();
};

// Player is bowling
function choseBowl(){
    isPlayerBatting = false;
    commentator();
};

// Checks if there is a wicket taken or not and works accordingly
function outOrNot(){
    if(scanWicketStatus.value.length === 0){
        numberTapped(event);
    }
    else{
        secondInnings();
    }
};

// Determines the winner
function determineWinner(){
    if(isPlayerBatting == true){
        playerTotalScore = secondInningsScore;
        cpuTotalScore = firstInningsScore;
    }else{
        playerTotalScore = firstInningsScore;
        cpuTotalScore = secondInningsScore;
    }
    // console.log(playerTotalScore);
    // console.log("cpu " + cpuTotalScore);
    comment.style.color = "#281758"
    notify.innerHTML="";
    if (playerTotalScore > cpuTotalScore){
        //console.log("You won");
        comment.innerHTML = "";
        comment.appendChild(document.createTextNode("You Won"));
    }
    else if(playerTotalScore == cpuTotalScore){
        // console.log("It's a draw");
        comment.innerHTML = "";
        comment.appendChild(document.createTextNode("It's a Draw"));
    }
    else{
        // console.log("You lose");
        comment.innerHTML = "";
        comment.appendChild(document.createTextNode("You Lose"));
    }
};

//Starts the second innings or appens the second innings score if it is already over
function secondInnings(){
    if (firstInningsScore === undefined){
        // firstInningsScore = scanPlayerTotal.innerHTML;
        firstInningsScore=totalScore;
        console.log(firstInningsScore);
        scanWicketStatus.value = "";
        totalScore=0;
        isPlayerBatting = !isPlayerBatting;
        commentator();
    }
    else{
        secondInningsScore = totalScore;
        // secondInningsScore = 5;
        // (number(firstInningsScore) > number(secondInningsScore)) ? console.log("you win"):console.log("CPU wins")
        determineWinner();
    }
};

// Lets the player know if there is a wicket on the UI
function printWicketStatus(){
    comment.innerHTML="";
    comment.appendChild(document.createTextNode(" OUT "));
    comment.style.color = "#EE0A10";
    scanWicketStatus.value = "OUT";
    notify.appendChild(document.createTextNode("Press any key to continue"));
};

// prints the totsl score on UI
function printTotalScore(totalScore){
    if (isPlayerBatting){
        scanPlayerTotal.innerHTML = "";
        scanPlayerTotal.appendChild(document.createTextNode(totalScore));
    }else{
        scanCpuTotal.innerHTML = "";
        scanCpuTotal.appendChild(document.createTextNode(totalScore));
    }
};

// Prints the CPU score on UI
function printCpuRun(cpuRun){
    scanCpuRun.innerHTML = "";
    scanCpuRun.appendChild(document.createTextNode(cpuRun));
};

// Prints the player score on UI
function printInitialRun(initialRun){
    scanInitialRun.innerHTML = "";
    scanInitialRun.appendChild(document.createTextNode(initialRun));
};

// Calculates the total score and tells if there is a wicket
function wicketCheck(bowlerRun , batsmenRun){
    if(typeof batsmenRun == 'number' && typeof bowlerRun == 'number'){
        if(bowlerRun !== batsmenRun){
            totalScore = totalScore + batsmenRun;
            printTotalScore(totalScore);
        }
        else{
            // console.log("OUT!!!!!");
            printWicketStatus();
            userInput.value='';
        }
    }
    else{
        // console.log("Enter a correct number.");
        printCpuRun("Learn the Rules Dumb man.")
        printInitialRun("You need to enter a number from 0 to 9 ")
    }
    return totalScore;
};

// Tells which number is pressed
function numberTapped(event){
    var initialRun;
    userInput.value = '';
    var cpuRun = Math.floor(Math.random() * 10);
    switch(event.keyCode){
        case 48:
            initialRun = 0;
            break;
        case 49:
            initialRun = 1;
            break;
        case 50:
            initialRun = 2;
            break;
        case 51:
            initialRun = 3;
            break;
        case 52:
            initialRun = 4;
            break;
        case 53:
            initialRun = 5;
            break;
        case 54:
            initialRun = 6;
            break;
        case 55:
            initialRun = 7;
            break;
        case 56:
            initialRun = 8;
            break;
        case 57:
            initialRun = 9;
            break;  
        default:
            console.log("Enter a vaid Input.")    
    };
    if(typeof initialRun == 'number'){
        printInitialRun(initialRun);
        printCpuRun(cpuRun);
    }    
    // console.log("CPU " + cpuRun);
    // console.log(initialRun);
    if (isPlayerBatting){ 
    wicketCheck(cpuRun , initialRun); //player Batting
    }else{
        wicketCheck(initialRun,cpuRun);
    }
    // console.log("Total " + totalScore);


}

userInput.addEventListener("keypress", outOrNot);
buttonBat.addEventListener("click", choseBat);
buttonBowl.addEventListener("click",choseBowl);