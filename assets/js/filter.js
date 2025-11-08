// Blog post filtering functionality
;(() => {
  const filterButtons = document.querySelectorAll(".tag-filter")
  const postItems = document.querySelectorAll(".post-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTag = button.getAttribute("data-tag")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filter posts
      postItems.forEach((post) => {
        const postTags = post.getAttribute("data-tags")

        if (selectedTag === "all" || postTags.includes(selectedTag)) {
          post.style.display = "block"
        } else {
          post.style.display = "none"
        }
      })
    })
  })
})()
