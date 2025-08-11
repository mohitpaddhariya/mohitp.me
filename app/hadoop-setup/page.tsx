'use client'

import MainLayout from "@/components/main-layout"
import HeroSection from "@/components/work/hero-section"
import SectionHeader from "@/components/work/section-header"
import { useGSAP } from "@/hooks/useGSAP"
import { Copy, Download, Terminal, CheckCircle, AlertCircle, Zap, Shield, Settings, Coffee } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const HadoopSetupPage = () => {
  const { containerRef } = useGSAP()
  const [copied, setCopied] = useState(false)

  const installCommand = "curl -fsSL https://mohitp.me/api/scripts/hadoop-setup | bash"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const downloadScript = () => {
    window.open('/scripts/hadoop-setup.sh', '_blank')
  }

  return (
    <div ref={containerRef} className="min-h-screen">
      <MainLayout renderGradient={true}>
        {/* Hero Section */}
        <section className="hero-title flex items-center">
          <HeroSection 
            title="Hadoop Setup."
            subtitle={
              <span className="hero-subtitle">
                A <span className="font-saprona-medium text-theme">beautiful</span> &
                <br />
                <span className="font-saprona-medium text-theme">automated</span> installer for
                <br />
                <span className="font-saprona-regular text-theme">Apache Hadoop on macOS.</span>
              </span>
            }
            isScript={true}
          />
        </section>

        {/* Quick Install Section */}
        <section className="mt-12 sm:mt-20 lg:mt-32">
          <div className="section-header-reveal">
            <SectionHeader title="Quick Install" />
          </div>

          <div className="work-item parallax-slow">
            <div className="bg-theme-card border border-theme-alt/20 rounded-2xl p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-saprona-medium text-theme mb-3">
                    One-line installation
                  </h3>
                  <p className="text-base sm:text-lg font-saprona-light text-theme-alt leading-relaxed">
                    Copy and paste this command in your terminal to get started instantly. The script will automatically detect your Java installation and configure everything for you.
                  </p>
                </div>

                {/* Command Box */}
                <div className="relative">
                  <div className="bg-theme/5 border border-theme-alt/30 rounded-xl p-4 sm:p-6 font-mono text-sm sm:text-base overflow-x-auto">
                    <code className="text-theme whitespace-nowrap">
                      {installCommand}
                    </code>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-theme-text text-theme-bg rounded-lg hover:opacity-90 transition-opacity font-saprona-medium text-sm"
                    >
                      {copied ? (
                        <>
                          <CheckCircle size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={downloadScript}
                      className="flex items-center gap-2 px-4 py-2 border border-theme-alt/30 text-theme rounded-lg hover:bg-theme-alt/10 transition-colors font-saprona-medium text-sm"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>

                  {/* Auto-install option */}
                  <div className="mt-6 p-4 bg-theme-text/5 rounded-lg border border-theme-alt/20">
                    <h4 className="text-sm font-saprona-medium text-theme mb-2">
                      Non-interactive Installation
                    </h4>
                    <p className="text-xs sm:text-sm font-saprona-light text-theme-alt mb-3">
                      For automated deployments, use the auto-install mode:
                    </p>
                    <div className="bg-theme/5 border border-theme-alt/30 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <code className="text-theme whitespace-nowrap">
                        HADOOP_AUTO_INSTALL=true curl -fsSL https://mohitp.me/api/scripts/hadoop-setup | bash
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-12 sm:mt-20 lg:mt-32">
          <div className="section-header-reveal">
            <SectionHeader title="What it does" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
            <div className="work-item parallax-slow">
              <div className="bg-theme-card border border-theme-alt/20 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-theme-text/10 rounded-lg">
                    <Coffee className="w-5 h-5 text-theme" />
                  </div>
                  <h3 className="text-lg font-saprona-medium text-theme">
                    Sit Back & Relax
                  </h3>
                </div>
                <p className="text-sm sm:text-base font-saprona-light text-theme-alt leading-relaxed">
                  Complete hands-off installation with beautiful progress indicators and detailed logging.
                </p>
              </div>
            </div>

            <div className="work-item parallax-slow">
              <div className="bg-theme-card border border-theme-alt/20 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-theme-text/10 rounded-lg">
                    <Settings className="w-5 h-5 text-theme" />
                  </div>
                  <h3 className="text-lg font-saprona-medium text-theme">
                    Smart Detection
                  </h3>
                </div>
                <p className="text-sm sm:text-base font-saprona-light text-theme-alt leading-relaxed">
                  Intelligently detects Java 11 installations from system paths, Homebrew, or JavaVirtualMachines directory.
                </p>
              </div>
            </div>

            <div className="work-item parallax-slow">
              <div className="bg-theme-card border border-theme-alt/20 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-theme-text/10 rounded-lg">
                    <Shield className="w-5 h-5 text-theme" />
                  </div>
                  <h3 className="text-lg font-saprona-medium text-theme">
                    Safe & Reliable
                  </h3>
                </div>
                <p className="text-sm sm:text-base font-saprona-light text-theme-alt leading-relaxed">
                  Uses Homebrew for package management and includes proper error handling and cleanup.
                </p>
              </div>
            </div>

            <div className="work-item parallax-slow">
              <div className="bg-theme-card border border-theme-alt/20 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-theme-text/10 rounded-lg">
                    <Zap className="w-5 h-5 text-theme" />
                  </div>
                  <h3 className="text-lg font-saprona-medium text-theme">
                    Ready to Use
                  </h3>
                </div>
                <p className="text-sm sm:text-base font-saprona-light text-theme-alt leading-relaxed">
                  Starts all Hadoop services and provides web UI access at localhost:9870.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="mt-12 sm:mt-20 lg:mt-32">
          <div className="section-header-reveal">
            <SectionHeader title="Enhanced Java Detection" />
          </div>

          <div className="work-item parallax-slow">
            <div className="bg-theme-card border border-theme-alt/20 rounded-2xl p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-saprona-medium text-theme mb-3">
                    Intelligent Java 11 Detection
                  </h3>
                  <p className="text-base sm:text-lg font-saprona-light text-theme-alt leading-relaxed mb-6">
                    The script now intelligently detects Java 11 installations from multiple sources and provides helpful guidance if not found.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-theme-text/5 rounded-lg p-4">
                    <h4 className="font-saprona-medium text-theme mb-2">System Installation</h4>
                    <p className="text-sm font-saprona-light text-theme-alt">
                      Checks <code className="bg-theme-text/10 px-1 rounded text-xs">/usr/libexec/java_home</code> for system-wide Java installations
                    </p>
                  </div>
                  
                  <div className="bg-theme-text/5 rounded-lg p-4">
                    <h4 className="font-saprona-medium text-theme mb-2">Homebrew</h4>
                    <p className="text-sm font-saprona-light text-theme-alt">
                      Detects <code className="bg-theme-text/10 px-1 rounded text-xs">openjdk@11</code> installed via Homebrew package manager
                    </p>
                  </div>
                  
                  <div className="bg-theme-text/5 rounded-lg p-4">
                    <h4 className="font-saprona-medium text-theme mb-2">JavaVirtualMachines</h4>
                    <p className="text-sm font-saprona-light text-theme-alt">
                      Scans <code className="bg-theme-text/10 px-1 rounded text-xs">/Library/Java/JavaVirtualMachines/</code> for manual installations
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-theme-alt/20">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
                      <Terminal className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-saprona-medium text-theme mb-1">
                        No Java 11 found?
                      </p>
                      <p className="text-sm font-saprona-light text-theme-alt">
                        The script provides direct download links and installation commands to help you get started quickly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="mt-12 sm:mt-20 lg:mt-32">
          <div className="section-header-reveal">
            <SectionHeader title="Requirements" />
          </div>

          <div className="work-item parallax-slow">
            <div className="bg-theme-card border border-theme-alt/20 rounded-2xl p-6 sm:p-8 lg:p-10">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-500/10 rounded-lg flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-saprona-medium text-theme mb-3">
                    Before you start
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base font-saprona-light text-theme-alt">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-theme-alt rounded-full flex-shrink-0"></div>
                      <span>macOS system (tested on macOS 11+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-theme-alt rounded-full flex-shrink-0"></div>
                      <span>Homebrew installed (<a href="https://brew.sh" className="text-theme-link hover:text-theme-link-hover transition-colors">brew.sh</a>)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-theme-alt rounded-full flex-shrink-0"></div>
                      <span>Java 11 (script will help locate or suggest installation)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-theme-alt rounded-full flex-shrink-0"></div>
                      <span>Administrator privileges for system modifications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manual Installation Section */}
        <section className="mt-12 sm:mt-20 lg:mt-32">
          <div className="section-header-reveal">
            <SectionHeader title="Manual Installation" />
          </div>

          <div className="work-item parallax-slow">
            <div className="bg-theme-card border border-theme-alt/20 rounded-2xl p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-saprona-medium text-theme mb-3">
                    Step-by-step guide
                  </h3>
                  <p className="text-base sm:text-lg font-saprona-light text-theme-alt leading-relaxed mb-6">
                    Prefer to do it manually? Here&apos;s what the script does behind the scenes.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    "Checks for Homebrew installation",
                    "Detects Java 11 from multiple sources (system, Homebrew, JavaVirtualMachines)",
                    "Installs Apache Hadoop via Homebrew",
                    "Configures Hadoop environment variables",
                    "Sets up SSH for passwordless access",
                    "Formats the Hadoop NameNode (first-time only)",
                    "Starts all Hadoop services (HDFS, YARN, MapReduce)"
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-theme-text/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-saprona-medium text-theme">{index + 1}</span>
                      </div>
                      <span className="text-sm sm:text-base font-saprona-light text-theme-alt">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-theme-alt/20">
                  <div className="flex items-center gap-2 text-sm font-saprona-light text-theme-alt mb-3">
                    <Terminal size={16} />
                    <span>Access points after installation:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono">
                    <div>
                      <div className="text-theme-alt mb-1">Hadoop Web UI:</div>
                      <div className="text-theme-link">http://localhost:9870</div>
                    </div>
                    <div>
                      <div className="text-theme-alt mb-1">YARN Resource Manager:</div>
                      <div className="text-theme-link">http://localhost:8088</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-theme-alt/10">
                    <div className="text-sm font-saprona-light text-theme-alt mb-2">
                      Useful commands:
                    </div>
                    <div className="space-y-1 text-xs font-mono text-theme-alt">
                      <div><span className="text-theme">jps</span> - Check running Hadoop processes</div>
                      <div><span className="text-theme">start-all.sh</span> - Start all Hadoop services</div>
                      <div><span className="text-theme">stop-all.sh</span> - Stop all Hadoop services</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author Section */}
        <section className="mt-12 sm:mt-20 lg:mt-32 mb-12 sm:mb-20 lg:mb-32">
          <div className="work-item parallax-slow">
            <div className="bg-theme-card border border-theme-alt/20 rounded-2xl p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-theme-text/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-saprona-medium text-theme">MP</span>
                </div>
                <div>
                  <h3 className="text-lg font-saprona-medium text-theme">
                    Created by Mohit Paddhariya
                  </h3>
                  <p className="text-sm sm:text-base font-saprona-light text-theme-alt">
                    FullStack & Gen-AI Developer • <Link href="/" className="text-theme-link hover:text-theme-link-hover transition-colors">mohitp.me</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </div>
  )
}

export default HadoopSetupPage
