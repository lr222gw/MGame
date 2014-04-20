"use strict";
var GameEngine = {
	GlobalRooms : [],
	GlobalCards : [],
	GlobalActors : [],
	
	init : function(){
		GameEngine.Machines.ReadInRooms();
		GameEngine.Machines.BuildRooms();
		
	},
	 
	Machines : {
		
		ReadInGameCards : function(){
			//Init all Cards = Skapa och hämta ner korthögen basearat på datan i "GameCards"..
		},
		
		ReadInRooms : function(){ 		// Funktion som laddar in alla rum + rumdatan..
			//Skapar alla rummen och sparar ner dem i GlobalRooms arrayen..
			
			var bathroom = new GameEngine.Classes.Room(13, "Data/Map/BathRoom/bathroom.jpg", "Bathroom");
			var prebedroom = new GameEngine.Classes.Room(4, "Data/Map/PreBedroom/prebedroom.jpg", "Bedroom Corridor");
			var bedroom1 = new GameEngine.Classes.Room(5, "Data/Map/Bedrom_1/bedroom_1.png", "Bedroom X");
			var bedroom2 = new GameEngine.Classes.Room(6, "Data/Map/Bedrom_2/bedroom_2.png", "Bedroom C");
			var bedroom3 = new GameEngine.Classes.Room(7, "Data/Map/Bedrom_3/bedroom_3.png", "Bedroom V");
			var bedroom4 = new GameEngine.Classes.Room(8, "Data/Map/Bedrom_4/bedroom_4.png", "Bedroom B");
			var bedroom5 = new GameEngine.Classes.Room(9, "Data/Map/Bedrom_5/bedroom_5.png", "Bedroom N");
			var bedroom6 = new GameEngine.Classes.Room(10, "Data/Map/Bedrom_6/bedroom_6.png", "Bedroom M");
			var hallway1 = new GameEngine.Classes.Room(1,"Data/Map/Hallway_1/hallway_1.jpg", "Hallway entrance");
			var hallway2 = new GameEngine.Classes.Room(2, "Data/Map/Hallway_2/hallway_2.jpg", "Hallway");
			var hallway3 = new GameEngine.Classes.Room(3, "Data/Map/Hallway_3/hallway_3.jpg", "Hallway End");
			var kitchen  = new GameEngine.Classes.Room(11, "Data/Map/Kitchen/kitchen.JPG", "Kitchen");		
			var tvroom = new GameEngine.Classes.Room(12, "Data/Map/TvRoom/tvroom.jpg", "Tv-Room");
			GameEngine.GlobalRooms.push(bathroom, prebedroom, bedroom1, bedroom2, bedroom3, bedroom4, bedroom5, bedroom6, hallway1, hallway2, hallway3, kitchen, tvroom);
						
		},
		
		BuildRooms : function(){
			
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
		
		
		
	},
	
	Classes : {
		GameCard : function(){
			this.ID = 0; 	
			this.type = ""; // Kan vara antingen personlighetsakerna (secret, other, intress, relation) eller:
							//-WallClue  	=Om ledtråden endast går att ha på väggen
							//-TableClue	=Om ledtråden endast går att ha på en platt yta (golv, bord, etc)
			
			this.Content = "";			// innehåller en beskrivning av ledtråden, om ej är ledtråd så blir denna null..
			this.needTheseCards = [];	// ID'n till GameCards som behövs för att denna Ledtråd ska visas
			this.image = ""; 			//URL till bilden som används för denna typ av ledtråd
			this.AnswerCards = []; 		// Array med CardData som innehåller svar från Actors! 
			
			//this.name = ""; // Kanske inte nödvändigt? .. 
			//this.motive = ""; // Om kortet är motivbaserat så kan man ange det här
			//this.isMurder = false;
			//this.isLie	= false;	
		},
		
		CardData : function(){
			this.emotionState = ""; 	//Stadiet Aktören hamnar i när frågan ställs. 
			this.content = ""; 			//Svaret på frågan som ställs i "name"..
			this.followUp = []; 		// En array med CardData på FöjFrågor
			this.name = ""; 			// Själva frågan du ställer
			this.owner = 0; 			//Id't på den Actor som kan säga detta kort. Obs är NULL om GameCard inte är en ledtrådsTyp	
		},
		
		Container : function(){		
			this.cardsOfContainer = []; 	// Varje Container kan innehålla max 3 GameCards
			this.image = ""; 				//URL till bilden Containern använder
		},
		
		Room : function(ID, image, roomname){
			this.ID = ID;
			this.roomname = roomname;		//Namnen på rummen
			this.Containers = []; 			//Varje rum kan innehålla 3 Containers, varav 2 är Papperskorg och Garderob ()
			this.TableClue_GameCards = [];  //Varje rum kan innehålla max 5 GameCards av typen TableClue
			this.WallClue_GameCards = []; 	//Varje rum kan innehålla max 2 Gamecards av typen WallClue
			this.image = image; 			//URL till bilden som används för rummet..
			this.ActorsInRoom = [];			//En Array som innehåller ID't på alla aktörer i rummet..
		},
		
		Actor : function(){
			this.name = "";				//Namnet på aktören..
			this.isMurder = false;		
			this.ID = 0;				//Alla Actors har ett ID som representerar vem dem är
			this.Secret = null; 		//GameCard av typen "Secret"
			this.Other = null;			//GameCard av typen "Other"
			this.Intress = null;		//GameCard av typen "intress"
			this.Relation = null;		//GameCard av typen "Relation"
			this.emotionState = null;	//Vilken sinnesställning karaktären har, olika sinneställningar:
										//-Irriterad|anoyed,
										//-Glad|Happy
										//-Nervös|nervous
										//-Arg|Angry
										//-Bekymrad|Concerned						
			this.ClueList = []; 		//En array med ledtrådar relaterade till Aktören
		},
		
		Player : function(){
			this.TimePoints = 150; 			//Spelaren börjar med (preliminärt) 150 Tidspoäng.
			this.QuestionHolder = function(){//En funktion som anropas för att ställa frågor.
				
				//Fråga om Aktörernas Personligheter (Other, Secret, Intress, relation...)
				
				//Hämta upp FollowUps Från Korten^...
				
				//De två nedre alternativen ska alltid vara möjliga att göra i början av en konversation
				//Flirt = Säg något posetivt till en Aktör för att få den att änrda Emotionstate
				
				//Threat = Hota för att påverka aktörens emotionstate
				
				//Den under ska alltid vara möjlig att göra närsom under en konversation
				//Leave = Lämna konversationen.
			}
		},
		
		GameCardType : function(){		
			
			var CardEnum = {
				"Secret" : 0,
				"Other" : 1,
				"Intress" : 2,
				"Relationship" : 3,		
				"WallClue" : 4,
				"TableClue" : 5	
			};
		}
	}

};



window.onload = function(){
	GameEngine.init();	
};
