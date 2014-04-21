"use strict";

var GameData = {
	GameCardsCollectionData : [],
	
	initData : function(){
		var ClueDataToInit = [ //I denna array ska all ClueData in
		
			new GameEngine.Classes.GameCard(
				1,				//ID
				"TableClue",	//Type
				"Beskrivning!",	//Beskrivning
				[1,2],			//NeededCards
				"google.se",	//BildURL
				[1,2,3,4]		//FollowUpCards (AnswerCards...)		
			)
		
		
		];
		
		var PersonDataToInit = [ //I denna array ska all PersonData in
			
			new GameEngine.Classes.GameCard(
				2,
				"Secret",
				null,
				[],
				null,
				[
					new GameEngine.Classes.CardData(
						"Neutral",
						"You ",
						[],
						
					),
				
				]
				
			),
		];
		
		//Arrayen PersonDataToInit och ClueDataToInit  skickas till 
		//GameCardsCollection för användning utanför denna funktion!
		for(var i = 0; i < ClueDataToInit.length; i++){
			GameData.GameCardsCollectionData.push(ClueDataToInit[i]);
		};
		for(var i = 0; i < PersonDataToInit.length; i++){
			GameData.GameCardsCollectionData.push(PersonDataToInit[i]);
		};
	}
	
	
	
};


		//var GameCardsCollectionData = [];
		//var h = new GameEngine.Classes.GameCard();
		//new GameEngine.Classes.GameCard()
		
		//var Motives = function(){
			//var newa = function(){};
			
		//}