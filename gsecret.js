// if u dont understand what's written here dont touch    
// mitä pitää painaa pohjaan että gam.html tulee näkyviin
const requiredKeys = new Set(['C', 'G']);
const pressedKeys = new Set();

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    pressedKeys.add(key);

    // tarkista onko kirjaimet painettu
    if (requiredKeys.size === pressedKeys.size && [...requiredKeys].every(k => pressedKeys.has(k))) {
        window.location.href = 'gam.html'; // Redirect to gam.html
    }
});

document.addEventListener('keyup', (event) => {
    pressedKeys.delete(event.key.toUpperCase());
});
