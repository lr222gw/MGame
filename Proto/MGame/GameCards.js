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
       var ActiveGameCardID = 0;
       var ActiveOther = "";
       var cardInMotive = function(ID, actor){ // Denna function tar reda på om ID't (som man får ange själv)

           if(Other == undefined){
               //Om det inte finns någon "other" i spelet
               //Så måste det lösas på något sätt.. hur? Tillfällig lösning
               ThisOther = "SOMONE OUTSIDE THIS GAME(Tip To Programmer, this happend BC No solution for " +
                   "Game motive without 'Other'-actor but Card for Actor needed 'other'. please ignore";
           }else{
               if(ActiveGameCardID != ID){
                   var ThisOther = Other[Math.floor(Math.random() * Other.length + 0)];
                   ActiveOther = ThisOther;
                   ActiveGameCardID = ID;
               }else{
                   ThisOther = ActiveOther;
               }

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
                    37,	//ID,
                    GameEngine.Enums.GameCardType.TableClue,	//Type GameEngine.Enums.GameCardType.TableClue eller GameEngine.Enums.GameCardType.WallClue
                    "Tvspelet GTA 5",	//Namnet på ledtråden
                    "Ett repigt spelfodral med titeln 'GTA V', spelet ser väldigt använt ut. ",	//Beskrivning av ledtråden
                    [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
                    GameData.GameDataImages.UnknownClue.src, 	//Bild på ledtråd (just nu används standardbild)
                    [	//Array med CardDatas..

                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                            "Ser ut som ett tvspel! Hmm, den enda som spelar tvspel här är "+cardInMotive(2, Murderer)+" ",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                            "Ohh! Det är mitt tvspel! Snälla lägg tillbaka det när du är klar med den!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.murder	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "hmm! Jag vet vilket spel det där är.. Det ska tydligen vara jätte våldsamt... kan inte säga att jag vet vems det är...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "Uhee, ser smutsigt ut, ta bort det från mig",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        )
                    ]
            ),
            [//Array med IDN på möjliga rum ledtråden kan finnas i om det är med i aktuellt mordfall
               GameEngine.Enums.Room.tvroom
            ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    38,	//ID,
                    GameEngine.Enums.GameCardType.TableClue,	//Type GameEngine.Enums.GameCardType.TableClue eller GameEngine.Enums.GameCardType.WallClue
                    "Tvspelet Killer Ninja",	//Namnet på ledtråden
                    "Ett repigt spelfodral med titeln 'Killer Ninja, spelet ser väldigt använt ut. ",	//Beskrivning av ledtråden
                    [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
                    GameData.GameDataImages.UnknownClue.src, 	//Bild på ledtråd (just nu används standardbild)
                    [	//Array med CardDatas..

                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                            "Ser ut som ett tvspel! Hmm, den enda som spelar tvspel här är "+cardInMotive(2, Murderer)+"",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                            "Ohh! Det är mitt tvspel! Snälla lägg tillbaka det när du är klar med den!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.murder	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "hmm! Jag vet vilket spel det där är.. Det ska tydligen vara jätte våldsamt... kan inte säga att jag vet vems det är...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "Uhee, ser smutsigt ut, ta bort det från mig",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        )
                    ]
                ),
                [//Array med IDN på möjliga rum ledtråden kan finnas i om det är med i aktuellt mordfall
                    GameEngine.Enums.Room.tvroom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    39,	//ID,
                    GameEngine.Enums.GameCardType.TableClue,	//Type GameEngine.Enums.GameCardType.TableClue eller GameEngine.Enums.GameCardType.WallClue
                    "Tvspelet Humanity Sux 7",	//Namnet på ledtråden
                    "Ett repigt spelfodral med titeln 'Humanity Sux 7', spelet ser väldigt använt ut. ",	//Beskrivning av ledtråden
                    [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
                    GameData.GameDataImages.UnknownClue.src, 	//Bild på ledtråd (just nu används standardbild)
                    [	//Array med CardDatas..

                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                            "Ser ut som ett tvspel! Hmm, den enda som spelar tvspel här är "+cardInMotive(2, Murderer)+"",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                            "Ohh! Det är mitt tvspel! Snälla lägg tillbaka det när du är klar med den!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.murder	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "hmm! Jag vet vilket spel det där är.. Det ska tydligen vara jätte våldsamt... kan inte säga att jag vet vems det är...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "Uhee, ser smutsigt ut, ta bort det från mig",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        )
                    ]
                ),
                [//Array med IDN på möjliga rum ledtråden kan finnas i om det är med i aktuellt mordfall
                    GameEngine.Enums.Room.tvroom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    40,	//ID,
                    GameEngine.Enums.GameCardType.TableClue,	//Type GameEngine.Enums.GameCardType.TableClue eller GameEngine.Enums.GameCardType.WallClue
                    "Tvspelet Dark Days and Blood",	//Namnet på ledtråden
                    "Ett repigt spelfodral med titeln 'Dark Days and Blood', spelet ser väldigt använt ut. ",	//Beskrivning av ledtråden
                    [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
                    GameData.GameDataImages.UnknownClue.src, 	//Bild på ledtråd (just nu används standardbild)
                    [	//Array med CardDatas..

                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                            "Ser ut som ett tvspel! Hmm, den enda som spelar tvspel här är "+cardInMotive(2, Murderer)+"",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                            "Ohh! Det är mitt tvspel! Snälla lägg tillbaka det när du är klar med den!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.murder	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "hmm! Jag vet vilket spel det där är.. Det ska tydligen vara jätte våldsamt... kan inte säga att jag vet vems det är...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "Uhee, ser smutsigt ut, ta bort det från mig",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        )
                    ]
                ),
                [//Array med IDN på möjliga rum ledtråden kan finnas i om det är med i aktuellt mordfall
                    GameEngine.Enums.Room.tvroom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    41,	//ID,
                    GameEngine.Enums.GameCardType.TableClue,	//Type GameEngine.Enums.GameCardType.TableClue eller GameEngine.Enums.GameCardType.WallClue
                    "Tvspelet Killed Or Killer",	//Namnet på ledtråden
                    "Ett repigt spelfodral med titeln 'Killed Or Killer', spelet ser väldigt använt ut. ",	//Beskrivning av ledtråden
                    [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
                    GameData.GameDataImages.UnknownClue.src, 	//Bild på ledtråd (just nu används standardbild)
                    [	//Array med CardDatas..

                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                            "Ser ut som ett tvspel! Hmm, den enda som spelar tvspel här är "+cardInMotive(2, Murderer)+"",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                            "Ohh! Det är mitt tvspel! Snälla lägg tillbaka det när du är klar med den!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.murder	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "hmm! Jag vet vilket spel det där är.. Det ska tydligen vara jätte våldsamt... kan inte säga att jag vet vems det är...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "Uhee, ser smutsigt ut, ta bort det från mig",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        )
                    ]
                ),
                [//Array med IDN på möjliga rum ledtråden kan finnas i om det är med i aktuellt mordfall
                    GameEngine.Enums.Room.tvroom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    42,	//ID,
                    GameEngine.Enums.GameCardType.TableClue,	//Type GameEngine.Enums.GameCardType.TableClue eller GameEngine.Enums.GameCardType.WallClue
                    "Tvspelet Too Much Gore",	//Namnet på ledtråden
                    "Ett repigt spelfodral med titeln 'Too Much Gore', spelet ser väldigt använt ut. ",	//Beskrivning av ledtråden
                    [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
                    GameData.GameDataImages.UnknownClue.src, 	//Bild på ledtråd (just nu används standardbild)
                    [	//Array med CardDatas..

                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                            "Ser ut som ett tvspel! Hmm, den enda som spelar tvspel här är "+cardInMotive(2, Murderer)+"",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                            "Ohh! Det är mitt tvspel! Snälla lägg tillbaka det när du är klar med den!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.murder	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "hmm! Jag vet vilket spel det där är.. Det ska tydligen vara jätte våldsamt... kan inte säga att jag vet vems det är...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "Uhee, ser smutsigt ut, ta bort det från mig",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        )
                    ]
                ),
                [//Array med IDN på möjliga rum ledtråden kan finnas i om det är med i aktuellt mordfall
                    GameEngine.Enums.Room.tvroom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    43,	//ID,
                    GameEngine.Enums.GameCardType.TableClue,	//Type GameEngine.Enums.GameCardType.TableClue eller GameEngine.Enums.GameCardType.WallClue
                    "Tvspelet FishMan 4",	//Namnet på ledtråden
                    "Ett repigt spelfodral med titeln 'FishMan 4', spelet ser väldigt använt ut. ",	//Beskrivning av ledtråden
                    [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
                    GameData.GameDataImages.UnknownClue.src, 	//Bild på ledtråd (just nu används standardbild)
                    [	//Array med CardDatas..

                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                            "Ser ut som ett tvspel! Hmm, den enda som spelar tvspel här är "+cardInMotive(2, Murderer)+"",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                            "Ohh! Det är mitt tvspel! Snälla lägg tillbaka det när du är klar med den!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.murder	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "hmm! Jag vet vilket spel det där är.. Det ska tydligen vara jätte våldsamt... kan inte säga att jag vet vems det är...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "Uhee, ser smutsigt ut, ta bort det från mig",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        )
                    ]
                ),
                [//Array med IDN på möjliga rum ledtråden kan finnas i om det är med i aktuellt mordfall
                    GameEngine.Enums.Room.tvroom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    44,	//ID,
                    GameEngine.Enums.GameCardType.TableClue,	//Type GameEngine.Enums.GameCardType.TableClue eller GameEngine.Enums.GameCardType.WallClue
                    "Tvspelet Hide And Sneek",	//Namnet på ledtråden
                    "Ett repigt spelfodral med titeln 'Hide And Sneek', spelet ser väldigt använt ut. ",	//Beskrivning av ledtråden
                    [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
                    GameData.GameDataImages.UnknownClue.src, 	//Bild på ledtråd (just nu används standardbild)
                    [	//Array med CardDatas..

                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                            "Ser ut som ett tvspel! Hmm, den enda som spelar tvspel här är "+cardInMotive(2, Murderer)+"",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                            "Ohh! Det är mitt tvspel! Snälla lägg tillbaka det när du är klar med den!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.murder	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "hmm! Jag vet vilket spel det där är.. Det ska tydligen vara jätte våldsamt... kan inte säga att jag vet vems det är...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "Uhee, ser smutsigt ut, ta bort det från mig",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        )
                    ]
                ),
                [//Array med IDN på möjliga rum ledtråden kan finnas i om det är med i aktuellt mordfall
                    GameEngine.Enums.Room.tvroom
                ]
            ),
            new GameEngine.Classes.MotiveCardSpec(
                new GameEngine.Classes.GameCard(
                    45,	//ID,
                    GameEngine.Enums.GameCardType.TableClue,	//Type GameEngine.Enums.GameCardType.TableClue eller GameEngine.Enums.GameCardType.WallClue
                    "Tvspelet God Of Glory",	//Namnet på ledtråden
                    "Ett repigt spelfodral med titeln 'God Of Glory', spelet ser väldigt använt ut. ",	//Beskrivning av ledtråden
                    [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
                    GameData.GameDataImages.UnknownClue.src, 	//Bild på ledtråd (just nu används standardbild)
                    [	//Array med CardDatas..

                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                            "Ser ut som ett tvspel! Hmm, den enda som spelar tvspel här är "+cardInMotive(2, Murderer)+"",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                            "Ohh! Det är mitt tvspel! Snälla lägg tillbaka det när du är klar med den!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.murder	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "hmm! Jag vet vilket spel det där är.. Det ska tydligen vara jätte våldsamt... kan inte säga att jag vet vems det är...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                            "Uhee, ser smutsigt ut, ta bort det från mig",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Känner du igen det här?",	//Frågan som kortet ställer
                            GameEngine.Enums.Roles.other	//Vilken typ av Aktor som kan använda kortet
                        )
                    ]
                ),
                [//Array med IDN på möjliga rum ledtråden kan finnas i om det är med i aktuellt mordfall
                    GameEngine.Enums.Room.tvroom
                ]
            )



        ];

        var Motives = [ //Array med MotivData
            new GameEngine.Classes.MotiveData(
                "",
                ""+cardInMotive(1, Victim)+" hittades i sitt rum. Av såren på den dödes kropp kan man se att ett vasst föremål har använts för att begå mordet. Tecken  på motstånd är också synligt vilket innebär att "+cardInMotive(1, Victim)+" måste vart beredd på att han var nära döden. Brottet anmäldes på morgonen strax innan kl 9.00.",//Beskrivning av mordfallet, nogrann (Innehåller ledtrådar till användaren om vapen etc...)",
                [ // GameCards ID'n tillhörande "Other"
                    10,11,12,13,14,15,16,17,18,19,20,21
                ],
                [ // GameCards ID'n tillhörande "murder"
                    1,2,3,4,5,37
                ],
                [ // GameCards ID'n tillhörande "Victim"
                    31
                ],
                [ // GameCards ID'n tillhörande "Actor 1"
                    6,7, 8, 9
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
                1,	//ID,
                GameEngine.Enums.GameCardType.Relationship,//Type : (secret, other, intress, GameEngine.Enums.GameCardType.Relationship)
                "",	//Frågan som ska ställas
                null,	//Är null om detta är ett personkort
                [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
                null, 	//Null om det är ett personkort
                [	//Array med CardDatas..

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                        "Ja, jag har en partner. Om du kan ursäkta mig så ska jag gå och sörja, en nära vänn till mig har nyss dött..",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Angry,//Emotionstate:
                                "Nära! Jag tänker inte gå med på att svara på mer frågor.",	//Svaret på frågan som ställdes
                                [	//array med med CardDatas (som innehåller följdfrågor..)

                                ],
                                "'Nära vänn' Hur pass nära var du egentligen "+cardInMotive(1,Victim)+"?",	//Frågan som kortet ställer
                                null	//Null om det är ett personkort..
                            ),

                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                                "Det är okej, jag förstår att ditt arbete är tidskrävande. Vi, jag och "+cardInMotive(1,Victim)+", var de första som flyttade in här. Sedan dess har vi haft våra upp och nedgångar, men ända till slutet har jag sett " +
                                "honom som en vän. Dumma "+cardInMotive(1,Victim)+", inte en dag utan att han var med i något bråk..",	//Svaret på frågan som ställdes
                                [	//array med med CardDatas (som innehåller följdfrågor..)

                                ],
                                "Jag menade inte att göra dig irriterad, ni verkar vart väldigt nära?",	//Frågan som kortet ställer
                                null	//Null om det är ett personkort..
                                )
                        ],
                         "",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                        "Hmm, varför undrar du det?",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                                "Ja, jag har en partner. Om du kan ursäkta mig så ska jag gå och sörja, en nära vänn till mig har nyss dött..",	//Svaret på frågan som ställdes
                                [	//array med med CardDatas (som innehåller följdfrågor..)
                                    new GameEngine.Classes.CardData(
                                        GameEngine.Enums.EmotionState.Angry,//Emotionstate:
                                        "Nära! Jag tänker inte gå med på att svara på mer frågor.",	//Svaret på frågan som ställdes
                                        [	//array med med CardDatas (som innehåller följdfrågor..)

                                        ],
                                        "'Nära vänn' Hur pass nära var du egentligen "+cardInMotive(1,Victim)+"?",	//Frågan som kortet ställer
                                        null	//Null om det är ett personkort..
                                    ),

                                    new GameEngine.Classes.CardData(
                                        GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                                        "Det är okej, jag förstår att ditt arbete är tidskrävande. Vi, jag och "+cardInMotive(1,Victim)+", var de första som flyttade in här. Sedan dess har vi haft våra upp och nedgångar, men ända till slutet har jag sett " +
                                        "honom som en vän. Dumma "+cardInMotive(1,Victim)+", inte en dag utan att han var med i något bråk..",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Jag menade inte att göra dig irriterad, ni verkar vart väldigt nära?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    "Svara på min fråga, jag har inte tid med sånt här.",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                    "Oh. Jag har haft ett förhållande med "+cardInMotive(1,Actor1)+" i drygt 3 år nu...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                            "Hmpf. Ja, varför skulle det inte ha vart? Vi har inte haft några problem alls och vi kommer inte ha det i fortsättningen heller!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "3 år är rätt mycket, känner du att det var värt det?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            ),

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                            "Jo, det har väl gått bra. Vi har inte haft så mycket tid för varandra på sistonde, men annars så har jag inte märkt något.",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Har du på senare tid upplevt att ditt förhållande har funkat bra?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )
                    ],
                    "Jag måste undersöka alla möjligheter, du är inte den enda jag frågar detta.",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )
                    ],
                     "",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Angry,//Emotionstate:
                    "mh, varför skulle jag svara på det? Det har inget att göra med "+cardInMotive(1,Victim)+", så det är inte något som rör dig! ",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                            "Du borde inte göra dina intervju'offer' arga om du vill få något bra svar från dem..",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)
                                new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                                    "Om det får dig att lämna mig ifred så kan du väl få veta att jag har haft ett förhållande med "+cardInMotive(1,Actor1)+" i 3 år.",	//Svaret på frågan som ställdes
                                    [	//array med med CardDatas (som innehåller följdfrågor..)

                                    ],
                                    "Du borde respektera mig, jag är bara här för att hjälpa. Ju snarare du svarar på mina frågor destu snabbare kan jag lämna dig ifred.",	//Frågan som kortet ställer
                                    null	//Null om det är ett personkort..
                                ),

                                new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                                    "Ok, visst! Jag har haft ett förhållande med "+cardInMotive(1,Actor1)+" i nästan 3 år, men jag ansåg att du inte behövde den informationen...",	//Svaret på frågan som ställdes
                                    [	//array med med CardDatas (som innehåller följdfrågor..)

                                    ],
                                    "Ditt uppförande får dig bara att verka mer misstänkt, varför svarar du inte på frågan?",	//Frågan som kortet ställer
                                    null	//Null om det är ett personkort..
                                )
                            ],
                            "Snälla svara på frågan, det skulle underlätta mitt arbete...",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            ),

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                            "Visst! Jag har ett förhållande, med "+cardInMotive(1,Actor1)+" faktiskt! Vi har kanske inte haft det så.. lätt.. de senaste månaderna men det innebär inte att det alltid kommer vara så! JAG TÄNKER INTE SLÄPPA TAGET OM " +
                            ""+cardInMotive(1,Actor1)+", om jag så måste bevisa min kärlek på det mest plågsammaste sätt!",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)
                                    new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.FreakedOut,//Emotionstate:
                                    "... jag har tänkt samma tanke... Men det är omöjligt! Jag är SÄKER på att det inte kan vara så! Jag älskar ju ... "+cardInMotive(1,Actor1)+"...",	//Svaret på frågan som ställdes
                                    [	//array med med CardDatas (som innehåller följdfrågor..)

                                    ],
                                    "På dig verkar det som "+cardInMotive(1,Actor1)+" inte längre är intresserad av dig...",	//Frågan som kortet ställer
                                    null	//Null om det är ett personkort..
                                    ),

                                    new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                                    ""+cardInMotive(1,Actor1)+" sa det?... jag vet inte riktigt hur jag ska hantera det här... Vad jag än gör så blir det fel, jag var helt säker på att jag hade hittat äkta kärlek... men det verkar som om det jag" +
                                    "upplever, inte är riktigt...",	//Svaret på frågan som ställdes
                                    [	//array med med CardDatas (som innehåller följdfrågor..)

                                    ],
                                    ""+cardInMotive(1,Actor1)+" sa till mig att hon tycker du har blivit tråkig...",	//Frågan som kortet ställer
                                    null	//Null om det är ett personkort..
                                    )
                            ],
                            "Så som jag ser det så har du ett förhållande som du inte riktigt är stolt över, varför skulle du annars dölja det.",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )
                    ],
                     "",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Happy,//Emotionstate:
                    "Heh! Jo, jag har haft ett förhållande ett tag nu, med "+cardInMotive(1,Actor1)+"! Känns som det äntligen börjar bli bra för oss. Varför undrar du?",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                            "Jaha. Jo jag kan väl säga att vi vart ihop i över 3 år nu, vet inte riktigt om jag kommer på något mer på rak arm...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Bara en standardfråga som jag ställer till alla. Kan du berätta något mer om ert förhållande?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            ),
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                            "ehmm, finns inte så mycket att säga. Allt är bra!...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Det är tyvärr hemligstämplat. Kan du berätta något mer om ert förhållande?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )
                    ],
                     "",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                    "Lämna mig ifred sa jag..",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                     "",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.FreakedOut,//Emotionstate:
                    "HAHAHHAA, ahh... Kanske att "+cardInMotive(1,Actor1)+" hatar mig.. Kanske att "+cardInMotive(1,Actor1)+" önskar att det var jag som dog istället för "+cardInMotive(1,Victim)+".. skulle inte förvåna mig..",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.FreakedOut,//Emotionstate:
                                "HAHAHAH!*Maniskt skratt* att du inte fattat det än... "+cardInMotive(1,Actor1)+" hade sex med "+cardInMotive(1,Victim)+"... det var därför jag behövde göra det... jag behövde ändra allt innan det  blev försent, innan jag hade förlorat henne..." +
                                "men nu har jag förlorat båda... HAHAHAHAHAHHA....",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Vad får dig att säga det?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )
                    ],
                     "",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                    "Jag har ingen aning om vad jag ska säga, du vet redan om att jag har haft ett förhållande med "+cardInMotive(1,Actor1)+"... vad mer vill du veta?",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                     "",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Concerned,//Emotionstate:
                    "Jag behöver lite tid för mig själv.. du kanske kan prata med "+cardInMotive(1,Actor1)+" istället...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                     "",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )

            ]
            ),

            new GameEngine.Classes.GameCard(
            2,	//ID,
            GameEngine.Enums.GameCardType.Secret,	//Type : (secret, other, intress, GameEngine.Enums.GameCardType.Relationship)
             "",	//Frågan som ska ställas
            null,	//Är null om detta är ett personkort
            [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
            null, 	//Null om det är ett personkort
            [	//Array med CardDatas..

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                "Hmm. Hemligheter.. hmm.. Jag vet att "+cardInMotive(2, Other)+" inte har bytt sängklder på ett bra tag.. mer än så kan jag nog inte hjälpa dig med.. ",//Svaret på frågan	 som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,//Emotionstate:
                            "heh! Nu när du säger det.. "+cardInMotive(2,Victim)+" var gick till affären dagen innan mordet, "+cardInMotive(2,Victim)+" sa något om 'Extra kul' ikväll. Inte helt säker på vad det betydde...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Du som ser så smart ut, säkert har du märkt något konstigt?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                        "...Jag antar att det var lite okänsligt. Om du nu måste veta något så kan jag väll berätta att "+cardInMotive(2,Victim)+" inte var speciellt schyst, han hade inte direkt hänsyn till andra i huset...",	//Svaret på frågan
                        [	//array med med CardDatas (som innehåller följdfrågor..)
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                            "ehm.. "+cardInMotive(2,Victim)+" plockade aldrig upp efter sig, tog heller inte någon hänsyn till vad andra ägde... En gång tog "+cardInMotive(2,Victim)+" .. hmm, glöm det, kommer inte på något bra exempel just nu..",	//Svaret på
                            [	//array med med CardDatas (som innehåller följdfrågor..)
                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                                "Det hela är rätt jobbigt, vi var nära i början men efter en viss tid så började jag förlora "+cardInMotive(2,Victim)+" s respekt och de senaste 3 åren känns helt enkelt som om vi inte har vart så nära som vi" +
                                " brukade... ",	//Svaret på frågan som ställdes
                                [	//array med med CardDatas (som innehåller följdfrågor..)

                                ],
                                "Det verkar som du inte gillade "+cardInMotive(2,Victim)+" så värst mycket?",	//Frågan som kortet ställer
                                null	//Null om det är ett personkort..
                                ),

                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,//Emotionstate:
                                "Jag är inte arg eller ledsen på honom, jag har svårt att hantera situationen. Jag försöker bara se hans dåliga sidor för att försöka underlätta läget för mig... ",	//Svaret på frågan
                                [	//array med med CardDatas (som innehåller följdfrågor..)

                                ],
                                "Men nu är "+cardInMotive(2,Victim)+" död, känner du verkligen såhär fortfarande?",	//Frågan som kortet ställer
                                null	//Null om det är ett personkort..
                                )
                            ],
                            "Jasså. Var det just mot dig? Kan du ge något exempel?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )

                        ],
                        "Tycker du verkligen att det här är ett bra läge att skoja? Eller försöker du dölja något?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                        )
                ],
                "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                "Jag är ledsen, men jag tror inte jag klarar av att prata om det här just nu...",//Svaret på frågan	 som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Happy,//Emotionstate:
                    "Tack så mycket, ska tänka på vad du frågade!",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Jag förstår, jag kan komma tillbaka senare..",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                    "Hmm, jag vet om jag har något spännande som jag kan berätta för dig...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Angry,//Emotionstate:
                        ""+cardInMotive(2,Victim)+" var en röv. Mer än så kan jag inte hjälpa dig med.",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Kanske kan du berätta vad du vet om "+cardInMotive(2,Victim)+" ? ",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    "Jag behöver svar nu...",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )


                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Angry,//Emotionstate:
                "mh, jag har ett förhållande med "+cardInMotive(2,Actor1)+". som jag redan har sagt, jag känner inte för att prata om det här nu.",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Happy,//Emotionstate:
                "Hemligheter? Jag älskar hemligheter... Hmm eftersom du är en detekiv och allt antar jag att jag kan berätta vad som helst... Jag vet att "+cardInMotive(2, Other)+" hade lånat pengar till "+cardInMotive(2,Victim)+", men å andra sidan så lånade "+cardInMotive(2,Victim)+" " +
                "pengar av många... "+cardInMotive(2,Victim)+" var inte så duktig på att betala tillbaka.",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                    "Jag bryr mig inte om pengar, dessutom så betalade han alltid tillbaka även om det tog några veckor extra...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Skulle det kunna vara så att du har något att göra med "+cardInMotive(2,Victim)+" s död? Om det var så att du lånade ut pengar till honom?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                    "Hmm, jag vet inte... kanske. "+cardInMotive(2,Victim)+" och jag har inte pratat på ett tag så jag antar att det här med skulden inte är så relevant...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                        "Förlåt, jag försökte bara hjälpa till...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Du borde inte slösa min tid om det inte var något du trodde var relevant.",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    "Vet du om det rörde sig om en stor summa?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )
                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                "Lämna mig ifred sa jag..",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.FreakedOut,//Emotionstate:
                "FINT! SKIT BRA! Jag pallar inte längre! JAG KLARAR INTE DET HÄR! Allt jag har gjort. Allt jag har gått igenom, bara för att få en ny chans... Men nu när jag vet att "+cardInMotive(2,Actor1)+" har tröttnat på mig så vet jag också att " +
                "hoppet är ute, jag trodde att jag skulle klara det här. ATT VI SKULLE KLARA DET!.. Ända sedan jag fick reda på att "+cardInMotive(2,Actor1)+" hade en affär med "+cardInMotive(2,Victim)+" så har jag.. har jag... försökt att lösa problemet. Men jag insåg inte att det inte var " +
                ""+cardInMotive(2,Victim)+" som var problemet, det var jag.... Jag vill inte leva mer, jag vill inte finnas, jag vill bara bort. "+cardInMotive(2,Victim)+" var min vän! Vi gjorde allt tillsamans... men efter det som hände så kunde jag inte se honom i ögonen. Jag gick flera" +
                "dagar och tänkte på hur jag kunde lösa problemet, lösningen var alltid där! DET VAR UPPENBART, "+cardInMotive(2,Victim)+" MÅSTE DÖ! HAHAHAHA! Förstår du inte?! Han var hindret, han var orsaken till att "+cardInMotive(2,Actor1)+" lämnade mig... Jag... bara anmäl mig.." +
                "okej?...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                "Jag är inte den som försöker ta reda på hemligheter, jag håller mig mest för mig själv... Jag har bara haft dåliga erfarenheter av att lägga näsan i blöt...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                    "Inget... Jag menar, det är väl något de flesta är medvetna om? heh..",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Vad skulle det vara för erfarenheter du pratar om?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )
                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Concerned,//Emotionstate:
                "Jag vet inte om jag kan hjälpa dig faktiskt... Prata med "+cardInMotive(2, Other)+" istället, jag är rätt säker på att du finner vad du letar efter där...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                    "jag vet inte riktigt, låt mig bara säga att vi inte har gått så bra ihop och om det är någon man vänder sig till om man vill veta skvaller så är det dit...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Vad får dig att tro det?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                )
            ]
            ),

            new GameEngine.Classes.GameCard(
            3,	//ID,
            GameEngine.Enums.GameCardType.other, //Type : (secret, other, intress, relation)
             "",	//Frågan som ska ställas
            null,	//Är null om detta är ett personkort
            [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
            null, 	//Null om det är ett personkort
            [	//Array med CardDatas..


                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Annoyed,	//Emotionstate:
                "ehm, Jag vet inte riktigt vad du vill att jag ska säga. Det är fint väder?...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                "Det känns som stämningen har blivit bättre sedan "+cardInMotive(3,Victim)+" dog, men jag vet inte om det bara är jag!",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Sad,	//Emotionstate:
                "Det känns som om allt bara blir värre och värre, jag kan sluta tänka på alla minnen med "+cardInMotive(3,Victim)+". Jag behöver spela tvspel...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                    "Tvspel är 75% av mitt liv, de övriga 25% är datorspel! ",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Gillar du tvspel?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )
                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.FreakedOut,	//Emotionstate:
                "*sjunger/Nynnar* Row, row, row your boat,Gently down the stream. Merrily, merrily, merrily, merrily, Life is but a dream.",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                "Det är hemskt det här som hände VICTIM...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Nervous,	//Emotionstate:
                "Jag vet inte riktigt vad jag ska säga, allt känns lite jobbigt just nu...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Angry,	//Emotionstate:
                "Ughh. Jag var på toaletten och det är någon som inte gjort rent efter sig... Känns som denna dag bara blir värre och värre...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                "Jag letade efter medecin för min huvudvärk men jag hittade ingen...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                )
            ]
            ),

            new GameEngine.Classes.GameCard(
            4,	//ID,
            GameEngine.Enums.GameCardType.Intress,	//Type : (secret, other, intress, relation)
            "",	//Frågan som ska ställas
            null,	//Är null om detta är ett personkort
            [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
            null, 	//Null om det är ett personkort
            [	//Array med CardDatas..

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Annoyed,	//Emotionstate:
                "vad jag gör på min fritid.. Hmm jag brukar sitta vid Facebook, spelar lite tvspel... inget speciellt faktiskt",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                    "på min fritid? Jag brukar spela tvspel, rita, laga mat. Allt möjligt! Och just det! Får inte glömma min älskade partner, vi brukar hitta på saker, eller ja vi börjar att göra det mer och mer!",	//Svaret på
                [	//array med med CardDatas (som innehåller följdfrågor..)

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Annoyed,	//Emotionstate:
                    "Nej då. Eller jo. Om du måste veta så har det vart stelt ett tag... Men jag har planerat att prata med "+cardInMotive(4,Actor1)+" ett tag nu, och jag har äntligen kommit fram till vad jag ska säga!",	//Svaret på frågan
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,	//Emotionstate:
                        "Bara att jag ska försöka att vara en bättre partner...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Vad ska du säga?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                        "ja.. det är synd, han var en nära vän. Han var nära "+cardInMotive(4,Actor1)+" också... så jag tror att jag har någon som kan behöva tröst...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Annoyed,	//Emotionstate:
                            "Vad menar du med det? Det var inget som försegick mellan dem... inget mer än vänskap...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Vet du hur nära dem var?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            ),

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Sad,	//Emotionstate:
                            "Ett tag, det var vi som flyttade in här från första början... Men efter att alla andra flyttade in så blev vi mer distanserade från varandra... känns rätt tråkigt, speciellt när det" +
                            "slutade såhär..",//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Hur länge hade du känt "+cardInMotive(4,Victim)+" ?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )
                        ],
                        "Det låter som om allt går bra för dig! Synd det här med "+cardInMotive(4,Victim)+", det kan inte vara speciellt lätt?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    "Vad menar du med att ni kommer börja göra det mer och mer? Är ni osams?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                    )
                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Sad,	//Emotionstate:
                "Jag vet inte riktigt... just nu vill jag bara se en film eller något...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.FreakedOut,	//Emotionstate:
                "Är du dum i huvudet... ?!.. ähh.. bara anmäl mig, OKEJ!!?!?...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                "Tvspel. Det är allt jag behöver för att känna att min dag har vart lyckad!",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                    "Kul att du frågar! Jag spelar allt möjligt, några favoriter är; Hitman, GTA, Manhunt är några av mina favoriter!",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,	//Emotionstate:
                        "äsch.. nej det gör jag inte... Men de är de senaste spelen som jag har spelat... Förresten så finns det inget som säger att man blir våldsam av spel, vad jag har läst så ska det vara " +
                        "motsatt effekt...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Nervous,	//Emotionstate:
                            "ehm... Nej men... Jag bara tänkte... Jag tänkte att om du intervjuar mig så kanske du tror jag är mördaren, så jag ville bara understryka att man inte mördar människor för att man " +
                            "spelar mycket tvspel...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)
                            ],
                            "Jag sa aldrig att man blir våldsam av spel...?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            ),

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                            "Hmm, jag har faktiskt inte tänkt på det. Jag tror inte att det är speciellt mycket då jag mest isolerar mig på mitt rum...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)
                            ],
                            "Hur tror du dina tvspels vanor påverkar andra i hushållet?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )

                        ],
                        "Spelar du bara våldsamma spel?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                        "Jag antar att det är för att jag inte riktigt vet hur jag ska agera med andra människor, jag gillar de spelet för jag får mycket frihet att göra vad jag vill. Utan konsekvenser. För mig är "+
                        "det ett effektivt sätt att uttrycka mig utan att behöva prata med någon annan, jag slipper dem och de slipper höra på mina problem...",//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Vad är det för speciellt med just de spelen? Varför är det dem du spelar?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    "Vad för typ av spel spelar du?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                    "ehmm, jag vet att jag inte är mycket att umgås med, jag brukar inte vara den som pratar eller syns mycket... Tvspel känns bra för mig, för det handlar bara om mig och de val som jag gör...",
                    //Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                        "Hm. Tack för tipset men jag tror att jag kan sköta mig själv...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Du kanske borde försöka umgås lite med andra?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Sad,	//Emotionstate:
                        "Jag vet inte, det känns bara som om jag inte längre har kontroll över mitt liv. På senaste känns det som om det enda jag har kontroll över är framstegen på mina spel...",//Svaret på frågan
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Vad är det för val du gör i dina spel som du känner inte handlar tillräckligt mycket om dig, utanför dina spel?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    "Känner du att du isolerar dig från andra människor och spelar tvspel istället?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                    )
                ],
                "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Nervous,	//Emotionstate:
                "... Inget speciellt...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                    "hmm, tvspel antar jag...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Det finns väl något du sysslar med?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Annoyed,	//Emotionstate:
                    "ehhm, jag kunde tänka mig att de andra kanske tyckte det... vem var det som sa det?",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Sad,	//Emotionstate:
                        "ouch...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "det var "+cardInMotive(4,Actor1)+"",	//Frågan som kortet ställer
                        null //Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,	//Emotionstate:
                        "Hmm, äsch jag vet att vissa tycker det... försöker inte låta det störa mig.. Mhh ska nog spela tvspel, hoppas du pratat klart snart...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "minns inte",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )

                    ],
                    "Jag har hört att du är lite av en enstöring?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )

                ],
                 "",	//Frågan som kortet ställer
                null //Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Angry,	//Emotionstate:
                "Tvspel. ",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                "Ibland så ligger jag ner i min säng och kollar in i väggen tills jag somnar... Annars tvspel...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                 "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                )
            ]
            ),

            new GameEngine.Classes.GameCard(
            6,	//ID,
            GameEngine.Enums.GameCardType.Relationship,//Type : (secret, other, intress, relation)
           "",	//Frågan som kortet ställer 	//Frågan som ska ställas
            null,	//Är null om detta är ett personkort
            [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
            null, 	//Null om det är ett personkort
            [	//Array med CardDatas..

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                "Hmm. EFtersom du frågar kan jag väll berätta att jag har en partner; "+cardInMotive(6, Murderer)+"... ",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                    "Lite mindre än 2 år. Vi träffades...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Hur länge har ni känt varandra?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                    "Det finns inte riktigt mycket att säga, för det mesta är "+cardInMotive(6, Murderer)+" själv. Sitter inlåst i antingen tvrummet eller sitt eget rum...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Kan du berätta något om "+cardInMotive(6, Murderer)+"",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )
                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                "Hmm, relationer... Jag har vart ihop med "+cardInMotive(6, Murderer)+" i 3 år... varför är det viktigt?",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                    "Känns verkligen inte som om jag behöver svara på det...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Angry,//Emotionstate:
                        "Visst!... Allt är strålande, allt går fram och det finns inte ett enda fel på vår relation som har med mig att göra...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                            "Det var inte så jag menade... Det är jobbigt att prata om... "+cardInMotive(6, Murderer)+" har blivit mer disträ på senare tid, det känns som om vårt förhållande har blivit mindre viktigt... Jag känner att jag " +
                            "behöver någon som lyssnar på mig, som ger mig uppmärksamhet och den respekt jag förtjänar...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)
                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                                "... Jag hade redan hittat den...",	//Svaret på frågan som ställdes
                                [	//array med med CardDatas (som innehåller följdfrågor..)
                                    new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                                    "... Ja... snälla, lämna mig ifred nu... Jag måste tänka över valen jag gjort den senaste tiden...",	//Svaret på frågan som ställdes
                                    [	//array med med CardDatas (som innehåller följdfrågor..)

                                    ],
                                    "Menar du "+cardInMotive(6, Murderer)+"?",	//Frågan som kortet ställer
                                    null	//Null om det är ett personkort..
                                    ),

                                    new GameEngine.Classes.CardData(
                                        GameEngine.Enums.EmotionState.FreakedOut,//Emotionstate:
                                        "VICIM!*Snyft* Jag vet inte, men jag har aldrig känt att jag har kunnat 'connectat' med någon som "+cardInMotive(6,Victim)+" förut... Om det fanns någon jag kunde vända mig till så fanns alltid"+
                                    ""+cardInMotive(6,Victim)+" där för mig, jag kunde berätta saker som jag inte ens kunde berätta för "+cardInMotive(6, Murderer)+"...",	//Svaret på frågan som ställdes
                                    [	//array med med CardDatas (som innehåller följdfrågor..)
                                        new GameEngine.Classes.CardData(
                                        GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                                        "Va?.. Nej.. Nej! Jag vet inte vad det är som har hänt.. jag vet inte hur det hände, jag vet bara att nu har jag ingen att söka tröst hos... Jag har inte någon....",
//Svaret på frågan som ställdes
                                        [	//array med med CardDatas (som innehåller följdfrågor..)

                                        ],
                                        "Har du något att göra med "+cardInMotive(6,Victim)+" s död?",	//Frågan som kortet ställer
                                        null	//Null om det är ett personkort..
                                        ),

                                        new GameEngine.Classes.CardData(
                                        GameEngine.Enums.EmotionState.FreakedOut,//Emotionstate:
                                        "Haha. Ja.. jag tror jag var det, men jag fick inte chansen att säga något. Vi hade sex nån gång... flera faktiskt... Men jag antar att jag aldrig riktigt berättade" +
                                        "för "+cardInMotive(6,Victim)+" hur jag faktiskt kände...",	//Svaret på frågan som ställdes
                                        [	//array med med CardDatas (som innehåller följdfrågor..)

                                        ],
                                        "Var du kär i "+cardInMotive(6,Victim)+"?",	//Frågan som kortet ställer
                                        null	//Null om det är ett personkort..
                                        )

                                    ],
                                    "Vem?",	//Frågan som kortet ställer
                                    null	//Null om det är ett personkort..
                                    )
                                ],
                                "Var tror du att du kan hitta en människa som uppfyller dina krav?",	//Frågan som kortet ställer
                                null	//Null om det är ett personkort..
                                ),

                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,//Emotionstate:
                                "Du har rätt! Om inte "+cardInMotive(6, Murderer)+" gör något åt saken så får jag väll göra det!",	//Svaret på frågan som ställdes
                                [	//array med med CardDatas (som innehåller följdfrågor..)

                                ],
                                "Jag förstår att det är jobbigt, Kanske om du bara pratar med "+cardInMotive(6, Murderer)+" så kommer allt ordna sig?",	//Frågan som kortet ställer
                                null	//Null om det är ett personkort..
                                )

                            ],
                            "Vad menar du med 'ett enda fel på vår relation som inte har med MIG att göra', menar du att det finns något som är problematiskt i erat förhållande?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )

                        ],
                        "Svara på frågan",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                        "Hm. Jag förstår... På senaste tiden har vi inte pratat med varandra, "+cardInMotive(6, Murderer)+" sitter mest klistrad framför sina tvspel...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Jag förstår att frågan kan uppfattas snokande. Men jag försäkrar er om att jag enbart frågar för att komma närmare sanningen om vem som är den skyldige...",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    "Bara en standard fråga. Hur har ert förhållande vart den senaste tiden?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                    "På senare tid har "+cardInMotive(6, Murderer)+" blivit mer ensam av sig, det är inte samma person som jag började dejta...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                        "Nej. Men "+cardInMotive(6, Murderer)+" har blivit mer egen, lite av sitt eget fel att vi inte längre pratar som vi brukade. Sitter bara på sitt rum och spelar tvspel...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                            "Jag vet inte, det är inte som om jag bryr mig. De gånger vi försökt spela tvspel så har det bara handlat om "+cardInMotive(6, Murderer)+", jag förstår inte poängen av att vara i närheten, det känns som om jag" +
                            "inte ens är där...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Vad för typ av tvspel spelar han?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            ),

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,//Emotionstate:
                            "Om det är fallet så behöver "+cardInMotive(6, Murderer)+" bli bättre på att berätta vad han tänker och känner...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Du tror inte att du kan ha något med att "+cardInMotive(6, Murderer)+" är så isolerad av sig?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )

                        ],
                        "Säger du att du har tröttnat på "+cardInMotive(6, Murderer)+"?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                        "Nej... Det tror jag verkligen inte! Jag vet inte vad som skulle kunnat trigga det beteendet...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,//Emotionstate:
                            "Jag vet att de var väldigt nära varandra när de flyttade in. De var faktiskt de 2 första som flyttade in i det här huset...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Kan du berätta om "+cardInMotive(6,Victim)+" och "+cardInMotive(6, Murderer)+" s förhållande?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            ),

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                            "Va?! Nej...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Du ser nervös ut, är det något som du inte berättar?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )
                        ],
                        "Tror du att "+cardInMotive(6, Murderer)+" skulle kunna vara den som har begått mordet?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    ""+cardInMotive(6, Murderer)+" verkar inte direkt vara den person man hänger kvar vid i 3 år?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                    )
                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Angry,//Emotionstate:
                "*Suck*. Lämna mig ifred, jag har inte tålamod med dig nu.",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                    "Nej, fråga vad du vill. Men gör det snabbt, jag vill helst inte behöva tillbringa mer tid med dig än nödvändigt...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                        "mh. Vi var kompisar, inget mer... "+cardInMotive(6,Victim)+" lyssnade alltid på mig när jag var nere...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "vad var ditt förhållande med mordoffret, "+cardInMotive(6,Victim)+" ? ",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )

                    ],
                    "Varför inte? Döljer du något?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                    "Det är klart att jag vill veta vem som är bakom det här! Jag vill att han ska få sitt straff så jag kan gå vidare med mitt liv... ",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                        "... "+cardInMotive(6,Victim)+" var en av mina bästa vänner... Jag har aldrig känt såhär förut....",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Hur nära var du "+cardInMotive(6,Victim)+"?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.FreakedOut,//Emotionstate:
                        "...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Du borde tänka över vems tids du slösar nästa gång du bestämmer dig för att slösa någons tid. Jag känner mig klar med dig nu...",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    "En rumskompis till dig har nyss dött, hur kommer det sig att du inte kan ge mig 5 minuter av din tid om det gör att vi kan hitta den skyldige?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )
                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Happy,//Emotionstate:
                "Åh.. hehe! Jag har vart tillsammans med "+cardInMotive(6, Murderer)+" i ungefär 2 år nu. Känns som saker äntligen kommer bli bra, "+cardInMotive(6, Murderer)+" har till och med pratat med mig idag :)",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                    "Jag antar att vi inte vart så nära den senare tiden...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "'...har till och med pratat med mig idag ...', Det låter lite konstigt? Känns som att 'prata' inte är en så ovanlig sak att göra när man väl har vart ihop i 2 år...",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Concerned,//Emotionstate:
                    "Hmm, har inte riktigt tänkt på det...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Varför tror du att "+cardInMotive(6, Murderer)+" har börjat prata med dig nu om det var ovanligt innan?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )
                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                "Jag känner inte för att prata just nu... Det är ett känsligt ämne...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
               "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.FreakedOut,//Emotionstate:
                "... ",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                "Ehm, jo... Jag har ett riktigt förhållande och.. Jag menar... Jag är tillsammans med "+cardInMotive(6, Murderer)+"",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                    "Jag menar... ett riktigt bra föhållande! Såklart. inget annat... Vad annars skulle det vara, menar jag? ",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                        "... Jag har många kompisar, det var det jag menade... Att... att jag känner många som jag har många förhållanden med!...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                            "Heh! HEHE!! nej då! Jag måste gå nu! Har saker att göra!...",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Det låter som du ljuger... Försöker du dölja någonting?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )

                        ],
                        "Du kanske försa dig. Menade du kanske att du har mer än ett förhållande?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                        "... Nej... Jag måste gå nu...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Du beter dig lite misstänktsamt... Kanske försöker du dölja något?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )

                    ],
                    "Vad menar du med 'Riktigt förhållande'?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                    "Hmm, snart 2 år tror jag.. ",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Jag förstår, hur länge har ni vart tillsamans?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Concerned,//Emotionstate:
                "joo.. jag och "+cardInMotive(6,Victim)+" var rätt nära varandra... Vi brukade alltid prata om sådant jag inte kunde prata med min partner "+cardInMotive(6, Murderer)+" om...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                    "Visst... Vi hade inte speciellt mycket gemensamt. Att vi träffades är egentligen bara tack vare "+cardInMotive(6, Murderer)+", det var så vi blev introducerade till varandra...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Concerned,//Emotionstate:
                        "På senare tid verkar det som om dem blev mer och mer distanserade från varandra... Det är väl förståerligt... ",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                            "Oh.. Ehm.. Jag vet inte! Jag bara kände att... äsch... ",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)
                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                                "... Jag hade en affär med "+cardInMotive(6,Victim)+"... Jag är rätt säker på att "+cardInMotive(6, Murderer)+" inte vet någonting om det så jag ska försöka lappa ihop vårt förhållande så gott jag kan... jag ångrar allt men" +
                                " du måste förstå... "+cardInMotive(6, Murderer)+" fanns inte där för mig när "+cardInMotive(6,Victim)+" fanns...",	//Svaret på frågan som ställdes
                                [	//array med med CardDatas (som innehåller följdfrågor..)

                                    new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.FreakedOut,//Emotionstate:
                                    ".. Jag önskar att jag kunde... förklara mina känslor bättre... Hahhhhh..*snyft*",	//Svaret på frågan som ställdes
                                    [	//array med med CardDatas (som innehåller följdfrågor..)

                                    ],
                                    "Människor som dig gör mig sjuk...",	//Frågan som kortet ställer
                                    null	//Null om det är ett personkort..
                                    )
                                ],
                                "Du får ta och utveckla det där.",	//Frågan som kortet ställer
                                null	//Null om det är ett personkort..
                                ),

                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                                "Jag har fått för lite sömn... Du får ursäkta mig, jag ska nog gå nu...",	//Svaret på frågan som ställdes
                                [	//array med med CardDatas (som innehåller följdfrågor..)

                                ],
                                "Om det är något du döljer får du ta och säga det...",	//Frågan som kortet ställer
                                null	//Null om det är ett personkort..
                                )

                            ],
                            "Varför är det förståerligt?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )

                        ],
                        "Hur var förhållandet mellan "+cardInMotive(6, Murderer)+" och "+cardInMotive(6,Victim)+" ?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Concerned,//Emotionstate:
                        "Jag vet att andra tyckte att han kunde vara elak och självisk... Men för mig så var han inget av det...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                            "Mer än vad "+cardInMotive(6, Murderer)+" någonsin har vart... Jag tror inte jag vill prata mer..",	//Svaret på frågan som ställdes
                            [	//array med med CardDatas (som innehåller följdfrågor..)

                            ],
                            "Vad var "+cardInMotive(6,Victim)+" för dig?",	//Frågan som kortet ställer
                            null	//Null om det är ett personkort..
                            )

                        ],
                        "Vet du varför någon skulle vilja skada "+cardInMotive(6,Victim)+"?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )

                    ],
                    "Kan du berätta lite om "+cardInMotive(6,Victim)+".",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                    "",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                )

            ]
            ),

            new GameEngine.Classes.GameCard(
            7,	//ID,
            GameEngine.Enums.GameCardType.Secret,	//Type : (secret, other, intress, relation)
            "",	//Frågan som kortet ställer 	//Frågan som ska ställas
            null,	//Är null om detta är ett personkort
            [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
            null, 	//Null om det är ett personkort
            [	//Array med CardDatas..

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                "Nej... jag har inga hemligheter, inget som rör mordfallet i alla fall...",//Svaret på frågan	 som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Sad,//Emotionstate:
                "åhh.. Jag vet inte riktigt vad du skulle tänkas vilja veta...",//Svaret på frågan	 som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Happy,//Emotionstate:
                    "Visst! Vi var väldigt nära vänner... ",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Har du några kopplingar till "+cardInMotive(7,Victim)+" ?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                    "Nej...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Angry,//Emotionstate:
                        "",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    "Har du något att göra med "+cardInMotive(7,Victim)+" S död?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )


                ],
                "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Angry,//Emotionstate:
                "Ugh.. Lämna mig ifred...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Happy,//Emotionstate:
                "Jag vet att "+cardInMotive(7,Victim)+" inte kunde vara tyst om en enda sak... Han var väldigt pratglad och inte rädd för att skryta.",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                    "Det hoppas jag verkligen inte...",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "Har han berättat några av dina hemligheter?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    ),

                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,//Emotionstate:
                    "Vanligtvis var det saker som han tyckte var 'coola' eller lite elaka... Han var inte en elak person för det... ",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                        "hmm, vi var rätt nära så jag antar att vi lärde känna varandra bättre än några andra i huset...",	//Svaret på frågan som ställdes
                        [	//array med med CardDatas (som innehåller följdfrågor..)

                        ],
                        "Vad är det som får dig att tycka att han inte är elak?",	//Frågan som kortet ställer
                        null	//Null om det är ett personkort..
                        )
                    ],
                    "Vad för saker berättade han?",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )
                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Annoyed,//Emotionstate:
                "Hemligheter? Jag brukar inte vara den som skvallrar.. du kanske kan kolla med någon annan... fråga "+cardInMotive(7, Other)+" istället.",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.FreakedOut,//Emotionstate:
                "... Jag hade sex med "+cardInMotive(7,Victim)+", jag vet inte hur jag ska hantera det här... Han försvann innan jag hann berätta hur jag kände.",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Fråga n som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Nervous,//Emotionstate:
                "Det finns massa saker antar jag.. Men jag vet inte riktigt vad jag kan hjälpa till med... Jag vet att "+cardInMotive(7, Murderer)+" och "+cardInMotive(7, Other)+" bråkade för några dagar sedan, märkte aldrig att de blev kompisar..." +	//Svaret på frågan
                "som ställdes",
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Concerned,//Emotionstate:
                "Det är jobbigt det här som har hänt, Det enda jag vet är att "+cardInMotive(7, Murderer)+" och "+cardInMotive(7,Victim)+" bråkade för några dagar sedan...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
               "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                )
            ]
            ),

            new GameEngine.Classes.GameCard(
            8,	//ID,
            GameEngine.Enums.GameCardType.Other,	//Type : (secret, other, intress, relation)
            "",	//Frågan som kortet ställer 	//Frågan som ska ställas
            null,	//Är null om detta är ett personkort
            [],	//Array med ID'n som finns i detta motiv och krävs för att detta kort ska användas..
            null, 	//Null om det är ett personkort
            [	//Array med CardDatas..


                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Annoyed,	//Emotionstate:
                "Hmm, Det är fint väder.. antar jag...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                "Hmm, igår innan jag skulle gå och lägga mig så stannade min partner "+cardInMotive(7, Murderer)+" uppe sent, han sa att han skulle spela tvspel. Kanske vet han något?",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),
                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Sad,	//Emotionstate:
                "Det är hemskt det här som har hänt, har inte riktigt kunna tänka klart sedan jag fick reda på var som hänt", //Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Happy,	//Emotionstate:
                    "Det får mig att känna mig lugnare, jag ska försöka tänka på andra saker nu.",	//Svaret på frågan som ställdes
                    [	//array med med CardDatas (som innehåller följdfrågor..)

                    ],
                    "jag beklagar det som har hänt, jag kommer göra allt för att hitta den skyldige. ",	//Frågan som kortet ställer
                    null	//Null om det är ett personkort..
                    )
                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.FreakedOut,	//Emotionstate:
                "...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Neutral,	//Emotionstate:
                "Att vara med om att någon dör, det är inte kul. Speciellt inte när det är någon som är så nära...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Nervous,	//Emotionstate:
                "Jag tror jag ska gå och lägga mig, jag känner mig lite yr",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Angry,	//Emotionstate:
                "Allt prat om "+cardInMotive(8,Victim)+" gör mig så arg, jag vill inte tänka på det mer. Förstår du inte det?!",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                ),

                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Concerned,	//Emotionstate:
                "Kanske lite kaffe får mig på bättre humör...",	//Svaret på frågan som ställdes
                [	//array med med CardDatas (som innehåller följdfrågor..)

                ],
                "",	//Frågan som kortet ställer 	//Frågan som kortet ställer
                null	//Null om det är ett personkort..
                )
            ]
            ),
            //TODO: Kolla här








            //Detta mellanrum markerar att det blir ny struktur på koden...









            ///TODO: Kolla här
            new GameEngine.Classes.GameCard(
                9,
                GameEngine.Enums.GameCardType.Intress,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    "Hmm. På fritiden brukar jag spela fotboll, ibland andra sporter också!",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Concerned,
                        "Hmm, nej "+cardInMotive(9,Victim)+" var inte direkt den som uppskattade sport... Han var mer en nattuggla...",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Nervous,
                            "m.. Det skulle förklara oljudet jag hörde runt 03.30... Jag bara antog att det var ett av "+cardInMotive(9,Murderer)+"s tvspel... tyckte dock att det lät lite väl mycket...",
                            [

                            ],
                            "Eftersom ni först märkte dagen efter att "+cardInMotive(9,Victim)+" hade blivit mördad, så innebär det att han mest troligast dog under natten. Några kommntarer?",
                            null
                            ),
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,
                            "Hehe! Det är en rätt rolig.. eller ja.. inte så *fniss*. Låt mig bara säga att "+cardInMotive(9,Victim)+" och sitt sälskap inte är så tysta av sig...",
                            [
                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Annoyed,
                                "... De hade sex och de låter mycket.. okej?...",
                                [

                                ],
                                "Jag är inte säker på att jag förstår hur du menar?",
                                null
                                ),
                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                "Haha, ja det är vad jag säger... "+cardInMotive(9,Victim)+" var den typen som låg med allt och alla...",
                                [
                                    new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.Nervous,
                                    "ehm.. Nej... Jag vet inte mer än att det var flera personer...",
                                    [

                                    ],
                                    "Vet du vilka eller vem som "+cardInMotive(9,Victim)+" hade sex med?",
                                    null
                                    )
                                ],
                                "Säger du att "+cardInMotive(9,Victim)+" hade mycket samlag? ",
                                null
                                )

                            ],
                            "Hur kommer det sig att du vet att han var en nattugla? Var ni nära?",
                            null
                            )

                        ],
                        "Spelade du någon gång fotboll med "+cardInMotive(9,Victim)+ "?",
                        null
                        ),
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Happy,
                        "Allt möjligt! Så länge jag det rör sig om bollar så är det en sport jag gillar!",
                        [

                        ],
                        "Vilka andra sporter?",
                        null
                        )
                    ],
                    "",
                    null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                10,
                GameEngine.Enums.GameCardType.Other,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    "ughh, jag hittade en kniv i vardagsrummet. Ser ut som den vi använde till att skära kyckling med igår... Jag vet inte hur den har hamnat där men blodig var den.. usch...",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Concerned,
                        "Hmm, jag hittade den i soffan. Den måste ha ramlat ner igår efter att vi åt kyckling... Jag vet dock inte hur den kan ha hamnat där, vi var trots allt inte i vardagsrummet och lagade maten...",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.FreakedOut,
                            "AHHH!!! Att jag kunde vara så dum! Jag skulle ha gått till dig så fort jag hittade den... Att den låg i TV-soffan borde väll vara tillräckligt för att jag skulle fatta att något var fel...",
                            [

                            ],
                            "Under omständigheterna känns det som du borde ha insett att kniven du hittade kan vara mordvapnet?",
                            null
                            ),

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,
                            "Hmm.. Igår var det "+cardInMotive(10,Other)+ " som lagade mat... Men jag såg på hela tiden så jag är hundra procent säker på att den lade tillbakas...",
                            [

                            ],
                            "Har du någon aning om hur knvien kan ha hamnat där?",
                            null
                            )
                        ],
                        "Var exakt hittade du kniven?",
                        null
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.FreakedOut,
                        "AHHH!!! Att jag kunde vara så dum! Jag skulle ha gått till dig så fort jag hittade den... Att den låg i TV-soffan borde väll vara tillräckligt för att jag skulle fatta att något var fel...",
                        [

                        ],
                        "En kniv?"+cardInMotive(10,Victim)+ " blev dödat med en knviv. Tror du det finns möjligheter att du hittade mordvapnet? ",
                        null
                        )
                    ],
                    "",
                    null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                11,
                GameEngine.Enums.GameCardType.Relationship,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    ""+cardInMotive(11,Victim)+ " var en nära vänn till mig. Bråkade inte riktigt med någon, "+cardInMotive(11,Victim)+ " och "+cardInMotive(11,Murderer)+ " var de två första som flyttade in här!",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Jag flyttade in ungefär samtidigt som "+cardInMotive(11,Actor1)+ ".. Vi kände varandra sedan ett tag innan.",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,
                            "Visst!"+cardInMotive(11,Actor1)+" är schyst! "+cardInMotive(11,Actor1)+" har också en partner som bor i huset, "+cardInMotive(11,Murderer)+ " heter den! Heh! Verkar inte som om de har vart så glada på varandra den senaste tiden...",
                            [

                            ],
                            "Kan du berätta något om "+cardInMotive(11,Actor1)+ "?",
                            null
                            )
                        ],
                        "När flyttade du in här?",
                        null
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Visst! "+cardInMotive(11,Victim)+ " var en schyst person! Visst hade "+cardInMotive(11,Victim)+ " inte alltid hjärtat på rätt ställe... Jag har sett många personer blivit sårade av "+cardInMotive(11,Victim)+ "...",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,
                            ""+cardInMotive(11,Victim)+ " var en 'Player', inte riktigt den personen som ville sätta sig in i riktiga förhållanden...",
                            [

                            ],
                            "Hur sårade "+cardInMotive(11,Victim)+ " andra?",
                            null
                            )
                        ],
                        "Kan du berätta något om "+cardInMotive(11,Victim)+ "?",
                        null
                        )
                    ],
                    "",
                    null
                    )

                ]
            ),
            new GameEngine.Classes.GameCard(
                12,
                GameEngine.Enums.GameCardType.Secret,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    "Tsk, Tsk, Tsk. Hemligheter... Hmm Jag är inte riktigt den som har koll på hemligheter här, men vad vill du veta?",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Jag vet att det måste ha hänt någong gång under natten... Jag vet inte när, då jag vanligtvis sover rätt tungt. Du borde prata med "+cardInMotive(12,Murderer)+ ", oftast så stannar "+cardInMotive(11,Victim)+ " uppe länge på kvällarna och spelar tvspel.. ",
                        [

                        ],
                        "Vad vet du om mordet?",
                        null
                        ),
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Concerned,
                        "Jag har faktiskt inte en aning.. Jag menar "+cardInMotive(12,Victim)+ "  låg runt mycket, men jag tror ju inte att det är något som man skulle döda "+cardInMotive(12,Victim)+ "  över..",
                        [

                        ],
                        "varför skulle någon vilja döda "+cardInMotive(12,Victim)+ "?",
                        null
                        )

                    ],
                    "",
                    null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                13,
                GameEngine.Enums.GameCardType.Intress,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    "Hmm! På fritiden brukar jag spela pokémon tillsammans med "+cardInMotive(13,Murderer)+", jag brukar aldrig vinna när vi tävlar men det är roligt ändå!",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Happy,
                        "Visst! "+cardInMotive(13,Murderer)+" är en riktig spelnörd! "+cardInMotive(13,Murderer)+" har också en partner, men de verkar inte ha prata mycket längre... tror att "+cardInMotive(13,Murderer)+" tar det rätt hårt...",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Concerned,
                            "Vet inte riktigt vad jag kan berätta, "+cardInMotive(13,Actor1)+", alltså "+cardInMotive(13,Murderer)+"s partner var väldigt nära "+cardInMotive(13,Victim)+"... Tror att det är mest "+cardInMotive(13,Murderer)+"s fel då "+cardInMotive(13,Murderer)+" bara spelar tvspel..",
                            [

                            ],
                            "Kan du berätta något om "+cardInMotive(13,Murderer)+"s partner?",
                            null
                            ),

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,
                            "Hmm. Mest vanliga spel, GTA V är något av de nyare spelen han spelat...",
                            [

                            ],
                            "Vilka spel spelar han utöver pokémon?",
                            null
                            )
                        ],
                        "Kan du berätta något om "+cardInMotive(13,Murderer)+"?",
                        null
                        )
                    ],
                    "",
                    null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                14,
                GameEngine.Enums.GameCardType.Other,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Hörde inget ljud från "+cardInMotive(14,Murderer)+"s tvspel igår...",
                        [],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                15,
                GameEngine.Enums.GameCardType.Relationship,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    "Jag brukade umgås rätt mycket med "+cardInMotive(15,Victim)+"... Vi brukade vara ute och leta efter ligg tillsammans... Känns jobbigt nu när "+cardInMotive(15,Victim)+" dog..",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Sad,
                        "Ja det kan man säga... Vi pratade om allt...",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Sad,
                            "Hm. I vanliga fall inte men under omständigheterna antar jag att det är för det bästa... Han hade sex då och då med "+cardInMotive(15,Actor1)+", det var något som "+cardInMotive(15,Victim)+" var stolt över. Men tyvärr verkade det som om dem blev kära... ",
                            [

                            ],
                            "Kan du berätta några hemligheter ni pratade om?",
                            null
                            )
                        ],
                        "Så ni var alltså nära?",
                        null
                        )
                    ],
                    "",
                    null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                16,
                GameEngine.Enums.GameCardType.Secret,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Hmm, vet inte vad jag kan säga, "+cardInMotive(16,Victim)+" låg runt mycket... eller i alla fall sedan ett tag tillbaka. Vet inte vad det var som gjorde att "+cardInMotive(15,Victim)+" inte fortsatte dra hem människor...",
                        [],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                17,
                GameEngine.Enums.GameCardType.Intress,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    "Ibland så brukar jag och "+cardInMotive(17,Actor1)+" sminka oss... Det är roligt! Jag får höra allt möjligt skvaller...",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,
                        "hmm, Tydligen hade "+cardInMotive(17,Actor1)+" en crush på "+cardInMotive(17,Victim)+"... ",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Sad,
                            "... Det är bara att "+cardInMotive(17,Actor1)+" har ett förhållande med "+cardInMotive(17,Murderer)+".. jag tycker inte att man ska bete sig så...",
                            [],
                            "Gör det dig irriterad?",
                            null
                            ),

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,
                            "Haha! Nej, tycker bara att det inte är rätt att bete sig så..",
                            [],
                            "Är du kär i "+cardInMotive(17,Actor1)+" ?",
                            null
                            )
                        ],
                        "Kan du ge något exempel?",
                        null
                        )
                    ],
                    "",
                    null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                18,
                GameEngine.Enums.GameCardType.Other,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        ""+cardInMotive(18,Murderer)+" bara spelar tvspel hela tiden.. Jag tycker man borde visa lite mer respekt när en så nära vänn har dött... ",
                        [],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                19,
                GameEngine.Enums.GameCardType.Relationship,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "I början när jag flyttade brukade vi ha brädspelskvällar! Det var roligt... Det var alltid jag och "+cardInMotive(18,Actor1)+" mot "+cardInMotive(18,Murderer)+" och "+cardInMotive(18,Other)+"",
                        [],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                20,
                GameEngine.Enums.GameCardType.Secret,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Blääh. Jag kan tyvärr inte hjälpa dig just nu...",
                        [],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                21,
                GameEngine.Enums.GameCardType.Secret,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Hmm hemligheter? Du borde kolla med "+cardInMotive(21,Actor1)+", om det är någon som vet något om "+cardInMotive(21,Victim)+" så är det "+cardInMotive(21,Actor1)+"",
                        [],
                        "",
                        null
                    )
                ]
            ),

            new GameEngine.Classes.GameCard(
                22,
                GameEngine.Enums.GameCardType.Secret,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    "Jag vet att "+cardInMotive(22,Other)+" vänder ut och in på sina underkläder istället för att byta till ett rent par. Äckligt!",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,
                        "Låt oss säga att vi skulle vara intima med varandra med aldrig kom så långt av självklara anledningar...",
                        [

                        ],
                        "Hur vet du det?",
                        null
                        ),
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Angry,
                        "Vik hädan!",
                        [

                        ],
                        "Jag kan vara lite slarvig med att byta strumpor ibland...",
                        null
                        )
                    ],
                    "",
                    null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                23,
                GameEngine.Enums.GameCardType.Other,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Vem ska ta hand om VICTIMS katt nu när de har dött?",
                        [
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                "På riktigt? Nu känns livet lite lättare igen! "+cardInMotive(23,Victim)+" skulle ha gillat dej som person!",
                                [
                                    new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.Sad,
                                    "Självklart inte! Jag saknar "+cardInMotive(23,Victim)+" lika mycket som alla andra i huset!",
                                    [

                                    ],
                                    "Igen? Blev livet lättare när "+cardInMotive(23,Victim)+" dog också menar du?",
                                    null
                                    ),

                                    new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.Happy,
                                    "Absolut, de hade humor så det räckte och blev över!",
                                    [

                                    ],
                                    "Kul att höra. Jag är säker på att "+cardInMotive(23,Victim)+" var en bra människa också.",
                                    null
                                    )
                                ],
                                "Jag kan ta hand om katten.",
                                null
                            ),
                            new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Concerned,
                                    "Jag? Men jag är ju allergisk!",
                                [
                                    new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.FreakedOut,
                                        "Är du ur vettet, människa?! "+cardInMotive(23,Victim)+" var min vän! Om jag ville bli av med katten skulle jag väl döda den! Eller, jag menar... !! ",
                                    [

                                    ],
                                        "Hm... Kan det vara så att du ville få ut katten ur huset och hoppades att den skulle försvinna tillsammans med "+cardInMotive(23,Victim)+"?",
                                    null
                                    ),

                                    new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.Happy,
                                    "",
                                    [

                                    ],
                                        "",
                                    null
                                    )
                                ],
                                "Kan inte du ta hand om katten?",
                                null
                            )
                        ],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                24,
                GameEngine.Enums.GameCardType.Intress,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Jag och "+cardInMotive(24,Other)+" brukade ha filmkvällar tillsammans, men på senaste tiden är de antingen inte på humör eller stirrar rakt genom TV:n de få gångerna jag lyckas övertala dem.",
                        [

                        ],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                25,
                GameEngine.Enums.GameCardType.Intress,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    "Jag och "+cardInMotive(25,Victim)+"  var vänner. När jag inte kunde sova brukade de hålla mej sällskap i vardagsrummet där vi spelade kort",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Stress, poker, UNO.. ",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Nervous,
                            "Det hände, m-men det rörde sej aldrig om några stora summor... ",
                            [
                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Sad,
                                "Jag var skyldig "+cardInMotive(25,Victim)+" 50 kronor. Är jag misstänkt nu?",
                                [

                                ],
                                "Var du skyldig "+cardInMotive(25,Victim)+" pengar?",
                                null
                                ),
                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                "Om man inte satsar något så vinner man inget här i livet.",
                                [

                                ],
                                "Ni borde inte spela om pengar i er ålder",
                                null
                                )
                            ],
                            "Poker? Spelade ni nånsin om pengar?",
                            null
                            ),
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Annoyed,
                            "Hur är detta relevant för att hitta "+cardInMotive(25,Victim)+" mördare?... ",
                            [

                            ],
                            "Poker? Spelade ni nånsin om varandras kläder?",
                            null
                            )

                        ],
                        "Vad brukade ni spela?",
                        null
                        ),
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Happy,
                        "Det stämmer!",
                        [

                        ],
                        "VICTIM verkade som en bra vän",
                        null
                        )
                    ],
                    "",
                    null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                26,
                GameEngine.Enums.GameCardType.Secret,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                            "Jag har hört att "+cardInMotive(26,Other)+" blev tagen av polisen för narkotikabrott för nästan ett år sedan, men jag vet inte hur sant det är med alla rykten som sprids på det här stället...",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,
                            "Kanske...",
                            [
                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Happy,
                                "Hemligheter är hemligheter av en anledning. Oj, där försa jag mej! Jag antar att du kan vara säker på att det inte bara var ett påhittat rykte jag hörde, haha!",
                                [

                                ],
                                "Så "+cardInMotive(26,Other)+" sålde narkotika? Sålde han någonsin till någon i huset?",
                                null
                                )

                            ],
                            "Är det möjligt att ett sådant rykte kan ha fått "+cardInMotive(26,Victim)+" mördad?",
                            null
                            )

                        ],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                27,
                GameEngine.Enums.GameCardType.Other,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Stämningen i huset har blivit bättre utan "+cardInMotive(27,Victim)+"",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Annoyed,
                            "Inte direkt, men "+cardInMotive(27,Victim)+" hade en tendens att låna saker utan att fråga... och inte lämna tillbaka dem.",
                            [

                            ],
                            "Var "+cardInMotive(27,Victim)+" i bråk med någon",
                            null
                            ),
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Annoyed,
                            "Inte direkt, men "+cardInMotive(27,Victim)+" hade en tendens att låna saker utan att fråga... och inte lämna tillbaka dem.",
                            [
                                new GameEngine.Classes.CardData(
                                GameEngine.Enums.EmotionState.Annoyed,
                                "Jag hörde "+cardInMotive(27,Other)+" smälla i dörren och skrika 'GE FAN I MIN TANDBORSTE, KLEPTOMANJÄVEL!' en dag förra veckan. Det var tydligen inte första gången "+cardInMotive(27,Victim)+" hade lånat den utan att fråga.",
                                [


                                ],
                                " Finns det någon i huset som blev riktigt arg på "+cardInMotive(27,Victim)+" över detta?",
                                null
                                ),

                                new GameEngine.Classes.CardData(
                                    GameEngine.Enums.EmotionState.Concerned,
                                    "Nej, jag började låsa mitt rum när jag fick reda på det.... Jag antar att jag inte behöver göra det längre",
                                    [


                                    ],
                                    "Har "+cardInMotive(27,Victim)+" någonsin 'lånat' något värdefullt av dej?",
                                    null
                                )
                            ],
                            "Ogillade ni varandra?",
                            null
                            )

                        ],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                28,
                GameEngine.Enums.GameCardType.Intress,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                            "Jag och "+cardInMotive(28,Victim)+"  var med i samma baksetklubb när vi var små. Vi brukade ses på gården och spela lite då och då.",
                        [

                        ],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                29,
                GameEngine.Enums.GameCardType.Intress,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Jag och "+cardInMotive(29,Victim)+" umgicks inte ofta utanför basketplanen. Av vad jag har hört av de andra var "+cardInMotive(29,Victim)+" något av en kleptoman.",
                        [

                        ],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                30,
                GameEngine.Enums.GameCardType.Relationship,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                            "Jag och "+cardInMotive(30,Victim)+" umgicks inte ofta utanför basketplanen. Av vad jag har hört av de andra var "+cardInMotive(30,Victim)+" något av en kleptoman.",
                        [

                        ],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                31,
                GameEngine.Enums.GameCardType.Relationship,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                            "Synd att det regnar ute idag. "+cardInMotive(31,Victim)+" gillade regniga dagar.",
                        [

                        ],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                32,
                GameEngine.Enums.GameCardType.Secret,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Neutral,
                        "Visste du att Hitler letade efter den heliga gralen under andra världskriget? Han trodde den skulle ge honom evigt liv!",
                        [

                        ],
                        "",
                        null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
                33,
                GameEngine.Enums.GameCardType.Secret,
                "",
                "",
                [],
                null,
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    "Jag undrar vad jag ska ha på mej på "+cardInMotive(33,Victim)+"  begravning. Om jag ens är bjuden...",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Concerned,
                            "Men svart är ju sorgens färg...",
                        [
                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,
                            "Nej.",
                            [

                            ],
                            "Sörjer du inte "+cardInMotive(33,Victim)+" död?",
                            null
                            ),

                            new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Neutral,
                            "Kanske någon annans begravning.",
                            [

                            ],
                            "Svart passar väl på en begravning?",
                            null
                            )
                        ],
                        "Något svart kanske?",
                        null
                        ),
                        new GameEngine.Classes.CardData(
                            GameEngine.Enums.EmotionState.Happy,
                            "Haha! Det är faktiskt ingen dum ide!",
                            [

                            ],
                            "En partyhatt kanske?",
                            null
                        )
                    ],
                    "",
                    null
                    )
                ]
            ),
            new GameEngine.Classes.GameCard(
            34,
            GameEngine.Enums.GameCardType.Intress,
            "",
            "",
            [],
            null,
            [
                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Neutral,
                "Jag tror de andra tycker jag är lite konstigt för att jag intresserar mej för alkemi och svartkonster.",
                [

                ],
                "",
                null
                )
            ]
            ),
            new GameEngine.Classes.GameCard(
            35,
            GameEngine.Enums.GameCardType.Relationship,
            "",
            "",
            [],
            null,
            [
                new GameEngine.Classes.CardData(
                GameEngine.Enums.EmotionState.Neutral,
                ""+cardInMotive(35,Victim)+" var en jobbig jävel.",
                [
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Angry,
                    " På ALLA sätt! Det fanns inget med "+cardInMotive(35,Victim)+" jag INTE störde mej på",
                    [

                    ],
                    "På vilket sätt?",
                    null
                    ),
                    new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Annoyed,
                    "Jag vet inte, jag bryr mej inte om vad de andra tycker",
                    [
                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,
                        "Sorry, polarn, du har fel person. Aldrig att jag skulle lägga ner den tiden och energin på "+cardInMotive(35,Victim)+".",
                        [

                        ],
                        "Vad säger du om jag säger att jag misstänker dej som mördaren?",
                        null
                        ),

                        new GameEngine.Classes.CardData(
                        GameEngine.Enums.EmotionState.Annoyed,
                        "Vem skulle INTE vilja mörda "+cardInMotive(35,Victim)+"? Alla skulle vilja mörda "+cardInMotive(35,Victim)+"! Jag vet inte vem som skulle ta sej tid att faktiskt göra det dock.",
                        [

                        ],
                        "Vem misstänker du mördade "+cardInMotive(35,Victim)+"?",
                        null
                        )
                    ],
                    " Var det fler än du i huset som tyckte "+cardInMotive(35,Victim)+" var en jobbig person?",
                    null
                    )
                ],
                "",
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

        //Main Menu stuff
        //MainMenuBackground
        var MainMenuBackground = new Image();
        MainMenuBackground.src = "Data/Menu/MainMenuBackground.png";

        //StartGameButton
        var StartGameButton = new Image();
        StartGameButton.src = "Data/Menu/StartGameButton.png";

        //HowToPlayButton
        var HowToPlayButton = new Image();
        HowToPlayButton.src = "Data/Menu/HowToPlayButton.png";

        //WinScreen
        var WinScreen = new Image();
        WinScreen.src = "Data/Hudd/WinScreen.png";

        //DoneButton
        var DoneButton = new Image();
        DoneButton.src = "Data/Hudd/DoneButton.png";

        //InfoButton
        var InfoButton = new Image();
        InfoButton.src = "Data/Hudd/InfoButton.png";




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
            RestartGameButton   : RestartGameButton,
            MainMenuBackground  : MainMenuBackground,
            StartGameButton     : StartGameButton,
            HowToPlayButton     : HowToPlayButton,
            WinScreen           : WinScreen,
            DoneButton          : DoneButton,
            InfoButton          : InfoButton
        }
    }



}; // ctrl+Space = Förslag på vad man kan göra.!


		//var GameCardsCollectionData = [];
		//var h = new GameEngine.Classes.GameCard();
		//new GameEngine.Classes.GameCard()

		//var Motives = function(){
			//var newa = function(){};

		//}´ddd

/*Testdata som andvändes vid testerna..
//här kommer fejkledtådskorten...
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




///








Efter Pausen kommer Personkorten








///

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
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
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
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
 "Well, You seem trustworthy. I do know some stuff..",
 [
 new GameEngine.Classes.CardData(
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
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
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
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
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
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
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
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
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
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
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
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
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
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
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
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
 GameEngine.Enums.EmotionState.GameEngine.Enums.EmotionState.Happy,
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



*/