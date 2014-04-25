"use strict";

var GameData = {
	GameCardsCollectionData : [],
    GameDataImages : [],
	
	initData : function(Other, Murderer, Victim, Actor1, Actor2, Actor3, Actor4, motive){     
        //^Denna metod kontaktas när karaktärerna är klara och rollerna är valda, 
        //då skickar man med rollerna så att rätt namn hamnar rätt! Skickar även med Vilket motiv som är valt!..
         
       // cardInMotive är en Funktion som används för att ta fram rätt namn..
       var cardInMotive = function(ID, actor){ // Denna function tar reda på om ID't (som man får ange själv) 
                                       //finns med i Motivet. Om det gör det så Ska "Murdurer" väljas, annars "Other"
            if(motive == undefined){
                return "null"; //Säkerhetsspärr som ser till att funktionen ej används om motiv saknas..
            }       
            for(var i = 0; i < motive.LOC_other.length ; i++){
                if(motive.LOC_other[i].ID = ID){
                    // om KortID't finns i denna samling så är det "Murderer"-relaterat,
                    // och ska returnera mördarens namn..
                    
                    return actor;
                    
                }
            }
            for(var i = 0; i < motive.LOC_murderur.length ; i++){
                if(motive.LOC_murderur[i].ID = ID){
                    // 
                    return actor;
                }
            }
            for(var i = 0; i < motive.LOC_victim.length ; i++){
                if(motive.LOC_victim[i].ID = ID){
                    // 
                    return actor;
                }
            }
            for(var i = 0; i < motive.LOC_actor1.length ; i++){
                if(motive.LOC_actor1[i].ID = ID){
                    // 
                    return actor;
                }
            }
            for(var i = 0; i < motive.LOC_actor2.length ; i++){
                if(motive.LOC_actor2[i].ID = ID){
                    // 
                    return actor;
                }
            }
            for(var i = 0; i < motive.LOC_actor3.length ; i++){
                if(motive.LOC_actor3[i].ID = ID){
                    // 
                    return actor;
                }
            }
            for(var i = 0; i < motive.LOC_actor4.length ; i++){
                if(motive.LOC_actor4[i].ID = ID){
                    // 
                    return actor;
                }
            }
            return Other;
       };
                            
        var ClueDataToInit = [ //I denna array ska all ClueData in
        
            new GameEngine.Classes.GameCard(
                1,              //ID
                "TableClue",    //Type
                "Beskrivning!", //Beskrivning
                [1,2],          //NeededCards
                "",             //BildURL
                [1,2,3,4]       //FollowUpCards (AnswerCards...)        
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
                        "neutral",
                        "No, I have not seen anything.",
                        [
                            new GameEngine.Classes.CardData(
                             "Happy",
                             "Thanks, come back and talk to me later. There's a chance i might remember something",
                             [],
                             "Hm, too bad. I thought you might be able to"+
                             "help, you sure do look smart enough to be able"+
                             " to notice if something weird was happening",
                             null                             
                            )
                        ],
                        "Do you have any secrets to share?",
                        null
                    ),
                    new GameEngine.Classes.CardData(
                        "annoyed",
                        "I have already told you, I don't know anything.",
                        [],
                        "Do you have any secrets to share?",
                        null
                    ),
                    new GameEngine.Classes.CardData(
                        "happy",
                        "Well, You seem trustworthy. I do know some stuff..",
                        [
                           new GameEngine.Classes.CardData(
                               "happy",
                               "Sure, just promise to not tell my lover "+ cardInMotive(2, Murderer) 
                               +"! He would be quite mad... I had an affair with "+cardInMotive(2, Victim)
                               +" behind my lovers back...",
                               [],
                               "I would love to hear the details!",
                               null
                           ),
                           new GameEngine.Classes.CardData(
                               "annoyed",
                               "Hm, well no it was really nothing...",
                               [],
                               "Well, spit it out then!",
                               null
                           )
                        ],
                        "Do you have any secrets to share?",
                        null
                    )                                                   
                ]
                
            ),
            new GameEngine.Classes.GameCard(
                3,
                "secret",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        "neutral",
                        "No, not really! I got nothing to hide!",
                        [
                            new GameEngine.Classes.CardData(
                                "concerned",
                                "What?.. no! No! Not at all! I've had some tough time lately, that's all..",
                                [],
                                "Hmm, you act a little shady...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                "Happy",
                                "Well I can try! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer?",
                                null
                            )
                        ],
                        "Do you have any secrets to share?",
                        null
                    )
                ]
            )

        ];
        
        //Arrayen PersonDataToInit och ClueDataToInit  skickas till 
        //GameCardsCollection för användning utanför denna funktion!
        for(var i = 0; i < ClueDataToInit.length; i++){
            GameData.GameCardsCollectionData.push(ClueDataToInit[i]);
        };
        for(var i = 0; i < PersonDataToInit.length; i++){
            GameData.GameCardsCollectionData.push(PersonDataToInit[i]);
        };

        //Detta sköter hand om att skjuta in data i form av bilder etc som behövs till
        //spelet och inte laddas in på annat vis.. (tex Rum/actor-bilder laddas in
        //samtidigt som de skapas och sparas i en "global" variabel i motor.js!

        //Bildlista på data som ska läggas in i GameDataImages

        // 0 = HuddBackground
        var huddBackground = new Image();
        huddBackground.src = "Data/Hudd/black.jpg";

        // 1 = backButton
        var backButton = new Image();
        backButton.src = "Data/Hudd/backbutton.png";


        GameData.GameDataImages.push(
            huddBackground,     //0
            backButton          //1
        );
        
    }
	
	
	
}; // ctrl+Space = Förslag på vad man kan göra.! 


		//var GameCardsCollectionData = [];
		//var h = new GameEngine.Classes.GameCard();
		//new GameEngine.Classes.GameCard()
		
		//var Motives = function(){
			//var newa = function(){};
			
		//}´ddd