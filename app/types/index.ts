export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "burgers" | "sides" | "drinks" | "desserts" | "combos";
  image: string;
  tags: string[];
  calories: number;
  prepTime: string;
  isSignature?: boolean;
  ingredients?: string[];
  customization?: CustomizationOption[];
}

export interface CustomizationOption {
  name: string;
  options: { label: string; price: number }[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  coordinates: { lat: number; lng: number };
}

export interface NavLink {
  label: string;
  href: string;
}
