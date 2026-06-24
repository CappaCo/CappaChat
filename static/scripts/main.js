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

const chatGrid = document.getElementById("chat-grid");
const serverInfo = document.getElementById("server-info");
const serverInfoResizer = document.getElementById("server-info-resizer");

console.log(serverInfoResizer);

// Track mouse down event on the resizer bar
serverInfoResizer.addEventListener("mousedown", function (event) {
    event.preventDefault(); // Prevent text selection while dragging
    console.log("hi");

    // Listen for movements across the entire document
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
});

function resize(event) {
    // Get the horizontal bounding coordinates of the grid container
    const containerRect = serverInfo.getBoundingClientRect();

    // Calculate the new width of the left section in pixels
    const newLeftWidth = event.clientX - containerRect.left;

    console.log(newLeftWidth);

    // Ensure the column doesn"t disappear completely (min-width logic)
    if (newLeftWidth > 100 && newLeftWidth < 500) {
        chatGrid.style.setProperty("--server-info-width", `${newLeftWidth}px`);
    }
}

function stopResize() {
    // Tear down event listeners when user releases mouse click
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
}
