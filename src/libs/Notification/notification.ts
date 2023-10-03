function PivoNotification(paramMessage: string, paramClass: string[]) {
  let notification = document.createElement("div");
  notification.className = "notification";
  if (paramClass) {
    paramClass.forEach((item) => {
      notification.classList.add(item);
    });
  }

  notification.style.bottom = 0 + "px";
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
