// Phase 4: Content Diversification & Engagement JavaScript

// Audio Player Functionality
class AudioPlayer {
  constructor(container) {
    this.container = container;
    this.audio = container.querySelector("audio");
    this.playBtn = container.querySelector(".play-btn");
    this.progressBar = container.querySelector(".progress-bar");
    this.progress = container.querySelector(".progress");
    this.timeDisplay = container.querySelector(".time-display");

    this.isPlaying = false;
    this.duration = 0;

    this.init();
  }

  init() {
    // Set up event listeners
    this.playBtn.addEventListener("click", () => this.togglePlay());
    this.audio.addEventListener("loadedmetadata", () => {
      this.duration = this.audio.duration;
      this.updateTimeDisplay();
    });
    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("ended", () => this.reset());

    // Progress bar click
    this.progressBar.addEventListener("click", (e) => {
      const rect = this.progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      this.audio.currentTime = percent * this.duration;
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.audio.play();
    this.isPlaying = true;
    this.playBtn.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.playBtn.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
  }

  reset() {
    this.pause();
    this.audio.currentTime = 0;
    this.updateProgress();
  }

  updateProgress() {
    const percent = (this.audio.currentTime / this.duration) * 100;
    this.progress.style.width = `${percent}%`;
    this.updateTimeDisplay();
  }

  updateTimeDisplay() {
    const currentTime = this.formatTime(this.audio.currentTime);
    const totalTime = this.formatTime(this.duration);
    this.timeDisplay.textContent = `${currentTime} / ${totalTime}`;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
}

// Poll System
class PollSystem {
  constructor(container) {
    this.container = container;
    this.question = container.querySelector(".poll-question").textContent;
    this.options = Array.from(container.querySelectorAll(".poll-option"));
    this.resultsContainer = container.querySelector(".poll-results");
    this.hasVoted = localStorage.getItem(`poll_${this.question}`) !== null;

    this.init();
  }

  init() {
    if (this.hasVoted) {
      this.showResults();
    } else {
      this.setupVoting();
    }
  }

  setupVoting() {
    this.options.forEach((option) => {
      option.addEventListener("click", () => {
        this.vote(option.dataset.option);
      });
    });
  }

  vote(optionId) {
    // Store vote in localStorage (mock backend)
    const votes = JSON.parse(localStorage.getItem("poll_votes") || "{}");
    votes[this.question] = optionId;
    localStorage.setItem("poll_votes", JSON.stringify(votes));
    localStorage.setItem(`poll_${this.question}`, "true");

    this.hasVoted = true;
    this.showResults();
  }

  showResults() {
    // Mock results for demonstration
    const mockResults = {
      "very-helpful": 45,
      helpful: 35,
      "somewhat-helpful": 15,
      "not-helpful": 5,
    };

    const totalVotes = Object.values(mockResults).reduce((a, b) => a + b, 0);

    // Hide voting options
    this.options.forEach((option) => (option.style.display = "none"));

    // Show results
    this.resultsContainer.innerHTML = "";
    this.options.forEach((option) => {
      const optionId = option.dataset.option;
      const votes = mockResults[optionId] || 0;
      const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

      const resultItem = document.createElement("div");
      resultItem.className = "poll-result-item";
      resultItem.innerHTML = `
                <span>${option.querySelector("span").textContent}</span>
                <div class="poll-bar">
                    <div class="poll-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="poll-percentage">${percentage.toFixed(1)}%</span>
            `;

      this.resultsContainer.appendChild(resultItem);
    });

    this.resultsContainer.style.display = "block";
  }
}

// Interactive Widgets
class InteractiveWidgets {
  static init() {
    this.initSubnetCalculator();
    this.initCrontabEditor();
    this.initArchitectureDiagram();
  }

  static initSubnetCalculator() {
    const calculator = document.getElementById("subnet-calculator");
    if (!calculator) return;

    const ipInput = calculator.querySelector("#ip-address");
    const maskInput = calculator.querySelector("#subnet-mask");
    const calculateBtn = calculator.querySelector("#calculate-subnet");
    const resultDiv = calculator.querySelector("#subnet-result");

    calculateBtn.addEventListener("click", () => {
      const ip = ipInput.value;
      const mask = maskInput.value;

      if (this.validateIP(ip) && this.validateMask(mask)) {
        const result = this.calculateSubnet(ip, mask);
        resultDiv.innerHTML = `
                    <strong>Network Address:</strong> ${result.network}<br>
                    <strong>Broadcast Address:</strong> ${result.broadcast}<br>
                    <strong>Usable Hosts:</strong> ${result.hosts}<br>
                    <strong>Subnet Mask:</strong> ${result.mask}
                `;
      } else {
        resultDiv.textContent =
          "Please enter valid IP address and subnet mask.";
      }
    });
  }

  static initCrontabEditor() {
    const editor = document.getElementById("crontab-editor");
    if (!editor) return;

    const minuteInput = editor.querySelector("#minute");
    const hourInput = editor.querySelector("#hour");
    const dayInput = editor.querySelector("#day");
    const monthInput = editor.querySelector("#month");
    const weekdayInput = editor.querySelector("#weekday");
    const commandInput = editor.querySelector("#command");
    const previewDiv = editor.querySelector("#crontab-preview");

    const updatePreview = () => {
      const cronExpression = `${minuteInput.value} ${hourInput.value} ${dayInput.value} ${monthInput.value} ${weekdayInput.value} ${commandInput.value}`;
      previewDiv.textContent = cronExpression;
    };

    [
      minuteInput,
      hourInput,
      dayInput,
      monthInput,
      weekdayInput,
      commandInput,
    ].forEach((input) => {
      input.addEventListener("input", updatePreview);
    });

    updatePreview();
  }

  static initArchitectureDiagram() {
    const diagram = document.getElementById("architecture-diagram");
    if (!diagram) return;

    const nodes = diagram.querySelectorAll(".arch-node");
    nodes.forEach((node) => {
      node.addEventListener("click", () => {
        const description = node.dataset.description;
        if (description) {
          alert(description);
        }
      });
    });
  }

  static validateIP(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipRegex.test(ip);
  }

  static validateMask(mask) {
    const maskRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return maskRegex.test(mask);
  }

  static calculateSubnet(ip, mask) {
    // Mock calculation for demonstration
    return {
      network: "192.168.1.0",
      broadcast: "192.168.1.255",
      hosts: 254,
      mask: "255.255.255.0",
    };
  }
}

// Enhanced Contact Form
class EnhancedContactForm {
  constructor(form) {
    this.form = form;
    this.categories = form.querySelectorAll(".category-option");
    this.selectedCategory = null;

    this.init();
  }

  init() {
    // Category selection
    this.categories.forEach((category) => {
      category.addEventListener("click", () => {
        this.selectCategory(category);
      });
    });

    // Form validation
    this.form.addEventListener("submit", (e) => {
      if (!this.validateForm()) {
        e.preventDefault();
      }
    });
  }

  selectCategory(category) {
    // Remove previous selection
    this.categories.forEach((cat) => cat.classList.remove("selected"));

    // Add new selection
    category.classList.add("selected");
    this.selectedCategory = category.dataset.category;

    // Update hidden input
    const categoryInput = this.form.querySelector('input[name="category"]');
    if (categoryInput) {
      categoryInput.value = this.selectedCategory;
    }
  }

  validateForm() {
    let isValid = true;

    // Validate name
    const nameInput = this.form.querySelector('input[name="name"]');
    if (!nameInput.value.trim()) {
      this.showError(nameInput, "Name is required");
      isValid = false;
    } else {
      this.hideError(nameInput);
    }

    // Validate email
    const emailInput = this.form.querySelector('input[name="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
      this.showError(emailInput, "Valid email is required");
      isValid = false;
    } else {
      this.hideError(emailInput);
    }

    // Validate message
    const messageInput = this.form.querySelector('textarea[name="message"]');
    if (!messageInput.value.trim()) {
      this.showError(messageInput, "Message is required");
      isValid = false;
    } else {
      this.hideError(messageInput);
    }

    // Validate category
    if (!this.selectedCategory) {
      const categoryContainer = this.form.querySelector(".contact-categories");
      this.showError(categoryContainer, "Please select a category");
      isValid = false;
    } else {
      this.hideError(this.form.querySelector(".contact-categories"));
    }

    return isValid;
  }

  showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("form-error")) {
      errorElement = document.createElement("div");
      errorElement.className = "form-error";
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
    errorElement.classList.add("show");
    input.classList.add("input-error");
  }

  hideError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("form-error")) {
      errorElement.classList.remove("show");
    }
    input.classList.remove("input-error");
  }
}

// Community Section Handler
class CommunityHandler {
  static init() {
    const communitySection = document.querySelector(".community-section");
    if (!communitySection) return;

    const buttons = communitySection.querySelectorAll(".community-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const platform = button.dataset.platform;
        this.handleJoinRequest(platform);
      });
    });
  }

  static handleJoinRequest(platform) {
    // Mock implementation - in real scenario, this would redirect to actual invite links
    const messages = {
      discord: "Redirecting to Discord server invite...",
      slack: "Redirecting to Slack workspace invite...",
      telegram: "Redirecting to Telegram group...",
    };

    alert(messages[platform] || "Joining community...");
    // In production: window.location.href = actual_invite_url;
  }
}

// Bug Bounty Handler
class BugBountyHandler {
  static init() {
    const bountySection = document.querySelector(".bug-bounty-section");
    if (!bountySection) return;

    const buttons = bountySection.querySelectorAll(".bounty-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const action = button.dataset.action;
        this.handleBountyAction(action);
      });
    });
  }

  static handleBountyAction(action) {
    const urls = {
      report: "https://github.com/yourusername/blog/issues",
      contribute: "https://github.com/yourusername/blog",
    };

    if (urls[action]) {
      window.open(urls[action], "_blank");
    } else {
      alert("Action not implemented yet");
    }
  }
}

// Initialize all Phase 4 features
document.addEventListener("DOMContentLoaded", function () {
  // Initialize audio players
  document.querySelectorAll(".audio-player").forEach((player) => {
    new AudioPlayer(player);
  });

  // Initialize polls
  document.querySelectorAll(".poll-container").forEach((poll) => {
    new PollSystem(poll);
  });

  // Initialize interactive widgets
  InteractiveWidgets.init();

  // Initialize enhanced contact forms
  document.querySelectorAll(".enhanced-contact-form").forEach((form) => {
    new EnhancedContactForm(form);
  });

  // Initialize community section
  CommunityHandler.init();

  // Initialize bug bounty section
  BugBountyHandler.init();

  // Add loading states to forms
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function () {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;
      }
    });
  });
});

// Utility function for video lazy loading
function lazyLoadVideos() {
  const videoContainers = document.querySelectorAll(
    ".video-container[data-src]"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const iframe = container.querySelector("iframe");
        if (iframe && !iframe.src) {
          iframe.src = container.dataset.src;
          container.removeAttribute("data-src");
        }
        observer.unobserve(container);
      }
    });
  });

  videoContainers.forEach((container) => {
    observer.observe(container);
  });
}

// Initialize lazy loading when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", lazyLoadVideos);
} else {
  lazyLoadVideos();
}
