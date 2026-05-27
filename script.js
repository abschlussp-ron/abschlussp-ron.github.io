
            const webhookURL = "https://discord.com/api/webhooks/1509154897138942074/H11dLJ772gl0f4_Fn1Qau5mX6yX7lmbXrpzMl4IfOWujRbx6Tl_j6tTBy6KDdnOG2ZgC";

            document
            .getElementById("sendButton")
            .addEventListener("click", async () => {

                const fileInput = document.getElementById("fileInput");

                if(fileInput.files.length === 0){
                    alert("Bitte Datei auswählen!");
                    return;
                }

                const file = fileInput.files[0];

                const formData = new FormData();

                formData.append("file", file);

                formData.append(
                    "content",
                    "Neue Leaderboard Anfrage!"
                );

                try{

                    await fetch(webhookURL, {
                        method: "POST",
                        body: formData
                    });

                    alert("Sent successfully!");

                }catch(error){

                    console.error(error);

                    alert("Fehler!");
                }
            });