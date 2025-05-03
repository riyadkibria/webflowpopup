window.Webflow ||= [];
window.Webflow.push(() => {
  const button = document.getElementById("button");
  if (!button) return;

  button.addEventListener("click", function () {
    const existingPopup = document.getElementById("popup");
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement("div");
    popup.id = "popup";
    popup.style.position = "fixed";
    popup.style.top = "0";
    popup.style.left = "0";
    popup.style.width = "100vw";
    popup.style.height = "100vh";
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    popup.style.display = "flex";
    popup.style.alignItems = "center";
    popup.style.justifyContent = "center";
    popup.style.zIndex = "9999";
    popup.style.cursor = "pointer";

    const box = document.createElement("div");
    box.style.backgroundColor = "#fff";
    box.style.padding = "20px";
    box.style.borderRadius = "8px";
    box.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    box.style.maxWidth = "400px";
    box.style.textAlign = "center";
    box.style.fontFamily = "Arial, sans-serif";

    const jokeText = document.createElement("p");
    jokeText.textContent = "Loading joke...";
    jokeText.style.margin = "0";

    box.appendChild(jokeText);
    popup.appendChild(box);
    document.body.appendChild(popup);

    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then((res) => res.json())
      .then((data) => {
        jokeText.textContent = `${data.setup} ${data.punchline}`;
      })
      .catch(() => {
        jokeText.textContent = "Failed to load joke.";
      });

    popup.addEventListener("click", () => {
      popup.remove();
    });
  });
});
