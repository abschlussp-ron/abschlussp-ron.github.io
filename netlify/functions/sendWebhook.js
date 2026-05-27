document.getElementById("sendButton").addEventListener("click", async () => {

    const fileInput = document.getElementById("fileInput");

    if (fileInput && fileInput.files.length > 0) {
        console.log("File selected (currently not sent in this version)");
    }

    try {
        const res = await fetch("/.netlify/functions/sendWebhook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: "Neue Leaderboard Anfrage!"
            })
        });

        const text = await res.text();
        console.log("STATUS:", res.status);
        console.log("RESPONSE:", text);

        if (res.ok) {
            alert("Sent successfully!");
        } else {
            alert("Fehler beim Senden!");
        }

    } catch (error) {
        console.error("ERROR:", error);
        alert("Fehler!");
    }
});
