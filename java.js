// get a cat img and breed
function catimg() {
    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "DEMO-API-KEY"
    });

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
        .then(response => response.json())
        .then(result => {
            const catImageUrl = result[0].url;
            const breedInfo = result[0].breeds[0]?.name || "Unknown Breed";
            const imgElement = document.getElementById("vaihtuva-kuva");
            imgElement.src = catImageUrl;
            imgElement.alt = "Random Cat Image";
            imgElement.style.display = "block";

            let breedInfoElement = document.getElementById("breed-info");
            if (!breedInfoElement) {
                breedInfoElement = document.createElement("p");
                breedInfoElement.id = "breed-info";
                document.body.appendChild(breedInfoElement);
            }
            breedInfoElement.textContent = `Rotu: ${breedInfo}`;
        })
        .catch(error => console.log('Error:', error));
}