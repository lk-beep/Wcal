// Game variables
let player = {
    name: "Cat",
    health: 100,
    inventory: [],
    position: { x: 0, y: 0 },  // Ensure the player starts at this position
    discoveredRooms: []  // Keep track of rooms already visited
};

// Dungeon layout (shuffled at the start of each game session)
let dungeonLayout = [
    { name: "Starting Room", description: "You are in the starting room. It's quiet.", enemies: [] },
    { name: "Kitchen", description: "You smell something Nasty! Watch out there is a rat in here!", enemies: [{ name: "Rat", health: 20 }] },
    { name: "Library", description: "You find some dusty books. There’s a shiny fish here!", enemies: [], item: "Shiny Fish" },
    { name: "Armory", description: "You find some old armor. You may need it later.", enemies: [], item: "Old Armor" },
    { name: "Exit", description: "You've found the exit! You can escape now if you want.", enemies: [] },
    { name: "Rat Room 2", description: "A rat jumps out at you!", enemies: [{ name: "Rat", health: 20 }] }
];

// Stores the shuffled layout of the dungeon
let dungeon = [];

// Shuffle the dungeon array (Fisher-Yates shuffle), but keep the starting room fixed
function shuffleDungeon() {
    // Create a copy of the original layout
    dungeon = [...dungeonLayout];

    // Find the Starting Room and keep it at the first position
    const startingRoomIndex = dungeon.findIndex(room => room.name === "Starting Room");
    const startingRoom = dungeon.splice(startingRoomIndex, 1)[0];  // Remove the starting room
    dungeon.unshift(startingRoom);  // Insert it at the beginning

    // Shuffle the remaining rooms (everything except the starting room)
    for (let i = dungeon.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * (i - 1)) + 1; // Only shuffle from index 1 onwards
        [dungeon[i], dungeon[j]] = [dungeon[j], dungeon[i]]; // Swap elements
    }

    // Ensure player starts at the "Starting Room" (position (0,0))
    player.position = { x: 0, y: 0 };
}

// Initialize the game
function updateGameStatus() {
    const currentRoom = dungeon[getRoomIndex(player.position.x, player.position.y)];
    document.getElementById('story').textContent = currentRoom.description;

    // Check if the room has already been discovered
    if (player.discoveredRooms.includes(currentRoom.name)) {
        if (currentRoom.item) {
            // If it's an item room and already visited
            document.getElementById('status').textContent = "You've already discovered this item.";
        } else if (currentRoom.enemies.length > 0) {
            // If it's a rat room and already visited
            document.getElementById('status').textContent = "You've already taken care of the pest.";
        }
    } else {
        // Handle items in the room
        if (currentRoom.item) {
            player.inventory.push(currentRoom.item);
            player.discoveredRooms.push(currentRoom.name);  // Mark this room as visited
            document.getElementById('status').textContent = `You found a ${currentRoom.item}! It has been added to your inventory.`;
        } else if (currentRoom.enemies.length > 0) {
            // Only fight in a rat room on the first visit
            handleEnemyEncounter(currentRoom.enemies[0], currentRoom.name);
        } else {
            document.getElementById('status').textContent = "There’s nothing here, but the room feels familiar.";
        }
    }

    // Update inventory display
    document.getElementById('inventory').textContent = `Inventory: ${player.inventory.join(', ') || 'Empty'}`;

    // Show the Exit buttons if the player is at the Exit room
    if (currentRoom.name === "Exit") {
        document.getElementById('exit-buttons').style.display = 'block';
        // Hide regular movement buttons
        document.getElementById('action-buttons').style.display = 'none';
    }
}

// Get the index of the room based on player position
function getRoomIndex(x, y) {
    return y * 2 + x;
}

// Handle enemy encounters (Rat fight logic)
function handleEnemyEncounter(enemy, roomName) {
    // If the enemy is a rat, we check if this is the player's first visit to this room
    if (enemy.name === "Rat") {
        // If this rat room has been discovered already, do nothing
        if (player.discoveredRooms.includes(roomName)) {
            document.getElementById('status').textContent = "You've already taken care of the pests.";
            return;
        }

        // If the player doesn't have the required item, they lose
        if (!player.inventory.includes("Shiny Fish") && !player.inventory.includes("Old Armor")) {
            showGameOverScreen();
            return;
        }

        // If the player has the required item, it's consumed
        if (player.inventory.includes("Shiny Fish")) {
            player.inventory.splice(player.inventory.indexOf("Shiny Fish"), 1);
            document.getElementById('status').textContent = "You used the Shiny Fish to defeat the rat!";
        } else if (player.inventory.includes("Old Armor")) {
            player.inventory.splice(player.inventory.indexOf("Old Armor"), 1);
            document.getElementById('status').textContent = "You used the Old Armor to defeat the rat!";
        }

        // Mark this room as visited
        player.discoveredRooms.push(roomName);
    }
}

// Movement functions
function moveNorth() {
    if (player.position.y > 0) {
        player.position.y--;
        updateGameStatus();
    }
}

function moveSouth() {
    if (player.position.y < 2) {
        player.position.y++;
        updateGameStatus();
    }
}

function moveEast() {
    if (player.position.x < 1) {
        player.position.x++;
        updateGameStatus();
    }
}

function moveWest() {
    if (player.position.x > 0) {
        player.position.x--;
        updateGameStatus();
    }
}

// Event listeners for movement
document.getElementById('move-north').addEventListener('click', moveNorth);
document.getElementById('move-south').addEventListener('click', moveSouth);
document.getElementById('move-east').addEventListener('click', moveEast);
document.getElementById('move-west').addEventListener('click', moveWest);

// Event listeners for Exit buttons
document.getElementById('exit-game').addEventListener('click', function() {
    alert("Congratulations! You have escaped the dungeon!");
    window.location.href = 'Etusivu.html';
});

// Event listener for "Try Again" button
document.getElementById('try-again').addEventListener('click', function() {
    // Reset the game to the starting state
    player = {
        name: "Cat",
        health: 100,
        inventory: [],
        position: { x: 0, y: 0 },
        discoveredRooms: []  // Reset discovered rooms on retry
    };
    

    // Shuffle the dungeon and re-initialize the game
    shuffleDungeon();
    updateGameStatus();

    // Show the movement buttons and hide exit buttons
    document.getElementById('action-buttons').style.display = 'block';
    document.getElementById('exit-buttons').style.display = 'none';

    // Hide the game over screen
    document.getElementById('game-over-screen').style.display = 'none';
});
document.getElementById('try-again2').addEventListener('click', function() {
    // Reset the game to the starting state
    player = {
        name: "Cat",
        health: 100,
        inventory: [],
        position: { x: 0, y: 0 },
        discoveredRooms: []  // Reset discovered rooms on retry
    };
    

    // Shuffle the dungeon and re-initialize the game
    shuffleDungeon();
    updateGameStatus();

    // Show the movement buttons and hide exit buttons
    document.getElementById('action-buttons').style.display = 'block';
    document.getElementById('exit-buttons').style.display = 'none';

    // Hide the game over screen
    document.getElementById('game-over-screen').style.display = 'none';
});

// Event listener for "Give Up" button
document.getElementById('give-up').addEventListener('click', function() {
    alert("You gave up! Better luck next time!");
    window.location.href = 'Etusivu.html';
});

// Show the game over screen
function showGameOverScreen() {
    // Display the game over screen
    document.getElementById('game-over-screen').style.display = 'block';

    // Hide movement, exit, and any other buttons
    document.getElementById("action-buttons").style.display = 'none';
    document.getElementById("exit-buttons").style.display = 'none';

    // Show only the "Try Again" and "Give Up" buttons
    document.getElementById('try-again').style.display = 'inline-block';
    document.getElementById('give-up').style.display = 'inline-block';
}

// Initialize the game
shuffleDungeon();
updateGameStatus();
