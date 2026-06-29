// Discord Webhook Configuration
const webhookURL = "https://discord.com/api/webhooks/1520762954096578621/9vvboBcmhe5-OE0qwkPKwceQSVLqlZoffJSVwZP3glibp9J04foKcDe9JKv2Xhv6EDMY"

document.getElementById("sendButton").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    const nameInput = document.getElementById("name")
    const munzInput = document.getElementById("anzahl-munzen")
    // Nothing entered
    if (
        fileInput.value.length === 0 &&
        nameInput.value.trim().length === 0 &&
        munzInput.value.trim().length === 0
    ) {
        alert("Bitte Datei, Name und Münzwert eingeben! / Please choose a file, enter your name and coin value!");
        return;
    }

    // File and name missing
    if (
        fileInput.value.length === 0 &&
        nameInput.value.trim().length === 0
    ) {
        alert("Bitte Datei auswählen und Namen eingeben! / Please choose a file and enter your name!");
        return;
    }

    // File and coin value missing
    if (
        fileInput.value.length === 0 &&
        munzInput.value.trim().length === 0
    ) {
        alert("Bitte Datei auswählen und Münzwert eingeben! / Please choose a file and enter coin value!");
        return;
    }

    // Name and coin value missing
    if (
        nameInput.value.trim().length === 0 &&
        munzInput.value.trim().length === 0
    ) {
        alert("Bitte Namen und Münzwert eingeben! / Please enter your name and coin value!");
        return;
    }

    // 1. Validation check: Ensure a file is selected
    if (fileInput.value.length === 0) {
        alert("Bitte Datei auswählen! /  Please chose a file!");
        return;
    }

    if (nameInput.value.length === 0) {
        alert("Bitte Namen eingeben! / Please enter your name!");
        return;
    }

    // Name is too short
    if (nameInput.value.trim().length < 3) {
        alert("Der Name muss mindestens 3 Zeichen lang sein! / The name must be at least 3 characters long!");
        return;
    }

    // Coin value is empty
    if (munzInput.value.length === 0) {
        alert("Bitte Münzwert eingeben! / Please enter coin value!");
        return;
    }

    // Coin value is not a number
    if (isNaN(munzInput.value)) {
        alert("Bitte eine gültige Zahl eingeben! / Please enter a valid number!");
        return;
    }

    // Coin value is negative
    if (Number(munzInput.value) < 0) {
        alert("Der Münzwert darf nicht negativ sein! / Coin value cannot be negative!");
        return;
    }

    // Coin value is zero
    if (Number(munzInput.value) === 0) {
        alert("Der Münzwert muss größer als 0 sein! / Coin value must be greater than 0!");
        return;
    }

    // Coin value is too high
    if (Number(munzInput.value) > 1000000) {
        alert("Der Münzwert ist zu hoch! / Coin value is too high!");
        return;
    }

    // File is larger than 8 MB
    const file = fileInput.files[0];
    if (file && file.size > 8 * 1024 * 1024) 
        alert("Die Datei ist größer als 8 MB! / The file is larger than 8 MB!");
        return;
    }

    // Only allow images
    if (file && !file.type.startsWith("image/")) {
        alert("Bitte nur Bilddateien hochladen! / Please upload only image files!");
        return;
    }

    // Only allow PNG or JPG
    const allowedTypes = ["image/png", "image/jpeg"];
    if (file && !allowedTypes.includes(file.type)) {
        alert("Nur PNG oder JPG sind erlaubt! / Only PNG or JPG files are allowed!");
        return;
    }

    const file = fileInput.files[0];
    const name = nameInput.value;
    const munz = munzInput.value;
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
        "content",
        `Neue Leaderboard Anfrage!\nName: ${name}\nMünzwert: ${munz}`
    );

    try {
        // 2. Dispatch the network payload
        const response = await fetch(webhookURL, {
            method: "POST",
            body: formData
        });

        // 3. Verify HTTP response code ranges in the 200s
        if (response.ok) {
            alert("Sent successfully!");
        } else {
            console.error(`Server error payload state: ${response.status}`);
            if (response.status === 413) {
                alert("Fehler 413: Die Bilddatei ist zu groß für Discord!");
            } else {
                alert(`Fehler! Server-Status: ${response.status}`);
            }
        }

    } catch (error) {
        // Handle physical network dropouts / CORS issues
        console.error("Network connection failure:", error);
        alert("Netzwerkfehler beim Senden!");
    }
});
