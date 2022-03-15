// Connection to server

// Deploy links: 
let herokuLink = "https://synchronization-testing-server.herokuapp.com/"; 

let localDeploy = "http://localhost:3000/";

// Linking to socket conecction
var socket = io.connect(herokuLink , {
    reconnection: true
});



//Divs
const form = document.getElementById('input-form');
const videoContainer = document.getElementById('videoContainer');


//Form Div
//Input Fields
const joinRoomInput = document.getElementById('join-room-input');
const createRoomInput = document.getElementById('create-room-input');



const socketData={
    roomCode : "",
};



// On connection to socket
socket.on('connect', function () {

    // On arrival of message
    socket.on('message',msg => {
        alert(msg);
    })

    // On recieving Joined emit
    socket.on('joined', roomObject=>{
    
        form.style.display = "none";
        videoContainer.style.display = "block";
        
        createRoomInput.value = socketData.roomCode;
        // Updating the socket with the room's current state
        socketData.roomCode = roomObject.code;
        console.log(socketData.roomCode);
    })

    // On recieving room created message
    socket.on('room-created', roomCode => {
        let data = {
            roomCode : roomCode,
            user : socketData.userName,
        }
        socket.emit('join-room',data);
    })


    // On recieving video state (play / pause)
    // Changing the exixting state
    socket.on('vid-state',state=>{
        if(vid.paused){
            vid.play();
            playPauseBtn.innerHTML = "&#9612;&#9612;";
         }
         else {
            vid.pause();
            playPauseBtn.innerHTML = "&#9658";
         }
    })


    // On recieveing info related to progress-bbar or seek
    // Changing the current position or time of the video
    socket.on('progress-bar-clicked',newTime => {
        vid.currentTime = newTime;
    })

});



// Form Div Buttons
const joinBtn = document.getElementById('join-btn');
const createBtn = document.getElementById('create-btn');

// Form Div button Listeners
joinBtn.addEventListener('click',joinButtonHandler);
createBtn.addEventListener('click',createButtonHandler);

// Functions
function createButtonHandler(){
    socket.emit("create-room");
}

function joinButtonHandler(){
    let data = {
        roomCode : joinRoomInput.value,
    }
    console.log(data.roomCode);

    socket.emit("join-room",data);
}





// Client side for videoContainer
// Setting variables for html elements, classes, id 
const vid = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('play-pause');
const progress = document.getElementById('progress-bar');   
const fullscreenBtn = document.getElementById('fullscreen');
const volinc = document.getElementById('volinc');
const voldec = document.getElementById('voldec');




// videoContainer div Event Listeners
// Toggle fullscreen mode
fullscreenBtn.addEventListener('click',openFullscreen);

// Control play and pause
playPauseBtn.addEventListener('click',pauseOrstart);

// Control volume
volinc.addEventListener('click', incVolume);
voldec.addEventListener('click', decVolume);

// Control progressBar on update in the time
vid.addEventListener('timeupdate', updateProgressBar);
 
// Changing the length of the progress-bar on user click
progress.addEventListener('click', function(e){
    var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
    var newTime =pos * vid.duration;

    let data = {
        roomCode : socketData.roomCode,
        newTime : newTime
    }
    socket.emit('progress-bar-clicked', data);
});


 



//Functions

// On click of paue/play button send the message telling clicked
function pauseOrstart(){

    let data = {
        roomCode : socketData.roomCode,
        videoState : 'clicked'
    }

    socket.emit('vid-state',data);
}


// Open fullscreen mode
function openFullscreen(){
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) { /* Safari */
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) { /* IE11 */
        videoContainer.msRequestFullscreen();
      }
}


// Function to update progress bar on message from socket
function updateProgressBar(){
    var progressBar = document.getElementById('progress-bar');
    var percentage = Math.floor((100 / vid.duration) * vid.currentTime);
    progressBar.value = percentage;
};

function incVolume(){
    var currentVolume = Math.floor(vid.volume * 10) / 10;
    if (currentVolume < 1) vid.volume += 0.1;
}

function decVolume(){
    var currentVolume = Math.floor(vid.volume * 10) / 10;
    if (currentVolume > 0) vid.volume -= 0.1;
}