  const brandTags = document.querySelectorAll('.filter-tag'); // uses data-filter
  const screenTags = document.querySelectorAll('[screen-filter]'); // uses screen-filter
  const products = document.querySelectorAll('.cms-item');

  let activeBrand = null;
  let activeScreen = null;

  // Handle Brand Filter
  brandTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const filterValue = tag.getAttribute('data-filter');

      if (activeBrand === filterValue) {
        activeBrand = null;
        tag.classList.remove('active');
      } else {
        brandTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        activeBrand = filterValue;
      }

      applyFilters();
    });
  });

  // Handle Screen Filter
  screenTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const filterValue = tag.getAttribute('screen-filter');

      if (activeScreen === filterValue) {
        activeScreen = null;
        tag.classList.remove('active');
      } else {
        screenTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        activeScreen = filterValue;
      }

      applyFilters();
    });
  });

  // Filtering Function
  function applyFilters() {
    products.forEach(product => {
      const brand = product.getAttribute('data-brand')?.toLowerCase();
      const screen = product.getAttribute('data-screen')?.toLowerCase();

      const matchBrand = !activeBrand || brand === activeBrand.toLowerCase();
      const matchScreen = !activeScreen || screen === activeScreen.toLowerCase();

      if (matchBrand && matchScreen) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }
