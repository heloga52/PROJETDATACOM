var mqtt;

        var reconnectTimeout = 2000;

        //var host="192.168.1.163"; //change this

        //var host="82.165.158.236";

        //var host="steve-laptop"; //change this

        var host="broker.mqttdashboard.com";

        var port=8000;

var stateBlue=true;
var stateGreen=true;
var stateRed=true;

        //var port=9001;

        //var port=8881;

       

        function onFailure(message) {

            console.log("Connection Attempt to Host "+host+"Failed");

            setTimeout(MQTTconnect, reconnectTimeout);

        }

        function onMessageArrived(msg){

            out_msg="Message received "+msg.payloadString+"<br>";

            out_msg=out_msg+"Message received Topic "+msg.destinationName;

            console.log(out_msg);




        }

        function onConnect() {

            console.log("Connected ");

            mqtt.subscribe("isen01/led");
            mqtt.subscribe("isen01/button");
            mqtt.subscribe("isen01/getTemp");
            mqtt.subscribe("isen01/temp");

            var stringMessage = "{\"id\": 1,\"state\": 1}";

            message = new Paho.MQTT.Message(stringMessage.toString());

            message.destinationName = "isen01/led";

            message.retained=true;

            mqtt.send(message);

      }

      function MQTTconnect() {

        console.log("connecting to "+ host +" "+ port);

            var x=Math.floor(Math.random() * 10000);

        var cname="orderform-"+x;

        mqtt = new Paho.MQTT.Client(host,port,cname);

        //document.write("connecting to "+ host);

        var options = {

            timeout: 3,

            onSuccess: onConnect,

            onFailure: onFailure,

             };

         mqtt.onMessageArrived = onMessageArrived

         mqtt.connect(options); //connect

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

 function getTemperature(){
    var stringMessage =""
                  stringMessage = "{\"request\": 1}";
                  message = new Paho.MQTT.Message(stringMessage.toString());
                  message.destinationName = "isen01/getTemp";
                  message.retained=true;
                  mqtt.send(message);
                // Envoi d'une requête de température sur le sujet "temperature"
                mqttClient.publish('getTemp', 'get');
        
 }
      
        
