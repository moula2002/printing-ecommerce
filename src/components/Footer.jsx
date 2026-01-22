import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaChevronRight,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const socialIcons = [
    { icon: FaFacebookF, color: "hover:bg-blue-600", key: "fb" },
    { icon: FaInstagram, color: "hover:bg-pink-600", key: "ig" },
    { icon: FaLinkedinIn, color: "hover:bg-blue-700", key: "in" },
    { icon: FaTwitter, color: "hover:bg-sky-500", key: "tw" },
    { icon: FaYoutube, color: "hover:bg-red-600", key: "yt" },
  ];

  const sections = [
    {
      title: "Company",
      links: ["About PADMAMBA", "Blog & Insights", "Wholesale Partners", "Contact Sales", "Careers"],
    },
    {
      title: "Services",
      links: ["National Packaging", "National Pallet", "GPO Purchasing", "Sustainable Solutions", "Custom Packaging"],
    },
    {
      title: "Support",
      links: ["My Account", "Order Tracking", "Wholesale Login", "FAQ Center", "Return Policy"],
    },
  ];

  return (
    /* Changed bg-gray-50 to bg-[#FDFCF8] (Off-White) */
    <footer className="bg-[#FDFCF8] border-t border-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Contact Section */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tighter text-gray-900">
                PADMAMBA<span className="text-gray-800">.</span>
              </h2>
              <p className="text-gray-700 leading-relaxed max-w-sm text-sm md:text-base">
                Leading the industry with sustainable packaging solutions and nationwide distribution excellence. Built for the modern supply chain.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="w-full space-y-4 max-w-sm">
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm group cursor-pointer hover:shadow-md transition-all hover:border-gray-300">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <FaPhoneAlt size={16} />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Toll Free</p>
                  <p className="text-gray-900 font-bold text-sm md:text-base">(888) 659-0892</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm group cursor-pointer hover:shadow-md transition-all hover:border-gray-300">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <FaEnvelope size={16} />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Email Support</p>
                  <p className="text-gray-900 font-bold text-sm md:text-base">support@padmamba.com</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialIcons.map((s) => (
                <a 
                  key={s.key} 
                  href="#" 
                  className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 transition-all duration-300 hover:text-white ${s.color} hover:border-transparent hover:scale-110 bg-white`}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col items-start">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-[2px] mb-6 border-b-2 border-gray-800/10 pb-2">
                  {section.title}
                </h3>
                <ul className="space-y-4 w-full">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-600 hover:text-gray-900 text-sm md:text-base transition-colors flex items-center group font-medium">
                        <FaChevronRight className="text-[8px] mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all hidden sm:block text-gray-400" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Changed bg-gray-100 to bg-[#F7F6F2] (Slightly darker off-white for contrast) */}
      <div className="bg-[#F7F6F2] border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} <span className="text-gray-900 font-bold">PADMAMBA</span>. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Powering the supply chain by <span className="text-gray-800 font-semibold">Innomatrics</span>
            </p>
          </div>

          {/* Legal Links */}
          <div className="order-1 lg:order-2 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Privacy Policy", "Terms of Use", "Sitemap", "Cookies"].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-[10px] md:text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;