/// global variable


//////////////
/*open setting box */
document.querySelector(".icon-setting").addEventListener("click",(e)=>{
    e.currentTarget.parentElement.classList.toggle("open");
})

document.querySelector(".icon-setting i").onclick = function(){
    this.classList.toggle("fa-spin")
}

/// change color 

const listscolor = Array.from(document.querySelectorAll(".colors ul li"));
// local storage color
if(window.localStorage.getItem("color")){
    document.documentElement.style.setProperty("--main-color",window.localStorage.getItem("color"));
    listscolor.forEach((ele)=>{
        ele.classList.remove("active");
        document.querySelector(`[data-color ="${window.localStorage.getItem("color")}"]`).classList.add("active");
    })
}
listscolor.forEach((li)=>{
    li.addEventListener('click',(e)=>{
        listscolor.forEach((li)=>{
            li.classList.remove("active");
            e.currentTarget.classList.add("active");
        });

        document.documentElement.style.setProperty("--main-color",e.currentTarget.dataset.color);
        window.localStorage.setItem("color",e.currentTarget.dataset.color);

    })
})
/*  start Random Background image   */
let landingPage = document.querySelector(".landing-page");
let backgroundOption = true;
let intervalbackground;
let imagesArray = ["image1.webp","image2.jpg","image3.jpg","image4.webp"];
const listbackground = Array.from(document.querySelectorAll(".randombackground span"));
if(window.localStorage.getItem("data-background")){
    listbackground.forEach((ele)=>{
        ele.classList.remove("active")
    })
    if (window.localStorage.getItem("data-background") == "yes"){
    
        backgroundOption = true;
       
      }else{

        backgroundOption = false;
      
      }
      document.querySelector(`[data-background = "${window.localStorage.getItem("data-background")}"]`).classList.add("active");
}

if(window.localStorage.getItem("randomback")){
    let randomback = JSON.parse(window.localStorage.getItem("randomback"));
    landingPage.style.backgroundImage = `url("../imgs/${imagesArray[randomback]}")`;
}
listbackground.forEach((span)=>{
    
    span.addEventListener('click',(e)=>{
        e.target.parentElement.querySelectorAll(".active").forEach((span)=>{
            span.classList.remove("active");
        })
        e.currentTarget.classList.add("active");
        if(e.target.dataset.background == "yes"){
            backgroundOption = true;
            randombackground();
        }else {
            backgroundOption = false;
            clearInterval(intervalbackground);
        }
        window.localStorage.setItem("data-background",e.currentTarget.dataset.background)
    })
});


/*slider image */
function randombackground(){
    if(backgroundOption == true){
        intervalbackground = setInterval(()=>{
            let randomNumberBackground = Math.floor(Math.random() * imagesArray.length);
            landingPage.style.backgroundImage = `url("../imgs/${imagesArray[randomNumberBackground]}")`;
            window.localStorage.setItem("randomback",randomNumberBackground)
        },8000);        
    }
};

randombackground();
/*end Random Background Image */
/***************************************************** */
/*scroll width on section visiting increase width */
let visiting = document.querySelector(".visits");

window.onscroll = function(){
    let offsettop = visiting.offsetTop;
    let outerheight = visiting.offsetHeight
    let height = offsettop - outerheight;

    if(window.scrollY >= height ){
        document.querySelectorAll(".progress-box span").forEach((ele)=>{
            ele.style.width = `${ele.dataset.width}`;
        })
    }
};
///////////////////////////////////////
/// popup img
let images = Array.from(document.querySelectorAll(".galeries img"));
images.forEach((ele)=>{
    ele.addEventListener("click",(e)=>{
        let overlay = document.createElement("div");
        overlay.className = "overlay-pop";
        document.body.append(overlay);
        let popBox = document.createElement("div");
        popBox.className = "popBox";
            //create header popup box img
            if(ele.alt != null){
            let headeralt = document.createElement("h3");
            headeralt.className = "pop-header";
            headeralt.appendChild(document.createTextNode(ele.alt));
            popBox.appendChild(headeralt);
        }
        //create img popup box
        let img = document.createElement("img");
        img.src = ele.src;
        popBox.appendChild(img);
        document.body.append(popBox);
        /// close-pop
        let closeButton = document.createElement("span");
        closeButton.appendChild(document.createTextNode("x"));
        closeButton.className = "close-pop";
        popBox.appendChild(closeButton);
    })
});
///// 
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("close-pop")){
        e.target.parentNode.remove();
        document.querySelector(".overlay-pop").remove();
    }
});
//////////////////////////////////////////////////////////
// select all bullets
let bullets = document.querySelectorAll(".nav-bullets .bullet");
bullets.forEach((bul)=>{
    bul.addEventListener("click",(e)=>{
    
         document.querySelector(e.currentTarget.dataset.cat).scrollIntoView({
             behavior:"smooth",
        })
    })
});
////
let links = document.querySelectorAll(".links a")
links.forEach((lin)=>{
    
    lin.addEventListener("click",(e)=>{
        e.preventDefault();
        document.querySelector(e.currentTarget.dataset.cat).scrollIntoView({
            behavior: "smooth",
        })
      
     
    })
})

//////////bullet show or no
let button = document.querySelectorAll(".setting-box button");
let bullet = document.querySelector(".nav-bullets");
if(window.localStorage.getItem("optionBullets")){
    button.forEach((ele)=>{ele.classList.remove("active")})
    if(window.localStorage.getItem("optionBullets") == "block"){
        bullet.style.display = "block";
        document.querySelector(".Yes").classList.add("active")
    }else{
        bullet.style.display = "none";
        document.querySelector(".No").classList.add("active")
    }
}

button.forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        button.forEach((ele)=>{ele.classList.remove("active")})
        if(e.currentTarget.classList.contains("Yes")){
            e.currentTarget.classList.add("active");
            bullet.style.display= "block";
            window.localStorage.setItem("optionBullets","block");
        }else{
            e.currentTarget.classList.add('active')
            bullet.style.display = "none";
            window.localStorage.setItem("optionBullets","none");
        }
    })
});
//// Reset option
document.querySelector(".reset-button").onclick = function(){
    window.localStorage.removeItem("data-background");
    window.localStorage.removeItem("optionBullets");
    window.location.reload();
}

///// toggle-menu
let link = document.querySelector(".links") ;
let toggle = document.querySelector(".toggle-menu");
toggle.onclick = function(e){
    e.stopPropagation();
    document.querySelector(".links").classList.toggle("open");
    this.classList.toggle("active");
}

document.addEventListener("click",(e)=>{
    if(e.target !== toggle && e.target !== link){
        document.querySelector(".links").classList.remove("open");
        toggle.classList.remove("active")
    }
})
link.onclick = function(e) {
    e.stopPropagation();
}
let date = new Date()

document.querySelector(".footer .year").textContent = date.getFullYear();