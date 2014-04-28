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

            var Button = GameEngine.GoToButtons.backButton;
            //Kontrollerar om bakåt knappen trycktes på..
            if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height ){
                //alert(mX +" || " + mY);
                GameEngine.Machines.clearRoomData();
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
                        GameEngine.Machines.BuildRoom(Button.GameCardOrContent.GoToRoom);
                    }

                }else {
                    if (mX >= Button.PosX && mX < Button.PosX + (Button.GameCardOrContent.image.width / widthOfObj) &&
                        mY >= Button.PosY && mY < Button.PosY + (Button.GameCardOrContent.image.height / heighOfObj)) {
                        GameEngine.Machines.clearRoomData();
                        GameEngine.Machines.BuildRoom(Button.GameCardOrContent.GoToRoom);
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

        }
    });

    //Denna Eventlistner kollar vad som Hovras över och ser till att markera klickbara objekt med Cursor: Pointern!
    Ctx.canvas.addEventListener('mousemove', function(event) {
        if(event.button == 0){
            var mX = event.clientX - Ctx.canvas.offsetLeft + scrollX;
            var mY = event.clientY - Ctx.canvas.offsetTop + scrollY;
            //alert(mX +" || " + mY);

            var Button = GameEngine.GoToButtons.backButton;
            if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height ){
                //alert(mX +" || " + mY);
                document.body.style.cursor = "pointer";
                return;

            }else{
                document.body.style.cursor = "default";
            }

            var widthOfObj = ScreenSpec.BackgroundStandardSizeX / ScreenSpec.SizeX;
            var heighOfObj = ScreenSpec.BackgroundStandardSizeY / ScreenSpec.gameFrameY;
            for(var i =0; i < GameEngine.GoToButtons.WayPoints.length; i++){
                Button = GameEngine.GoToButtons.WayPoints[i];
//                console.log(mX >= Button.PosX );
//                console.log(mX < Button.PosX + (Button.GameCardOrContent.image.width ));
//                console.log(mY >= Button.PosY);
//                console.log(mY < Button.PosY + (Button.GameCardOrContent.image.height ));
                if(Button.SizeWidth != undefined || Button.SizeHeight != undefined){ //Om Placeholdern har en storlek, använd den
                    if(mX >= Button.PosX && mX < Button.PosX + (Button.SizeWidth ) &&
                        mY >= Button.PosY && mY < Button.PosY + (Button.SizeHeight )){
                        document.body.style.cursor = "pointer";
                        return;

                    }else{
                        document.body.style.cursor = "default";

                    }

                }else{ // Om placeholdern inte har en storlek, använd bilden storlek..
                    if(mX >= Button.PosX && mX < Button.PosX + (Button.GameCardOrContent.image.width / widthOfObj) &&
                        mY >= Button.PosY && mY < Button.PosY + (Button.GameCardOrContent.image.height / heighOfObj)){
                        document.body.style.cursor = "pointer";
                        return;

                    }else{
                        document.body.style.cursor = "default";

                    }
                }

            }
            //hover om någon Fram/bak-knapp hovras på..
            for(var i = 0; i < GameEngine.GoToButtons.prevOrNextButton.length; i++){
                Button = GameEngine.GoToButtons.prevOrNextButton[i];
                if(mX >= Button.PosX && mX < Button.PosX + Button.Width && mY >= Button.PosY && mY < Button.PosY + Button.Height){
                    document.body.style.cursor = "pointer";
                    return;

                }else{
                    document.body.style.cursor = "default";

                }
            }
        }
    });


var GameEngine = {
    GlobalRooms : [],
	GlobalActors : [],
    GoToButtons : {
        backButton : "",
        WayPoints : [],
        ContainerButton : [],
        prevOrNextButton : []

    },
	
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
                        GameEngine.Machines.getPosition(0.895405669599218, "x"),
                        GameEngine.Machines.getPosition(0.6618952190094475, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/cabinet.jpg"),
                        GameEngine.Machines.getPosition(0.2883675464320626, "x"),
                        GameEngine.Machines.getPosition(0.16490123103349555, "y"),
                        GameEngine.Machines.getPosition(0.20, "x"),
                        GameEngine.Machines.getPosition(0.20, "y")
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
                        new GameEngine.Classes.WayPoint(5,"Data/Map/Bedrom_1/doors_1.png", "Bedroom 1"),
                        GameEngine.Machines.getPosition(0.0075  , "x"), //XPosition
                        0  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(6,"Data/Map/Bedrom_2/doors_2-left.png", "Bedroom 2"),
                        GameEngine.Machines.getPosition(0.24125, "x"), //XPosition
                        GameEngine.Machines.getPosition(0.18  , "y")  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(7,"Data/Map/Bedrom_3/doors_3-left.png", "Bedroom 3"),
                        GameEngine.Machines.getPosition(0.32375  , "x"), //XPosition
                        GameEngine.Machines.getPosition(0.25466666666666665  , "y")  //YPosition
                    ),

                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(8,"Data/Map/Bedrom_4/doors_1-right.png", "Bedroom 4"),
                        GameEngine.Machines.getPosition(0.8425   , "x"), //XPosition
                        0  //YPosition

                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(9,"Data/Map/Bedrom_5/doors_2-right.png", "Bedroom 5"),
                        GameEngine.Machines.getPosition(0.70625, "x"), //XPosition
                        GameEngine.Machines.getPosition(0.18   , "y")  //YPosition
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(10,"Data/Map/Bedrom_6/doors_3-right.png", "Bedroom 6"),
                        GameEngine.Machines.getPosition(0.6425, "x"), //XPosition
                        GameEngine.Machines.getPosition(0.26, "y")  //YPosition

                    )
                ],
                [//Containers_Arr
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/recyclebin.png"),
                        GameEngine.Machines.getPosition(0.4232649071358749, "x"),
                        GameEngine.Machines.getPosition(0.4683653020326367, "y"),
                        GameEngine.Machines.getPosition(0.05, "x"),
                        GameEngine.Machines.getPosition(0.07, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/placeholder.jpg"),
                        GameEngine.Machines.getPosition(0.5865102639296188 , "x"),
                        GameEngine.Machines.getPosition(0.3103349556255368, "y"),
                        GameEngine.Machines.getPosition(0.05, "x"),
                        GameEngine.Machines.getPosition(0.20, "y")
                    )
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
                        new GameEngine.Classes.Container("Data/Map/Extras/placeholder.jpg"),
                        GameEngine.Machines.getPosition(0.002932551319648094  , "x"),
                        GameEngine.Machines.getPosition(0.24506155167477814, "y"),
                        GameEngine.Machines.getPosition(0.05, "x"),
                        GameEngine.Machines.getPosition(0.20, "y")
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
                        new GameEngine.Classes.Container("Data/Map/Extras/placeholder.jpg"),
                        GameEngine.Machines.getPosition(0.9100684261974584  , "x"),
                        GameEngine.Machines.getPosition(0.27483538505582594, "y"),
                        GameEngine.Machines.getPosition(0.05, "x"),
                        GameEngine.Machines.getPosition(0.20, "y")
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
                        GameEngine.Machines.getPosition(0.7086999022482894, "x"),
                        GameEngine.Machines.getPosition(0.6069281419982823, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/placeholder.jpg"),
                        GameEngine.Machines.getPosition(0.002932551319648094  , "x"),
                        GameEngine.Machines.getPosition(0.24506155167477814, "y"),
                        GameEngine.Machines.getPosition(0.05, "x"),
                        GameEngine.Machines.getPosition(0.20, "y")
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
                        new GameEngine.Classes.Container("Data/Map/Extras/placeholder.jpg"),
                        GameEngine.Machines.getPosition(0.002932551319648094  , "x"),
                        GameEngine.Machines.getPosition(0.24506155167477814, "y"),
                        GameEngine.Machines.getPosition(0.05, "x"),
                        GameEngine.Machines.getPosition(0.20, "y")
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
                        GameEngine.Machines.getPosition(0.7086999022482894, "x"),
                        GameEngine.Machines.getPosition(0.6069281419982823, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/placeholder.jpg"),
                        GameEngine.Machines.getPosition(0.002932551319648094  , "x"),
                        GameEngine.Machines.getPosition(0.24506155167477814, "y"),
                        GameEngine.Machines.getPosition(0.05, "x"),
                        GameEngine.Machines.getPosition(0.20, "y")
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
                        GameEngine.Machines.getPosition(0.7086999022482894, "x"),
                        GameEngine.Machines.getPosition(0.6069281419982823, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/placeholder.jpg"),
                        GameEngine.Machines.getPosition(0.002932551319648094  , "x"),
                        GameEngine.Machines.getPosition(0.24506155167477814, "y"),
                        GameEngine.Machines.getPosition(0.05, "x"),
                        GameEngine.Machines.getPosition(0.20, "y")
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
                        new GameEngine.Classes.WayPoint(2,"Data/Map/Hallway_2/left.jpg", "Hallway"),
                        GameEngine.Machines.getPosition(0.46375 , "x"), //XPosition
                        GameEngine.Machines.getPosition(0.252, "y"),  //YPosition
                        GameEngine.Machines.getPosition(0.03, "x"),
                        GameEngine.Machines.getPosition(0.03, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(11,"Data/Map/Kitchen/door.png", "Kitchen"),
                        GameEngine.Machines.getPosition(0.5025, "x"),//XPosition
                        GameEngine.Machines.getPosition(0.304, "y")
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
                        GameEngine.Machines.getPosition(0.18, "y")//YPosition


                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(3,"Data/Map/Hallway_3/right.jpg", "Hallway End"),
                        GameEngine.Machines.getPosition(0.54625, "x" ), //XPosition
                        GameEngine.Machines.getPosition(0.26, "y" ),//YPosition
                        GameEngine.Machines.getPosition(0.03, "x"), //Bredd
                        GameEngine.Machines.getPosition(0.03, "y") //Höjd
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
                        GameEngine.Machines.getPosition(0.256, "y")  //YPosition

                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.WayPoint(12,"Data/Map/TvRoom/door.png", "Tv-Room"),
                        GameEngine.Machines.getPosition(0.4675, "x"), //XPosition
                        GameEngine.Machines.getPosition(0.304, "y")  //YPosition
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
                "Data/Map/Kitchen/kitchen.JPG",
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
                        GameEngine.Machines.getPosition(0.03421309872922776, "x"),
                        GameEngine.Machines.getPosition(0.7477812768393931, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/placeholder.jpg"),
                        GameEngine.Machines.getPosition(0.6256109481915934, "x"),
                        GameEngine.Machines.getPosition(0.14543372459204124, "y"),
                        GameEngine.Machines.getPosition(0.075, "x"),
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
                        GameEngine.Machines.getPosition(0.29227761485826004  , "x"),
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
                "Data/Map/TvRoom/tvroom.jpg",
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
                        GameEngine.Machines.getPosition(0.39589442815249265, "x"),
                        GameEngine.Machines.getPosition(0.7145720011451474, "y"),
                        GameEngine.Machines.getPosition(0.08, "x"),
                        GameEngine.Machines.getPosition(0.10, "y")
                    ),
                    new GameEngine.Classes.PlaceHolder(
                        new GameEngine.Classes.Container("Data/Map/Extras/placeholder.jpg"),
                        GameEngine.Machines.getPosition(0.8347996089931574 , "x"),
                        GameEngine.Machines.getPosition(0.195820211852276, "y"),
                        GameEngine.Machines.getPosition(0.075, "x"),
                        GameEngine.Machines.getPosition(0.15, "y")
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
			GameEngine.GlobalRooms.push(hallway1,hallway2,hallway3,prebedroom,bedroom1,bedroom2,bedroom3,bedroom4,bedroom5,bedroom6,tvroom,kitchen,tvroom,bathroom);
						
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

		},

        placeContainers : function(PlaceholderWithContent){
            var width, height;
            if(PlaceholderWithContent.SizeWidth == undefined || PlaceholderWithContent.SizeHeight == undefined){
                height = PlaceholderWithContent.GameCardOrContent.image.height;
                width = PlaceholderWithContent.GameCardOrContent.image.width;
            }else{
                width = PlaceholderWithContent.SizeWidth,
                height = PlaceholderWithContent.SizeHeight
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
                    750,
                    50,
                    50,
                    GameData.GameDataImages.backButton,
                    RoomToGoTo,
                    "hudd"
                );

               //backButton.image.addEventListener("mousedown", function(){
               //     GameEngine.Machines.BuildRoom(roomToBuild);
               //});
                GameEngine.GoToButtons.backButton = backButton;

                GameEngine.Machines.WindowSizing(backButton.image, backButton.placeForImage, 30, 750, 50, 50);
            }else{
                alert("PlaceBackButton funktionen anropades innan nödvändig data var inläst..");
            }

        },
        //Functionen wrapText är tagen från : http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
        //Och innehåller ingen egen skriven kod.. EDIT: lägger till MaxHeight, för att kunna skrolla om det blir mycket text.
        wrapText : function(context, text, x, y, maxWidth, lineHeight, textHeight, maxHeight, counter, nBeforeX, nBeforeValue){
            var words, line, whenToStopNewLines, n, topPos;
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


            for(n ; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                    whenToStopNewLines += textHeight;
                    if(whenToStopNewLines >= maxHeight){
                        GameEngine.Machines.clearRoomData();
                        var nextButton = new GameEngine.Classes.NextOrPreviousButton(
                            x + maxWidth,
                            topPos + maxHeight,
                            GameEngine.Machines.getPosition(0.03,"x"),
                            GameEngine.Machines.getPosition(0.03,"x"),
                            GameData.GameDataImages.nextButton,
                            function(){

                                Ctx.fillStyle = "rgb(0, 102, 255)";
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
                                Ctx.fillStyle = "rgb(63, 0, 0)";
                                nBefore.push(n);
                                GameEngine.Machines.wrapText(Ctx, words, x, topPos, maxWidth, lineHeight,textHeight, maxHeight, n, nBefore)

                            }

                        );
                        GameEngine.Machines.WindowSizing(nextButton.image,"gameframe",nextButton.PosX,nextButton.PosY, nextButton.Width, nextButton.Height)
                        GameEngine.GoToButtons.prevOrNextButton.push(nextButton);
                        if(true){
                            var backButton = new GameEngine.Classes.NextOrPreviousButton(
                                x - 55,
                                topPos + maxHeight,
                                GameEngine.Machines.getPosition(0.03,"x"),
                                GameEngine.Machines.getPosition(0.03,"x"),
                                GameData.GameDataImages.prevButton,
                                function(){
                                    Ctx.fillStyle = "rgb(0, 102, 255)";
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
                                    Ctx.fillStyle = "rgb(63, 0, 0)";

                                    nBefore.pop();
                                    GameEngine.Machines.wrapText(Ctx, words, x, topPos, maxWidth, lineHeight,textHeight, maxHeight, nBefore[nBefore.length-1], nBefore)

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
            context.fillText(line, x, y);
        },

        InterviewActor : function(actor){
            //Hämtar ner data så att datan kan tas bort (så att inga knappar kan tryckas på..)
            //Medans InterviewFasen pågår.
            var GlobalRooms, GoToButtons, GlobalActors,ActorBubblePosX,ActorBubblePosY, SizeWidth, SizeHeight, TextHeight;
            GlobalRooms = GameEngine.GlobalRooms;
            GoToButtons = GameEngine.GoToButtons;
            GlobalActors =GameEngine.GlobalActors;
            GameEngine.Machines.clearRoomData();

            //Fyller i bakgrunden för att demonstrera att inget är klickbart
            Ctx.fillStyle = "rgba(119, 119, 119, 0.65)";
            Ctx.fillRect(0,0,ScreenSpec.SizeX, ScreenSpec.gameFrameY);

            //Ritar upp PratRuta för Aktör
            Ctx.fillStyle = "rgb(0, 102, 255)";

            ActorBubblePosX = GameEngine.Machines.getPosition(0.0469208211143695, "x");
            ActorBubblePosY = GameEngine.Machines.getPosition(0.4981391354136845, "y");
            SizeWidth = GameEngine.Machines.getPosition(0.90, "x");
            SizeHeight = GameEngine.Machines.getPosition(0.15, "y");
            Ctx.fillRect(
                ActorBubblePosX,
                ActorBubblePosY,
                SizeWidth,
                SizeHeight
            );
            //Byter till textfärg..
            TextHeight = GameEngine.Machines.getPosition(0.016, "x");
            Ctx.fillStyle = "rgb(63, 0, 0)";
            Ctx.font= TextHeight+"px arial, sans-serif";
            GameEngine.Machines.wrapText(Ctx,"Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
                    " Donec eu tortor ut ligula condimentum vehicula. Aliquam iaculis non est posuere convallis. Nulla erat mi, vehicula" +
                    " ac odio non, auctor interdum nulla. Pellentesque sed semper quam, a bibendum felis. Sed sollicitudin dictum convallis." +
                    " Donec sodales, massa vitae mollis porttitor, eros lectus congue nunc, sit amet vehicula metus eros vitae nisl. Etiam risus " +
                    "enim, aliquam vel posuere quis, euismod in elit. Sed lacinia ante nec diam tristique, ac interdum turpis sagittis." +
                    " Aliquam id volutpat quam. Donec sit amet accumsan justo, volutpat sodales velit. Quisque sit amet erat nibh. Morbi " +
                    "interdum mi leo, nec molestie ipsum tempus id. Donec ullamcorper risus orci, quis fermentum dolor accumsan vitae." +
                    " Praesent lobortis leo magna, vel luctus augue tempus nec. In id ligula mauris.         Pellentesque est felis, " +
                    "suscipit et ultrices at, placerat eget mi. Integer eget tempus neque, et mattis ipsum. Cras nec molestie arcu. " +
                    "Vivamus sed leo ut nibh accumsan blandit sed bibendum tellus. Suspendisse feugiat erat tellus, quis ornare augue eleifend ac." +
                    " Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec eu mauris pulvinar, accumsan urna sit amet, imperdiet urna." +
                    " Praesent gravida, orci a ultricies laoreet, dui dolor cursus orci, id mattis risus turpis in eros.               Sed sodales nisi " +
                    "eget lectus aliquam posuere. Proin eleifend lobortis enim ut viverra. Fusce vestibulum mauris non molestie convallis. Aenean id risus " +
                    "aliquam, ornare turpis sit amet, aliquam massa. Nullam condimentum sit amet velit quis tempus. Maecenas faucibus, nulla eu aliquam molestie," +
                    " ipsum orci congue enim, vitae ultrices ante neque quis lacus. Donec eget imperdiet dolor. Cras faucibus lacus purus." +
                    " Etiam a velit ut purus sodales semper at ut diam. Proin sed accumsan turpis. Cum sociis natoque penatibus et magnis " +
                    "dis parturient montes, nascetur ridiculus mus.               Aliquam vitae sem id neque sodales vulputate. Suspendisse eu magna" +
                    " vitae ante eleifend aliquet. Praesent eu egestas ante. Maecenas sapien augue, commodo eget orci a, pellentesque congue libero." +
                    " Pellentesque bibendum mollis tortor. Aenean a dictum odio. Etiam dictum quis nisl a volutpat. Donec blandit ultrices ante eu egestas. " +
                    "Sed eros leo, mattis in mi id, lacinia vehicula enim. Praesent condimentum mi sed ante aliquam, ac semper nulla viverra. Donec ornare " +
                    "sed risus id egestas.               Sed lacus libero, imperdiet at facilisis ut, tempor nec massa. Aenean imperdiet, nunc eget commodo" +
                    " eleifend, sem erat placerat nunc, at convallis neque odio a nunc. Fusce tempor sem vitae vehicula ultricies. Vestibulum tempor laoreet" +
                    " feugiat. In varius adipiscing leo, vel porttitor mi elementum a. Nulla dignissim mi nulla, a " +
                    "blandit elit vestibulum quis. Fusce et viverra orci. Cras pretium dolor quis enim rutrum tincidunt." +
                    " Mauris pellentesque lorem dapibus posuere tincidunt. Donec id lectus felis. Maecenas a odio quis" +
                    " tortor condimentum gravida. Aenean ut diam nec sapien commodo venenatis. Cras eget erat turpis." +
                    " Morbi volutpat, velit auctor auctor aliquam, purus enim tristique sem, nec vulputate metus purus" +
                    " ultrices leo. Interdum et malesuada fames ac ante ipsum primis in faucibus.!"
             ,ActorBubblePosX+20, ActorBubblePosY +25,SizeWidth-15, 20, TextHeight +10, SizeHeight-10);


            //Skjuter tillbaka datan så att den kan användas utanför IntervjuFasen..
            //OBS denna + att spara datan i variabel (högst upp) fungerar EJ!!!! (än..)
            GameEngine.GlobalRooms = GlobalRooms;
            GameEngine.GoToButtons = GoToButtons;
            GameEngine.GlobalActors = GlobalActors;

        },
		
		CreateActors : function(){
			
			//Init all Actor
			var actor1 = new GameEngine.Classes.Actor("Lulle", 1, "Data/Characters/char_1/lulle.jpg");
			var actor2 = new GameEngine.Classes.Actor("Billy", 2, "Data/Characters/char_2/billy.jpg");
			var actor3 = new GameEngine.Classes.Actor("Bobb", 3, "Data/Characters/char_3/bobb.jpg");
			var actor4 = new GameEngine.Classes.Actor("Ben", 4, "Data/Characters/char_4/Ben.jpg");
			var actor5 = new GameEngine.Classes.Actor("Loue", 5, "Data/Characters/char_5/Loue.jpg");
			var actor6 = new GameEngine.Classes.Actor("Tom", 6, "Data/Characters/char_6/Tom.jpg");
			
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
        NextOrPreviousButton:function(_PosX, _PosY, _Width, _Height, _img, _pageToGo, _placeForImage){
            this.PosY = _PosY;
            this.PosX = _PosX;
            this.Width = _Width;
            this.Height = _Height;
            this.image = _img;
            this.pageToGo = _pageToGo;
            this.placeForImage = _placeForImage;
        },

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



//window.onload = function(){
// ^Window.onload behövdes ej pga att detta ska göras efter att data lagts in..

	GameData.initData(); //Läser in Kort/Bild-data
    GameEngine.init();  //Påbörjar session
	
//};
