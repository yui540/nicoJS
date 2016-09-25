/**
 *
 * nico-css.js
 *
 * @author yuki540
 * @version 1.0
 * @github yuki540net
 * @twitter eriri_jp
 *
 */
function NicoCSS(params) {
	// data
	this.timer = null;
	this.comment = [];
	this.font = params.font;
	this.color = params.color;
	this.width = params.width;
	this.height = params.height;
	// element
	this.ele = params.ele;
	this.ele.style.whiteSpace = 'nowrap';
	this.ele.style.overflow = 'hidden';
	this.ele.style.position = 'relative';
	this.ele.style.backgroundColor = '#4c4c4c';
	this.ele.style.width = this.width+'px';
	this.ele.style.height = this.height+'px';
}

/**
 * 特定のコメントを流し続ける
 * @param text: 複数のメッセージ
 */
NicoCSS.prototype.loop = function(text) {
	this.listen();
	var i=0;
	var self = this;
	self.send(text[i++]);
	this.timer = setInterval(function() {
		if(i > (text.length-1)) i = 0;
		self.send(text[i++]);
	}, 2000);
};

/**
 * コメントの待機
 */
NicoCSS.prototype.listen = function() {
	var style = '<style id="nicojs-style">';
	style += '@keyframes flow {';
	style += '0% {left:100%;}';
	style += '99% {opacity:1;}';
	style += '100%{opacity:0;left: -1000px;}}';
	style += '.nicojs-comment{';
	style += 'animation: flow 8s linear 0s forwards;}';
	style += '</style>';
	document.head.innerHTML = style;
};

/**
 * コメントの停止
 */
NicoCSS.prototype.stop = function() {
	if(this.timer !== null)
		clearInterval(this.timer);
};

/**
 * コメントの送信
 * @param text: メッセージ
 * @param color: 16進数カラーコード（オプション）
 */
NicoCSS.prototype.send = function(text, color) {
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
	comment.className = 'nicojs-comment';
	comment.style.position = 'absolute';
	comment.style.top = this.comment[last].y+'px';
	comment.style.fontSize = this.font+'px';
	comment.style.textShadow = '2px 2px 2px #111';
	comment.style.color = (color === undefined) ?
		this.color : color;
	this.ele.appendChild(comment);
};