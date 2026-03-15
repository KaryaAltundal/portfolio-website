const generateBtn = document.getElementById("generateBtn");
const copyAllBtn = document.getElementById("copyAllBtn");
const paletteContainer = document.getElementById("paletteContainer");
const copyMessage = document.getElementById("copyMessage");

let currentColors = [];

if (generateBtn) {
    generateBtn.addEventListener("click", generatePalette);
}

if (copyAllBtn) {
    copyAllBtn.addEventListener("click", copyAllColors);
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function generatePalette() {
    paletteContainer.innerHTML = "";
    copyMessage.textContent = "";
    currentColors = [];

    for (let i = 0; i < 5; i++) {
        const color = getRandomColor();
        currentColors.push(color);

        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");

        const colorPreview = document.createElement("div");
        colorPreview.classList.add("color-preview");
        colorPreview.style.backgroundColor = color;

        const colorCode = document.createElement("p");
        colorCode.classList.add("color-code");
        colorCode.textContent = color;

        colorBox.appendChild(colorPreview);
        colorBox.appendChild(colorCode);

        colorBox.addEventListener("click", function () {
            navigator.clipboard.writeText(color);
            copyMessage.textContent = color + " copied to clipboard!";
        });

        paletteContainer.appendChild(colorBox);
    }

    updateCopyButtonGradient();
}

function copyAllColors() {
    const allColorsText = currentColors.join(", ");
    navigator.clipboard.writeText(allColorsText);
    copyMessage.textContent = "All colors copied: " + allColorsText;
}

function updateCopyButtonGradient() {

    const gradient = "linear-gradient(90deg, " + currentColors.join(", ") + ")";
    copyAllBtn.style.background = gradient;

    const glow = currentColors.map(color => `0 0 15px ${color}`).join(",");

    copyAllBtn.style.setProperty("--glow", glow);
}

const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");

navButtons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        const targetId = this.getAttribute("data-target");

        sections.forEach(section => {
            section.classList.remove("active-section");
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add("active-section");
        }
    });
});

generatePalette();
