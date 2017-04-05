function Level() {
  this.sprites = [];
  this.shots = [];
  this.inimigos = 3;
}

Level.prototype.init = function () {
  for (var i = 0; i < this.inimigos; i++) {
    var inimigo = new Sprite();
    inimigo.x = 10+20*i;
    inimigo.y = 10;
    inimigo.width = 10+i*5;
    inimigo.height = 10+i*5;
    inimigo.am = 20;
    this.sprites.push(inimigo);
  }
};

Level.prototype.mover = function (dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].mover(dt);
  }
  for (var i = this.shots.length-1; i >= 0; i--) {
    this.shots[i].moverAng(dt);
    if(
        this.shots[i].x >  3000 ||
        this.shots[i].y < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].x < -3000
    ){
      this.shots.splice(i,i);
    }
  }
}

Level.prototype.moverAng = function (dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].moverAng(dt);
  }
  for (var i = this.shots.length; i >= 0; i--) {
    this.shots[i].moverAng(dt);
    if(
        this.shots[i].x >  3000 ||
        this.shots[i].y < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].x < -3000
    ){
      this.shots.splice(i,i);
    }
  }
}

Level.prototype.desenhar = function (ctx) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].desenhar(ctx);
  }
  for (var i = 0; i < this.shots.length; i++) {
    this.shots[i].desenhar(ctx);
  }
};

Level.prototype.colidiu = function (alvo, resolveColisao) {
  for (var i = 0; i < this.sprites.length; i++) {
    if(this.sprites[i].colidiuCom(alvo)){
      resolveColisao(this.sprites[i],alvo);
    }
  }
};

Level.prototype.perseguir = function (alvo, dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].perseguir(alvo,dt);
  }
}


Level.prototype.perseguirAng = function (alvo, dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].perseguirAng(alvo,dt);
  }
}

Level.prototype.fire = function(alvo){
  if(alvo.cooldown > 0) return;
  var tiro = new Sprite();
  tiro.x = alvo.x;
  tiro.y = alvo.y;
  tiro.angle = alvo.angle;
  tiro.am = 100;
  this.width = 5;
  tiro.height = 5;
  this.shots.push(tiro);
  alvo.cooldown = 1;
}

Level.prototype.colidiuComTiros = function() {
  var that = this;
  for(var i = this.shots.length-1; i>=0; i--) {
    this.colidiu(this.shots[i], function(alvo){
      alvo.color = "green";
      that.shots.splice(i,i);
    })
  }
}
