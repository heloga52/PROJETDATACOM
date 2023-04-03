// Connexion au broker MQTT
var client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(1883), "clientId");

client.connect({
    onSuccess: function() {
        console.log("Connecté au broker MQTT");
    },
    onFailure: function(message) {
        console.log("Echec de connexion au broker MQTT: " + message.errorMessage);
    }
});

// Fonction pour publier un message sur un topic
function publierMessage(topic, message) {
    var message = new Paho.MQTT.Message(message);
    message.destinationName = topic;
    client.send(message);
    console.log("Message envoyé sur le topic " + topic + ": " + message.payloadString);
}


// Compteur de clics
var countButton = document.getElementById("countButton");
var count = document.getElementById("count");
var clickCount = 0;
countButton.addEventListener("click", function() {
    clickCount++;
    count.innerHTML = clickCount;
    });

// Contrôle de la LED
var redButton = document.querySelector(".red");
var greenButton = document.querySelector(".green");
var blueButton = document.querySelector(".blue");
redButton.addEventListener("click", function() {
    // Envoyer une commande à la carte STM32 pour allumer la LED rouge
    });
greenButton.addEventListener("click", function() {
    // Envoyer une commande à la carte STM32 pour allumer la LED verte
    });
blueButton.addEventListener("click", function() {
    // Envoyer une commande à la carte STM32 pour allumer la LED bleue
    });

// Affichage de la courbe de température
// Utiliser une bibliothèque de graphiques comme Chart.js pour afficher la courbe de température
