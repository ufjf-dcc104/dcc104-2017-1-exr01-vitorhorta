function ImageLoader(){
  this.images = {};
}

ImageLoader.prototype.load = function(key, imgUrl) {
  var img = new Image();
  img.src = imgUrl;
  this.images[key] = img;

};
