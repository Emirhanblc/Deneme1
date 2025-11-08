// Contact form handling
;(() => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      }

      // In a real application, you would send this data to a server
      console.log("Form submitted:", formData)

      // Show success message
      alert("Form gönderimi şu anda aktif değil. Lütfen doğrudan email ile iletişime geçin: your.email@example.com")

      // Reset form
      contactForm.reset()
    })
  }
})()
