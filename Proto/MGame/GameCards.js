"use strict";

var GameData = {
	GameCardsCollectionData : [],
    GameDataImages : {},
    MurderMotives : [], // består av en array med typen MotiveCardSpec so minnehar typen  MotiveData

	initData : function(Other, Murderer, Victim, Actor1, Actor2, Actor3, Actor4, motive){
        //^Denna metod kontaktas när karaktärerna är klara och rollerna är valda,
        //då skickar man med rollerna så att rätt namn hamnar rätt! Skickar även med Vilket motiv som är valt!..



       // cardInMotive är en Funktion som används för att ta fram rätt namn..
       var cardInMotive = function(ID, actor){ // Denna function tar reda på om ID't (som man får ange själv)
           var i = 0;                           //finns med i Motivet. Om det gör det så Ska "Murdurer" väljas, annars "Other"
            if(motive == undefined){
                return "null"; //Säkerhetsspärr som ser till att funktionen ej används om motiv saknas..
            }
            for(i = 0; i < motive.LOC_other.theGameCard.length ; i++){
                if(motive.LOC_other[i].theGameCard.ID = ID){
                    // om KortID't finns i denna samling så är det "Murderer"-relaterat,
                    // och ska returnera mördarens namn..

                    return actor;

                }
            }
            for(i = 0; i < motive.LOC_murderur.theGameCard.length ; i++){
                if(motive.LOC_murderur[i].theGameCard.ID = ID){
                    //
                    return actor;
                }
            }
            for(i = 0; i < motive.LOC_victim.theGameCard.length ; i++){
                if(motive.LOC_victim[i].theGameCard.ID = ID){
                    //
                    return actor;
                }
            }
            for(i = 0; i < motive.LOC_actor1.theGameCard.length ; i++){
                if(motive.LOC_actor1[i].theGameCard.ID = ID){
                    //
                    return actor;
                }
            }
            for(i = 0; i < motive.LOC_actor2.theGameCard.length ; i++){
                if(motive.LOC_actor2[i].theGameCard.ID = ID){
                    //
                    return actor;
                }
            }
            for(i = 0; i < motive.LOC_actor3.theGameCard.length ; i++){
                if(motive.LOC_actor3[i].theGameCard.ID = ID){
                    //
                    return actor;
                }
            }
            for(i = 0; i < motive.LOC_actor4.theGameCard.length ; i++){
                if(motive.LOC_actor4[i].theGameCard.ID = ID){
                    //
                    return actor;
                }
            }
            return Other;
       };


        //I denna array ska alla MotiveCardSpec in, de innehåller ClueData
        // och ID'n på de rumm som ledtrådarna kan finnas i!
        //denna array innehåller data av typen MotiveCardSpec
        var MotiveCardSpecToInit = [
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    1,              //ID
                    GameEngine.Enums.GameCardType.Intress,    //Type
                    "Beskrivning!", //Beskrivning
                    [1,2],          //NeededCards
                    "",             //BildURL
                    [1,2,3,4]       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                //använd gärna Enum för detta..
                    GameEngine.Enums.Room.BathRoom
                ]
            )


        ];

        var Motives = [ //Array med MotivData
            new GameEngine.Classes.MotiveData(
                "Ett Test Mord",
                [ // GameCards ID'n tillhörande "Other"
                    1
                ],
                [ // GameCards ID'n tillhörande "murder"
                    2
                ],
                [ // GameCards ID'n tillhörande "Victim"
                    3
                ],
                [ // GameCards ID'n tillhörande "Actor 1"
                ],
                [// GameCards ID'n tillhörande "Actor 2"

                ],
                [// GameCards ID'n tillhörande "Actor 3"

                ],
                [// GameCards ID'n tillhörande "Actor 4"

                ]
            )
            /*
            new GameEngine.Classes.MotiveData(
                "Motiv-Template",
                [ // GameCards ID'n tillhörande "Other"

                ],
                [ // GameCards ID'n tillhörande "murder"

                ],
                [ // GameCards ID'n tillhörande "Victim"

                ],
                [ // GameCards ID'n tillhörande "Actor 1"
                ],
                [// GameCards ID'n tillhörande "Actor 2"

                ],
                [// GameCards ID'n tillhörande "Actor 3"

                ],
                [// GameCards ID'n tillhörande "Actor 4"

                ]
            )
            */

        ];

        var PersonDataToInit = [ //I denna array ska all PersonData in

            new GameEngine.Classes.GameCard(
                2,
                GameEngine.Enums.GameCardType.Secret,
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
                GameEngine.Enums.GameCardType.Secret,
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

        //Arrayen PersonDataToInit och MotiveCardSpecToInit  skickas till
        //GameCardsCollection för användning utanför denna funktion!
        var i = 0;

        for(i = 0; i < MotiveCardSpecToInit.length; i++){
            GameData.GameCardsCollectionData.push(MotiveCardSpecToInit[i]);
        };
        for(i = 0; i < PersonDataToInit.length; i++){
            GameData.GameCardsCollectionData.push(PersonDataToInit[i]);
        };
        for(i = 0; i < Motives.length; i++){
            GameData.MurderMotives.push(Motives[i]);
        }






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

        // 2 = nextButton
        var nextButton = new Image();
        nextButton.src = "Data/Hudd/right.jpg";

        // 3 = prevButton
        var prevButton = new Image();
        prevButton.src = "Data/Hudd/left.jpg";

        // 4 = upButton
        var upButton = new Image();
        upButton.src = "Data/Hudd/up.jpg";

        // 5 = downButton
        var downButton = new Image();
        downButton.src = "Data/Hudd/down.jpg";

        //disabled Buttons:

        //6 = nextButtonDisabled
        var nextButtonDisabled = new Image();
        nextButtonDisabled.src = "Data/Hudd/rightDisabled.jpg";

        //7 = prevButtonDisabled
        var prevButtonDisabled = new Image();
        prevButtonDisabled.src = "Data/Hudd/leftDisabled.jpg";

        //8 = upButtonDisabled
        var upButtonDisabled = new Image();
        upButtonDisabled.src = "Data/Hudd/upDisabled.jpg";

        //9 = downButtonDisabled
        var downButtonDisabled = new Image();
        downButtonDisabled.src = "Data/Hudd/downDisabled.jpg";

        GameData.GameDataImages = {
            HuddBackground : huddBackground,
            backButton : backButton,
            nextButton : nextButton,
            prevButton : prevButton,
            downButton : downButton,
            upButton   : upButton,
            nextButtonDisabled: nextButtonDisabled,
            prevButtonDisabled : prevButtonDisabled,
            upButtonDisabled : upButtonDisabled,
            downButtonDisabled : downButtonDisabled

        }

    }



}; // ctrl+Space = Förslag på vad man kan göra.!


		//var GameCardsCollectionData = [];
		//var h = new GameEngine.Classes.GameCard();
		//new GameEngine.Classes.GameCard()

		//var Motives = function(){
			//var newa = function(){};

		//}´ddd