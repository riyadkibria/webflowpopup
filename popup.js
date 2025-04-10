<script>
  const button = document.getElementById("button");
  const popup = document.getElementById("popup");

  button.addEventListener("click", () => {
    popup.style.display = "block";
  });

  // Optional: click outside to close
  document.addEventListener("click", (e) => {
    if (e.target !== button && !popup.contains(e.target)) {
      popup.style.display = "none";
    }
  });
</script>
