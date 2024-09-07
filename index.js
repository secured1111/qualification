function generateMessage() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const occupation = document.getElementById('occupation').value;
    const amount = document.getElementById('amount').value;
    const imageFile = document.getElementById('image').files[0];

    if (name && age && occupation && amount && imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageSrc = event.target.result;
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = 800;
            canvas.height = 600;

            // Draw the background
            ctx.fillStyle = "#eaf4e9";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the logo
            const logo = new Image();
            logo.src = 'img/chase.png'; // Your logo file path
            logo.onload = function() {
                ctx.drawImage(logo, 20, 20, 120, 60);

                // Draw the recipient's image
                const img = new Image();
                img.src = imageSrc;
                img.onload = function() {
                    ctx.drawImage(img, 300, 100, 200, 200);

                    // Add the congratulatory message
                    ctx.fillStyle = "#2c3e50";
                    ctx.font = "24px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText(`Congratulations, ${name}!`, canvas.width / 2, 350);

                    ctx.font = "18px Arial";
                    ctx.fillText(`At the age of ${age}, your dedication as a ${occupation}`, canvas.width / 2, 380);
                    ctx.fillText(`has truly earned you a well-deserved recognition.`, canvas.width / 2, 410);
                    ctx.fillText(`We are thrilled to award you a grant of ${amount}!`, canvas.width / 2, 440);
                    ctx.fillText(`This grant will support your valuable work.`, canvas.width / 2, 470);
                    ctx.fillText(`We believe in your potential and wish you continued success!`, canvas.width / 2, 500);

                    // Display download button
                    document.getElementById('downloadBtn').style.display = "inline";
                    document.getElementById('downloadBtn').onclick = function() {
                        const link = document.createElement('a');
                        link.download = `${name}-Grant-Qualification.png`;
                        link.href = canvas.toDataURL();
                        link.click();
                    };
                };
                img.onerror = function() {
                    alert("There was an error loading the recipient's image.");
                };
            };
            logo.onerror = function() {
                alert("There was an error loading the logo image.");
            };
        };
        reader.onerror = function() {
            alert("There was an error reading the image file.");
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert("Please fill in all the details and upload an image.");
    }
}
