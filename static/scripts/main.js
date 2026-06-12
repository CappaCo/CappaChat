console.log("main.js is running");

const formInputs = document.querySelectorAll("form input");

const moveUpClass = "move-up";

formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
        input.parentElement.children[0].classList.add(moveUpClass);
    });
});

formInputs.forEach((input) => {
    input.addEventListener("focusout", () => {
        if (input.value.trim().length == 0) {
            input.parentElement.children[0].classList.remove(moveUpClass);
        }
    });
});
