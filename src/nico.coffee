class nicoJS
	constructor: (params) ->
		@version = '1.1.8'

		@timer    = null
		@interval = null
		@fps      = 1000 / 30
		@step     = 2 * 1000
		@comments = []

		@app       = params.app
		@font_size = params.font_size || 50
		@color     = params.color     || '#fff'
		@width     = params.width     || 500
		@height    = params.height    || 300

		# 描画
		@render()

	##
	# 描画
	##
	render: ->
		@app.style.whiteSpace = 'nowrap'
		@app.style.overflow   = 'hidden'
		@app.style.position   = 'relative'
		@app.style.width      = @width  + 'px'
		@app.style.height     = @height + 'px'

		console.log 'nicoJS@' + @version
		console.log ' ├─ author     : yuki540'
		console.log ' ├─ homepage   : http://yuki540.com'
		console.log ' └─ repository : https://github.com/yuki540net/nicoJS'

	##
	# サイズ変更
	# @param width  : 幅
	# @param height : 高さ
	##
	resize: (width, height) ->
		@width            = width
		@height           = height
		@app.style.width  = @width + 'px'
		@app.style.height = @height + 'px'

	##
	# コメントを送信
	# @param text      : コメント
	# @param color     : 色[option]
	# @param font_size : フォントサイズ[option]
	##
	send: (text, color, font_size) ->
		font_size = font_size || @font_size
		color     = color     || @color
		text      = text      || ''
		x         = @width
		y         = Math.random() * (@height - @font_size)
		ele       = document.createElement 'div'

		ele.innerHTML        = text
		ele.style.position   = 'absolute'
		ele.style.left       = x + 'px'
		ele.style.top        = y + 'px'
		ele.style.fontSize   = font_size + 'px'
		ele.style.textShadow = '0 0 5px #111'
		ele.style.color      = color

		@app.appendChild ele
		@comments.push { ele: ele, x: x, y: y }

	##
	# コメントを流す
	##
	flow: ->
		len = @comments.length

		for i in [0...len]
			end = @comments[i].ele.getBoundingClientRect().width * -1
			if @comments[i].x > end
				@comments[i].x -= 4
				@comments[i].ele.style.left = @comments[i].x + 'px'

	##
	# コメントを待機
	##
	listen: ->
		@stop()

		@timer = setInterval =>
			@flow()
		, @fps

	##
	# 特定のコメントを流し続ける
	# @param comments : コメントが入った配列
	##
	loop: (comments) ->
		i   = 0
		len = comments.length

		@listen()

		@send comments[i++]
		@interval = setInterval =>
			if len < i then i = 0

			@send comments[i++]
		, @step

	##
	# アニメーション停止
	##
	stop: ->
		clearInterval @timer
		clearInterval @interval

try
	module.exports = nicoJS
catch e
