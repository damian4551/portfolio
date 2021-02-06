const cursor = document.querySelector(".cursor");
const hoveredElements = document.querySelectorAll(".cursor-image");


const cursorMove = (e) => {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
};

for(let i = 1; i <= 12; i++) {
    cursor.style.backgroundImage = 'url("../cursors/c'+i+'.png")';
}

window.addEventListener("load", () => {
    cursor.style.backgroundImage = "";
    for(let i = 1; i <= hoveredElements.length; i++) {
        if(i <= 11) {
            hoveredElements[i-1].addEventListener("mouseenter", function() {
                if(i == 1) {
                    cursor.style.animationName = "shake";
                } else {
                    cursor.style.animationName = "";
                }
                cursor.style.backgroundImage = 'url("../cursors/c'+i+'.png")';
                hoveredElements[i-1].style.cursor = "none";
            });
            hoveredElements[i-1].addEventListener("mouseleave", function() {
                cursor.style.backgroundImage = 'none';
                hoveredElements[i-1].style.cursor = "default";
            });
        } else {
            hoveredElements[i-1].addEventListener("mouseenter", function() {
                cursor.style.backgroundImage = 'url("../cursors/c12.png")';
                hoveredElements[i-1].style.cursor = "none";
            });
            hoveredElements[i-1].addEventListener("mouseleave", function() {
                cursor.style.backgroundImage = 'none';
                hoveredElements[i-1].style.cursor = "default";
            });
        }
        
    }
})

window.addEventListener("mousemove", cursorMove);
