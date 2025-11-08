/**
 * Content Refresh Mechanism
 * Highlights recently updated posts and adds "Updated" badges
 * This script helps keep content fresh for both Google ranking and user trust
 */

class ContentRefreshManager {
  constructor() {
    this.currentYear = new Date().getFullYear();
    this.updatedThreshold = 2024; // Posts updated after this year get highlighted
    this.init();
  }

  init() {
    this.highlightUpdatedPosts();
    this.addUpdatedBadges();
    this.logRefreshStats();
  }

  /**
   * Highlight posts that have been recently updated
   * Uses data attributes or metadata to identify updated content
   */
  highlightUpdatedPosts() {
    const posts = document.querySelectorAll(
      "[data-last-updated], .post-card, .blog-post"
    );

    posts.forEach((post) => {
      const lastUpdated = this.getLastUpdatedDate(post);

      if (lastUpdated && this.isRecentlyUpdated(lastUpdated)) {
        this.addUpdatedStyling(post);
      }
    });
  }

  /**
   * Add "Updated" badges to recently updated content
   */
  addUpdatedBadges() {
    const updatedElements = document.querySelectorAll('[data-updated="true"]');

    updatedElements.forEach((element) => {
      const badge = this.createUpdatedBadge();
      const header = element.querySelector(
        ".post-header, .post-title, h1, h2, h3"
      );

      if (header) {
        header.insertAdjacentElement("afterend", badge);
      } else {
        element.insertAdjacentElement("afterbegin", badge);
      }
    });
  }

  /**
   * Get the last updated date from element data attributes or metadata
   */
  getLastUpdatedDate(element) {
    // Check data attribute first
    if (element.dataset.lastUpdated) {
      return new Date(element.dataset.lastUpdated);
    }

    // Check for meta tags in blog posts
    const metaDate = element.querySelector(
      'meta[property="article:modified_time"]'
    );
    if (metaDate) {
      return new Date(metaDate.getAttribute("content"));
    }

    // Check for time elements
    const timeElement = element.querySelector("time[datetime]");
    if (timeElement) {
      return new Date(timeElement.getAttribute("datetime"));
    }

    return null;
  }

  /**
   * Check if content was updated recently
   */
  isRecentlyUpdated(date) {
    const updatedYear = date.getFullYear();
    return updatedYear >= this.updatedThreshold;
  }

  /**
   * Add updated styling to elements
   */
  addUpdatedStyling(element) {
    element.classList.add("recently-updated");
    element.setAttribute("data-updated", "true");

    // Add subtle animation for visual feedback
    element.style.transition = "all 0.3s ease";
    setTimeout(() => {
      element.style.boxShadow = "0 0 0 2px rgba(34, 197, 94, 0.2)";
    }, 100);
  }

  /**
   * Create an "Updated" badge element
   */
  createUpdatedBadge() {
    const badge = document.createElement("span");
    badge.className = "updated-badge";
    badge.innerHTML = `
            <span class="badge updated">Güncellendi: ${this.currentYear}</span>
        `;
    return badge;
  }

  /**
   * Log refresh statistics for monitoring
   * This would integrate with analytics in production
   */
  logRefreshStats() {
    const updatedCount = document.querySelectorAll(".recently-updated").length;
    const totalPosts = document.querySelectorAll(
      ".post-card, .blog-post"
    ).length;

    console.log(`📊 Content Refresh Stats:
        • Total Posts: ${totalPosts}
        • Recently Updated: ${updatedCount}
        • Update Rate: ${((updatedCount / totalPosts) * 100).toFixed(1)}%
        • Current Year: ${this.currentYear}`);

    // Integration point for Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'content_refresh_stats', {
    //         'updated_posts': updatedCount,
    //         'total_posts': totalPosts,
    //         'update_rate': (updatedCount / totalPosts) * 100
    //     });
    // }
  }

  /**
   * Manual refresh trigger for admin use
   */
  manualRefresh() {
    console.log("🔄 Manual content refresh triggered");
    this.highlightUpdatedPosts();
    this.addUpdatedBadges();
  }
}

// Initialize content refresh manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.contentRefreshManager = new ContentRefreshManager();
});

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = ContentRefreshManager;
}

/**
 * Web Vitals Monitoring Integration
 * Core Web Vitals measurement for performance tracking
 * This would integrate with Google Search Console in production
 */

class WebVitalsMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  async init() {
    if ("web-vitals" in window) {
      // Use web-vitals library if available
      this.setupWebVitals();
    } else {
      // Fallback to native measurement
      this.setupNativeMonitoring();
    }
  }

  setupWebVitals() {
    // This would use the web-vitals npm package
    // import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

    console.log("📈 Web Vitals monitoring available (web-vitals package)");
    console.log("💡 To enable: npm install web-vitals");

    // Example integration comment:
    /*
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
        */
  }

  setupNativeMonitoring() {
    // Basic native performance monitoring
    this.monitorLCP();
    this.monitorCLS();
    this.monitorFID();

    // Log available metrics
    this.logAvailableMetrics();
  }

  monitorLCP() {
    // Largest Contentful Paint monitoring
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];

      this.metrics.LCP = lastEntry.renderTime || lastEntry.loadTime;
      console.log(`🎯 LCP: ${this.metrics.LCP}ms`);
    });

    observer.observe({ entryTypes: ["largest-contentful-paint"] });
  }

  monitorCLS() {
    // Cumulative Layout Shift monitoring
    let clsValue = 0;
    let clsEntries = [];

    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      }

      this.metrics.CLS = clsValue;
      console.log(`📐 CLS: ${clsValue.toFixed(4)}`);
    });

    observer.observe({ entryTypes: ["layout-shift"] });
  }

  monitorFID() {
    // First Input Delay monitoring (approximation)
    let firstInputTime = null;

    const listener = (event) => {
      if (!firstInputTime) {
        firstInputTime = event.timeStamp;
        this.metrics.FID = firstInputTime - performance.timing.navigationStart;
        console.log(`⚡ FID: ${this.metrics.FID}ms`);

        // Remove listener after first input
        document.removeEventListener("click", listener);
        document.removeEventListener("keydown", listener);
      }
    };

    document.addEventListener("click", listener);
    document.addEventListener("keydown", listener);
  }

  logAvailableMetrics() {
    console.log("📊 Web Vitals Monitoring Active");
    console.log("💡 For production: Integrate with Google Search Console");
    console.log("🔗 GSC Setup: https://search.google.com/search-console");

    // CDN check
    this.checkCDNUsage();
  }

  checkCDNUsage() {
    const assets = performance.getEntriesByType("resource");
    const cdnAssets = assets.filter(
      (asset) =>
        asset.name.includes("cdn") ||
        asset.name.includes("cloudflare") ||
        asset.name.includes("akamai")
    );

    if (cdnAssets.length === 0) {
      console.warn(
        "⚠️  CDN not detected. Consider using Cloudflare or similar CDN for static assets."
      );
      console.info(
        "💡 CDN Benefits: Faster loading, better global performance, DDoS protection"
      );
    } else {
      console.log("✅ CDN detected for static assets");
    }
  }
}

// Initialize Web Vitals monitoring
document.addEventListener("DOMContentLoaded", () => {
  window.webVitalsMonitor = new WebVitalsMonitor();
});

// RSS Feed Verification
class RSSFeedVerifier {
  constructor() {
    this.feedUrls = ["/rss.xml", "/atom.xml", "/feed.xml", "/index.xml"];
    this.init();
  }

  async init() {
    await this.verifyFeeds();
    this.addRSSLinks();
  }

  async verifyFeeds() {
    for (const feedUrl of this.feedUrls) {
      try {
        const response = await fetch(feedUrl, { method: "HEAD" });
        if (response.ok) {
          console.log(`✅ RSS Feed available: ${feedUrl}`);
          this.availableFeed = feedUrl;
          break;
        }
      } catch (error) {
        console.log(`❌ RSS Feed not found: ${feedUrl}`);
      }
    }

    if (!this.availableFeed) {
      console.warn(
        "⚠️  No RSS feed detected. Consider creating one for better user engagement."
      );
    }
  }

  addRSSLinks() {
    // Add RSS icon to subscription sections
    const subscriptionSections = document.querySelectorAll(
      ".newsletter-form, .cta-section"
    );

    subscriptionSections.forEach((section) => {
      const rssLink = this.createRSSLink();
      section.appendChild(rssLink);
    });
  }

  createRSSLink() {
    const link = document.createElement("a");
    link.href = this.availableFeed || "/rss.xml";
    link.className = "social-link rss-link";
    link.setAttribute("aria-label", "RSS Feed");
    link.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 11a9 9 0 0 1 9 9"></path>
                <path d="M4 4a16 16 0 0 1 16 16"></path>
                <circle cx="5" cy="19" r="1"></circle>
            </svg>
            RSS
        `;

    return link;
  }
}

// Initialize RSS verification
document.addEventListener("DOMContentLoaded", () => {
  window.rssVerifier = new RSSFeedVerifier();
});
