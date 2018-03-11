
class Calculator{

	constructor(textareaNode){
		this.textareaNode = textareaNode;
		this.textarea = $(textareaNode);
		this.intl = new Intl.NumberFormat();
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
					this.intl.format(result['result'])
				+'</span></div>');
			}
		});

		return this;
	}

	updateTextareaHeight(){

		let lineHeight = parseInt(this.textarea.css('line-height').replace('px','')),
			content = this.textarea.val(),
			offset = 0;

		let lines = content.split("\n");

		this.textarea.height((lines.length + offset ) * lineHeight);

		return this;
	}

	highlight(highlight){

		let html = this.textarea.val();
		html = html.replace(/([+*=]+)/g, '<span class="operator">$1</span>');
		html = html.replace(/([0-9.,]+)/g, '<span class="float">$1</span>');
		html = html.replace(/([#](.*?)[\n])/g, '<span class="comment">$1</span>');


		highlight.html(html);

	}

}