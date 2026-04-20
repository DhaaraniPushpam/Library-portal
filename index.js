let books = [];
let currentPage = 1;
const PAGE_SIZE = 10;
let currentFiltered = [];

fetch('./books.json')
  .then(res => res.json())
  .then(data => {
    books = data;
    currentFiltered = books;
    renderPage(1);
  });


// Render Table
function renderTable(data) {
  const table = document.getElementById("bookTable");
  table.innerHTML = "";

  data.forEach(book => {
    const availability = book.quantity > 0 ? "Available" : "Not Available";

    table.innerHTML += `
      <tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${availability}</td>
      </tr>
    `;
  });
}

function renderPage(page) {
  currentPage = page;
  const start = (page - 1) * PAGE_SIZE;
  const pageData = currentFiltered.slice(start, start + PAGE_SIZE);
  renderTable(pageData);
  renderPagination();
}

function renderPagination() {
  const total = Math.ceil(currentFiltered.length / PAGE_SIZE);
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  for (let i = 1; i <= total; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "page-btn active" : "page-btn";
    btn.onclick = () => renderPage(i);
    container.appendChild(btn);
  }
}



function showMessage(text) {
  const msg = document.getElementById("message");
  msg.innerText = text;
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
}

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!title || !author || !genre || isNaN(quantity)) {
    showMessage("Please fill all fields correctly");
    return;
  }

  // Check if book already exists (same title + author)
  let existingBook = books.find(
    b => b.title.toLowerCase() === title.toLowerCase() &&
         b.author.toLowerCase() === author.toLowerCase()
  );

  if (existingBook) {
    existingBook.quantity += quantity;
    showMessage(`One or more copies of "${existingBook.title}" added`);
  } else {
    const newBook = {
      id: books.length ? books[books.length - 1].id + 1 : 101,
      title,
      author,
      genre,
      quantity
    };

    books.push(newBook);
    showMessage(`"${title}" added successfully`);
  }

  // Refresh table with current filters
  applyFilters();
  // Clear inputs
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("quantity").value = "";
}

function applyFilters() {
  let filtered = [...books];

  const genre = document.getElementById("genreFilter").value;
  const availability = document.getElementById("availabilityFilter").value;
  const author = document.getElementById("authorFilter").value.toLowerCase();
  const id = document.getElementById("idFilter").value;

  if (genre !== "All") {
    filtered = filtered.filter(b => b.genre === genre);
  }

  if (availability === "Available") {
    filtered = filtered.filter(b => b.quantity > 0);
  } else if (availability === "Not Available") {
    filtered = filtered.filter(b => b.quantity === 0);
  }

  if (author) {
    filtered = filtered.filter(b => b.author.toLowerCase().includes(author));
  }

  if (id) {
    filtered = filtered.filter(b => b.id == id);
  }

  currentFiltered = filtered;
  renderPage(1);
}