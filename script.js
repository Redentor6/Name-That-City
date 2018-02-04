(function() {


let questions = [{
		question: "assets/rdj.jpg",
		choices: ['Sao Paulo', 'Fortaleza', 'Rio De Janeiro', 'Brasilia'], 
		correctAnswer: 'Rio De Janeiro' 
	},  {
		question: 'assets/hk.jpg',
		choices: ['Hong Kong', 'Bejing', 'Tokyo', 'Singapore'],
		correctAnswer: 'Hong Kong'
	},	{
		question: 'assets/syd.jpg',
		choices: ['Melbourne', 'Perth', 'Brisbane', 'Sydney'],
		correctAnswer: 'Sydney'
	},	{	
		question: 'assets/dub.jpg',
		choices: ['Dubai', 'Baghdad', 'Istanbul', 'Jordan'],
		correctAnswer: 'Dubai'
	},  {	
		question: 'assets/nyc.jpg',
		choices: ['Los Angeles', 'New York City', 'Chicago', 'Houston'],
		correctAnswer: 'New York City'
	}];

	let qCounter = 0; //Tracks question number
	let selections = []; //Array with user choices
	let quiz = $('#quiz'); //Quiz div obj

	//Circulates question
	displayNext();

	//Click handler for 'next' button
	$('#next').on('click', function(e) {
		e.preventDefault();
	
		//Stop click during fade into next question
		if(quiz.is(':animated')) {
			return false;
		};
		choose();

		//If they don't selct, this happens
		if (isNaN(selections[qCounter])) {
			alert('Select Something Please!');
		}	else {
			qCounter++;
			displayNext();
		}
	});

	//CLick handler for 'previous' button
	$('#previous').on('click', function(e) {
		e.preventDefault();

		if(quiz.is(':animated')) {
			return false;
		}
		qCounter = 0;
		selections = [];
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

	let header = $('<h2>City ' + (index + 1) + ':</h2>');
	qElement.append('question');

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

//Claculates score and returns a text element to be displayed
function displayScore() {
	let score = $('<p>', {id: 'question'});

	let numCorrect = 0;
	for (let i = 0; i < selections.length; i++) {
		if(selections[i] === questions[i].correctAnswer) {
		numCorrect++;
	}
}

	score.append('Scored ' + numCorrect + ' outta ' + questions.length + ' correct!!! ');

	return score;
	}
})();

















