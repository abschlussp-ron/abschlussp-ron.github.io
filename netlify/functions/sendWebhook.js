export const handler = async (event) => {

    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    // FormData kommt als base64 / raw string → NICHT JSON.parse!

    const content = event.body; // nur als test

    const response = await fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: "File Upload received (debug)"
        })
    });

    return {
        statusCode: 200,
        body: "OK"
    };
};
