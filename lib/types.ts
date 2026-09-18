export interface Artist {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  bio: string;
  avatar: string;
  stars: number;
  reviewCount: number;
  instagram: string;
  teachesClasses: boolean;
  specialty: string;
}

export interface Work {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface Review {
  id: string;
  buyerName: string;
  artistId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface EventItem {
  id: string;
  city: string;
  cafe: string;
  date: string;
  invitedArtists: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  paintingCrop: "starry-night" | "the-scream" | "girl-pearl" | "mona-lisa";
}

export interface CartItem {
  work: Work;
  quantity: number;
}
