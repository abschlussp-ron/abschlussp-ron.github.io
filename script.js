// Discord Webhook Configuration
const webhookURL = "https://discord.com/api/webhooks/1509154897138942074/H11dLJ772gl0f4_Fn1Qau5mX6yX7lmbXrpzMl4IfOWujRbx6Tl_j6tTBy6KDdnOG2ZgC";

document.getElementById("sendButton").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");

    // 1. Validation check: Ensure a file is selected
    if (fileInput.files.length === 0) {
        alert("Bitte Datei auswählen!");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("content", "Neue Leaderboard Anfrage!");

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
