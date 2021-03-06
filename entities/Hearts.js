function Hearts(sprite, game, xValue, yValue) {
    this.game = game;
    this.ctx = game.ctx;
    this.health = 100;
    this.sprite = sprite;
    this.x = xValue;
    this.y = yValue;
    this.width = 128/3;
    this.height = 128/3;
    this.nOfHearts = 5;
    this.spacing = 40;
    // animation
    this.startSpots = [0];
    for (var i = 1; i < this.nOfHearts; i++){
        this.startSpots[i] = this.startSpots[i-1]+20;
    } 
    this.frame = 0;
}

Hearts.prototype = new Entity();
Hearts.prototype.constructor = Hearts;

Hearts.prototype.draw = function() {
    for (var i = 0; i < this.nOfHearts; i++){
        this.ctx.drawImage(this.sprite, this.x + i*this.spacing, this.y + 2*Math.cos(this.startSpots[i]+this.frame), this.width, this.height);
    }
    this.frame += 0.1;
}

Hearts.prototype.setHealth = function(nOfHearts) {
    this.nOfHearts = nOfHearts;
    for (var i = 1; i < this.nOfHearts; i++){
        this.startSpots[i] = this.startSpots[i-1]+20;
    } 
}

Hearts.prototype.setHealthOpposite = function(nOfHearts) {
    this.nOfHearts = nOfHearts;
    for (var i = 1; i < this.nOfHearts; i++){
        this.startSpots[i] = this.startSpots[i+1]+20;
    } 
}

Hearts.prototype.update = function() {

}