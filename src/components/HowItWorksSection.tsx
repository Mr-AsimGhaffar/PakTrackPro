import { motion } from "framer-motion";
import {
  Satellite,
  Radio,
  MapPin,
  Smartphone,
  BatteryFull,
  Globe,
} from "lucide-react";
import { productData } from "@/data/productData";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
  {
    Satellite: Satellite,
    Radio: Radio,
    MapPin: MapPin,
    Smartphone: Smartphone,
    BatteryFull: BatteryFull,
    Earth: Globe,
  };

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-background">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-primary font-semibold text-sm mb-4">
            Simple & Effective
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our satellite GPS tracker uses cutting-edge technology to provide
            reliable tracking without any network dependency.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
            {productData.howItWorks.map((step, index) => {
              const IconComponent = iconMap[step.icon] || Globe;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="card-elevated card-hover p-6 lg:p-8 text-center h-full">
                    {/* Step Number */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shadow-glow">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mt-4 mb-5 rounded-2xl bg-accent flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Platform Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 card-elevated p-8 lg:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Works With Your Favorite Platforms
            </h3>
            <p className="text-muted-foreground">
              Seamlessly integrates with Google Find Hub and Apple Find My
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {/* Android */}
            <a
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.adm&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-xl bg-accent hover:bg-accent/80 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                >
                  <path d="M17.523 2.424a.5.5 0 01.852.354v1.097l1.177.679a.5.5 0 01.183.683l-.549.951v3.624h1.064a.75.75 0 010 1.5h-1.064v3.376h1.064a.75.75 0 010 1.5h-1.064v3.624l.549.951a.5.5 0 01-.183.683l-1.177.679v1.097a.5.5 0 01-.852.354l-.776-.776-.776.776a.5.5 0 01-.707 0l-.776-.776-.776.776a.5.5 0 01-.707 0l-.776-.776-.776.776a.5.5 0 01-.707 0l-.776-.776-.776.776a.5.5 0 01-.707 0l-.776-.776-.776.776a.5.5 0 01-.852-.354v-1.097l-1.177-.679a.5.5 0 01-.183-.683l.549-.951v-3.624H3.75a.75.75 0 010-1.5h1.064v-3.376H3.75a.75.75 0 010-1.5h1.064V6.188l-.549-.951a.5.5 0 01.183-.683l1.177-.679V2.778a.5.5 0 01.852-.354l.776.776.776-.776a.5.5 0 01.707 0l.776.776.776-.776a.5.5 0 01.707 0l.776.776.776-.776a.5.5 0 01.707 0l.776.776.776-.776a.5.5 0 01.707 0l.776.776.776-.776z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-foreground">Android</div>
                <div className="text-sm text-muted-foreground">
                  {productData.compatibility.android}
                </div>
              </div>
            </a>

            {/* iOS */}
            <a
              href="https://apps.apple.com/us/app/find-my-iphone/id376101648"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-xl bg-accent hover:bg-accent/80 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-foreground">iOS</div>
                <div className="text-sm text-muted-foreground">
                  {productData.compatibility.ios}
                </div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
