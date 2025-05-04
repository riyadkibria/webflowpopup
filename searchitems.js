  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const wrapper = document.getElementById("collection-list-wrapper");
    const items = wrapper.querySelectorAll("#collection-list .cms-item");

    // Prevent form submission when pressing Enter
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });

    // Filter items based on search input
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();

      items.forEach(item => {
        const title = item.querySelector(".item-title");
        const titleText = title ? title.textContent.toLowerCase() : "";

        if (titleText.includes(query)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
