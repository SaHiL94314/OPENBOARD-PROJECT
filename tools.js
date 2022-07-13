let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencilcont = document.querySelector(".pencil-cont");
let erasercont = document.querySelector(".eraser-cont");
let pencilimg = document.querySelector(".pencil");
let eraserimg = document.querySelector(".eraser");
let stickyphoto = document.querySelector(".stickynote");
let upload = document.querySelector(".upload");
let iconElem = optionsCont.children[0];
let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;
let minimizeFlag = true;


optionsCont.addEventListener("click", (e) => {
    //true = hamburger, false = cross
    //true = tools show, fale = hide tools
    optionsFlag = !optionsFlag;

    if (optionsFlag) {
        openTool();
    }
    else {
        closeTool();
    }
})
function openTool() {
    iconElem.classList.remove("fa-xmark");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex";

}
function closeTool() {
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-xmark");
    toolsCont.style.display = "none";
    pencilcont.style.display = "none";
    erasercont.style.display = "none";

}
pencilimg.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;
    if (pencilFlag) {
        pencilcont.style.display = "block";
    }
    else {
        pencilcont.style.display = "none";
    }
})
eraserimg.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;
    if (eraserFlag) {
        erasercont.style.display = "flex";
    }
    else {
        erasercont.style.display = "none";
    }
})

upload.addEventListener("click", (e) => {
    // these 3 lines will open file explorer 
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img class = "hi" src="${url}" >
        </div>
        `;
        Createsticky(stickyTemplateHTML);
    })
})
stickyphoto.addEventListener("click", (e) => {

    let stickyTemplateHtml = `
        <div class="header-cont">    
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck = "false" ></textarea>
    </div>
    `;

    Createsticky(stickyTemplateHtml);
})

function Createsticky(stickyTemplateHtml) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");

    stickyCont.innerHTML = stickyTemplateHtml;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");

    notesAction(minimize, remove, stickyCont);
    stickyCont.onmousedown = function (event) {
        DragandDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}

function notesAction(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })
    minimize.addEventListener("click", (e) => {
        let notesCont = stickyCont.querySelector(".note-cont");
        minimizeFlag = !minimizeFlag;
        if (minimizeFlag) { notesCont.style.display = "block"; }
        else { notesCont.style.display = "none"; }
    })

}



function DragandDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}
