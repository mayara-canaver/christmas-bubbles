function playSound(soundobj) {
  let audio = document.getElementById(soundobj);
  
  audio.play();
}

function stopSound(soundobj) {
  let audio = document.getElementById(soundobj);

  audio.pause();
  audio.currentTime = 0;
}

function turnOn(){
  const brights = document.querySelectorAll(".bright");
  brights.forEach(bright => {
    bright.style.opacity = "0.2";
  });
}
