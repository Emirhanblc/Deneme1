import Link from 'next/link';
import { SITE_CONFIG, isPlaceholder } from '@/lib/siteConfig';

export const metadata = {
  title: 'Projeler – Emirhan Balcı',
  description:
    'Production sistemlerde geliştirdiğim ve open source olarak paylaştığım projeler. Gerçek problemlere pratik çözümler.',
};

// Mock data - in production, this would come from Headless CMS
const projects = [
  {
    id: '1',
    title: 'VMware Backup Altyapısı',
    description:
      'Production ortamında 50+ VM için otomatik yedekleme sistemi. VLAN ayrıştırması ile network trafiği optimizasyonu.',
    tags: ['VMware vSphere', 'Veeam', 'VLAN', 'Linux'],
    githubUrl: SITE_CONFIG.projects.vmwareBackup,
    demoUrl: null,
    blogSlug: 'backup-network-ayristirma-vlan',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Firewall Kural Yönetim Sistemi',
    description:
      'Firewall kurallarını merkezi olarak yöneten web arayüzü. Otomatik yedekleme ve versiyon kontrolü.',
    tags: ['Python', 'Flask', 'PostgreSQL', 'pfSense API'],
    githubUrl: SITE_CONFIG.projects.firewallManager,
    demoUrl: null,
    blogSlug: null,
    status: 'completed',
  },
  {
    id: '3',
    title: 'Kubernetes Monitoring Dashboard',
    description:
      "Production Kubernetes cluster'ları için open-source monitoring dashboard. Prometheus ve Grafana entegrasyonu.",
    tags: ['Kubernetes', 'Prometheus', 'Grafana', 'React', 'Node.js'],
    githubUrl: SITE_CONFIG.projects.kubernetesMonitoring,
    demoUrl: null,
    blogSlug: 'kubernetes-monitoring',
    status: 'active',
  },
  {
    id: '4',
    title: 'DevOps Eğitim Platformu',
    description:
      'Yeni başlayanlar için DevOps araçları ve metodolojileri üzerine interaktif eğitim platformu.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    githubUrl: null,
    demoUrl: null,
    blogSlug: null,
    status: 'planning',
  },
];

export default function ProjectsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'active':
        return 'Aktif';
      case 'planning':
        return 'Planlanan';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Projeler</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Production sistemlerde geliştirdiğim ve open source olarak
            paylaştığım projeler. Gerçek problemlere pratik çözümler.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                  >
                    {getStatusText(project.status)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    {project.githubUrl && !isPlaceholder(project.githubUrl) && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-border text-sm font-medium rounded-md text-foreground bg-background hover:bg-accent transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </Link>
                    )}
                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Canlı Demo
                      </Link>
                    )}
                    {(!project.githubUrl || isPlaceholder(project.githubUrl)) &&
                      !project.demoUrl && (
                        <span className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-border text-sm font-medium rounded-md text-muted-foreground bg-background">
                          Yakında...
                        </span>
                      )}
                  </div>
                  {project.blogSlug && (
                    <Link
                      href={`/blog/${project.blogSlug}`}
                      className="text-sm text-blue-600 hover:underline text-center"
                    >
                      İlgili blog yazısı →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Open Source Katkıları
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Paylaştığım script'ler ve araçlar open source. Hataları bildirin
              veya geliştirmelere katkıda bulunun.
            </p>
            <div className="flex gap-4 justify-center">
              {!isPlaceholder(SITE_CONFIG.contact.github) && (
                <Link
                  href={SITE_CONFIG.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover:bg-accent transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub Profilim
                </Link>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
