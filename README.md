nicojs
***************************
ニコニコ風コメントモジュール

## Example

#### nico.js
``` html:sample.html
<script src="nico.js"></script>
<div id="nico"></div>
```

``` javascript:nico.js
var nico = new Nico({
	ele: document.getElementById('nico'),
	width: 400,
	height: 400,
	font: 30,
	color: '#fff',
	speed: 3
});
/**
 * 任意のタイミングでコメントを流す
 */
nico.listen();         // コメント待機
nico.send('ニコニコ');  // コメント送信

/**
 * 特定のコメントを流し続ける
 */
nico.loop(['かわいい', 'wwwww', 'なんだこれw']);
```

#### nico-canvas.js[Canvas版]
``` html:sample.html
<script src="nico-canvas.js"></script>
<canvas id="nico"></canvas>
```

``` javascript:nico-canvas.js
var nico = new Nico({
	canvas: document.getElementById('nico'),
	width: 400,
	height: 400,
	font: 30,
	color: '#fff',
	speed: 3
});
/**
 * 任意のタイミングでコメントを流す
 */
nico.listen();         // コメント待機
nico.send('ニコニコ');  // コメント送信

/**
 * 特定のコメントを流し続ける
 */
nico.loop(['かわいい', 'wwwww', 'なんだこれw']);
```

#### nico-css.js[cssアニメーション版]
``` html:sample.html
<script src="nico-css.js"></script>
<div id="nico"></div>
```

``` javascript:nico-css.js
var nico = new NicoCSS({
	ele: document.getElementById('nico'),
	width: 400,
	height: 400,
	font: 30,
	color: '#fff'
});
/**
 * 任意のタイミングでコメントを流す
 */
nico.listen();         // コメント待機
nico.send('ニコニコ');  // コメント送信

/**
 * 特定のコメントを流し続ける
 */
nico.loop(['かわいい', 'wwwww', 'なんだこれw']);
```