import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false
    }
};

export const handler = async (event) => {
    const form = new formidable.IncomingForm();

    return new Promise((resolve) => {
        form.parse(event, async (err, fields, files) => {

            const file = files.file;
            const content = fields.content || "File Upload";

            const formData = new FormData();
            formData.append("content", content);

            if (file) {
                formData.append(
                    "file",
                    fs.createReadStream(file.filepath),
                    file.originalFilename
                );
            }

            const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
                method: "POST",
                body: formData
            });

            resolve({
                statusCode: response.ok ? 200 : 500,
                body: response.ok ? "OK" : "Discord error"
            });
        });
    });
};
