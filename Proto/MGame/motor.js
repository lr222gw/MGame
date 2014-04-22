"use strict";
var GameEngine = {
    GlobalRooms : [],
	GlobalCards : [],
	GlobalActors : [],
	
	init : function(){
		GameEngine.Machines.ReadInRooms();
		GameEngine.Machines.BuildRoom(1);
		
		
		
	},
	 
	Machines : {
		
		ReadInGameCards : function(){
			//Init all Cards = Skapa och hämta ner korthögen basearat på datan i "GameCards"..
		},
		
		ReadInRooms : function(){ 		// Funktion som laddar in alla rum + rumdatan..
			//Skapar alla rummen och sparar ner dem i GlobalRooms arrayen..
			
			var bathroom = new GameEngine.Classes.Room(
                13,
                "Data/Map/BathRoom/bathroom.jpg",
                "Bathroom",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(3,"Data/Hudd/backbutton.png","Hallway End"),
                        50, //XPosition
                        60  //YPosition
                    )
                ]
            );
			var prebedroom = new GameEngine.Classes.Room(
                4,
                "Data/Map/PreBedroom/prebedroom.jpg",
                "Bedroom Corridor",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(3,"Data/Hudd/backbutton.png","Hallway End"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(2,"Data/Hudd/backbutton.png", "Hallway"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(5,"Data/Map/Bedrom_1/door.jpg", "Bedroom 1"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(6,"Data/Map/Bedrom_2/door.jpg", "Bedroom 2"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(7,"Data/Map/Bedrom_3/door.jpg", "Bedroom 3"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(8,"Data/Map/Bedrom_4/door.jpg", "Bedroom 4"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(9,"Data/Map/Bedrom_5/door.jpg", "Bedroom 5"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(10,"Data/Map/Bedrom_6/door.jpg", "Bedroom 6"),
                        50, //XPosition
                        60  //YPosition
                    )
                ]
            );
			var bedroom1 = new GameEngine.Classes.Room(
                5,
                "Data/Map/Bedrom_1/bedroom_1.png",
                "Bedroom 1",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(4,"Data/Hudd/backbutton.png", "Bedroom Corridor"),
                        50, //XPosition
                        60  //YPosition
                    )

                ]
            );
			var bedroom2 = new GameEngine.Classes.Room(
                6,
                "Data/Map/Bedrom_2/bedroom_2.png",
                "Bedroom 2",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(4,"Data/Hudd/backbutton.png", "Bedroom Corridor"),
                        50, //XPosition
                        60  //YPosition
                    )

                ]
            );
			var bedroom3 = new GameEngine.Classes.Room(
                7,
                "Data/Map/Bedrom_3/bedroom_3.png",
                "Bedroom 3",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(4,"Data/Hudd/backbutton.png", "Bedroom Corridor"),
                        50, //XPosition
                        60  //YPosition
                    )

                ]
            );
			var bedroom4 = new GameEngine.Classes.Room(
                8,
                "Data/Map/Bedrom_4/bedroom_4.png",
                "Bedroom 4",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(4,"Data/Hudd/backbutton.png", "Bedroom Corridor"),
                        50, //XPosition
                        60  //YPosition
                    )
                ]
            );
			var bedroom5 = new GameEngine.Classes.Room(
                9,
                "Data/Map/Bedrom_5/bedroom_5.png",
                "Bedroom 5",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(4,"Data/Hudd/backbutton.png", "Bedroom Corridor"),
                        50, //XPosition
                        60  //YPosition
                    )
                ]
            );
			var bedroom6 = new GameEngine.Classes.Room(
                10,
                "Data/Map/Bedrom_6/bedroom_6.png",
                "Bedroom 6",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(4,"Data/Hudd/backbutton.png", "Bedroom Corridor"),
                        50, //XPosition
                        60  //YPosition
                    )
                ]
            );
			var hallway1 = new GameEngine.Classes.Room(
                1,
                "Data/Map/Hallway_1/hallway_1.jpg",
                "Hallway entrance",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(2,"Data/Map/Hallway_1/door.jpg", "Hallway"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(11,"Data/Map/Kitchen/door.jpg", "Kitchen"),
                        50, //XPosition
                        60  //YPosition
                    )

                ]
            );
			var hallway2 = new GameEngine.Classes.Room(
                2,
                "Data/Map/Hallway_2/hallway_2.jpg",
                "Hallway",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(1,"Data/Hudd/backbutton.png", "Hallway entrance"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(4,"Data/Map/PreBedroom/door.jpg", "Bedroom Corridor"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(3,"Data/Map/Hallway_3/door.jpg", "Hallway End"),
                        50, //XPosition
                        60  //YPosition
                    )

                ]
            );
			var hallway3 = new GameEngine.Classes.Room(
                3,
                "Data/Map/Hallway_3/hallway_3.jpg",
                "Hallway End",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(2,"Data/Hudd/backbutton.png", "Hallway"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(13,"Data/Map/BathRoom/door.jpg", "Bathroom"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(12,"Data/Map/TvRoom/door.jpg", "Tv-Room"),
                        50, //XPosition
                        60  //YPosition
                    )

                ]
            );
			var kitchen  = new GameEngine.Classes.Room(
                11,
                "Data/Map/Kitchen/kitchen.JPG",
                "Kitchen",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(1,"Data/Hudd/backbutton.png", "Hallway entrance"),
                        50, //XPosition
                        60  //YPosition
                    )

                ]
            );
			var tvroom = new GameEngine.Classes.Room(12,
                "Data/Map/TvRoom/tvroom.jpg",
                "Tv-Room",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(3,"Data/Hudd/backbutton.png", "Hallway End"),
                        50, //XPosition
                        60  //YPosition
                    )

                ]
            );
			GameEngine.GlobalRooms.push(hallway1,hallway2,hallway3,prebedroom,bedroom1,bedroom2,bedroom3,bedroom4,bedroom5,bedroom6,tvroom,tvroom,bathroom);
						
		},
		
		BuildRoom : function(RoomID){
            var RoomToLoad;

            for(var i = 0; i < GameEngine.GlobalRooms.length; i++){//hittar rummet med det ID man söker efter
                if(GameEngine.GlobalRooms[i].ID == RoomID){
                    RoomToLoad = GameEngine.GlobalRooms[i];
                    break;
                }
            }
            if(RoomToLoad == undefined){
                alert("Whops! Rummet hittades inte.. Se till att verkligt ID skickas..");
            }

            var Canvas = document.getElementById("CanvasBody");
            var Ctx = Canvas.getContext("2d");

            Ctx.drawImage(RoomToLoad.image, 0, 0);



		},
		
		CreateActors : function(){
			
			//Init all Actor
			var actor1 = new GameEngine.Classes.Actor("Lulle", 1, "Data/Characters/char_1/lulle.jpg");
			var actor2 = new GameEngine.Classes.Actor("Billy", 2, "Data/Characters/char_2/billy.jpg");
			var actor3 = new GameEngine.Classes.Actor("Bobb", 3, "Data/Characters/char_3/bobb.jpg");
			var actor4 = new GameEngine.Classes.Actor("Ben", 4, "Data/Characters/char_4/Ben.jpg");
			var actor5 = new GameEngine.Classes.Actor("Loue", 5, "Data/Characters/char_5/Loue.jpg");
			var actor5 = new GameEngine.Classes.Actor("Tom", 6, "Data/Characters/char_6/Tom.jpg");
			
			GameEngine.GlobalActors.push(actor1, actor2, actor3, actor4, actor5, actor6);
			
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
		
		GameHud : function(){
			this.ActiveRoom = GameEngine.Classes.Room; // Ska innehålla det aktiva rummet..
			//Hud och Tools ska ligga här också...
		},
		
		GameCard : function(_ID, _type, _Description, _needTheseCards, _image, _AnswerCards){
			this.ID = _ID;
			
			this.type = _type; // Kan vara antingen personlighetsakerna (secret, other, intress, relation) eller:
							//-WallClue  	=Om ledtråden endast går att ha på väggen
							//-TableClue	=Om ledtråden endast går att ha på en platt yta (golv, bord, etc)
							
			this.Description = _Description; // innehåller en beskrivning av ledtråden, om ej är ledtråd så blir denna null..
								
			this.needTheseCards = _needTheseCards;// ID'n till GameCards som behövs för att denna Ledtråd ska visas

            this.image = new Image();   //|| Använder PLACEHOLDER

			this.image.src = _image;	//URL till bilden som används för denna typ av ledtråd
					
			this.AnswerCards  = _AnswerCards;	// I form av CardData! 			 							
			
			//this.name = ""; // Kanske inte nödvändigt? .. 
			//this.motive = ""; // Om kortet är motivbaserat så kan man ange det här
			//this.isMurder = false;
			//this.isLie	= false;	
		},
		
		CardData : function(_emotionState, _answer, _followUp, _question, _owner){
			this.emotionState = _emotionState; 	//Stadiet Aktören hamnar i när frågan ställs. 
			this.answer = _answer; 			//Svaret på frågan som ställs i "name"..
			this.followUp = _followUp; 		// En array med CardData på FöjFrågor
			this.question = _question; 		// Själva frågan du ställer
			this.owner = _owner; 			//Typ  på den Actor som kan säga detta kort. Obs är NULL om GameCard inte är en ledtrådsTyp
			         //obs owner innebär vilken TYP av aktör: "Other", "Murderer", "Victim", "Actor1", "Actor2", "Actor3" och "Actor4"
                    //obs2: när man frågar en Aktor om ledtråd, så ändras "Owner" från den typ av karaktär
                    //      som kan ha kortet, till karaktärens ID, på så sätt så kan ingen annan få det kortet
                    //      vilket som kan hända i fall med "Other"..
                    //      Om Owner är en typ så bestämms den Aktor som ska svara, om det är ett ID så
                    //      räknas den CardData som upptagen och kan inte väljas. En karaktär av typen "Other"
                    //      kan därför inte svara samma sak som en annan aktor av typen "Other". (då svaret är
                    //      upptagen) och tvingas därefter att välja ett annat CardData av ownerTypen "Other",
                    //      om det inte finns några mer alternativ så används ett förbestämt svar (?)..
		},
		
		Container : function(){		
			this.cardsOfContainer = []; 	// Varje Container kan innehålla max 3 GameCards
			this.image = ""; 				//URL till bilden Containern använder
		},
		
		Room : function(_ID, _image, _roomname, _waypointsArr){
			this.ID = _ID;
			this.roomname = _roomname;		//Namnen på rummen
			this.Containers = []; 			//Varje rum kan innehålla 3 Containers, varav 2 är Papperskorg och Garderob () || Använder PLACEHOLDER
			this.TableClue_GameCards = [];  //Varje rum kan innehålla max 5 GameCards av typen TableClue || Använder PLACEHOLDER
			this.WallClue_GameCards = []; 	//Varje rum kan innehålla max 2 Gamecards av typen WallClue || Använder PLACEHOLDER
            this.image = new Image();
			this.image.src = _image; 		//URL till bilden som används för rummet.. || Använder PLACEHOLDER
			this.ActorsInRoom = [];			//En Array som innehåller ID't på alla aktörer i rummet..
			this.WayPoints = _waypointsArr; //En array med WayPoints-Object som är "Knappar" man kan trycka på för att ta sig till nästa rum eller tillbaka..
											//Ett rum har minst 1 Waypoint, det är alltid bakåt och refererar till rummet man var i Innan. || Använder PLACEHOLDER
		},
        PlaceHolder : function(_gameCardOrContent, _PosX, _PosY){ //till för att hålla ett kort samt kortets Position
            this.GameCardOrContent = _gameCardOrContent;
            this.PosX = _PosX;
            this.PosY = _PosY;
        },
		
		WayPoint : function(_GoToRoom, _image, _RoomName){
			this.GoToRoom = _GoToRoom; 	//Ett ID som symboliserar vilket rum man kommer i när man trycker på denna Waypoint
            this.image = new Image();   //|| Använder PLACEHOLDER
			this.image.src = _image;	//URL med bild på dörren(knappen) som tar dig till det andra rummet
			this.RoomName = _RoomName; 	//Namnet på rummet som man kommer till när man trycker...
		},
		
		Actor : function(_name, _ID, _image){
			this.name = _name;				//Namnet på aktören..
			//this.isMurder = false;		
			this.ID = _ID;				//Alla Actors har ett ID som representerar vem dem är
			this.Secret = null; 		//GameCard av typen "Secret"
			this.Other = null;			//GameCard av typen "Other"
			this.Intress = null;		//GameCard av typen "intress"
			this.Relation = null;		//GameCard av typen "Relation"
			this.emotionState = "neutral";	//Vilken sinnesställning karaktären har, olika sinneställningar:
										//-Irriterad  |Annoyed,
										//-Glad       |Happy
                                        //-Ledsen     |Sad
                                        //-galenTyp.. |FreakedOut
										//-Neutral    |Neutral
										//-Nervös     |Nervous
										//-Arg        |Angry
										//-Bekymrad   |Concerned						
			this.ClueList = []; 		//En array med ledtrådar relaterade till Aktören
            this.image = new Image();
			this.image.src = _image;        //Url till Bild..
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
			};
            this.InCurrentRoom = 0;         //Ett rum-Id som symboliserar vilket rum  någon befinner sig i!
		},
		
		MotiveData : function(_motiveName, _LOC_other, _LOC_murderur, _LOC_victim, _LOC_actor1, _LOC_actor2, _LOC_actor3, _LOC_actor4){
		      this.motiveName     = _motiveName;      //string
		      this.LOC_other      = _LOC_other;       //Array med MotiveCardSpec (som innehåller GameCards)
		      this.LOC_murderur   = _LOC_murderur;    //Array
		      this.LOC_victim     = _LOC_victim;      //Array
		      this.LOC_actor1     = _LOC_actor1;      //Array
		      this.LOC_actor2     = _LOC_actor2;      //Array
		      this.LOC_actor3     = _LOC_actor3;      //Array
		      this.LOC_actor4     = _LOC_actor4;      //Array
		},

        MotiveCardSpec : function(_theGameCard,_possibleRoom){
          this.theGameCard = _theGameCard;
          this.possibleRoom= _possibleRoom;     //Array med Room Id'n som Ledtrådaen kan finnas i. Om ej Ledtråd ska denna vara NULL..
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
	GameData.initData();
	
};
