const secondScreenText = document.getElementById('previus-operation');
const fistScreenText = document.getElementById('current-operation');
const buttons = document.querySelectorAll('#buttons-container button');
let currentOp = "";
//console.log(buttons)

//add digit to screen
function addDigit (digit){
    //check if curret have more dots
    if(digit === '.' && fistScreenText.innerText.includes(".")){
        return;
    }
    currentOp = digit;
    updateScreen()
}

//process all calculator operations
function processOperations(operation){
    //check if current is empty
    if(fistScreenText.innerHTML === '' && operation !== "C"){
        if(secondScreenText.innerHTML !== ''){
            changeOperation(operation);
        }
        return
    }
    let operationValue;
    let previus = +secondScreenText.innerHTML.split(" ")[0] ;
    let current = +fistScreenText.innerHTML;

    switch(operation){
        case "+":
        operationValue = previus  +  current
        updateScreen(operationValue, operation, previus, current)
        break;
        case "-":
        operationValue = previus  -  current
        updateScreen(operationValue, operation, previus, current)
        break;
        case "*":
        operationValue = previus  *  current
        updateScreen(operationValue, operation, previus, current)
        break;
        case "/":
        operationValue = previus  /  current
        updateScreen(operationValue, operation, previus, current)
        break;
        case "del":
        processDellOperator()
        break;
        case "CE":
        processClearFirstOperation()
        break;
        case "C":
            processClear()
        break;
        case "=":
            processEqualOperation()
        break;
        default:
        return;
    }
}



function updateScreen(operationValue=null, operation=null, previus=null, current=null){
    //console.log(operationValue, operation, current, previus)
    if(operationValue === null){
        fistScreenText.innerHTML += currentOp;
    } else{
        //check if exist value 
        if(previus === 0){
            operationValue = current
        }
        //add value to previous
        secondScreenText.innerText = `${operationValue} ${operation}`;
        fistScreenText.innerText = "";
    }
}

function changeOperation(operation){
    const mathOperation = ["*", "/", "+", "-"];
    if(!mathOperation.includes(operation)) return;

    secondScreenText. innerHTML =  secondScreenText.innerHTML.slice(0,-1) + operation;
}

function processDellOperator() {
    fistScreenText.innerHTML = fistScreenText.innerText.slice(0, -1);
}

function processClearFirstOperation(){
    fistScreenText.innerHTML = ""
}

function processClear(){
    fistScreenText.innerText = "";
    secondScreenText.innerText = "";
}

function processEqualOperation(){
    const op = secondScreenText.innerHTML.split(" ")[1];
    processOperations(op)
}


buttons.forEach(button =>{
    button.addEventListener('click', (e) =>{
        const value = e.target.innerHTML;
        //console.log(value)

        if(+value >= 0 || value === '.' ){
            addDigit(value)
        } else{
            processOperations( value)
        }

    })
})


const iconCalculator = document. querySelector('.icon-calc');
const containerCalculator = document.querySelector('.glass');


iconCalculator.addEventListener('click', () =>{
    containerCalculator.classList.toggle('hidden')
})


async function getBackgroundQuerie(){
    //chave unica do usuário, para outro projeto devemos gerar outra no site do unsplash.com, é gratuito 
    const CLIENT_ID = 'l-NQDu9pSBDCqSgjvIS_M821jxj13sIfOFTUk7iiz-Y'
    const randomIndex = Math.floor(Math.random() * 10) 

    const imag = await fetch(`https://api.unsplash.com/search/photos?query=wallpaper&order_by=relevant&page=1&orientation=landscape&client_id=${CLIENT_ID}`);
    const imagConvert = await imag.json();
    const imgChosen = await imagConvert.results[randomIndex].urls.regular;
    return imgChosen
}


async function changeBackground (){
    const body = document.querySelector('body');
    const imagChosen = await getBackgroundQuerie();
    body.style.background = await `url('${imagChosen}') no-repeat center center`
    body.style.backgroundSize = "cover"
}

changeBackground ()