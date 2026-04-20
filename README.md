# Library Portal

A simple browser-based library management portal built with HTML, CSS, and JavaScript.

## Features

- View all books in a paginated table (10 books per page)
- Filter books by genre, availability, author, or reference ID
- Add new books or increase quantity of existing ones
- Availability status shown for each book

## Project Structure

```
project/
├── index.html    # Main page layout
├── style.css     # Styling
├── index.js      # App logic (fetch, render, filters, pagination)
└── books.json    # Book data
```

## Running Locally

Open directly via a local server — `fetch()` requires one to load `books.json`.

**Using VS Code:** Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, then click **Go Live** in the bottom bar.

**Using Node.js:**
```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

## Live Demo

[View on GitHub Pages](https://dhaaranipushpam.github.io/Library-portal)
