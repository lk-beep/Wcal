// This section is a comment indicating that if you don't understand the code, 
// you should not modify it. It is asking for certain keys to be pressed to trigger a page change.
  
// Define the set of required keys for the page change (C and G).
const requiredKeys = new Set(['C', 'G']); // Keys that need to be pressed are C and G
const pressedKeys = new Set(); // To store the keys that have been pressed

// Listen for keydown events (when a key is pressed down).
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();  // Get the key that was pressed and convert it to uppercase
    pressedKeys.add(key);  // Add the pressed key to the set of pressed keys

    // Check if both required keys ('C' and 'G') have been pressed
    if (requiredKeys.size === pressedKeys.size && [...requiredKeys].every(k => pressedKeys.has(k))) {
        window.location.href = 'gam.html'; // If both keys are pressed, change the current page to 'gam.html'
    }
});

// Listen for keyup events (when a key is released).
document.addEventListener('keyup', (event) => {
    pressedKeys.delete(event.key.toUpperCase()); // Remove the key from the set when released
});
