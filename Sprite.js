function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.color  = "blue";
}

Sprite.prototype.desenhar = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y,15,15);
  ctx.strokeStyle = "black";
  ctx.strokeRect(this.x,this.y,15,15);
};

Sprite.prototype.mover = function (dt) {
  this.x = this.x + (this.vx*dt);
  this.y = this.y + (this.vy*dt);
};
