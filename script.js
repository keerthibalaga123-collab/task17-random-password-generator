// ===============================
// Random Password Generator
// Task 17
// ===============================

// DOM Elements

const passwordInput = document.getElementById("password");

const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const copyMessage = document.getElementById("copyMessage");
const errorMessage = document.getElementById("errorMessage");

const strengthText = document.getElementById("strengthText");
const strengthProgress = document.getElementById("strengthProgress");


// Character Sets

const characterSets = {

    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

    lowercase: "abcdefghijklmnopqrstuvwxyz",

    numbers: "0123456789",

    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};


// Update Length Value

lengthInput.addEventListener("input", () => {

    lengthValue.textContent = lengthInput.value;

});


// Generate Password Function

function generatePassword() {

    const length = Number(lengthInput.value);

    let characterPool = "";

    let selectedTypes = [];

    // Check selected options

    if (uppercaseCheckbox.checked) {

        characterPool += characterSets.uppercase;

        selectedTypes.push(characterSets.uppercase);
    }

    if (lowercaseCheckbox.checked) {

        characterPool += characterSets.lowercase;

        selectedTypes.push(characterSets.lowercase);
    }

    if (numbersCheckbox.checked) {

        characterPool += characterSets.numbers;

        selectedTypes.push(characterSets.numbers);
    }

    if (symbolsCheckbox.checked) {

        characterPool += characterSets.symbols;

        selectedTypes.push(characterSets.symbols);
    }


    // Handle no selection

    if (characterPool.length === 0) {

        passwordInput.value = "";

        errorMessage.textContent =
            "⚠️ Please select at least one character type.";

        strengthText.textContent = "No Selection";

        strengthProgress.style.width = "0%";

        return;
    }


    errorMessage.textContent = "";

    let password = "";


    // Guarantee at least one character from every selected type

    selectedTypes.forEach(type => {

        if (password.length < length) {

            const randomIndex =
                Math.floor(Math.random() * type.length);

            password += type[randomIndex];
        }

    });


    // Fill remaining characters randomly

    while (password.length < length) {

        const randomIndex =
            Math.floor(Math.random() * characterPool.length);

        password += characterPool[randomIndex];
    }


    // Shuffle password

    password = shufflePassword(password);


    // Display password

    passwordInput.value = password;


    // Update strength

    updateStrength(length, characterPool.length);
}


// Shuffle Password

function shufflePassword(password) {

    const characters = password.split("");

    for (let i = characters.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [
            characters[i],
            characters[randomIndex]
        ] = [
            characters[randomIndex],
            characters[i]
        ];
    }

    return characters.join("");
}


// Password Strength

function updateStrength(length, poolSize) {

    let score = 0;


    // Length score

    if (length >= 8) {
        score++;
    }

    if (length >= 12) {
        score++;
    }

    if (length >= 16) {
        score++;
    }


    // Character pool score

    if (poolSize >= 26) {
        score++;
    }

    if (poolSize >= 50) {
        score++;
    }


    if (score <= 2) {

        strengthText.textContent = "Weak";

        strengthProgress.style.width = "35%";

    } else if (score <= 4) {

        strengthText.textContent = "Medium";

        strengthProgress.style.width = "65%";

    } else {

        strengthText.textContent = "Strong";

        strengthProgress.style.width = "100%";
    }
}


// Copy Password

copyBtn.addEventListener("click", async () => {

    const password = passwordInput.value;

    if (!password) {

        errorMessage.textContent =
            "⚠️ Generate a password first.";

        return;
    }

    try {

        await navigator.clipboard.writeText(password);

        copyMessage.textContent =
            "✓ Password copied!";

        setTimeout(() => {

            copyMessage.textContent = "";

        }, 2000);

    } catch (error) {

        // Fallback for older browsers

        passwordInput.select();

        document.execCommand("copy");

        copyMessage.textContent =
            "✓ Password copied!";

        setTimeout(() => {

            copyMessage.textContent = "";

        }, 2000);
    }
});


// Generate Password Button

generateBtn.addEventListener("click", generatePassword);


// Generate Initial Password

generatePassword();