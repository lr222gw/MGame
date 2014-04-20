"use strict";

var GameData = {
	GameCardsCollectionData : [],
	
	initData : function(){
		var DataToInit = [ //I denna array ska all data in
		
		new GameEngine.Classes.GameCard(
			1,
			"TableClue",
			"Beskrivning!",
			[1,2],
			"google.se",
			[1,2,3,4]						
		)
		
		
		];
		
		//Arrayen DataToInit skickas till GameCardsCollection för användning utanför denna funktion!
		for(var i = 0; i < DataToInit.length; i++){
			GameData.GameCardsCollectionData.push(DataToInit[i]);
		};
	}
	
	
	
};


		//var GameCardsCollectionData = [];
		//var h = new GameEngine.Classes.GameCard();
		//new GameEngine.Classes.GameCard()
		
		//var Motives = function(){
			//var newa = function(){};
			
		//}