'use client';

import React from 'react';
import ScriptCard from '../../components/ScriptCard';

// Mock data - in production, this would come from GitHub or Headless CMS
const scripts = [
  {
    id: 'backup-script',
    title: 'VMware VM Backup Script',
    description:
      'VMware vSphere ortamında sanal makinelerin otomatik yedeklenmesi için Bash script.',
    language: 'bash',
    githubUrl: 'https://github.com/yourusername/vmware-backup',
    // Note: In template literals, ${} is for interpolation. 
    // To output literal ${}, use \${} (single backslash escapes the interpolation)
    code: `#!/bin/bash

# VMware VM Backup Script
# Author: Your Name
# Description: Automates VM backups in vSphere environment

# Configuration
VCENTER_SERVER="vcenter.example.com"
VCENTER_USER="administrator@vsphere.local"
DATASTORE="backup-datastore"
BACKUP_DIR="/vmbackups"
LOG_FILE="/var/log/vm-backup.log"

# Logging function
log_message() {
    echo "$(date): $1" >> $LOG_FILE
}

# Check prerequisites
check_prerequisites() {
    if ! command -v govc &> /dev/null; then
        log_message "ERROR: govc command not found. Please install govc."
        exit 1
    fi
    
    if [ ! -d "$BACKUP_DIR" ]; then
        mkdir -p $BACKUP_DIR
        log_message "Created backup directory: $BACKUP_DIR"
    fi
}

# Get list of VMs
get_vm_list() {
    govc ls /datacenter/vm | while read vm; do
        echo $vm
    done
}

# Create VM snapshot
create_snapshot() {
    local vm_name=$1
    local snapshot_name="backup-$(date +%Y%m%d-%H%M%S)"
    
    log_message "Creating snapshot for VM: $vm_name"
    govc snapshot.create -vm "$vm_name" "$snapshot_name"
    
    if [ $? -eq 0 ]; then
        log_message "Snapshot created successfully: $snapshot_name"
        echo $snapshot_name
    else
        log_message "ERROR: Failed to create snapshot for VM: $vm_name"
        return 1
    fi
}

# Main backup function
backup_vm() {
    local vm_name=$1
    local backup_file="$BACKUP_DIR/\${vm_name}-$(date +%Y%m%d).ova"
    
    log_message "Starting backup for VM: $vm_name"
    
    # Create snapshot
    local snapshot_name=$(create_snapshot "$vm_name")
    if [ $? -ne 0 ]; then
        return 1
    fi
    
    # Export VM
    log_message "Exporting VM: $vm_name to $backup_file"
    govc export.ova -vm "$vm_name" "$backup_file"
    
    if [ $? -eq 0 ]; then
        log_message "VM exported successfully: $backup_file"
        
        # Remove snapshot
        govc snapshot.remove -vm "$vm_name" "$snapshot_name"
        log_message "Snapshot removed: $snapshot_name"
    else
        log_message "ERROR: Failed to export VM: $vm_name"
        return 1
    fi
}

# Main execution
main() {
    log_message "=== Starting VM Backup Process ==="
    
    check_prerequisites
    
    # Set govc environment
    export GOVC_URL=$VCENTER_SERVER
    export GOVC_USERNAME=$VCENTER_USER
    export GOVC_INSECURE=true
    
    # Get VM list and backup each VM
    get_vm_list | while read vm; do
        backup_vm "$vm"
    done
    
    log_message "=== Backup Process Completed ==="
}

# Execute main function
main "$@"`,
    tags: ['vmware', 'backup', 'bash', 'automation'],
    usage: [
      'Bu script VMware vSphere ortamında çalışır.',
      'Öncelikle govc aracının kurulu olması gerekir.',
      'Script çalıştırmadan önce GOVC_URL ve GOVC_USERNAME ortam değişkenlerini ayarlayın.',
    ],
    requirements: [
      'govc CLI aracı',
      'bash 4.0+',
      'vSphere yönetici izinleri',
      'Yeterli disk alanı',
    ],
  },
  {
    id: 'log-cleanup',
    title: 'Log File Cleanup Script',
    description:
      'Sistem log dosyalarını temizleyen ve arşivleyen Python script.',
    language: 'python',
    githubUrl: 'https://github.com/yourusername/log-cleanup',
    code: `#!/usr/bin/env python3
"""
Log File Cleanup and Archiving Script
Author: Your Name
Description: Cleans up old log files and archives them
"""

import os
import gzip
import shutil
import argparse
from datetime import datetime, timedelta
from pathlib import Path

class LogCleanup:
    def __init__(self, log_dirs, retention_days=30, archive_dir="/var/log/archive"):
        self.log_dirs = log_dirs
        self.retention_days = retention_days
        self.archive_dir = Path(archive_dir)
        self.cutoff_date = datetime.now() - timedelta(days=retention_days)
        
        # Create archive directory if it doesn't exist
        self.archive_dir.mkdir(parents=True, exist_ok=True)
    
    def should_process_file(self, file_path):
        """Check if file should be processed based on modification time"""
        if not file_path.is_file():
            return False
        
        # Skip current log files (those modified today)
        stat = file_path.stat()
        mod_time = datetime.fromtimestamp(stat.st_mtime)
        
        return mod_time < self.cutoff_date
    
    def compress_file(self, file_path):
        """Compress file using gzip"""
        compressed_path = self.archive_dir / f"{file_path.name}.gz"
        
        try:
            with open(file_path, 'rb') as f_in:
                with gzip.open(compressed_path, 'wb') as f_out:
                    shutil.copyfileobj(f_in, f_out)
            
            # Set permissions on compressed file
            compressed_path.chmod(0o644)
            return True
            
        except Exception as e:
            print(f"Error compressing {file_path}: {e}")
            return False
    
    def cleanup_directory(self, log_dir):
        """Clean up log files in a directory"""
        log_path = Path(log_dir)
        
        if not log_path.exists():
            print(f"Directory does not exist: {log_dir}")
            return
        
        processed_files = 0
        deleted_files = 0
        
        for file_path in log_path.iterdir():
            if self.should_process_file(file_path):
                print(f"Processing: {file_path}")
                
                # Compress and archive the file
                if self.compress_file(file_path):
                    # Remove original file after successful compression
                    file_path.unlink()
                    deleted_files += 1
                
                processed_files += 1
        
        return processed_files, deleted_files
    
    def run_cleanup(self):
        """Run the cleanup process for all directories"""
        total_processed = 0
        total_deleted = 0
        
        print(f"Starting log cleanup (retention: {self.retention_days} days)")
        print(f"Cutoff date: {self.cutoff_date.strftime('%Y-%m-%d')}")
        print("-" * 50)
        
        for log_dir in self.log_dirs:
            print(f"\\nCleaning up: {log_dir}")
            processed, deleted = self.cleanup_directory(log_dir)
            total_processed += processed
            total_deleted += deleted
        
        print("\\n" + "=" * 50)
        print(f"Cleanup completed:")
        print(f"  - Files processed: {total_processed}")
        print(f"  - Files deleted: {total_deleted}")
        print(f"  - Archives stored in: {self.archive_dir}")

def main():
    parser = argparse.ArgumentParser(description='Log file cleanup and archiving')
    parser.add_argument('--retention', type=int, default=30,
                       help='Number of days to retain logs (default: 30)')
    parser.add_argument('--archive-dir', default='/var/log/archive',
                       help='Archive directory (default: /var/log/archive)')
    
    args = parser.parse_args()
    
    # Define log directories to clean up
    log_directories = [
        '/var/log',
        '/var/log/apache2',
        '/var/log/nginx',
        '/var/log/mysql'
    ]
    
    # Create and run cleanup
    cleanup = LogCleanup(
        log_dirs=log_directories,
        retention_days=args.retention,
        archive_dir=args.archive_dir
    )
    
    cleanup.run_cleanup()

if __name__ == "__main__":
    main()`,
    tags: ['python', 'log', 'cleanup', 'automation'],
    usage: [
      'python3 log_cleanup.py --retention 30 --archive-dir /var/log/archive',
      'Script root yetkisi ile çalıştırılmalıdır.',
      'Retention gün sayısını ihtiyacınıza göre ayarlayın.',
    ],
    requirements: [
      'Python 3.6+',
      'gzip modülü (standart kütüphane)',
      'Root yetkileri',
      'Yeterli disk alanı',
    ],
  },
];

export default function ScriptsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Scripts Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Production sistemlerde kullandığım otomasyon script'leri. Bash,
            Python ve diğer dillerde geliştirilmiş pratik çözümler.
          </p>
        </div>

        {/* Scripts Grid */}
        <div className="space-y-8">
          {scripts.map((script) => (
            <ScriptCard
              key={script.id}
              title={script.title}
              description={script.description}
              scriptContent={script.code}
              language={script.language}
              tags={script.tags}
              requirements={script.requirements}
              usage={script.usage}
              githubUrl={script.githubUrl}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Daha Fazla Script İster Misiniz?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              GitHub profilimde daha fazla open source script ve otomasyon aracı
              bulabilirsiniz. Ayrıca özel script talepleriniz için iletişime
              geçebilirsiniz.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                GitHub'da İncele
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Script Talebi
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

