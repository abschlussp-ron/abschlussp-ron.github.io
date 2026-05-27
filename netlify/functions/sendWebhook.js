export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    try {
        const body = JSON.parse(event.body);

        const webhookURL = process.env.DISCORD_WEBHOOK_URL;

        await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: body.content || "Test"
            })
        });

        return {
            statusCode: 200,
            body: "OK"
        };

    } catch (err) {
        console.log(err);

        return {
            statusCode: 500,
            body: "Error"
        };
    }
};
