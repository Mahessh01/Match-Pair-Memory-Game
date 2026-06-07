const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const startBtn = document.getElementById("startBtn");

function checkInputs() {
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();

    if (name !== "" && age !== "" && age >= 10) {
        startBtn.classList.add("active");
        startBtn.href = "index.html";

        // ONLY store when valid
        localStorage.setItem("playerName", name);
    } else {
        startBtn.classList.remove("active");
        startBtn.href = "#";

        // remove fake access
        localStorage.removeItem("playerName");
    }
}

nameInput.addEventListener("input", checkInputs);
ageInput.addEventListener("input", checkInputs);