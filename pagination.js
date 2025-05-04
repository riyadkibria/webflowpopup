  const itemsPerPage = 20; // Set how many CMS items to show per page

  // Get all CMS items
  const collectionItems = document.querySelectorAll('.cms-item');
  const totalPages = Math.ceil(collectionItems.length / itemsPerPage);

  // Get current page from URL (?page=2)
  const params = new URLSearchParams(window.location.search);
  const currentPage = parseInt(params.get("page")) || 1;

  // Hide all items first
  collectionItems.forEach(item => item.style.display = 'none');

  // Show only current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < collectionItems.length; i++) {
    collectionItems[i].style.display = 'block';
  }

  // Create and insert pagination controls container
  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'pagination-controls';
  paginationContainer.style.marginTop = '30px';
  paginationContainer.style.textAlign = 'center';

  const collectionList = document.querySelector('.collection-list');
  if (collectionList) {
    collectionList.parentNode.insertBefore(paginationContainer, collectionList.nextSibling);
  }

  // Generate pagination links
  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement('a');
    link.href = `?page=${i}`;
    link.innerText = i;
    link.style.margin = '0 8px';
    link.style.textDecoration = 'none';
    link.style.padding = '6px 12px';
    link.style.border = '1px solid #ccc';
    link.style.borderRadius = '4px';
    link.style.color = '#333';

    if (i === currentPage) {
      link.style.fontWeight = 'bold';
      link.style.backgroundColor = '#000';
      link.style.color = '#fff';
    }

    paginationContainer.appendChild(link);
  }

