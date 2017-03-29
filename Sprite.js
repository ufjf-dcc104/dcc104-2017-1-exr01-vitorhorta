function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.width = 15;
  this.height = 15;
  this.angle = 0;
  this.vang = 0;
  this.color  = "blue";
}

Sprite.prototype.desenhar = function (ctx) {
  ctx.save();
  ctx.translate(this.x,this.y);
  ctx.rotate(this.angle*Math.PI/180);
  ctx.fillStyle = this.color;
  ctx.fillRect(-this.width/2,-this.height/2,this.width,this.height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(-this.width/2,-this.height/2,this.width,this.width);
  ctx.restore();
};

Sprite.prototype.mover = function (dt) {
  this.vx = this.vx + (this.ax)*dt;
  this.vy = this.vy + (this.ay)*dt;
  this.x = this.x + (this.vx*dt);
  this.y = this.y + (this.vy*dt);
  this.angle = this.angle + this.vang*dt;
};

Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x+this.width < alvo.x) return false;
  if(this.x > alvo.x+alvo.width) return false;
  if(this.y+this.width < alvo.y) return false;
  if(this.y > alvo.y+alvo.height) return false;

  return true;
};

Sprite.prototype.perseguir = function (alvo, dt) {
  this.ax = 5*(alvo.x - this.x)*dt - this.vx*0.1;
  this.ay = 5*(alvo.y - this.y)*dt - this.vy*0.1;
}
