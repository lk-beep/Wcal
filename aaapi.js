function catfact() {
    // Define headers for the API request, including API key and content type
    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "DEMO-API-KEY" // Replace with a valid API key if needed
    });

    // Define request options for the fetch call, using the GET method and the specified headers
    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    // Select all paragraph elements on the page
    const pas = document.querySelectorAll("p");
    
    // Loop through each paragraph element
    pas.forEach((p, index) => {
        // Check if the paragraph does NOT contain the "dintchang" class (filtering out specific elements)
        if (!p.classList.contains("dintchang")) {
            // Fetch a random cat fact from the API
            fetch("https://catfact.ninja/fact?max_length=140", requestOptions)
                .then(response => response.json()) // Parse the JSON response
                .then(result => {
                    const catFact = result.fact; // Get the cat fact from the API result
                    // Update the paragraph's text content with the fetched cat fact
                    p.textContent = `Cat Fact ${index - 1}: ${catFact}`;
                })
                .catch(error => console.log('Error:', error)); // Log any errors to the console
        }
    });
}
