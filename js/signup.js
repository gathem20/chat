const forms = document.querySelector(".index form");
if (forms) {
  const conBtn = forms.querySelector(".btn2 input");
  const errorText = forms.querySelector(".error-txt");

  forms.onsubmit = (e) => {
    e.preventDefault();
  };

  console.log(conBtn);

  conBtn.onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../src/index.js", true);
    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          let data = xhr.response;
          if (data === "success") {
            location.href = "users.php";
          } else {
            errorText.textContent = data;
            errorText.style.display = "block";
          }
        }
      }
    };
    let formData = new FormData(form);
    xhr.send(formData);
  };
}
