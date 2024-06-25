const books = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    imageURL: 'https://books.google.com/books/content?id=WV8pZj_oNBwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    isbn: '9781921479311',
    pageCount: 268
  }
];

const renderBooks = (books) => {
  document.querySelector('.books').replaceChildren(); 

  for(let i = 0; i < books.length; i++) {
    const book = books[i];
    const div = document.querySelector('.books');

    const template = `
        <div class="book col-md-6">
          <h4>${book.title}</h4>
          <div>Author: <strong>${book.author}</strong></div>
          <div>Pages: <strong>${book.pageCount}</strong></div>
          <div>ISBN: <strong>${book.isbn}</strong></div>
          <img src="${book.imageURL}" alt="" />
        </div> 
      `;
    div.insertAdjacentHTML("beforeend",template);
  };
};

document.querySelector(".search").addEventListener("click", (() => {
  const searchText = document.querySelector("#search-query").value;
  if (searchText === "") { return alert("search term is empty") };
  fetchBooks(searchText);
  document.querySelector("#search-query").value = "";
}))

const fetchBooks = (query) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  fetch(url, {
    method: "get",
    dataType: "JSON"
  })
    .then(data => data.json())
    .then(data => addBooks(data));
};

const addBooks = (data) =>{
  // title, author, pageCount, isbn, imageurl
  const books = data.items;
  console.log(books);
  const formattedBooksArray = books.map(item=> {
    return {
      "title": item.volumeInfo.title || null, 
      "author":item.volumeInfo.authors[0] || null, 
      "pageCount": item.volumeInfo.pageCount || null, 
      "isbn": item.volumeInfo.industryIdentifiers[0].identifier || null, 
      "imageURL": item.volumeInfo.imageLinks.smallThumbnail || null}
  });

  renderBooks(formattedBooksArray);
};
















