import Link from 'next/link';
import { SITE_CONFIG, isPlaceholder } from '@/lib/siteConfig';
import {
  Server,
  Shield,
  Network,
  Terminal,
  GitBranch,
  Github,
  ExternalLink,
  CheckCircle,
  Clock,
  Lightbulb,
  Mail,
} from 'lucide-react';

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
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight mb-6">
            Projeler
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed-plus">
            Production sistemlerde geliştirdiğim ve open source olarak
            paylaştığım projeler. Gerçek problemlere pratik çözümler.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const StatusIcon =
              project.status === 'completed'
                ? CheckCircle
                : project.status === 'active'
                  ? Clock
                  : Lightbulb;

            return (
              <div
                key={project.id}
                className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-6">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider ${getStatusColor(project.status)}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {getStatusText(project.status)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 mb-6 leading-relaxed-plus line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-6 border-t border-neutral-100">
                  <div className="flex gap-3">
                    {project.githubUrl && !isPlaceholder(project.githubUrl) && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-neutral-200 text-sm font-semibold rounded-lg text-neutral-700 bg-white hover:bg-neutral-50 hover:border-primary-300 transition-all"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </Link>
                    )}
                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-transparent text-sm font-semibold rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Canlı Demo
                      </Link>
                    )}
                    {(!project.githubUrl || isPlaceholder(project.githubUrl)) &&
                      !project.demoUrl && (
                        <span className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border-2 border-neutral-200 text-sm font-medium rounded-lg text-neutral-400 bg-neutral-50">
                          Yakında...
                        </span>
                      )}
                  </div>
                  {project.blogSlug && (
                    <Link
                      href={`/blog/${project.blogSlug}`}
                      className="text-sm text-primary-600 hover:text-primary-700 font-semibold text-center hover:underline"
                    >
                      İlgili blog yazısı →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-white via-neutral-50 to-white p-10 sm:p-14 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary-100 border border-primary-200">
              <GitBranch className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-mono font-semibold text-primary-700 uppercase tracking-wider">
                Open Source
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
              Open Source Katkıları
            </h2>
            <p className="text-lg text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed-plus">
              Paylaştığım script'ler ve araçlar open source. Hataları bildirin
              veya geliştirmelere katkıda bulunun.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {!isPlaceholder(SITE_CONFIG.contact.github) && (
                <Link
                  href={SITE_CONFIG.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neutral-200 text-base font-semibold rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 hover:border-primary-300 transition-all"
                >
                  <Github className="w-5 h-5" />
                  GitHub Profilim
                </Link>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-transparent text-base font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-5 h-5" />
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
