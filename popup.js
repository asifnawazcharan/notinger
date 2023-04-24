const dbPromise = window.indexedDB.open('myDatabase', 1);
const logs = []; // to show all added notes as log.

// Create object store if it doesn't exist
dbPromise.onupgradeneeded = function(event) {
  const db = event.target.result;
  if (!db.objectStoreNames.contains('myObjectStore')) {
    db.createObjectStore('myObjectStore', { keyPath: 'subject' });
  }
};

// Handle form submission
document.getElementById('my-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form data
  const subject = document.getElementById('subject-input').value;
  const content = document.getElementById('content-input').value;

  // create logs
  logs.push((subject, content))
  // Open database and add data to object store
// Open database and add data to object store
const dbPromise = window.indexedDB.open('myDatabase', 1);
dbPromise.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction('myObjectStore', 'readwrite');
  const objectStore = transaction.objectStore('myObjectStore');
  const key = subject;
  
  // Get the existing content for this key
  const request = objectStore.get(key);
  request.onsuccess = function(event) {
    let existingContent = request.result ? request.result.content : "";
    
    // Append the new content to the existing content
    existingContent += "\n" + content;
    
// Update the object store with the new content
const updateRequest = objectStore.put({ subject: key, content: existingContent });
updateRequest.onsuccess = function(event) {
  console.log('Data added to database');
  const message = document.getElementById('message');
  message.textContent = `Noted - ${document.getElementById('content-input').value} - [${document.getElementById('subject-input').value}]`;

  // update logstable

  // Update dropdown menu with new subject if it doesn't already exist
  const dropdown = document.getElementById('columns-dropdown');
  if (!dropdown.querySelector(`option[value="${key}"]`)) {
    const option = document.createElement('option');
    option.value = key;
    option.text = key;
    dropdown.add(option);
  }
  dropdown.value = subject;
  


// clear the input field
  textarea = document.getElementById('content-input');
  textarea.value = ""

  // updating table when input submitted. This is repeat of code blocks
  const selectedColumn = dropdown.value;
  const transaction = db.transaction('myObjectStore', 'readonly');
  const objectStore = transaction.objectStore('myObjectStore');
  const request = objectStore.getAll();

  request.onsuccess = function(event) {
    const rows = event.target.result.filter(row => row.subject === selectedColumn);
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    const groupedRows = {};
    for (let i = 0; i < rows.length; i++) {
      if (!groupedRows[rows[i].subject]) {
        groupedRows[rows[i].subject] = [];
      }
      groupedRows[rows[i].subject].push(rows[i]);
    }

    for (let subject in groupedRows) {
      const row = document.createElement('tr');
//      const subjectCell = document.createElement('td');
  //    subjectCell.textContent = subject;
    //  row.appendChild(subjectCell);

      const contentCell = document.createElement('td');
      const contentList = document.createElement('ul');
      for (let i = 0; i < groupedRows[subject].length; i++) {
        const contentItem = document.createElement('li');
        contentItem.textContent = groupedRows[subject][i].content;
        contentList.appendChild(contentItem);
        contentCell.appendChild(contentItem);
        row.appendChild(contentCell);
        tableBody.appendChild(row);
      }
      //contentCell.appendChild(contentList);
      //row.appendChild(contentCell);

      //tableBody.appendChild(row);
    }
  };

  
};

    
  };
};
});

// Populate columns dropdown
dbPromise.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction('myObjectStore', 'readonly');
  const objectStore = transaction.objectStore('myObjectStore');
  const request = objectStore.getAllKeys();

  request.onsuccess = function(event) {
    const columns = event.target.result;
    const dropdown = document.getElementById('columns-dropdown');

    // Add options to dropdown
    for (let i = 0; i < columns.length; i++) {
      const option = document.createElement('option');
      option.value = columns[i];
      option.text = columns[i];
      dropdown.add(option);
    }

// Listen for dropdown changes
dropdown.addEventListener('change', function() {
  const selectedColumn = dropdown.value;
  const transaction = db.transaction('myObjectStore', 'readonly');
  const objectStore = transaction.objectStore('myObjectStore');
  const request = objectStore.getAll();

  request.onsuccess = function(event) {
    const rows = event.target.result.filter(row => row.subject === selectedColumn);
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    const groupedRows = {};
    for (let i = 0; i < rows.length; i++) {
      if (!groupedRows[rows[i].subject]) {
        groupedRows[rows[i].subject] = [];
      }
      groupedRows[rows[i].subject].push(rows[i]);
    }

    for (let subject in groupedRows) {
      const row = document.createElement('tr');
//      const subjectCell = document.createElement('td');
  //    subjectCell.textContent = subject;
    //  row.appendChild(subjectCell);

      const contentCell = document.createElement('td');
      const contentList = document.createElement('ul');
      for (let i = 0; i < groupedRows[subject].length; i++) {
        const contentItem = document.createElement('li');
        contentItem.textContent = groupedRows[subject][i].content;
        contentList.appendChild(contentItem);
        contentCell.appendChild(contentItem);
        row.appendChild(contentCell);
        tableBody.appendChild(row);
      }
      //contentCell.appendChild(contentList);
      //row.appendChild(contentCell);

      //tableBody.appendChild(row);
    }
  };
});


  };
};


