var modal = document.getElementById("login-modal");

var btn = document.getElementsByClassName("left");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function() {
    modal.style.display = "none";
}