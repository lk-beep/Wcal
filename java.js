// if u dont understand what's written here dont touch
function catimg(){
  document.addEventListener("click", () => {
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
            const breedInfo = result[0].breeds[0]?.name || "idfk";
            const imgElement = document.createElement("img");
            imgElement.src = catImageUrl;
            imgElement.alt = "kissa";

            const breedInfoElement = document.createElement("p");
            breedInfoElement.textContent = `Laji: ${breedInfo}`;

            document.body.appendChild(imgElement);
            document.body.appendChild(breedInfoElement);
        })
        .catch(error => console.log('Error:', error));
  });
}