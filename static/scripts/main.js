const formInputs = document.querySelectorAll(
    'input[type="email"],input[type="password"]',
);

formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
        input.parentElement.children[1].classList.add("formTop");
    });
});

formInputs.forEach((input) => {
    input.addEventListener("focusout", () => {
        if (input.value.trim().length == 0) {
            input.parentElement.children[1].classList.remove("formTop");
        }
    });
});
