"use strict";
var ScreenSpec = { //object som hanterar Canvas storleken..
    SizeX : 1023, //800     //New 4092 * 0.25 = 1023
    SizeY : 723.25 + 150, //750 // New, anpassar efter storleken..
    gameFrameY : 723.25,  //New 2893 * 0.25 = 723.25 <- denna appliceras på GameFrameY då vi anpassar storleken efter A4 som bakgrunderna är ritade på
    CreateCanvas : function(){
        var Canvas = document.createElement("canvas");
        Canvas.width = ScreenSpec.SizeX;
        Canvas.height = ScreenSpec.SizeY;
        Canvas.id = "CanvasBody";
        var body = document.getElementsByTagName("body");
        body[0].appendChild(Canvas);
        //body.[0] för att GetElementsByTagName blir en lista.. finns bara en body, så 0!
    },
    BackgroundStandardSizeX : 4092, //Storleken på bakgrunds/rum-bilderna innan förminskning..
    BackgroundStandardSizeY : 2893
};

ScreenSpec.CreateCanvas(); //Skapar Canvasen..

    var Ctx = document.getElementById("CanvasBody").getContext("2d");

    //Denna Eventlistner känner av om man klickar på ett objekt och reagerar på den!
    Ctx.canvas.addEventListener('mousedown', function(event) {
        if(event.button == 0){


                var mX = event.clientX - Ctx.canvas.offsetLeft + scrollX;
                var mY = event.clientY - Ctx.canvas.offsetTop + scrollY;
                //Event.ClientX/Y tar reda på var på skärmen muspekaren klickas
                //Ctx.Canvas.OffsetLeft/Top tar bort området utanför canvasen (räknar bara klick innanför den..)
                // + scrollY/X gör så att Scrollens position inte spelar någon roll, om man har scrollat ner kan man
                //trycka på knappen utan att positionen blir konstig!
                //alert("X= "+ mX /ScreenSpec.SizeX +" || Y= " + mY/ScreenSpec.SizeY);

                //Nedan är en loggare som loggar nödvändig data för att ta reda på var jag ska ange för position gällande
                //ledtrådar och waypoints, den är kommenterad som standard men sätter på den när den behövs..
                console.log("X= "+ mX /ScreenSpec.SizeX +" || Y= " + mY/ScreenSpec.SizeY);
                console.log("X= "+ mX +" || Y= " + mY);

            if(GameObj.GameIsOn == true){
                var Button = GameEngine.GoToButtons.backButton;
                //Kontrollerar om bakåt knappen trycktes på..
                if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height ){
                    //alert(mX +" || " + mY);
                    GameEngine.Machines.clearRoomData();

                    //GameEngine.Actives.Player.TimePoints -= 2;
                    GameEngine.Machines.PlayersHuddUpdate(); //Uppdaterar Hudden..
                    GameEngine.GoToButtons.GuessMurderButtons = [];
                    GameEngine.Actives.IsDialogActive = false;
                    GameEngine.Actives.MurderToGuessOn = null;
                    GameEngine.Actives.BlippBoxIsActive = false;
                    GameEngine.Machines.BuildRoom(Button.RoomToGo);
                }

                //Kontrollerar om någon Waypoints Trycktes på
                var widthOfObj = ScreenSpec.BackgroundStandardSizeX / ScreenSpec.SizeX;
                var heighOfObj = ScreenSpec.BackgroundStandardSizeY / ScreenSpec.gameFrameY;
                for(var i =0; i < GameEngine.GoToButtons.WayPoints.length; i++){
                    Button = GameEngine.GoToButtons.WayPoints[i];
                    if(Button.SizeWidth != undefined || Button.SizeHeight != undefined){ //Om Placeholdern har en storlek, använd den
                        if(mX >= Button.PosX && mX < Button.PosX + (Button.SizeWidth ) &&
                            mY >= Button.PosY && mY < Button.PosY + (Button.SizeHeight )) {
                            GameEngine.Machines.clearRoomData();

                            GameEngine.Actives.Player.TimePoints -= 2;
                            GameEngine.Machines.PlayersHuddUpdate(); //Uppdaterar Hudden..
                            GameEngine.Machines.BuildRoom(Button.GameCardOrContent.GoToRoom);
                        }

                    }else {
                        if (mX >= Button.PosX && mX < Button.PosX + (Button.GameCardOrContent.image.width / widthOfObj) &&
                            mY >= Button.PosY && mY < Button.PosY + (Button.GameCardOrContent.image.height / heighOfObj)) {
                            GameEngine.Machines.clearRoomData();
                            GameEngine.Machines.BuildRoom(Button.GameCardOrContent.GoToRoom);

                            GameEngine.Actives.Player.TimePoints -= 2;
                            GameEngine.Machines.PlayersHuddUpdate(); //Uppdaterar Hudden..
                            return;
                        }
                    }
                }

                //Kontrollerar om någon Fram/bak-knapp trycks på..
                for(var i = 0; i < GameEngine.GoToButtons.prevOrNextButton.length; i++){
                    Button = GameEngine.GoToButtons.prevOrNextButton[i];
                    if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height){
                        Button.pageToGo();
                        return;
                    }
                }
                //kontrollerar om en dialogknapp trycks på
                for(var i = 0; i < GameEngine.GoToButtons.DialogButtonsActive.length; i++){
                    Button = GameEngine.GoToButtons.DialogButtonsActive[i];
                    if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height){

                        if(Button.GameCard == false){
                            GameEngine.Actives.Player.TimePoints += 5;
                        }

                        GameEngine.Actives.Player.TimePoints -= 5;// tar bort 5 TP varje gång du går vidare på en fråga..
                                                                  //obs, vissa frågor tar mer eller mindre dessa är :
                                                                  //"I have to go" = 0
                                                                  //"Flirt"         = 15
                                                                  //"Threathen"    = 15  <-- detta adderas senare.. (i LoadstandardQuestions..)
                        GameEngine.Machines.PlayersHuddUpdate();

                        //HÄR SKA JAG GÖRA NÅGOT!!
                        //BlippBoxIsActive : false ???? ska hamna i blippboxen när man går tillbaka från i have to go


                        if(GameEngine.Actives.GameOverIsActive == false){
                            //Detta är en säkerhetsspärr som förbjuder
                            //dialogrutan att lägga sig över gameoverrutan...
                            Button.AnswerToSend();
                        }

                        return;
                    }
                }
                // kontrollerar om en DialogDownorUp trycks på
                for(var i = 0; i < GameEngine.GoToButtons.DialogDownorUp.length; i++){
                    Button = GameEngine.GoToButtons.DialogDownorUp[i];
                    if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height){

                        Button.pageToGo();
                        return;
                    }
                }

                //kontrollerar om en Clue Trycks på..
                for(var i = 0; i < GameEngine.GoToButtons.ClueButtons.length; i++){
                    Button = GameEngine.GoToButtons.ClueButtons[i];

                    if(GameEngine.Actives.ClueButtonsOn == true){
                        if(Button != undefined){

                            var ButtonDataObj = GameEngine.Machines.getPlaceHolderInfoFromCardIDForCurrentRoom(Button.ID);

                            if(mX >= ButtonDataObj.PosX && mX < ButtonDataObj.PosX + ButtonDataObj.Width && mY >= ButtonDataObj.PosY && mY < ButtonDataObj.PosY + ButtonDataObj.Height){
                                //alert("Funktion ska anropas när denna trycks på! Id't På detta kort är " +Button.ID );

                                GameEngine.Actives.Player.TimePoints -= 5;
                                GameEngine.Machines.PlayersHuddUpdate(); //Uppdaterar Hudden..
                                GameEngine.Machines.createBlippBox(Button);
                                GameEngine.Actives.ClueButtonsOn = false;
                                return;

                            }
                        }
                    }


                }

                //kontrollerar om en karktärBlippBox Trycks på..
                for(var i = 0; i < GameEngine.GoToButtons.BlippButtons.length; i++){
                    Button = GameEngine.GoToButtons.BlippButtons[i];
                    if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height){

                        if(Button.ActorOfBox.role != GameEngine.Enums.Roles.victim){
                            GameEngine.Actives.Player.TimePoints -= 5;
                            GameEngine.Machines.PlayersHuddUpdate(); //Uppdaterar Hudden..
                            GameEngine.Machines.fillBackgroundGray(); // gör bakgrunden grå.
                            GameEngine.GoToButtons.BlippButtons = [];//innaktiverar BlippBoxKnappar..
                            GameEngine.GoToButtons.backButton = "";
                            GameEngine.Actives.BlippBoxIsActive = true;
                            GameEngine.Machines.SelectAnswerForActor(Button.ActorOfBox, Button.GameCard);
                            return;
                        }else{
                            console.log("You can't talk to the dead, silly..");
                        }


                    }
                }

                //Kontrollerar om en container trycks på ..
                var SizeObj;
                for(var i = 0; i  < GameEngine.GoToButtons.ContainerButton.length; i++){
                    Button = GameEngine.GoToButtons.ContainerButton[i];
                    if(GameEngine.Actives.ClueButtonsOn == true) {
                        if (mX >= Button.PosX && mX < Button.PosX + Button.SizeWidth && mY >= Button.PosY && mY < Button.PosY + Button.SizeHeight) {
                            SizeObj = GameEngine.Machines.buildContainerBoxForClue(Button.PosX, Button.PosY);
                            GameEngine.GoToButtons.ContainerButton[i] = ""; // nollställer knappen så att man inte kan trycka på den
                                                                            // när man väl tryckt på den en gång..
                            GameEngine.GoToButtons.backButton.RoomToGo = GameEngine.Actives.RoomThatIsActive.ID;
                            GameEngine.Actives.Player.TimePoints -= 10;
                            GameEngine.Machines.PlayersHuddUpdate(); //Uppdaterar Hudden..

                            if(GameEngine.Actives.GameOverIsActive == false){
                                //Detta är en säkerhetsspärr som förbjuder
                                //Contqainerrutan att lägga sig över gameoverrutan...
                                GameEngine.Machines.FillBoxWithClues(SizeObj.PosX, SizeObj.PosY, SizeObj.Width, SizeObj.Height, Button.GameCardOrContent.cardsOfContainer);
                            }


                            return;

                        }
                    }

                }

                //Denna funktion är för Clues i Contanrar > klickas på...
                for(var i = 0; i < GameEngine.GoToButtons.ContainerClueButtons.length; i++){
                    Button = GameEngine.GoToButtons.ContainerClueButtons[i];
                    if(GameEngine.Actives.ClueButtonsOn == true) {
                        if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {

                            GameEngine.Actives.Player.TimePoints -= 5;
                            GameEngine.Machines.PlayersHuddUpdate(); //Uppdaterar Hudden..
                            GameEngine.Machines.createBlippBox(Button.GameCard);
                            return;
                        }
                    }

                }

                //Kontrollerar om en GuessMurderButton trycks på  ..
                Button = GameEngine.GoToButtons.HuddButtons.GuessMurderButton;
                if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height){
                    if(GameEngine.Actives.IsDialogActive == false){
                        //funktionen i knappen går till att starta Boxen där man kan gissa mördare..
                        GameEngine.Actives.IsDialogActive = true;
                        GameEngine.Actives.ClueButtonsOn = false;
                        Button.pageToGo();// Öppnar funktionen (pageToGo är lite vilseledande..)
                    }
                    return;
                }

                //Kontrollerar om en ActorBox iGuessMurder Boxen trycks på ..
                for(var i = 0; i  < GameEngine.GoToButtons.GuessMurderButtons.length; i++){
                    Button = GameEngine.GoToButtons.GuessMurderButtons[i];
                    if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height){
                        if(Button.actor.role != GameEngine.Enums.Roles.victim){
                            GameEngine.Machines.SelectActor(Button.actor);
                            return;
                        }else{
                            console.log("You can't accuse the victim, silly...");
                        }

                    }

                }

                // Kontrollerar om ConfirmMurder trycks på
                Button = GameEngine.Actives.MurderToGuessOn;
                if(Button != null){
                    if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height){
                        GameEngine.Machines.isActorMurder(Button.actor);
                        return;

                    }
                }

                //Kontrollerar om en ActorInterviewButtons trycks på..
                for (var i = 0; i < GameEngine.GoToButtons.ActorInterviewButtons.length; i++) {
                    Button = GameEngine.GoToButtons.ActorInterviewButtons[i];
                    if(GameEngine.Actives.ClueButtonsOn == true) {
                        if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                            GameEngine.GoToButtons.ActorInterviewButtons = [];
                            GameEngine.Actives.ClueButtonsOn = false;
                            GameEngine.Machines.InterviewActor(Button.actor);
                            return;
                        }
                    }
                }

                //Kontrollerar om GameOvers ToMenuButton Trycks på..
                Button = GameEngine.GoToButtons.ToMenuButton;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {

                        Button.pageToGo();
                        return;

                    }

                }
                //Kontrollerar om GameOvers RestartGame Trycks på..
                Button = GameEngine.GoToButtons.RestartGameButton;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {

                        Button.pageToGo();
                        return;

                    }

                }
                //Kontrollerar om Info knappen Trycks på..
                var Button = GameEngine.GoToButtons.InfoButton;
                if (Button != null) {
                    if(GameEngine.Actives.IsDialogActive == false){
                        if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                            var backButton = GameEngine.GoToButtons.backButton;
                            GameEngine.GoToButtons.InfoButton = null;
                            GameEngine.Machines.clearRoomData();
                            GameEngine.Actives.ClueButtonsOn = false;
                            backButton.RoomToGo = GameEngine.Actives.RoomThatIsActive.ID;
                            GameEngine.GoToButtons.backButton = backButton;
                            GameEngine.Actives.IsDialogActive = true;
                            GameEngine.GoToButtons.BlippButtons = [];
                            GameEngine.GoToButtons.ActorInterviewButtons = [];
                            GameEngine.GoToButtons.ContainerClueButtons = [];
                            GameEngine.GoToButtons.DialogButtons = [];
                            GameEngine.GoToButtons.DialogDownorUp = [];
                            GameEngine.GoToButtons.DialogButtonsActive = [];
                            GameEngine.GoToButtons.prevOrNextButton = [];
                            GameEngine.GoToButtons.GuessMurderButtons = [];
                            Button.pageToGo();
                            return;

                        }
                    }


                }
                var Button = GameEngine.GoToButtons.DoneButton;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        GameEngine.GoToButtons.DoneButton = null;
                        GameEngine.Actives.IsDialogActive = false;
                        Button.pageToGo();
                        return;

                    }

                }
            }else{
                //Om inte GameObj.GameIsOn är true så är det menyn som är uppe
                //Här tar vi hand om meny knappar..
                var Button = GameObj.HowToPlayButton;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        Button.pageToGo();
                        return;

                    }

                }

                var Button = GameObj.StartGameButton;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        Button.pageToGo();
                        return;

                    }

                }


            }

        }
    });

    //Denna Eventlistner kollar vad som Hovras över och ser till att markera klickbara objekt med Cursor: Pointern!
    Ctx.canvas.addEventListener('mousemove', function(event) {
        if(event.button == 0) {
            var mX = event.clientX - Ctx.canvas.offsetLeft + scrollX;
            var mY = event.clientY - Ctx.canvas.offsetTop + scrollY;
            //alert(mX +" || " + mY);
            if(GameObj.GameIsOn == true) {
                var Button = GameEngine.GoToButtons.backButton;
                if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                    //alert(mX +" || " + mY);
                    document.body.style.cursor = "pointer";
                    return;

                } else {
                    document.body.style.cursor = "default";
                }

                var widthOfObj = ScreenSpec.BackgroundStandardSizeX / ScreenSpec.SizeX;
                var heighOfObj = ScreenSpec.BackgroundStandardSizeY / ScreenSpec.gameFrameY;
                for (var i = 0; i < GameEngine.GoToButtons.WayPoints.length; i++) {
                    Button = GameEngine.GoToButtons.WayPoints[i];
                    //                console.log(mX >= Button.PosX );
                    //                console.log(mX < Button.PosX + (Button.GameCardOrContent.image.width ));
                    //                console.log(mY >= Button.PosY);
                    //                console.log(mY < Button.PosY + (Button.GameCardOrContent.image.height ));
                    if (Button.SizeWidth != undefined || Button.SizeHeight != undefined) { //Om Placeholdern har en storlek, använd den
                        if (mX >= Button.PosX && mX < Button.PosX + (Button.SizeWidth ) &&
                            mY >= Button.PosY && mY < Button.PosY + (Button.SizeHeight )) {
                            document.body.style.cursor = "pointer";
                            GameEngine.Machines.showCurrentValueOfTimePoints(2);
                            return;

                        } else {
                            document.body.style.cursor = "default";

                        }

                    } else { // Om placeholdern inte har en storlek, använd bilden storlek..
                        if (mX >= Button.PosX && mX < Button.PosX + (Button.GameCardOrContent.image.width / widthOfObj) &&
                            mY >= Button.PosY && mY < Button.PosY + (Button.GameCardOrContent.image.height / heighOfObj)) {
                            GameEngine.Machines.showCurrentValueOfTimePoints(2);
                            document.body.style.cursor = "pointer";
                            return;

                        } else {
                            document.body.style.cursor = "default";

                        }
                    }

                }
                //hover om någon Fram/bak-knapp hovras på..
                for (var i = 0; i < GameEngine.GoToButtons.prevOrNextButton.length; i++) {
                    Button = GameEngine.GoToButtons.prevOrNextButton[i];
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        document.body.style.cursor = "pointer";
                        return;

                    } else {
                        document.body.style.cursor = "default";

                    }
                }

                //kontrollerar om en dialogknapp hovras på
                for (var i = 0; i < GameEngine.GoToButtons.DialogButtonsActive.length; i++) {
                    Button = GameEngine.GoToButtons.DialogButtonsActive[i];
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        document.body.style.cursor = "pointer";
                        return;

                    } else {
                        document.body.style.cursor = "default";

                    }
                }
                //ko
                // ntrollerar om en DialogDownorUp hovras på
                for (var i = 0; i < GameEngine.GoToButtons.DialogDownorUp.length; i++) {
                    Button = GameEngine.GoToButtons.DialogDownorUp[i];
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        document.body.style.cursor = "pointer";
                        return;

                    } else {
                        document.body.style.cursor = "default";

                    }
                }

                //kontrollerar om en Clue Hovras över..
                for (var i = 0; i < GameEngine.GoToButtons.ClueButtons.length; i++) {
                    Button = GameEngine.GoToButtons.ClueButtons[i];

                    if (GameEngine.Actives.ClueButtonsOn == true) {
                        if (Button != undefined) {

                            var ButtonDataObj = GameEngine.Machines.getPlaceHolderInfoFromCardIDForCurrentRoom(Button.ID);

                            if (mX >= ButtonDataObj.PosX && mX < ButtonDataObj.PosX + ButtonDataObj.Width && mY >= ButtonDataObj.PosY && mY < ButtonDataObj.PosY + ButtonDataObj.Height) {
                                document.body.style.cursor = "pointer";
                                GameEngine.Machines.showCurrentValueOfTimePoints(5);
                                return;

                            } else {
                                document.body.style.cursor = "default";
                                if(GameEngine.GoToButtons.HuddButtons.CostHasValue === true){
                                    GameEngine.Machines.showCurrentValueOfTimePoints();
                                    GameEngine.GoToButtons.HuddButtons.CostHasValue = false;
                                }

                            }
                        }
                    }

                }

                //Denna funktion är för Clues i Contanrar > hover...
                for (var i = 0; i < GameEngine.GoToButtons.ContainerClueButtons.length; i++) {
                    Button = GameEngine.GoToButtons.ContainerClueButtons[i];
                    if (GameEngine.Actives.ClueButtonsOn == true) {
                        if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                            document.body.style.cursor = "pointer";
                            GameEngine.Machines.showCurrentValueOfTimePoints(5);
                            return;

                        } else {
                            document.body.style.cursor = "default";
                            if(GameEngine.GoToButtons.HuddButtons.CostHasValue === true){
                                GameEngine.Machines.showCurrentValueOfTimePoints();
                                GameEngine.GoToButtons.HuddButtons.CostHasValue = false;
                            }

                        }
                    }


                }

                //kontrollerar om en BlippBox Hovras över..
                for (var i = 0; i < GameEngine.GoToButtons.BlippButtons.length; i++) {
                    Button = GameEngine.GoToButtons.BlippButtons[i];
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        if (Button.ActorOfBox.role != GameEngine.Enums.Roles.victim) {
                            document.body.style.cursor = "pointer";
                            GameEngine.Machines.showCurrentValueOfTimePoints(5);
                            return;
                        }


                    } else {
                        document.body.style.cursor = "default";
                        if(GameEngine.GoToButtons.HuddButtons.CostHasValue === true){
                            GameEngine.Machines.showCurrentValueOfTimePoints();
                            GameEngine.GoToButtons.HuddButtons.CostHasValue = false;
                        }

                    }
                }

                //Kontrollerar om en container hovras över ..
                for (var i = 0; i < GameEngine.GoToButtons.ContainerButton.length; i++) {
                    Button = GameEngine.GoToButtons.ContainerButton[i];
                    if (mX >= Button.PosX && mX < Button.PosX + Button.SizeWidth && mY >= Button.PosY && mY < Button.PosY + Button.SizeHeight) {
                        document.body.style.cursor = "pointer";
                        GameEngine.Machines.showCurrentValueOfTimePoints(10, "OBS! Container!");
                        return;

                    } else {
                        document.body.style.cursor = "default";
                        if(GameEngine.GoToButtons.HuddButtons.CostHasValue === true){
                            GameEngine.Machines.showCurrentValueOfTimePoints();
                            GameEngine.GoToButtons.HuddButtons.CostHasValue = false;
                        }

                    }

                }

                //Kontrollerar om en GuessMurderButton hovras över ..
                Button = GameEngine.GoToButtons.HuddButtons.GuessMurderButton;
                if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                    if (GameEngine.Actives.IsDialogActive == false) {

                        document.body.style.cursor = "pointer";
                    }
                    return;

                } else {
                    document.body.style.cursor = "default";

                }

                //Kontrollerar om en ActorBox hovras över ..
                for (var i = 0; i < GameEngine.GoToButtons.GuessMurderButtons.length; i++) {
                    Button = GameEngine.GoToButtons.GuessMurderButtons[i];
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        if (Button.actor.role != GameEngine.Enums.Roles.victim) {
                            document.body.style.cursor = "pointer";
                        }
                        return;

                    } else {
                        document.body.style.cursor = "default";

                    }

                }

                //Kontrollerar om en ConfimMurderButton hovras över ..
                Button = GameEngine.Actives.MurderToGuessOn;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        document.body.style.cursor = "pointer";
                        return;

                    } else {
                        document.body.style.cursor = "default";

                    }

                }

                //Kontrollerar om en ActorInterviewButtons hovras över ..
                for (var i = 0; i < GameEngine.GoToButtons.ActorInterviewButtons.length; i++) {
                    Button = GameEngine.GoToButtons.ActorInterviewButtons[i];
                    if (GameEngine.Actives.ClueButtonsOn == true) {
                        if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                            document.body.style.cursor = "pointer";
                            return;

                        } else {
                            document.body.style.cursor = "default";
                        }
                    }
                }

                //Kontrollerar om GameOvers ToMenuButton hovras över ..
                Button = GameEngine.GoToButtons.ToMenuButton;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        document.body.style.cursor = "pointer";
                        return;

                    } else {
                        document.body.style.cursor = "default";

                    }

                }
                //Kontrollerar om GameOvers RestartGameButton hovras över ..
                Button = GameEngine.GoToButtons.RestartGameButton;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        document.body.style.cursor = "pointer";
                        return;

                    } else {
                        document.body.style.cursor = "default";

                    }

                }
                //Kontrollerar om... info knappen hovras över
                var Button = GameEngine.GoToButtons.InfoButton;
                if (Button != null) {
                    if(GameEngine.Actives.IsDialogActive == false) {
                        if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                            document.body.style.cursor = "pointer";
                            return;

                        } else {
                            document.body.style.cursor = "default";

                        }
                    }

                }
                //Kontrollerar om Infoskämns done knapp tryvcks på..
                var Button = GameEngine.GoToButtons.DoneButton;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        document.body.style.cursor = "pointer";
                        return;

                    } else {
                        document.body.style.cursor = "default";

                    }

                }
            }else{
                //Om denna körs så kontrollerar man meny alternativ..
                var Button = GameObj.HowToPlayButton;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        document.body.style.cursor = "pointer";
                        return;

                    } else {
                        document.body.style.cursor = "default";

                    }

                }

                var Button = GameObj.StartGameButton;
                if (Button != null) {
                    if (mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height) {
                        document.body.style.cursor = "pointer";
                        return;

                    } else {
                        document.body.style.cursor = "default";

                    }

                }



            }
        }
    });

setInterval(function(){
    GameEngine.Machines.PlaceActorsInRoom();
},(1000*60)*5); // var 5e minut så ska acotrs byta rum..

var GameObj = {
    GameIsOn : false,
    StartGameButton : "",
    HowToPlayButton : "",
    CheckPointsForInit : {
        createPlayer        : false,
        ReadInRooms         : false,
        CreateActors        : false,
        SelectRandomMotive  : false,
        FindRolesAndSendToInitDataFunkcionOfGameData : false,
        UpdateActorCards    : false,
        placeClues          : false,
        PlaceActorsInRoom   : false,
        BuildRoom           : false
    }
};

var PrepareNewGameORMenu = function(PlayerWantsToPlayAgain){
    //New Game är en Bool som används för att antingen skicka en till menyn eller ett nytt spel.

    //detta är en cleanup, denna körs efter att ett sepl avslutas/stängts av
    GameEngine.GlobalRooms  =[];
    GameEngine.GlobalActors =[];
    GameEngine.GoToButtons = {
            backButton : "",
            WayPoints : [],
            ContainerButton : [],
            prevOrNextButton : [],
            DialogButtons : [],
            DialogButtonsActive : [],
            DialogDownorUp : [],
            ClueButtons : [],
            ContainerClueButtons : [],
            BlippButtons : [],
            HuddButtons : {
                GuessMurderButton : null,
                CostHasValue : false
            },
            GuessMurderButtons : [],
            ActorInterviewButtons : [],
            ToMenuButton : "",
            RestartGameButton : "",
            DoneButton : null,
            InfoButton : null
    };
    GameEngine.Actives = {
            RoomThatIsActive : "",
            MotiveThatIsActive : "",
            MurderMotiveArrNumber : null,
            ClueButtonsOn : true,
            Player : null,
            MurderToGuessOn : null,
            TimeSinceLastHover : Date.now(),
            IsDialogActive : false,
            actorInDialog : null,
            GameOverIsActive : false,
            BlippBoxIsActive : false,
            ClueInterview : false,
            ActiveClue : null
    };
    GameEngine.DataPlaceHolder = [];
    GameEngine.BusyCards = {
        ClueCards : []
    };
    //rensar även saker från GameData
    GameData.GameCardsCollectionData = [];
    GameData.MurderMotives = [];

    if(PlayerWantsToPlayAgain == true){

        //här ska vi kasta in en animation som demonstrear att det laddas..
        var interval = 0;
        var counter = 0;
        Ctx.fillStyle = "rgb(63, 0, 0)";
        var Load = setInterval(function(){
            counter++;
            Ctx.fillRect(
                0,
                ScreenSpec.SizeY/2,
                (ScreenSpec.SizeX/16)*counter,
                ScreenSpec.SizeY/16
            );
            if(counter === 16){
                clearInterval(Load);
            }

        },250);



        //Eftersom all annan data försvinner så måste vi köra igång spelet i denna metod också, då denna
        //metod bara används av restartknappen och starta nytt spel knappen så gör detta ingenting!
        GameData.initData(); //Läser in Kort/Bild-data
        GameEngine.init();

    }
    else if(PlayerWantsToPlayAgain == false){
        GameObj.GameIsOn = false;
        MenuBuildFunction();
    }

};

var MenuBuildFunction = function(){
    Ctx.drawImage(
        GameData.GameDataImages.MainMenuBackground,
        0,
        0,
        ScreenSpec.SizeX,
        ScreenSpec.SizeY
    );

    var StartGameButton = new GameEngine.Classes.NextOrPreviousButton(
        (ScreenSpec.SizeX / 16),
        (ScreenSpec.SizeY / 3),
        (ScreenSpec.SizeX / 3),
        (ScreenSpec.SizeY / 12),
        GameData.GameDataImages.StartGameButton,
        function(){
            //GameEngine.init();
            PrepareNewGameORMenu(true);
            return;
        }
    );
    GameObj.StartGameButton = StartGameButton;

    var HowToPlayButton = new GameEngine.Classes.NextOrPreviousButton(
        (ScreenSpec.SizeX / 16),
        (ScreenSpec.SizeY / 3)+(ScreenSpec.SizeY / 6),
        (ScreenSpec.SizeX / 3),
        (ScreenSpec.SizeY / 12),
        GameData.GameDataImages.HowToPlayButton,
        function(){

            return;
        }
    );
    GameObj.HowToPlayButton = HowToPlayButton;

    Ctx.drawImage(
        StartGameButton.image,
        StartGameButton.PosX,
        StartGameButton.PosY,
        StartGameButton.Width,
        StartGameButton.Height
    );
    Ctx.drawImage(
        HowToPlayButton.image,
        HowToPlayButton.PosX,
        HowToPlayButton.PosY,
        HowToPlayButton.Width,
        HowToPlayButton.Height
    )


};

var GameEngine = {
    GlobalRooms : [],
	GlobalActors : [],
    GoToButtons : {
        backButton : "",
        WayPoints : [],
        ContainerButton : [],
        prevOrNextButton : [],
        DialogButtons : [],
        DialogButtonsActive : [],
        DialogDownorUp : [],
        ClueButtons : [],
        ContainerClueButtons : [],
        BlippButtons : [],
        HuddButtons : {
            GuessMurderButton : null,
            CostHasValue : false
        },
        GuessMurderButtons : [],
        ActorInterviewButtons : [],
        ToMenuButton : "",
        RestartGameButton : "",
        DoneButton : null,
        InfoButton : null
    },
    Enums : {
        Roles : {
            "other"  : "other",
            "murder" : "murder",
            "victim" : "victim",
            "actor1" : "actor1",
            "actor2" : "actor2",
            "actor3" : "actor3",
            "actor4" : "actor4"

        },
        GameCardType : {
            "Secret" : "secret",
            "Other" : "other",
            "Intress" : "intress",
            "Relationship" : "relationship",
            "WallClue" : "wallclue",
            "TableClue" : "tableclue"
        },
        Room : {
            hallway1 : 1,
            hallway2 : 2,
            hallway3 : 3,
            prebedroom: 4,
            bedroom1 : 5,
            bedroom2 : 6,
            bedroom3 : 7,
            bedroom4 : 8,
            bedroom5 : 9,
            bedroom6 : 10,
            kitchen : 11,
            tvroom  : 12,
            BathRoom : 13
        },
        EmotionState : {
            Neutral     :"neutral",
            Annoyed     :"annoyed",
            Happy       :"happy",
            Sad         :"sad",
            FreakedOut  :"freakedout",
            Nervous     :"nervous",
            Angry       :"angry",
            Concerned   :"concerned"
        },
        ClueType : {
            WallClue    :"wallclue",
            TableClue   :"tableclue"
        }
    },
    BusyCards : {
        ClueCards : []
    },

    Actives : {
        RoomThatIsActive : "",
        MotiveThatIsActive : "",
        MurderMotiveArrNumber : null,
        ClueButtonsOn : true,
        Player : null,
        MurderToGuessOn : null,
        TimeSinceLastHover : Date.now(),
        IsDialogActive : false,
        actorInDialog : null,
        GameOverIsActive : false,
        BlippBoxIsActive : false,
        ClueInterview : false,
        ActiveClue : null
    },

    DataPlaceHolder : [],  //används för att lagra tillfällig data..
	
	init : function() {

        GameEngine.Machines.createPlayer();

        GameEngine.Machines.ReadInRooms();

        GameEngine.Machines.CreateActors();

        GameEngine.Machines.SelectRandomMotive();

        GameEngine.Machines.FindRolesAndSendToInitDataFunkcionOfGameData();

        //Uppdaterar korten som karaktärerna har, så de innehållar rätt data..
        //Detta pga datan har  modifierats till att anpassa mordmotivet..
        GameEngine.Machines.UpdateActorCards();

        GameEngine.Machines.placeClues();

        GameEngine.Machines.PlaceActorsInRoom();

        //Denna timeout löser att bilder inte laddas in ordetnligt..
        //TODO: få hjälp med att bilder inte läses in ordetnligt.. och måste använda en timeout..

        setTimeout(function(){
            GameEngine.Machines.BuildRoom(1);
            GameObj.GameIsOn = true;
        },4001);

        //AnimationsFunktion, till tex Hudden..
        //setInterval(GameEngine.Machines.PlayersHuddUpdate(),1000);

		
	},

	Machines : {

        LoadMotiveInfoScreen : function(){
            var Victim = GameEngine.Machines.getVictimName();
            Ctx.fillStyle = "rgb(0,0,0)";
            Ctx.fillRect(
                ScreenSpec.SizeX/12,
                ScreenSpec.SizeY/12,
                ScreenSpec.SizeX - (ScreenSpec.SizeX/12 * 2),
                ScreenSpec.SizeY - (ScreenSpec.SizeY/12 * 4)
            );
            Ctx.fillStyle = "rgb(250,0,0)";
            Ctx.fillText(
                "Name of victim: " + Victim.name,
                ScreenSpec.SizeX / 8,
                ScreenSpec.SizeY / 8,
                ScreenSpec.SizeX
            );
            Ctx.drawImage(
                Victim.image,
                ScreenSpec.SizeX / 8,
                (ScreenSpec.SizeY / 6),
                GameEngine.Machines.getPosition(0.2482893450635386,"x"),
                GameEngine.Machines.getPosition(0.4969939879759519,"y")
            );
            Ctx.fillStyle = "rgb(83, 83, 83)";
            Ctx.fillRect(
                (ScreenSpec.SizeX / 8)*3,
                (ScreenSpec.SizeY / 8),
                (ScreenSpec.SizeX / 2),
                (ScreenSpec.SizeY / 2)
            );
            Ctx.fillStyle = "rgb(0,0,0)";
            GameEngine.Machines.wrapText(
                Ctx,
                GameData.MurderMotives[GameEngine.Actives.MurderMotiveArrNumber].motiveDescription,
                (ScreenSpec.SizeX / 8)*3 +10,
                (ScreenSpec.SizeY / 8)+10,
                (ScreenSpec.SizeX / 2)-20,
                GameBubbleData.TextHeight,
                GameBubbleData.TextHeight,
                (ScreenSpec.SizeY / 2)-20
            );

            var BackToGame = new GameEngine.Classes.NextOrPreviousButton(
                (ScreenSpec.SizeX / 8)*3,
                (ScreenSpec.SizeY / 2)+(ScreenSpec.SizeY / 6),
                (ScreenSpec.SizeX / 4),
                (ScreenSpec.SizeY / 16),
                GameData.GameDataImages.DoneButton,
                function(){
                    //För att gå ut från denna skärm..
                    if(GameEngine.Actives.RoomThatIsActive == ""){
                        GameEngine.Machines.BuildRoom(1);
                    }else{
                        GameEngine.Machines.BuildRoom(GameEngine.Actives.RoomThatIsActive.ID);
                    }
                }
            );
            /*
            Ctx.drawImage(
                BackToGame.image,
                BackToGame.PosX,
                BackToGame.PosY,
                BackToGame.Width,
                BackToGame.Height
            );
            */
            GameEngine.Machines.fillHudGray(true,true,true);
            //GameEngine.GoToButtons.DoneButton = BackToGame;

        },

        getVictimName : function(){
            var VictimName = "";
            for(var i = 0; i < GameEngine.GlobalActors.length; i++){
                if(GameEngine.GlobalActors[i].role === GameEngine.Enums.Roles.victim){
                    VictimName = GameEngine.GlobalActors[i];
                }
            }
            return VictimName;
        },

        LoadGameOverScreen : function(){
            GameEngine.Machines.clearRoomData();
            GameEngine.Actives.ClueButtonsOn = false;
            GameEngine.GoToButtons.backButton = "";
            GameEngine.Actives.IsDialogActive = true;
            GameEngine.GoToButtons.BlippButtons = [];
            GameEngine.GoToButtons.ActorInterviewButtons = [];
            GameEngine.GoToButtons.ContainerClueButtons = [];
            GameEngine.GoToButtons.DialogButtons = [];
            GameEngine.GoToButtons.DialogDownorUp = [];
            GameEngine.GoToButtons.DialogButtonsActive = [];
            GameEngine.GoToButtons.prevOrNextButton = [];
            GameEngine.GoToButtons.GuessMurderButtons = [];
            Ctx.drawImage(
                GameData.GameDataImages.GameOverBackground,
                0,
                0,
                ScreenSpec.SizeX,
                ScreenSpec.SizeY
            );

            var ToMenuButton = new GameEngine.Classes.NextOrPreviousButton(
                (ScreenSpec.SizeX / 3) - 10 - ((ScreenSpec.SizeX / 4)/2),
                ScreenSpec.SizeY - (ScreenSpec.SizeY/4),
                ScreenSpec.SizeX / 4,
                ScreenSpec.SizeY/16,
                GameData.GameDataImages.ToMenuButton,
                function(){
                    //Funktion ska ladda  menyn!
                    GameData.GameDataImages.ToMenuButton = "";
                    PrepareNewGameORMenu(false);
                    return;
                }
            );
            GameEngine.GoToButtons.ToMenuButton = ToMenuButton;

            var RestartGameButton = new GameEngine.Classes.NextOrPreviousButton(
                ScreenSpec.SizeX -(ScreenSpec.SizeX / 3) + 10 - ((ScreenSpec.SizeX / 4)/2),
                ScreenSpec.SizeY - (ScreenSpec.SizeY/4),
                ScreenSpec.SizeX / 4,
                ScreenSpec.SizeY/16,
                GameData.GameDataImages.RestartGameButton,
                function(){
                    //Funktion ska ladda  menyn!
                    GameData.GameDataImages.RestartGameButton = "";
                    PrepareNewGameORMenu(true);
                    return;
                }
            );
            GameEngine.GoToButtons.RestartGameButton= RestartGameButton;

            Ctx.drawImage(
                ToMenuButton.image,
                ToMenuButton.PosX,
                ToMenuButton.PosY,
                ToMenuButton.Width,
                ToMenuButton.Height
            );
            Ctx.drawImage(
                RestartGameButton.image,
                RestartGameButton.PosX,
                RestartGameButton.PosY,
                RestartGameButton.Width,
                RestartGameButton.Height
            );

            GameEngine.Actives.GameOverIsActive = true;
            /*
            if(GameEngine.Actives.GameOverIsActive == false){
                GameEngine.Actives.GameOverIsActive = true;
                GameEngine.Machines.PlayersHuddUpdate();
            }
            */

        },

        UpdateActorCards : function(){
            GameObj.CheckPointsForInit.UpdateActorCards = false;
            for(var i = 0; i < GameEngine.GlobalActors.length; i++){

                GameEngine.GlobalActors[i].Intress = GameEngine.Machines.getGameCardFromID(GameEngine.GlobalActors[i].Intress.ID , "person");

                GameEngine.GlobalActors[i].Other = GameEngine.Machines.getGameCardFromID(GameEngine.GlobalActors[i].Other.ID , "person");

                GameEngine.GlobalActors[i].Relation = GameEngine.Machines.getGameCardFromID(GameEngine.GlobalActors[i].Relation.ID , "person");

                GameEngine.GlobalActors[i].Secret = GameEngine.Machines.getGameCardFromID(GameEngine.GlobalActors[i].Secret.ID , "person");

                for(var j = 0; j < GameEngine.GlobalActors[i].ClueList.length ; j++){
                    GameEngine.GlobalActors[i].ClueList[j] = GameEngine.Machines.getGameCardFromID(GameEngine.GlobalActors[i].ClueList[j].ID, "clue")
                }
            }
            GameObj.CheckPointsForInit.UpdateActorCards = true;
        },

        FindRolesAndSendToInitDataFunkcionOfGameData : function(){
            GameObj.CheckPointsForInit.FindRolesAndSendToInitDataFunkcionOfGameData = false;
            //Denna metod är till för att Uppdatera korten som karaktärerna har, så de innehållar rätt data
            //Sen måste man uppdatera korten som finns hos karaktärerna, det gör en annan funktion..

            var Murder, Victim, Actor1, Actor2, Actor3, Actor4, Motive;
            var ArrOfOthers = [];


            for(var i = 0 ; i < GameEngine.GlobalActors.length; i++){
                if(GameEngine.GlobalActors[i].role == GameEngine.Enums.Roles.victim){
                    Victim = GameEngine.GlobalActors[i].name;
                }
                if(GameEngine.GlobalActors[i].role == GameEngine.Enums.Roles.other){
                    ArrOfOthers.push(GameEngine.GlobalActors[i].name);
                }
                if(GameEngine.GlobalActors[i].role == GameEngine.Enums.Roles.murder){
                    Murder = GameEngine.GlobalActors[i].name;
                }
                if(GameEngine.GlobalActors[i].role == GameEngine.Enums.Roles.actor1){
                    Actor1 = GameEngine.GlobalActors[i].name;
                }
                if(GameEngine.GlobalActors[i].role == GameEngine.Enums.Roles.actor2){
                    Actor2 = GameEngine.GlobalActors[i].name;
                }
                if(GameEngine.GlobalActors[i].role == GameEngine.Enums.Roles.actor3){
                    Actor3 = GameEngine.GlobalActors[i].name;
                }
                if(GameEngine.GlobalActors[i].role == GameEngine.Enums.Roles.actor4){
                    Actor4 = GameEngine.GlobalActors[i].name;
                }

            };

            Motive = GameEngine.Actives.MotiveThatIsActive;
            //Eftersom vi ska instansiera all data på nytt så ska vi först tömma den gamla datan
            GameData.GameCardsCollectionData = [];
            GameData.initData(ArrOfOthers,Murder,Victim,Actor1,Actor2,Actor3,Actor4, Motive)
            GameObj.CheckPointsForInit.FindRolesAndSendToInitDataFunkcionOfGameData = true;
        },

        PlaceActorsInRoom : function(){
            GameObj.CheckPointsForInit.PlaceActorsInRoom = false;
            for(var i =0; i < GameEngine.GlobalActors.length; i++){
                if(GameEngine.GlobalActors[i].role != GameEngine.Enums.Roles.victim){
                    //Placerar ut alla karaktärer i rummen förutom den som är död.
                    GameEngine.GlobalActors[i].IsInThisRoom = GameEngine.GlobalRooms[Math.floor(Math.random() * GameEngine.GlobalRooms.length + 0)].ID;
                }

            }
            GameObj.CheckPointsForInit.PlaceActorsInRoom = true;
        },

        whoWasMurder : function(){
            for(var i = 0; i < GameEngine.GlobalActors.length; i++){
                if(GameEngine.GlobalActors[i].isMurder == true){
                    return GameEngine.GlobalActors[i].name;
                }
            }
        },

        CreateActorInRoomComponent : function(){
            //Vi tömmer den gamla datan först
            GameEngine.GoToButtons.ActorInterviewButtons = [];

            // Det första vi gör är att rita upp själva rutan som berättar om/vilka actor som
            // finns i rummet... Rutan måste rymma minst 6 karaktärer..
            var oldFillStyle = Ctx.fillStyle;
            var WidthOfBox = ScreenSpec.SizeX / 4;
            var PosXOfBox = ScreenSpec.SizeX - WidthOfBox;
            var HeightOfBox = (ScreenSpec.SizeY - ScreenSpec.gameFrameY)/2;
            var PosYOfBox = ScreenSpec.gameFrameY + HeightOfBox;

            //Ctx.fillStyle = "rgb(0, 102, 255)";
            Ctx.fillStyle = "rgb(64, 4, 0)";
            Ctx.fillRect(
                PosXOfBox,
                PosYOfBox,
                WidthOfBox,
                HeightOfBox
            );

            //Nu behöver vi ta reda på hur många Actors som finns i just detta rum
            var ActorsInThisRoom = [];
            for(var i= 0; i < GameEngine.GlobalActors.length; i++){
                if(GameEngine.GlobalActors[i].IsInThisRoom == GameEngine.Actives.RoomThatIsActive.ID){
                    ActorsInThisRoom.push(GameEngine.GlobalActors[i]);
                }
            };

            //Nu ska vi placera knappar för Actors som finns i rummet så att när man trycker
            //på dem så startas en dialog med den karaktären..
            var PosXToAdd = 2;
            for(var i = 0; i < ActorsInThisRoom.length; i++){

                GameEngine.Machines.WindowSizing(
                    ActorsInThisRoom[i].icon,
                    "hudd",
                    PosXOfBox + PosXToAdd,
                    PosYOfBox+25,
                    WidthOfBox /  6.5,
                    WidthOfBox /  6.5
                );

                var Button = new GameEngine.Classes.ActorBoxButton(
                        PosXOfBox + PosXToAdd,
                        PosYOfBox+25,
                        WidthOfBox / 7,
                        WidthOfBox /  6.5,
                        ActorsInThisRoom[i]
                );

                PosXToAdd += (WidthOfBox / 6.5) + 2;

                GameEngine.GoToButtons.ActorInterviewButtons.push(Button);

            }

            //vi ska sätta dit en text också så att man berättar för användaren att detta är karaktärerna i rummet
            //Ctx.fillStyle = "rgb(0, 0, 0)"; //"rgb(255, 60, 60)" OLD
            Ctx.fillStyle = "rgb(255, 255, 255)";
            Ctx.fillText(
                "Actors In Room",
                PosXOfBox + 2,
                PosYOfBox + GameBubbleData.TextHeight + 2
            );

            Ctx.fillStyle = oldFillStyle;
        },

        showCurrentValueOfTimePoints : function(value, string){

            //if(Date.now() > GameEngine.Actives.TimeSinceLastHover + 1200){
                GameEngine.Machines.PlayersHuddUpdate(value,string);
                //efter 2 sekunder så ska infon ha försvunnit..
                //setTimeout(function(){
               //    GameEngine.Machines.PlayersHuddUpdate();
               // },1000);
                //GameEngine.Actives.TimeSinceLastHover = Date.now();
            //}

            GameEngine.GoToButtons.HuddButtons.CostHasValue = true;


        },

        PlayersHuddUpdate : function(value, string){
            var oldFillStyle = Ctx.fillStyle;
            var StringLength = 0;
            if(string == undefined){
                string = "";
            }else{
                StringLength = Ctx.measureText(string).width;
            }

            //Ctx.fillStyle = "rgb(0, 235, 255)";
            Ctx.fillStyle = "rgb(133, 9, 0)";

            Ctx.fillRect(
                ScreenSpec.SizeX - (ScreenSpec.SizeX / 4),
                ScreenSpec.gameFrameY,
                ScreenSpec.SizeX / 4,
                (ScreenSpec.SizeY - ScreenSpec.gameFrameY) - (ScreenSpec.SizeY - ScreenSpec.gameFrameY)/2

            );

            Ctx.fillStyle = "rgb(255, 60, 60)";

            Ctx.font= GameBubbleData.TextHeight +"px arial, bold sans-serif";

            //Lägger denna sist pga kolliderade med "I have to go" knappen, hade man 5 eller mindre
            // poäng kvar när man använde knappen så hamna man på gameover...
            if(GameEngine.Actives.Player.TimePoints <= 0){
                //Denna sats är till för att kontrollera om Timepoints är 0 eller mindre
                //om det är fallet så har spelaren förlorat och en funktion som presenterar
                //gameover skärmen (med övrig data, som mördaren) ska anropas..
                GameEngine.Machines.LoadGameOverScreen();
                console.log("Murdurer was " + GameEngine.Machines.whoWasMurder());
                return;
            }
            //Skriver ut timepoints
            if(GameEngine.Actives.Player.TimePoints < 50){
                Ctx.font= GameBubbleData.TextHeight+ 10 +"px arial, Bold sans-serif";
            }
            Ctx.fillText(
                "TimePoints Left: "+ GameEngine.Actives.Player.TimePoints,
                ScreenSpec.SizeX - (ScreenSpec.SizeX / 4)+10,
                ScreenSpec.gameFrameY + GameBubbleData.TextHeight + 5,
                ScreenSpec.SizeX / 4
            );

            Ctx.font= GameBubbleData.TextHeight +"px arial, bold sans-serif";

            //Skriver ut rummet
            Ctx.fillText(
                "Current Room: "+ GameEngine.Actives.RoomThatIsActive.roomname,
                ScreenSpec.SizeX - (ScreenSpec.SizeX / 4)+10,
                ScreenSpec.gameFrameY + GameBubbleData.TextHeight * 2 + 10,
                    ScreenSpec.SizeX / 4
            );

            //Skriver ut värdet på det Hovrade objektet..
            if(value != undefined){
                //Ctx.fillStyle = "rgb(17, 192, 207)";
                Ctx.fillStyle = "rgb(60, 61, 60)";
                Ctx.fillRect(
                        ScreenSpec.SizeX - (ScreenSpec.SizeX / 4)+10,
                        ScreenSpec.gameFrameY + GameBubbleData.TextHeight * 3 + 15 -GameBubbleData.TextHeight,
                        (ScreenSpec.SizeX / 4) /2 + 20 + StringLength,
                        GameBubbleData.TextHeight + 2
                );
                //Ctx.fillStyle = "rgb(255, 60, 60)";
                Ctx.fillStyle = "rgb(255, 255, 255)";
                Ctx.fillText(
                        "Costs "+value+" Timepoints " +string,
                        ScreenSpec.SizeX - (ScreenSpec.SizeX / 4)+10,
                        ScreenSpec.gameFrameY + GameBubbleData.TextHeight * 3 + 15,
                        ScreenSpec.SizeX / 4 - 10
                );
                Ctx.fillStyle = "rgb(255, 60, 60)";
            }





            if(GameEngine.Actives.ClueButtonsOn == true){
                //Ritar upp en svart ruta bakom för att undvika att man ser att det blir
                //Dubbelt med transaparrent lager..
                Ctx.fillStyle = "rgb(0, 0, 0)";
                Ctx.fillRect(
                        (ScreenSpec.SizeX - (ScreenSpec.SizeX / 3)) -(ScreenSpec.SizeX / 8),
                    ScreenSpec.gameFrameY,
                        ScreenSpec.SizeX / 6,
                        ScreenSpec.SizeY - ScreenSpec.gameFrameY
                );

                //Skriver ut knapp för GuessMurderButton, samma som Accuse of murder...
                var GuessMurderButton = new GameEngine.Classes.NextOrPreviousButton(
                    (ScreenSpec.SizeX - (ScreenSpec.SizeX / 3)) -(ScreenSpec.SizeX / 10 * 2),
                    ScreenSpec.gameFrameY + 20,
                    //GameEngine.Machines.getPosition(0.05, "x"),
                    //GameEngine.Machines.getPosition(0.05, "y"),
                    GameData.GameDataImages.GuessMurderButton.width -(GameData.GameDataImages.GuessMurderButton.width/8),
                    GameData.GameDataImages.GuessMurderButton.height - (GameData.GameDataImages.GuessMurderButton.height/8),
                    GameData.GameDataImages.GuessMurderButton,
                    function(){
                        //Denna anropar funktionen som tar fram GuessMurderBoxen...
                        GameEngine.Machines.BuildMurderBox();
                    }
                );

                //Om man ej ska kunna trycka på knapparna så ska de inte uppdateras..
                var colorForBack = "rgb(100, 81, 81)";
                Ctx.fillStyle = colorForBack;
                /*Ctx.fillRect(
                        GuessMurderButton.PosX - 2.5,
                        GuessMurderButton.PosY - 2.5,
                        ScreenSpec.SizeX / 6+20,
                        GuessMurderButton.Height + 5
                );
                Ctx.fillStyle = "rgb(255, 60, 60)";
                Ctx.fillText(
                    "Accuse of murder",
                        GuessMurderButton.PosX + GuessMurderButton.Width + 10,
                        GuessMurderButton.PosY + (GuessMurderButton.Height/2)
                );
                 */
                GameEngine.Machines.WindowSizing(
                    GuessMurderButton.image,
                    "hudd",
                    GuessMurderButton.PosX,
                    GuessMurderButton.PosY,
                    GuessMurderButton.Width,
                    GuessMurderButton.Height
                );
                GameEngine.GoToButtons.HuddButtons.GuessMurderButton = GuessMurderButton;



                //Skriver ut knapp för InfoButton
                var InfoButton = new GameEngine.Classes.NextOrPreviousButton(
                    (ScreenSpec.SizeX - (ScreenSpec.SizeX / 3)) -(ScreenSpec.SizeX / 10 * 2),
                    ScreenSpec.gameFrameY + 20 + GameEngine.Machines.getPosition(0.05, "x") + 10,
                    GameData.GameDataImages.InfoButton.width - (GameData.GameDataImages.InfoButton.width/8),
                    GameData.GameDataImages.InfoButton.height - (GameData.GameDataImages.InfoButton.height/8),
                    GameData.GameDataImages.InfoButton,
                    function(){
                        //Denna anropar funktionen som tar fram GuessMurderBoxen...
                        GameEngine.Machines.LoadMotiveInfoScreen();
                    }
                );
                Ctx.fillStyle = colorForBack;
                /*
                Ctx.fillRect(
                        InfoButton.PosX - 2.5,
                        InfoButton.PosY - 2.5,
                        ScreenSpec.SizeX / 6+20,
                        InfoButton.Height + 5
                );
                Ctx.fillStyle = "rgb(255, 60, 60)";
                Ctx.fillText(
                    "Crime info",
                    InfoButton.PosX + InfoButton.Width + 10,
                    InfoButton.PosY + (InfoButton.Height/2)
                );
                 */



                GameEngine.Machines.WindowSizing(
                    InfoButton.image,
                    "hudd",
                    InfoButton.PosX,
                    InfoButton.PosY,
                    InfoButton.Width,
                    InfoButton.Height
                );
                GameEngine.GoToButtons.InfoButton = InfoButton;

                GameEngine.Machines.CreateActorInRoomComponent(); //laddar actors i rummet..
            }



            Ctx.fillStyle = oldFillStyle;


        },

        BuildMurderBox : function(){
            //TODO: this (downpil)

            //Förssta vi gör är att avaktiverar knappar som ej ska vara klickbara
            var OldBackButton = GameEngine.GoToButtons.backButton;
            GameEngine.Machines.clearRoomData();
            GameEngine.Machines.ClearFreeRoomData();
            //Det andrda vi gör är att vi ändrar bakåtknappens beteende, härifrån
            // vill vi bara använda den som att gå bakåt ur denna box..
            GameEngine.GoToButtons.backButton = OldBackButton;
            GameEngine.GoToButtons.backButton.RoomToGo =GameEngine.Actives.RoomThatIsActive.ID;

            //sen bygger vi själva boxen..
            var oldFill = Ctx.fillStyle;
            //Ctx.fillStyle = "rgb(233, 72, 72)";
            Ctx.fillStyle = "rgb(64, 4, 0)";
            var WidthOfMurderBox =ScreenSpec.SizeX-(ScreenSpec.SizeX /6)*2;
            var HeightOfMurderBox =ScreenSpec.gameFrameY -(ScreenSpec.gameFrameY / 8)*2;
            var PosXOfMurderBox =ScreenSpec.SizeX /6;
            var PosYOfMurderBox =ScreenSpec.gameFrameY / 8;
            Ctx.fillRect(
                PosXOfMurderBox-5,
                PosYOfMurderBox-5,
                WidthOfMurderBox+10,
                HeightOfMurderBox+10
            );
            //Ctx.fillStyle = "rgb(255, 144, 144)";
            Ctx.fillStyle = "rgb(133, 9, 0)";
            Ctx.fillRect(
                PosXOfMurderBox,
                PosYOfMurderBox,
                WidthOfMurderBox,
                HeightOfMurderBox
            );

            //Nu ska vi läga ut karaktärsboxarna, men först ska de skapas.
            var ArrOfBoxes = [];

            for(var i = 0; i < GameEngine.GlobalActors.length; i++){

                ArrOfBoxes.push(new GameEngine.Classes.BlippBoxCard(
                        null,
                        null,
                        GameEngine.GlobalActors[i],
                        GameEngine.Machines.getPosition(0.15, "x"),
                        GameEngine.Machines.getPosition(0.15, "y"),
                        GameEngine.GlobalActors[i]
                    )
                );
            }

            //nu ska vi lägga ut boxarna..
            var PixelsToPushX = 0;
            var PixelsToPushY = 0;
            for(var i= 0; i < ArrOfBoxes.length; i++){

                Ctx.fillStyle = "rgb(0, 0, 0)";
                Ctx.fillRect(
                    PosXOfMurderBox + (ArrOfBoxes[i].Width/2) + PixelsToPushX -10,
                    (HeightOfMurderBox / 2 ) +(ArrOfBoxes[i].Height/2) + PixelsToPushY -5,
                    ArrOfBoxes[i].Width + 20,
                    ArrOfBoxes[i].Height + 10
                );

                GameEngine.Machines.WindowSizing(
                    ArrOfBoxes[i].ActorOfBox.icon,
                    "gameframe",
                    PosXOfMurderBox + (ArrOfBoxes[i].Width/2) + PixelsToPushX,
                    (HeightOfMurderBox / 2 ) +(ArrOfBoxes[i].Height/2) + PixelsToPushY,
                    ArrOfBoxes[i].Width,
                    ArrOfBoxes[i].Height
                );

                if(ArrOfBoxes[i].ActorOfBox.role == GameEngine.Enums.Roles.victim){
                 //Om actorn är "Victim" så ska den få ett kryss över sig
                 // (den kommer ej vara klickbar heller, me ndet sköts annan stanns..(hover/click..)
                    GameEngine.Machines.WindowSizing(
                        GameData.GameDataImages.MarkedDead,
                        "gameframe",
                        PosXOfMurderBox + (ArrOfBoxes[i].Width/2) + PixelsToPushX,
                        (HeightOfMurderBox / 2 ) +(ArrOfBoxes[i].Height/2) + PixelsToPushY,
                        ArrOfBoxes[i].Width,
                        ArrOfBoxes[i].Height
                    );

                }

                //Nu har karaktärerna skrivits ut på skärmen, nu ska de in i en array som knappar
                GameEngine.GoToButtons.GuessMurderButtons.push(
                    new GameEngine.Classes.ActorBoxButton(
                        PosXOfMurderBox + (ArrOfBoxes[i].Width/2) + PixelsToPushX -10,
                        (HeightOfMurderBox / 2 ) +(ArrOfBoxes[i].Height/2) + PixelsToPushY -5,
                        ArrOfBoxes[i].Width + 20,
                        ArrOfBoxes[i].Height + 10,
                        ArrOfBoxes[i].ActorOfBox
                    )
                );

                PixelsToPushX += ArrOfBoxes[i].Width + 40;
                if(i == (ArrOfBoxes.length/2 - 1)){
                    PixelsToPushY = ArrOfBoxes[i].Height + 20;
                    PixelsToPushX = 0;
                }

            }
            //När karaktärerna är skapade så ska vi skapa en ruta
            //som symboliserar vilken karaktär man valt.
            GameBubbleData.PosXOfCrimBox   = PosXOfMurderBox + (ArrOfBoxes[0].Width/2) + ArrOfBoxes[0].Width +10;
            GameBubbleData.PosYOfCrimBox   = PosYOfMurderBox +5;
            GameBubbleData.WidthOfCrimBox  = ArrOfBoxes[0].Width + (40*2) -20;
            GameBubbleData.HeightOfCrimBox = HeightOfMurderBox /2 -40;
            Ctx.fillRect(
                GameBubbleData.PosXOfCrimBox,
                GameBubbleData.PosYOfCrimBox,
                GameBubbleData.WidthOfCrimBox,
                GameBubbleData.HeightOfCrimBox
            );

            // nu finns det en box att lägga bilden på den valde i, boxens storlek
            // är tillgänglig för andra funktioner genom GameBubbleData..

            //Vi kommer använda en annan afunktion för att skriva ut knappen,
            // detta för att vi vill bara att den ska vara tryckbar när man har valt
            // karaktär..
            GameEngine.Machines.fillHudGray(true,true,true);
            Ctx.fillStyle = oldFill;
        },

        isActorMurder : function(actor){
            //Denna funktion anropas när man trycker på knappen som bekräftar att du valt ut vem du tror
            // är mördaren.

            //alert("Bipp* Bopp* Bupp* Actor is Murder ? " + actor.isMurder);
            if(actor.isMurder == false){
                GameEngine.Actives.Player.TimePoints -=75;
                GameEngine.Machines.PlayersHuddUpdate();
            }else{
                //kom till en vinnar skärm
                GameEngine.Machines.loadWinningScreen(actor)
            }
        },

        loadWinningScreen : function(actor){
            GameEngine.Machines.clearRoomData();
            GameEngine.Actives.ClueButtonsOn = false;
            GameEngine.GoToButtons.backButton = "";
            GameEngine.Actives.IsDialogActive = true;
            GameEngine.GoToButtons.BlippButtons = [];
            GameEngine.GoToButtons.ActorInterviewButtons = [];
            GameEngine.GoToButtons.ContainerClueButtons = [];
            GameEngine.GoToButtons.DialogButtons = [];
            GameEngine.GoToButtons.DialogDownorUp = [];
            GameEngine.GoToButtons.DialogButtonsActive = [];
            GameEngine.GoToButtons.prevOrNextButton = [];
            GameEngine.GoToButtons.GuessMurderButtons = [];

            Ctx.fillStyle = "rgb(0,0,0)";
            Ctx.fillRect(
                0,
                0,
                ScreenSpec.SizeX,
                ScreenSpec.SizeY
            );

            GameEngine.Machines.WindowSizing(
                actor.EmotionObj.FreakedOut,
                "gameframe",
                (ScreenSpec.SizeX/2) - (GameEngine.Machines.getPosition(0.2482893450635386,"x"))/2,
                ScreenSpec.SizeY/6,
                GameEngine.Machines.getPosition(0.2482893450635386,"x"),
                GameEngine.Machines.getPosition(0.4969939879759519,"y")
            );

            GameEngine.Machines.WindowSizing(
                GameData.GameDataImages.WinScreen,
                "gameframe",
                0,
                ScreenSpec.SizeY/2 + (ScreenSpec.SizeY/6)-2,
                ScreenSpec.SizeX,
                ScreenSpec.SizeY/6
            );

            var ToMenuButton = new GameEngine.Classes.NextOrPreviousButton(
                    (ScreenSpec.SizeX / 3) - 10 - ((ScreenSpec.SizeX / 4)/2),
                    ScreenSpec.SizeY - (ScreenSpec.SizeY/8),
                    ScreenSpec.SizeX / 4,
                    ScreenSpec.SizeY/16,
                GameData.GameDataImages.ToMenuButton,
                function(){
                    //Funktion ska ladda  menyn!
                    GameData.GameDataImages.ToMenuButton = "";
                    PrepareNewGameORMenu(false);
                    return;
                }
            );
            GameEngine.GoToButtons.ToMenuButton = ToMenuButton;

            var RestartGameButton = new GameEngine.Classes.NextOrPreviousButton(
                    ScreenSpec.SizeX -(ScreenSpec.SizeX / 3) + 10 - ((ScreenSpec.SizeX / 4)/2),
                    ScreenSpec.SizeY - (ScreenSpec.SizeY/8),
                    ScreenSpec.SizeX / 4,
                    ScreenSpec.SizeY/16,
                GameData.GameDataImages.RestartGameButton,
                function(){
                    //Funktion ska ladda  menyn!
                    GameData.GameDataImages.RestartGameButton = "";
                    PrepareNewGameORMenu(true);
                    return;
                }
            );
            GameEngine.GoToButtons.RestartGameButton= RestartGameButton;

            Ctx.drawImage(
                ToMenuButton.image,
                ToMenuButton.PosX,
                ToMenuButton.PosY,
                ToMenuButton.Width,
                ToMenuButton.Height
            );
            Ctx.drawImage(
                RestartGameButton.image,
                RestartGameButton.PosX,
                RestartGameButton.PosY,
                RestartGameButton.Width,
                RestartGameButton.Height
            );

        },

        SelectActor : function(actor){
            //när man trycker på en karaktär i "Guess murder" Läget så ska karaktärens
            // ansikte bli valt  och data till karaktären hamnar i en globalvariabel som
            // används av en annan funktion (som kontaktas när man trycker på bekräfta knappen)
            // knappen ska skrivas ut med denna funktion..
            var oldFill = Ctx.fillStyle;


            Ctx.fillStyle = "rgb(0, 0, 0)";

            Ctx.fillRect(
                GameBubbleData.PosXOfCrimBox,
                GameBubbleData.PosYOfCrimBox,
                GameBubbleData.WidthOfCrimBox,
                GameBubbleData.HeightOfCrimBox
            );

            GameEngine.Machines.WindowSizing(
                actor.image,
                "gameframe",
                GameBubbleData.PosXOfCrimBox + 20,
                GameBubbleData.PosYOfCrimBox +5,
                GameBubbleData.WidthOfCrimBox - 40,
                GameBubbleData.HeightOfCrimBox-10
            );

            //här gör vi bordern till texten
            Ctx.fillStyle = "rgb(64, 4, 0)";

            Ctx.fillRect(
                    GameBubbleData.PosXOfCrimBox + GameBubbleData.WidthOfCrimBox + 5 -2.5,
                    (GameBubbleData.PosYOfCrimBox + (GameBubbleData.HeightOfCrimBox / 2))-50 - 2.5,
                    205 +5 +5 ,
                    50 -5 + 5
            );
            //här gör vi själva rutan till texten
            Ctx.fillStyle = "rgb(255, 255, 255)";
            Ctx.fillRect(
                GameBubbleData.PosXOfCrimBox + GameBubbleData.WidthOfCrimBox + 5 ,
                (GameBubbleData.PosYOfCrimBox + (GameBubbleData.HeightOfCrimBox / 2))-50,
                205 +5 ,
                50 -5
            );
            Ctx.fillStyle = "rgb(0, 0, 0)";
            Ctx.fillText(
                "Are you sure you want to guess at "+actor.name,
                    GameBubbleData.PosXOfCrimBox + GameBubbleData.WidthOfCrimBox + 5,
                    ((GameBubbleData.PosYOfCrimBox + (GameBubbleData.HeightOfCrimBox / 2)))-(GameBubbleData.TextHeight)*2,
                205 + 2.5
            );
            Ctx.fillText(
                "(Guessing wrong will cost 75 TimePoints)",
                GameBubbleData.PosXOfCrimBox + GameBubbleData.WidthOfCrimBox + 5,
                ((GameBubbleData.PosYOfCrimBox + (GameBubbleData.HeightOfCrimBox / 2)))-GameBubbleData.TextHeight,
                205
            );


            GameEngine.Machines.WindowSizing(
                GameData.GameDataImages.ConfirmButton,
                "gameframe",
                GameBubbleData.PosXOfCrimBox + GameBubbleData.WidthOfCrimBox + 10,
                GameBubbleData.PosYOfCrimBox + (GameBubbleData.HeightOfCrimBox / 2),
                200,
                50
            );

            GameEngine.Actives.MurderToGuessOn = new GameEngine.Classes.ActorBoxButton(
                GameBubbleData.PosXOfCrimBox + GameBubbleData.WidthOfCrimBox + 10,
                GameBubbleData.PosYOfCrimBox + (GameBubbleData.HeightOfCrimBox / 2),
                200,
                50,
                actor

            );


            Ctx.fillStyle = oldFill;
        },

        createPlayer : function(){
            GameObj.CheckPointsForInit.createPlayer = false;

            var Player = new GameEngine.Classes.Player();
            GameEngine.Actives.Player = Player;

            GameObj.CheckPointsForInit.createPlayer = true;
        },

        buildContainerBoxForClue : function(PosX, PosY){
            //denna funktion ska bygga själva boxen som ledtrådarna kommer
            //att befinna sig i.

            var oldFillStyle  = Ctx.fillStyle;
            //först gör vi bordern, med en vald färg
            Ctx.fillStyle = "rgb(144, 0, 201)";
            //nu ska vi rita ut triangeln, men för att försäkra oss att den inte hamnar utanför
            //måste vi göra lite matte..
            var Width = GameEngine.Machines.getPosition(0.175,"x");
            var Height = GameEngine.Machines.getPosition(0.20,"y");
            if(PosX + Width > ScreenSpec.SizeX ){
                PosX = PosX - ((PosX + Width) - ScreenSpec.SizeX);
            }
            if(PosY + Height > ScreenSpec.gameFrameY){
                PosY = PosY - ((PosY + Height) - ScreenSpec.gameFrameY);
            }

            Ctx.fillRect(
                PosX - 10,
                PosY - 15,
                Width+5,
                Height+10
            );

            //Sedan gör vi boxen som ska göra själva innehållet
            Ctx.fillStyle = "rgb(183, 101, 216)";
            Ctx.fillRect(
                PosX ,
                PosY ,
                Width -=15,
                Height -= 10
            );

            Ctx.fillStyle = oldFillStyle;
            var ObjToReturn = {
                Width : Width,
                Height: Height,
                PosX  : PosX,
                PosY  : PosY

            };
            return ObjToReturn;
        },

        FillBoxWithClues : function(PosX, PosY, Width, Height, ArrOfClues){
            var FillStyleOld = Ctx.fillStyle;
            //Först måste vi göra en knapp, sen ska vi fylla knappen med innehåll..
            var height  = GameEngine.Machines.getPosition(0.05, "y");
            for(var i = 0; i < ArrOfClues.length; i++){
                //Denna loop bygger ledtrådsknappar och placerar ut dem.

                var Button = new GameEngine.Classes.ContainerBoxButton(
                    PosX+2,
                    PosY + 2,
                    Width-4,
                    height-3,
                    ArrOfClues[i]
                );
                Ctx.fillStyle = "rgb(106, 121, 233)";
                Ctx.fillRect(
                    Button.PosX,
                    Button.PosY,
                    Button.Width,
                    Button.Height
                )

                Ctx.fillStyle = "rgb(241, 241, 241)";
                Ctx.fillText(ArrOfClues[i].Name,PosX+4,PosY + 15,Width);
                GameEngine.GoToButtons.ContainerClueButtons.push(Button);

                PosY +=height;

            }


            Ctx.fillStyle = FillStyleOld;
        },


        shuffle : function(array){
            //funktion som blandar en array
            var ArrayClone = [];
            for(var j = 0; j < array.length; j++){
                ArrayClone.push(array[j]);
            }
            var ArrayToReturn = [];
            var randomFromArr = 0;
            var randomArrNumbr = 0;

            for(var i = 0; ArrayClone.length > 0; i++ ){
                randomArrNumbr = Math.floor(Math.random() * ArrayClone.length)+ 0;
                randomFromArr = ArrayClone[randomArrNumbr];

                ArrayToReturn.push(randomFromArr);

                ArrayClone.splice(randomArrNumbr, 1);
            }

            return ArrayToReturn;
        },

        SelectAnswerForActor : function(Actor, GameCard){
            var ArrOfPossibleCards = [];
            var GameCardDataToUseWithActor;
            var AnswerCardToCheck;
            GameEngine.Actives.ClueInterview = true;

            GameEngine.Machines.fillHudGray(false,false,false,true);

            var AnswerCardsOfGameCard = GameEngine.Machines.shuffle(GameCard.AnswerCards);

            //Vi kollar igenom alla AnswerCards tills vi hittar en
            // som passar för den roll vi har frågatt..
            for(var i = 0; i < AnswerCardsOfGameCard.length; i++){
                AnswerCardToCheck = AnswerCardsOfGameCard[i];

                //Först av allt vill vi kolla om kortet istället har "Owner"
                //som ett ID, om fallet är
                // att Owner ID är samma som karaktärens ID så ska vi direkt använda
                // detta kort istället!
                if(AnswerCardToCheck.owner == Actor.ID){
                    //Denna sats ska anropa funktionen som påbörjar dialogen!
                    GameEngine.Machines.CardDataToQuestions(AnswerCardToCheck, Actor);
                    return;
                }

                if(AnswerCardToCheck.owner == Actor.role){
                    //de roller som passar ska skjutas in här!
                    ArrOfPossibleCards.push(AnswerCardToCheck);
                }

                /* Koden nedan används inte då spelet inte längre baserar svar på emotionstate...
                if(AnswerCardToCheck.owner == Actor.role && AnswerCardToCheck.emotionState == Actor.emotionState){
                    //Om både role och Emotionstate stämmer överens med Actor så SKA detta kort
                    //användas på direkten !

                    //Denna sats ska anropa funktionen som påbörjar dialogen!
                    GameEngine.Machines.CardDataToQuestions(AnswerCardToCheck, Actor);
                    AnswerCardToCheck.owner = Actor.ID;
                    return;

                }
                 */

            }
            //Väljer  ett slumpat kort av de korten som är tillgänliga!
            if(ArrOfPossibleCards.length > 0){
                GameCardDataToUseWithActor = ArrOfPossibleCards[Math.floor(Math.random()*(ArrOfPossibleCards.length)+0)];
                //Sätter ID på kortet till Actors ID, för att markera att svaret är upptaget..
                GameCardDataToUseWithActor.owner = Actor.ID;
            }else{
                //Om det inte finns några kort att använda alls så ska vi skicka in ett standardkort,
                //detta kort ska förhoppningsvis inte användas, men detä r upp till den som designar motiven..

                GameCardDataToUseWithActor = new GameEngine.Classes.CardData(
                    GameEngine.Enums.EmotionState.Neutral,
                    "I have never seen that thing, sorry.",
                    [],
                    "Can you tell me something about this objekt?"
                );
            }

            GameEngine.Machines.CardDataToQuestions(GameCardDataToUseWithActor, Actor);
            return;

        },



        createBlippBox : function(GameCard){
            GameEngine.Actives.IsDialogActive = true;
            GameEngine.Actives.BlippBoxIsActive = true;

            //Genom att spara ner vilket kort som använts så kan vi kontakta
            // denna funktion igen när vi vill återgå från en dialog...
            GameEngine.Actives.ActiveClue = GameCard;
            //GameEngine.GoToButtons.backButton = "";
            //Vi måste tömma WayPoints i GoToButtons så att det inte finns osynliga knappar att trycka på..
            //För ClueButtons ska vi disabla, detta pga annan teknik..
            GameEngine.GoToButtons.WayPoints = [];
            GameEngine.Actives.ClueButtonsOn = false;
            GameEngine.Machines.fillBackgroundGray();

            //Sedan ändrar vi BackButtons bettende så att man bara backar ur BlippBoxen..
            var OldBackButton = GameEngine.GoToButtons.backButton;
            GameEngine.Machines.clearRoomData();
            //Det andrda vi gör är att vi ändrar bakåtknappens beteende, härifrån
            // vill vi bara använda den som att gå bakåt ur denna box..
            GameEngine.GoToButtons.backButton = OldBackButton;
            GameEngine.GoToButtons.backButton.RoomToGo =GameEngine.Actives.RoomThatIsActive.ID;



            //Första vi gör är att spara färgen som var aktiv när vi kom in här, så att vi kan sätta den som standard när funktionen är klar
            // sen så gör vi själva rutan som allt händer i..
            var OldFillStyle, ArrOfActorBoxes;
            OldFillStyle = Ctx.fillStyle;
            //Ctx.fillStyle = "rgb(0, 203, 231)"; Gammal...  innan färgtemat ändrades
            Ctx.fillStyle = "rgb(133, 9, 0)";
            Ctx.fillRect(
                GameBubbleData.BlippBoxPosX,
                GameBubbleData.BlippBoxPosY,
                GameBubbleData.BlippBoxWidth,
                GameBubbleData.BlippBoxHeight
            );

            //Ctx.fillStyle = "rgb(0, 172, 196)"; Gammal...  innan färgtemat ändrades
            //Ctx.fillStyle = "rgb(64, 4, 0)";
            Ctx.fillStyle = "rgb(255, 255, 255)"; //White.. <- ser rätt fräscht ut! men något måste göras åt denna
            Ctx.fillRect(
                GameBubbleData.BlippBoxPosX+5,
                GameBubbleData.BlippBoxPosY+5,
                GameBubbleData.BlippBoxWidth-10,
                GameBubbleData.BlippBoxHeight-10
            );
             //rutan är klar och vi ska skjuta in de små klickbara rutorna i den större rutan som vi nyss ritat..
            ArrOfActorBoxes = GameEngine.Machines.createBlippBoxActorBoxes(GameCard);
            var addToPosX = 10;
            var addToPosY = 10;
            Ctx.fillStyle = "rgb(0, 0, 0)";
            for(var i = 0; i < ArrOfActorBoxes.length; i++){

                if(i == (ArrOfActorBoxes.length /2)){
                    addToPosY += GameBubbleData.BlippBoxHeight - ArrOfActorBoxes[i].Height - 20 -GameEngine.Machines.getPosition(0.10,"y");

                    addToPosX = GameBubbleData.BlippBoxWidth -ArrOfActorBoxes[i].Width - 10 ;
                }

                //ritar upp rutan
                Ctx.fillRect(
                    GameBubbleData.BlippBoxPosX + addToPosX,
                    GameBubbleData.BlippBoxPosY + GameEngine.Machines.getPosition(0.10,"y") + addToPosY,
                    ArrOfActorBoxes[i].Width,
                    ArrOfActorBoxes[i].Height
                );
                //Fyller rutan med bilden
                Ctx.drawImage(
                    ArrOfActorBoxes[i].ActorOfBox.icon,
                    (GameBubbleData.BlippBoxPosX + addToPosX) + 5,
                    (GameBubbleData.BlippBoxPosY + GameEngine.Machines.getPosition(0.10,"y") + addToPosY) + 5,
                    (ArrOfActorBoxes[i].Width) -10 ,
                    (ArrOfActorBoxes[i].Height) - 10
                );
                if(ArrOfActorBoxes[i].ActorOfBox.role == GameEngine.Enums.Roles.victim){
                    //Om actorn är "Victim" så ska den få ett kryss över sig
                    // (den kommer ej vara klickbar heller, me ndet sköts annan stanns..(hover/click..)
                    GameEngine.Machines.WindowSizing(
                        GameData.GameDataImages.MarkedDead,
                        "gameframe",
                        (GameBubbleData.BlippBoxPosX + addToPosX) + 5,
                        (GameBubbleData.BlippBoxPosY + GameEngine.Machines.getPosition(0.10,"y") + addToPosY) + 5,
                        (ArrOfActorBoxes[i].Width) -10 ,
                        (ArrOfActorBoxes[i].Height) - 10
                    );

                }

                ArrOfActorBoxes[i].PosX = (GameBubbleData.BlippBoxPosX + addToPosX) + 5;
                ArrOfActorBoxes[i].PosY = (GameBubbleData.BlippBoxPosY + GameEngine.Machines.getPosition(0.10,"y") + addToPosY) + 5;


                if(i < (ArrOfActorBoxes.length /2)){
                    addToPosX += ArrOfActorBoxes[i].Width + 10; //10 är padding..

                }else{
                    addToPosX -= ArrOfActorBoxes[i].Width + 10; //10 är padding..
                }

                GameEngine.GoToButtons.BlippButtons.push(ArrOfActorBoxes[i]);

            }

            //nu är alla knappar utsatta, vi ska lägga till en bild på Ledtråden samt beskrivning..
            var WidthOfClueBox = GameEngine.Machines.getPosition(0.20,"x");
            var HeightOfClueBox = GameEngine.Machines.getPosition(0.20,"y");
            Ctx.fillStyle = "rgb(0, 0, 0)";
            Ctx.fillRect(
                GameBubbleData.BlippBoxPosX + GameBubbleData.BlippBoxWidth - WidthOfClueBox - 20,
                GameBubbleData.BlippBoxPosY + GameEngine.Machines.getPosition(0.10,"y") + 10,
                WidthOfClueBox + 10,
                HeightOfClueBox + GameEngine.Machines.getPosition(0.11, "x")
            );
            Ctx.fillStyle = "rgb(146, 160, 160)";

            Ctx.fillRect(
                GameBubbleData.BlippBoxPosX + GameBubbleData.BlippBoxWidth - WidthOfClueBox - 15,
                GameBubbleData.BlippBoxPosY + GameEngine.Machines.getPosition(0.10,"y") + 15,
                WidthOfClueBox,
                HeightOfClueBox
            );
            //nu är ramarna uppritade,. nu ska vi lägga in själva bilden i den innersta ramen..
            Ctx.drawImage(
                GameCard.image,
               (GameBubbleData.BlippBoxPosX + GameBubbleData.BlippBoxWidth - WidthOfClueBox - 20) + WidthOfClueBox/4,
               (GameBubbleData.BlippBoxPosY + 10) + (HeightOfClueBox / 5) + GameEngine.Machines.getPosition(0.10,"y"),
                WidthOfClueBox / 2,
                HeightOfClueBox / 2
            );
            //nu ska vi lägga till texten under bilden..
            Ctx.fillStyle = "rgb(0, 0, 0)";
            Ctx.fillText(
                GameCard.Name,
                (GameBubbleData.BlippBoxPosX + GameBubbleData.BlippBoxWidth - WidthOfClueBox - 20) + WidthOfClueBox/4,
                ((GameBubbleData.BlippBoxPosY + 10) + (HeightOfClueBox / 5)) + HeightOfClueBox / 2 + GameBubbleData.TextHeight + GameEngine.Machines.getPosition(0.10,"y")
            );


            // Nu ska vi göra själva texten till boxen..
            Ctx.fillStyle = "rgb(0, 0, 0)";
            Ctx.fillRect(
                GameEngine.Machines.getPosition(0.5738025415444771 ,"x"),
                GameEngine.Machines.getPosition(0.2965931863727455 ,"y")+ GameEngine.Machines.getPosition(0.10,"y") + GameBubbleData.TextHeight + 6,
                WidthOfClueBox,
                GameEngine.Machines.getPosition(0.1035, "x")
            );


            Ctx.fillStyle = "rgb(244, 246, 255)";
            GameEngine.Machines.wrapText(
                Ctx,
                GameCard.Description,
                //"Very long text yes, Very long text yes, Very long text yes Very long text yes, Very long text yes, Very long text yes Very long text yes, Very long text yes, Very long text yes Very long text yes, Very long text yes, Very long text yes Very long text yes, Very long text yes, Very long text yes Very long text yes, Very long text yes, Very long text yes Very long text yes, Very long text yes, Very long text yes s",
                GameEngine.Machines.getPosition(0.5738025415444771 ,"x"),
                    GameEngine.Machines.getPosition(0.2965931863727455 ,"y")+ GameEngine.Machines.getPosition(0.10,"y") + GameBubbleData.TextHeight + 6,
                GameEngine.Machines.getPosition(0.2903225806451612 ,"x"),
                GameBubbleData.TextHeight,
                GameBubbleData.TextHeight,
                GameEngine.Machines.getPosition(0.1035, "x")
            )

            //Denna är till för att gråa ner rutor som inte kan tryckas på...
            GameEngine.Machines.fillHudGray(true, true, true);

            Ctx.fillStyle = OldFillStyle;
        },

        createBlippBoxActorBoxes : function(GameCard){
            var ArrOfBoxes = [];

            for(var i = 0; i < GameEngine.GlobalActors.length; i++){

                ArrOfBoxes.push(new GameEngine.Classes.BlippBoxCard(
                    null,
                    null,
                    GameEngine.GlobalActors[i],
                    GameEngine.Machines.getPosition(0.15, "x"),
                    GameEngine.Machines.getPosition(0.15, "y"),
                    GameCard
                )
                );

            }
            return ArrOfBoxes;

        },

        fillHudGray : function(blackButtons, Actors, ifBackButtonIsUsable, onlyBack){
            var OldFill = Ctx.fillStyle;
            Ctx.fillStyle = "rgba(185, 185, 185, 0.55)";
            if(onlyBack){

                Ctx.fillRect(0, ScreenSpec.gameFrameY, (ScreenSpec.SizeX /4)*1.75 +0.2,ScreenSpec.SizeY - ScreenSpec.gameFrameY)

            }else{
                if(blackButtons == true){

                    if(ifBackButtonIsUsable == true){
                        Ctx.fillRect((ScreenSpec.SizeX /4*1.75), ScreenSpec.gameFrameY, (ScreenSpec.SizeX /4*1.25),ScreenSpec.SizeY - ScreenSpec.gameFrameY)
                    }else{
                        Ctx.fillRect(0, ScreenSpec.gameFrameY, (ScreenSpec.SizeX /4)*3,ScreenSpec.SizeY - ScreenSpec.gameFrameY)
                    }

                }

                if(Actors == true){

                    Ctx.fillRect((ScreenSpec.SizeX /4)*3, ScreenSpec.gameFrameY + ((ScreenSpec.SizeY - ScreenSpec.gameFrameY)/2), (ScreenSpec.SizeX /4),(ScreenSpec.SizeY - ScreenSpec.gameFrameY)/2)
                }
            }



            Ctx.fillStyle = OldFill;
        },

        getPlaceHolderInfoFromCardIDForCurrentRoom : function(GameCardID){
            //Först hämtar vi data för aktivt rum
            var thisRoom = GameEngine.Actives.RoomThatIsActive;
            if(thisRoom == undefined || thisRoom == null || thisRoom == ""){
                return;
            }
            var ObjWithPlaceHolderData = {
                PosX : null,
                PosY : null,
                Width : null,
                Height : null
            }

            for(var i = 0; i < thisRoom.WallClue_GameCards.length ; i++){
                if(thisRoom.WallClue_GameCards[i].GameCardOrContent != undefined){
                    if(GameCardID == thisRoom.WallClue_GameCards[i].GameCardOrContent.ID){
                        ObjWithPlaceHolderData.PosX     = thisRoom.WallClue_GameCards[i].PosX;
                        ObjWithPlaceHolderData.PosY     = thisRoom.WallClue_GameCards[i].PosY;
                        ObjWithPlaceHolderData.Width    = thisRoom.WallClue_GameCards[i].SizeWidth;
                        ObjWithPlaceHolderData.Height   = thisRoom.WallClue_GameCards[i].SizeHeight;
                        return ObjWithPlaceHolderData;
                    }
                }
            }

            for(var i = 0; i < thisRoom.TableClue_GameCards.length ; i++){
                if(thisRoom.TableClue_GameCards[i].GameCardOrContent != undefined){
                    if(GameCardID == thisRoom.TableClue_GameCards[i].GameCardOrContent.ID){
                        ObjWithPlaceHolderData.PosX     = thisRoom.TableClue_GameCards[i].PosX;
                        ObjWithPlaceHolderData.PosY     = thisRoom.TableClue_GameCards[i].PosY;
                        ObjWithPlaceHolderData.Width    = thisRoom.TableClue_GameCards[i].SizeWidth;
                        ObjWithPlaceHolderData.Height   = thisRoom.TableClue_GameCards[i].SizeHeight;
                        return ObjWithPlaceHolderData;
                    }
                }
            }

            return ObjWithPlaceHolderData;

        },

		ReadInGameCards : function(){
			//Init all Cards = Skapa och hämta ner korthögen basearat på datan i "GameCards"..
		},

        SelectRandomMotive : function(){
            GameObj.CheckPointsForInit.SelectRandomMotive = false;
            //Först slumpar jag fram ett Motiv genom att ta längden på Motivarrayen och 0
            // då får jag alltså ett värde däremellan..GameData.MurderMotives
            var RandomMurderMotiveArrNumber = Math.floor(Math.random() * (GameData.MurderMotives.length - 1) + 0);
            var RandomMurderMotive = GameData.MurderMotives[RandomMurderMotiveArrNumber];

            //Anger vilket motiv som är aktivt..
            GameEngine.Actives.MotiveThatIsActive = RandomMurderMotive;
            GameEngine.Actives.MurderMotiveArrNumber = RandomMurderMotiveArrNumber;

            //Eftersom resten av koden jag skrivit är basearat på att RandomMurderMotive är en array som innehåller arrayer så
            //kommer jag göra om den till en array som går att skicka videre!
            RandomMurderMotive = [
                RandomMurderMotive.LOC_other,
                RandomMurderMotive.LOC_murderur,
                RandomMurderMotive.LOC_victim,
                RandomMurderMotive.LOC_actor1,
                RandomMurderMotive.LOC_actor2,
                RandomMurderMotive.LOC_actor3,
                RandomMurderMotive.LOC_actor4
            ];

            var RandomMurderMotiveToSend = [];
            //var ArrayWithinMurderMotiveToSend = [];

            for(var j = 0; j < RandomMurderMotive.length;j++){ //Lägger in randomMurderMotive datan i det globala DataPlaceHolder arrayen för att kunna använda datan senare ..
                GameEngine.DataPlaceHolder.push(RandomMurderMotive[j]);

                if(RandomMurderMotive[j].length != 0){
                    //Vi vill bara skicka ut data som är nödvändig, om (tex) RandomMurderMotive.LOC_actor3 inte innehåller
                    //mer än 0 kort är det inte nödvändigt att skicka med den, utan bara dumt.
                    // Vi kommer skapa en array som hanterar ett typ av Objekt. Objektet har två värden,
                    // ledtrådsArrayyen från "RandomMurderMotive" och sen vilken roll ledtrådsarrayen hör till!

                    //först måste vi ta reda på vilken roll Arrayen som testas hör till.
                    var role;
                    switch(j){
                        case 0:
                            role = GameEngine.Enums.Roles.other;
                            break;
                        case 1:
                            role = GameEngine.Enums.Roles.murder;
                            break;
                        case 2:
                            role = GameEngine.Enums.Roles.victim;
                            break;
                        case 3:
                            role = GameEngine.Enums.Roles.actor1;
                            break;
                        case 4:
                            role = GameEngine.Enums.Roles.actor2;
                            break;
                        case 5:
                            role = GameEngine.Enums.Roles.actor3;
                            break;
                        case 6:
                            role = GameEngine.Enums.Roles.actor4;
                            break;

                    }

                    RandomMurderMotiveToSend.push( new GameEngine.Classes.holdsArrAndString(
                            RandomMurderMotive[j],
                            role
                        )
                    );


                }
            };

            //Detta är en kontroll så att denna metod inte körs när karaktärer har roller som är satta..
            //Dålig spärr då den bara testar en spelare, men det är allt som behövs..
            if(GameEngine.GlobalActors[1].Secret == null){
                //nu ska vi tilldela motivedatans roller till aktörerna som vi skapat..
                var i = 0;
                for(i = 0; i < RandomMurderMotiveToSend.length ; i++){
                    GameEngine.Machines.GiveActorsRole(RandomMurderMotiveToSend[i].Arr, RandomMurderMotiveToSend[i].String);
                }

                //Om alla roller har delats ut och "i" är lägre än antalet actors så har alla roller inte fått kort än,
                //de roller som återstår ska få kort och kommer tilldelas rollen "Other"
                if( i < GameEngine.GlobalActors.length){
                    for(i ; i < GameEngine.GlobalActors.length; i++){
                        var ArrToSend;
                        //här vill vi ta reda på om det finns kort i "Others", om så är fallet så är de korten som ska skickas med.
                        //Först måste vi ta fram OthersKorten..
                        for(var j = 0; j < RandomMurderMotiveToSend.length; j++){
                            if(RandomMurderMotiveToSend[j].String == GameEngine.Enums.Roles.other){
                                ArrToSend = RandomMurderMotiveToSend[j].Arr;
                            }
                        }
                        if(ArrToSend != undefined){
                            //Om OthersArrayen finns så vill vi ta ut de kort från den som inte är upptagna,
                            //om den inte finns så ska en tom-array skickas med istället!

                            for(var k = 0; k < ArrToSend.length; k++){
                                if(GameEngine.Machines.gameCardDoesNotBelongWithOtherActor(ArrToSend[k]) == false){
                                    //Om kortet hör till en annan karaktär, så ska vi splice'a det från arrayen!
                                    ArrToSend.splice(k,1)
                                }
                            }

                        }else{
                            ArrToSend = [];
                        }

                        GameEngine.Machines.GiveActorsRole(ArrToSend, GameEngine.Enums.Roles.other);
                    }
                }

                //Nu ska datan som vi lagt in placeras i Placeholders över alla rum..


            }else{
                alert("SelectRandomMotive funktionen har redan utförts.. ");
            }

            //Tömmer DataPlaceHolder
            GameEngine.DataPlaceHolder = [];
            GameObj.CheckPointsForInit.SelectRandomMotive = true;
        },

        getAllPossibleCards : function(Type){
            var PossibleCardsArr = [];

            for(var i = 0; i < GameData.GameCardsCollectionData.length; i++){
                if(GameData.GameCardsCollectionData[i].theGameCard != undefined){
                    PossibleCardsArr.push(GameEngine.Machines.getGameCardFromID(GameData.GameCardsCollectionData[i].theGameCard.ID, Type));
                }

            }
            return PossibleCardsArr;

        },

        newRandomListOfClues : function(_min, _max){
            //funktionen genererar och retuernrar en array med ledtrådar som inte finns på några Actors..
            if(_min == undefined && _max == undefined ){
                var min = 3;
                var max = 10;
            }else{
                var min = _min;
                var max = _max;
            }

            var cardsInArr = Math.floor((Math.random() * (max - min) )+ min);

            var GameCard = null;
            var GameCardIsSet = false;
            var ArrOfcards = [];
            var TotalOfPossibleCards = GameEngine.Machines.getAllPossibleCards("clue");

            for(var i = 0; i < cardsInArr; i++ ){
                while(GameCardIsSet == false){

                    GameCard = TotalOfPossibleCards[Math.floor((Math.random() * TotalOfPossibleCards.length)+0)];

                    //GameCard = GameEngine.Machines.getGameCardFromID(Math.floor(Math.random() * GameData.GameCardsCollectionData.length + 0), "clue"); //TODO: minus 1 här, krångalr newRandomListOFClues ?

                    //vi ska också logga försöket så att vi inte testar samma kort flera gånger, Samt spara ner dem i ien globalArray för att undvika att Samma kort blir valt igen..
                    if(GameEngine.BusyCards.ClueCards.indexOf(GameCard.ID) == -1){
                        if(GameCard.ID != -1 ){ //Säkerhetsspärr så att kortet man får inte är ogiltigt.. EJ NÖDVÄNDIG LÄNGRE:..
                            if(!(GameEngine.Machines.gameCardDoesNotBelongWithOtherActor(GameCard))){
                            // OBS denna = ej nödvänig, den förstör. Det finns kort på Actors som inte används, dessa ska kunna användas här..
                            //EDIT: Vi använder funktionen, fast "baklänges"! Vi vill trots allt bara välja bland kort som ägs av en karaktär. Detta betyder att vi vill att den ska välja "False"..

                               //if(GameEngine.Machines.gameCardDoesNotBelongInOtherRoom(GameCard)){
                                if((GameEngine.Machines.GetAllActiveIDs()).indexOf(GameCard.ID) == -1){
                                    GameCardIsSet = true;
                                }
                               //}  //OBS! Testa att ta bort denna kontroll på den aandra, efter att ha testat om att ha tagit bort dennna hära gjorde susen! :)
                            }

                        }
                        GameEngine.BusyCards.ClueCards.push(GameCard.ID);

                    }

                    if(TotalOfPossibleCards.length == GameEngine.BusyCards.ClueCards.length){
                        //Om alla kort är testade och det inte finns några kort kvar att testa så ska loopen avbrytas..
                        return ArrOfcards; //vi måste returnera annars kommer det skickas med Clues som redan har använts en gång..
                    }


                }

                ArrOfcards.push(GameCard);

                GameCardIsSet = false
            }
            return ArrOfcards;
        },

        findClueCardRooms : function(ClueCardID){
            //Hämtar en Array med IDn som symboliserar vilka rum kortet kan finnas i..
            for(var i = 0; i < GameData.GameCardsCollectionData.length; i++){
                if(GameData.GameCardsCollectionData[i].theGameCard != undefined){
                    if(GameData.GameCardsCollectionData[i].theGameCard.ID == ClueCardID){
                        return GameData.GameCardsCollectionData[i].possibleRoom;
                    }
                }
            }

        },

        getCluesFromAllActorsClueListsForSpecificRoom : function(RoomID){
            var AllCluesForThisRoomArr = [];
            var ClueCardRooms;
            for(var i = 0; i < GameEngine.GlobalActors.length; i++){

                for(var j = 0; j < GameEngine.GlobalActors[i].ClueList.length; j++){
                    ClueCardRooms = GameEngine.Machines.findClueCardRooms(GameEngine.GlobalActors[i].ClueList[j].ID);

                    if(ClueCardRooms.indexOf(RoomID) != -1){// om RumID't finns i Arrayen så ska kortet kunna läggas i rummet.
                        AllCluesForThisRoomArr.push(GameEngine.GlobalActors[i].ClueList[j]);
                    }



                }


            }
            return AllCluesForThisRoomArr;
        }, //TODO: Skriva en funktion som gör att man kan ta emot ord som "murder" och "victim" samt "actor1", "actor2" osv. Istället för rum, så blir det deras rum, (vid initiationen av korten..)

        mixUpClueCards : function(RealCardsArr, FakeCardsArr){
            //Först så måste vi slumpa fram en uppdelning; alltså hur många kort ska vara motivkort och hur många kort ska vara icke relaterade.

            //TODO: Fungerar det med att alla rum har 10 ledtrådar? tänker på Hallarna som inte riktigt har rum för det... ? <-- svar : nepp.. Måste fixa så att rum som inte har kort klaras av i denna funktion..
            //Totalt vill vi välja ut 10 ledtrådar, så varje rum kommer ha tio ledtrådar
            var MaxNumberOfCards = 10;
            //nu tar vi fram hur många som ska vara riktiga ClueCards, resten blir fake..
            var NumberOfRealCards = Math.floor(Math.random() * (MaxNumberOfCards - 3) + 3); // minst 3 riktiga kort måste skapas..

            if(RealCardsArr.length < NumberOfRealCards){ // om antalet kort som ska användas är högre än antalet kort som finns så kör vi med antalet kort som finns istället..
                NumberOfRealCards = RealCardsArr.length;
            }

            var NumberOfRealCards_UseThisToSubtract = NumberOfRealCards;

            //Vi behöver en Array1, som lagrar arrayer2, där arreyn2 innehållar 2 saker: 0=ID't på kortet. 1=IDn på kort som krävs..
            var ArrayOfGameCards = [];
            var GameCardPLUSSPossibleCards = []; // 0 = alltid själva "huvud" kortet, 1-> = korten som behövs..
            var CardToUse = []; // en array som innehåller de kort som kommer att returneras tillbaka..

            //innan vi väljer kort måste vi se till att inte splittra på några kort som hör samman, dett agäller bara korten från RealCardsArr..
            var CardToTest;
            for(var i = 0;i<RealCardsArr.length; i++){
                CardToTest = RealCardsArr[i];

                if(CardToTest.needTheseCards != undefined){ // om CardToTest.needTheseCards inte är undefined så innehåller arrayen något och bör ta till häänsyn
                    GameCardPLUSSPossibleCards.push(CardToTest);
                    for(var j = 0; j < CardToTest.needTheseCards.length;j++){
                        GameCardPLUSSPossibleCards.push(GameEngine.Machines.getGameCardFromID(CardToTest.ID,"clue")); //TODO: ändrade denna från "CardToTest.needTheseCards.ID" till "CardToTest.ID"
                    }
                    ArrayOfGameCards.push(GameCardPLUSSPossibleCards);
                    GameCardPLUSSPossibleCards=[];
                }else{//om det inte innehåller några "NeedTheseCards"Idn så lägger vi bara in kortet i vår nya array som kommer innehålla alla "riktiga" kort.
                    GameCardPLUSSPossibleCards.push(CardToTest);
                    ArrayOfGameCards.push(GameCardPLUSSPossibleCards);
                    GameCardPLUSSPossibleCards=[];
                }

            }
            // nu är ArrayOfGameCards fylld med kort + deras "beroende kort" och nu ska vi välja ut *NumberOfRealCards* kort där vi ska räkna med "beroende korten"...
            var CardToPutInCardToUsePRIORITY = GameEngine.Machines.getActorsCardPRIORITY(ArrayOfGameCards);
            // nu ska den viktiga datan in i "ArrayOfGameCards", fast de ska in så de ligger först.
            var Holder;
            Holder = ArrayOfGameCards;
            ArrayOfGameCards = [];
            for(var p = 0; p < CardToPutInCardToUsePRIORITY.length; p++){
                ArrayOfGameCards.push(CardToPutInCardToUsePRIORITY[p]);
            }
            // nu när den prioriterade datan ligger först ska vi se till att ta bort den prioriterade datan från de de gamla korten (de som nu ligger i Holder)
            // detta för att undvika dubblikationer..
            for(var p = 0; p < Holder.length; p++){

                for(var o = 0; o < ArrayOfGameCards.length; o++){

                    for(var y = 0; y < Holder[p].length; p++){

                        if(Holder[p][y].ID == ArrayOfGameCards[o].ID){
                            Holder[p].splice(y,1);
                        }
                    }
                }
            }
            //När rensningen av dubletter är klara så kan vi lägga in de återstående GameCardsen från "Holder" in i "ArrayOFGameCards"
            for(var i= 0; i < Holder.length; i++){
                ArrayOfGameCards.push(Holder[i]);
            }

            var CardToPutInCardToUse;
            var TakeCardsFrom;
            var counter = 0;;
            var Logger = [];
            var untilFalse = true;
            while(untilFalse){

                //Slumpa fram ett av de framtagna korten Om de prioriterade korten är tagna!
                if(counter < CardToPutInCardToUsePRIORITY.length){
                    // om counter är mindre än antal prioriterade kort så ska de prioriterade korten betas av FÖRE vi tar slumpade kort..
                    CardToPutInCardToUse = ArrayOfGameCards[counter];
                    counter++;
                }else{
                    CardToPutInCardToUse = ArrayOfGameCards[Math.round(Math.random() * ArrayOfGameCards.length + 0)];
                }

                if(CardToPutInCardToUse != undefined){ //säkerhetspärr som ser till att innehållat bara körs om ArrayOfGameCards inte tilldelat CardToPutInCardToUse

                    //kolla om kortet har använts förut
                    if(Logger.indexOf(CardToPutInCardToUse[0].ID) == -1){
                        //Kolla om korten som behöver läggas in är tillräckligt FÅ för att de ska få plats, om det är de så stoppas de in.
                        // om de inte får plats så loggas kortet fortfarande (så att de ej väljs igen), när alla kort är testade så ger While-satsen med sig och
                        // kort som är riktiga har blivit valda!
                        if(CardToPutInCardToUse.length <= NumberOfRealCards_UseThisToSubtract){
                            for(var i = 0; i < CardToPutInCardToUse.length; i++){
                                if(CardToPutInCardToUse[i].ID != -1) {
                                    //if(GameEngine.Machines.gameCardDoesNotBelongWithOtherActor(CardToPutInCardToUse[i])){
                                        //if(GameEngine.Machines.gameCardDoesNotBelongInOtherRoom(CardToPutInCardToUse[i])){
                                            //if (GameEngine.BusyCards.ClueCards.indexOf(CardToPutInCardToUse[i].ID) == -1) {
                                    if((GameEngine.Machines.GetAllActiveIDs()).indexOf(CardToPutInCardToUse[i].ID) == -1){
                                        CardToUse.push(CardToPutInCardToUse[i]);
                                        NumberOfRealCards_UseThisToSubtract - 1;
                                        Logger.push(CardToPutInCardToUse[i].ID);
                                    }else{
                                        Logger.push(CardToPutInCardToUse[0].ID);
                                    }

                                                //GameEngine.BusyCards.ClueCards.push(CardToPutInCardToUse[i].ID); //TODO: kolla om denna fungerar eller har förstört..
                                            //}
                                       // } //
                                    //}

                                }else{
                                    Logger.push(CardToPutInCardToUse[0].ID);
                                }
                            }

                            }else {
                            Logger.push(CardToPutInCardToUse[0].ID);
                            }
                        }else{
                            Logger.push(CardToPutInCardToUse[0].ID);
                        }
                        //TODO: Varning på denna under... ..
                        //Logger.push(CardToPutInCardToUse[0].ID);
                    }


                if(Logger.length >= ArrayOfGameCards.length){
                    untilFalse = false;
                }
            }


            // innan vi returnerar så måste vi se till att antal ledtrådar kommer gå upp i MaxNumberOfCards, så vi fyller på resten med "fejk"-kort..
            var min = undefined;
            var max = undefined;
            var minToUseWithCards = MaxNumberOfCards - CardToUse.length;
            if(NumberOfRealCards < 3){
                min = MaxNumberOfCards - CardToUse.length;
                minToUseWithCards = MaxNumberOfCards - CardToUse.length;
                max = 10;
            }
            //var FakeCards = GameEngine.Machines.newRandomListOfClues(min, max);

            var FakeCards = [];
            var TableMeter = 0;
            var WallMeter = 0;

            //Denna forLoop ska också se till att korten delas ut "rättvist", dvs lika många Table som Clue-cards...
            for(var i = 0; i < min; i++){

                if(i == FakeCardsArr.length){
                    console.log("Varning, finns ej tillräckligt många kort för att spelet ska kunna fungera.. ");
                    break;
                }

                if((GameEngine.Machines.GetAllActiveIDs()).indexOf(FakeCardsArr[i].ID) == -1){
                    if(FakeCardsArr[i].type == GameEngine.Enums.ClueType.WallClue && WallMeter != (minToUseWithCards/2) ){
                        FakeCards.push(FakeCardsArr[i]);
                        WallMeter ++;
                    }

                    if(FakeCardsArr[i].type == GameEngine.Enums.ClueType.TableClue && TableMeter != (minToUseWithCards/2) ){
                        FakeCards.push(FakeCardsArr[i]);
                        TableMeter++;
                    }

                    if(i == min -1 && (WallMeter != (minToUseWithCards/2))){
                        // om det är ett kort som saknas i antingen TableMeter eller WallMeter så
                        // ökar vi min så att satsen fortsätter tills detta är fixat..
                        min++;
                    }
                    if(i == min -1 && (TableMeter != (minToUseWithCards/2))){
                        min++;
                    }


                }
            }

            // Kan verkligen inte förstå vad det är för något jag har försökt att göra (det avmarkerade..)
//            for(var i= 0 ; i < MaxNumberOfCards - NumberOfRealCards; i++){
//                FakeCards.splice(i,1);
//            }
            for(var i = 0; i < FakeCards.length; i++){
                //if(GameEngine.Machines.gameCardDoesNotBelongWithOtherActor(FakeCards[i])){
                        CardToUse.push(FakeCards[i]);
                //}//Disablar denna då man inte får in alla FakeCards..
            }

            return CardToUse;
        },

        getActorsCardPRIORITY : function(ArrayOfGameCards){
            //Måste se till att Korten som är satta på karaktärernas personligheter inte har "needTheseCards" bland korten, om det är fallet så
            //måste de korten vara med. Detta måste också göras när korten delas ut, så att en karaktär inte får ett kort som kräver att
            //en annan karaktär har ett kort som den karaktären inte har.
            var ArrWithPriorities = [];
            for(var i= 0; i <= GameEngine.GlobalActors.length-1; i++){ //TODO: lade till -1, krånglar det eller fungerar det?...

                for(var j = 0; j <= ArrayOfGameCards.length; j++){

                    for(var k = 0; k < GameEngine.GlobalActors[i].Intress.needTheseCards.length; k++){

                        for(var u = 0; u < ArrayOfGameCards[j].length; u++){

                            if(ArrayOfGameCards[j][u].ID == GameEngine.GlobalActors[i].Intress.needTheseCards[k].ID){
                                ArrWithPriorities.push(ArrayOfGameCards[j][u]);
                            }
                        }

                    }
                    for(var k = 0; k < GameEngine.GlobalActors[i].Other.needTheseCards.length; k++){

                        for(var u = 0; u < ArrayOfGameCards[j].length; u++){

                            if(ArrayOfGameCards[j][u].ID == GameEngine.GlobalActors[i].Other.needTheseCards[k].ID){
                                ArrWithPriorities.push(ArrayOfGameCards[j][u]);
                            }
                        }

                    }
                    for(var k = 0; k < GameEngine.GlobalActors[i].Relation.needTheseCards.length; k++){

                        for(var u = 0; u < ArrayOfGameCards[j].length; u++){

                            if(ArrayOfGameCards[j][u].ID == GameEngine.GlobalActors[i].Relation.needTheseCards[k].ID){
                                ArrWithPriorities.push(ArrayOfGameCards[j][u]);
                            }
                        }

                    }
                    for(var k = 0; k < GameEngine.GlobalActors[i].Secret.needTheseCards.length; k++){

                        for(var u = 0; u < ArrayOfGameCards[j].length; u++){

                            if(ArrayOfGameCards[j][u].ID == GameEngine.GlobalActors[i].Secret.needTheseCards[k].ID){
                                ArrWithPriorities.push(ArrayOfGameCards[j][u]);
                            }
                        }

                    }
                }
            }
            return ArrWithPriorities;

        },
        //TODO: Skapa funktion som hämtar ut de kortID till de kort som finns på Karaktärernas Personlighetskorts "NeedTheeseCards"
        //TODO; när det är avklarat så ska korten gemföras med de kort som vi tagit fram till rummen, om det är en matchning så läggs kortet in i en array som
        //TODO: skickas tillbaka. Arrayen innehåller alltså ALLA kort som krävs för att Karaktärernas MotivKort ska "Make sense". Alltså fär att en viktig dialog ska leda till en Riktig Ledtråd..

        CardNotPartInMotive : function(GameCardID){
            var Motive = GameEngine.Actives.MotiveThatIsActive;

            for(var i = 0; i < Motive.LOC_actor1.length; i++){
                if(Motive.LOC_actor1[i] == GameCardID){
                    return false;
                }
            }
            for(var i = 0; i < Motive.LOC_actor2.length; i++){
                if(Motive.LOC_actor2[i] == GameCardID){
                    return false;
                }
            }
            for(var i = 0; i < Motive.LOC_actor3.length; i++){
                if(Motive.LOC_actor3[i] == GameCardID){
                    return false;
                }
            }
            for(var i = 0; i < Motive.LOC_actor4.length; i++){
                if(Motive.LOC_actor4[i] == GameCardID){
                    return false;
                }
            }
            for(var i = 0; i < Motive.LOC_murderur.length; i++){
                if(Motive.LOC_murderur[i] == GameCardID){
                    return false;
                }
            }
            for(var i = 0; i < Motive.LOC_other.length; i++){
                if(Motive.LOC_other[i] == GameCardID){
                    return false;
                }
            }
            for(var i = 0; i < Motive.LOC_victim.length; i++){
                if(Motive.LOC_victim[i] == GameCardID){
                    return false;
                }
            }

            return true;

        }, //TODO: Använd denna metod i PlaceClues..

        placeClues : function(){
            GameObj.CheckPointsForInit.placeClues = false;
            GameEngine.GoToButtons.ClueButtons = [];
            //det första vi gör är att vi tömmer KnappArrayen för ledtrådar, på så sätt finns inga äldre/ofunktionella
            //ledtrådsknappar kvar, sen skjuts knapparna in vartefter denna metod genomförs!

            //Först väljer vi rum
            for(var i = 0; i < GameEngine.GlobalRooms.length ; i++){

                //nu måste vi välja ut källan för datan, den kan antingen komma från en person eller direkt från  GameData.GameCardsCollectionData
                var RealDataSource = [];
                var FakeDataSource = [];
                var DataSourceMixedUp = [];
                var ArrOfPossibleRoomsIDn;

                for(var d = 0; d < GameEngine.GlobalActors.length; d++){
                    //Först tar vi reda på om det finns data som ska in i rummet från Motivet, den datan ligger direkt på personerna..

                    for(var k = 0; k < GameEngine.GlobalActors[d].ClueList.length; k++){
                        //Vi hämtar ner en array med de RumIDn som kortet kan läggas in i
                        ArrOfPossibleRoomsIDn = (GameEngine.Machines.findClueCardRooms(GameEngine.GlobalActors[d].ClueList[k].ID));
                        for(var l = 0; l<ArrOfPossibleRoomsIDn.length;l++ ){
                            if(ArrOfPossibleRoomsIDn[l] == GameEngine.GlobalRooms[i].ID){ // Om True : Kortet kan ligga i rummet och pushas in i DataSource
                                RealDataSource.push(GameEngine.GlobalActors[d].ClueList[k]);
                            }else{
                                if(GameEngine.Machines.CardNotPartInMotive(GameEngine.GlobalActors[d].ClueList[k].ID)){
                                    if((GameEngine.Machines.GetAllActiveIDs()).indexOf(GameEngine.GlobalActors[d].ClueList[k].ID) == -1){
                                        FakeDataSource.push(GameEngine.GlobalActors[d].ClueList[k]);
                                    }

                                }

                            }
                        }
                        if(ArrOfPossibleRoomsIDn.length == 0){ // om kortet inte hör till något rum alls så kan det användas..
                            if(GameEngine.Machines.CardNotPartInMotive(GameEngine.GlobalActors[d].ClueList[k].ID)){
                                if((GameEngine.Machines.GetAllActiveIDs()).indexOf(GameEngine.GlobalActors[d].ClueList[k].ID) == -1){
                                    FakeDataSource.push(GameEngine.GlobalActors[d].ClueList[k]);
                                }
                            }
                        }
                    }

                }
                //Blanda upp korten som hör till motivdata med Icke relaterade kort för att få blandning på spelet..
                DataSourceMixedUp = GameEngine.Machines.mixUpClueCards(RealDataSource, FakeDataSource);

                // nu ska vi fylla alla andra placeholders.. Men först måste vi dela upp ledtrådarna i Vägg och Bord-ledtrådar..
                var TableClues= [];
                var WallClues = [];
                for(var j = 0; j < DataSourceMixedUp.length; j++){
                    if(DataSourceMixedUp[j].type == "wallclue"){
                        WallClues.push(DataSourceMixedUp[j]);

                    }else{// om det ej är WallClue så är det En TableClue..
                        TableClues.push(DataSourceMixedUp[j]);

                    }
                }
                DataSourceMixedUp = []; // tömmer arrayen för senare bruk..
                for(var j = 0; j < GameEngine.GlobalRooms[i].TableClue_GameCards.length; j++){
                    GameEngine.GlobalRooms[i].TableClue_GameCards[j].GameCardOrContent = TableClues[0];
                    GameEngine.GoToButtons.ClueButtons.push(TableClues[0]);
                    TableClues.splice(0,1);
                }
                for(var j = 0; j < GameEngine.GlobalRooms[i].WallClue_GameCards.length; j++){
                    GameEngine.GlobalRooms[i].WallClue_GameCards[j].GameCardOrContent = WallClues[0];
                    GameEngine.GoToButtons.ClueButtons.push(WallClues[0]);
                    WallClues.splice(0,1);
                }

                DataSourceMixedUp = WallClues.concat(TableClues); // lägger tillbaka resterna i DataSourceMixedUpArrayen för att Lägga in rester i Containrarna..

                //Sen börjar vi lägga in datan i de olika Containers som finns i rummen
                for(var j = 0; j < GameEngine.GlobalRooms[i].Containers.length ; j++){
                    for(var k = 0; k <= DataSourceMixedUp.length - (DataSourceMixedUp.length -1); k++ ){ //TODO: fungerar denna ? Nope.. ? RAD 654
                        GameEngine.GlobalRooms[i].Containers[j].GameCardOrContent.cardsOfContainer[k] = DataSourceMixedUp[0];
                        GameEngine.GoToButtons.ClueButtons.push(DataSourceMixedUp[0]);
                        DataSourceMixedUp.splice(0,1);
                    }
                }

                //När vi har kommit såhär långt finns det risk att vissa kort som vi hämtat inte har använts, dessa kort blir då upptagna då de ligger i
                //"GameEngine.BusyCards.ClueCards", vi måste anropa en funktion som tar bort alla kort som är lediga från den arrayen!
                GameEngine.Machines.ClearFreeRoomData();
                TableClues = [];
                WallClues = [];



            }
            //TODO: Nu ska vi faktiskt placera ut ledtrådarna.. Detta görs i en annan funktion = renderClues..
            GameObj.CheckPointsForInit.placeClues = true;
        },

        renderClues : function(RoomID){

            var RoomToFillWithClues = GameEngine.GlobalRooms[RoomID];
            for(var i = 0; i < GameEngine.GlobalRooms.length; i++){

                if(GameEngine.GlobalRooms[i].ID == RoomID){
                    RoomToFillWithClues = GameEngine.GlobalRooms[i];

                    break;
                }


            }

            //Containrarna fylls in på ALLS, detta görs istället när man rotar i en Container, endast då vill vi se
            //containerns innehåll..
            for(var j =0; j < RoomToFillWithClues.Containers.length; j++){
                var ContainerToPlace = RoomToFillWithClues.Containers[j];

                for(var k =0; k < RoomToFillWithClues.Containers.length; k++){
                    if(ContainerToPlace.GameCardOrContent.cardsOfContainer[k] != null){

                    }
                }
            }
            var ClueWidth = GameEngine.Machines.getPosition(0.05, "x");
            var ClueHeight = GameEngine.Machines.getPosition(0.05, "y");

            for(var j = 0; j < RoomToFillWithClues.TableClue_GameCards.length; j++){
                var TableClueToPlace = RoomToFillWithClues.TableClue_GameCards[j].GameCardOrContent;
                if(TableClueToPlace != null){
                    GameEngine.Machines.WindowSizing(TableClueToPlace.image,
                        "gameframe",
                        RoomToFillWithClues.TableClue_GameCards[j].PosX,
                        RoomToFillWithClues.TableClue_GameCards[j].PosY,
                        ClueWidth,
                        ClueHeight
                    );
                    RoomToFillWithClues.TableClue_GameCards[j].SizeHeight =ClueHeight;
                    RoomToFillWithClues.TableClue_GameCards[j].SizeWidth =ClueWidth;
                }


            }

            for(var j = 0; j < RoomToFillWithClues.WallClue_GameCards.length; j++){
                var WallClueToPlace = RoomToFillWithClues.WallClue_GameCards[j].GameCardOrContent;
                if(WallClueToPlace != null){
                    GameEngine.Machines.WindowSizing(WallClueToPlace.image,
                        "gameframe",
                        RoomToFillWithClues.WallClue_GameCards[j].PosX,
                        RoomToFillWithClues.WallClue_GameCards[j].PosY,
                        ClueWidth,
                        ClueHeight
                    );
                    RoomToFillWithClues.WallClue_GameCards[j].SizeHeight =ClueHeight;
                    RoomToFillWithClues.WallClue_GameCards[j].SizeWidth =ClueWidth;
                }
            }




        },

        getAllIDsOfArray : function(Array){
            var arrOfIDs = [];
            for(var i = 0; i < Array.length; i++){
                arrOfIDs.push(Array[i].ID);
            }
            return arrOfIDs.sort();
        },

        GetAllActiveIDs : function(){
            var arrOfIdInUse = [];

            for(var i = 0; i < GameEngine.GlobalRooms.length; i++){
                var RoomToCheck = GameEngine.GlobalRooms[i];

                //Kollar korten i Containrarna
                for(var j =0; j < RoomToCheck.Containers.length; j++){
                    var ContainerTOCheck= RoomToCheck.Containers[j];

                    for(var k =0; k < RoomToCheck.Containers.length; k++){
                        if(ContainerTOCheck.GameCardOrContent.cardsOfContainer[k] != null){
                            arrOfIdInUse.push(ContainerTOCheck.GameCardOrContent.cardsOfContainer[k].ID);
                        }
                    }
                }

                for(var j = 0; j < RoomToCheck.TableClue_GameCards.length; j++){
                    var TableClueCardToCheck = RoomToCheck.TableClue_GameCards[j].GameCardOrContent;
                    if(TableClueCardToCheck != null){
                        arrOfIdInUse.push(TableClueCardToCheck.ID);
                    }


                }

                for(var j = 0; j < RoomToCheck.WallClue_GameCards.length; j++){
                    var WallClueCardToCheck = RoomToCheck.WallClue_GameCards[j].GameCardOrContent;
                    if(WallClueCardToCheck != null){
                        arrOfIdInUse.push(WallClueCardToCheck.ID);
                    }
                }


            }
            return arrOfIdInUse.sort();

        },

        ClearFreeRoomData : function(){

            var CardIDToCheck;
            var ArrOfNewCardIDDataToPush = [];

            for(var j = 0; j < GameEngine.BusyCards.ClueCards.length; j++){
                CardIDToCheck = GameEngine.BusyCards.ClueCards[j];

                for(var i = 0; i < GameEngine.GlobalRooms.length; i++){

                    for(var b = 0; b < GameEngine.GlobalRooms[i].Containers.length; b++){

                        for(var c = 0; c < GameEngine.GlobalRooms[i].Containers[b].GameCardOrContent.cardsOfContainer.length; c++){
                            if(GameEngine.GlobalActors.Containers[b].GameCardOrContent.cardsOfContainer[c].ID == CardIDToCheck){
                                ArrOfNewCardIDDataToPush.push(GameEngine.GlobalActors.Containers[b].GameCardOrContent.cardsOfContainer[c].ID);
                            }
                        }
                    }

                    for(var b = 0; b < GameEngine.GlobalRooms[i].TableClue_GameCards.length; b++){
                        if(GameEngine.GlobalRooms[i].TableClue_GameCards[b].ID == CardIDToCheck){
                            ArrOfNewCardIDDataToPush.push(GameEngine.GlobalRooms[i].TableClue_GameCards[b].ID);
                        }

                    }

                    for(var b = 0; b < GameEngine.GlobalRooms[i].WallClue_GameCards.length; b++){
                        if(GameEngine.GlobalRooms[i].WallClue_GameCards[b].ID == CardIDToCheck){
                            ArrOfNewCardIDDataToPush.push(GameEngine.GlobalRooms[i].WallClue_GameCards[b].ID);
                        }

                    }


                }

            }
            // När all data som används skjutits in i arrayen så kan vi tömma arrayen "GameEngine.BusyCards.ClueCards",
            // och sedan skjuta in datan vi samlat upp här där istället!

            GameEngine.BusyCards.ClueCards = [];

            for(var i = 0; i < ArrOfNewCardIDDataToPush.length; i++){
                GameEngine.BusyCards.ClueCards.push(ArrOfNewCardIDDataToPush[i]);
            }


        },

        roleGetter : function(RoleID){
            //roleGetter hämtar ut rätt roll beroende vilket ID som skickas hit, denna funktion är designad
            // efter Arrayen "RandomMurderMotive" i SelectRandomMotive funktionen.
            switch (RoleID){
                case 0:
                    return "other";
                    break;
                case 1:
                    return "murder";
                    break;
                case 2:
                    return "victim";
                    break;
                case 3:
                    return "actor1";
                    break;
                case 4:
                    return "actor2";
                    break;
                case 5:
                    return "actor3";
                    break;
                case 6:
                    return "actor4";
                    break;
            }
        },

        GiveActorsRole : function(RandomMurderMotive, role){
            var roleIsSet=false;
            var roleToTest;

            var minValue = 3;
            var maxValue = 8;

            //var LoopThisManyTimes = Math.floor(Math.random() *( maxValue - minValue) + minValue);//TODO: Problem med Actor? ta bort "( maxValue - minValue)" och ersätt med "maxValue"
            //OLD ^, denna ändrar jag på för att nu vill jag istället att ALLA kort ska läggas in på Actors, eftersom jag sköter uppdelningen på ett annat ställe..
            var LoopThisManyTimes = Math.floor( (GameEngine.Machines.getAllPossibleCards("clue")).length/GameEngine.GlobalActors.length);

            //TODO: Är Karaktärens ClueCard problematiska ? denna kan behövas schysteras..
            while(roleIsSet == false){
                //Hämtar ner en slumpad roll att testa
                roleToTest = GameEngine.GlobalActors[Math.floor(Math.random() * (GameEngine.GlobalActors.length) + 0)];

                //Testar om rollen är ledig
                if(GameEngine.Machines.TestIfRoleIsFree(roleToTest)){

                    //Om rollen är ledig och detta är Mördarens kort så ska rollen sättas som mördare, Samma sak för Victim..
                    //De andrar rollerna sätts också..
                    if(role == "murder"){
                        roleToTest.isMurder = true;
                        roleToTest.role = GameEngine.Enums.Roles.murder;
                    }
                    if(role == "victim"){
                        roleToTest.isVictim = true;
                        roleToTest.role = GameEngine.Enums.Roles.victim;
                    }
                    if(role == "other"){
                        roleToTest.role = GameEngine.Enums.Roles.other;
                    }
                    if(role == "actor1"){
                        roleToTest.role = GameEngine.Enums.Roles.actor1;
                    }
                    if(role == "actor2"){
                        roleToTest.role = GameEngine.Enums.Roles.actor2;
                    }
                    if(role == "actor3"){
                        roleToTest.role = GameEngine.Enums.Roles.actor3;
                    }
                    if(role == "actor4"){
                        roleToTest.role = GameEngine.Enums.Roles.actor4;
                    }

                    //Rollen är ledig, nu ska vi ge rollens ens egenskaper
                    roleToTest.Secret   = GameEngine.Machines.getGameCardFromMotiveData(GameEngine.Enums.GameCardType.Secret,RandomMurderMotive,"person");
                    roleToTest.Other    = GameEngine.Machines.getGameCardFromMotiveData(GameEngine.Enums.GameCardType.Other,RandomMurderMotive,"person");
                    roleToTest.Intress  = GameEngine.Machines.getGameCardFromMotiveData(GameEngine.Enums.GameCardType.Intress,RandomMurderMotive,"person");
                    roleToTest.Relation = GameEngine.Machines.getGameCardFromMotiveData(GameEngine.Enums.GameCardType.Relationship,RandomMurderMotive,"person");
                    //TODO: This \/
                    //roleToTest.ClueList = GameEngine.Machines.getGameCardFromMotiveData(GameEngine.Enums.GameCardType.TableClue,RandomMurderMotive,"person");
                    //var ClueSpecial = GameEngine.Enums.ClueType.TableClue || GameEngine.Enums.ClueType.WallClue;
                    //TODO: kolla om ^ är oduglig..
                    for(var i = 0; i < LoopThisManyTimes; i++){//Denna forloop bestämmer hur många Ledtrådar en karaktär har, max och min enligt minValue och maxValue..
                        roleToTest.ClueList.push(GameEngine.Machines.getGameCardFromMotiveData("clue",RandomMurderMotive,"clue"));
                    }


                    roleIsSet = true;
                }

            }

        },

        gameCardDoesNotBelongInOtherRoom : function(GameCardToTest){
            //denna funktion ser till att kortet man skickar in inte redan finns i ett annat rum!

            for(var i = 0; i < GameEngine.GlobalRooms.length; i++){
                var RoomToCheck = GameEngine.GlobalRooms[i];

                //Kollar korten i Containrarna
                for(var j =0; j < RoomToCheck.Containers.length; j++){
                    var ContainerTOCheck= RoomToCheck.Containers[j];

                    for(var k =0; k < RoomToCheck.Containers.length; k++){
                        if(ContainerTOCheck.GameCardOrContent.cardsOfContainer[k] != null){
                            if(ContainerTOCheck.GameCardOrContent.cardsOfContainer[k].ID == GameCardToTest.ID){
                                return false;
                            }
                        }
                    }
                }

                for(var j = 0; j < RoomToCheck.TableClue_GameCards.length; j++){
                    var TableClueCardToCheck = RoomToCheck.TableClue_GameCards[j].GameCardOrContent;
                    if(TableClueCardToCheck != null){
                        if(TableClueCardToCheck.ID == GameCardToTest.ID){
                            return false;
                        }
                    }


                }

                for(var j = 0; j < RoomToCheck.WallClue_GameCards.length; j++){
                    var WallClueCardToCheck = RoomToCheck.WallClue_GameCards[j].GameCardOrContent;
                    if(WallClueCardToCheck != null){
                        if(WallClueCardToCheck.ID == GameCardToTest.ID){
                            return false;
                        }
                    }
                }


            }
            return true;


        },

        gameCardDoesNotBelongWithOtherActor : function(GameCardToTest){
            //Denna funktion returnerar True om kortet inte används av någon annan Karaktär.

            for(var i = 0; i < GameEngine.GlobalActors.length; i++){ //TODO: Tog bort -1 här, gick det bra?
                //Går igenom varje karaktär, en i taget.

                //Testar så att Kortet ej är null, om kortet är null kan vi ej testa dens ID...
                if(GameEngine.GlobalActors[i].Secret != null){
                    //Kollar om kortet är samma kort som man testar
                    if(GameEngine.GlobalActors[i].Secret.ID == GameCardToTest.ID){
                        return false;
                    }
                }

                if(GameEngine.GlobalActors[i].Other != null){
                    if(GameEngine.GlobalActors[i].Other.ID == GameCardToTest.ID){
                        return false;
                    }
                }

                if(GameEngine.GlobalActors[i].Intress != null){
                    if(GameEngine.GlobalActors[i].Intress.ID == GameCardToTest.ID){
                        return false;
                    }
                }

                if(GameEngine.GlobalActors[i].Intress != null){
                    if(GameEngine.GlobalActors[i].Intress.ID == GameCardToTest.ID){
                        return false;
                    }
                }
                if(GameEngine.GlobalActors[i].Relation != null){
                    if(GameEngine.GlobalActors[i].Relation.ID == GameCardToTest.ID){
                        return false;
                    }
                }
                if(GameEngine.GlobalActors[i].ClueList != 0){ //denna blir ej null om tom utan istället 0, PGA array...
                    for(var j = 0; j < GameEngine.GlobalActors[i].ClueList.length ; j++){ //TODO: tog bort -1 här också, blev det bättre?
                        if(GameEngine.GlobalActors[i].ClueList[j].ID == GameCardToTest.ID){
                            return false;
                        }
                    }
                }


            }

            //Om inte False har returnerats vid det här läget så har ingen kortet och kortet betraktas som ledigt och True kan returneras..!
            return true;

        },

        getGameCardFromMotiveData : function(TypeIWant, RandomMurderMotive, PersonOrClue){
            //Tar fram ett kort av en viss typ som finns inom "RandomMurderMotive" som skickas med..
            var MotiveChoosen = false;
            var GameCardIDToTest;
            var ArrOfTypesThatIWant = [];
            var RandomFromArrOfTypesThatIWant;
            var TypeThatIWantBETTER;
            //GameData.GameCardsCollectionData




            //Denna  plockar fram de kort som är av  typen "TypeIWant", alltså "Secret", "Other", "Intress", "Relation", "ClueList"..
            //och som finns i listan av Ledtrådåar/PersonlighetsSaker som hör till motivet..
            for(var i = 0; i < RandomMurderMotive.length; i++){

                GameCardIDToTest = GameEngine.Machines.getGameCardFromID(RandomMurderMotive[i],PersonOrClue);
                //TODO: göra så att ^ tar ett slumpat kort ist för bestämt..? ..

                //Fix för Clue
                if(TypeIWant == "clue"){
                    TypeThatIWantBETTER = (GameEngine.Enums.ClueType.TableClue == GameCardIDToTest.type || GameEngine.Enums.ClueType.WallClue == GameCardIDToTest.type);
                }else{
                    TypeThatIWantBETTER = (TypeIWant == GameCardIDToTest.type);
                }

                if(TypeThatIWantBETTER){
                    //Arrayen vi bygger här kommer innehålla alla kort av den typen som efterfrågas
                    ArrOfTypesThatIWant.push(GameCardIDToTest);
                }
            }


            if(ArrOfTypesThatIWant.length == 0){
                //om motivet inte innehåller någon av den efterfrågade så ska ett slumpat kort väljas istället!
                return GameEngine.Machines.loggNewRandom(PersonOrClue,TypeIWant);

            }else{
                var Logging = [];
                while(true){
                    //Väljer slumpat kort från arrayen med kort som efterfrågas och finns i motivdatan..
                    RandomFromArrOfTypesThatIWant = ArrOfTypesThatIWant[Math.floor(Math.random() * (ArrOfTypesThatIWant.length) + 0)];

                    //om kortet inte tillhör en annan spelare så kan vi använda kortet, kortet skickas tillbaka..
                    if(GameEngine.Machines.gameCardDoesNotBelongWithOtherActor(RandomFromArrOfTypesThatIWant)){
                        return RandomFromArrOfTypesThatIWant;
                    }


                    //Vi ska "logga" alla försök som ej går.., så att om alla kort tillslut blivit tagna och
                    //inga kort finns kvar så ska man ej fastna i denna loop..

                    if(Logging.indexOf(RandomFromArrOfTypesThatIWant.ID) == -1){
                        //Den loggar bara sånt som inte finns i Loggingen...
                        // om något inte finns så kommer IndexOf bli -1 ..
                        Logging.push(RandomFromArrOfTypesThatIWant.ID);
                    }


                    if(Logging.length == ArrOfTypesThatIWant.length ){
                        //om den redan testat alla möjliga försök så ska ett "random" kort väljas istället...

                        return GameEngine.Machines.loggNewRandom(PersonOrClue,TypeIWant);
                    }

                }

            }
                //GameCardIDToTest = RandomMurderMotive[Math.floor(Math.random() * (RandomMurderMotive.length - 1) + 0)];
        },

        loggNewRandom : function(PersonOrClue,TypeIWant){

            var GameCardToSendBack;
            var i = 0;
            var CardsToLog = [];

            while(true){
                GameCardToSendBack = GameEngine.Machines.getRandomCardByType(TypeIWant, PersonOrClue);//hämtar GameCardet att testa //GameEngine.Machines.getGameCardFromID(i,PersonOrClue);
                //TODO: är denna rätt? skriv om ^så att den hämtar ett slumpat istället för "Första bästa"..

                //TODO: Se till att Kort som slumpas nya inte finns bland de arrayerna i RandomMurderMotive Arrayen..

                //TODO: se till att spelare inte kan få samma kort som en annan spelare redan har fått..
//                if(GameEngine.Machines.CardIsNotInMotives(GameCardToSendBack)){ //Denna måste returnera true då vi inte vill välja kort som finns i MotivDatan om vi ska välja ett nytt kort..

                    if(CardsToLog.indexOf(GameCardToSendBack.ID) == -1){//if satsen = om kortId't inte finns i arrayen som lagrar kortID'n som har testats..
                        //: Här måste jag se till att logga de kortID'n som testas, på så sätt så behöver jag inte
                        //: räkna de kort som redan har testats flera gånger...

                        CardsToLog.push(GameCardToSendBack.ID);

                        if(GameCardToSendBack.ID != -1 ){// om det inte är ett ogiltigt Kort så fortsätt..
  //                          if(GameEngine.Machines.gameCardDoesNotBelongWithOtherActor(GameCardToSendBack)){
                                // Om denna är true så är kortet ledigt och kan användas! och blir därför det kortet som skickas tillbaka..
                                return GameCardToSendBack;
   //                         }
                        }

                        i++;
                        if(i > GameData.GameCardsCollectionData.length){ //Här "borde" det stå "-1", men eftersom jag kastar in ett kort som ej hör till längeden av GameCardsCollectionData så plussar jag på 1.. (kortet som har ID -1..
                            //alert("WHOOPS! Det finns inga mer kort som är lediga, 'GetGameCardFromMotiveData' ");
                            console.log("WHOOPS! Det finns inga mer kort som är lediga, 'GetGameCardFromMotiveData' ");

                            //Denna orskar att vissa kort blir Undefined.. Och har att göra med att det inte finns
                            //tillräckligt mycket  data som jag testar med..

                            break;
                        }
                    }
//                }


            }
        },

        CardIsNotInMotives : function(GameCardToTest){

            for(var i =0; i < GameEngine.DataPlaceHolder.length ;i++){

                for(var j = 0; j < GameEngine.DataPlaceHolder[i].length; j++){
                    if(GameEngine.DataPlaceHolder[i][j] == GameCardToTest.ID){
                        return false; //Retrunerar false om kortet finns i motivdatan..
                    }
                }
            }
            return true; //returnerar true om kortet inte hittades i motivdatan.

        },

        getRandomCardByType : function(TypeIWant, PersonOrClue){


            GameData.GameCardsCollectionData
            var randomNmbr = 0;
            var CardToTry;
            var toTry;

            while(true){
                //Tar fram ett slumpat tal för att få fram slumpat kort..
                randomNmbr = Math.round(Math.random() * (GameData.GameCardsCollectionData.length -1) + 0);

                //tar fram GameCardet beroende på var det finns..
                if(GameData.GameCardsCollectionData[randomNmbr].ID == undefined){
                    CardToTry = GameData.GameCardsCollectionData[randomNmbr].theGameCard;
                }else{
                    CardToTry = GameData.GameCardsCollectionData[randomNmbr];
                }


                if(TypeIWant == "clue"){
                    toTry = CardToTry.type == GameEngine.Enums.ClueType.TableClue || CardToTry.type == GameEngine.Enums.ClueType.WallClue;
                }else{
                    toTry = TypeIWant == CardToTry.type;
                }
                if(toTry){
                    return  CardToTry;
                }


            }


        },

        getGameCardFromID : function(GameCardID, PersonOrClue){
            //Denna funktion tar fram ett GameCard Beroende vilket kortID kortet har och om den är ett Person eller Clue-kort..
            var GameCardToCheck;
            var TypeThatIWantBETTER;

            for(var i = 0; i < GameData.GameCardsCollectionData.length; i++){
                GameCardToCheck = GameData.GameCardsCollectionData[i];

                if(PersonOrClue == "Person" || PersonOrClue == "person" ){// Om kortets ID är undefined så är det ett ledtrådskort..
                    if(GameCardToCheck.ID != undefined){
                        if(GameCardToCheck.ID == GameCardID){
                            //returnerar tillbaka rätt kort
                            return GameCardToCheck;
                        }
                    }
                }

                if(PersonOrClue == "Clue" || PersonOrClue =="clue"){// Om kortets ID är undefined så är det ett personskort..
                    if(GameCardToCheck.theGameCard != undefined){
                        if(GameCardToCheck.theGameCard.ID != undefined){
                            if(GameCardToCheck.theGameCard.ID == GameCardID){
                                //returnerar tillbaka rätt kort
                                return GameCardToCheck.theGameCard;
                            }

                        }
                    }
                }

            }

            //om inte något hittas så måste vi returnera ett Tomt gamecard annars kvaddar getGameCardFromMotiveData-funktionen

            return new GameEngine.Classes.GameCard(-1,null,"null",[],"",[]);
            //^denna kommer att returnera ett GameCard med ID't -1 vilket som inte accepteras någonstanns..
            //Genom att göra detta så får vi inget felmeddelande, och ingen vill använda detta kort så det är ingen fara..

        },

        TestIfRoleIsFree : function(roleToTest){

            if(roleToTest.Secret != null){
                return false;
            }
            else if(roleToTest.Other != null){
                return false;
            }
            else if(roleToTest.Intress != null){
                return false;
            }
            else if(roleToTest.Relation != null){
                return false;
            }else{
                return true;
            }
            return true;
        },
		
		ReadInRooms : function(){
            GameObj.CheckPointsForInit.ReadInRooms = false;
            // Funktion som laddar in alla rum + rumdatan..
            //Skapar alla rummen och sparar ner dem i GlobalRooms arrayen..

			var bathroom = new GameEngine.Classes.Room(
                13,
                "Data/Map/BathRoom/bathroom.png",
                "Bathroom",
                [//WaypointsArr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(3,"Data/Hudd/backbutton.png","Hallway End"),
                        0, //XPosition
                        0  //YPosition
                    )
                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.35777126099706746, "x"),
                        GameEngine.Machines.getPosition(0.6298310907529344 , "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/cabinet.png"),
                        GameEngine.Machines.getPosition(0.7438905180840665, "x"),
                        GameEngine.Machines.getPosition(0.1419982822788434, "y"),
                        GameEngine.Machines.getPosition(0.09579667644183776, "x"),
                        GameEngine.Machines.getPosition(0.22330375035785857, "y")
                    )
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.6754643206256109, "x"),
                        GameEngine.Machines.getPosition(0.5073003149155454, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.1906158357771261 , "x"),
                        GameEngine.Machines.getPosition(0.6298310907529344, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.9022482893450635 , "x"),
                        GameEngine.Machines.getPosition(0.7672487832808474, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.30303030303030304  , "x"),
                        GameEngine.Machines.getPosition(0.4901231033495563, "y")
                    )
                ],
                [//WallClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.5425219941348973 , "x"),
                        GameEngine.Machines.getPosition(0.1843687374749499, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.8426197458455523 , "x"),
                        GameEngine.Machines.getPosition(0.05840251932436301, "y")
                    )

                ]
            );
			var prebedroom = new GameEngine.Classes.Room(
                4,
                "Data/Map/PreBedroom/prebedroom.png",
                "Bedroom Corridor",
                [
//                    new GameEngine.Classes.PlaceHolder(
//                        new GameEngine.Classes.WayPoint(2,"Data/Hudd/backbutton.png","Hallway End"),
//                        50, //XPosition
//                        60  //YPosition
//                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(2,"Data/Hudd/backbutton.png", "Hallway"),
                        0, //XPosition
                        0  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(5,"Data/Map/Bedrom_1/doors_1-left.png", "Bedroom 1"),
                        GameEngine.Machines.getPosition(0.0075  , "x"), //XPosition
                        0  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(6,"Data/Map/Bedrom_2/doors_2-left.png", "Bedroom 2"),
                        GameEngine.Machines.getPosition(0.23558162267839688, "x"), //XPosition
                        GameEngine.Machines.getPosition(0.17406241053535643  , "y")  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(7,"Data/Map/Bedrom_3/doors_3-left.png", "Bedroom 3"),
                        GameEngine.Machines.getPosition(0.3313782991202346  , "x"), //XPosition
                        GameEngine.Machines.getPosition(0.2565130260521042, "y")  //YPosition
                    ),

                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(8,"Data/Map/Bedrom_4/doors_1-right.png", "Bedroom 4"),
                        GameEngine.Machines.getPosition(0.8367546432062561   , "x"), //XPosition
                        0  //YPosition

                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(9,"Data/Map/Bedrom_5/doors_2-right.png", "Bedroom 5"),
                        GameEngine.Machines.getPosition(0.7047898338220919, "x"), //XPosition
                        GameEngine.Machines.getPosition(0.17406241053535643 , "y")  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(10,"Data/Map/Bedrom_6/doors_3-right.png", "Bedroom 6"),
                        GameEngine.Machines.getPosition(0.6412512218963832, "x"), //XPosition
                        GameEngine.Machines.getPosition(0.2565130260521042 , "y")  //YPosition

                    )
                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.4232649071358749, "x"),
                        GameEngine.Machines.getPosition(0.4683653020326367, "y"),
                        GameEngine.Machines.getPosition(0.05, "x"),
                        GameEngine.Machines.getPosition(0.07, "y")
                    )
                    /*,
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/placeholder.png"),
                        GameEngine.Machines.getPosition(0.5865102639296188 , "x"),
                        GameEngine.Machines.getPosition(0.3103349556255368, "y"),
                        GameEngine.Machines.getPosition(0.03, "x"),
                        GameEngine.Machines.getPosition(0.15, "y")
                    )*/
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.5601173020527859 , "x"),
                        GameEngine.Machines.getPosition(0.63670197537933, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.40078201368523947 , "x"),
                        GameEngine.Machines.getPosition(0.5531062124248497, "y")
                    )
                ],
                [//WallClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.46236559139784944 , "x"),
                        GameEngine.Machines.getPosition(0.3114801030632694, "y")
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

                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.7086999022482894, "x"),
                        GameEngine.Machines.getPosition(0.6069281419982823, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/transparens.png"),
                        GameEngine.Machines.getPosition(0.002932551319648094  , "x"),
                        GameEngine.Machines.getPosition(0.24506155167477814, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.56, "y")
                    )
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.7311827956989247, "x"),
                        GameEngine.Machines.getPosition(0.5508159175493845, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.21114369501466276 , "x"),
                        GameEngine.Machines.getPosition(0.5210420841683366, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.42424242424242425 , "x"),
                        GameEngine.Machines.getPosition(0.6080732894360149, "y")
                    )
                ],
                [//WallClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.5591397849462365 , "x"),
                        GameEngine.Machines.getPosition(0.280561122244489, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.270772238514174, "x"),
                        GameEngine.Machines.getPosition(0.25765817348983683, "y")
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

                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.20625610948191594 , "x"),
                        GameEngine.Machines.getPosition(0.6504437446321214, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/transparens.png"),
                        GameEngine.Machines.getPosition(0.9100684261974584  , "x"),
                        GameEngine.Machines.getPosition(0.27483538505582594, "y"),
                        GameEngine.Machines.getPosition(0.075, "x"),
                        GameEngine.Machines.getPosition(0.56, "y")
                    )
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.16129032258064516, "x"),
                        GameEngine.Machines.getPosition(0.5485256226739192, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.7204301075268817 , "x"),
                        GameEngine.Machines.getPosition(0.5210420841683366, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.46529814271749753 , "x"),
                        GameEngine.Machines.getPosition(0.619524763813341, "y")
                    )
                ],
                [//WallClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.26295210166177907 , "x"),
                        GameEngine.Machines.getPosition(0.2691096478671629, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.6217008797653959, "x"),
                        GameEngine.Machines.getPosition(0.2691096478671629, "y")
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

                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.20625610948191594 , "x"),
                        GameEngine.Machines.getPosition(0.6504437446321214, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/transparens.png"),
                        GameEngine.Machines.getPosition(0.9100684261974584  , "x"),
                        GameEngine.Machines.getPosition(0.27483538505582594, "y"),
                        GameEngine.Machines.getPosition(0.075, "x"),
                        GameEngine.Machines.getPosition(0.56, "y")
                    )
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.7311827956989247, "x"),
                        GameEngine.Machines.getPosition(0.5508159175493845, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.21114369501466276 , "x"),
                        GameEngine.Machines.getPosition(0.5210420841683366, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.42424242424242425 , "x"),
                        GameEngine.Machines.getPosition(0.6080732894360149, "y")
                    )
                ],
                [//WallClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.5591397849462365 , "x"),
                        GameEngine.Machines.getPosition(0.280561122244489, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.270772238514174, "x"),
                        GameEngine.Machines.getPosition(0.25765817348983683, "y")
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
                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.7086999022482894, "x"),
                        GameEngine.Machines.getPosition(0.6069281419982823, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/transparens.png"),
                        GameEngine.Machines.getPosition(0.002932551319648094  , "x"),
                        GameEngine.Machines.getPosition(0.24506155167477814, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.56, "y")
                    )
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.7311827956989247, "x"),
                        GameEngine.Machines.getPosition(0.5508159175493845, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.21114369501466276 , "x"),
                        GameEngine.Machines.getPosition(0.5210420841683366, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.42424242424242425 , "x"),
                        GameEngine.Machines.getPosition(0.6080732894360149, "y")
                    )
                ],
                [//WallClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.5591397849462365 , "x"),
                        GameEngine.Machines.getPosition(0.280561122244489, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.270772238514174, "x"),
                        GameEngine.Machines.getPosition(0.25765817348983683, "y")
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
                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.19452590420332355 , "x"),
                        GameEngine.Machines.getPosition(0.6744918408245062, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/transparens.png"),
                        GameEngine.Machines.getPosition(0.002932551319648094  , "x"),
                        GameEngine.Machines.getPosition(0.24506155167477814, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.56, "y")
                    )
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.7311827956989247, "x"),
                        GameEngine.Machines.getPosition(0.5508159175493845, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.21114369501466276 , "x"),
                        GameEngine.Machines.getPosition(0.5210420841683366, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.42424242424242425 , "x"),
                        GameEngine.Machines.getPosition(0.6080732894360149, "y")
                    )
                ],
                [//WallClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.5591397849462365 , "x"),
                        GameEngine.Machines.getPosition(0.280561122244489, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.270772238514174, "x"),
                        GameEngine.Machines.getPosition(0.25765817348983683, "y")
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
                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.7286999022482894, "x"),
                        GameEngine.Machines.getPosition(0.6869281419982823, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/transparens.png"),
                        GameEngine.Machines.getPosition(0.9100684261974584  , "x"),
                        GameEngine.Machines.getPosition(0.27483538505582594, "y"),
                        GameEngine.Machines.getPosition(0.075, "x"),
                        GameEngine.Machines.getPosition(0.56, "y")
                    )
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.7311827956989247, "x"),
                        GameEngine.Machines.getPosition(0.5508159175493845, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.21114369501466276 , "x"),
                        GameEngine.Machines.getPosition(0.5210420841683366, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.42424242424242425 , "x"),
                        GameEngine.Machines.getPosition(0.6080732894360149, "y")
                    )
                ],
                [//WallClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.5591397849462365 , "x"),
                        GameEngine.Machines.getPosition(0.280561122244489, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.270772238514174, "x"),
                        GameEngine.Machines.getPosition(0.25765817348983683, "y")
                    )
                ]
            );
			var hallway1 = new GameEngine.Classes.Room(
                1,
                "Data/Map/Hallway_1/hallway_1.png",
                "Hallway entrance",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(1,"Data/Hudd/backbutton.png", "Hallway entrance"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(2,GameData.GameDataImages.prevButton.src, "Hallway"),
                        GameEngine.Machines.getPosition(0.46375 , "x"), //XPosition
                        GameEngine.Machines.getPosition(0.259, "y"),  //YPosition
                        GameEngine.Machines.getPosition(0.035, "x"),
                        GameEngine.Machines.getPosition(0.035, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(11,"Data/Map/Kitchen/door.png", "Kitchen"),
                        GameEngine.Machines.getPosition(0.4995112414467253, "x"),//XPosition
                        GameEngine.Machines.getPosition(0.3080446607500716, "y")
                            //YPosition
                    )

                ],
                [//ContainersArr
                    //No Containers for Hallways..
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.6089931573802542, "x"),
                        GameEngine.Machines.getPosition(0.683653020326367, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.14565004887585534 , "x"),
                        GameEngine.Machines.getPosition(0.2129974234182651 , "y")
                    )
                ],
                [//WallClueArr

                ]
            );
			var hallway2 = new GameEngine.Classes.Room(
                2,
                "Data/Map/Hallway_2/hallway_2.png",
                "Hallway",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(1,"Data/Hudd/backbutton.png", "Hallway entrance"),
                        50, //XPosition
                        60  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(4,"Data/Map/PreBedroom/doors_2-left.png", "Bedroom Corridor"),
                        GameEngine.Machines.getPosition(0.24125, "x"), //XPosition
                        GameEngine.Machines.getPosition(0.17406241053535643, "y")//YPosition


                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(3,GameData.GameDataImages.nextButton.src, "Hallway End"),
                        GameEngine.Machines.getPosition(0.54625, "x" ), //XPosition
                        GameEngine.Machines.getPosition(0.26, "y" ),//YPosition
                        GameEngine.Machines.getPosition(0.035, "x"), //Bredd
                        GameEngine.Machines.getPosition(0.035, "y") //Höjd
                    )

                ],
                [//ContainersArr
                    //No Containers for Hallways..
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.3763440860215054, "x"),
                        GameEngine.Machines.getPosition(0.6012024048096193, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.6940371456500489  , "x"),
                        GameEngine.Machines.getPosition(0.5198969367306041  , "y")
                    )
                ],
                [//WallClueArr

                ]
            );
			var hallway3 = new GameEngine.Classes.Room(
                3,
                "Data/Map/Hallway_3/hallway_3.png",
                "Hallway End",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(2,"Data/Hudd/backbutton.png", "Hallway"),
                        0,
                        0
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(13,"Data/Map/BathRoom/doors_3-right.png", "Bathroom"),
                        GameEngine.Machines.getPosition(0.64125, "x"), //XPosition
                        GameEngine.Machines.getPosition(0.25765817348983683, "y")  //YPosition

                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(12,"Data/Map/TvRoom/door.png", "Tv-Room"),
                        GameEngine.Machines.getPosition(0.4633431085043988, "x"), //XPosition
                        GameEngine.Machines.getPosition(0.30689951331233895, "y")  //YPosition
                    )

                ],
                [//ContainersArr
                    //No Containers for Hallways..
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.31867057673509286 , "x"),
                        GameEngine.Machines.getPosition(0.6882336100772974, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.6871945259042033, "x"),
                        GameEngine.Machines.getPosition(0.5737188663040367, "y")
                    )
                ],
                [//WallClueArr

                ]
            );
			var kitchen  = new GameEngine.Classes.Room(
                11,
                "Data/Map/Kitchen/kitchen.png",
                "Kitchen",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(1,"Data/Hudd/backbutton.png", "Hallway entrance"),
                        50, //XPosition
                        60  //YPosition
                    )

                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.3890518084066471, "x"),
                        GameEngine.Machines.getPosition(0.4019467506441454, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/transparens.png"),
                        GameEngine.Machines.getPosition(0.6256109481915934, "x"),
                        GameEngine.Machines.getPosition(0.14543372459204124, "y"),
                        GameEngine.Machines.getPosition(0.35, "x"),
                        GameEngine.Machines.getPosition(0.15, "y")
                    )
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.6334310850439883 , "x"),
                        GameEngine.Machines.getPosition(0.6298310907529344, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.29227761485826004, "x"),
                        GameEngine.Machines.getPosition(0.4649298597194389, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.8240469208211144  , "x"),
                        GameEngine.Machines.getPosition(0.16146578872029774 , "y")
                    )
                ],
                [//WallClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.08993157380254155 , "x"),
                        GameEngine.Machines.getPosition(0.17520755797308904, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.4780058651026393, "x"),
                        GameEngine.Machines.getPosition(0.21643286573146292, "y")
                    )
                ]
            );
			var tvroom = new GameEngine.Classes.Room(
                12,
                "Data/Map/TvRoom/tvroom.png",
                "Tv-Room",
                [
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(3,"Data/Hudd/backbutton.png", "Hallway End"),
                        50, //XPosition
                        60  //YPosition
                    )

                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.635386119257087, "x"),
                        GameEngine.Machines.getPosition(0.5198969367306041, "y"),
                        GameEngine.Machines.getPosition(0.06, "x"),
                        GameEngine.Machines.getPosition(0.08, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/transparens.png"),
                        GameEngine.Machines.getPosition(0.12903225806451613 , "x"),
                        GameEngine.Machines.getPosition(0.31949613512739766, "y"),
                        GameEngine.Machines.getPosition(0.24, "x"),
                        GameEngine.Machines.getPosition(0.07, "y")
                    )
                ],
                [//TableClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.44574780058651026, "x"),
                        GameEngine.Machines.getPosition(0.598912109934154, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.8084066471163245, "x"),
                        GameEngine.Machines.getPosition(0.7477812768393931, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.9130009775171065, "x"),
                        GameEngine.Machines.getPosition(0.5886057829945606, "y")
                    )
                ],
                [//WallClueArr
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.46236559139784944 , "x"),
                        GameEngine.Machines.getPosition(0.1820784425994847, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        null,
                        GameEngine.Machines.getPosition(0.004887585532746823, "x"),
                        GameEngine.Machines.getPosition(0.2267391926710564, "y")
                    )
                ]
            );
			GameEngine.GlobalRooms.push(hallway1,hallway2,hallway3,prebedroom,bedroom1,bedroom2,bedroom3,bedroom4,bedroom5,bedroom6,kitchen,tvroom,bathroom);
            GameObj.CheckPointsForInit.ReadInRooms = true;
		},
		
		BuildRoom : function(RoomID){
            GameObj.CheckPointsForInit.BuildRoom = false;
            var RoomToLoad;
            GameEngine.GoToButtons.BlippButtons = []; //rensar BlippButtons..
            GameEngine.Actives.ClueButtonsOn = true; //aktiverar ledtrådar..

            for(var i = 0; i < GameEngine.GlobalRooms.length; i++){//hittar rummet med det ID man söker efter
                if(GameEngine.GlobalRooms[i].ID == RoomID){
                    RoomToLoad = GameEngine.GlobalRooms[i];
                    break;
                }
            }
            if(RoomToLoad == undefined){
                alert("Whops! Rummet hittades inte.. Se till att verkligt ID skickas..");
            }else{

                //Laddar rumbilden
                GameEngine.Machines.WindowSizing(RoomToLoad.image, "",0,0,ScreenSpec.SizeX,ScreenSpec.gameFrameY); //ScreenSpec.gameFrameY för att resten är hudd.. (tog bort 150 från ScreenSpec.PosY först..)
                //Laddar bakgrund till Hudden
                GameEngine.Machines.WindowSizing(GameData.GameDataImages.HuddBackground,"hudd", 0,ScreenSpec.gameFrameY);
                //Laddar in knappar > BakåtKnappen
                GameEngine.Machines.placeBackButton(RoomToLoad.WayPoints[0].GameCardOrContent.GoToRoom);

                //Kollar om det finns mer WayPoints, om det finns så ska knapparna placeras ut!
                for(var i = 1; i < RoomToLoad.WayPoints.length ; i++){ // i = 1 pga att WayPoint 0 alltid är för bakåt knappen..
                    GameEngine.Machines.placeWayPoint(RoomToLoad.WayPoints[i]);
                    //OBS "RoomToLoad.WayPoints" <-kan vara missledande. är en Placeholder som
                    //innehåller en waypoint!
                }

                //Kollar om det finns Containers och placerar ut dem.
                for(var i = 0; i < RoomToLoad.Containers.length; i++ ){
                    GameEngine.Machines.placeContainers(RoomToLoad.Containers[i]);
                }
            }
            GameEngine.Actives.RoomThatIsActive = RoomToLoad;
            GameEngine.Machines.renderClues(RoomToLoad.ID);
            GameEngine.Machines.PlayersHuddUpdate(); //Uppdaterar Hudden..
            GameEngine.Machines.CreateActorInRoomComponent(); //laddar actors i rummet..
            GameObj.CheckPointsForInit.BuildRoom = true;

		},

        placeContainers : function(PlaceholderWithContent){
            var width, height;
            if(PlaceholderWithContent.SizeWidth == undefined || PlaceholderWithContent.SizeHeight == undefined){
                height = PlaceholderWithContent.GameCardOrContent.image.height;
                width = PlaceholderWithContent.GameCardOrContent.image.width;
            }else{
                width = PlaceholderWithContent.SizeWidth;
                height = PlaceholderWithContent.SizeHeight;
            }

              GameEngine.Machines.WindowSizing(
                  PlaceholderWithContent.GameCardOrContent.image,
                  "gameframe",
                  PlaceholderWithContent.PosX,
                  PlaceholderWithContent.PosY,
                  width,
                  height

              );
            GameEngine.GoToButtons.ContainerButton.push(PlaceholderWithContent);
        },

        clearRoomData : function(){
            GameEngine.GoToButtons.backButton = ""; // Tömmer knappen
            GameEngine.GoToButtons.WayPoints = []; //Tömmer waypoints
            GameEngine.GoToButtons.ContainerButton = [];
            GameEngine.GoToButtons.prevOrNextButton = [];

        },

        placeWayPoint : function(PlaceholderWithContent){
            var widthOfObj;
            var heighOfObj;

            //TODO: stänger av funktionen av anpassning på bilder efter

            if(PlaceholderWithContent.SizeWidth == undefined || PlaceholderWithContent.SizeHeight == undefined){
                widthOfObj = PlaceholderWithContent.GameCardOrContent.image.width / (ScreenSpec.BackgroundStandardSizeX / ScreenSpec.SizeX);
                heighOfObj = PlaceholderWithContent.GameCardOrContent.image.height /(ScreenSpec.BackgroundStandardSizeY / ScreenSpec.gameFrameY); //ScreenSpec.gameFrameY för att bara räkna in det som ska in på scene
            }else{

                widthOfObj = PlaceholderWithContent.SizeWidth;
                heighOfObj = PlaceholderWithContent.SizeHeight;
            }


            GameEngine.Machines.WindowSizing(
                PlaceholderWithContent.GameCardOrContent.image,
                "gameframe",
                PlaceholderWithContent.PosX,
                PlaceholderWithContent.PosY,
                widthOfObj,
                //ScreenSpec.BackgroundStandardSizeX / widthOfObj,
                heighOfObj
                //ScreenSpec.BackgroundStandardSizeY / heighOfObj
            )

            GameEngine.GoToButtons.WayPoints.push(PlaceholderWithContent); //skjuter in Placeholdern med Waypointsen till GoToButtons WayPoints Array!

        },

        WindowSizing : function(ImageToDraw, PlaceForImage, PosX, PosY, obSizeX, obSizeY){

            var Canvas = document.getElementById("CanvasBody");
            var Ctx = Canvas.getContext("2d");

            if(PosX == undefined){
                PosX = 0;
            }
            if(PosY == undefined){
                PosY = 0;
            }

            //om ingen storlek på objektet anges så använder man hela skärmstorleken
            if(obSizeX == undefined){
                obSizeX = ScreenSpec.SizeX;//ImageToDraw.width;
            }
            if(obSizeY == undefined){
                obSizeY = ScreenSpec.SizeY; //ImageToDraw.height;
            }

            Ctx.drawImage(ImageToDraw, PosX, PosY, obSizeX, obSizeY);



//            switch (PlaceForImage){
//                case "background":
//                    Ctx.drawImage(ImageToDraw, PosX, PosY, obSizeX, obSizeY - 150);
//                    break;
//                case "gameframe":
//
//                   break;
//                case "hudd":
//                    Ctx.drawImage(ImageToDraw, PosX, (600 + PosY), obSizeX, obSizeY);
//                    break;
//            }

        },

        getPosition : function(Pos_Percent, yORx){
            var pushToPixel
            if(yORx == "x"){
                var middleWidth = ScreenSpec.SizeX;
                pushToPixel = middleWidth * Pos_Percent;
            }
            if(yORx == "y"){
                var middleTop = ScreenSpec.SizeY;
                pushToPixel = middleTop * Pos_Percent;
            }
            return pushToPixel;
        },

        placeBackButton : function(RoomToGoTo){
            if(GameData.GameDataImages.backButton !== undefined){
                var backButton = new GameEngine.Classes.GoToButton(
                    30,
                    745,
                    100,
                    100,
                    GameData.GameDataImages.backButton,
                    RoomToGoTo,
                    "hudd"
                );

               //backButton.image.addEventListener("mousedown", function(){
               //     GameEngine.Machines.BuildRoom(roomToBuild);
               //});
                GameEngine.GoToButtons.backButton = backButton;

                GameEngine.Machines.WindowSizing(backButton.image, backButton.placeForImage, 30, 745, 100, 100);
            }else{
                alert("PlaceBackButton funktionen anropades innan nödvändig data var inläst..");
            }

        },



        wrapText : function(context, text, x, y, maxWidth, lineHeight, textHeight, maxHeight, counter, nBeforeX, nBeforeValue){
            //Functionen wrapText är tagen från : http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
            //Och innehåller ingen egen skriven kod.. EDIT: lägger till MaxHeight, för att kunna skrolla om det blir mycket text., EDIT2: denna kod är rätt omarbetad..
            var words, line, whenToStopNewLines, n, topPos, OLDx, OLDy,OLDMaxWidth, OLDMaxHeight;
            var OldFilLStyle = Ctx.fillStyle;


            OLDx = x;
            OLDy = y;
            OLDMaxWidth = maxWidth;
            OLDMaxHeight = maxHeight;


            topPos = y;
            var nBefore;
            if(!(text instanceof Array)){
                words = text.split(' ');
                line = '';
                whenToStopNewLines = 0;
                n=0;
                nBefore = [0];
            }else{
                words = text;
                n=counter;
                nBefore = nBeforeX;
                //nBefore.push(n);
                whenToStopNewLines = 0;
                line = '';
            }
            if(nBefore[nBefore.length-2] == nBefore[nBefore.length-1]){
                nBefore.pop();
            }
            if(nBefore[0] != 0){
                nBefore[0] = 0;
                n = 0;
            }

            y += textHeight;
            x += 5;

            for(n ; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    Ctx.fillStyle = "rgb(253, 253, 253)";
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                    whenToStopNewLines += textHeight;
                    if(whenToStopNewLines >= maxHeight - textHeight){
                        GameEngine.Machines.clearRoomData();
                        var nextButton = new GameEngine.Classes.NextOrPreviousButton(
                            x + maxWidth,
                            topPos + maxHeight - (maxHeight/2),
                            GameEngine.Machines.getPosition(0.03,"x"),
                            GameEngine.Machines.getPosition(0.03,"x"),
                            GameData.GameDataImages.nextButton,
                            function(){

                                //Inaktiverar denna pga att det är bättre om rutorna ritas upp efter datan som skickas in..
                                /*Ctx.fillStyle = "rgb(0, 102, 255)";
                                var ActorBubblePosX = GameEngine.Machines.getPosition(0.0469208211143695, "x");
                                var ActorBubblePosY = GameEngine.Machines.getPosition(0.4981391354136845, "y");
                                var SizeWidth = GameEngine.Machines.getPosition(0.90, "x");
                                var SizeHeight = GameEngine.Machines.getPosition(0.15, "y");
                                Ctx.fillRect(
                                    ActorBubblePosX,
                                    ActorBubblePosY,
                                    SizeWidth,
                                    SizeHeight
                                );
                                Ctx.fillStyle = "rgb(63, 0, 0)";*/
                                Ctx.fillStyle = "rgb(0, 0, 0)";

                                Ctx.fillRect(
                                    OLDx,
                                    OLDy,
                                    OLDMaxWidth,
                                    OLDMaxHeight
                                );

                                nBefore.push(n);
                                GameEngine.Machines.wrapText(Ctx, words, OLDx, topPos, OLDMaxWidth, lineHeight,textHeight , maxHeight, n, nBefore)

                            }

                        );
                        GameEngine.Machines.WindowSizing(nextButton.image,"gameframe",nextButton.PosX,nextButton.PosY, nextButton.Width, nextButton.Height)
                        GameEngine.GoToButtons.prevOrNextButton.push(nextButton);
                        if(true){
                            var backButton = new GameEngine.Classes.NextOrPreviousButton(
                                x - 55,
                                topPos + maxHeight - (maxHeight/2),
                                GameEngine.Machines.getPosition(0.03,"x"),
                                GameEngine.Machines.getPosition(0.03,"x"),
                                GameData.GameDataImages.prevButton,
                                function(){

                                    //Inaktiverar denna pga att det är bättre om rutorna ritas upp efter datan som skickas in..
                                    /*Ctx.fillStyle = "rgb(0, 102, 255)";
                                    var ActorBubblePosX = GameEngine.Machines.getPosition(0.0469208211143695, "x");
                                    var ActorBubblePosY = GameEngine.Machines.getPosition(0.4981391354136845, "y");
                                    var SizeWidth = GameEngine.Machines.getPosition(0.90, "x");
                                    var SizeHeight = GameEngine.Machines.getPosition(0.15, "y");
                                    Ctx.fillRect(
                                        ActorBubblePosX,
                                        ActorBubblePosY,
                                        SizeWidth,
                                        SizeHeight
                                    );
                                    Ctx.fillStyle = "rgb(63, 0, 0)";*/

                                    Ctx.fillStyle = "rgb(0, 0, 0)";
                                    Ctx.fillRect(
                                        OLDx,
                                        OLDy,
                                        OLDMaxWidth,
                                        OLDMaxHeight
                                    );

                                    nBefore.pop();
                                    GameEngine.Machines.wrapText(Ctx, words, OLDx, topPos, OLDMaxWidth, lineHeight,textHeight, maxHeight, nBefore[nBefore.length-1], nBefore)

                                }
                            );
                            GameEngine.Machines.WindowSizing(backButton.image,"gameframe",backButton.PosX,backButton.PosY, backButton.Width, backButton.Height);
                            GameEngine.GoToButtons.prevOrNextButton.push(backButton);

                        };
                        while(false){

                        }

                        return;
                    }

                }
                else {
                    line = testLine;
                }
            }
            Ctx.fillStyle = "rgb(253, 253, 253)";
            context.fillText(line, x, y);
            Ctx.fillStyle = OldFilLStyle;
        },

        loadActorImage : function(Actor, emotionState){
            var ImageToUse;

            switch (emotionState){
                case GameEngine.Enums.EmotionState.Angry :
                    ImageToUse = Actor.EmotionObj.Angry;
                    break;
                case GameEngine.Enums.EmotionState.Annoyed :
                    ImageToUse = Actor.EmotionObj.Annoyed;
                    break;
                case GameEngine.Enums.EmotionState.Concerned :
                    ImageToUse = Actor.EmotionObj.Concerned;
                    break;
                case GameEngine.Enums.EmotionState.FreakedOut :
                    ImageToUse = Actor.EmotionObj.FreakedOut;
                    break;
                case GameEngine.Enums.EmotionState.Happy :
                    ImageToUse = Actor.EmotionObj.Happy;
                    break;
                case GameEngine.Enums.EmotionState.Nervous :
                    ImageToUse = Actor.EmotionObj.Nervous;
                    break;
                case GameEngine.Enums.EmotionState.Neutral :
                    ImageToUse = Actor.EmotionObj.Neutral;
                    break;
                case GameEngine.Enums.EmotionState.Sad :
                    ImageToUse = Actor.EmotionObj.Sad;
                    break;
            }
            Actor.emotionState = emotionState;

            var PosX =GameEngine.Machines.getPosition(0.6608015640273704 ,"x" );
            var PosY =GameEngine.Machines.getPosition(0.010306326939593472,"y")-8;
            var width =GameEngine.Machines.getPosition(0.2482893450635386,"x");
            var height =GameEngine.Machines.getPosition(0.4969939879759519,"y");


            GameEngine.Machines.WindowSizing(ImageToUse, "gameframe",PosX,PosY,width,height);


        },

        fillBackgroundGray : function(){

            var oldFill = Ctx.fillStyle;

            Ctx.fillStyle = "rgba(119, 119, 119, 0.65)";
            Ctx.fillRect(0,0,ScreenSpec.SizeX, ScreenSpec.gameFrameY);

            Ctx.fillStyle = oldFill;
        },


        InterviewActor : function(actor){

            GameEngine.Actives.IsDialogActive = true;

            //Hämtar ner data så att datan kan tas bort (så att inga knappar kan tryckas på..)
            //Medans InterviewFasen pågår.
            var GlobalRooms, GoToButtons, GlobalActors,ActorBubblePosX,ActorBubblePosY, SizeWidth, SizeHeight, TextHeight;
            GlobalRooms = GameEngine.GlobalRooms;
            GoToButtons = GameEngine.GoToButtons;
            GlobalActors =GameEngine.GlobalActors;
            GameEngine.Machines.clearRoomData();

            //Fyller i bakgrunden för att demonstrera att inget är klickbart
            GameEngine.Machines.fillBackgroundGray();

            //Laddar Karaktärbild
            GameEngine.Machines.loadActorImage(actor, actor.emotionState);
            //Ritar upp PratRuta för Aktör
            //Ctx.fillStyle = "rgb(0, 102, 255)";

            Ctx.fillStyle = "rgb(133, 9, 0)";

            ActorBubblePosX = GameEngine.Machines.getPosition(0.0469208211143695, "x");
            ActorBubblePosY = GameEngine.Machines.getPosition(0.4981391354136845, "y");
            SizeWidth   =     GameEngine.Machines.getPosition(0.90, "x");
            SizeHeight  =    GameEngine.Machines.getPosition(0.15, "y");

            //Border
            Ctx.fillStyle = "rgb(0, 0, 0)";
            Ctx.fillRect(
                ActorBubblePosX-2.5,
                ActorBubblePosY-2.5,
                    SizeWidth+5,
                    SizeHeight+5
            );
            // ruta
            Ctx.fillStyle = "rgb(133, 9, 0)";
            Ctx.fillRect(
                ActorBubblePosX,
                ActorBubblePosY,
                SizeWidth,
                SizeHeight
            );



            //ritar upp en liten ruta över för att fylla med Actors namn
            var NameBoxWidth = SizeWidth / 16;
            var NameBoxHeight = SizeHeight / 5;
            var NameBoxPosY = ActorBubblePosY - (NameBoxHeight);
            Ctx.fillRect(
                ActorBubblePosX,
                NameBoxPosY,
                NameBoxWidth,
                NameBoxHeight
            );

            //Byter till textfärg..
            TextHeight = GameEngine.Machines.getPosition(0.016, "x");
            Ctx.fillStyle = "rgb(255, 255, 255)";
            Ctx.font= TextHeight+"px arial, sans-serif";
            Ctx.fillText(//namn till karaktären..
                actor.name,
                ActorBubblePosX + 10,
                NameBoxPosY + TextHeight + 5
            );

            Ctx.fillStyle = "rgb(63, 0, 0)";
            GameEngine.Machines.wrapText(Ctx,"Yes, well hello.."
             ,ActorBubblePosX+20, ActorBubblePosY +25,SizeWidth-15, 20, TextHeight +10, SizeHeight-10);

            //Ritar upp svarsruta för spelare
            //Ctx.fillStyle = "rgb(112, 0, 255)";


            var PlayerBubblePosX = GameEngine.Machines.getPosition(0.04594330400782014, "x");
            var PlayerBubblePosY = GameEngine.Machines.getPosition(0.6756369882622387, "y");
            //Border
            Ctx.fillStyle = "rgb(0, 0, 0)";
            Ctx.fillRect(
                PlayerBubblePosX-2.5,
                PlayerBubblePosY-2.5,
                SizeWidth+5,
                SizeHeight+5
            );
            Ctx.fillStyle = "rgb(64, 4, 0)";
            Ctx.fillRect(
                PlayerBubblePosX,
                PlayerBubblePosY,
                SizeWidth,
                SizeHeight
            );
            //Byter till textfärg..
            TextHeight = GameEngine.Machines.getPosition(0.016, "x");
            Ctx.fillStyle = "rgb(63, 0, 0)";

            //Ladda in startfrågorna (leave, secret, other, etc! )

            GameEngine.Machines.StartQuestions(PlayerBubblePosX,PlayerBubblePosY,SizeWidth,SizeHeight,TextHeight, actor);

            GameEngine.Machines.QuestionToBox(
                PlayerBubblePosX+20,
                PlayerBubblePosY+25,
                SizeWidth-15,
                SizeHeight-10, // tar bort 25 då jag lägger till 25 på PlayerBubblePosY
                TextHeight
            )

            //Skjuter tillbaka datan så att den kan användas utanför IntervjuFasen..
            //OBS denna + att spara datan i variabel (högst upp) fungerar EJ!!!! (än..)
            GameEngine.GlobalRooms = GlobalRooms;
            GameEngine.GoToButtons = GoToButtons;
            GameEngine.GlobalActors = GlobalActors;
            GameEngine.Machines.fillHudGray(true, true, false);

        },

        FindEmotionInCardData : function(CardsAnswerArray, EmotionToLookFor){
            //tar fram kortet som är neutralt.. alltid första startkortet.. <-Stryk det..
            for(var i = 0; i < CardsAnswerArray.length; i ++){
                if(CardsAnswerArray[i].emotionState == EmotionToLookFor){
                    return i;
                }
            }
            // Om kortet inte hittas eller inte finns så måste ersättningsdata finnas...
            // då tar man det svar som finns, Det första bästa.
            for(var i = 0; i < CardsAnswerArray.length; i ++){
                    return i;
            }//TODO: krånglar detta? Får karaktärerna vettiga svar?

        },
        cleanActorOrPlayerBox : function(playerOrActor){

            switch (playerOrActor){
                case "player":
                    Ctx.fillStyle = "rgb(0, 0, 0)";
                    Ctx.fillRect(
                            GameBubbleData.PlayerBubblePosX-2.5,
                            GameBubbleData.PlayerBubblePosY-2.5,
                            GameBubbleData.SizeWidth+5,
                            GameBubbleData.SizeHeight+5
                    );
                    Ctx.fillStyle = "rgb(64, 4, 0)";
                    Ctx.fillRect(
                        GameBubbleData.PlayerBubblePosX,
                        GameBubbleData.PlayerBubblePosY,
                        GameBubbleData.SizeWidth,
                        GameBubbleData.SizeHeight
                    );
                    Ctx.fillStyle = "rgb(63, 0, 0)";
                    break;
                case "actor":
                    Ctx.fillStyle = "rgb(0, 0, 0)";
                    Ctx.fillRect(
                            GameBubbleData.ActorBubblePosX-2.5,
                            GameBubbleData.ActorBubblePosY-2.5,
                            GameBubbleData.SizeWidth+5,
                            GameBubbleData.SizeHeight+5
                    );
                    Ctx.fillStyle = "rgb(133, 9, 0)";
                    Ctx.fillRect(
                        GameBubbleData.ActorBubblePosX,
                        GameBubbleData.ActorBubblePosY,
                        GameBubbleData.SizeWidth,
                        GameBubbleData.SizeHeight
                    );
                    Ctx.fillStyle = "rgb(63, 0, 0)";
                    break;
            }


        },

        cleanQuestionData : function(){
            GameEngine.GoToButtons.DialogButtons = [];
            GameEngine.GoToButtons.DialogButtonsActive = [];
            GameEngine.GoToButtons.DialogDownorUp = [];
        },

        CardDataToQuestions : function(card, actor){



            GameEngine.Machines.loadActorImage(actor, card.emotionState);

            GameEngine.Machines.cleanActorOrPlayerBox("actor");


            var NameBoxWidth = GameBubbleData.SizeWidth/ 16;
            var NameBoxHeight = GameBubbleData.SizeHeight / 5;
            var NameBoxPosY = GameBubbleData.ActorBubblePosY - (NameBoxHeight);
            Ctx.fillStyle = "rgb(133, 9, 0)";
            Ctx.fillRect(
                GameBubbleData.ActorBubblePosX,
                NameBoxPosY,
                NameBoxWidth,
                NameBoxHeight
            );

            //Byter till textfärg..
            var TextHeight = GameEngine.Machines.getPosition(0.016, "x");
            Ctx.fillStyle = "rgb(255, 255, 255)";
            Ctx.font= TextHeight+"px arial, sans-serif";
            Ctx.fillText(//namn till karaktären..
                actor.name,
                    GameBubbleData.ActorBubblePosX + 10,
                    NameBoxPosY + TextHeight + 5
            );


            GameEngine.Machines.wrapText(
                Ctx,
                card.answer,
                GameBubbleData.ActorBubblePosX+20,
                GameBubbleData.ActorBubblePosY+25,
                GameBubbleData.SizeWidth-15,
                20,
                GameBubbleData.TextHeight+10,
                GameBubbleData.SizeHeight-10

            );

            //rensa gammal frågedata
            GameEngine.Machines.cleanQuestionData();
            GameEngine.Machines.cleanActorOrPlayerBox("player");

            //Lägg in ny fråge data
            for(var i = 0;i<card.followUp.length;i++){
                GameEngine.Machines.ListQuestions(
                    card.followUp[i].question+ " (Cost 5 TimePoints)",
                    GameBubbleData.PlayerBubblePosX+20,
                    GameBubbleData.PlayerBubblePosY+25,
                    GameBubbleData.SizeWidth-15,
                    GameBubbleData.SizeHeight-10,
                    GameBubbleData.TextHeight,
                    function(){
                        //Todo: anropa en funktion som Spinner vidare på CardData korten..
                        //TODO: kolla om denna fix inte förståör något annat...
                        GameEngine.Machines.ContinueWithCards(this.GameCard, this.actor);

                    },
                    card.followUp[i],
                    actor
                );
            }

            GameEngine.Machines.LoadStandardQuestions(actor);

            GameEngine.Machines.QuestionToBox(
                    GameBubbleData.PlayerBubblePosX+20,
                    GameBubbleData.PlayerBubblePosY+25,
                    GameBubbleData.SizeWidth-15,
                    GameBubbleData.SizeHeight-10,
                    GameBubbleData.TextHeight
            );
        },

        ContinueWithCards : function(GameCard, actor){
            GameEngine.Machines.PlayersHuddUpdate();
            GameEngine.Machines.CardDataToQuestions(GameCard, actor);
        },

        CardToQuestions : function(card, actor){
            //Denna funktion ska ta ett kort: Presentera Svaret från karaktär, Ta fram alternativ åt spelare = Placera ut allt på spelplanen..

            var emotionstate = actor.emotionState;

            //var CardIDBasedOfEmotion = GameEngine.Machines.FindEmotionInCardData(card.AnswerCards, emotionstate);
            //^detta är orginalet, den som var tänkt att använda.. Nu baserar vi inte längre på emotionstate då det blir för mycket jobb
            // Så lösningen blir att alltid köra på det kortet som i vanliga fall väljs när användaren är Neutral...
            var CardIDBasedOfEmotion = GameEngine.Machines.FindEmotionInCardData(card.AnswerCards, GameEngine.Enums.EmotionState.Neutral);
            GameEngine.Machines.cleanActorOrPlayerBox("actor");

            GameEngine.Machines.wrapText(
                Ctx,
                card.AnswerCards[CardIDBasedOfEmotion].answer, // sätt denna till 0 för att alltid välja första kortet ..
                GameBubbleData.ActorBubblePosX+20,
                GameBubbleData.ActorBubblePosY+25,
                GameBubbleData.SizeWidth-15,
                20,
                GameBubbleData.TextHeight+10,
                GameBubbleData.SizeHeight-10

            );

            //rensa gammal frågedata
            GameEngine.Machines.cleanQuestionData();
            GameEngine.Machines.cleanActorOrPlayerBox("player");

            //Lägg in ny frågedata
            var Data;
            for(var i = 0;i<card.AnswerCards[CardIDBasedOfEmotion].followUp.length;i++){
                Data = card.AnswerCards[CardIDBasedOfEmotion].followUp[i];

                GameEngine.Machines.ListQuestions(
                    card.AnswerCards[CardIDBasedOfEmotion].followUp[i].question+ " (Cost 5 TimePoints)",
                    GameBubbleData.PlayerBubblePosX+20,
                    GameBubbleData.PlayerBubblePosY+25,
                    GameBubbleData.SizeWidth-15,
                    GameBubbleData.SizeHeight-10,
                    GameBubbleData.TextHeight,
                    function(){
                        //GameEngine.Actives.Player.TimePoints -= 5;
                        GameEngine.Machines.PlayersHuddUpdate();
                        GameEngine.Machines.CardDataToQuestions(this.GameCard, this.actor);
                    },
                    Data,
                    actor

                );

            }
            // Namnrutan..
            Ctx.fillStyle = "rgb(133, 9, 0)";
            var NameBoxWidth   =     GameEngine.Machines.getPosition(0.90, "x")/16;
            var NameBoxHeight  =    GameEngine.Machines.getPosition(0.15, "y")/5;
            var ActorBubblePosX = GameEngine.Machines.getPosition(0.0469208211143695, "x");
            var ActorBubblePosY = GameEngine.Machines.getPosition(0.4981391354136845, "y");
            var NameBoxPosY = ActorBubblePosY - (NameBoxHeight);

            Ctx.fillRect(
                ActorBubblePosX,
                NameBoxPosY,
                NameBoxWidth,
                NameBoxHeight
            );

            //Byter till textfärg..
            var TextHeight = GameEngine.Machines.getPosition(0.016, "x");
            Ctx.fillStyle = "rgb(255, 255, 255)";
            Ctx.font= TextHeight+"px arial, sans-serif";
            Ctx.fillText(//namn till karaktären..
                actor.name,
                    ActorBubblePosX + 10,
                    NameBoxPosY + TextHeight + 5
            );


            //Laddar in standardfrågor så att man ALLTID kan lämna/flörta/hota..
            GameEngine.Machines.LoadStandardQuestions(actor);

            GameEngine.Machines.QuestionToBox(
                GameBubbleData.PlayerBubblePosX+20,
                GameBubbleData.PlayerBubblePosY+25,
                GameBubbleData.SizeWidth-15,
                GameBubbleData.SizeHeight-10,
                GameBubbleData.TextHeight
            );



        },

        LoadStandardQuestions : function(actor){
            GameEngine.Actives.actorInDialog = actor;
            if(GameEngine.Actives.BlippBoxIsActive == false){
                GameEngine.Machines.ListQuestions(
                    "I have to go.           (Cost 0 TimePoints)",
                        GameBubbleData.PlayerBubblePosX+20,
                        GameBubbleData.PlayerBubblePosY+25,
                        GameBubbleData.SizeWidth-15,
                    GameBubbleData.SizeHeight,
                    GameBubbleData.TextHeight,
                    function(){
                        GameEngine.Actives.IsDialogActive = false;
                        //GameEngine.Actives.Player.TimePoints += 5; pga fix så behövs ej denna
                        GameEngine.Actives.actorInDialog = null;
                        GameEngine.Machines.BuildRoom(GameEngine.Actives.RoomThatIsActive.ID);
                        GameEngine.Machines.cleanQuestionData();

                    },
                    false //obs se nedan på samma false...
                );
            }else{
                GameEngine.Machines.ListQuestions(
                    "I have to go.           (Cost 0 TimePoints)",
                        GameBubbleData.PlayerBubblePosX+20,
                        GameBubbleData.PlayerBubblePosY+25,
                        GameBubbleData.SizeWidth-15,
                    GameBubbleData.SizeHeight,
                    GameBubbleData.TextHeight,
                    function(){
                        GameEngine.Actives.IsDialogActive = false;
                        //GameEngine.Actives.Player.TimePoints += 5; pga fix så behövs ej denna
                        GameEngine.Actives.actorInDialog = null;
                        GameEngine.Machines.BuildRoom(GameEngine.Actives.RoomThatIsActive.ID);
                        GameEngine.Machines.createBlippBox(GameEngine.Actives.ActiveClue);
                        GameEngine.Actives.BlippBoxIsActive = false;

                        GameEngine.Machines.cleanQuestionData();

                    },
                    //OBS detta är inget riktigt gamecard, men ett fulhack för att
                    //undvika att man får gameover när mna tar "i have to go" och har mindre än 5
                    //TP kvar...
                    false
                );
            }

            GameEngine.Machines.ListQuestions(
                "Flirt*!                       (Cost 15 TimePoints)",
                GameBubbleData.PlayerBubblePosX+20,
                GameBubbleData.PlayerBubblePosY+25,
                GameBubbleData.SizeWidth-15,
                GameBubbleData.SizeHeight,
                GameBubbleData.TextHeight,
                function(){
                    //var card = GameEngine.Machines.getContentFromQuestion("secret", actor);
                    GameEngine.Actives.actorInDialog.emotionState = GameEngine.Enums.EmotionState.Happy;
                    GameEngine.Machines.loadActorImage(GameEngine.Actives.actorInDialog, GameEngine.Actives.actorInDialog.emotionState);
                    GameEngine.Actives.Player.TimePoints -= 10;
                    GameEngine.Machines.PlayersHuddUpdate(); //Uppdaterar Hudden..

                    //GameEngine.Machines.CardToQuestions(card, actor);
                }
            );
            GameEngine.Machines.ListQuestions(
                "Threathen*!            (Cost 15 TimePoints)",
                GameBubbleData.PlayerBubblePosX+20,
                GameBubbleData.PlayerBubblePosY+25,
                GameBubbleData.SizeWidth-15,
                GameBubbleData.SizeHeight,
                GameBubbleData.TextHeight,
                function(){
                    //var card = GameEngine.Machines.getContentFromQuestion("secret", actor);
                    GameEngine.Actives.actorInDialog.emotionState = GameEngine.Enums.EmotionState.Angry;
                    GameEngine.Machines.loadActorImage(GameEngine.Actives.actorInDialog, GameEngine.Actives.actorInDialog.emotionState);
                    GameEngine.Actives.Player.TimePoints -= 10;
                    GameEngine.Machines.PlayersHuddUpdate(); //Uppdaterar Hudden..

                    //GameEngine.Machines.CardToQuestions(card, actor);
                }
            );

        },

        StartQuestions : function(PlayerBubblePosX,PlayerBubblePosY,SizeWidth,SizeHeight,TextHeight, actor ){
            GameEngine.Machines.ListQuestions(
                "Ask about secret! (Cost 5 TimePoints)",
                PlayerBubblePosX+20,
                PlayerBubblePosY+25,
                SizeWidth-15,
                SizeHeight,
                TextHeight,
                function(){
                    var card = GameEngine.Machines.getContentFromQuestion("secret", actor);
                    GameEngine.Actives.Player.TimePoints -= 0;
                    GameEngine.Machines.PlayersHuddUpdate();
                    GameEngine.Machines.CardToQuestions(card, actor);
                }
            );
            GameEngine.Machines.ListQuestions(
                "Ask about Other! (Cost 5 TimePoints)",
                    PlayerBubblePosX+20,
                    PlayerBubblePosY+25,
                    SizeWidth-15,
                SizeHeight,
                TextHeight,
                function(){
                    var card = GameEngine.Machines.getContentFromQuestion("other", actor);
                    GameEngine.Actives.Player.TimePoints -= 0;
                    GameEngine.Machines.PlayersHuddUpdate();
                    GameEngine.Machines.CardToQuestions(card, actor);
                }

            );
            GameEngine.Machines.ListQuestions(
                "Ask about Relation! (Cost 5 TimePoints)",
                    PlayerBubblePosX+20,
                    PlayerBubblePosY+25,
                    SizeWidth-15,
                SizeHeight,
                TextHeight,
                function(){
                    var card = GameEngine.Machines.getContentFromQuestion("relation", actor);
                    GameEngine.Actives.Player.TimePoints -= 0;
                    GameEngine.Machines.PlayersHuddUpdate();
                    GameEngine.Machines.CardToQuestions(card, actor);
                }
            );
            GameEngine.Machines.ListQuestions(
                "Ask about intress! (Cost 5 TimePoints)",
                    PlayerBubblePosX+20,
                    PlayerBubblePosY+25,
                    SizeWidth-15,
                SizeHeight,
                TextHeight,
                function(){
                    var card = GameEngine.Machines.getContentFromQuestion("intress", actor);
                    GameEngine.Actives.Player.TimePoints -= 0;
                    GameEngine.Machines.PlayersHuddUpdate();
                    GameEngine.Machines.CardToQuestions(card, actor);
                }
            );

            //Laddar in standardfrågor så att man ALLTID kan lämna/flörta/hota..
            GameEngine.Machines.LoadStandardQuestions(actor);

        },

        getContentFromQuestion : function(CardType, Actor){

            var cardToUse;

            switch(CardType){
                case "secret":
                    cardToUse = Actor.Secret;
                    break;
                case "other":
                    cardToUse = Actor.Other;
                    break;
                case "relation":
                    cardToUse = Actor.Relation;
                    break;
                case "intress":
                    cardToUse = Actor.Intress;
                    break;

            }
            return cardToUse;

        },

        QuestionToBox : function(PosX, PosY ,maxWidth,maxHeight, heigtOfLetters, BeginningLetter){
            var Counter;// = 0;
            var StartOfY = PosY;
            var PosYBegin = PosY;
            var PosXBegin = PosX;
            var isItDone = false;
            var StartLetter = 0;
            var i = 0;
            if(BeginningLetter == undefined){
                Counter = StartLetter;
            }else{
                Counter = BeginningLetter;
                StartLetter = BeginningLetter;
            }


            if(GameEngine.GoToButtons.DialogButtons[0] != undefined) { //Säkerhetsspärr, som hjälper till att inte utföra denna sats om det ej finns knappar..
                for (i; i < maxHeight; i += GameEngine.GoToButtons.DialogButtons[Counter].Height + 5 + 2) { // för varje AnswerButton obj som ska läggas ut..
                    StartOfY = PosY;

                    for (var j = 0; j < GameEngine.GoToButtons.DialogButtons[Counter].LinesArr.length; j++) { // för varje rad som ska läggas ut

                        if (i + heigtOfLetters >= maxHeight) {
                            break;
                        }

                        //Ctx.fillStyle = "rgb(200, 40, 255)";
                        Ctx.fillStyle = "rgb(61, 60, 61)";
                        Ctx.fillRect(
                                PosX - 5,
                                PosY - heigtOfLetters + 2,
                                maxWidth - 5,
                            heigtOfLetters
                        );
                        //Ctx.fillStyle = "rgb(63, 0, 0)";
                        Ctx.fillStyle = "rgb(255, 255, 255)";

                        Ctx.fillText(GameEngine.GoToButtons.DialogButtons[Counter].LinesArr[j], PosX, PosY);
                        GameEngine.GoToButtons.DialogButtons[Counter].PosX = PosX;
                        GameEngine.GoToButtons.DialogButtons[Counter].PosY = StartOfY - heigtOfLetters;
                        PosY += heigtOfLetters;
                    }
                    GameEngine.GoToButtons.DialogButtonsActive.push(GameEngine.GoToButtons.DialogButtons[Counter]);
                    PosY += 5; //ger 5 px mellanrum mellan varje alternativ..
                    Counter++;
                    if (Counter == GameEngine.GoToButtons.DialogButtons.length) {
                        isItDone = true;
                        break;
                    }


                }
            }


            //Logik för knapparna..
            GameEngine.GoToButtons.DialogDownorUp = []; //Tömmer arrayen med up/ned knappar för att förbereda inladdning av ny data..

            if(StartLetter < GameEngine.GoToButtons.DialogButtons.length-1){
                //Placerar ut "mer" knapp för att man ska kunna hämta ytterligare data..
                var downButton = new GameEngine.Classes.NextOrPreviousButton(
                        PosX+ maxWidth+5,
                        PosYBegin + maxHeight - GameEngine.Machines.getPosition(0.03,"x"),
                    GameEngine.Machines.getPosition(0.03,"x"),
                    GameEngine.Machines.getPosition(0.03,"x"),
                    GameData.GameDataImages.downButton,
                    function() {
                        GameEngine.Machines.paintPlayerAnswerBox();
                        GameEngine.GoToButtons.DialogButtonsActive = []; //tömmer arrayen för att byta ut aktiv data..
                        GameEngine.Machines.QuestionToBox(PosXBegin,PosYBegin,maxWidth,maxHeight,heigtOfLetters,StartLetter+1)
                    }
                );
                GameEngine.Machines.WindowSizing(downButton.image,"gameframe",downButton.PosX,downButton.PosY, downButton.Width, downButton.Height);
                GameEngine.GoToButtons.DialogDownorUp.push(downButton);
                //Ctx.fillStyle = "rgb(63, 0, 0)";
            }else{
                var downButton = new GameEngine.Classes.NextOrPreviousButton(
                        PosX+ maxWidth+5,
                        PosYBegin + maxHeight - GameEngine.Machines.getPosition(0.03,"x"),
                    GameEngine.Machines.getPosition(0.03,"x"),
                    GameEngine.Machines.getPosition(0.03,"x"),
                    GameData.GameDataImages.downButtonDisabled,
                    function() {
                        GameEngine.Machines.paintPlayerAnswerBox();
                        GameEngine.GoToButtons.DialogButtonsActive = []; //tömmer arrayen för att byta ut aktiv data..
                        GameEngine.Machines.QuestionToBox(PosXBegin,PosYBegin,maxWidth,maxHeight,heigtOfLetters,StartLetter+1)
                    }
                );
                GameEngine.Machines.WindowSizing(downButton.image,"gameframe",downButton.PosX,downButton.PosY, downButton.Width, downButton.Height);
            }
            if(StartLetter >= 1){
                //Placerar ut "mer" knapp för att man ska kunna hämta ytterligare data..
                var UpButton = new GameEngine.Classes.NextOrPreviousButton(
                        PosX+ maxWidth+5,
                        PosYBegin - GameEngine.Machines.getPosition(0.03,"x"),
                    GameEngine.Machines.getPosition(0.03,"x"),
                    GameEngine.Machines.getPosition(0.03,"x"),
                    GameData.GameDataImages.upButton,
                    function() {
                        GameEngine.Machines.paintPlayerAnswerBox();
                        GameEngine.GoToButtons.DialogButtonsActive = []; //tömmer arrayen för att byta ut aktiv data..
                        GameEngine.Machines.QuestionToBox(PosXBegin,PosYBegin,maxWidth,maxHeight,heigtOfLetters,StartLetter-1)
                    }
                );
                GameEngine.Machines.WindowSizing(UpButton.image,"gameframe",UpButton.PosX,UpButton.PosY, UpButton.Width, UpButton.Height);
                GameEngine.GoToButtons.DialogDownorUp.push(UpButton);
            }else{
                var UpButton = new GameEngine.Classes.NextOrPreviousButton(
                        PosX+ maxWidth+5,
                        PosYBegin - GameEngine.Machines.getPosition(0.03,"x"),
                    GameEngine.Machines.getPosition(0.03,"x"),
                    GameEngine.Machines.getPosition(0.03,"x"),
                    GameData.GameDataImages.upButtonDisabled,
                    function() {
                        GameEngine.Machines.paintPlayerAnswerBox();
                        GameEngine.GoToButtons.DialogButtonsActive = []; //tömmer arrayen för att byta ut aktiv data..
                        GameEngine.Machines.QuestionToBox(PosXBegin,PosYBegin,maxWidth,maxHeight,heigtOfLetters,StartLetter-1)
                    }
                );
                GameEngine.Machines.WindowSizing(UpButton.image,"gameframe",UpButton.PosX,UpButton.PosY, UpButton.Width, UpButton.Height)

            }

            //TODO:! rutan är inte begränsad till att kunna innehålla ett maxvärde, dock kan man inte stoppa in för mycket i dem då det inte får plats..

        },

        paintPlayerAnswerBox : function(){
            //Ritar upp PratRuta för Aktör
            Ctx.fillStyle = "rgb(0, 102, 255)";

            var SizeWidth = GameEngine.Machines.getPosition(0.90, "x");
            var SizeHeight = GameEngine.Machines.getPosition(0.15, "y");
            //Ritar upp svarsruta för spelare
            Ctx.fillStyle = "rgb(64, 4, 0)";

            var PlayerBubblePosX = GameEngine.Machines.getPosition(0.04594330400782014 , "x");
            var PlayerBubblePosY = GameEngine.Machines.getPosition(0.6756369882622387 , "y");
            Ctx.fillRect(
                PlayerBubblePosX,
                PlayerBubblePosY,
                SizeWidth,
                SizeHeight
            );
            //Byter till textfärg..
            //var TextHeight = GameEngine.Machines.getPosition(0.016, "x");
            Ctx.fillStyle = "rgb(63, 0, 0)";
        },

        ListQuestions : function(Question, PosX, PosY ,maxWidth,maxHeight, heigtOfLetters, functionToAdd, GameCard, actor){
            //Denna funktion tar en "Question", mäter upp hur stor den ska vara, lägger in informationen i en array..
            var Words = Question.split(" "); //varje ord för ord i en array
            var line = "";
            var context = Ctx;
            var Rows = 1;
            var LineArr = [];

            var OldPosY = PosY;
            var i = 0;

                for (i; i < Words.length; i++) {
                    var testLine = line + Words[i] + ' ';
                    var metrics = context.measureText(testLine);
                    var testWidth = metrics.width;
                    if (testWidth > maxWidth && i > 0) {
                        LineArr.push(line);
                        line = Words[i] + ' ';
                        //PosY += heigtOfLetters;
                        Rows++;

                    } else {
                        line = testLine;
                    }
                    if (i == Words.length - 1) { //Denna gör just denna text snutt till en fråga!

                        LineArr.push(line);
                        if(LineArr.length == LineArr.length-1){
                            LineArr.pop(); // om det bara blir en rad totalt så läggs den till 2 ggr, då tar vi bort den här.
                        }

                        var QuestionObj = new GameEngine.Classes.AnswerButton(
                            PosX-PosX, // sätter till 0 Då positionerna inte behöver sättas här..
                            PosY-PosY,
                            maxWidth,
                            Rows * heigtOfLetters,
                            LineArr,
                            functionToAdd,
                            GameCard,
                            actor
                            //TODO: ange vad Detta objekt ska göra när det trycks på! EDIT: Borde vara gjort nu
                        );
                        GameEngine.GoToButtons.DialogButtons.push(QuestionObj);
                    }
                }
            //};
        },
		
		CreateActors : function(){
            GameObj.CheckPointsForInit.CreateActors = false;

			//Init all Actor
			var actor1 = new GameEngine.Classes.Actor("Noah", 1, "Data/Characters/char_1/char1.png", "M");
            var img = new Image();
            (img.src = "Data/Characters/char_1/emotions/Angry.png");
            actor1.EmotionObj.Angry =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_1/emotions/Annoyed.png");
            actor1.EmotionObj.Annoyed =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_1/emotions/Concerned.png");
            actor1.EmotionObj.Concerned =   img;

            var img = new Image();
            (img.src = "Data/Characters/char_1/emotions/Freakedout.png");
            actor1.EmotionObj.FreakedOut =  img;

            var img = new Image();
            (img.src = "Data/Characters/char_1/emotions/Happy.png");
            actor1.EmotionObj.Happy =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_1/emotions/Nervous.png");
            actor1.EmotionObj.Nervous =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_1/emotions/Sad.png");
            actor1.EmotionObj.Sad =         img;

            var img = new Image();
            (img.src = "Data/Characters/char_1/char1.png");
            actor1.EmotionObj.Neutral =     img;

            var icon = new Image();
            icon.src = "Data/Characters/char_1/icon/icon.png";
            actor1.icon = icon;

            actor1.room = GameEngine.Enums.Room.bedroom1;


			var actor2 = new GameEngine.Classes.Actor("Ethan", 2, "Data/Characters/char_2/char2.png", "M");
            var img = new Image();
            (img.src = "Data/Characters/char_2/emotions/Angry.png");
            actor2.EmotionObj.Angry =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_2/emotions/Annoyed.png");
            actor2.EmotionObj.Annoyed =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_2/emotions/Concerned.png");
            actor2.EmotionObj.Concerned =   img;

            var img = new Image();
            (img.src = "Data/Characters/char_2/emotions/Freakedout.png");
            actor2.EmotionObj.FreakedOut =  img;

            var img = new Image();
            (img.src = "Data/Characters/char_2/emotions/Happy.png");
            actor2.EmotionObj.Happy =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_2/emotions/Nervous.png");
            actor2.EmotionObj.Nervous =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_2/emotions/Sad.png");
            actor2.EmotionObj.Sad =         img;

            var img = new Image();
            (img.src = "Data/Characters/char_2/char2.png");
            actor2.EmotionObj.Neutral =     img;

            var icon = new Image();
            icon.src = "Data/Characters/char_2/icon/icon.png";
            actor2.icon = icon;

            actor2.room = GameEngine.Enums.Room.bedroom2;


			var actor3 = new GameEngine.Classes.Actor("Haley", 3, "Data/Characters/char_3/char3.png", "F");

            var img = new Image();
            (img.src = "Data/Characters/char_3/emotions/Angry.png");
            actor3.EmotionObj.Angry =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_3/emotions/Annoyed.png");
            actor3.EmotionObj.Annoyed =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_3/emotions/Concerned.png");
            actor3.EmotionObj.Concerned =   img;

            var img = new Image();
            (img.src = "Data/Characters/char_3/emotions/Freakedout.png");
            actor3.EmotionObj.FreakedOut =  img;

            var img = new Image();
            (img.src = "Data/Characters/char_3/emotions/Happy.png");
            actor3.EmotionObj.Happy =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_3/emotions/Nervous.png");
            actor3.EmotionObj.Nervous =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_3/emotions/Sad.png");
            actor3.EmotionObj.Sad =         img;

            var img = new Image();
            (img.src = "Data/Characters/char_3/char3.png");
            actor3.EmotionObj.Neutral =     img;

            var icon = new Image();
            icon.src = "Data/Characters/char_3/icon/icon.png";
            actor3.icon = icon;

            actor3.room = GameEngine.Enums.Room.bedroom3;

			var actor4 = new GameEngine.Classes.Actor("Lucy", 4, "Data/Characters/char_4/char4.png", "F");
            var img = new Image();
            (img.src = "Data/Characters/char_4/emotions/Angry.png");
            actor4.EmotionObj.Angry =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_4/emotions/Annoyed.png");
            actor4.EmotionObj.Annoyed =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_4/emotions/Concerned.png");
            actor4.EmotionObj.Concerned =   img;

            var img = new Image();
            (img.src = "Data/Characters/char_4/emotions/Freakedout.png");
            actor4.EmotionObj.FreakedOut =  img;

            var img = new Image();
            (img.src = "Data/Characters/char_4/emotions/Happy.png");
            actor4.EmotionObj.Happy =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_4/emotions/Nervous.png");
            actor4.EmotionObj.Nervous =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_4/emotions/Sad.png");
            actor4.EmotionObj.Sad =         img;

            var img = new Image();
            (img.src = "Data/Characters/char_4/char4.png");
            actor4.EmotionObj.Neutral =     img;

            var icon = new Image();
            icon.src = "Data/Characters/char_4/icon/icon.png";
            actor4.icon = icon;

            actor4.room = GameEngine.Enums.Room.bedroom4;

			var actor5 = new GameEngine.Classes.Actor("Corey", 5, "Data/Characters/char_5/char5.png", "M");
            var img = new Image();
            (img.src = "Data/Characters/char_5/emotions/Angry.png");
            actor5.EmotionObj.Angry =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_5/emotions/Annoyed.png");
            actor5.EmotionObj.Annoyed =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_5/emotions/Concerned.png");
            actor5.EmotionObj.Concerned =   img;

            var img = new Image();
            (img.src = "Data/Characters/char_5/emotions/Freakedout.png");
            actor5.EmotionObj.FreakedOut =  img;

            var img = new Image();
            (img.src = "Data/Characters/char_5/emotions/Happy.png");
            actor5.EmotionObj.Happy =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_5/emotions/Nervous.png");
            actor5.EmotionObj.Nervous =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_5/emotions/Sad.png");
            actor5.EmotionObj.Sad =         img;

            var img = new Image();
            (img.src = "Data/Characters/char_5/char5.png");
            actor5.EmotionObj.Neutral =     img;

            var icon = new Image();
            icon.src = "Data/Characters/char_5/icon/icon.png";
            actor5.icon = icon;

            actor5.room = GameEngine.Enums.Room.bedroom5;

			var actor6 = new GameEngine.Classes.Actor("Kayla", 6, "Data/Characters/char_6/char6.png", "F");
            var img = new Image();
            (img.src = "Data/Characters/char_6/emotions/Angry.png");
            actor6.EmotionObj.Angry =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_6/emotions/Annoyed.png");
            actor6.EmotionObj.Annoyed =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_6/emotions/Concerned.png");
            actor6.EmotionObj.Concerned =   img;

            var img = new Image();
            (img.src = "Data/Characters/char_6/emotions/Freakedout.png");
            actor6.EmotionObj.FreakedOut =  img;

            var img = new Image();
            (img.src = "Data/Characters/char_6/emotions/Happy.png");
            actor6.EmotionObj.Happy =       img;

            var img = new Image();
            (img.src = "Data/Characters/char_6/emotions/Nervous.png");
            actor6.EmotionObj.Nervous =     img;

            var img = new Image();
            (img.src = "Data/Characters/char_6/emotions/Sad.png");
            actor6.EmotionObj.Sad =         img;

            var img = new Image();
            (img.src = "Data/Characters/char_6/char6.png");
            actor6.EmotionObj.Neutral =     img;

            var icon = new Image();
            icon.src = "Data/Characters/char_6/icon/icon.png";
            actor6.icon = icon;

            actor6.room = GameEngine.Enums.Room.bedroom6;

			GameEngine.GlobalActors.push(actor1, actor2, actor3, actor4, actor5, actor6);
			
			//Pick random murderur
			
			//Pick murders Motive
			
			//Change Murderurs cards (To fit the game)
			
			//Get attribut for Murderur
			
			//Get Attributes for all actors except from murderur
            GameObj.CheckPointsForInit.CreateActors = true;
		},
		
		PickMurderMotive : function(){
			
			//Select random Motive
			
			//Select Cards Based Of Motive
		
		}
		
		
		
	},
	
	Classes : {

        GoToButton : function(_PosX, _PosY, _Width, _Height, _img, _RoomToGo, _placeForImage){
            this.PosY = _PosY;
            this.PosX = _PosX;
            this.Width = _Width;
            this.Height = _Height;
            this.image = _img;
            this.RoomToGo = _RoomToGo;
            this.placeForImage = _placeForImage;
            //this.image.src = _imgSrc;

        },

        AnswerButton : function(_PosX, _PosY,_Width,_Height, _LinesArr, _answerToSend,_gamecard, _actor){
            this.PosY = _PosY;
            this.PosX = _PosX;
            this.Width = _Width;
            this.Height = _Height;
            this.LinesArr = _LinesArr; //Array med rader som tillhör frågan..
            this.AnswerToSend = _answerToSend;
            this.GameCard = _gamecard;
            this.actor = _actor; //Vem som svarar på frågan är avgörande angående hur man ska hämta bild..
        },

        NextOrPreviousButton:function(_PosX, _PosY, _Width, _Height, _img, _pageToGo, _placeForImage){
            this.PosY = _PosY;
            this.PosX = _PosX;
            this.Width = _Width;
            this.Height = _Height;
            this.image = _img;
            this.pageToGo = _pageToGo;
            this.placeForImage = _placeForImage;
        },

        ContainerBoxButton : function(_PosX, _PosY,_Width,_Height,_gamecard){
            this.PosY = _PosY;
            this.PosX = _PosX;
            this.Width = _Width;
            this.Height = _Height;
            this.GameCard = _gamecard;
        },

        ActorBoxButton : function(_PosX, _PosY,_Width,_Height,_actor){
            this.PosY = _PosY;
            this.PosX = _PosX;
            this.Width = _Width;
            this.Height = _Height;
            this.actor = _actor;
        },

		GameHud : function(){
			this.ActiveRoom = GameEngine.Classes.Room; // Ska innehålla det aktiva rummet..
			//Hud och Tools ska ligga här också...
		},
		
		GameCard : function(_ID, _type, _name ,_Description, _needTheseCards, _image, _AnswerCards){
			this.ID = _ID;
			
			this.type = _type; // Kan vara antingen personlighetsakerna (secret, other, intress, relation) eller:
							//-WallClue  	=Om ledtråden endast går att ha på väggen
							//-TableClue	=Om ledtråden endast går att ha på en platt yta (golv, bord, etc)

            this.Name = _name;

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

        holdsArrAndString : function(_arr, _string){
            this.Arr = _arr;
            this.String = _string;
        },
		
		Container : function(_image){
			this.cardsOfContainer = []; 	// Varje Container kan innehålla max 3 GameCards
			this.image = new Image(); 				//URL till bilden Containern använder
            this.image.src = _image;
		},
		
		Room : function(_ID, _image, _roomname, _waypointsArr, _Containers_Arr, _TableClue_GameCards_Arr, _WallClue_GameCards_Arr){
			this.ID = _ID;
			this.roomname = _roomname;		//Namnen på rummen
			this.Containers = _Containers_Arr; 			//Varje rum kan innehålla 3 Containers, varav 2 är Papperskorg och Garderob () || Använder PLACEHOLDER
			this.TableClue_GameCards = _TableClue_GameCards_Arr;  //Varje rum kan innehålla max 5 GameCards av typen TableClue || Använder PLACEHOLDER
			this.WallClue_GameCards = _WallClue_GameCards_Arr; 	//Varje rum kan innehålla max 2 Gamecards av typen WallClue || Använder PLACEHOLDER
            this.image = new Image();

			this.image.src = _image; 		//URL till bilden som används för rummet.. || Använder PLACEHOLDER
			this.ActorsInRoom = [];			//En Array som innehåller ID't på alla aktörer i rummet..
			this.WayPoints = _waypointsArr; //En array med WayPoints-Object som är "Knappar" man kan trycka på för att ta sig till nästa rum eller tillbaka..
											//Ett rum har minst 1 Waypoint, det är alltid bakåt och refererar till rummet man var i Innan. || Använder PLACEHOLDER
		},
        PlaceHolder : function(_gameCardOrContent, _PosX, _PosY, _sizeWidth, _sizeHeight){ //till för att hålla ett kort samt kortets Position
            this.GameCardOrContent = _gameCardOrContent;
            this.PosX = _PosX;
            this.PosY = _PosY;
            this.SizeWidth = _sizeWidth;
            this.SizeHeight = _sizeHeight;
        },
		
		WayPoint : function(_GoToRoom, _image, _RoomName){
			this.GoToRoom = _GoToRoom; 	//Ett ID som symboliserar vilket rum man kommer i när man trycker på denna Waypoint
            this.image = new Image();   //|| Använder PLACEHOLDER
			this.image.src = _image;	//URL med bild på dörren(knappen) som tar dig till det andra rummet
			this.RoomName = _RoomName; 	//Namnet på rummet som man kommer till när man trycker...
		},
		
		Actor : function(_name, _ID, _image, _gender){
			this.name = _name;				//Namnet på aktören..
			this.isMurder = false;
            this.isVictim = false;
            this.role = null;           //Roll används till Actor 1-4 samt Other..
			this.ID = _ID;				//Alla Actors har ett ID som representerar vem dem är
			this.Secret = null; 		//GameCard av typen "Secret"
			this.Other = null;			//GameCard av typen "Other"
			this.Intress = null;		//GameCard av typen "intress"
			this.Relation = null;		//GameCard av typen "Relation"
			this.emotionState = GameEngine.Enums.EmotionState.Neutral;	//Vilken sinnesställning karaktären har, olika sinneställningar:
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
			this.image.src = _image;        //Url till Bild.
            this.EmotionObj = {
                Annoyed : null,
                Happy :null,
                Sad : null,
                FreakedOut :null,
                Neutral : null,
                Nervous : null,
                Angry : null,
                Concerned : null

            };
            this.room = null;           //här sätter vi ID't på det rum som tillhör Actorn..
            this.IsInThisRoom = null;
            this.icon = null;
            this.Gender = _gender; //F = femaile, M = Maile
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
		
		MotiveData : function(_motiveName,_motiveDescription, _LOC_other, _LOC_murderur, _LOC_victim, _LOC_actor1, _LOC_actor2, _LOC_actor3, _LOC_actor4){
		      this.motiveName     = _motiveName;      //string
              this.motiveDescription = _motiveDescription; //Lång string som beskriver mordet i detalj, ger ledtrådar till användaren..
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

        BlippBoxCard : function(_posX, _posY, _actor, _width, _Height, _gameCard){
            this.ActorOfBox = _actor;
            this.PosX = _posX;
            this.PosY = _posY;
            this.Width = _width;
            this.Height = _Height;
            this.GameCard = _gameCard;
        },

        SessionObs : function(_Expires, _data){
            this.Expires = _Expires;
            this.Data = _data;
        }


	}

};


var GameBubbleData = {
    PlayerBubblePosX: GameEngine.Machines.getPosition(0.04594330400782014, "x"),
    PlayerBubblePosY: GameEngine.Machines.getPosition(0.6756369882622387, "y"),
    ActorBubblePosX : GameEngine.Machines.getPosition(0.0469208211143695, "x"),
    ActorBubblePosY : GameEngine.Machines.getPosition(0.4981391354136845, "y"),
    SizeWidth       : GameEngine.Machines.getPosition(0.90, "x"),
    SizeHeight      : GameEngine.Machines.getPosition(0.15, "y"),
    TextHeight      : GameEngine.Machines.getPosition(0.016, "x"),

    BlippBoxWidth   :ScreenSpec.SizeX-(ScreenSpec.SizeX/8)*2,
    BlippBoxHeight  :ScreenSpec.gameFrameY-(ScreenSpec.gameFrameY/8)*2,
    BlippBoxPosX    : ScreenSpec.SizeX/8,
    BlippBoxPosY    : ScreenSpec.gameFrameY/8,

    PosXOfCrimBox   :null,
    PosYOfCrimBox   :null,
    WidthOfCrimBox  :null,
    HeightOfCrimBox :null
};



//window.onload = function(){
// ^Window.onload behövdes ej pga att detta ska göras efter att data lagts in..
/*
	GameData.initData(); //Läser in Kort/Bild-data
    GameEngine.init();  //Påbörjar session

*/
GameData.initData();
window.onload = function(){
    MenuBuildFunction();
};

//koden nedanför var till för att spara data, men det gick ej bra pga "Circular Refrencess.."
/*window.onbeforeunload = function(){
    //vad som ska hända när man stänger av webbläsaren..
    localStorage.removeItem("oldData"); // <--här tar vi bort den gamla gamla datan.. den blir ersatt
    //Först vill vi spara allt, detta vill vi göra i 2h, efter det ska datan ignoreras.
    var ObjWithData = {
        Date        : Date.now(),
        Actors      : GameEngine.GlobalActors,
        Rooms       : GameEngine.GlobalRooms,
        AllButtons  : GameEngine.GoToButtons,
        BusyCards   : GameEngine.BusyCards,
        Actives     : GameEngine.Actives,
        DataPHolder : GameEngine.DataPlaceHolder
    };
    var SaveObj = new GameEngine.Classes.SessionObs(Date.now(), ObjWithData);

    localStorage.setItem("oldData", JSON.stringify(ObjWithData));

    //När anvädnaren nästa gång går in på sidan så ska det kollas efters parad data, om
    //det finns data sparad (den som spars i 2h) så ska man få en fråga om man vill använda den eller ej
    //Detta görs i init funktionen..



     return "Are you sure you want to quit? Your game will be saved for the next 2 hours.";
};*/
	
//};



//Backup:
/*
ListQuestions : function(Question, PosX, PosY ,maxWidth,maxHeight, heigtOfLetters, ArrOfContent){

    var Words = Question.split(" "); //varje ord för ord i en array
    var line = "";
    var context = Ctx;
    var Rows = 1;
    var PosYFromStart = PosY;
    var OldPosY = PosY;
    var i = 0;
    //var PlacingFunction;

    //ta reda på var nästa fråga ska placeras.. basearat på höjden av föregående frågor..
    for(var n =0; n <GameEngine.GoToButtons.DialogButtons.length; n ++ ){
        PosYFromStart += GameEngine.GoToButtons.DialogButtons[n].Height;
    }
    var ContentSize = PosYFromStart-PosY;
    PosY = PosYFromStart;

    if(ContentSize > maxHeight){

        //Placerar ut "mer" knapp för att man ska kunna hämta ytterligare data..
        var downButton = new GameEngine.Classes.NextOrPreviousButton(
                PosX+ maxWidth+5,
                OldPosY + maxHeight - GameEngine.Machines.getPosition(0.03,"x"),
            GameEngine.Machines.getPosition(0.03,"x"),
            GameEngine.Machines.getPosition(0.03,"x"),
            GameData.GameDataImages.downButton,
            function() {
                for(var i = 1; i<GameEngine.GoToButtons.DialogButtons.length; i++ ){
                    GameEngine.Machines.ListQuestions(Question,PosX,PosY,maxWidth,maxHeight,heigtOfLetters)
                }
            }
        );
        GameEngine.Machines.WindowSizing(downButton.image,"gameframe",downButton.PosX,downButton.PosY, downButton.Width, downButton.Height)
        GameEngine.GoToButtons.DialogDownorUp.push(downButton);
        //Ctx.fillStyle = "rgb(63, 0, 0)";
        //PlacingFunction();

    }else {

        PlacingFunction();
    }
    function PlacingFunction(){
        for (i; i < Words.length; i++) {
            var testLine = line + Words[i] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && i > 0) {
                Ctx.fillStyle = "rgb(200, 40, 255)";
                Ctx.fillRect(
                        PosX - 5,
                        PosY - heigtOfLetters + 2,
                        maxWidth - 5,
                    heigtOfLetters
                );
                Ctx.fillStyle = "rgb(63, 0, 0)";

                context.fillText(line, PosX, PosY);
                line = Words[i] + ' ';
                PosY += heigtOfLetters;
                Rows++;
            } else {
                line = testLine;
            }
            if (i == Words.length - 1) { //Denna gör just denna text snutt till en fråga!
                Ctx.fillStyle = "rgb(200, 40, 255)";
                Ctx.fillRect(
                        PosX - 5,
                        PosY - heigtOfLetters + 2,
                        maxWidth - 5,
                        heigtOfLetters - 2 // Sista raden tar bort 2 från heightofletters för att det ska bli mellanrum för varje alternativ..
                );
                Ctx.fillStyle = "rgb(63, 0, 0)";
                context.fillText(line, PosX, PosY);
                var QuestionObj = new GameEngine.Classes.AnswerButton(
                    PosX,
                        PosYFromStart - heigtOfLetters, //tar bort höjden av bokstäverna så första raden inkluderas..
                    maxWidth,
                        Rows * heigtOfLetters
                )
                GameEngine.GoToButtons.DialogButtons.push(QuestionObj);
            }
        }
    };
}*/
