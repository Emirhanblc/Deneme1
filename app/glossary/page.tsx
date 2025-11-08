'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// Mock data - in production, this would come from Headless CMS
const glossaryTerms = [
  {
    id: 'kubernetes',
    term: 'Kubernetes',
    definition:
      'Container orkestrasyon platformu. Uygulamaların dağıtımını, ölçeklendirmesini ve yönetimini otomatikleştirir.',
    category: 'Containerization',
    related: ['docker', 'container', 'pod'],
  },
  {
    id: 'docker',
    term: 'Docker',
    definition:
      'Uygulamaları konteynerler içinde paketleyip çalıştırmayı sağlayan platform. Taşınabilirlik ve izolasyon sağlar.',
    category: 'Containerization',
    related: ['kubernetes', 'container', 'image'],
  },
  {
    id: 'vlan',
    term: 'VLAN',
    definition:
      "Sanal Yerel Alan Ağı. Fiziksel bir ağı mantıksal olarak bölümlere ayırarak broadcast domain'lerini küçültür.",
    category: 'Networking',
    related: ['subnet', 'switch', 'network'],
  },
  {
    id: 'cron',
    term: 'Cron',
    definition:
      'Unix tabanlı sistemlerde zamanlanmış görevleri çalıştırmak için kullanılan zamanlayıcı servisi.',
    category: 'System Administration',
    related: ['crontab', 'scheduler', 'automation'],
  },
  {
    id: 'prometheus',
    term: 'Prometheus',
    definition:
      'Open source monitoring sistemi. Metrik toplama, depolama ve sorgulama özellikleri sunar.',
    category: 'Monitoring',
    related: ['grafana', 'metrics', 'alerting'],
  },
  {
    id: 'terraform',
    term: 'Terraform',
    definition:
      'Infrastructure as Code (IaC) aracı. Bulut altyapısını kod olarak tanımlamayı ve yönetmeyi sağlar.',
    category: 'DevOps',
    related: ['iac', 'cloud', 'automation'],
  },
  {
    id: 'ansible',
    term: 'Ansible',
    definition:
      'Configuration management ve deployment otomasyon aracı. Agentless mimarisi ile çalışır.',
    category: 'DevOps',
    related: ['automation', 'configuration', 'playbook'],
  },
  {
    id: 'firewall',
    term: 'Firewall',
    definition:
      'Ağ güvenlik sistemi. Gelen ve giden trafiği kurallara göre kontrol eder.',
    category: 'Security',
    related: ['security', 'network', 'rules'],
  },
  {
    id: 'load-balancer',
    term: 'Load Balancer',
    definition:
      'Trafik dağıtıcı. Gelen istekleri birden fazla sunucuya dağıtarak yük dengelemesi yapar.',
    category: 'Networking',
    related: ['ha', 'scalability', 'reverse-proxy'],
  },
  {
    id: 'ssl-tls',
    term: 'SSL/TLS',
    definition:
      'Güvenli iletişim protokolleri. İnternet üzerinde şifreli bağlantı sağlar.',
    category: 'Security',
    related: ['https', 'encryption', 'certificate'],
  },
  {
    id: 'backup',
    term: 'Backup',
    definition:
      'Yedekleme. Verilerin korunması ve olası kayıpların önlenmesi için kopyalarının alınması işlemi.',
    category: 'System Administration',
    related: ['recovery', 'disaster', 'storage'],
  },
  {
    id: 'raid',
    term: 'RAID',
    definition:
      'Redundant Array of Independent Disks. Birden fazla diski bir araya getirerek performans ve güvenilirlik sağlar.',
    category: 'Storage',
    related: ['storage', 'redundancy', 'performance'],
  },
];

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = useMemo<string[]>(() => {
    const uniqueCategories = Array.from(
      new Set(glossaryTerms.map((term) => term.category))
    );

    return ['all', ...uniqueCategories];
  }, []);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || term.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Teknik Terimler Sözlüğü
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistem yönetimi ve backend geliştirme alanındaki teknik terimlerin
            açıklamaları.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Terim Ara
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Terim veya açıklama ara..."
                className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Kategori Filtresi
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Tüm Kategoriler' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            {filteredTerms.length} terim bulundu
          </div>
        </div>

        {/* Glossary Terms */}
        <div className="space-y-6">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term) => (
              <div
                key={term.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {term.term}
                    </h2>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {term.category}
                    </span>
                  </div>
                  <Link
                    href={`/glossary/${term.id}`}
                    className="mt-2 md:mt-0 inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    Detaylı Bilgi →
                  </Link>
                </div>

                <p className="text-muted-foreground mb-4 text-lg">
                  {term.definition}
                </p>

                {term.related && term.related.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      İlgili Terimler:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {term.related.map((relatedTerm) => (
                        <span
                          key={relatedTerm}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-foreground"
                        >
                          {relatedTerm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <svg
                  className="mx-auto h-12 w-12 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Terim bulunamadı
                </h3>
                <p>
                  Arama kriterlerinize uygun terim bulunamadı. Farklı bir
                  anahtar kelime veya kategori deneyin.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Navigation */}
        <div className="mt-12 bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Kategorilere Göz Atın
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter((cat) => cat !== 'all')
              .map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-accent text-foreground hover:bg-accent/80'
                  }`}
                >
                  <span className="font-medium">{category}</span>
                </button>
              ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Eksik Bir Terim Mi Var?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Sözlükte olmasını istediğiniz teknik terimleri bana
              bildirebilirsiniz.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Terim Öner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
