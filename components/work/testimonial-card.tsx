interface TestimonialProps {
  name: string
  title: string
  company: string
  initials: string,
  profileImage?: string
  testimonial: React.ReactNode
}

const TestimonialCard = ({ name, title, company, initials, profileImage, testimonial }: TestimonialProps) => {
  return (
    <div className="space-y-4 sm:space-y-6 pt-6 border-t border-theme-alt">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-theme-card border border-theme-alt flex items-center justify-center">
            <img
            src={profileImage || "/me.jpg"}
            alt={initials}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.style.display = "none";
            }}
            />
            {/* <span className="text-sm sm:text-base font-saprona-semibold text-theme">{initials}</span> */}
        </div>
        <div>
          <h4 className="text-base sm:text-lg md:text-xl font-saprona-semibold text-theme">{name}</h4>
          <p className="text-sm sm:text-base md:text-lg font-saprona-regular text-theme-alt">{title}, {company}</p>
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {testimonial}
      </div>
    </div>
  )
}

export default TestimonialCard
