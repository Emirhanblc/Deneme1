/**
 * Site configuration tests
 * Verifies that siteConfig exports expected structure and helper functions
 */

import { SITE_CONFIG, isPlaceholder } from '../lib/siteConfig';

describe('Site Configuration', () => {
  it('should export SITE_CONFIG object', () => {
    expect(SITE_CONFIG).toBeDefined();
  });

  it('should have author information', () => {
    expect(SITE_CONFIG.author).toBeDefined();
    expect(SITE_CONFIG.author.name).toBe('Emirhan Balcı');
    expect(SITE_CONFIG.author.title).toBeDefined();
  });

  it('should have contact information', () => {
    expect(SITE_CONFIG.contact).toBeDefined();
    expect(SITE_CONFIG.contact.email).toBeDefined();
    expect(SITE_CONFIG.contact.linkedin).toBeDefined();
    expect(SITE_CONFIG.contact.github).toBeDefined();
  });

  it('should have site metadata', () => {
    expect(SITE_CONFIG.site).toBeDefined();
    expect(SITE_CONFIG.site.title).toBeDefined();
    expect(SITE_CONFIG.site.tagline).toBeDefined();
    expect(SITE_CONFIG.site.description).toBeDefined();
  });

  it('should have project URLs', () => {
    expect(SITE_CONFIG.projects).toBeDefined();
    expect(SITE_CONFIG.projects.kubernetesMonitoring).toBeDefined();
    expect(SITE_CONFIG.projects.vmwareBackup).toBeDefined();
    expect(SITE_CONFIG.projects.firewallManager).toBeDefined();
  });

  describe('isPlaceholder helper', () => {
    it('should detect placeholder URLs with yourusername', () => {
      expect(isPlaceholder('https://github.com/yourusername')).toBe(true);
    });

    it('should detect placeholder URLs with example.com', () => {
      expect(isPlaceholder('your.email@example.com')).toBe(true);
    });

    it('should detect placeholder URLs with yourprofile', () => {
      expect(isPlaceholder('https://linkedin.com/in/yourprofile')).toBe(true);
    });

    it('should return false for real URLs', () => {
      expect(isPlaceholder('https://github.com/realuser')).toBe(false);
      expect(isPlaceholder('real.email@gmail.com')).toBe(false);
      expect(isPlaceholder('https://linkedin.com/in/realprofile')).toBe(false);
    });
  });
});
