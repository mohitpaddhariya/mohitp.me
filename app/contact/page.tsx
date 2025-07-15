'use client'

import React from 'react'
import MainLayout from '@/components/main-layout'
import { Mail, Linkedin, Github, MapPin, ArrowRight, Download } from 'lucide-react'
import { useGSAP } from '@/hooks/useGSAP'
import Link from 'next/link'

const Page = () => {
  const { containerRef } = useGSAP()

  return (
    <div ref={containerRef} className="min-h-screen">
      <MainLayout renderGradient={true} renderGradientOnMobile={true}>
        <div className="">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Header */}
            <section className="hero-title">
              <div className="text-center mb-16">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bogue-thin text-theme leading-tight mb-4 sm:mb-6">
                  <span className="text-theme">Let&apos;s work </span>
                  <span className="font-bogue-semibold text-theme">together</span>
                  <span className="text-theme">.</span>
                </h1>
                <div className="hero-subtitle">
                  <p className="text-base sm:text-lg md:text-xl font-saprona-light text-theme-alt leading-relaxed max-w-2xl mx-auto">
                    I&apos;m always excited to collaborate on new projects and opportunities.
                    Whether you&apos;re looking for a <span className="font-saprona-semibold text-theme">full-stack developer</span>,
                    <span className="font-saprona-semibold text-theme"> AI integration specialist</span>, or just want to chat about tech.
                  </p>
                </div>
              </div>
            </section>

            {/* Main Content - Split Screen Layout */}
            <section>
              <div className="grid lg:grid-cols-2 gap-16 items-start">

                {/* Left Side - Interactive Contact Grid */}
                <div className="space-y-8">

                  {/* Primary Contact - Large Featured Card */}
                  <div className="work-item">
                    <div className="group relative overflow-hidden bg-theme-card border border-theme-border rounded-3xl p-8 hover:scale-[1.02] transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-theme/5 to-theme-link/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="p-4 bg-theme text-theme-bg rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <Mail className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bogue-semibold text-theme mb-1">Let&apos;s Talk Business</h3>
                            <p className="font-saprona-light text-theme-alt">Primary contact for projects</p>
                          </div>
                        </div>
                        <a
                          href="mailto:mohit.paddhariya@gmail.com?subject=Project Inquiry"
                          className="inline-flex items-center px-6 py-3 bg-theme text-theme-bg rounded-xl font-saprona-medium 
                                   hover:bg-theme-link-hover hover:shadow-lg hover:shadow-theme/25 transition-all duration-300 group/btn"
                        >
                          Send Message
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                        <p className="text-sm font-saprona-light text-theme-alt mt-4 opacity-75">
                          mohit.paddhariya@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>                  {/* Secondary Contacts - Bento Grid */}
                  <div className="project-item">
                    <div className="grid grid-cols-2 gap-4">

                      {/* LinkedIn */}
                      <div className="group bg-theme-card border border-theme-border rounded-2xl p-6 hover:-translate-y-2 
                                    hover:shadow-xl hover:shadow-theme/10 transition-all duration-300">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="p-3 bg-theme-card border border-theme-border rounded-xl group-hover:bg-theme/5 transition-colors">
                            <Linkedin className="w-6 h-6 text-theme" />
                          </div>
                          <div>
                            <h4 className="font-bogue-medium text-theme mb-1">LinkedIn</h4>
                            <p className="text-xs font-saprona-light text-theme-alt mb-3">Professional network</p>
                            <a
                              href="https://linkedin.com/in/mohit-paddhariya"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-theme-link hover:text-theme-link-hover font-saprona-medium"
                            >
                              Connect →
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* GitHub */}
                      <div className="group bg-theme-card border border-theme-border rounded-2xl p-6 hover:-translate-y-2 
                                    hover:shadow-xl hover:shadow-theme/10 transition-all duration-300">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="p-3 bg-theme-card border border-theme-border rounded-xl group-hover:bg-theme/5 transition-colors">
                            <Github className="w-6 h-6 text-theme" />
                          </div>
                          <div>
                            <h4 className="font-bogue-medium text-theme mb-1">GitHub</h4>
                            <p className="text-xs font-saprona-light text-theme-alt mb-3">Code portfolio</p>
                            <a
                              href="https://github.com/mohitpaddhariya"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-theme-link hover:text-theme-link-hover font-saprona-medium"
                            >
                              View Code →
                            </a>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>                  
                </div> 

                {/* Right Side - CTA & Info Panel */}
                <div className="space-y-8">

                  {/* Main CTA Section */}
                  <div className="work-item">
                    <div className="relative overflow-hidden bg-theme-card border border-theme-border rounded-3xl p-8">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-theme/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bogue-semibold text-theme mb-4">Ready to Collaborate?</h3>
                        <p className="font-saprona-light text-theme-alt mb-8 leading-relaxed">
                          I&apos;m currently available for new projects and always excited to work on innovative solutions.
                          Let&apos;s discuss how we can bring your ideas to life.
                        </p>

                        <div className="space-y-4">
                          <Link
                            href="mailto:mohit.paddhariya@gmail.com?subject=Project Inquiry"
                            className="w-full bg-theme text-theme-bg px-6 py-4 rounded-xl font-saprona-medium 
                                     hover:bg-theme-link-hover hover:scale-105 hover:shadow-xl hover:shadow-theme/25 transition-all duration-300 
                                     flex items-center justify-center group"
                          >
                            Start a Project
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>

                          <Link
                            href="/mohit_paddhariya's_resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full border-2 border-theme-border text-theme px-6 py-4 rounded-xl font-saprona-medium 
                                     hover:border-theme hover:bg-theme/5 hover:scale-105 transition-all duration-300 
                                     flex items-center justify-center group"
                          >
                            Download Resume
                            <Download className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>         
                  {/* Location Card - Full Width */}
                  <div className="testimonial-card">
                    <div className="group relative overflow-hidden bg-theme-card border border-theme-border rounded-2xl p-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-theme/5 to-theme-link/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex items-center space-x-4">
                        <div className="p-3 bg-theme text-theme-bg rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bogue-medium text-theme mb-1">Based in Bengaluru, India</h4>
                          <p className="text-sm font-saprona-light text-theme-alt">Available for remote work globally • UTC+5:30</p>
                        </div>
                        <div className="hidden sm:block">
                          <div className="w-3 h-3 bg-theme rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>      
                  {/* Availability Notice */}
                  {/* <div className="testimonial-card">
                    <div className="bg-theme-card border border-theme-border rounded-2xl p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-theme rounded-full animate-pulse"></div>
                        <div>
                          <h4 className="font-bogue-medium text-theme mb-1">Currently Available</h4>
                          <p className="text-sm font-saprona-light text-theme-alt">
                            Open for freelance projects and full-time opportunities
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}

                </div>

              </div>
            </section>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default Page