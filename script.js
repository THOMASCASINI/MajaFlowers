(function () {
  "use strict";

  var frame = document.getElementById("frame");
  var video = document.getElementById("vlog");
  var playBtn = document.getElementById("play");
  var outro = document.getElementById("outro");
  var againBtn = document.getElementById("again");
  var durationEl = document.getElementById("duration");

  /* ---------- Video ---------- */

  function start() {
    outro.hidden = true;
    frame.classList.add("is-playing");
    video.controls = true;
    var p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(function () {
        // Riproduzione bloccata dal browser: rimostra il pulsante.
        frame.classList.remove("is-playing");
        video.controls = false;
      });
    }
  }

  playBtn.addEventListener("click", start);

  againBtn.addEventListener("click", function () {
    video.currentTime = 0;
    start();
  });

  video.addEventListener("ended", function () {
    video.controls = false;
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
    outro.hidden = false;
  });

  video.addEventListener("loadedmetadata", function () {
    if (!isFinite(video.duration)) return;
    var min = Math.floor(video.duration / 60);
    var sec = Math.round(video.duration % 60);
    durationEl.textContent = min + " min " + (sec < 10 ? "0" : "") + sec + " s";
  });

  /* ---------- Petali ---------- */

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    var layer = document.getElementById("petals");
    var colors = ["#f2c6d0", "#e89bb0", "#f7dfe5", "#f4d58a", "#ffffff", "#d9a7e0"];
    var count = window.innerWidth < 600 ? 14 : 24;

    for (var i = 0; i < count; i++) {
      var petal = document.createElement("span");
      var dur = 10 + Math.random() * 12;
      petal.className = "petal";
      petal.style.left = Math.random() * 100 + "%";
      petal.style.setProperty("--size", 10 + Math.random() * 12 + "px");
      petal.style.setProperty("--color", colors[i % colors.length]);
      petal.style.setProperty("--dur", dur + "s");
      petal.style.setProperty("--delay", -Math.random() * dur + "s");
      layer.appendChild(petal);
    }
  }
})();
