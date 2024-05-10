document.addEventListener('DOMContentLoaded', function() {
    fetchAndPopulateImages('i/raw');
});

function fetchAndPopulateImages(folderPath) {
    // Fetch images from the designated folder
    fetch(folderPath)
      .then(response => response.text())
      .then(text => {
        // Parse the HTML response to extract image file names
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(text, 'text/html');
        const imageFiles = Array.from(htmlDocument.querySelectorAll('a[href$=".jpg"], a[href$=".png"], a[href$=".jpeg"]')).map(a => a.getAttribute('href'));
  
        // Populate the table with the images
        const imageTable = document.getElementById('imageTable');
        let row = imageTable.insertRow();
        let cellCount = 0;
  
        imageFiles.forEach(imageFile => {
          if (cellCount === 5) {
            // If 5 cells in a row, start a new row
            row = imageTable.insertRow();
            cellCount = 0;
          }
  
          // Create a new cell for the image
          const cell = row.insertCell();
          const image = document.createElement('img');
          image.src = folderPath + '/' + imageFile;
          image.alt = imageFile; // You can set alternative text for accessibility
          cell.appendChild(image);
  
          cellCount++;
        });
      })
      .catch(error => console.error('Error fetching images:', error));
  }
  
  // Call the function with the folder path
  