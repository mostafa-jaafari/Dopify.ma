import { 
    User, 
    Settings, 
    Lock,
    LayoutDashboard,
    FileText,
    ShoppingCart,
    Package,
    DollarSign,
    Image,
    Receipt,
    PaintBucket,
    RotateCw,
    Store,
    Clock, 
    CheckCircle, 
    XCircle, 
    Loader, 
    UserPlus, 
    MessageCircle, 
    AlertCircle,
    Paintbrush
} from "lucide-react";
export const Navigation_Header_Links = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Jackets", path: "/jackets" },
    { label: "T-Shirts", path: "/t-shirts" },
    { label: "Accessories", path: "/accessories" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Blog", path: "/blog" },
];

export const User_Links = [
    { label: "Dashboard", icon: LayoutDashboard , href: '/seller'},
    { label: "Profile", icon: User , href: '/seller/profile'},
    { label: "Settings", icon: Settings , href: '/settings'},
    { label: "Policy & Privacy", icon: Lock , href: '/policy&privacy'},
    { label: "Photopea Editor", icon: Paintbrush , href: '/photopeaeditor'},
];

export const Animated_Hero_Cards = [
    {
        image: 'https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Custom Mug',
        price: '$12.99',
        style: 'animation-all duration-300 h-40',
    },{
        image: 'https://images.pexels.com/photos/6347892/pexels-photo-6347892.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Premium Hoodies',
        price: '$39.99',
        style: 'animation-all duration-400 h-60',
    },{
        image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Custom T-Shirt',
        price: '$19.99',
        style: 'animation-all delay-800 duration-1000 h-80',
    },
];

export const Users_Images = ['https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&w=600'];


export const PROCESS_CARDS = [
    {
        image: 'https://img.freepik.com/free-vector/concept-image-upload-landing-page_23-2148303744.jpg?uid=R88527568&ga=GA1.1.583811575.1736417405&semt=ais_hybrid',
        title: 'Create & Upload',
        description: 'Design your artwork and upload it effortlessly.',
    },
    {
        image: 'https://img.freepik.com/free-vector/printer-concept-illustration_114360-2587.jpg?uid=R88527568&ga=GA1.1.583811575.1736417405&semt=ais_hybrid',
        title: 'Print & Craft',
        description: 'High-quality printing on premium merchandise.',
    },
    {
        image: 'https://img.freepik.com/free-vector/delivery-concept-illustration_114360-88.jpg?uid=R88527568&ga=GA1.1.583811575.1736417405&semt=ais_hybrid',
        title: 'Ship & Enjoy',
        description: 'Fast, reliable delivery straight to your customers.',
    },
];


export const Why_You_Choose_Us = [
    {
        summary: 'Easy Setup',
        paragraph: 'Start selling your merch in minutes with a hassle-free setup.',
    },
    {
        summary: 'High-Quality Printing',
        paragraph: 'We use premium materials and advanced printing techniques.',
    },
    {
        summary: 'No Upfront Costs',
        paragraph: 'Only pay when you sell—no inventory or investment required.',
    },
    {
        summary: 'Fast & Global Shipping',
        paragraph: 'Your products are shipped quickly worldwide with reliable delivery.',
    },
];

export const Product_Card_Details = [
    {
        image: 'https://images.pexels.com/photos/1129019/pexels-photo-1129019.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'T-shirt',
        categorie: ['t-shirt', 'tshirt', 'T-Shirt','t-shirt', 'tshirt', 'T-Shirt'],
    },{
        image: 'https://images.pexels.com/photos/2932731/pexels-photo-2932731.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Hoodie',
        categorie: ['hoodie'],
    },{
        image: 'https://images.pexels.com/photos/3353466/pexels-photo-3353466.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Hoodie',
        categorie: ['hoodie'],
    },{
        image: 'https://images.pexels.com/photos/1793040/pexels-photo-1793040.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Mug',
        categorie: ['mug'],
    },{
        image: 'https://images.pexels.com/photos/9714446/pexels-photo-9714446.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Mesh Cup',
        categorie: ['hat'],
    },{
        image: 'https://images.pexels.com/photos/8014835/pexels-photo-8014835.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Mesh Cup',
        categorie: ['hat'],
    },
];

export const Users_Reviews = [
    {
        name: "Sarah Johnson",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        rating: 4.9,
        description: "Absolutely incredible product! It exceeded all my expectations and solved my daily challenges effortlessly. I can't imagine my life without it now.",
        date: "March 15, 2024"
    },
    {
        name: "Michael Rodriguez",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        rating: 4,
        description: "Great value for money. The quality is top-notch, and customer service was responsive and helpful. Would definitely recommend to anyone looking for a reliable solution.",
        date: "February 22, 2024"
    },
    {
        name: "Emily Chen",
        image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
        rating: 5,
        description: "A game-changer in my daily routine. The design is sleek, functionality is impressive, and it has made my life so much easier. Absolutely love it!",
        date: "January 10, 2024"
    },
    {
        name: "David Thompson",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
        rating: 4,
        description: "Solid product with great performance. Minor improvements could be made, but overall, it's a reliable and efficient solution that I'm happy with.",
        date: "March 5, 2024"
    },
    {
        name: "Olivia Martinez",
        image: "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
        rating: 5,
        description: "Exceptional quality and attention to detail. This product has transformed my workflow and exceeded all my expectations. Truly outstanding!",
        date: "February 14, 2024"
    },
    {
        name: "Alex Kim",
        image: "https://images.pexels.com/photos/988869/pexels-photo-988869.jpeg",
        rating: 3,
        description: "Impressive functionality and user-friendly design. It's clear a lot of thought went into creating this product. Highly recommended for anyone in need.",
        date: "January 30, 2024"
    }
];

export const SideBar_Links = [
  {
    label: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "my templates",
    icon: FileText,
  },
  {
    label: "products",
    icon: ShoppingCart,
  },
  {
    label: "photopea editor",
    icon: Paintbrush,
  },
//   {
//     label: "orders",
//     icon: Package,
//   },
//   {
//     label: "withdrawals",
//     icon: DollarSign,
//   },
  {
    label: "media library",
    icon: Image,
  },
//   {
//     label: "transactions",
//     icon: Receipt,
//   },
//   {
//     label: "branding",
//     icon: PaintBucket,
//   },
//   {
//     label: "my returns",
//     icon: RotateCw,
//   },
//   {
//     label: "my stores",
//     icon: Store,
//   },
  {
    label: "profile",
    icon: User,
  },
];

export const QuickSetupGuide_Links = [
    {
        title: 'Create Account',
        description: 'Start by creating your account to get access to the dashboard and begin the setup process.',
        finishprocess: true,
        href: '/seller',
    },{
        title: 'Set Up Profile',
        description: 'Complete your profile with personal and business details to customize your experience.',
        finishprocess: false,
        href: '/seller/profile',
    },{
        title: 'Connect Payment Method',
        description: 'Link a payment method to ensure smooth transactions for your services.',
        finishprocess: false,
        href: '/seller/payment',
    },{
        title: 'Active You Store',
        description: 'Adjust the settings according to your preferences and requirements for the platform.',
        finishprocess: false,
        href: '/seller/store',
    },
];

export const StatusCard_Links = [
    {
        title: 'Pending Orders',
        icon: Clock,
        number: '34',
        styles: 'text-yellow-400 glow-yellow',
    },{
        title: 'Completed Orders',
        icon: CheckCircle,
        number: '120',
        styles: 'text-green-400 glow-green',
    },{
        title: 'Cancelled Orders',
        icon: XCircle,
        number: '5',
        styles: 'text-red-400 glow-red',
    },{
        title: 'In Progress',
        icon: Loader,
        number: '8',
        styles: 'text-blue-400 glow-blue',
    },{
        title: 'New Users',
        icon: UserPlus,
        number: '15',
        styles: 'text-teal-400 glow-teal',
    },{
        title: 'Messages Received',
        icon: MessageCircle,
        number: '50',
        styles: 'text-purple-400 glow-purple',
    },{
        title: 'Total Earnings',
        icon: DollarSign,
        number: '$2,340',
        styles: 'text-indigo-400 glow-indigo',
    },{
        title: 'Unresolved Issues',
        icon: AlertCircle,
        number: '3',
        styles: 'text-orange-400 glow-orange',
    },
];

export const Test_Products = [
    {
        id: 1,
        name: "Vintage Aesthetic T-Shirt",
        description: "A stylish and comfortable vintage-themed T-shirt with high-quality print.",
        price: 19.99,
        image: "https://images.pexels.com/photos/3776694/pexels-photo-3776694.jpeg",
        category: "T-Shirts",
    },
    {
        id: 2,
        name: "Custom Artwork Hoodie",
        description: "A premium hoodie featuring unique custom artwork, perfect for all seasons.",
        price: 39.99,
        image: "https://images.pexels.com/photos/9558692/pexels-photo-9558692.jpeg",
        category: "Hoodies",
    },
    {
        id: 3,
        name: "Minimalist Tote Bag",
        description: "A sleek and stylish tote bag with a minimalist design, great for daily use.",
        price: 24.99,
        image: "https://images.pexels.com/photos/1104162/pexels-photo-1104162.jpeg",
        category: "Accessories",
    },
    {
        id: 4,
        name: "Motivational Quote Mug",
        description: "A ceramic mug featuring an inspiring quote to start your day with motivation.",
        price: 14.99,
        image: "https://images.pexels.com/photos/1787433/pexels-photo-1787433.jpeg",
        category: "Mugs",
    },
    {
        id: 5,
        name: "Abstract Art Poster",
        description: "A high-quality art print featuring abstract design, perfect for home decor.",
        price: 29.99,
        image: "https://images.pexels.com/photos/1907783/pexels-photo-1907783.jpeg",
        category: "Wall Art",
    },
    {
        id: 6,
        name: "Trendy Phone Case",
        description: "A durable and stylish phone case with an eye-catching design.",
        price: 19.99,
        image: "https://images.pexels.com/photos/5935742/pexels-photo-5935742.jpeg",
        category: "Phone Cases",
    }
];
