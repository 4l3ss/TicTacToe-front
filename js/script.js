var View = {
	cases: [],
	footer: null,
	generateGrid: function(){
		var plate = document.getElementById('game_plate');
		plate.classList.add('game__plate--' + (Game.turn ? "circle" : "cross") + '_playing');
		
		View.footer = document.getElementById('game_footer');
		View.updateFooter();
		for(var i = 0; i<9; i++){
			var game_case = document.createElement('div');
				game_case.className = "game__case";
				game_case.dataset.number = i;
				game_case.addEventListener('click', EventHandlers.caseClick);
				View.cases[i] = game_case;
				plate.appendChild(game_case);
		}
	},
	updateClasses: function(){
		var plate = document.getElementById('game_plate');
		plate.classList.remove('game__plate--circle_playing');
		plate.classList.remove('game__plate--cross_playing');
		
		if(!Game.finished){
			plate.classList.add('game__plate--' + (Game.turn ? "circle" : "cross") + '_playing');
		}
	},
	updateFooter: function(){
		View.footer.innerHTML = "Aux " + (Game.turn ? "RONDS" : "CROIX") + " de jouer";
	}	
};

var EventHandlers = {
	caseClick: function(e){ //Event handler for case click
		if(Game.grid[this.dataset.number] === '' && !Game.finished){ //Case empty
			Game.grid[this.dataset.number] = Game.turn ? 'O' : 'X';
			View.cases[this.dataset.number].className += " " + (Game.turn ? 'circle' :  'cross');
			Game.turn = !Game.turn;
		}
		Game.finished = Game.isGameFinished();
		View.updateClasses();
		View.updateFooter();
	}
}

var Game = {
	grid: [
		'','','',
		'','','',
		'','',''
	],
	turn: true, //true = O ; false = X
	finished: false,
	
	isGameFinished: function(){
		var conditions = [ //Wining conditions
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]
		];
		var finished = Game.finished;
		var grid = Game.grid;
		conditions.forEach(function(v,i,ar) { 
			if(grid[v[0]] == grid[v[1]] && grid[v[1]] == grid[v[2]] && (grid[v[0]] == "X" || grid[v[0]] == "O")){
				v.forEach(function(val, id, array) {
					View.cases[val].className += " game__case-win";	
				});
				finished = true;
			}
		});
		return finished;
	}
};

View.generateGrid();