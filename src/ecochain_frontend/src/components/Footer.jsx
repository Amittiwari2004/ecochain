export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black mt-24 py-12 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-green-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-green-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-6">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-black bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent mb-2">
            EcoChain
          </h3>
          <p className="text-gray-400 text-lg">Building a sustainable future through decentralized data</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
          <FooterLink href="/about" text="About" />
          <FooterLink href="/docs" text="Docs" />
          <FooterLink href="/github" text="GitHub" />
          <FooterLink href="/twitter" text="Twitter" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Social Media Section */}
        <div className="flex justify-center space-x-6 mb-8">
          <SocialIcon href="https://github.com" icon="🐙" label="GitHub" />
          <SocialIcon href="https://twitter.com" icon="🐦" label="Twitter" />
          <SocialIcon href="https://discord.com" icon="💬" label="Discord" />
          <SocialIcon href="https://telegram.org" icon="📱" label="Telegram" />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 text-sm backdrop-blur-sm bg-white/5 inline-block px-6 py-2 rounded-full border border-gray-700/50">
            © 2024 EcoChain. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-green-500 to-green-400"></div>
    </footer>
  );
}

function FooterLink({ href, text }) {
  return (
    <a 
      href={href} 
      className="group relative text-gray-400 hover:text-green-400 transition-all duration-300 font-medium text-lg px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm"
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 to-green-400/0 group-hover:from-green-600/10 group-hover:to-green-400/10 rounded-lg transition-all duration-300"></div>
    </a>
  );
}

function SocialIcon({ href, icon, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-green-500/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-400/0 group-hover:from-green-500/10 group-hover:to-green-400/10 rounded-2xl transition-all duration-300"></div>
      <span className="text-xl transform group-hover:scale-110 transition-transform duration-300 relative z-10">
        {icon}
      </span>
    </a>
  );
}