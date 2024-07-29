window.addEventListener(
  "DOMContentLoaded",
  function () {
    const submitButton = this.document.querySelector("#form-submit");
    const form = document.querySelector("#contact-form #body");
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      submitButton.innerText = "Sending...";
      submitButton.disabled = true;
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          let result = await response.json();
          if (response.status == 200) {
            clearInputs();
            successNotifier();
          } else {
            errorNotifier();
          }
        })
        .catch((error) => {
          const message =
            "Something went wrong. Please send your email through Gmail.";
        })
        .finally(() => {
          submitButton.innerText = "Submit";
          submitButton.disabled = false;
        });
    });

    submitButton.addEventListener("click", function () {
      form.dispatchEvent(new Event("submit"));
    });

    function clearInputs() {
      document.querySelector("input[name=name]").value = "";
      document.querySelector("input[name=company]").value = "";
      document.querySelector("input[name=email]").value = "";
      document.querySelector("input[name=subject]").value = "";
      document.querySelector("textarea[name=message]").value = "";
    }

    function successNotifier() {
      const toastNotif = document.querySelector(
        ".toast-notification[data-type=success]"
      );
      toastNotif.classList.add("active");
      setTimeout(function () {
        toastNotif.classList.remove("active");
      }, 5000);
    }

    function errorNotifier() {
      const toastNotif = document.querySelector(
        ".toast-notification[data-type=error]"
      );
      toastNotif.classList.add("active");
      setTimeout(function () {
        toastNotif.classList.remove("active");
      }, 7000);
    }
  },
  false
);
