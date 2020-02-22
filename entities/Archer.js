var spritesheets = []; 
function loadArcherSpriteSheets(AM) {
	spritesheets['idle'] = AM.getAsset("./assets/sprites/Archer-IdleFlip.png"); 
	spritesheets['attack'] = AM.getAsset("./assets/sprites/Archer-ShootingFlip.png"); 
	spritesheets['dying'] = AM.getAsset("./assets/sprites/Archer-DyingFlip.png"); 
}

function Archer(game, AssetManager, startX, startY) {
	this.AM = AssetManager; 
	loadArcherSpriteSheets(this.AM);
	this.ctx = game.ctx; 
	this.idle(); 
	this.state = "idle"; 
	this.x = startX;
	this.type = "enemy"; 
	this.y = startY;
	this.speed = 0; 
	this.time = 0; 
	this.game = game;  
	this.dead = false; 
	this.aftermath = 0; 
	this.width = 182; 
	this.name = "archer"; 
	this.live = 0; 
	this.PlayingTempAnimation = false; 
	var underworld = false; 
	var that = this; 
	document.addEventListener("keydown", function (e) {
		if (e.code === "Space"){
			if (that.live === 0) {
            	that.live = 1;
            } else {
            	that.live = 0; 
            }
            console.log("underworld: " + that.underworld);
            e.preventDefault();
            that.underworld = !that.underworld;
        }
    });
}

Archer.prototype = new Entity();
Archer.prototype.constructor = Archer;

Archer.prototype.draw = function () {
	if (!this.underworld) return; 
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x - this.game.getCamera().getX(), this.y);
    Entity.prototype.draw.call(this);
}

Archer.prototype.update = function () {
	if (this.live === 0) return; 
	if (this.dead === true) this.aftermath++; 
	if (this.aftermath > 40) this.removeFromWorld = true; 
	var that = this; 
    this.x += this.game.clockTick * this.speed;
    ControlAnimation(this); 
    Entity.prototype.update.call(this);
    this.time++;
    for (var i = 0; i < this.game.entities.length; i++) {
    	var ent = this.game.entities[i];
    	if (ent.name === 'comet') {
    		if (this.collide(ent)) this.die(); 
	    }
	    if (ent.name === 'pharaoh' && ent.attacking === true) {
	    	if (this.collideSlash(ent)) this.die();
	    }
    }	
    this.shooting();   
}

Archer.prototype.collide = function(other) {
    if ((other.x - 70) < this.x && this.x < (other.x + 70) && this.y >= (other.y - 100) && this.y <= (other.y + 200)) {
   		return true; 
   }
}

Archer.prototype.collideSlash = function(other) {
    if ((other.x - 200) < this.x && this.x < (other.x + 200) && this.y >= (other.y - 100) && this.y <= (other.y + 200)) {
   		return true; 
   }
}

Archer.prototype.die = function() {
	this.dead = true; 
	this.animation = new Animation(spritesheets['dying'], 910, 900, 15, .05, 15, false, .2); 
}

Archer.prototype.idle = function() {
	this.animation = new Animation(spritesheets['idle'], 910, 900, 8, .05, 8, true, .2); 
}

Archer.prototype.shooting = function() {
		if (!this.underworld) return; 
		if (this.time > 100) {
		this.animation = new Animation(spritesheets['attack'], 910, 900, 9, .03, 9, false, .2); 
		var arrow = new Arrow(this.game, this.AM, this.x - 130, this.y + 105); 
		this.game.addEntity(arrow); 
		this.PlayingTempAnimation = true; 
		this.time = 0; 
	}
}

function ControlAnimation(archer) {
	if(archer.PlayingTempAnimation && archer.animation.isDone()) {
        archer.idle();
    }
}
