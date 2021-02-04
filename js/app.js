//aos animations initialization
AOS.init({
    duration: 1200,
})


//loading animation
window.onload = () => {
    const layerText = document.querySelector(".layer-text");
    const layer = document.querySelector(".layer");
    const page = document.querySelector(".portfolio-page");

    setTimeout(function(){
        layerText.innerText = "loaded";
    }, 3000);

    setTimeout(function(){
        layerText.innerText = "welcome to my portfolio";
    }, 4000);

    setTimeout(function(){
        document.body.style.overflow = "scroll";
        layer.style.visibility = "hidden";
        page.style.visibility = "visible";
    }, 5500);
}

//set current time
const currentTimeHtml = document.querySelector(".current-time");

const setTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    if(hours < 10) {
        hours = "0" + hours;
    }
    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    currentTimeHtml.innerText = hours + ":" + minutes;
}

setInterval(setTime, 1000);


//skew scrolling
const skewWrapper = document.querySelectorAll(".skew-wrapper");

let currentPos = window.pageYOffset;

const skewScrolling = () => {
    const newPos = window.pageYOffset;
    const diff = newPos - currentPos;
    const speed = diff * 0.007;

    skewWrapper.forEach(wrapper => {
        wrapper.style.transform = `skewY(${speed}deg`;
    });

    currentPos = newPos;

    requestAnimationFrame(skewScrolling);
}

skewScrolling();


//scroll to projects
const projectsSection = document.querySelector(".projects");
const projectsLink = document.querySelector(".projects-link");

const scrollToElement = () => {
    const y = projectsSection.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: 'smooth'
    });
}

projectsLink.addEventListener("click", scrollToElement);

//captcha
const contactSection = document.querySelector(".contact");
const checkbox = document.querySelector(".checkbox");
const checkboxText = document.querySelector(".checkbox-text");
const sendBtn = document.querySelector(".send-btn");
const pistolCursor = document.querySelector(".pistol-cursor")

const email = document.querySelector(".email")
const message = document.querySelector(".message")

let isVerified = false; 
let isValidated = false;

const robot = document.createElement("div");

const pistolCursorMove = (e) => {
    pistolCursor.style.top = e.pageY + "px";
    pistolCursor.style.left = e.pageX + "px";
};

const changeHoverCursor = () => {
    if(isVerified == true && isValidated == true) {
        sendBtn.addEventListener("mouseenter", () => {
                cursor.style.backgroundImage = 'url("../cursors/cloud.png")';
        })    
    }
}

const sendMessage = () => {
    alert('send');
}

const validateInputs = () => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmail = regexp.test(String(email.value).toLowerCase());

    if(isEmail == true && message.value != "") {
        isValidated = true;
    }

}

const createRobot = () => {
    if(document.querySelector(".robot") == null && isVerified == false) {
        let currentTop = 0;
        let currentLeft = 0;
        let documentHeight = contactSection.getBoundingClientRect().height;
        let documentWidth = contactSection.getBoundingClientRect().width;
        
        robot.classList.add("robot")
        contactSection.appendChild(robot);
        
        currentTop = Math.floor(Math.random() * documentHeight) + 1;
        currentLeft = Math.floor(Math.random() * documentWidth - 100) + 1;
        
        robot.style.top = currentTop + "px";
        robot.style.left = currentLeft + "px";

        pistolCursor.style.backgroundImage = 'url("../cursors/pistol.png")';
        checkboxText.innerText = "kill the robot";
    }
}

const shootedRobot = () => {
    robot.remove();
    isVerified = true;
    checkboxText.innerText = "cruel human!";
    pistolCursor.style.backgroundImage = "none";

    changeHoverCursor();
}


checkbox.addEventListener("click", createRobot);

robot.addEventListener("click", shootedRobot);

email.addEventListener("keyup", () => {
    validateInputs();
    changeHoverCursor();
});

message.addEventListener("keyup", () => {
    validateInputs();
    changeHoverCursor();
});


sendBtn.addEventListener("click", () => {
    if(isVerified == true && isValidated == true) {
        sendMessage();
    } else if(isVerified == true && isValidated == false) {
        checkboxText.innerText = "couldn't send a message, check informations";
    }
});


window.addEventListener("mousemove", pistolCursorMove);
