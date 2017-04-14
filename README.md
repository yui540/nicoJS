# nicoJS
ニコニコ動画風コメントを実装するライブラリ。

## Install
npm
```
npm install nicojs
```

git
```
git clone https://github.com/yuki540net/nicoJS
```

## Usage
```demo.js
NicoJS = require('nicoJS')

let nico = new NicoJS({
    app       : document.getElementById('app'),
    width     : 600,
    height    : 400,
    font_size : 50,     // opt
    color     : '#fff'  // opt
})
```

任意のタイミングでコメントを流す
```demo.js
// コメント待機
nico.listen()

// コメント送信
nico.send('Hello World.')
```

特定のコメントを流し続ける
```demo.js
// コメントを流し続ける
nico.loop([
    'comment_1',
    'comment_2',
    'comment_3',
    'comment_4'
])
```

## Lisence
このライブラリは、MIT Lisenceのもとで公開されています。
