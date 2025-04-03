
function showCategory(categoryId) {
  // Hide all categories
  document.querySelectorAll('.category').forEach(cat => {
    cat.classList.remove('active');
  });
  
  // Show selected category
  document.getElementById(categoryId).classList.add('active');
  
  // Update button states
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}
