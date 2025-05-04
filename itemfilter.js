document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.getElementById('collection-list-wrapper');
  const allItems = Array.from(wrapper.querySelectorAll('.cms-item'));
  const itemsPerLoad = 10;
  let currentVisible = 0;
  let filteredItems = [...allItems];

  // create the scroll‐trigger element
  const observerTarget = document.createElement('div');
  observerTarget.id = 'scroll-trigger';
  observerTarget.style.height = '1px';
  wrapper.appendChild(observerTarget);

  observer.observe(observerTarget);

  function showNextItems() {
    const nextLimit = currentVisible + itemsPerLoad;
    for (let i = currentVisible; i < nextLimit && i < filteredItems.length; i++) {
      filteredItems[i].style.display = 'block';
    }
    currentVisible += itemsPerLoad;

    if (currentVisible < filteredItems.length) {
      // re‑move the trigger and insert it after the last shown
      wrapper.insertBefore(observerTarget, filteredItems[currentVisible]);
    } else {
      // all shown → clean up
      observer.disconnect();
      observerTarget.remove();
    }
  }

  function applyFilters() {
    // get checked brands
    const brands = Array.from(
      document.querySelectorAll('.brand-filter:checked')
    ).map(cb => cb.getAttribute('valued'));

    // get checked screens
    const screens = Array.from(
      document.querySelectorAll('.screen-filter:checked')
    ).map(cb => cb.getAttribute('screenvalued'));

    // filter items by BOTH criteria
    filteredItems = allItems.filter(item => {
      const b = item.getAttribute('data-brand');
      const s = item.getAttribute('data-screen');
      const matchBrand  = !brands.length  || brands.includes(b);
      const matchScreen = !screens.length || screens.includes(s);
      return matchBrand && matchScreen;
    });

    // reset state
    allItems.forEach(it => it.style.display = 'none');
    currentVisible = 0;

    // re‑attach trigger if needed
    if (filteredItems.length) {
      if (!wrapper.contains(observerTarget)) wrapper.appendChild(observerTarget);
      observer.observe(observerTarget);
      showNextItems();
    }
  }

  // watch both checkbox groups
  document.querySelectorAll('.brand-filter, .screen-filter')
    .forEach(cb => cb.addEventListener('change', applyFilters));

  // initial load
  applyFilters();
});
