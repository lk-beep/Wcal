function catfact() {
    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "DEMO-API-KEY"
    });

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    const pas = document.querySelectorAll("p");

    pas.forEach((p, index) => {
        fetch("https://catfact.ninja/fact?max_length=140", requestOptions)
            .then(response => response.json())
            .then(result => {
                const catFact = result.fact;
                p.textContent = `Cat Fact ${index + 1}: ${catFact}`;
            })
            .catch(error => console.log('Error:', error));
    });
}