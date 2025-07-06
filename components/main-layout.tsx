import Footer from "@/components/footer"
import GradientBlur from "@/components/gradient-blur"

interface MainLayoutProps {
  children: React.ReactNode,
  renderGradient?: boolean,
  renderGradientOnMobile?: boolean,
  sectionClassName?: string
}

const MainLayout = ({ children, renderGradient = true, renderGradientOnMobile = true, sectionClassName }: MainLayoutProps) => {
  return (
    <div className="max-w-[1000px] min-h-screen mx-auto">
      {/* Background Gradient Effect */}
      {
        renderGradient && (
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1000px] z-40 pointer-events-none ${!renderGradientOnMobile ? 'hidden md:block' : ''}`}>
            <GradientBlur className="w-full" />
          </div>
        )
      }

      {/* Main Content */}
      <div className="relative">
        {/* Main Content Area */}
        <main className={`px-2 sm:px-3 pt-20 sm:pt-24 ${renderGradient ? 'pb-6 sm:pb-12 lg:pb-16' : 'pb-4 sm:pb-6 lg:pb-8'}`}>
          <div className={`relative z-10 mt-20 ${sectionClassName}`}>
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
