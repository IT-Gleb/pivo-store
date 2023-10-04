const noteName = "notification";

function PivoNotification(paramMessage: string, paramClass: string[]) {
  // let oldest = document.querySelectorAll(noteName);
  // console.log(oldest);
  // if (oldest && oldest.length > 0) {
  //   oldest.forEach((item) => {
  //     item.remove();
  //   });
  // }

  let notification = document.createElement("div");
  notification.className = noteName;
  if (paramClass) {
    paramClass.forEach((item) => {
      notification.classList.add(item);
    });
  }

  notification.style.bottom = 0 + "px";
  notification.style.left = 0 + "px";
  notification.style.right = 0 + "px";

  notification.innerHTML = paramMessage;
  document.body.appendChild(notification);

  let timerId = setTimeout(() => {
    notification.remove();
    //console.log("removed notification...");
    clearTimeout(timerId);
  }, 4000);
}

export default PivoNotification;
