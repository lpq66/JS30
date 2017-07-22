window.addEventListener('keydown', function(e) {
    console.log("Button " + e.keyCode); //log pressed button
    const key = document.querySelector(`.key div[data-key="${e.keyCode}"]`); // choose key
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // choose audio
    audio.currentTime = 0; // restart 
    audio.play();
    key.classList.add('active');

});

const keys = document.querySelectorAll('.key div');

keys.forEach(key => key.addEventListener('transitionend', function() { // end transition
    this.classList.remove('active');
}));