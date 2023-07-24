(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const mainOutput = document.querySelector(".main__output");
    const mainInput = document.querySelector(".main__input");
    let userScore = 1;
    const quantity = 6;
    function getRandomNumber(max = 100, min = 0) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    mainInput.disabled = true;
    document.querySelector(".main__button").disabled = true;
    let randomNumber;
    document.addEventListener("click", (function(e) {
        if (e.target.closest(".main__play-button")) {
            document.querySelector(".main__button").disabled = false;
            randomNumber = getRandomNumber();
            console.log(randomNumber);
            e.target.closest(".main__play-button").hidden = true;
            mainInput.disabled = false;
            mainOutput.classList.remove("wrong");
            mainOutput.textContent = `Число загадано`;
        }
        if (e.target.closest(".main__button")) {
            const userNumber = document.querySelector(".main__input").value;
            findNumber(randomNumber, userNumber);
            mainInput.value = "";
        }
    }));
    function findNumber(randomNumber, userNumber) {
        if (Number.isNaN(Number(userNumber))) {
            document.querySelector(".main__play-button").hidden = false;
            mainInput.disabled = true;
            mainOutput.classList.add("wrong");
            mainOutput.textContent = `Вы ввели не число, пожалуйста введите число.\n        Начните заново.`;
            userScore = 1;
            mainInput.value = "";
        }
        if (mainInput.value === "") {
            mainOutput.innerHTML = `Введите число`;
            document.querySelector(".main__play-button").textContent = `Сыграть еще раз`;
            return;
        } else if (randomNumber > Number(userNumber)) mainOutput.innerHTML = `Заданное число <span>больше</span> введеного`; else if (randomNumber < Number(userNumber)) mainOutput.innerHTML = `Заданное число <span>меньше</span> введеного`; else if (randomNumber === Number(userNumber)) {
            restartGame(`Опа ты выйграл!!! Количество попыток: ${userScore}<br>Загаданное число было: <span>${randomNumber}</span>`);
            return;
        }
        scoreCounter();
        if (document.querySelector(".main__counter")) document.querySelector(".main__counter").textContent = `${userScore}/${quantity}`;
    }
    function scoreCounter() {
        userScore++;
        if (userScore === quantity + 1) restartGame(`У вас не получилось :( \n Попробуйте еще раз.<br>Заданное число было: <span>${randomNumber}</span>`);
    }
    function restartGame(mainText) {
        userScore = 1;
        randomNumber = getRandomNumber();
        console.log(randomNumber);
        mainOutput.innerHTML = `${mainText}`;
        mainInput.disabled = true;
        document.querySelector(".main__play-button").textContent = `Сыграть еще раз`;
        document.querySelector(".main__play-button").hidden = false;
    }
    window["FLS"] = true;
    isWebp();
})();