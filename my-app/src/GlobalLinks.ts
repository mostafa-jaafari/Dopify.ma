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
    AlertCircle
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
    { label: "Profile", icon: User , href: '/profil'},
    { label: "Settings", icon: Settings , href: '/settings'},
    { label: "Policy & Privacy", icon: Lock , href: '/policy&privacy'},
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
    href: "/seller",
  },
  {
    label: "my template",
    icon: FileText,
    href: "mytemplate",
  },
  {
    label: "products",
    icon: ShoppingCart,
    href: "products",
  },
  {
    label: "orders",
    icon: Package,
    href: "orders",
  },
  {
    label: "withdrawals",
    icon: DollarSign,
    href: "withdrawals",
  },
  {
    label: "media library",
    icon: Image,
    href: "medialibrary",
  },
  {
    label: "transactions",
    icon: Receipt,
    href: "transactions",
  },
  {
    label: "branding",
    icon: PaintBucket,
    href: "branding",
  },
  {
    label: "my returns",
    icon: RotateCw,
    href: "myreturns",
  },
  {
    label: "my stores",
    icon: Store,
    href: "",
  },
];

export const QuickSetupGuide_Links = [
    {
        title: 'Create Account',
        description: 'Start by creating your account to get access to the dashboard and begin the setup process.',
        finishprocess: true,
    },{
        title: 'Set Up Profile',
        description: 'Complete your profile with personal and business details to customize your experience.',
        finishprocess: false,
    },{
        title: 'Connect Payment Method',
        description: 'Link a payment method to ensure smooth transactions for your services.',
        finishprocess: true,
    },{
        title: 'Configure Settings',
        description: 'Adjust the settings according to your preferences and requirements for the platform.',
        finishprocess: false,
    },
];

export const StatusCard_Links = [
    {
        title: 'Pending Orders',
        icon: Clock,
        number: '34',
        styles: 'text-yellow-800',
    },{
        title: 'Completed Orders',
        icon: CheckCircle,
        number: '120',
        styles: 'text-green-800',
    },{
        title: 'Cancelled Orders',
        icon: XCircle,
        number: '5',
        styles: 'text-red-800',
    },{
        title: 'In Progress',
        icon: Loader,
        number: '8',
        styles: 'text-blue-800',
    },{
        title: 'New Users',
        icon: UserPlus,
        number: '15',
        styles: 'text-teal-800',
    },{
        title: 'Messages Received',
        icon: MessageCircle,
        number: '50',
        styles: 'text-purple-800',
    },{
        title: 'Total Earnings',
        icon: DollarSign,
        number: '$2,340',
        styles: 'text-indigo-800',
    },{
        title: 'Unresolved Issues',
        icon: AlertCircle,
        number: '3',
        styles: 'text-orange-800',
    },
];

