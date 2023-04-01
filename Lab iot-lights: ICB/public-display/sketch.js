const URL = `${window.location.hostname}`;
let socket = io(URL, { path: '/real-time' });

const firstLed = document.querySelector('.first-light');
const secondLed = document.querySelector('.second-light');
const levelMessage = document.querySelector('.recommendation');

let ledAStatus = '';
let ledBStatus = '';
let lightMessage = '';
let enviroment = '';

firstLed.addEventListener('click', ()=>{
    switch(ledAStatus){
        case 'Led 1 is off':
            socket.emit('lightA','A');
            firstLed.innerHTML = "Turn Off";
        break;

        case 'Led 1 is on':
            socket.emit('lightA','S');
            firstLed.innerHTML = "Turn On";
        break;
    }
})

secondLed.addEventListener('click', ()=>{
    switch(ledBStatus){
        case 'Led 2 is off':
            socket.emit('lightB', 'B');
            secondLed.innerHTML = "Turn Off";
        break;

        case 'Led 2 is on':
            socket.emit('lightB', 'N');
            secondLed.innerHTML = "Turn On";
        break;
    }
})


socket.on('led-status', message => {
    ledAStatus = message.ledAStatus;
    ledBStatus = message.ledBStatus;
    lightMessage = message.lightStatus;

    switch (lightMessage) {
        case 'light is Normal':
            enviroment = "Light is normal, we don't consider to turn the lights on unless you need it";
            levelMessage.innerHTML = `${enviroment}`;
        break;
    
        case 'light is High':
            enviroment = "Light is high, don't waste energy";
            levelMessage.innerHTML = `${enviroment}`;
        break;
    
        case 'light is Low':
            enviroment = "Light is low, we recommend you to turn on your lights";
            levelMessage.innerHTML = `${enviroment}`;
        break;

    }
})



