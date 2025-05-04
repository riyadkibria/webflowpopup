  function initCheckboxDivs() {
    const checkboxes = document.querySelectorAll('.checkbox-options');

    checkboxes.forEach(cb => {
      cb.addEventListener('click', () => {
        cb.classList.toggle('checked');

        const box = cb.querySelector('.checkbox-box');
        if (cb.classList.contains('checked')) {
          box.classList.add('box-checked'); // Optional extra class
        } else {
          box.classList.remove('box-checked');
        }
      });
    });
  }

  // Run safely, no matter where placed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCheckboxDivs);
  } else {
    initCheckboxDivs();
  }
