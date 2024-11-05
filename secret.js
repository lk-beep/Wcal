// if u dont understand what's written here dont touch    
    // mitä pitää painaa pohjaan että rart.png tulee näytölle
    const requiredKeys = new Set(['I', 'D', 'K']);
    const pressedKeys = new Set();

    document.addEventListener('keydown', (event) => {
        const key = event.key.toUpperCase();
        pressedKeys.add(key);

        // tarkista onko kirjaimet painettu
        if (requiredKeys.size === pressedKeys.size && [...requiredKeys].every(k => pressedKeys.has(k))) {
            document.getElementById('hidden-image').style.display = 'block';
        }
    });

    document.addEventListener('keyup', (event) => {
        pressedKeys.delete(event.key.toUpperCase());
        document.getElementById('hidden-image').style.display = 'none';
    });