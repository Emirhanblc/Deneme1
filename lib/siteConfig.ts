/**
 * Site-wide configuration
 * Centralized configuration for contact info, social links, and other site constants.
 * Update these values with your real information.
 */

export const SITE_CONFIG = {
  // Author information
  author: {
    name: 'Emirhan Balcı',
    title: 'System Administrator & Backend Developer',
  },

  // Contact information
  // TODO: Replace these placeholder values with real contact information
  contact: {
    email: 'your.real.email@example.com', // TODO: Replace with real email
    linkedin: 'https://www.linkedin.com/in/yourprofile', // TODO: Replace with real LinkedIn
    github: 'https://github.com/yourusername', // TODO: Replace with real GitHub username
  },

  // Site metadata
  site: {
    title: 'Sistem Yönetimi & Web Backend Blogu',
    tagline: 'Technical blog for System Administration & Web Backend',
    description:
      'Linux, network, sistem yönetimi ve web backend üzerine teknik makaleler, scriptler ve projeler.',
  },

  // Project URLs
  // TODO: Replace these with real project repository URLs
  projects: {
    kubernetesMonitoring:
      'https://github.com/yourusername/kubernetes-monitoring', // TODO
    vmwareBackup: 'https://github.com/yourusername/vmware-backup', // TODO
    firewallManager: 'https://github.com/yourusername/firewall-manager', // TODO
  },
};

// Helper function to check if a URL is a placeholder
export function isPlaceholder(url: string): boolean {
  return (
    url.includes('yourusername') ||
    url.includes('example.com') ||
    url.includes('yourprofile')
  );
}
