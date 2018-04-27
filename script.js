

(function() {


let questions = [{
		question: 'assets/rdj.jpg',
		choices: ['Sao Paulo', 'Fortaleza', 'Rio De Janeiro', 'Brasilia'], 
		correctAnswer: 2 
	},  {
		question: 'assets/hk.jpg',
		choices: ['Hong Kong', 'Bejing', 'Tokyo', 'Singapore'],
		correctAnswer: 0
	},	{
		question: 'assets/syd.jpg',
		choices: ['Melbourne', 'Perth', 'Brisbane', 'Sydney'],
		correctAnswer: 3
	},	{	
		question: 'assets/dub.jpg',
		choices: ['Dubai', 'Baghdad', 'Istanbul', 'Jordan'],
		correctAnswer: 0
	},  {	
		question: 'assets/prs.png',
		choices: ['Milan', 'Berlin', 'Paris', 'Amsterdam'],
		correctAnswer: 2
	},	{	
		question: 'assets/tky.jpg',
		choices: ['Shanghai', 'Bangkok', 'Taipei', 'Tokyo'],
		correctAnswer: 3
	},	{	
		question: 'assets/trn.png',
		choices: ['Vancouver', 'Montreal', 'Toronto', 'Winnepeg'],
		correctAnswer: 2
	},	{	
		question: 'assets/nyc.jpg',
		choices: ['Los Angeles', 'New York City', 'Chicago', 'Houston'],
		correctAnswer: 1
	}];

	let qCounter = 0; //Tracks question number
	let selections = []; //Array with ? choices
	let quiz = $('#quiz'); //Quiz div obj
	let valueCounter = 0; //Progress bar value


	//Circulates question
	displayNext();



	//Click handler for 'next' button
	$('#next').on('click', function(e) {
		e.preventDefault();
		
		//Progress bar reappear after 'start over' and 'next' triggered
		$('#progress').show();	
		
		//Stop click during fade into next question
		if(quiz.is(':animated')) {
			return false;
		};
		choose();

		//If they don't select, this happens
		if (isNaN(selections[qCounter])) {
			alert('Select Something Please!');
			valueCounter -= 10;
		}	else {
			qCounter++;
			displayNext();
		}
	});

	//Click handler for 'previous' button
	$('#previous').on('click', function(e) {
		e.preventDefault();

		if(quiz.is(':animated')) {
			return false;
		}
		choose();
		qCounter--;
		displayNext();
	});

	//Click handler for 'start over' button
	$('#start').on('click', function(e) {
		e.preventDefault();

		if(quiz.is('animated')) {
			return false;
		}	
		qCounter = 0;
		selections = [];
		valueCounter = 0; 
		$('#progress').attr('value', 0);
		displayNext();
		$('#start').hide();
	});

	//Animates buttons hover
	$('.button').on('mouseenter', function() {
		$(this).addClass('active');
	});
	$('button').on('mouseleave', function() {
		$(this).removeClass('active');
	});

// Creates and returns the div that contains the ?'s and answer selections
function createQuestionElement(index) {
	let qElement = $('<div>',	{
		id: 'question'
	});

	let questionImg = $(`<img src="${questions[index].question}"/>`)

	let question = $('<p>').append(questions[index].question);
	qElement.append(questionImg);

	let radioButtons = createRadios(index);
	qElement.append(radioButtons);

	return qElement;
};

//Lists answer choices as radio inputs
function createRadios(index) {
	let radioList = $('<ul>');
	let item;
	let input = '';

	for (let i = 0; i < questions[index].choices.length; i++)
{	
		item = $('<li>');
		input = '<input type="radio" name="answer" value=' + i + ' />';
		input += questions[index].choices[i];
		item.append(input);
		radioList.append(item);
	}
	return radioList;
}

// Takes user selection and pushes it into and array
function choose() {
	selections[qCounter] = 
	+$('input[name="answer"]:checked').val();
	
}

//Display next requested element
function displayNext() {
	quiz.fadeOut(function() {
		$('#question').remove();

		if(qCounter < questions.length){
			let nextQuestion = createQuestionElement(qCounter);
			quiz.append(nextQuestion).fadeIn();
			if (!(isNaN(selections[qCounter]))) {

$('input[value='+selections[qCounter]+']').prop('checked', true);

			}

			//Manipulates display of 'previous' button
			if(qCounter === 1){
				$('#previous').show();
			} else if(qCounter === 0){
				
				$('#previous').hide();
				$('#next').show();
			}
		}else {
			let scoreElem = displayScore();
			quiz.append(scoreElem).fadeIn();
			$('#next').hide();
			$('#previous').hide();
			$('#start').show();
		}
	});
}

//Progress bar
valueCounter += 10;
	$('#next').on('click', function(){
	$('#progress').attr('value', valueCounter+= 10);
});
	$('#previous').on('click', function(){  
	$('#progress').attr('value', valueCounter-= 10);  
}); 


//Calculates score and returns user score
function displayScore() {
	let score = $('<p>',{id: 'question'});

	let numCorrect = 0;
	for (let i = 0; i < selections.length; i++) {
		if (selections[i] === questions[i].correctAnswer) {
		numCorrect++;
	}
}

	$('#progress').hide(); 
	
	if (numCorrect > 6) {
	score.append('You ' + ' got ' + numCorrect + ' outta ' + questions.length + ' correct! ' + ' Niceeee!' );
	}	else {		
		score.append('Only ' + numCorrect + ' outta ' + questions.length + ' correct. ' + ' Study ' + ' up!' ); 
		};
	return score;
	 }
})();

















