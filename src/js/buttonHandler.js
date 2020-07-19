let button = document.getElementsByClassName("specialButton").item(0);
button.addEventListener("click", () => {
    let paragraph = document.createElement("p");
    paragraph.innerHTML = "Button Clicked";
    button.parentNode.appendChild(paragraph);
});