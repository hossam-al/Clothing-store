export const mockProducts = [
  {
    id: 1,
    name: "Oversized Asphalt Hoodie",
    category: "Hoodies",
    price: 84,
    oldPrice: 120,
    discount: "30% OFF",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Cargo Utility Pants",
    category: "Pants",
    price: 92,
    oldPrice: 118,
    discount: "22% OFF",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Chunky Runner Sneakers",
    category: "Sneakers",
    price: 135,
    oldPrice: 180,
    discount: "25% OFF",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Graphic Drop T-Shirt",
    category: "T-Shirts",
    price: 42,
    oldPrice: 60,
    discount: "30% OFF",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Black Varsity Jacket",
    category: "Jackets",
    price: 148,
    oldPrice: null,
    discount: null,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Crossbody Tech Bag",
    category: "Accessories",
    price: 58,
    oldPrice: null,
    discount: null,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Wide Leg Denim",
    category: "Women",
    price: 96,
    oldPrice: null,
    discount: null,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Minimal Street Cap",
    category: "Accessories",
    price: 34,
    oldPrice: null,
    discount: null,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    name: "Retro Track Jacket",
    category: "Jackets",
    price: 112,
    oldPrice: 150,
    discount: "25% OFF",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    name: "Washed Denim Shirt",
    category: "Men",
    price: 74,
    oldPrice: 96,
    discount: "23% OFF",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    name: "Canvas Tote Bag",
    category: "Bags",
    price: 39,
    oldPrice: 54,
    discount: "28% OFF",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 12,
    name: "Court Low Sneakers",
    category: "Sneakers",
    price: 118,
    oldPrice: 145,
    discount: "19% OFF",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 13,
    name: "Relaxed Cargo Shorts",
    category: "Pants",
    price: 68,
    oldPrice: null,
    discount: null,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 14,
    name: "Ribbed Tank Top",
    category: "Women",
    price: 36,
    oldPrice: null,
    discount: null,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 15,
    name: "Monochrome Windbreaker",
    category: "Jackets",
    price: 128,
    oldPrice: null,
    discount: null,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 16,
    name: "Everyday Crew Socks",
    category: "Accessories",
    price: 18,
    oldPrice: null,
    discount: null,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=900&q=80",
  },
];

export const latestOffers = mockProducts.filter((product) => product.discount);
export const mostRequested = mockProducts.filter((product) => product.rating >= 4.6);
