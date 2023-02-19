# Objective:

To play locally downloaded videos and movies in sync across different devices using low bandwidth.

# Working:

The project works in the node.js environment and is divided into two different codebases for server and client. The server codebase is hosted and the client is run locally each device. The communication between server and client is achieved using socket.io.

# Usage:

The video that needs to be watched in sync is downloaded and the client codebase is run across all devices. When a user starts a video the current time along with the start signal is sent to the server which further transmits the signal to all the connected clients, similarly, other signals like pause or seek are transmitted across all the connected clients and video u are able to watch the video in sync even at a low bandwidth

# Prerequisites:

Node and npm should be installed

# Instructions for local testing:

<ul>
    <li>Clone the repo to your local device</li>
    <li>Move inside the directory</li>
    <li>Move the desired video that needs to be played in the video folder inside video-client and rename it to video.mp4 and remove the previous video</li>
   
    <ol>
        <li>Open the sync-server folder in a desired Ide</li>
        <li>RUn the command npm install</li>
        <li>Run the command npm start</li>
    </ol>
    
    <li>Open another window in the ide</li>
    
    <ol>    
        <li>Open the movie-client directory here</li>
        <li>Run the command node server.js</li> 
        <li>If an error appears download the required node modules and retry the command node server.js</li>
    </ol>
    
    <li>Go to a web browser and search url localhost:3000 across all tabs</li>
    <li>Play the video to watch in sync</li>
</ul>

# Instructions for using across devices:
You will need to host the sync-server on hosting platform like render or heroku

<ul>
    <li>Host the sync-server directory on a paltform and fetch the url to that deployment</li>
    <li>Go to video-client/public directory</li>
    <li>Open the web.js and update the remoteLink</li>
    <li>Change the link in following from localDepoy to remoteLink
        <p>// Linking to socket conecction
            var socket = io.connect(localDeploy , {
                reconnection: true
            });
        </p>
    </li>
</ul>

        


