console.log("chat.js started");

// resize bar for server-info
// TODO: refactor names and stuff
(async function setUpModals() {
    const appGrid = document.getElementById("app-grid");
    const serverInfo = document.getElementById("server-info");
    const serverInfoResizer = document.getElementById("server-info-resizer");
    const resizeOffset = 2; // half of border width
    const minWidth = serverInfo.computedStyleMap().get("min-width").value;
    const maxWidth = serverInfo.computedStyleMap().get("max-width").value;

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
        const newWidth = event.clientX - containerRect.left + resizeOffset;

        // Make sure nothing explodes by checking min-width and max-width
        if (minWidth < newWidth && newWidth < maxWidth) {
            appGrid.style.setProperty(
                "--server-info-width",
                `${newWidth}px`,
            );
        }
    }

    function stopResize() {
        // Tear down event listeners when user releases mouse click
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);
    }

    console.log("resizer bar is set up");
})();
