import { motion } from "framer-motion";
import { MapPin, Satellite, Shield, Phone } from "lucide-react";
import { productData } from "@/data/productData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Use Cases", href: "#use-cases" },
      { name: "Videos", href: "#videos" },
    ],
    company: [
      { name: "About Us", href: "#hero" },
      { name: "Contact", href: "#contact" },
      { name: "Dealers", href: "#contact" },
    ],
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground py-16 lg:py-20">
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="inline-flex items-center gap-2 mb-5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-background">
                  {productData.company.name}
                </span>
              </div>
            </motion.a>
            <p className="text-background/60 max-w-md mb-6">
              {productData.company.description}. Providing cutting-edge SIM-free satellite
              GPS tracking technology for vehicles and assets across Pakistan.
            </p>

            {/* Features Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/10 text-sm text-background/80">
                <Satellite className="w-3.5 h-3.5" />
                Satellite GPS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/10 text-sm text-background/80">
                <Shield className="w-3.5 h-3.5" />
                No SIM Required
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-bold text-background mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-bold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-background/10">
              <a
                href={productData.company.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-background/60 hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4" />
                {productData.company.whatsapp}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © {currentYear} {productData.company.name}. All rights reserved.
          </p>
          <p className="text-sm text-background/50">
            "{productData.company.tagline}"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
