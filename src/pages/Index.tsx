import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCatalogSection from "@/components/ProductCatalogSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import UseCasesSection from "@/components/UseCasesSection";
import VideosSection from "@/components/VideosSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProductCatalogSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UseCasesSection />
        <VideosSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default Index;
