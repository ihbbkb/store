
function showCategory(categoryId, buttonElement) {
  // Remove active class from all categories and buttons
  document.querySelectorAll('.category').forEach(cat => {
    cat.classList.remove('active');
  });
  
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to selected category and button
  const selectedCategory = document.getElementById(categoryId);
  if (selectedCategory) {
    selectedCategory.classList.add('active');
  }
  
  if (buttonElement) {
    buttonElement.classList.add('active');
  }
  
  // Update system info if that category is selected
  if (categoryId === 'system-info') {
    updateSystemInfo();
  }
  
  filterAndSortItems();
}

function filterAndSortItems() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const sortValue = document.getElementById('sortSelect').value;
  const activeCategory = document.querySelector('.category.active');
  
  const items = Array.from(activeCategory.getElementsByClassName('item'));
  
  items.forEach(item => {
    const title = item.querySelector('h3').textContent.toLowerCase();
    const description = item.querySelector('p').textContent.toLowerCase();
    const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
    item.style.display = isVisible ? 'block' : 'none';
  });
  
  const sortedItems = items.sort((a, b) => {
    const titleA = a.querySelector('h3').textContent;
    const titleB = b.querySelector('h3').textContent;
    
    if (sortValue === 'name-asc') {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });
  
  sortedItems.forEach(item => {
    activeCategory.appendChild(item);
  });
}

document.getElementById('searchInput').addEventListener('input', filterAndSortItems);
document.getElementById('sortSelect').addEventListener('change', filterAndSortItems);

// System Information
async function updateSystemInfo() {
  // Get IP Address
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    document.getElementById('ip-address').textContent = data.ip;
  } catch (error) {
    document.getElementById('ip-address').textContent = 'Unable to fetch IP';
  }

  // Browser Info
  const browserInfo = navigator.userAgent;
  document.getElementById('browser-info').textContent = browserInfo;

  // OS Info
  const platform = navigator.platform;
  document.getElementById('os-info').textContent = platform;

  // Screen Info
  const screenInfo = `${window.screen.width}x${window.screen.height}`;
  document.getElementById('screen-info').textContent = screenInfo;

  // Console Mod Check
  const isConsoleModded = () => {
    try {
      const modifiedProperties = [
        window.console !== window.parent.console,
        console.clear.toString().indexOf('[native code]') === -1,
        Object.keys(console).length > 15
      ];
      return modifiedProperties.some(prop => prop === true) ? 'Modified' : 'Standard';
    } catch {
      return 'Modified';
    }
  };
  document.getElementById('console-status').textContent = isConsoleModded();
}

// Update system info when the category is shown
function showCategory(categoryId) {
  document.querySelectorAll('.category').forEach(cat => {
    cat.classList.remove('active');
  });
  
  document.getElementById(categoryId).classList.add('active');
  
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  if (categoryId === 'system-info') {
    updateSystemInfo();
  }
  
  filterAndSortItems();
}
