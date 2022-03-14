// Creating Central Server

// Importing essential packages
const express = require('express');  

// Importing from utils.js
const {makeid} = require('./utils');

// Stores data about all the rooms
const rooms = [];

class Server{
  
  constructor(){
      this.PORT = 3000 || process.env.PORT;
      this.initCreateServer();
      this.initSocketConnection();
      this.start();
  }

  initCreateServer(){
      // Setting up the http server
      const app = express();  
      this.server = require('http').createServer(app);  
  }

  initSocketConnection(){
    // Setting up socket connection with incoming request from http://localhost:8000" (client server) socket.io 
    const io = require("socket.io")(this.server, {
      cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', function (socket) {
        //On recieving message to create room, call handleCreateRoom function
        socket.on('create-room',handleCreateRoom);
        
        //On recieving message to join room, call handleJoinRoom function
        socket.on('join-room',handleJoinRoom);
        
        // on recieving message related to state of the video (pause, play)
        // emitting the message to other client servers
        socket.on('vid-state', data=>{
            const vidState = data.vidState;
            const roomCode = data.roomCode;
            io.to(rooms[roomCode].code).emit('vid-state',vidState);
        })

        // on recieving message related to seek (video played time)
        // emitting the message to other client servers
        socket.on('progress-bar-clicked', data => {
            const newTime = data.newTime;
            const roomCode = data.roomCode;
            io.to(rooms[roomCode].code).emit('progress-bar-clicked',newTime);
        })

        // Functions
        function handleCreateRoom(){
        
            // Getting a random room number from makeid function
            const roomCode = makeid(10);
    
            // Creating an adding the room object to the rooms dictionary
            rooms[roomCode] = {
                code : roomCode,
            }; 
    
            socket.emit("room-created",roomCode);
          }

          function handleJoinRoom(data){
              const roomCode = data.roomCode;
              
              // Check whether the room exists
              if(rooms[roomCode]){ 
                  socket.join(roomCode);
                  let roomObject = rooms[roomCode];
                  socket.emit("joined", roomObject);
              } 
              else{
                  socket.emit("message",`The room ${roomCode} doesn't exist`);
              }}
      }); 

  }


  start(){
      // Port server will listen too 3000 or set by the cloud provider
      this.server.listen(this.PORT,() => console.log( `Server running at ${this.PORT}`));
  }

}

// Creating Server object
new Server();




