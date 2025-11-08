import React from 'react';
import Link from 'next/link';

// This page uses Static Site Generation (SSG) for optimal performance
export const metadata = {
  title: 'Hakkımda – Emirhan Balcı',
  description:
    "Sistem yönetimi ve web backend alanında çalışan Emirhan Balcı'nın deneyimi, odağı ve projeleri.",
};

export default function AboutPage() {
  const skills = {
    expert: [
      'Linux System Administration',
      'VMware vSphere',
      'Backup & Disaster Recovery',
      'Network Security',
      'Bash Scripting',
      'Docker & Containerization',
    ],
    proficient: [
      'Kubernetes',
      'Python Development',
      'PostgreSQL',
      'CI/CD Pipelines',
      'Monitoring & Alerting',
      'Cloud Infrastructure (AWS)',
    ],
    familiar: [
      'Terraform',
      'Ansible',
      'Prometheus & Grafana',
      'Node.js Backend',
      'React Frontend',
      'Machine Learning Basics',
    ],
  };

  // Note: Company names are placeholders for privacy. Real experience details are maintained.
  const experience = [
    {
      period: '2023 - Present',
      role: 'Senior System Administrator',
      company: 'Kurumsal Teknoloji Şirketi', // Placeholder for privacy
      description:
        'Managing production infrastructure for 50+ VMs, implementing automated backup solutions, and optimizing network performance.',
    },
    {
      period: '2021 - 2023',
      role: 'DevOps Engineer',
      company: 'SaaS Girişimi', // Placeholder for privacy
      description:
        'Built CI/CD pipelines, containerized applications, and implemented monitoring solutions for microservices architecture.',
    },
    {
      period: '2019 - 2021',
      role: 'Junior System Administrator',
      company: 'Yerel Hosting Şirketi', // Placeholder for privacy
      description:
        'Started career managing Linux servers, learning network fundamentals, and developing automation scripts.',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Hakkımda</h1>
          <p className="text-xl text-muted-foreground">
            Production sistemlerde karşılaştığım gerçek sorunları ve çözümlerini
            paylaşıyorum.
          </p>
        </div>

        {/* Personal Story */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Benim Hikayem
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Bilgisayar Mühendisliği öğrencisiyim ve sistem yönetimi, backend
              geliştirme ve güvenlik konularına tutkuyla bağlıyım. Üniversite
              eğitimim sırasında teorik bilgilerimi pratik projelerle
              birleştirerek kendimi geliştirdim.
            </p>
            <p>
              Production ortamlarda karşılaştığım zorluklar, beni daha iyi
              çözümler geliştirmeye ve bu deneyimleri başkalarıyla paylaşmaya
              yöneltti. Bu blog, hem kendi öğrenme sürecimi belgelemek hem de
              topluluğa katkıda bulunmak için oluşturuldu.
            </p>
            <p>
              Özellikle VMware altyapıları, backup çözümleri ve network
              güvenliği üzerine uzmanlaştım. Gerçek dünya problemlerine pratik
              çözümler bulmayı ve bu çözümleri open source olarak paylaşmayı
              seviyorum.
            </p>
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Teknik Beceriler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Expert Skills */}
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4">
                Uzman Seviye
              </h3>
              <ul className="space-y-2">
                {skills.expert.map((skill, index) => (
                  <li key={index} className="flex items-center text-foreground">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Proficient Skills */}
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-4">
                İyi Seviye
              </h3>
              <ul className="space-y-2">
                {skills.proficient.map((skill, index) => (
                  <li key={index} className="flex items-center text-foreground">
                    <svg
                      className="w-4 h-4 text-blue-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Familiar Skills */}
            <div>
              <h3 className="text-lg font-semibold text-yellow-600 mb-4">
                Tanıdık
              </h3>
              <ul className="space-y-2">
                {skills.familiar.map((skill, index) => (
                  <li key={index} className="flex items-center text-foreground">
                    <svg
                      className="w-4 h-4 text-yellow-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Deneyim</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  {index < experience.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-muted-foreground bg-accent px-2 py-1 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">{exp.company}</p>
                  <p className="text-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Eğitim & Sertifikalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Eğitim
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-foreground">
                    Bilgisayar Mühendisliği
                  </h4>
                  <p className="text-muted-foreground">Teknik Üniversite</p>
                  <p className="text-sm text-muted-foreground">2019 - 2024</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Sertifikalar
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-foreground">
                    Red Hat Certified System Administrator (RHCSA)
                  </h4>
                  <p className="text-sm text-muted-foreground">2023</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    AWS Certified Solutions Architect
                  </h4>
                  <p className="text-sm text-muted-foreground">2022</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    Kubernetes Application Developer (CKAD)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    2024 (Planlanan)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Birlikte Çalışalım
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Yeni projeler, teknik iş birlikleri veya open source katkıları
              için iletişime geçmekten çekinmeyin.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                İletişime Geç
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover:bg-accent transition-colors"
              >
                Projeleri İncele
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
