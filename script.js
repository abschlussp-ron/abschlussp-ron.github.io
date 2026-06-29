// Discord Webhook Configuration
const webhookURL = await fetch("a.gitignore").then(res => res.text());

document.getElementById("sendButton").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    const nameInput = document.getElementById("name")
    const munzInput = document.getElementById("anzahl-munzen")

    // 1. Validation check: Ensure a file is selected
    if (fileInput.value.length === 0) {
        alert("Bitte Datei auswählen! /  Please chose a file!");
        return;
    }

    if (nameInput.textContent.length === 0) {
        alert("Bitte Namen eingeben! / Please enter your name!")
        return;
    }

    if (munzInput.value.length === 0) {
        alert("Bitte Munzwert eingeben! / Please enter coin value!")
    }

    const file = fileInput.files[0];
    const name = nameInput.textContent;
    const munz = munzInput.value;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("content", "Neue Leaderboard Anfrage!");
    formData.append("name", name)
    formData.append("munzwert", munz)

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
