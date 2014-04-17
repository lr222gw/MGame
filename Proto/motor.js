var init = function(){
	
	
};
var Machines = {
	
	ReadInGameCards : function(){
		//Init all Cards = Skapa och hämta ner korthögen basearat på datan i "GameCards"..
	},
	
	generatePlayers : function(){
		
		//Init all Actor
		
		//Pick random murderur
		
		//Pick murders Motive
		
		//Change Murderurs cards (To fit the game)
		
		//Get attribut for Murderur
		
		//Get Attributes for all actors except from murderur
	},
	
	PickMurderMotive : function(){
		
		//Select random Motive
		
		//Select Cards Based Of Motive
		
	}
	
	
	
};

var Classes = {
	GameCard : function(){
		this.name = "";
		this.type = "";
		this.motive = ""; // Om kortet är motivbaserat så kan man ange det här
		this.content = "";
		this.isMurder = false;
		this.isLie	= false;	
	},
	
	Actor : function(){
		this.name = "";
		this.isMurder = false;	
		this.ID = 0;
		this.Secret = null;
		this.Other = null;
		this.Intress = null;
		this.Relation = null;
		this.StateOfMind = null;
	},
	
	GameCardType : function(){
		
		var h ;
		
		var CardEnum = {
			"Secret" : 0,
			"Other" : 1,
			"Intress" : 2,
			"Relationship" : 3			
		};
	}
};




window.onload = function(){
	init();	
};
