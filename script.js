(function () {
  "use strict";

  var openBtn = document.getElementById("open");
  var closeBtn = document.getElementById("close");
  var player = document.getElementById("player");
  var video = document.getElementById("vlog");
  var badge = document.getElementById("badge");

  function openPlayer() {
    player.hidden = false;
    document.body.classList.add("is-open");
    badge.hidden = true;
    document.title = "Messaggi";
    var p = video.play();
    if (p && typeof p.catch === "function") {
      // Se il browser blocca l'avvio automatico restano i controlli del video.
      p.catch(function () {});
    }
  }

  function closePlayer() {
    video.pause();
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
    player.hidden = true;
    document.body.classList.remove("is-open");
  }

  openBtn.addEventListener("click", openPlayer);
  closeBtn.addEventListener("click", closePlayer);

  video.addEventListener("ended", function () {
    video.currentTime = 0;
    closePlayer();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !player.hidden) {
      closePlayer();
      openBtn.focus();
    }
  });
})();
