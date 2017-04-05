function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.am = 0;
  this.width = 15;
  this.height = 15;
  this.angle = 0;
  this.vang = 0;
  this.color  = "blue";
}

Sprite.prototype.desenhar = function (ctx) {
  ctx.save();
  ctx.translate(this.x,this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(-this.width/2, -this.height/2);
  ctx.lineTo(-this.width/2, +this.height/2);
  ctx.lineTo(+this.width/2, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  //ctx.strokeStyle = "black";
  //ctx.strokeRect(-this.width/2,-this.height/2,this.width,this.width);
  ctx.restore();
};

Sprite.prototype.mover = function (dt) {
  this.vx = this.vx + (this.ax)*dt;
  this.vy = this.vy + (this.ay)*dt;
  this.x = this.x + (this.vx*dt);
  this.y = this.y + (this.vy*dt);
  this.angle = this.angle + this.vang*dt;
};

Sprite.prototype.moverAng = function (dt) {
  this.angle = this.angle + this.vang*dt;

  this.ax = this.am*Math.cos(Math.PI*this.angle/180);
  this.ay = this.am*Math.sin(Math.PI*this.angle/180);

  this.vx = this.vx + (this.ax)*dt;
  this.vy = this.vy + (this.ay)*dt;
  this.x = this.x + (this.vx*dt);
  this.y = this.y + (this.vy*dt);
  if(this.cooldown > 0) this.cooldown -= dt;
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

Sprite.prototype.perseguirAng = function (alvo, dt) {
  var dX = alvo.x - this.x;
  var dY = alvo.y - this.y;
  var dist = Math.sqrt(dX*dX+dY*dY);
  var dA = 180*Math.acos(dX/dist)/Math.PI;
  this.vang = 100*(dA - this.angle)*dt;
}
