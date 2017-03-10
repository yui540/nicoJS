class nicoJS
	constructor: (params) ->
		@timer    = null
		@interval = null
		@fps      = 1000 / 30
		@step     = 2 * 1000
		@comments = []

		@app       = params.app
		@font_size = params.font_size || 30
		@color     = params.color || '#fff'
		@width     = params.width || 500
		@height    = params.height || 300

		# 描画
		@render()

	##
	# 描画
	##
	render: ->
		@app.style.whiteSpace = 'nowrap'
		@app.style.overflow   = 'hidden'
		@app.style.position   = 'relative'
		@app.style.width      = @width + 'px'
		@app.style.height     = @height + 'px'

		console.log 'nicoJS: https://github.com/yuki540net/nicoJS'

	##
	# コメントを送信
	# @param params : (font_size, color, text)
	##
	send: (params) ->
		font_size = params.font_size || @font_size
		color     = params.color || @color
		text      = params.text.replace /(<|>|\'|\")/g, ''

		comment = document.createElement 'div'
		@comments.push {
			ele : comment
			x   : @width
			y   : Math.random() * (@height - font_size)
		}
		len = @comments.length - 1

		comment.innerHTML        = text
		comment.style.position   = 'absolute'
		comment.style.left       = @comments[len].x + 'px'
		comment.style.top        = @comments[len].y + 'px'
		comment.style.fontSize   = font_size + 'px'
		comment.style.textShadow = '0 0 5px #111'
		comment.style.color      = color
		@app.appendChild comment

	##
	# コメントを流す
	##
	flow: ->
		for i, val of @comments
			end = val.ele.getBoundingClientRect().width * -1
			if val.x > end
				val.x -= 4
				val.ele.style.left = val.x + 'px'
			else
				@app.removeChild val.ele
				@comments.splice i, 1

	##
	# コメント待機
	##
	listen: ->
		@stop() # タイマー停止

		@timer = setInterval =>
			@flow()
		, @fps
		
	##
	# 特定のコメントを流し続ける
	# @param comments : コメント - 配列
	##
	loop: (comments) ->
		i   = 0
		len = comments.length - 1

		@stop()   # タイマー停止
		@listen() # コメント待機
		@send {   # 初期発火
			text : comments[i++]
		}

		@interval = setInterval =>
			if len < i 
				i = 0

			@send { text: comments[i++] }
		, @step

	##
	# アニメーション停止
	##
	stop: ->
		clearInterval @timer
		clearInterval @interval
	 
try
	module.exports = NicoJS
catch e
	
