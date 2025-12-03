import mongoose from 'mongoose';
const { connect, Schema, models, model } = mongoose;

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-bite';

const menuItems = [
  {
    name: 'Masala Dosa',
    category: 'Breakfast',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1589301760576-415c6d98d96d?auto=format&fit=crop&q=80',
    description:
      'Crispy rice crepe filled with spiced potato masala, served with chutney and sambar.',
    isAvailable: true,
  },
  {
    name: 'Idli Sambar',
    category: 'Breakfast',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1589301760576-415c6d98d96d?auto=format&fit=crop&q=80',
    description:
      'Steamed rice cakes served with lentil soup and coconut chutney.',
    isAvailable: true,
  },
  {
    name: 'Vada Pav',
    category: 'Snacks',
    price: 20,
    image:
      'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80',
    description: 'Spiced potato fritter served in a soft bun with chutneys.',
    isAvailable: true,
  },
  {
    name: 'Veg Sandwich',
    category: 'Snacks',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&q=80',
    description:
      'Fresh vegetables and chutney layered between slices of bread.',
    isAvailable: true,
  },
  {
    name: 'Grilled Cheese Sandwich',
    category: 'Snacks',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80',
    description: 'Toasted bread filled with melting cheese and herbs.',
    isAvailable: true,
  },
  {
    name: 'Veg Noodles',
    category: 'Lunch',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80',
    description: 'Stir-fried noodles with mixed vegetables and soy sauce.',
    isAvailable: true,
  },
  {
    name: 'Fried Rice',
    category: 'Lunch',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1603133872878-684f208fb74b?auto=format&fit=crop&q=80',
    description: 'Wok-tossed rice with vegetables and chinese seasonings.',
    isAvailable: true,
  },
  {
    name: 'Veg Biryani',
    category: 'Lunch',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80',
    description:
      'Aromatic basmati rice cooked with mixed vegetables and traditional spices.',
    isAvailable: true,
  },
  {
    name: 'Paneer Butter Masala',
    category: 'Lunch',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80',
    description:
      'Cottage cheese cubes simmered in a rich and creamy tomato gravy.',
    isAvailable: true,
  },
  {
    name: 'Roti / Chapati',
    category: 'Lunch',
    price: 10,
    image:
      'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80',
    description: 'Whole wheat flatbread, perfect with curry.',
    isAvailable: true,
  },
  {
    name: 'Samosa',
    category: 'Snacks',
    price: 15,
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80',
    description: 'Crispy pastry filled with spiced potatoes and peas.',
    isAvailable: true,
  },
  {
    name: 'Cold Coffee',
    category: 'Drinks',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80',
    description:
      'Chilled coffee blended with milk and sugar, topped with chocolate powder.',
    isAvailable: true,
  },
  {
    name: 'Masala Chai',
    category: 'Drinks',
    price: 15,
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80',
    description: 'Traditional Indian spiced tea.',
    isAvailable: true,
  },
  {
    name: 'Mango Lassi',
    category: 'Drinks',
    price: 50,
    image:
      'https://images.unsplash.com/photo-1626139576127-450a3bfa556e?auto=format&fit=crop&q=80',
    description: 'Refreshing yogurt-based drink with sweet mango pulp.',
    isAvailable: true,
  },
  {
    name: 'Fresh Lime Soda',
    category: 'Drinks',
    price: 30,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80',
    description: 'Refreshing lime juice with soda, sugar, and a pinch of salt.',
    isAvailable: true,
  },
  {
    name: 'Veg Burger',
    category: 'Snacks',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80',
    description:
      'Vegetable patty served in a bun with lettuce, tomato, and sauces.',
    isAvailable: true,
  },
  {
    name: 'Pav Bhaji',
    category: 'Snacks',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&q=80',
    description: 'Spicy vegetable mash served with buttered bread rolls.',
    isAvailable: true,
  },
];

async function seed() {
  try {
    await connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define Schema inline to avoid import issues
    const menuItemSchema = new Schema({
      name: String,
      category: String,
      price: Number,
      image: String,
      description: String,
      isAvailable: { type: Boolean, default: true },
    });

    const MenuItem = models.MenuItem || model('MenuItem', menuItemSchema);

    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    await MenuItem.insertMany(menuItems);
    console.log('Seeded menu items');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
