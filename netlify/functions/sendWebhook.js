export const handler = async (event) => {

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const webhookURL = process.env.DISCORD_WEBHOOK_URL;

        // ⚠️ kein File-Parsing hier (nur Text)
        const content = JSON.parse(event.body).content;

        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: content || "Neue Nachricht!"
            })
        });

        return {
            statusCode: response.ok ? 200 : 500,
            body: response.ok ? "OK" : "Discord error"
        };

    } catch (err) {
        console.log(err);

        return {
            statusCode: 500,
            body: "Server error"
        };
    }
};
