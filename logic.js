let inputNum="b1";
let num=1;
let word="";
let checked=false;
targ= document.getElementById(inputNum);
 let guess="";
 
initalize();

document.addEventListener("keydown",(event)=>{
    if(isLetter(event.key)){
     handleLetter(event.key);
    }
    else if(event.key == 'Enter'){
    handleEnter(event);
    }
    else if(event.key=='Backspace'){
     handleBackspace();
    }
    });



     // Show the loader
     function showLoader() {
     document.getElementById('loader').style.display = 'block';
 }

 // Hide the loader
 function hideLoader() {
     document.getElementById('loader').style.display = 'none';
 }


async function initalize() {
showLoader();
try {
 // Fetch the word of the day
 const response = await fetch("https://words.dev-apis.com/word-of-the-day");

 // Parse the JSON response
 const data = await response.json();
 
  word = data.word;  
 console.log("Word of the day:", word);

} catch (error) {
 console.error("Error fetching the word of the day:", error);
}
finally{
 hideLoader();
}
}


function isLetter(letter) {
return /^[a-zA-Z]$/.test(letter);
}

function handleLetter(value){
if(guess.length<5){   
targ.innerText= value;
guess+=value; 
num++;
inputNum = inputNum.charAt(0) + "" + num;
targ = document.getElementById(inputNum);

}
}
async function validWord(value) {

const response = await fetch("https://words.dev-apis.com/validate-word", {
     method: "POST", // Specify the request method as POST
     headers: {
         "Content-Type": "application/json" // Set the content type to JSON
     },
     body: JSON.stringify({ word: value }) // The data to be sent in the request body, converted to a JSON string
 });

 // Parse the response JSON
 const data = await response.json();
 if(data.validWord == true){
     return true;
 }
 else{
     return false;
 }

}

function wrongInput(){
let rows;
if (num-1 <= 5) {
rows = document.querySelectorAll("#b1, #b2, #b3, #b4, #b5");
} else if (num-1 <= 10) {
rows = document.querySelectorAll("#b6, #b7, #b8, #b9, #b10");
} else if (num-1 <= 15) {
rows = document.querySelectorAll("#b11, #b12, #b13, #b14, #b15");
} else if (num-1 <= 20) {
rows = document.querySelectorAll("#b16, #b17, #b18, #b19, #b20");
} else if (num-1 <= 25) {
rows = document.querySelectorAll("#b21, #b22, #b23, #b24, #b25");
} else {
rows = document.querySelectorAll("#b26, #b27, #b28, #b29, #b30");
}

// Apply the red border color
rows.forEach(element => {
 element.style.borderColor = 'red';
});

// Set a timeout to revert the border color back after 500ms
setTimeout(() => {
 rows.forEach(element => {
     element.style.borderColor = ''; // Reset to original color
 });
}, 500); 
}

function checkGuess(){
const wordLetters = word.split(""); // Convert the target word into an array
const wordLetterCount = {};
wordLetters.forEach(letter => {
 if (wordLetterCount[letter]) {
     wordLetterCount[letter]++;
 } else {
     wordLetterCount[letter] = 1;
 }
});
if(num-1=== 5){
eid=1;
}
else if(num-1 ===10){
eid=6;
}
else if(num-1 === 15){
eid=11;
}
else if(num-1 === 20){
eid=16;
}
else if(num-1 === 25){
eid=21;
}
else{
eid=26;
}
// Loop through the guess and compare each letter
for(index=0; index<5;index++){  
// wordletters= word.charAt(index);  
letter= guess.charAt(index);
const inputElement = document.getElementById(`b${eid}`);
eid++;
if (letter === wordLetters[index] && wordLetterCount[letter]>0) {
     inputElement.style.backgroundColor = "green";  // Set background color to green
     wordLetterCount[letter]--;
 } 
 // Check if the letter is in the word but in the wrong position
 else if (wordLetters.includes(letter) && wordLetterCount[letter]>0) {
     inputElement.style.backgroundColor = "yellow";  // Set background color to yellow
     wordLetterCount[letter]--;
 } 
 // If the letter is not in the word
 else {
     inputElement.style.backgroundColor = "grey";  // Set background color to grey
 }
}
}


async function handleEnter(event){
showLoader();
const valid= await validWord(guess);
hideLoader();
if(valid && guess.length===5 ){
 if(guess === word){
     checkGuess();
    triggerWinAnimation();
 }
 else{
 if(num>30){
     checkGuess();
     alert("you lost!!! correct word is : "+word);
 }
 else{
     checkGuess();
     guess="";
 }
 }
}
else{
 wrongInput();
 event.preventDefault();
}

}


function handleBackspace(){
if(guess.length>=1){
num--;
inputNum = inputNum.charAt(0) + "" + num;
targ= document.getElementById(inputNum);
targ.innerText ="";
guess= guess.slice(0,-1);

}

}



function triggerWinAnimation() {
// Get all input elements of the current row (you can use your own way to select the current row)
if (num-1 <= 5) {
inputs = document.querySelectorAll("#b1, #b2, #b3, #b4, #b5");
} else if (num-1 <= 10) {
inputs = document.querySelectorAll("#b6, #b7, #b8, #b9, #b10");
} else if (num-1 <= 15) {
inputs = document.querySelectorAll("#b11, #b12, #b13, #b14, #b15");
} else if (num-1 <= 20) {
inputs = document.querySelectorAll("#b16, #b17, #b18, #b19, #b20");
} else if (num-1 <= 25) {
inputs = document.querySelectorAll("#b21, #b22, #b23, #b24, #b25");
} else {
inputs = document.querySelectorAll("#b26, #b27, #b28, #b29, #b30");
}
inputs.forEach((inputElement, index) => {
 // Add a delay for each element to animate in sequence
 setTimeout(() => {
     inputElement.classList.add('win-bounce'); // Add the bounce animation class
 }, index * 100); // Delay each animation slightly for a wave effect
});

// Display the winning message after a slight delay
setTimeout(() => {
 const winMessage = document.getElementById('winMessage');
 winMessage.classList.add('show'); // Show the winning message
}, 1000); // 1 second delay before showing the message
}
