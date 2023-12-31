const noteName = "Mynotification";

function PivoNotification(paramMessage: string, paramClass: string[]) {
  let oldest = document.querySelectorAll("." + noteName);
  // console.log(oldest);
  if (oldest && oldest.length > 0) {
    oldest.forEach((item) => {
      item.remove();
    });
  }

  let notification = document.createElement("div");
  notification.className = noteName;
  if (paramClass) {
    paramClass.forEach((item) => {
      notification.classList.add(item);
    });
  }

  notification.style.bottom = 2 + "%";
  notification.style.left = 2 + "%";
  //  notification.style.right = 10 + "px";

  notification.innerHTML = paramMessage;
  document.body.appendChild(notification);

  let timerId = setTimeout(() => {
    if (document.body.contains(notification)) notification.remove();
    //console.log("removed notification...");
    clearTimeout(timerId);
  }, 4000);
}

export default PivoNotification;
