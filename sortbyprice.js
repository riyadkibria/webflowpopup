  window.addEventListener("load", function () {
    function extractPrice(text) {
      return parseFloat(text.replace(/[^0-9.]/g, ""));
    }

    function sortItems(order = "asc") {
      const wrapper = document.getElementById("collection-list-wrapper");
      const list = wrapper?.querySelector("#collection-list");
      if (!list) return;

      const items = Array.from(list.querySelectorAll(".cms-item"));

      const sortedItems = items.sort((a, b) => {
        const priceA = extractPrice(a.querySelector(".price-of-products").textContent);
        const priceB = extractPrice(b.querySelector(".price-of-products").textContent);
        return order === "asc" ? priceA - priceB : priceB - priceA;
      });

      sortedItems.forEach(item => list.appendChild(item));
    }

    document.getElementById("low-to-high")?.addEventListener("click", () => {
      sortItems("asc");
      document.getElementById("dropdown-toggle")?.click(); // Close dropdown
    });

    document.getElementById("high-to-low")?.addEventListener("click", () => {
      sortItems("desc");
      document.getElementById("dropdown-toggle")?.click(); // Close dropdown
    });
  });
