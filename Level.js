function Level() {
  this.sprites = [];
  this.inimigos = 3;
}

Level.prototype.init = function () {
  for (var i = 0; i < this.inimigos; i++) {
    var inimigo = new Sprite();
    inimigo.x = 10+20*i;
    inimigo.y = 10;
    this.sprites.push(inimigo);
  }
};

Level.prototype.mover = function (dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].mover(dt);
  }
}

Level.prototype.desenhar = function (ctx) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].desenhar(ctx);
  }
};

Level.prototype.colidiu = function (alvo, resolveColisao) {
  for (var i = 0; i < this.sprites.length; i++) {
    if(this.sprites[i].colidiuCom(alvo)){
      resolveColisao(this.sprites[i],alvo);
    }
  }
};
