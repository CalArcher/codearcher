(function() {
    // Modifying this array allows you to configure the rotating text. Remember to add the full stop at the end!
    let rotatingTextArray = [
        "Software Engineer.",
        "Web Developer.",
        "Digital Designer."        
    ];
    
    // Change the duration of the each cycle. Set this value to 0 to disable it. 
    let rotatingTextCycleDuration = 2;
    
    // Don't modify the lines below.
    function getRotatingTextStyleString(inputTextArray) {
        const baseEM = 1.2;
        const baseIntervalPercentage = 1 / inputTextArray.length;
        let output = "@keyframes rotatingText {\n";
        inputTextArray.forEach((textValue, index) => {
            const startTime = index * baseIntervalPercentage * 100;
            const midTime = startTime + baseIntervalPercentage * 4/5 * 100;
            const currentEM = -index * baseEM + "em";
            output += `${startTime}% {\n    top: ${currentEM};\n}\n${midTime}% {\n    top: ${currentEM};\n}\n`;
        })

        output += "100% {top: 0;}}";
        return output;
    }

    const rotatingTextOverlay = document.querySelector(".rotatingTextOverlay");
    const rotatingTextStyleElement = document.createElement("style");
    rotatingTextStyleElement.innerHTML = getRotatingTextStyleString(rotatingTextArray);
    document.querySelector("head").append(rotatingTextStyleElement);
    rotatingTextCycleDuration && (rotatingTextOverlay.style.animation = `rotatingText ${rotatingTextCycleDuration * rotatingTextArray.length}s infinite ease-out`);
    rotatingTextOverlay.innerHTML = null;
    for (let text of rotatingTextArray) {
        const newElement = document.createElement("span");
        newElement.classList.add("rotatingTextInner");
        newElement.innerText = text;
        rotatingTextOverlay.append(newElement);
    }
})();