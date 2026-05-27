export const handler = async (event) => {

    // Nur POST erlauben
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    try {
        // Daten aus dem Frontend lesen
        const body = JSON.parse(event.body);

        const webhookURL = process.env.DISCORD_WEBHOOK_URL;

        // Nachricht an Discord senden
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: body.content || "Neue Nachricht!"
            })
        });

        if (!response.ok) {
            const text = await response.text();
            console.log("Discord Error:", text);

            return {
                statusCode: 500,
                body: "Discord failed"
            };
        }

        return {
            statusCode: 200,
            body: "OK"
        };

    } catch (err) {
        console.log("Server Error:", err);

        return {
            statusCode: 500,
            body: "Server error"
        };
    }
};
