document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const url = document.querySelector('input[name="url"]').value;
  
    fetch(`/seo?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => {
        // Update the DOM dynamically with the results
      });
  });
  