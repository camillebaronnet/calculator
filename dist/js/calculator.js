
class Calculator{

	constructor(params){
		this.params =  $.extend({
			'textarea' : 'textarea',
			'highlight' : '.highlight',
			'intl' : new Intl.NumberFormat()
		}, params);

		this.textarea = $(this.params.textarea);
		this.highlight = $(this.params.highlight);
	}

	processLignes(){

		let resultsBox = $('#resultsBox').html('');

		this.textarea.val().split("\n").forEach((line, i) => {
			let result = {'result' : false};
			try{
				result = parser.parse(line);
				result.exportVars;
			}catch(error){

			}

			let height = $('.highlight p:nth-child('+(i+1)+')').height();
			let resultL = $('<div></div>').addClass('result').height(height);

			if(result['result'] === false){
			}
			else{
				resultL.append('<span>'+
					this.params.intl.format(result['result'])
				+'</span>');
			}
			resultsBox.append(resultL);
		});

		return this;
	}

	updateHeight(){

		let lineHeight = parseInt(this.textarea.css('line-height').replace('px','')),
			content = this.textarea.val(),
			offset = 0;

		let lines = content.split("\n");
		let newHeight = (lines.length + offset ) * lineHeight;

		this.textarea.height(newHeight);
		this.highlight.height(newHeight);

		return this;
	}

	highlighting(){

		this.highlight.width(this.textarea.width());

		let html = this.textarea.val();
		html = html.split(/\n/);
		html = $.map(html, function(line){
			if(line.match(/^(#(.*))/g)){
				line = '<span class="comment">'+line+'</span>';
			}
			else{
				line = line.replace(/([+*=]+)/g, '<span class="operator">$1</span>');
				line = line.replace(/([0-9.,]+)/g, '<span class="float">$1</span>');
			}
			return line;
		});
		this.highlight.html('<p>'+html.join('</p><p>')+'</p>');

	}

}