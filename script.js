document
  .getElementById("search-button")
  .addEventListener("click", searchImages);
document
  .getElementById("search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchImages();
    }
  });

let currentPage = 1;
let query = "";

async function searchImages() {
  query = document.getElementById("search-input").value.trim();
  if (!query) {
    document.getElementById("images-container").innerHTML =
      "<p>Please enter a search term.</p>";
    document.getElementById("show-more-btn").style.display = "none";
    return;
  }

  const apiKey = "tKydVOSXg0JWHtCN8x4ycMZz1yjgIZNG2JjFKOTT9mI";
  const apiUrl = `https://api.unsplash.com/search/photos?page=${currentPage}&per_page=12&query=${encodeURIComponent(
    query
  )}&client_id=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      document.getElementById("images-container").innerHTML =
        "<p>No images found.</p>";
      document.getElementById("show-more-btn").style.display = "none";
      return;
    }

    const imagesHtml = data.results
      .map(
        (image) => `
            <div class="image-item">
                <img src="${image.urls.small}" alt="${
          image.alt_description || "Image"
        }">
            </div>
        `
      )
      .join("");

    if (currentPage === 1) {
      document.getElementById("images-container").innerHTML = imagesHtml;
    } else {
      document.getElementById("images-container").innerHTML += imagesHtml;
    }

    document.getElementById("show-more-btn").style.display = "block";

    currentPage++;
  } catch (error) {
    console.error("Error fetching images:", error);
    document.getElementById(
      "images-container"
    ).innerHTML = `<p>Failed to load images: ${error.message}</p>`;
    document.getElementById("show-more-btn").style.display = "none";
  }
}

document
  .getElementById("show-more-btn")
  .addEventListener("click", searchImages);
