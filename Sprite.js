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
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y,this.width,this.height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(this.x,this.y,this.width,this.width);
};

Sprite.prototype.mover = function (dt) {
  this.vx = this.vx + (this.ax)*dt;
  this.vy = this.vy + (this.ay+60)*dt;
  this.x = this.x + (this.vx*dt);
  this.y = this.y + (this.vy*dt);
};

Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x+this.width < alvo.x) return false;
  if(this.x > alvo.x+alvo.width) return false;
  if(this.y+this.width < alvo.y) return false;
  if(this.y > alvo.y+alvo.height) return false;

  return true;
};

Sprite.prototype.desenharImg = function (ctx, img) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle*2*Math.PI/360);
    ctx.rotate(Math.PI/2);
    ctx.fillStyle = this.color;
    ctx.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
    if(this.debug){
        ctx.strokeStyle = "grey";
        ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
    }
    ctx.restore();
};