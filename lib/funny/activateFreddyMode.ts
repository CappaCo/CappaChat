// 1. Select all elements on the page
const allElements = document.querySelectorAll("*");

// 2. Filter for elements with text nodes and zero element children
const textOnlyElements = Array.from(allElements).filter((el) => {
    // Checks that it has no HTML child tags AND contains non-empty text
    return el.children.length === 0 && el.textContent.trim().length > 0;
});

console.log(textOnlyElements);

function activateFreddles(elements: Element[]) {
    console.log("activating freddles");
    elements.forEach((element) => {
        element.innerHTML = "freddy"; // TODO: not this
    });
}

const freddyMode = true; // TODO: get this from some settings thingo
if (freddyMode) {
    activateFreddles(textOnlyElements);
}
