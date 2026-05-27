export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

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
    console.log(err);

    return {
      statusCode: 500,
      body: "Server error"
    };
  }
};
