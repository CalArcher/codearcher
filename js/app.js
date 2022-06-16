const hamburger = document.querySelector("#hamburgerIcon");
const navMenu = document.querySelector(".desktopNav");
const modalOverlay = document.querySelector('#modalOverlay')
const navItems = document.querySelectorAll(".navItems").forEach(item => {
    item.addEventListener('click', hideMenu)
})

hamburger.addEventListener("click", mobileMenu);
modalOverlay.addEventListener('click', hideModal)

function hideModal() {
    document.querySelector("#linkTreeModal").style.display = "none";
}

function hideMenu() {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active");
}

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

HTMLElement.prototype.delegate = function (eventName, childSelector, callback) {
    this.addEventListener(eventName, function (e) {
        const currentElement = e.target.closest(childSelector);
        if (currentElement === null || !this.contains(currentElement)) return undefined;
        callback.call(currentElement, e);
    });
};

(function () {
    function startClassAnimation(element, animClass) {
        element.classList.remove(animClass);
        setTimeout(() => element.classList.add(animClass), 1);
    }
    
    Array.from(document.querySelectorAll(".mainIconContainer *")).forEach(item=>item.addEventListener("click", function (e) {
        startClassAnimation(document.querySelector(".mainIcon"), "nudge");
    }));
    
    
    
    document.querySelector("body").delegate("click", ".fa-xmark", function() {
        fadeOut(document.querySelector("#" + this.getAttribute("targetElement")), 0.25);
    });
    
    document.querySelector("#connect").addEventListener("click", ()=>fadeIn(document.querySelector("#linkTreeModal"), 0.25));

    function fadeOut(element, time, easing="linear") {
        element.style.removeProperty("animation");
        element.style.animation = `fadeOut ${time}s ${easing} forwards`;
        function hide() {
            element.style.display = "none";
            element.removeEventListener("animationend", hide);
        }
        element.addEventListener("animationend", hide);
    }
    
    function fadeIn(element, time, easing="linear") {
        element.style.removeProperty("animation");
        element.style.removeProperty("display");
        if (getComputedStyle(element).display === "none") {
            element.style.display = "block";
        }
        element.style.opacity = '0';
        setTimeout(()=>{
            element.style.animation = `fadeIn ${time}s ${easing} forwards`;
        }, 5);
    }

    document.querySelector("#linkTreeModal").style.display = "none";
    
    Array.from(document.querySelectorAll(".modularCard a")).map(e=>e.target="_blank");
})();
