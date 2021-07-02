const newEntryHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#entry-title').value.trim();
    const content = document.querySelector('#entry-content').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/entries`, {
        method: 'POST',
        body: JSON.stringify({ title: title, content: content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create entry');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/entries/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete entry');
      }
    }
  };
  
  document
    .querySelector('#new-entry-form')
    .addEventListener('submit', newEntryHandler);
  
  document
    .querySelector('#entry-list')
    .addEventListener('click', delButtonHandler);