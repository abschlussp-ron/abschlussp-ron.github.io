export const handler = async (event) => {

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    try {
        const body = JSON.parse(event.body || "{}");

        console.log("Received body:", body);

        const webhookURL = process.env.DISCORD_WEBHOOK_URL;

        if (!body.content) {
            return {
                statusCode: 400,
                body: "No content provided"
            };
        }

        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: body.content
            })
        });

        if (!response.ok) {
            const text = await response.text();
            console.log("Discord error:", text);

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
        console.log("Error:", err);

        return {
            statusCode: 500,
            body: "Server error"
        };
    }
};
