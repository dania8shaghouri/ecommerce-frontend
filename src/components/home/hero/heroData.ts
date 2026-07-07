import ProductImage from "../../../assets/heroimg/prdct.png";

export interface HeroSlideType {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export const heroSlides: HeroSlideType[] = [
  {
    id: "1",
    title: "ASUS ROG STRIX G16",
    subtitle: "RTX 4060 • Intel Core i7",
    image: ProductImage,
  },
  {
    id: "2",
    title: "MSI Katana 15",
    subtitle: "RTX 4050 • Intel Core i5",
    image: ProductImage,
  },
];
