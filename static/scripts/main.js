console.log("main.js is running");

// set up functions are async so they can run on multiple threads maybe

// TODO: move these to a component/island
// set up forms with stuff and things
(function setUpForms() {
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

    console.log("forms are set up");
})();

// set up modals with stuff and things
(function setUpModals() {
    const modals = document.querySelectorAll("dialog.modal");

    modals.forEach((x) =>
        x.addEventListener("click", function (event) {
            const rect = x.getBoundingClientRect();
            const isInDialog = rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width;
            if (!isInDialog) {
                x.close();
            }
        })
    );

    console.log("modals are set up");
})();
