// Get Element
const modalBox = document.getElementById('modal');
const showModalBox = document.getElementById('show-modal');
const closeModalButton = document.getElementById('close-modal');
const inputForm = document.getElementById('page-form');
const inputPage = document.getElementById('page-name');
const inputPassword = document.getElementById('page-password');
const dataContainer = document.getElementById('data-container');

let datum = [];

// Generate randem password
let chars = "1234567890~`!@#$%^&*()_+=-qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM[]{};':?><.,/";
const generate = document.getElementById('generate');
generate.addEventListener('click', function() {
  let i;
  let randomPw = "";

  for (i = 0; i < 16; i++) {
    randomPw += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  inputPassword.value = randomPw;
})


// Show modal
function showModal() {
  modalBox.classList.add('show-modal');
  inputPage.focus();
}

showModalBox.addEventListener('click', showModal);
closeModalButton.addEventListener('click', () => modal.classList.remove('show-modal'));


// Create Element For New Data
function createData() {
  dataContainer.textContent = '';
  // Create new data
  datum.forEach((data) => {
    const {name, pw} = data;
    const item = document.createElement('div');
    item.classList.add('item');

    // Create page name
    const nameWrapper = document.createElement('div');
    nameWrapper.classList.add('name');
    const pageName = document.createElement('h3');
    pageName.textContent = name;
    nameWrapper.append(pageName);
    
    // Create delete button
    const dlButton = document.createElement('i');
    dlButton.classList.add('fa', 'fa-trash');
    dlButton.setAttribute('onclick', `deleteData('${name}')`);
    
    // Create detail button
    const dtButton = document.createElement('button');
    dtButton.textContent = 'details';
    dtButton.setAttribute('onclick', `detail('${name}','${pw}')`);
    
    
    item.append(dlButton, nameWrapper, dtButton);
    dataContainer.appendChild(item);

  });
}

// Show detail
function detail(name,pw) {
      alert(`Your Password for ${name} page is ${pw}`);
}

// Get and Set data
function getAndSet() {
  // Get data from local storage
  if (localStorage.getItem('datum')) {
    datum = JSON.parse(localStorage.getItem('datum'));
  } else {
    // Set data to local storage
    localStorage.setItem('datas', JSON.stringify(datum));
    }
  createData();
}

// Delete data
function deleteData(name) {
  let c = confirm(`Are you sure to delete data for ${name} page?`);
  // Check the deleted page name
  if (c !== true) {
    return false;
  } else datum.forEach((data, i) => {
    if (data.name === name) {
      datum.splice(i, 1);
    }
  });

  // Update data
  localStorage.setItem('datum', JSON.stringify(datum));
  getAndSet();
  alert(`OK!, ${name} data has been deleted`);
}


// Add New Data
function saveData(e) {
  e.preventDefault();

  const pageValue = inputPage.value;
  const pwValue = inputPassword.value;

  if (pageValue === "" || pwValue === "" ) {
    alert('Please input form!');
    return false;
  }
  
  const data = {
    name: pageValue,
    pw: pwValue,
  };
  datum.push(data);
  
  localStorage.setItem('datum', JSON.stringify(datum));
  alert(`OK!, ${pageValue} data has been added.`);
  modalBox.classList.remove('show-modal');
  getAndSet();
  inputForm.reset();
}


inputForm.addEventListener('submit', saveData);
getAndSet();



