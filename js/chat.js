const form = document.querySelector(".typing-area"),
  inputfeild = form.querySelector(".input-feild"),
  sendBtn = form.querySelector("button"),
  incoming_id = form.querySelector(".incoming_id"),
  chatbox = document.querySelector(".chat-box");
form.onsubmit = (e) => {
  e.preventDefault();
};
inputfeild.focus();
inputfeild.onkeyup = () => {
  if (inputfeild.value != "") {
    sendBtn.classList.add("active");
  } else {
    sendBtn.classList.remove("active");
  }
};

sendBtn.addEventListener("click", () => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "", true); // تربيط
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        inputfeild.value = "";
        scroll();
      }
    }
  };
});
chatbox.onmouseenter = () => {
  chatbox.classList.add("active");
};
chatbox.onmouseleave = () => {
  chatbox.classList.remove("active");
};
setInterval(() => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/js/get-chat.php", true); // تربيط
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (!searchBar.classList.contains("active")) {
          let data = xhr.response;
          usersList.innerHTML = data;
          if (!chatbox.classList.contains("active")) {
            scroll();
          }
        }
      }
    }
  };
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("incoming_id=" + incoming_id);
}, 500);
function scroll() {
  chatbox.scrollTo = chatbox.scrollheight;
}
