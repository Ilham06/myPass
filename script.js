const modalBox = document.getElementById('modal');
const showModalBox = document.getElementById('show-modal');
const closeModalButton = document.getElementById('close-modal');
const inputForm = document.getElementById('bookmark-form');
const inputPage = document.getElementById('page-name');
const inputPassword = document.getElementById('page-password');
const dataContainer = document.getElementById('bookmarks-container');

let bookmarks = [];



// Generate Randem Password
let chars = "abcdefghijklmnopqrstuvwxyz";
const generate = document.getElementById('generate');
generate.addEventListener('click', function() {
  let i;
  let randomPw = "";

  for (i = 0; i < 16; i++) {
    randomPw += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  inputPassword.value = randomPw;
})



function showModal() {
  modalBox.classList.add('show-modal');
  inputPage.focus();
}

showModalBox.addEventListener('click', showModal);
closeModalButton.addEventListener('click', () => modal.classList.remove('show-modal'));


// Create Element For New Data
function buildBookmarks() {
  dataContainer.textContent = '';
  // Create new data
  bookmarks.forEach((bookmark) => {
    const {name, pw} = bookmark;
    const item = document.createElement('div');
    item.classList.add('item');
    
    const closeIcon = document.createElement('span');
    // closeIcon.classList.add('fas', 'fa-times');
    closeIcon.textContent = 'X';
    closeIcon.setAttribute('onclick', `deleteBookmark('${name}')`);
    
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    
    const btn = document.createElement('button');
    btn.textContent = 'details';
    btn.setAttribute('onclick', `details('${name}','${pw}')`);
    
    const link = document.createElement('h3');
    link.textContent = name;
    
    // Append to bookmarks container
    linkInfo.append(link);
    item.append(closeIcon, linkInfo, btn);
    dataContainer.appendChild(item);

  });
}

// details functions
function details(name,pw) {
  console.log(name);
      alert(`Your password for ${name} is ${pw}.`);
}

// Fetch Data
function fetchBookmarks() {
  // Get data from local storage
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create bookmarks array in localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  buildBookmarks();
}

// Delete Bookmark
function deleteBookmark(name) {
  // Loop through the bookmarks array
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.name === name) {
      bookmarks.splice(i, 1);
    }
  });
  // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  alert('Data Has Been Deleted');
}


// Add New Data
function storeBookmark(e) {
  e.preventDefault();
  const pageValue = inputPage.value;
  const pwValue = inputPassword.value;

  if (pageValue === "" || pwValue === "" ) {
    alert('Please input form!');
    return false;
  }
  
  const bookmark = {
    name: pageValue,
    pw: pwValue,
  };
  bookmarks.push(bookmark);
  
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  alert('ok!');
  modalBox.classList.remove('show-modal');
  fetchBookmarks();
  inputForm.reset();
  inputPage.focus();
}

// Event Listener
inputForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();



