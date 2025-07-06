  "use client"

  import MainLayout from '@/components/main-layout'
  import React from 'react'
  import ProfileSection from '@/components/about/profile-section'
  import SectionHeader from '@/components/about/section-header'
  import ExperienceItem, { ExperienceData } from '@/components/about/experience-item'
  import SkillCategory, { SkillCategoryData } from '@/components/about/skill-category'
  import EducationItem, { EducationData } from '@/components/about/education-item'
  import { useGSAP } from '@/hooks/useGSAP'

  const Page = () => {
    const { containerRef } = useGSAP()

    // Profile data
    const profileData = {
      name: "Mohit Paddhariya",
      role: "Full Stack Developer",
      description: [
        `<span class="text-theme">I'm a </span><span class="font-bogue-semibold text-theme">Full Stack Developer</span><span class="text-theme"> crafting scalable solutions and contributing to </span><span class="font-bogue-semibold text-theme">open source</span><span class="text-theme">.</span>`,
        `<span class="text-theme">Outside of work, I&apos;m </span><span class="font-bogue-semibold text-theme">experimenting with ideas</span><span class="text-theme">, exploring new tech.`
      ],
      imageSrc: "/me.jpg",
      imageAlt: "Mohit Paddhariya's profile picture"
    }

    // Experience data
    const experienceData: ExperienceData[] = [
      {
        title: "Full Stack & Gen-AI Developer",
        company: "Cognitive Labs",
        location: "Hybrid",
        year: "2024 - Present",
      },
      {
        title: "Full Stack Intern",
        company: "Imobile Designs",
        location: "On Site",
        year: "2023 - 2024",
      },
      {
        title: "Freelance Developer",
        company: "Remote",
        location: "Remote",
        year: "2022",
      },
    ]

    // Skills data
    const skillsData: SkillCategoryData[] = [
      {
        title: "Frontend Development",
        skills: [
          { name: "React.js" },
          { name: "Next.js" },
          { name: "TypeScript" },
          { name: "JavaScript" },
          { name: "Tailwind CSS" },
          { name: "Bootstrap" },
        ]
      },
      {
        title: "Backend & APIs",
        skills: [
          { name: "Node.js" },
          { name: "Express.js" },
          { name: "FastAPI" },
          { name: "PHP" },
          { name: "Laravel" },
          { name: "RESTful APIs" },
          { name: "WebSockets" },
        ]
      },
      {
        title: "Databases",
        skills: [
          { name: "MongoDB" },
          { name: "PostgreSQL" },
          { name: "MySQL" },
          { name: "Firebase" },
          { name: "SQLite" },
          { name: "Redis" },
          { name: "Prisma" }
        ]
      },
      {
        title: "Mobile Development",
        skills: [
          { name: "React Native" },
          { name: "Expo" },
          { name: "Android" },
          { name: "iOS" },
          { name: "XML" }
        ]
      },
      {
        title: "DevOps & Cloud",
        skills: [
          { name: "Docker" },
          { name: "AWS" },
          { name: "GCP" },
          { name: "CI/CD" },
          { name: "Kubernetes" },
          { name: "GitHub Actions" }
        ]
      },
      {
        title: "AI & Machine Learning",
        skills: [
          { name: "LLMs", isHighlighted: true },
          { name: "Python" },
          { name: "Hugging Face Ecosystem" },
          { name: "LangChain" },
          { name: "PyTorch" },
          { name: "Transformers" },
        ]
      }
    ]

    // Education data
    const educationData: EducationData[] = [
      {
        institution: "P.E.S University",
        degree: "Bachelor's Degree in Computer Science",
        focus: "Computer Science and Software Engineering",
        period: "2024 - Present",
        achievements: ["Mentor for National Hackathon 2025"]
      },
      {
        institution: "RK University",
        degree: "Diploma in Computer Science",
        period: "2021 - 2024",
        gpa: "9.56/10",
        achievements: ["Student of the Year 2023"]
      }
    ]


    return (
      <div ref={containerRef} className="min-h-screen">
        <MainLayout renderGradient={true} renderGradientOnMobile={false}>
          <div className="mx-auto">
            {/* SEO Component */}

            {/* Hero Section */}
            <section className="hero-title">
              <ProfileSection
                name={profileData.name}
                role={profileData.role}
                description={profileData.description}
                imageSrc={profileData.imageSrc}
                imageAlt={profileData.imageAlt}
              />
            </section>

            {/* About Me Section */}
            <section className="mt-12 sm:mt-16 lg:mt-20 parallax-slow">
              <div className="section-header-reveal">
                <SectionHeader title="About me" />
              </div>

              <div className="space-y-6">
                {/* <div className="about-text-item">
                  <p className="text-base sm:text-lg md:text-xl font-saprona-light text-theme leading-relaxed">
                    I'm a versatile <span className="font-saprona-semibold text-theme">Full Stack Developer</span> and
                    <span className="font-saprona-semibold text-theme"> Gen-AI specialist</span> with a passion for creating
                    innovative digital experiences. My journey in technology has been driven by curiosity and a desire to solve
                    complex problems through elegant solutions.
                  </p>
                </div>

                <div className="about-text-item">
                  <p className="text-base sm:text-lg md:text-xl font-saprona-light text-theme leading-relaxed">
                    Currently based in Bengaluru, India, I help startups and established companies build robust applications and integrate
                    <span className="font-saprona-semibold text-theme"> AI capabilities</span>. When I'm not coding, you'll find me working with
                    <span className="font-saprona-semibold text-theme"> LLMs</span>, contributing to open-source projects, or exploring
                    modern technologies.
                  </p>
                </div> */}
                <div className="about-text-item">
                  <p className="text-base sm:text-lg md:text-xl font-saprona-light text-theme leading-relaxed">
                    I&apos;m a passionate <span className="font-saprona-semibold text-theme">Full Stack Developer</span> and
                    <span className="font-saprona-semibold text-theme"> Gen-AI Engineer</span> who builds scalable digital solutions
                    across web, mobile, and AI platforms. My expertise spans modern frameworks, cloud architecture, and cutting-edge
                    AI technologies, always focusing on performance and user experience.
                  </p>
                </div>

                <div className="about-text-item">
                  <p className="text-base sm:text-lg md:text-xl font-saprona-light text-theme leading-relaxed">
                    Based in Bengaluru, India, I work with startups and enterprises to transform ideas into powerful applications.
                    From <span className="font-saprona-semibold text-theme">Next.js web apps</span> to
                    <span className="font-saprona-semibold text-theme"> intelligent AI systems</span>, I create solutions that drive
                    business growth. I&apos;m also an active open-source contributor, constantly exploring emerging technologies and
                    sharing knowledge with the developer community.
                  </p>
                </div>
              </div>
            </section>
            {/* Experience Section */}
            <section className="mt-12 sm:mt-16 lg:mt-20 parallax-medium">
              <div className="section-header-reveal">
                <SectionHeader title="Experience" />
              </div>

              <div className="space-y-0">
                {experienceData.map((experience, index) => (
                  <div key={index} className="work-item">
                    <ExperienceItem
                      experience={experience}
                      showBorder={index < experienceData.length - 1}
                    />
                  </div>
                ))}
              </div>
            </section>          {/* Skills Section */}
            <section className="mt-12 sm:mt-16 lg:mt-20 parallax-fast">
              <div className="section-header-reveal">
                <SectionHeader title="Skills & Technologies" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {skillsData.map((category, index) => (
                  <div key={index} className="project-item">
                    <SkillCategory category={category} />
                  </div>
                ))}
              </div>
            </section>          {/* Education Section */}
            <section className="mt-12 sm:mt-16 lg:mt-20 parallax-slow">
              <div className="section-header-reveal">
                <SectionHeader title="Education" />
              </div>

              <div className="space-y-6 lg:space-y-8">
                {educationData.map((education, index) => (
                  <div key={index} className="testimonial-card">
                    <EducationItem education={education} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </MainLayout>
      </div>
    )
  }

  export default Page