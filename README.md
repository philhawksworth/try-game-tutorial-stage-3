# 🦕 Dino Runner Game

A comprehensive tutorial series for building a Dino Runner game using Deno and
TypeScript.

## Stage 3: Obstacles & Collision Detection

This stage completes the core game functionality by adding obstacles, collision
detection, and a complete game over/restart cycle.

### Getting started

You can clone and deploy this project immediately to start building the Dino
Runner game.

[![Deploy on Deno](https://deno.com/button)](https://app.deno.com/new?clone=https://github.com/thisisjofrank/game-tutorial-stage-3.git&install=deno+install&entrypoint=src/main.ts&mode=dynamic)

Once deployed, you can clone the created project to your local machine to work
on it. Every time you commit and push changes to the GitHub repository, it will
automatically deploy to Deno Deploy and you can see the changes live.

## Project structure

```text
Runner Game/
├── src/                    # Server-side source code
│   ├── main.ts             # Server entry point
│   └── routes/             # Route definitions
│       └── api.routes.ts   # API route definitions
├── public/                 # Client-side static files
│   ├── index.html          # Main landing page
│   ├── js/
│   │   └── game.js         # Client-side game logic
│   └── css/
│       └── styles.css      # Styling
├── deno.json               # Deno configuration
├── .env.example            # Environment variables template
└── README.md               # Documentation
```

## `game.ts`

### 1. Obstacle system

In the client side `game.js` file, we added a system to spawn obstacles at
random intervals. The obstacles are represented as objects with properties like
`x`, `y`, `width`, `height`, and `type`. The game now spawns different types of
cacti that the dino must jump to avoid:

```javascript
spawnObstacle() {
  const obstacleTypes = [
    { width: 20, height: 40, type: 'cactus-small' },
    { width: 25, height: 50, type: 'cactus-medium' },
    { width: 30, height: 35, type: 'cactus-wide' }
  ];
  
  const obstacle = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
  
  this.obstacles.push({
    x: this.canvas.width,
    y: this.groundY - obstacle.height,
    width: obstacle.width,
    height: obstacle.height,
    type: obstacle.type
  });
}
```

#### 2. Collision detection

We implemented a collision detection system that checks if the dino collides
with any obstacles. If a collision is detected, the game transitions to the game
over state:

```javascript
checkCollisions() {
  for (let obstacle of this.obstacles) {
    if (this.dino.x < obstacle.x + obstacle.width &&
        this.dino.x + this.dino.width > obstacle.x &&
        this.dino.y < obstacle.y + obstacle.height &&
        this.dino.y + this.dino.height > obstacle.y) {
      this.gameOver();
      return;
    }
  }
}
```

#### 3. High score system

We added a high score system that tracks the highest score achieved during
gameplay. The high score is saved in `localStorage` and displayed on the game
over screen:

```javascript
saveHighScore() {
  if (Math.floor(this.score) > this.highScore) {
    this.highScore = Math.floor(this.score);
    localStorage.setItem('dinoHighScore', this.highScore);
    console.log(`🏆 New High Score: ${this.highScore}!`);
  }
}
```

#### 4. Progressive difficulty

As the player progresses and scores points, the game becomes more challenging.
We implemented a system to increase the game speed and obstacle spawn rate based
on the player's score:

```javascript
updateGameDifficulty() {
  const difficultyLevel = Math.floor(this.score / 200);
  this.gameSpeed = this.initialGameSpeed + (difficultyLevel * 0.5);
  this.obstacleSpawnRate = Math.max(60, 120 - (difficultyLevel * 10));
}
```

## `index.html`

### 1. High score display added

```html
<div class="game-ui">
  <div class="score">Score: <span id="score">0</span></div>
  <div class="high-score">
    High Score: <span id="highScore">0</span>
  </div>
  <div class="game-status" id="gameStatus">Click to Start!</div>
</div>
```

The game UI now includes a dedicated high score display alongside the current
score. The `score-container` div groups both score elements together for better
visual organization.

## `styles.css`

**Stage 3 Updates:** Enhanced styling to support the high score display and
improved game UI organization.

### Running Stage 3

```bash
deno run dev
```

Navigate to [http://localhost:8000](http://localhost:8000) and experience the
complete dino runner game with obstacles, collision detection, and high score
tracking!

## Stage 3 accomplishments

By completing Stage 3, you'll have:

- ✅ Built a complete infinity runner game matching Chrome dino functionality
- ✅ Implemented random obstacle generation and movement
- ✅ Added precise collision detection with game over logic
- ✅ Created persistent high score tracking with localStorage
- ✅ Implemented progressive difficulty scaling
- ✅ Built complete game state management (waiting/playing/gameOver)
- ✅ Enhanced visual design with animated dino and varied obstacles
- ✅ Created a polished game over screen with restart functionality

The game is now fully playable and provides the classic infinite runner
experience! 🎮

## Next steps

You can now proceed to
[Stage 4](https://github.com/thisisjofrank/game-tutorial-4), where we will add a
database to store high scores and implement a leaderboard system. We'll also add
a customization feature to allow players to change the appearance of the game.
