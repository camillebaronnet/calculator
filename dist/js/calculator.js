
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

			if(result['result'] === false){
				resultsBox.append('<div class="result-empty"></div>');
			}
			else{
				resultsBox.append('<div class="result"><span>'+
					this.params.intl.format(result['result'])
				+'</span></div>');
			}
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

		let html = this.textarea.val();
		html = html.replace(/([+*=]+)/g, '<span class="operator">$1</span>');
		html = html.replace(/([0-9.,]+)/g, '<span class="float">$1</span>');
		html = html.replace(/([#](.*?)[\n])/g, '<span class="comment">$1</span>');


		this.highlight.html(html);

	}

}