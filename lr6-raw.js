document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");

    // Function to fetch images from a folder
    function fetchImages() {
        // Replace 'images/' with the path to your image folder
        const folderPath = 'i/raw';
        
        // Add your image file extensions here
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        fetch(folderPath)
            .then(response => response.text())
            .then(html => {
                // Create a temporary element to parse the HTML
                const tempElement = document.createElement('div');
                tempElement.innerHTML = html;

                // Extract image URLs
                const imageUrls = Array.from(tempElement.getElementsByTagName('a'))
                    .map(a => a.href)
                    .filter(href => imageExtensions.some(ext => href.endsWith(ext)));

                // Create and append image elements
                imageUrls.forEach(url => {
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = url.split('/').pop(); // Extract image file name as alt text
                    gallery.appendChild(img);
                });
            })
            .catch(error => console.error('Error fetching images:', error));
    }

    // Call the function to fetch and display images
    fetchImages();
});