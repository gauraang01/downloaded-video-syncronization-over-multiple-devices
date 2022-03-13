module.exports = {
    makeid,
    shuffleArray,
  }
  
  // Function to return a random code
  function makeid(length) {
     var result           = '';
     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }
  
  function shuffleArray(arr) {
   let shuffled = arr.sort(() => Math.random() - 0.5)
   return shuffled;
}
