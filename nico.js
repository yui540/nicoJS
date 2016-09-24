/**
 *
 * nico.js
 *
 * @author yuki540
 * @version 1.0
 * @github yuki540net
 * @twitter eriri_jp
 *
 */
function Nico(params) {
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
	this.ele = params.ele;
	this.ele.style.position = 'relative';
	this.ele.style.width = this.width+'px';
	this.ele.style.height = this.height+'px';
	this.ele.style.backgroundColor = '#4c4c4c';
}

/**
 * 特定のコメントを流し続ける
 * @param text: 複数のメッセージ
 */
Nico.prototype.loop = function(text) {
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
Nico.prototype.listen = function() {
	var self = this;
	this.timer = setInterval(function() {
		self.flow();
	}, 15);
};

/**
 * コメントの停止
 */
Nico.prototype.stop = function() {
	if(this.timer !== null)
		clearInterval(this.timer);
	if(this.l_timer !== null)
		clearInterval(this.l_timer);
};

/**
 * コメントを流す
 */
Nico.prototype.flow = function() {
	var self = this;
	this.comment.forEach(function(val, key) {
		if(val.x > -1000) {
			val.x -= self.speed;
			val['ele'].style.transform = 'translate('+val.x+'px,'+val.y+'px)';
		} else {
			self.comment.splice(key, 1);
			self.ele.removeChild(self.ele.childNodes[key]);
		}
	});
};

/**
 * コメントの送信
 * @param text: メッセージ
 * @param color: 16進数カラーコード（オプション）
 */
Nico.prototype.send = function(text, color) {
	text = text.replace('<', '&lt;');
	text = text.replace('>', '&gt;');
	text = text.replace(/(\'|\")/g, '');
	var comment = document.createElement('div');
	this.comment.push({
		x: this.width,
		y: Math.random()*(this.height-this.font),
		ele: comment
	});
	var last = this.comment.length-1;
	comment.innerHTML = text;
	comment.style.position = 'absolute';
	comment.style.transform = 'translate('+this.comment[last].x+'px,'+this.comment[last].y+'px)';
	comment.style.fontSize = this.font+'px';
	comment.style.color = (color === undefined) ?
		this.color : color;
	this.ele.appendChild(comment);
};






