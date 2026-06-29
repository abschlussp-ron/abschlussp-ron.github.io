// Discord Webhook Configuration
const webhookURL = "https://discord.com/api/webhooks/1520762954096578621/9vvboBcmhe5-OE0qwkPKwceQSVLqlZoffJSVwZP3glibp9J04foKcDe9JKv2Xhv6EDMY"

document.getElementById("sendButton").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    const nameInput = document.getElementById("name")
    const munzInput = document.getElementById("anzahl-munzen")
   // Validate all inputs

    // File, name and coin value are missing
    if (
        fileInput.value.length === 0 &&
        nameInput.value.trim().length === 0 &&
        munzInput.value.trim().length === 0
    ) {
        alert("Bitte Datei schicken, Namen eingeben und Muenzwert eingeben! / Please choose a file, enter your name and coin value!");
        return;
    }

    // File and name are missing
    if (
        fileInput.value.length === 0 &&
        nameInput.value.trim().length === 0
    ) {
        alert("Bitte Datei schicken und Namen eingeben! / Please choose a file and enter your name!");
        return;
    }

    // File and coin value are missing
    if (
        fileInput.value.length === 0 &&
        munzInput.value.trim().length === 0
    ) {
        alert("Bitte Datei schicken und Muenzwert eingeben! / Please choose a file and enter coin value!");
        return;
    }
    
    // Name and coin value are missing
    if (
        nameInput.value.trim().length === 0 &&
        munzInput.value.trim().length === 0
    ) {
        alert("Bitte Namen und Muenzwert eingeben! / Please enter your name and coin value!");
        return;
    }

    // File is missing
    if (fileInput.value.length === 0) {
        alert("Bitte Datei auswaehlen! / Please choose a file!");
        return;
    }

    // Name is missing
    if (nameInput.value.trim().length === 0) {
        alert("Bitte Namen eingeben! / Please enter your name!");
        return;
    }

    // Coin value is missing
    if (munzInput.value.trim().length === 0) {
        alert("Bitte Muenzwert eingeben! / Please enter coin value!");
        return;
    }

    // Name is too short
    if (nameInput.value.trim().length < 3) {
        alert("Der Name muss mindestens 3 Zeichen lang sein! / The name must be at least 3 characters long!");
        return;
    }

    // Coin value is not a number
    if (isNaN(munzInput.value)) {
        alert("Bitte eine gueltige Zahl eingeben! / Please enter a valid number!");
        return;
    }

    // Coin value is less than 1
    if (Number(munzInput.value) < 1) {
        alert("Der Munzwert muss groesser als 0 sein! / Coin value must be greater than 0!");
        return;
    }

    // Coin value is too high
    if (Number(munzInput.value) > 1000000) {
        alert("Der Munzwert ist zu hoch! / Coin value is too high!");
        return;
    }    

    // File checks
    const file = fileInput.files[0];
    
    // File is larger than 8 MB
    if (file && file.size > 8 * 1024 * 1024) {
        alert("Die Datei ist groesser als 8 MB! / The file is larger than 8 MB!");
        return;
    }

    // File is not an image
    if (file && !file.type.startsWith("image/")) {
        alert("Bitte nur Bilddateien hochladen! / Please upload only image files!");
        return;
    }

    // Only allow PNG, JPG and JPEG
    const allowedTypes = [
        "image/png",
        "image/jpeg"
    ];

    if (file && !allowedTypes.includes(file.type)) {
        alert("Nur PNG oder JPG Dateien sind erlaubt! / Only PNG or JPG files are allowed!");
        return;
    }

    const fileb = fileInput.files[0];
    const name = nameInput.value;
    const munz = munzInput.value;
    const formData = new FormData();
    formData.append("file", fileb);
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
                alert("Fehler 413: Die Bilddatei ist zu gross fuer Discord! / The File is too big for Discord!");
            } else {
                alert(`Fehler! Server-Status: ${response.status}`);
            }
        }

    } catch (error) {
        // Handle physical network dropouts / CORS issues
        console.error("Network connection failure:", error);
        alert("Netzwerkfehler beim Senden! / Networkfailure while sending!");
    }
});
