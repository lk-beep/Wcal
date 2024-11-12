// If you don’t understand what’s written here, don’t touch it.
// This code checks if certain keys are pressed simultaneously to display "rart.png" on the screen.

// Define the keys that must be pressed together to trigger the image display
const requiredKeys = new Set(['I', 'D', 'K']); // The keys 'I', 'D', and 'K' are required
const pressedKeys = new Set(); // A set to keep track of currently pressed keys

// Event listener for when a key is pressed down
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase(); // Convert the key to uppercase for case-insensitive matching
    pressedKeys.add(key); // Add the pressed key to the pressedKeys set

    // Check if all required keys are pressed
    if (requiredKeys.size === pressedKeys.size && [...requiredKeys].every(k => pressedKeys.has(k))) {
        // Display the hidden image by setting its display style to 'block'
        document.getElementById('hidden-image').style.display = 'block';
    }
});

// Event listener for when a key is released
document.addEventListener('keyup', (event) => {
    // Remove the released key from the pressedKeys set
    pressedKeys.delete(event.key.toUpperCase());
    
    // Hide the image again when any of the required keys are released
    document.getElementById('hidden-image').style.display = 'none';
});
