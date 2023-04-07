var mqtt;

var reconnectTimeout = 2000;

var host="broker.mqttdashboard.com";

var port=8000;

var stateBlue=true;
var stateGreen=true;
var stateRed=true;

var value_btn1 = 0;
var value_btn2 = 0;
var value_totale = 0;

var clim1 = 0;
var clim2 = 0;

function onFailure(message) {

    console.log("Connection Attempt to Host "+host+"Failed");

    setTimeout(MQTTconnect, reconnectTimeout);

}

function onMessageArrived(msg){

    out_msg="Message received "+msg.payloadString+"<br>";

    out_msg=out_msg+"Message received Topic "+msg.destinationName;

    console.log(out_msg);

    if(msg.destinationName == "isen01/temp"){
                
        var parsedMessage = JSON.parse(msg.payloadString);
        var value = parsedMessage.value;
        console.log(value);
        document.getElementById("temperature").innerHTML = value+"°";
    }

    else if(msg.destinationName == "isen01/button"){ 
        const obj = JSON.parse(msg.payloadString);
        if(obj.id == 1){
            console.log(obj.id);
            value_btn1 ++;
            console.log(value_btn1);
            document.getElementById("count_btn1").innerHTML = value_btn1;
            if(clim1 ==0){
            clim1 = 1;
            console.log(clim1);
            }
            else if(clim1 ==1){
                clim1 = 0;
                console.log(clim1);
                }
        }
        else if(obj.id == 2){
            console.log(obj.id); 
            value_btn2 ++;
            console.log(value_btn2);
            document.getElementById("count_btn2").innerHTML = value_btn2;
            if(clim2 ==0){
                clim2 = 1;
                console.log(clim2);
                }
                else if(clim2 ==1){
                    clim2 = 0;
                    console.log(clim2);
                    }
        }
        value_totale = value_btn1 + value_btn2;
        console.log(value_totale);
        document.getElementById("count_total").innerHTML = value_totale;
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

function SwitchLedBlue() {
    var stringMessage ="";
    if (stateBlue) {
        stringMessage = "{\"id\": 1,\"state\": 1}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stateBlue = false;
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
        stateGreen = false;
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
        var stringMessage = "{\"id\": 3,\"state\": 1}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/led";
        message.retained=true;
        mqtt.send(message);
        stateRed = false;
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

function getTemperature(){
    var stringMessage =""
        stringMessage = "{\"request\": 1}";
        message = new Paho.MQTT.Message(stringMessage.toString());
        message.destinationName = "isen01/getTemp";
        message.retained=true;
        mqtt.send(message);     
}  

/*Problème: on reçoit un message de toutes les subscriptions dès le début */
/*FONCTIONS POUR TEST QUAND LA CARTE N'EST PAS DISPONIBLE*/
/*METTRE EN COMMENTAIRE AUSSI DANS WEB.HTML LES APPELS DES FONCTIONS */
/*
function getTemperature(){
    var stringMessage =""
                  stringMessage = "{\"value\": 27}";
                  message = new Paho.MQTT.Message(stringMessage.toString());
                  message.destinationName = "isen01/temp";
                  message.retained=true;
                  mqtt.send(message);     
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
 */   
