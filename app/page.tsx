'use client'

import MainLayout from "@/components/main-layout"
import HeroSection from "@/components/work/hero-section"
import SectionHeader from "@/components/work/section-header"
import WorkItem from "@/components/work/work-item"
import TestimonialCard from "@/components/work/testimonial-card"
import { useGSAP } from "@/hooks/useGSAP"

const Page = () => {
  const { containerRef } = useGSAP()

  return (
    <div ref={containerRef} className="min-h-screen">
      <MainLayout renderGradient={true}>
        {/* Hero Section */}
        <section className="hero-title flex items-center">
          <HeroSection 
            title="Mohit Paddhariya."
            subtitle={
              <span className="hero-subtitle">
                An experienced <span className="font-saprona-medium text-theme">FullStack</span> &
                <br />
                versatile <span className="font-saprona-medium text-theme">Gen-AI Developer</span>
                <br />
                living in <span className="font-saprona-regular text-theme">Bengaluru, India.</span>
              </span>
            }
          />
        </section>

        {/* Work Section */}
        <section className="mt-12 sm:mt-20 lg:mt-32">
          <div className="section-header-reveal">
            <SectionHeader title="Experience" />
          </div>

          {/* Work Items */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            <div className="work-item parallax-slow">
              <WorkItem
                title={["Full Stack & Gen - AI", "Devloper"]}
                companyLogo="/work/cognitive-labs.png"
                company="Cognitive Labs"
                period="Jun 2024 - Present"
                type="On Site • Hybrid"
                slug="coming-soon"
              />
            </div>
            
            <div className="work-item parallax-slow">
              <WorkItem
                title={["Full Stack", "Devloper"]}
                company="IMOBILE DESIGNS"
                companyLogo="/work/imobile-designs.png"
                period="Dec 2023 - Apr 2024"
                type="On Site • Intern"
                slug="imobile-designs"
              />
            </div>
          </div>
        </section>

        {/* Side Projects Section */}
        {/* <section className="mt-12 sm:mt-20 lg:mt-32 mb-12 sm:mb-20 lg:mb-32">
          <div className="section-header-reveal">
            <SectionHeader title="Side projects" />
          </div>

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            <div className="project-item parallax-medium">
              <ProjectItem
                title="Shopicons"
                description={
                  <>
                    A pack of beautiful <span className="font-saprona-medium text-theme">3D shopping icons</span> done in collaboration with <span className="font-saprona-medium text-theme">Riya Mahajan</span>. Icons are easy to customize directly in Figma files and C4D and Adobe Dimension files are included for those that want advanced customization.
                  </>
                }
                buttonText="Buy full version for $7"
                buttonHref="#"
                imagePosition="left"
              />
            </div>
          </div>
        </section> */}

        {/* What Colleagues Have Said Section */}
        <section className="mt-12 sm:mt-20 lg:mt-32">
          <div className="section-header-reveal">
            <SectionHeader title="What colleagues have said" />
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
            <div className="testimonial-card parallax-fast">
              <TestimonialCard
                name="Kaushal Rola"
                title="Founder"
                company="Imobile Designs"
                initials="KR"
                profileImage="/testimonials/kaushal-rola.jpg"
                testimonial={
                  <>
                    <p className="text-sm sm:text-base lg:text-lg font-saprona-light text-theme leading-relaxed">
                      Mohit is one of the most <span className="font-saprona-medium text-theme">talented developers</span> and <span className="font-saprona-medium text-theme">tech leaders</span> I&apos;ve known in my career.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg font-bogue-light text-theme-alt italic leading-relaxed">
                      He is incredibly versatile and knowledgeable and has super strong communication and story telling skills.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg font-saprona-light text-theme leading-relaxed">
                      He is one of the rare developers that excels at everything - <span className="font-saprona-medium text-theme">leadership, full-stack development </span> and <span className="font-saprona-medium text-theme">user experience design</span>.
                    </p>
                  </>
                }
              />
            </div>

            {/* <div className="testimonial-card parallax-fast">
              <TestimonialCard
                name="Dinesh Raju"
                title="CEO"
                company="ReferralCandy"
                initials="DR"
                testimonial={
                  <>
                    <p className="text-sm sm:text-base lg:text-lg font-saprona-light text-theme leading-relaxed">
                      Mohit focused the development team and entire company around a <span className="font-saprona-medium text-theme">customer centric approach</span> for our product development.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg font-bogue-light text-theme-alt italic leading-relaxed">
                      This resulted in <span className="font-saprona-medium text-theme">rave reviews</span> from our merchants and significantly upgraded our technical architecture.
                    </p>
                  </>
                }
              />
            </div> */}
          </div>
        </section>
      </MainLayout>
    </div>
  )
}

export default Page