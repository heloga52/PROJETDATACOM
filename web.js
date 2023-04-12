var mqtt;

var reconnectTimeout = 2000;

var host="broker.mqttdashboard.com";

var port=8000;

var stateBlue=true;
var stateGreen=true;
var stateRed=true;

var potager = 1;

var temp1 = Math.floor(Math.random() * (30 - 15 + 1) + 15);
var temp2 = Math.floor(Math.random() * (30 - 15 + 1) + 15);
var temp3 = Math.floor(Math.random() * (30 - 15 + 1) + 15);

const max = 30;
const min = 15;
let intervalId;



function onFailure(message) {

    console.log("Connection Attempt to Host "+host+"Failed");

    setTimeout(MQTTconnect, reconnectTimeout);

}

async function onMessageArrived(msg){

    out_msg="Message received "+msg.payloadString+"<br>";

    out_msg=out_msg+"Message received Topic "+msg.destinationName;

    console.log(out_msg);

    if(msg.destinationName == "isen01/temp"){
                
        var parsedMessage = JSON.parse(msg.payloadString);
        var value = parsedMessage.value;
        console.log(value);
        document.getElementById("temperature").innerHTML = value+"°";
        
        document.getElementById("temperature1").innerHTML = temp1+"°";
        document.getElementById("temperature2").innerHTML = temp2+"°";
        document.getElementById("temperature3").innerHTML = temp3+"°";
        document.getElementById("indice1").innerHTML = temp1+"°";
        document.getElementById("indice2").innerHTML = temp2+"°";
        document.getElementById("indice3").innerHTML = temp3+"°";
        var y = document.getElementById("ideale1");
        if (temp1 >20){
            y.src = "image_web/chaud.png";
        } else y.src = "image_web/ideale.png";
        var y = document.getElementById("ideale2");
        if (temp2 <20){
            y.src = "image_web/froid.png";
        } else if (temp2 >=20 && temp2<=25) y.src = "image_web/ideale.png";
        else y.src = "image_web/chaud.png";
        var y = document.getElementById("ideale3");
        if (temp3 <25){
            y.src = "image_web/froid.png";
        } else y.src = "image_web/ideale.png";
    }

    else if(msg.destinationName == "isen01/button"){ 
        const obj = JSON.parse(msg.payloadString);
        if(obj.id == 1){
            /*BTN1 */
            if(potager == 1){
                var monElement = document.getElementById("potager2");
                monElement.style.border = "4px solid green";
                var monElement = document.getElementById("potager1");
                monElement.style.border = "None";
                var monElement = document.getElementById("potager3");
                monElement.style.border = "None";

                potager =2;
                SwitchLedGreen();
            }
            else if(potager == 2){
                var monElement = document.getElementById("potager3");
                monElement.style.border = "4px solid red";
                var monElement = document.getElementById("potager2");
                monElement.style.border = "None";
                var monElement = document.getElementById("potager2");
                monElement.style.border = "None";

                potager =3;
                SwitchLedRed();
            }
            else if(potager == 3){
                var monElement = document.getElementById("potager1");
                monElement.style.border = "4px solid blue";
                var monElement = document.getElementById("potager2");
                monElement.style.border = "None";
                var monElement = document.getElementById("potager3");
                monElement.style.border = "None";

                potager =1;
                SwitchLedBlue();
            }
            
        }
        else if(obj.id == 2){
           /* BTN2*/
           if(potager == 1){
            var x = document.getElementById("chaleur1");
            var image = document.getElementById("lampe1");
            if (image.src.match("lampe")) {
                x.src = "image_web/chaleur.png";
                if (x.style.display === "none") {
                    x.style.display = "block";
                    await attente();
                        temp1 +=3;
                        if(temp1 >max)temp1 = max;
                        
                        x.style.display = "none";
                      
                  } else {
                    x.style.display = "none";
                  }
            } 
            else if (image.src.match("arrosoir")) {
              x.src = "image_web/eau.png";
              if (x.style.display === "none") {
                x.style.display = "block";
                await attente();
                    temp1 -=3;
                    if(temp1 <min)temp1 = min;
                        x.style.display = "none";
                  
              } else {
                x.style.display = "none";
              }
            }
            var y = document.getElementById("ideale1");
            if (temp1 >20){
                y.src = "image_web/chaud.png";
            } else y.src = "image_web/ideale.png";
  
        }
        else if(potager == 2){
            var x = document.getElementById("chaleur2");
            var image = document.getElementById("lampe2");
            if (image.src.match("lampe")) {
                x.src = "image_web/chaleur.png";
                if (x.style.display === "none") {
                    x.style.display = "block";
                    await attente();
                        temp2 +=3;
                        if(temp2 >max)temp2 = max;
                        x.style.display = "none";
                      
                  } else {
                    x.style.display = "none";
                  }
            } 
            else if (image.src.match("arrosoir")) {
              x.src = "image_web/eau.png";
              if (x.style.display === "none") {
                x.style.display = "block";
                await attente();
                    temp2 -=3;
                    if(temp2 <min)temp2 = min;
                        x.style.display = "none";
              } else {
                x.style.display = "none";
              }
            }
            var y = document.getElementById("ideale2");
            if (temp2 <20){
                y.src = "image_web/froid.png";
            } else if (temp2 >=20 && temp2<=25) y.src = "image_web/ideale.png";
            else y.src = "image_web/chaud.png";
        }
        else if(potager == 3){
            var x = document.getElementById("chaleur3");
            var image = document.getElementById("lampe3");
            if (image.src.match("lampe")) {
                x.src = "image_web/chaleur.png";
                if (x.style.display === "none") {
                    x.style.display = "block";
                    await attente();
                        temp3 +=3;
                        if(temp3 >max)temp3 = max;
                        x.style.display = "none";
                  } else {
                    x.style.display = "none";
                  }
            } 
            else if (image.src.match("arrosoir")) {
              x.src = "image_web/eau.png";
              if (x.style.display === "none") {
                x.style.display = "block";
                await attente();
                    temp3 -=3;
                    if(temp3 <min)temp3 = min;
                    x.style.display = "none";
              } else {
                x.style.display = "none";
              }
            }
            var y = document.getElementById("ideale3");
            if (temp3 <25){
                y.src = "image_web/froid.png";
            } else y.src = "image_web/ideale.png";
            }
        }
    }

}

function onConnect() {

    console.log("Connected ");

    mqtt.subscribe("isen01/led");
    mqtt.subscribe("isen01/getTemp");
    mqtt.subscribe("isen01/button");
    mqtt.subscribe("isen01/temp");
    /*test si on est connecté : 
    var stringMessage = "{\"id\": 1,\"state\": 1}";
    message = new Paho.MQTT.Message(stringMessage.toString());
    message.destinationName = "isen01/led";
    message.retained=true;
    mqtt.send(message);
    */
}

function MQTTconnect() {

    console.log("connecting to "+ host +" "+ port);

    var x=Math.floor(Math.random() * 10000);

    var cname="orderform-"+x;

    mqtt = new Paho.MQTT.Client(host,port,cname);

    var options = {

        timeout: 3,

        onSuccess: onConnect,

        onFailure: onFailure,

    };

    mqtt.onMessageArrived = onMessageArrived

    mqtt.connect(options); //connect

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function attente() {
    await sleep(4000);
  }


function changeImageLampe() {
    
    if(potager == 1){
        changeLampe1();
    }
    else if(potager == 2){
        changeLampe2();
    }
    else if(potager == 3){
        changeLampe3();
        }

  }

function changeImageArr() {
    if(potager == 1){
        changeArr1();
    }
    else if(potager == 2){
        changeArr2();
    }
    else if(potager == 3){
        changeArr3();
        }
  }

function changeLampe1() {
    var image = document.getElementById("Lum_Arr1');
    image.src = "image_web/lampe.png";
  }
  function changeLampe2() {
    var image = document.getElementById('Lum_Arr2');
    image.src = "image_web/lampe.png";
  }
  function changeLampe3() {
    var image = document.getElementById('Lum_Arr3');
    image.src = "image_web/lampe.png";
  }
  function changeArr1() {
    var image = document.getElementById('Lum_Arr1');
      image.src = "image_web/arrosoir.png";
  }
  function changeArr2() {
    var image = document.getElementById('Lum_Arr2');
      image.src = "image_web/arrosoir.png";
  }
  function changeArr3() {
    var image = document.getElementById('Lum_Arr3');
      image.src = "image_web/arrosoir.png";
  }

function SwitchLedBlue() {
    var stringMessage ="";
    if (stateBlue) {
        stringMessage = "{\"id\": 1,\"state\": 1}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stringMessage = "{\"id\": 2,\"state\": 0}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stringMessage = "{\"id\": 3,\"state\": 0}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stateBlue = false;
        stateGreen = true;
    }
    else {
        stringMessage = "{\"id\": 1,\"state\": 0}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stateBlue = true;
    }
}

function SwitchLedGreen() {
    var stringMessage ="";
    if (stateGreen) {
        stringMessage = "{\"id\": 2,\"state\": 1}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stringMessage = "{\"id\": 1,\"state\": 0}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stringMessage = "{\"id\": 3,\"state\": 0}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stateGreen = false;
        stateRed = true;
    }
    else {
        stringMessage = "{\"id\": 2,\"state\": 0}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stateGreen = true;
    }
}

function SwitchLedRed() {
    var stringMessage ="";
    if (stateRed) {
        stringMessage = "{\"id\": 3,\"state\": 1}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stringMessage = "{\"id\": 1,\"state\": 0}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stringMessage = "{\"id\": 2,\"state\": 0}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stateRed = false;
        stateBlue = true;
    }
    else {
        var stringMessage = "{\"id\": 3,\"state\": 0}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stateRed = true;
    }
}
/*
function getTemperature(){
    var stringMessage =""
        stringMessage = "{\"request\": 1}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/getTemp";
        message.retained=true;
        mqtt.send(message);     
}  
*/
/*Problème: on reçoit un message de toutes les subscriptions dès le début */
/*FONCTIONS POUR TEST QUAND LA CARTE N'EST PAS DISPONIBLE*/
/*METTRE EN COMMENTAIRE AUSSI DANS WEB.HTML LES APPELS DES FONCTIONS */

function getTemperature() {
    var stringMessage =""
                  stringMessage = "{\"value\": 27}";
                  message = new Paho.MQTT.Message(stringMessage.toString());
                  message.destinationName = "isen01/temp";
                  message.retained=true;
                  mqtt.send(message);  
                  document.getElementById("temperature1").innerHTML = temp1+"°";
                  document.getElementById("temperature2").innerHTML = temp2+"°";
                  document.getElementById("temperature3").innerHTML = temp3+"°";
                  document.getElementById("indice1").innerHTML = temp1+"°";
                  document.getElementById("indice2").innerHTML = temp2+"°";
                  document.getElementById("indice3").innerHTML = temp3+"°";
                  var a = document.getElementById("ideale3");
            if (temp3 <25){
                a.src = "image_web/froid.png";
            } else a.src = "image_web/ideale.png"
            var b = document.getElementById("ideale2");
            if (temp2 <20){
                b.src = "image_web/froid.png";
            } else if (temp2 >=20 && temp2<=25) b.src = "image_web/ideale.png";
            else b.src = "image_web/chaud";
            var c = document.getElementById("ideale1");
            if (temp1 >20){
                c.src = "image_web/chaud.png";
            } else c.src = "image_web/ideale.png";
            
 }  

 function incrementation_btn1(){
    var stringMessage =""
                  stringMessage = "{\"id\": 1}";
                  message = new Paho.MQTT.Message(stringMessage.toString());
                  message.destinationName = "isen01/button";
                  message.retained=true;
                  mqtt.send(message);     
 } 
 function incrementation_btn2(){
    var stringMessage =""
                  stringMessage = "{\"id\": 2}";
                  message = new Paho.MQTT.Message(stringMessage.toString());
                  message.destinationName = "isen01/button";
                  message.retained=true;
                  mqtt.send(message);     
 } 
    
