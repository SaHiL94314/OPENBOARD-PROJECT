let canvas = document.querySelector("canvas");
let pencilcolorall = document.querySelectorAll(".pencilcolor");
let pencilcolorWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let tool = canvas.getContext("2d");


let pencilcolor = "red";
let pencilwidth = pencilcolorWidthElem.value;
let erasercolor = "white";
let eraserwidth = eraserWidthElem.value;


tool.strokeStyle = pencilcolor;
tool.lineWidth = pencilwidth;


let undoRedoTracker = [];
let tracker = 0;


let mousedown = false;

canvas.addEventListener("mousedown", (e) => {
    mousedown = true;
    tool.beginPath();
    tool.moveTo(e.clientX, e.clientY);
})
canvas.addEventListener("mousemove", (e) => {
    if (mousedown) {
        tool.lineTo(e.clientX, e.clientY);
        tool.stroke();
    }
})
canvas.addEventListener("mouseup",(e) => {
    mousedown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    tracker = undoRedoTracker.length -1 ;
})

pencilcolorall.forEach((colorElem) =>
    colorElem.addEventListener("click" , (e) => {
        pencilcolor = colorElem.classList[0];
        tool.strokeStyle = pencilcolor;
    })
)
pencilcolorWidthElem.addEventListener("change", (e) => {
    pencilwidth = pencilcolorWidthElem.value;
    tool.lineWidth = pencilwidth;
})
eraserimg.addEventListener("click" , (e) => {
    if(eraserFlag){
        tool.strokeStyle = erasercolor;
        tool.lineWidth = eraserwidth;
    }
    else{
        tool.strokeStyle = pencilcolor;
        tool.lineWidth = pencilwidth;
    }
})
eraserWidthElem.addEventListener("change",(e) =>{

    eraserwidth = eraserWidthElem.value;
    tool.lineWidth = eraserwidth;
})

download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})
redo.addEventListener("click", (e) =>{
    if(tracker < undoRedoTracker.length  - 1){
        tracker++;
    }
    robj = {
        trackvalue : tracker,
        undoRedoTracker
    }
    undoRedoActions(robj);
})
undo.addEventListener("click", (e) =>{
    if(tracker > 0){
        tracker--;
    }
    robj = {
        trackvalue : tracker,
        undoRedoTracker
    }
    undoRedoActions(robj);
})
function undoRedoActions(obj){
    tracker = obj.trackvalue;
    undoRedoTracker = obj.undoRedoTracker;

    let url = undoRedoTracker[tracker];
    let img = new Image();
    canvas.getContext("2d").clearRect(0,0,canvas.width, canvas.height);
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}