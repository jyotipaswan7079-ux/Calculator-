const display = document.getElementById("display");

// Add a value to the display
function appendValue(value) {
    if (display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}

// Clear the display
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteLast() {
    if (display.value === "Error") {
        display.value = "";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Calculate the result
function calculate() {
    const expression = display.value;

    if (!expression) {
        return;
    }

    // Allow only calculator characters
    if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
        display.value = "Error";
        return;
    }

    try {
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = String(
                Number(result.toPrecision(12))
            );
        }
    } catch (error) {
        display.value = "Error";
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/^[0-9+\-*/%.()]$/.test(key)) {
        appendValue(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
