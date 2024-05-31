const X_CLASS='x'
const CIRCLE_CLASS='circle'
const winningmessageelement=document.getElementById('winningmessage')
const restartbutton=document.getElementById('restartbutton')

const winningmessagetextelement=document.querySelector('[data-winning-message-text]')
const WINNING_COMBINATION=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[2,5,8],
[1,4,7],
[0,4,8],
[2,4,6]
]
const cellElements=document.querySelectorAll('[data-cell]') 
const board=document.getElementById('board');
let circleTurn


 
StartGame()
restartbutton.addEventListener('click',StartGame)
function StartGame(){
cellElements.forEach(cell=>{cell.classList.remove(X_CLASS)
cell.classList.remove(CIRCLE_CLASS)
cell.removeEventListener('click',handleClick)})
    circleTurn=false

cellElements.forEach(cell=>{ 
    cell.addEventListener('click',handleClick,{once:true})})
    setboardHoverclass()
winningmessageelement.classList.remove('show')
}

function handleClick(e){ 
   const cell=e.target 
const currentclass=circleTurn?CIRCLE_CLASS:X_CLASS
placemark(cell,currentclass)
if(checkWin(currentclass)){
endGame(false)}
else if (isDraw()){
    endGame(true)
}else{
swapTurns()
setboardHoverclass()}
} 
function placemark(cell,currentclass){ 

cell.classList.add(currentclass)

} 
function endGame(draw){ 
if(draw){
winningmessagetextelement.innerText='Draw'

}
else{ 
winningmessagetextelement.innerText=`${circleTurn ?
    "O's":"X's"} Wins!`
}
winningmessageelement.classList.add('show')
}
function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS)
    })
}



function swapTurns(){ 
circleTurn=!circleTurn;

}
function setboardHoverclass(){ 
board.classList.remove(X_CLASS)
board.classList.remove(CIRCLE_CLASS)
if(circleTurn){
    board.classList.add(CIRCLE_CLASS)   
}
else{
    board.classList.add(X_CLASS)
}
}
function checkWin(currentclass){
return WINNING_COMBINATION.some(combination=>{ 
   return combination.every(index=>{
    return cellElements[index].classList.contains(currentclass)
   })
})

}