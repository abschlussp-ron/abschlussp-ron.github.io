export const handler = async (event) => {
    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    const body = JSON.parse(event.body);

    const buffer = Buffer.from(body.file, "base64");

    const formData = new FormData();

    formData.append("content", body.content || "New submission");
    formData.append("file", new Blob([buffer]), body.filename || "image.png");

    await fetch(webhookURL, {
        method: "POST",
        body: formData
    });

    return {
        statusCode: 200,
        body: "OK"
    };
};
