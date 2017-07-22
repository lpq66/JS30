const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const fullscreenButton = document.querySelector('.fullscreen');

console.log(video.requestFullscreen);


function togglePlay() {
    video[video.paused ? 'play' : 'pause'](); // same as if(video.paused) { video.play} else {video.pause};
}

function updateButtton() {
    const icon = video.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function handleProgressBar() {
    const videoPercent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${videoPercent}%`;
}

function progressBarForwardBackward(e) {
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
    console.log(progressTime);
    video.currentTime = progressTime;
}

function goFullscreen() {
    video.webkitEnterFullScreen();
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButtton);
video.addEventListener('pause', updateButtton);
video.addEventListener('timeupdate', handleProgressBar);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', progressBarForwardBackward);
let mousedown = false;
progress.addEventListener('click', progressBarForwardBackward);
progress.addEventListener('mousemove', (e) => mousedown && progressBarForwardBackward(e)); // event fire only if mousedown is true;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullscreenButton.addEventListener('click', goFullscreen);