"use strict";

var GameData = {
	GameCardsCollectionData : [],
    GameDataImages : {},
    MurderMotives : [], // består av en array med typen MotiveCardSpec so minnehar typen  MotiveData

	initData : function(Other, Murderer, Victim, Actor1, Actor2, Actor3, Actor4, motive){
        //^Denna metod kontaktas när karaktärerna är klara och rollerna är valda,
        //då skickar man med rollerna så att rätt namn hamnar rätt! Skickar även med Vilket motiv som är valt!..

        //OBs, i Parameterlistan så är "Other" en array som innehåller alla karaktärer som har rollen "other"
        //detta för att detkan finnas flera personer i spelet som INTE har något att göra med mordet, dessa har alltså Other..

        GameData.readInImgObj();//laddar in bilderna så de kan användas av initData funktionen..

       // cardInMotive är en Funktion som används för att ta fram rätt namn..
       var cardInMotive = function(ID, actor){ // Denna function tar reda på om ID't (som man får ange själv)

           if(Other == undefined){
               //Om det inte finns någon "other" i spelet
               //Så måste det lösas på något sätt.. hur? Tillfällig lösning
               ThisOther = "SOMONE OUTSIDE THIS GAME(Tip To Programmer, this happend BC No solution for " +
                   "Game motive without 'Other'-actor but Card for Actor needed 'other'. please ignore";
           }else{
               var ThisOther = Other[Math.floor(Math.random() * Other.length + 0)];
           }
           if(Other == actor && Other != undefined){
               actor = Other[Math.floor(Math.random() * Other.length + 0)];
           }

           var i = 0;                           //finns med i Motivet. Om det gör det så Ska "Murdurer" väljas, annars "Other"
            if(motive == undefined){
                return "null"; //Säkerhetsspärr som ser till att funktionen ej används om motiv saknas..
            }
            for(i = 0; i < motive.LOC_other.length ; i++){
                if(motive.LOC_other[i].ID = ID){
                    // om KortID't finns i denna samling så är det "Murderer"-relaterat,
                    // och ska returnera mördarens namn..

                    return actor;

                }
            }
            for(i = 0; i < motive.LOC_murderur.length ; i++){
                if(motive.LOC_murderur[i].ID = ID){
                    //
                    return actor;
                }
            }
            for(i = 0; i < motive.LOC_victim.length ; i++){
                if(motive.LOC_victim[i].ID = ID){
                    //
                    return actor;
                }
            }
            for(i = 0; i < motive.LOC_actor1.length ; i++){
                if(motive.LOC_actor1[i].ID = ID){
                    //
                    return actor;
                }
            }
            for(i = 0; i < motive.LOC_actor2.length ; i++){
                if(motive.LOC_actor2[i].ID = ID){
                    //
                    return actor;
                }
            }
            for(i = 0; i < motive.LOC_actor3.length ; i++){
                if(motive.LOC_actor3[i].ID = ID){
                    //
                    return actor;
                }
            }
            for(i = 0; i < motive.LOC_actor4.length ; i++){
                if(motive.LOC_actor4[i].ID = ID){
                    //
                    return actor;
                }
            }
            return ThisOther;
       };


        //I denna array ska alla MotiveCardSpec in, de innehåller ClueData
        // och ID'n på de rumm som ledtrådarna kan finnas i!
        //denna array innehåller data av typen MotiveCardSpec
        var MotiveCardSpecToInit = [
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    1,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "Namn",
                    "Beskrivning!", //Beskrivning
                    [1,2],          //NeededCards
                    "",             //BildURL
                    [1,2,3,4]       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                //använd gärna Enum för detta..
                    GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    4,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "Condom",
                    "Looks like a condom..", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    5,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "Condom Wrapper",
                    "Looks like a condom wrapper..",            //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    6,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "Condom Wrapper",
                    "Looks like another* condom wrapper..", //Beskrivning
                    [4,5],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    7,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "Looks like this dirty laundry have marks from a red lipstick....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    8,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "Looks like a red lipstick ....", //Beskrivning
                    [7],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    9,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 1 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    10,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 2 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    11,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 3 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    12,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 4 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    13,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 5 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    14,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 6 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    15,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 7 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    16,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 8 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    17,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 9 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    18,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 10 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    19,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 11 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    20,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 12 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    21,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 13 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    22,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 14 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    23,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    60,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    ////GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    61,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    ////GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    62,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    ////GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    63,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    64,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    65,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    66,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    67,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    68,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    69,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    70,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    72,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    73,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    74,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    75,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    76,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    77,              //ID
                    GameEngine.Enums.GameCardType.WallClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    78,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    79,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    80,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    81,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    82,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    83,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    84,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    85,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    86,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    87,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    88,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    89,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    90,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    91,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    92,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    93,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    94,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    95,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    96,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    97,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    98,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    99,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    100,              //ID
                    GameEngine.Enums.GameCardType.TableClue,    //Type
                    "NamePlaceHolder",
                    "TestData 15 ....", //Beskrivning
                    [],          //NeededCards
                    GameData.GameDataImages.UnknownClue.src,             //BildURL
                    []       //FollowUpCards (AnswerCards...)
                ),
                [//Array med ID'n på möjliga rum ledtråden kan finnas i OM den är med i mordfallet..
                    //använd gärna Enum för detta..
                    //GameEngine.Enums.Room.BathRoom
                ]
            )


        ];

        var Motives = [ //Array med MotivData
            new GameEngine.Classes.MotiveData(
                "Ett Test Mord",
                [ // GameCards ID'n tillhörande "Other"
                    1,5,4
                ],
                [ // GameCards ID'n tillhörande "murder"
                    2,6
                ],
                [ // GameCards ID'n tillhörande "Victim"
                    3,7
                ],
                [ // GameCards ID'n tillhörande "Actor 1"
                    8
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
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "No, I have not seen anything.",
                        [
                            new GameEngine.Classes.CardData(
                             GameEngine.Enums.EmotionState.Happy,
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
                        GameEngine.Enums.EmotionState.Annoyed,
                        "I have already told you, I don't know anything.",
                        [],
                        "Do you have any secrets to share?",
                        null
                    ),
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Happy,
                        "Well, You seem trustworthy. I do know some stuff..",
                        [
                           new GameEngine.Classes.CardData(
                               GameEngine.Enums.EmotionState.Happy,
                               "Sure, just promise to not tell my lover "+ cardInMotive(2, Murderer)
                               +"! He would be quite mad... I had an affair with "+cardInMotive(2, Victim)
                               +" behind my lovers back...",
                               [],
                               "I would love to hear the details!",
                               null
                           ),
                           new GameEngine.Classes.CardData(
                               GameEngine.Enums.EmotionState.Annoyed,
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
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "No, not really! I got nothing to hide!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! Not at all! I've had some tough time lately, that's all..",
                                [],
                                "Hmm, you act a little shady...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
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
            ),
            new GameEngine.Classes.GameCard(
                24,
                GameEngine.Enums.GameCardType.Intress,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                25,
                GameEngine.Enums.GameCardType.Intress,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "1No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                26,
                GameEngine.Enums.GameCardType.Intress,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "2No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                27,
                GameEngine.Enums.GameCardType.Intress,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "3No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                28,
                GameEngine.Enums.GameCardType.Intress,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "4No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                29,
                GameEngine.Enums.GameCardType.Intress,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "5No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                30,
                GameEngine.Enums.GameCardType.Intress,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "7No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                31,
                GameEngine.Enums.GameCardType.Intress,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "8No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                31,
                GameEngine.Enums.GameCardType.Intress,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                32,
                GameEngine.Enums.GameCardType.Other,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                33,
                GameEngine.Enums.GameCardType.Other,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                34,
                GameEngine.Enums.GameCardType.Other,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                35,
                GameEngine.Enums.GameCardType.Other,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                36,
                GameEngine.Enums.GameCardType.Other,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                37,
                GameEngine.Enums.GameCardType.Other,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                38,
                GameEngine.Enums.GameCardType.Other,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                39,
                GameEngine.Enums.GameCardType.Other,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                40,
                GameEngine.Enums.GameCardType.Other,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                41,
                GameEngine.Enums.GameCardType.Other,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                42,
                GameEngine.Enums.GameCardType.Relationship,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                43,
                GameEngine.Enums.GameCardType.Relationship,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                44,
                GameEngine.Enums.GameCardType.Relationship,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                45,
                GameEngine.Enums.GameCardType.Relationship,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                46,
                GameEngine.Enums.GameCardType.Relationship,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                47,
                GameEngine.Enums.GameCardType.Relationship,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                48,
                GameEngine.Enums.GameCardType.Relationship,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                49,
                GameEngine.Enums.GameCardType.Relationship,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                50,
                GameEngine.Enums.GameCardType.Relationship,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                51,
                GameEngine.Enums.GameCardType.Secret,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                52,
                GameEngine.Enums.GameCardType.Secret,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                53,
                GameEngine.Enums.GameCardType.Secret,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                54,
                GameEngine.Enums.GameCardType.Secret,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                55,
                GameEngine.Enums.GameCardType.Secret,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                56,
                GameEngine.Enums.GameCardType.Secret,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                57,
                GameEngine.Enums.GameCardType.Secret,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                58,
                GameEngine.Enums.GameCardType.Secret,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
                        null
                    )
                ]
            ),new GameEngine.Classes.GameCard(
                59,
                GameEngine.Enums.GameCardType.Secret,
                "NamePlaceHolder",
                null,
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "6No this is a test!",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                "What?.. no! No! this is a test.",
                                [],
                                "Hmm, you act a little shady, but this is a test...",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                    "Well I can try to test! I would suggest that you check in on "+cardInMotive(3,Other)+", HeShe has been acting strange since "+cardInMotive(3,Victim) +" died...",
                                [],
                                "Good, maybe you can help me find the murderer. testing testning?",
                                null
                            )
                        ],
                        "Do you have any secrets to share, test test?",
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

    },

    readInImgObj : function(){
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
        nextButton.src = "Data/Hudd/right.png";

        // 3 = prevButton
        var prevButton = new Image();
        prevButton.src = "Data/Hudd/left.png";

        // 4 = upButton
        var upButton = new Image();
        upButton.src = "Data/Hudd/up.png";

        // 5 = downButton
        var downButton = new Image();
        downButton.src = "Data/Hudd/down.png";

        //disabled Buttons:

        //6 = nextButtonDisabled
        var nextButtonDisabled = new Image();
        nextButtonDisabled.src = "Data/Hudd/rightdisabled.png";

        //7 = prevButtonDisabled
        var prevButtonDisabled = new Image();
        prevButtonDisabled.src = "Data/Hudd/leftdisabled.png";

        //8 = upButtonDisabled
        var upButtonDisabled = new Image();
        upButtonDisabled.src = "Data/Hudd/updisabled.png";

        //9 = downButtonDisabled
        var downButtonDisabled = new Image();
        downButtonDisabled.src = "Data/Hudd/downdisabled.png";

        //HuddButtons
        var GuessMurderButton = new Image();
        GuessMurderButton.src = "Data/Hudd/GuessMurderButton.png";

        //ConfirmButton
        var ConfirmButton = new Image();
        ConfirmButton.src = "Data/Hudd/ConfirmButton.png";

        //UnknownClue
        var UnknownClue = new Image();
        UnknownClue.src = "Data/Map/Extras/UnknownClue.png";

        //MarkedDead
        var MarkedDead = new Image();
        MarkedDead.src = "Data/Hudd/MarkedDead.png";

        //GameOver Stuff
        //GameOverBackground
        var GameOverBackground = new Image();
        GameOverBackground.src = "Data/Menu/game-over.png";
        //ToMenuButton
        var ToMenuButton = new Image();
        ToMenuButton.src = "Data/Menu/ToMainMenu.png";
        //RestartGameButton
        var RestartGameButton = new Image();
        RestartGameButton.src = "Data/Menu/RestartGameButton.png";

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
            downButtonDisabled : downButtonDisabled,
            GuessMurderButton  :GuessMurderButton,
            ConfirmButton   : ConfirmButton,
            UnknownClue     : UnknownClue,
            MarkedDead      : MarkedDead,
            GameOverBackground  : GameOverBackground,
            ToMenuButton        : ToMenuButton,
            RestartGameButton   : RestartGameButton

        }
    }



}; // ctrl+Space = Förslag på vad man kan göra.!


		//var GameCardsCollectionData = [];
		//var h = new GameEngine.Classes.GameCard();
		//new GameEngine.Classes.GameCard()

		//var Motives = function(){
			//var newa = function(){};

		//}´ddd