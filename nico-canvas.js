/**
 *
 * nico-canvas.js
 *
 * @author yuki540
 * @version 1.0
 * @github yuki540net
 * @twitter eriri_jp
 *
 */
function NicoCanvas(params) {
	// data
	this.timer = null;
	this.l_timer = null;
	this.comment = [];
	this.font = params.font;
	this.color = params.color;
	this.speed = params.speed;
	this.width = params.width;
	this.height = params.height;
	// element
	this.canvas = params.canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.canvas.style.backgroundColor = "#4c4c4c";
	this.ctx = this.canvas.getContext('2d');
}

/**
 * 特定のコメントを流し続ける
 * @param text: 複数のメッセージ
 */
NicoCanvas.prototype.loop = function(text) {
	var self = this;
	var i = 0;
	var length = text.length-1;
	this.listen();
	self.send(text[i++]);
	this.l_timer = setInterval(function() {
		if(length < i) i = 0;
		self.send(text[i++]);
	}, 2000);
};

/**
 * コメントの待機
 */
NicoCanvas.prototype.listen = function() {
	var self = this;
	this.timer = setInterval(function() {
		self.flow();
	}, 15);
};

/**
 * コメントの停止
 */
NicoCanvas.prototype.stop = function() {
	if(this.timer !== null)
		clearInterval(this.timer);
	if(this.l_timer !== null)
		clearInterval(this.l_timer);
};

/**
 * コメントを流す
 */
NicoCanvas.prototype.flow = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
	var self = this;
	this.comment.forEach(function(val, key) {
		if(val.x > -1000) {
			val.x -= self.speed;
			self.ctx.save();
			self.ctx.fillStyle = self.color;
			self.ctx.font = "bold "+self.font+"px 'ＭＳ Ｐゴシック'";
			self.ctx.fillText(val.text, val.x, val.y);
			self.ctx.restore();
		} else {
			self.comment.splice(key, 1);
		}
	});
};

/**
 * コメントの送信
 * @param text: メッセージ
 * @param color: 16進数カラーコード（オプション）
 */
NicoCanvas.prototype.send = function(text, color) {
	text = text.replace('<', '&lt;');
	text = text.replace('>', '&gt;');
	text = text.replace(/(\'|\")/g, '');
	color = (color === undefined) ? this.color : color;
	this.comment.push({
		x: this.width,
		y: Math.random()*(this.height+this.font),
		color: color,
		text: text
	});
};



