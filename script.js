document
  .getElementById("usernameForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("usernameInput").value;
    const apiUrl = `https://dev.to/api/articles?username=${username}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      displayBlogPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

function displayBlogPosts(posts) {
  const blogPostsContainer = document.getElementById("blogPosts");
  blogPostsContainer.innerHTML = "";

  const blogPostsGrid = document.createElement("div");
  blogPostsGrid.classList.add("blog-posts-container");

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");

    postElement.innerHTML = `
      <img src="${post.cover_image}" alt="Cover Image">
      <h2>${post.title}</h2>
      <p>${post.description}</p>
      <div class="user-info">
        <img src="${
          post.user.profile_image
        }" alt="Profile Image" class="profile-image">
        <p>${post.user.name}</p>
      </div>
      <p><b>${post.tag_list.join(", ")}</b></p>
      <p>Reactions: ❤️ ${post.public_reactions_count}</p>
      <a href="${post.url}" target="_blank" class="read-more-btn">Read More</a>
    `;

    blogPostsGrid.appendChild(postElement);
  });

  blogPostsContainer.appendChild(blogPostsGrid);
  blogPostsContainer.classList.remove("hidden");
}
