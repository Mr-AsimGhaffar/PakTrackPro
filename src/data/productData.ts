// Pak Track Pro Product Data
export type ProductSpecification = {
  label: string;
  value: string;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  specifications: ProductSpecification[];
};

export const SHIPPING_COST_PKR = 300;

export const productData = {
  company: {
    name: "Pak Track Pro",
    tagline: "Keep Tracking",
    description: "Pioneer of SIM-free GPS Satellite Tracking in Pakistan",
    whatsapp: "+923340037888",
    whatsappLink: "https://wa.me/923340037888",
  },

  product: {
    name: "Satellite GPS Tracker",
    headline: "SIM-Free Satellite GPS Tracker",
    subheadline: "Smart Security for Smart Vehicles",
    description:
      "Experience the next generation of vehicle tracking with our revolutionary SIM-free GPS satellite tracker. No monthly bills, no network dependency – just reliable, accurate tracking anywhere in the world.",
    shortDescription:
      "Wireless, discreet asset tracker with live visibility and theft protection through a smart mobile interface.",
  },

  features: [
    {
      icon: "SimOff",
      title: "No SIM – No Monthly Bill",
      description:
        "Forget about recurring fees. Our tracker works without any SIM card, saving you money every month.",
    },
    {
      icon: "Satellite",
      title: "Satellite Connectivity",
      description:
        "Global coverage through direct satellite connection. Works everywhere, even in remote areas.",
    },
    {
      icon: "Shield",
      title: "Theft Protection",
      description:
        "Advanced security features to protect your valuable assets. Get instant alerts for unauthorized movement.",
    },
    {
      icon: "MapPin",
      title: "Accurate Live Location",
      description:
        "Real-time tracking with pinpoint accuracy. Know exactly where your vehicle is at any moment.",
    },
    {
      icon: "Battery",
      title: "Long Battery Life",
      description:
        "Extended battery performance designed for long-term tracking without frequent recharging.",
    },
    {
      icon: "Globe",
      title: "Works in No-Network Areas",
      description:
        "Unlike traditional trackers, ours works even where there's no mobile network coverage.",
    },
  ],

  howItWorks: [
    {
      step: 1,
      icon: "Satellite",
      title: "Satellite Connection",
      description: "Connects directly with GPS satellites for positioning",
    },
    {
      step: 2,
      icon: "Radio",
      title: "No Network Required",
      description: "Operates independently of mobile networks",
    },
    {
      step: 3,
      icon: "MapPin",
      title: "Precise Tracking",
      description: "Calculates and transmits exact vehicle location",
    },
    {
      step: 4,
      icon: "Smartphone",
      title: "Mobile App Access",
      description: "View location on your phone or web dashboard",
    },
    {
      step: 5,
      icon: "BatteryFull",
      title: "Efficient Power",
      description: "Low power consumption for extended operation",
    },
    {
      step: 6,
      icon: "Earth",
      title: "Global Coverage",
      description: "Works across Pakistan and internationally",
    },
  ],

  useCases: [
    {
      icon: "Car",
      title: "Personal Cars",
      description: "Protect your family vehicle with discreet tracking",
    },
    {
      icon: "Truck",
      title: "Fleet Management",
      description: "Monitor your entire fleet in real-time",
    },
    {
      icon: "Package",
      title: "Logistics",
      description: "Track shipments and delivery vehicles",
    },
    {
      icon: "Building",
      title: "Financed Vehicles",
      description: "Secure assets for banks and finance companies",
    },
    {
      icon: "Key",
      title: "Rental Vehicles",
      description: "Keep track of your rental fleet easily",
    },
    {
      icon: "Gem",
      title: "High-Value Assets",
      description: "Protect luxury and high-value vehicles",
    },
  ],

  videos: [
    {
      id: 1,
      title: "Product Introduction",
      description:
        "Learn about Pak Track Pro's revolutionary satellite tracking technology",
      thumbnail: "/thumbnail1.png",
      videoUrl: "/videos/add1.mp4",
    },
  ],

  compatibility: {
    android: "Google Find Hub",
    ios: "Apple Find My",
  },

  stats: [
    { value: "10K+", label: "Active Trackers" },
    { value: "99.9%", label: "Uptime" },
    { value: "0", label: "Monthly Fees" },
    { value: "24/7", label: "Support" },
  ],

  products: [
    {
      id: "ptp-core",
      slug: "satellite-gps-tracker-core",
      name: "Pak Track Pro Core",
      description:
        "Compact SIM-free GPS tracker for personal vehicles with live location, theft alerts, and all-Pakistan coverage.",
      price: 8000,
      image: "/pak-track.jpg",
      specifications: [
        { label: "Connectivity", value: "Satellite (SIM-Free)" },
        { label: "Live Tracking", value: "Yes" },
        { label: "Battery", value: "Up to 30 days standby" },
        { label: "Ideal For", value: "Personal Cars" },
      ],
    },
  ] satisfies CatalogProduct[],
};

export type ProductData = typeof productData;

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);

export const getAllProducts = () => productData.products;

export const getProductBySlug = (slug: string) =>
  productData.products.find((product) => product.slug === slug);
