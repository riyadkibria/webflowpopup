  function initSortDropdown() {
    const sortOptions = document.querySelectorAll(".dropdown-option");
    const itemsContainer = document.querySelector(".collection-list-wrapper");

    if (!sortOptions.length || !itemsContainer) return;

    sortOptions.forEach(option => {
      option.addEventListener("click", function (e) {
        e.preventDefault();

        const sortType = this.getAttribute("data-sort");
        if (!sortType) return;

        const items = Array.from(document.querySelectorAll(".collection-item"));

        const sortedItems = items.sort((a, b) => {
          const priceA = parseFloat(a.querySelector(".item-price")?.getAttribute("data-price") || 0);
          const priceB = parseFloat(b.querySelector(".item-price")?.getAttribute("data-price") || 0);

          // Sorting based on the selected option: Low to High or High to Low
          if (sortType === "asc") {
            return priceA - priceB;  // Low to High
          } else if (sortType === "desc") {
            return priceB - priceA;  // High to Low
          }
          return 0;
        });

        // Re-append the sorted items
        sortedItems.forEach(item => itemsContainer.appendChild(item));
      });
    });
  }

  // Ensuring the sorting function runs after other scripts are loaded
  requestAnimationFrame(() => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      initSortDropdown();
    } else {
      document.addEventListener("DOMContentLoaded", initSortDropdown);
    }
  });
