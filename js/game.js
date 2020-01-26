// create a new scene camed "Game"
const gameScene = new Phaser.Scene("Game");

// init parameters
gameScene.init = function() {
  // game stats
  this.stats = {
    health: 100,
    fun: 100
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
  this.add
    .sprite(0, 0, "backyard")
    .setOrigin(0, 0)
    .setInteractive();

  // pet
  this.pet = this.add.sprite(100, 200, "pet", 0).setInteractive();

  // make pet draggable
  this.input.setDraggable(this.pet);
  // follow pointer (mouse/finger) when dragging
  this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
    // make sprite be located at the coordinates of the dragging
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  this.createUi();
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
  this.rotateBtn.on("pointerdown", this.rotatePet);

  this.buttons = [this.appleBtn, this.candyBtn, this.toyBtn, this.rotateBtn];

  // ui is not blocked
  this.uiBlocked = false;

  this.uiReady();
};

// rotate pet
gameScene.rotatePet = function() {
  if (this.scene.uiBlocked) return;

  // make sure the ui is ready
  this.scene.uiReady();

  // block the ui
  this.scene.uiBlocked = true;
  this.alpha = 0.5;

  setTimeout(() => this.scene.uiReady(), 2000);

  console.log("rotating the pet");
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

  console.log("picking an item %s", this.texture.key);
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
