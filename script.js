const generateBtn = document.getElementById("generateBtn");
const copyAllBtn = document.getElementById("copyAllBtn");
const paletteContainer = document.getElementById("paletteContainer");
const copyMessage = document.getElementById("copyMessage");

let currentColors = [];

generateBtn.addEventListener("click", generatePalette);
copyAllBtn.addEventListener("click", copyAllColors);

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
}

generatePalette();
