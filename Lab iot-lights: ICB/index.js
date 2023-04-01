import { express, Server, cors, SerialPort, ReadlineParser } from './dependencies.js'

const PORT = 5050;

//⚙️ HTTP COMMUNICATION SETUP _________________________________________________
const app = express();
const STATIC_IOT_CONTROL = express.static('public-display');
app.use('/iot-controller', STATIC_IOT_CONTROL);
app.use(express.json());

//============================================ END

//⚙️ SERIAL COMMUNICATION SETUP -------------------------------------------------
const protocolConfiguration = { // *New: Defining Serial configurations
    path: '/dev/cu.usbmodem14101', //*Change this COM# or usbmodem#####
    baudRate: 9600
};
    const port = new SerialPort(protocolConfiguration);

// //El parser es para desencriptar el mensaje de Arduino
const parser = port.pipe(new ReadlineParser);
parser.on('data', (arduinoData) =>{
    // console.log(arduinoData);
    let dataArray = arduinoData.split("-");
    let ledStatus = {
        ledAStatus: dataArray[0],
        ledBStatus: dataArray[1],
        lightStatus: dataArray[2],
    }
    console.log(ledStatus);
    ioServer.emit('led-status', ledStatus);
})
//============================================ END

//⚙️ WEBSOCKET COMMUNICATION SETUP -------------------------------------------------
const httpServer = app.listen(PORT, () => {
    console.table(
        {
            'Controller UI:' : 'https://localhost:5050/iot-controller',
        }
    )
});
const ioServer = new Server(httpServer, { path: '/real-time' });
//============================================ END

/* 🔄 SERIAL COMMUNICATION WORKING___________________________________________
Listen to the 'data' event, arduinoData has the message inside*/


/* 🔄 WEBSOCKET COMMUNICATION __________________________________________

1) Create the socket methods to listen the events and emit a response
It should listen for directions and emit the incoming data.*/

ioServer.on('connection', (socket) => {

    socket.on('lightA', message => {
        port.write(message);

    })

    socket.on('lightB', message => {
        port.write(message);

    })

});

/* 🔄 HTTP COMMUNICATION ___________________________________________

2) Create an endpoint to POST user score and print it
_____________________________________________ */

// app.post('/score', (request, response) =>{
//     console.log(request.body);
//     port.write('P');
//     response.end();
// })