document.getElementById('search').addEventListener('submit', (e) => {
  e.preventDefault();
  getBooksByAuthor(e.target.searchTerm.value, 9)
})

function getBooksByAuthor(author, count=-1) {
  let url= 'http://openlibrary.org/search.json?author='
  let books;
  get(url+author, function(response) {
    books = JSON.parse(response).docs;
    books = books.slice(0, count).map((book) => {
      return {
        title_suggest: book.title_suggest,
        author_name: book.author_name[0],
        isbn: book.isbn[0]
      }
    })
    renderBooks(books, document.getElementById('books'));
  })
  return books;
}

function renderBooks(books, parent) {
  for (let book of books) {
    parent.innerHTML += createCard(book)
  }
}

function createCard(book) {
  return `
  <div class="col s6 m4">
    <div class="card">
      <div class="card-image">
        <img src="http://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg" alt="this photo didn't show up">
        <span class="card-title">${book.author_name}</span>
      </div>
      <div class="card-content">
        <p>${book.title_suggest}</p>
      </div>
    </div>
  </div> 
  `
}

function get(url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.response);
    }
  }
  xhr.open('GET', url);
  xhr.send();
}
