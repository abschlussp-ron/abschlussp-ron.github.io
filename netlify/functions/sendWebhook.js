export default async (req) => {
  try {
    const data = await req.json();

    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    const payload = {
      content: data.content || "Neue Nachricht!"
    };

    const res = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      return new Response("Discord error", { status: 500 });
    }

    return new Response("OK", { status: 200 });

  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
};
