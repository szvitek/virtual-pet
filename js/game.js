// create a new scene camed "Game"
const gameScene = new Phaser.Scene("Game");

// init parameters
gameScene.init = function() {
  // game stats
  this.stats = {
    health: 100,
    fun: 100
  };

  // decay params
  this.decayRates = {
    health: -10,
    fun: -5
  };
};

// load asset files
gameScene.preload = function() {
  // load assets
  this.load.image("backyard", "assets/images/backyard.png");
  this.load.image("apple", "assets/images/apple.png");
  this.load.image("candy", "assets/images/candy.png");
  this.load.image("rotate", "assets/images/rotate.png");
  this.load.image("toy", "assets/images/rubber_duck.png");

  // load spritesheet
  this.load.spritesheet("pet", "assets/images/pet.png", {
    frameWidth: 97,
    frameHeight: 83,
    margin: 1,
    spacing: 1
  });
};

// create
gameScene.create = function() {
  // bg
  const bg = this.add
    .sprite(0, 0, "backyard")
    .setOrigin(0, 0)
    .setInteractive();

  // event listener for bg click (to place objects on it)
  bg.on("pointerdown", (pointer, localX, localY) =>
    this.placeItem(pointer, localX, localY)
  );

  // pet
  this.pet = this.add.sprite(100, 200, "pet", 0).setInteractive();

  this.anims.create({
    key: "funnyfaces",
    frames: this.anims.generateFrameNames("pet", {
      frames: [1, 2, 3]
    }),
    frameRate: 7,
    yoyo: true,
    repeat: 0
  });

  // make pet draggable
  this.input.setDraggable(this.pet);
  // follow pointer (mouse/finger) when dragging
  this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
    // make sprite be located at the coordinates of the dragging
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  this.createUi();

  // show stats to the user
  this.createHud();
  this.refreshHud();

  // decay of health and fun over time
  this.timedEventStats = this.time.addEvent({
    delay: 1000,
    repeat: -1, // repeat forever
    callback: () => {
      // update stats
      this.updateStats(this.decayRates);
    }
  });
};

// create ui
gameScene.createUi = function() {
  // buttons
  this.appleBtn = this.add.sprite(72, 570, "apple").setInteractive();
  this.appleBtn.customStats = { health: 20, fun: 0 };
  this.appleBtn.on("pointerdown", this.pickItem);

  this.candyBtn = this.add.sprite(144, 570, "candy").setInteractive();
  this.candyBtn.customStats = { health: -10, fun: 10 };
  this.candyBtn.on("pointerdown", this.pickItem);

  this.toyBtn = this.add.sprite(216, 570, "toy").setInteractive();
  this.toyBtn.customStats = { health: 0, fun: 15 };
  this.toyBtn.on("pointerdown", this.pickItem);

  this.rotateBtn = this.add.sprite(288, 570, "rotate").setInteractive();
  this.rotateBtn.customStats = { fun: 20 };
  this.rotateBtn.on("pointerdown", this.rotatePet);

  this.buttons = [this.appleBtn, this.candyBtn, this.toyBtn, this.rotateBtn];

  // ui is not blocked
  this.uiBlocked = false;

  this.uiReady();
};

// create HUD
gameScene.createHud = function() {
  // health stat
  this.healthText = this.add.text(20, 20, "Health: ", {
    font: "26px Arial",
    fill: "#ffffff"
  });

  // fun stat
  this.funText = this.add.text(200, 20, "Fun: ", {
    font: "26px Arial",
    fill: "#ffffff"
  });
};

// show the current value of health and fun
gameScene.refreshHud = function() {
  this.healthText.setText(`Health: ${this.stats.health}`);
  this.funText.setText(`Fun: ${this.stats.fun}`);
};

// rotate pet
gameScene.rotatePet = function() {
  if (this.scene.uiBlocked) return;

  // make sure the ui is ready
  this.scene.uiReady();

  // block the ui
  this.scene.uiBlocked = true;
  this.alpha = 0.5;

  this.rotateTween = this.scene.tweens.add({
    targets: this.scene.pet,
    duration: 1000,
    angle: 720,
    pause: false,
    onComplete: (tween, sprites) => {
      // update stats
      this.scene.updateStats(this.customStats);

      // set UI to ready
      this.scene.uiReady();
    }
  });
};

// pick item
gameScene.pickItem = function() {
  // since this function was passed as an event handler this refers to btn sprites (and not the scene)
  if (this.scene.uiBlocked) return;

  // make sure the ui is ready
  this.scene.uiReady();

  // select item
  this.scene.selectedItem = this;

  this.alpha = 0.5;
};

gameScene.uiReady = function() {
  // nothing is being selected
  this.selectedItem = null;

  // set buttons alpha back to 1
  for (const btn of this.buttons) {
    btn.alpha = 1;
  }

  // enable ui
  this.uiBlocked = false;
};

gameScene.placeItem = function(pointer, localX, localY) {
  // localX and localY match the global positions, because bg's origin is at 0,0

  if (!this.selectedItem) return;

  // UI must be unblocked
  if (this.uiBlocked) return;

  // create a new item at the position where the player clicked/tapped
  const newItem = this.add.sprite(
    localX,
    localY,
    this.selectedItem.texture.key
  );

  // block the UI
  this.uiBlocked = true;

  // pet movement (tween)
  let petTween = this.tweens.add({
    targets: this.pet,
    duration: 500,
    x: newItem.x,
    y: newItem.y,
    paused: false,
    onComplete: (tween, sprites) => {
      // destroy item
      newItem.destroy();

      // event listener for when spritesheet animation ends
      this.pet.on("animationcomplete", () => {
        // set pet back to neutral face
        this.pet.setFrame(0);

        // clear the ui
        this.uiReady();
      });

      // play spritesheet animation
      this.pet.play("funnyfaces");

      // update stats
      this.updateStats(this.selectedItem.customStats);
    }
  });
};

// update stats
gameScene.updateStats = function(statDiff) {
  // manually update pet stats
  // this.stats.health += statDiff.health;
  // this.stats.fun += statDiff.fun;

  // flag to see if it's game over
  let isGameOver = false;

  // mor flexible update
  for (stat in statDiff) {
    if (statDiff.hasOwnProperty(stat)) {
      this.stats[stat] += statDiff[stat];

      // stats can't go below 0
      if (this.stats[stat] < 0) {
        isGameOver = true;
        this.stats[stat] = 0;
      }
    }
  }

  // refresh hud
  this.refreshHud();

  // check to see if the game ended
  if (isGameOver) this.gameOver();
};

gameScene.gameOver = function() {
  console.log("game over");
};

// update loop
gameScene.update = function() {};

const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: "Virtual Pet",
  pixelArt: false,
  backgroundColor: "ffffff"
};

const game = new Phaser.Game(config);
