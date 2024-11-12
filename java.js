// Function to fetch a random cat image and breed information from the Cat API
function catimg() {
    // Define headers with content type and API key for authorization
    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "DEMO-API-KEY" // Replace with your actual API key if not using the demo key
    });

    // Define request options for the API call
    const requestOptions = {
        method: 'GET', // Specify HTTP method
        headers: headers, // Attach headers for API access
        redirect: 'follow' // Set redirect policy
    };

    // Fetch data from the Cat API with specific parameters for images
    fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
        .then(response => response.json()) // Convert the response to JSON format
        .then(result => {
            // Extract the URL of the cat image from the result
            const catImageUrl = result[0].url;

            // Extract breed name or set to "Unknown Breed" if not available
            const breedInfo = result[0].breeds[0]?.name || "Unknown Breed";

            // Select the <img> element with the ID "vaihtuva-kuva" to display the cat image
            const imgElement = document.getElementById("vaihtuva-kuva");
            imgElement.src = catImageUrl; // Set the image source to the cat image URL
            imgElement.alt = "Random Cat Image"; // Set an alternate text for accessibility
            imgElement.style.display = "block"; // Ensure the image is visible

            // Select or create a <p> element to display the breed information
            let breedInfoElement = document.getElementById("breed-info");
            if (!breedInfoElement) {
                // If the breed info element doesn't exist, create it
                breedInfoElement = document.createElement("p");
                breedInfoElement.id = "breed-info"; // Set an ID to reuse this element in future fetches
                document.body.appendChild(breedInfoElement); // Append the new element to the body
            }
            // Set the text content to display the breed information
            breedInfoElement.textContent = `Rotu: ${breedInfo}`;
        })
        .catch(error => console.log('Error:', error)); // Log any errors that occur during the fetch
}
