import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ArrowLeft,
  Sparkles,
  Heart,
  Star,
  Clock,
  Users,
  Flame,
  Leaf,
  Search,
  Filter,
  ShoppingCart,
  Truck,
  MapPin,
  Phone,
  Timer,
  DollarSign,
  ChefHat,
  Award,
  Zap,
  Plus,
  Minus
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  preparationTime: string;
  calories?: number;
  isVeg: boolean;
  isSpicy: boolean;
  isSignature: boolean;
  isPopular: boolean;
  isFavorite: boolean;
  tags: string[];
  ingredients: string[];
  allergens: string[];
  nutritionInfo?: {
    protein: string;
    carbs: string;
    fat: string;
  };
  availability: 'available' | 'soldOut' | 'limited';
}

interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

const menuData: MenuItem[] = [
  {
    id: '1',
    name: 'Butterfly Special Pasta',
    description: 'Fresh handmade pasta tossed with truffle oil, wild mushrooms, and aged parmesan. Finished with microgreens and a touch of black pepper.',
    price: 24,
    originalPrice: 28,
    category: 'Main Course',
    image: '🍝',
    rating: 4.8,
    reviewCount: 234,
    preparationTime: '15-20 min',
    calories: 450,
    isVeg: true,
    isSpicy: false,
    isSignature: true,
    isPopular: true,
    isFavorite: false,
    tags: ['Chef\'s Special', 'Handmade', 'Organic'],
    ingredients: ['Fresh Pasta', 'Truffle Oil', 'Wild Mushrooms', 'Parmesan', 'Microgreens'],
    allergens: ['Gluten', 'Dairy'],
    nutritionInfo: {
      protein: '18g',
      carbs: '45g',
      fat: '12g'
    },
    availability: 'available'
  },
  {
    id: '2',
    name: 'Golden Sunset Salmon',
    description: 'Pan-seared Atlantic salmon with citrus glaze, served with roasted vegetables and quinoa pilaf. A healthy and delicious choice.',
    price: 32,
    category: 'Seafood',
    image: '🐟',
    rating: 4.9,
    reviewCount: 189,
    preparationTime: '18-25 min',
    calories: 380,
    isVeg: false,
    isSpicy: false,
    isSignature: true,
    isPopular: true,
    isFavorite: false,
    tags: ['Heart Healthy', 'High Protein', 'Omega-3'],
    ingredients: ['Atlantic Salmon', 'Citrus Glaze', 'Quinoa', 'Seasonal Vegetables'],
    allergens: ['Fish'],
    nutritionInfo: {
      protein: '35g',
      carbs: '22g',
      fat: '15g'
    },
    availability: 'available'
  },
  {
    id: '3',
    name: 'Garden Symphony Salad',
    description: 'Fresh mixed greens with seasonal fruits, candied nuts, goat cheese, and our signature honey vinaigrette.',
    price: 18,
    category: 'Appetizer',
    image: '🥗',
    rating: 4.6,
    reviewCount: 156,
    preparationTime: '10-12 min',
    calories: 220,
    isVeg: true,
    isSpicy: false,
    isSignature: false,
    isPopular: false,
    isFavorite: false,
    tags: ['Fresh', 'Seasonal', 'Light'],
    ingredients: ['Mixed Greens', 'Seasonal Fruits', 'Goat Cheese', 'Candied Nuts'],
    allergens: ['Dairy', 'Nuts'],
    nutritionInfo: {
      protein: '8g',
      carbs: '15g',
      fat: '12g'
    },
    availability: 'available'
  },
  {
    id: '4',
    name: 'Spiced Lamb Tagine',
    description: 'Slow-cooked Moroccan lamb with apricots, almonds, and aromatic spices. Served with fluffy couscous and fresh herbs.',
    price: 36,
    category: 'Main Course',
    image: '🍖',
    rating: 4.7,
    reviewCount: 98,
    preparationTime: '25-30 min',
    calories: 520,
    isVeg: false,
    isSpicy: true,
    isSignature: true,
    isPopular: false,
    isFavorite: false,
    tags: ['Moroccan', 'Slow Cooked', 'Aromatic'],
    ingredients: ['Lamb', 'Apricots', 'Almonds', 'Couscous', 'Moroccan Spices'],
    allergens: ['Nuts'],
    nutritionInfo: {
      protein: '42g',
      carbs: '35g',
      fat: '18g'
    },
    availability: 'limited'
  },
  {
    id: '5',
    name: 'Chocolate Butterfly Soufflé',
    description: 'Decadent dark chocolate soufflé with molten center, served with vanilla bean ice cream and berry coulis.',
    price: 14,
    category: 'Dessert',
    image: '🍫',
    rating: 4.9,
    reviewCount: 312,
    preparationTime: '20-25 min',
    calories: 340,
    isVeg: true,
    isSpicy: false,
    isSignature: true,
    isPopular: true,
    isFavorite: false,
    tags: ['Signature Dessert', 'Made to Order', 'Instagram Famous'],
    ingredients: ['Dark Chocolate', 'Vanilla Ice Cream', 'Fresh Berries', 'Eggs'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    nutritionInfo: {
      protein: '6g',
      carbs: '28g',
      fat: '16g'
    },
    availability: 'available'
  },
  {
    id: '6',
    name: 'Artisan Pizza Margherita',
    description: 'Wood-fired pizza with San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil on crispy thin crust.',
    price: 22,
    category: 'Main Course',
    image: '🍕',
    rating: 4.5,
    reviewCount: 267,
    preparationTime: '12-15 min',
    calories: 380,
    isVeg: true,
    isSpicy: false,
    isSignature: false,
    isPopular: true,
    isFavorite: false,
    tags: ['Wood Fired', 'Traditional', 'Crispy'],
    ingredients: ['Pizza Dough', 'San Marzano Tomatoes', 'Fresh Mozzarella', 'Basil'],
    allergens: ['Gluten', 'Dairy'],
    nutritionInfo: {
      protein: '15g',
      carbs: '42g',
      fat: '14g'
    },
    availability: 'available'
  }
];

const deliveryZones = [
  { area: 'Downtown', time: '25-35 min', fee: 3.99 },
  { area: 'Midtown', time: '30-40 min', fee: 4.99 },
  { area: 'Uptown', time: '35-45 min', fee: 5.99 },
  { area: 'Suburbs', time: '40-50 min', fee: 6.99 }
];

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menuData);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<'dine-in' | 'delivery' | 'pickup'>('dine-in');

  const categories = ['All', 'Appetizer', 'Main Course', 'Seafood', 'Dessert', 'Beverage'];

  useEffect(() => {
    filterAndSortItems();
  }, [selectedCategory, searchQuery, sortBy, menuItems]);

  const filterAndSortItems = () => {
    let filtered = menuItems;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort items
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'prep-time':
        filtered.sort((a, b) => parseInt(a.preparationTime) - parseInt(b.preparationTime));
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  };

  const toggleFavorite = (itemId: string) => {
    setMenuItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const addToCart = (item: MenuItem, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.item.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...currentCart, { item, quantity }];
      }
    });
  };

  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.item.id !== itemId));
    } else {
      setCart(cart.map(item =>
        item.item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm via-background to-warm">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-gold/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-gold rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                  Butterfly Menu
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              {/* Delivery Mode Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setDeliveryMode('dine-in')}
                  className={`px-3 py-2 text-sm ${deliveryMode === 'dine-in' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                >
                  Dine In
                </button>
                <button
                  onClick={() => setDeliveryMode('delivery')}
                  className={`px-3 py-2 text-sm ${deliveryMode === 'delivery' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                >
                  <Truck className="w-4 h-4 mr-1 inline" />
                  Delivery
                </button>
                <button
                  onClick={() => setDeliveryMode('pickup')}
                  className={`px-3 py-2 text-sm ${deliveryMode === 'pickup' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                >
                  Pickup
                </button>
              </div>
              {/* Cart */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="relative">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                    {getCartItemCount() > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                        {getCartItemCount()}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Your Order</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
                    ) : (
                      <>
                        {cart.map((cartItem) => (
                          <div key={cartItem.item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">{cartItem.item.name}</h4>
                              <p className="text-sm text-muted-foreground">${cartItem.item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartQuantity(cartItem.item.id, cartItem.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">{cartItem.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartQuantity(cartItem.item.id, cartItem.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                          </div>
                          <Link to="/booking" className="w-full mt-4 block">
                            <Button className="w-full bg-gradient-to-r from-primary to-gold">
                              Proceed to Checkout
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-primary/5 to-gold/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
              Our Exquisite Menu
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover flavors that dance on your palate, crafted with passion and the finest ingredients
            </p>
            
            {/* Restaurant Info */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-gold" />
                <span>Michelin Recommended</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span>4.8 Rating (1,234 reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Open Daily 5:00 PM - 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      {deliveryMode === 'delivery' && (
        <section className="py-6 bg-blue-50 border-b">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-2">🚚 Home Delivery Available</h3>
              <p className="text-sm text-muted-foreground">Minimum order $25 • Free delivery on orders above $50</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {deliveryZones.map((zone, index) => (
                <div key={index} className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="font-medium text-sm">{zone.area}</div>
                  <div className="text-xs text-muted-foreground">{zone.time}</div>
                  <div className="text-xs font-medium text-primary">${zone.fee}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search dishes, ingredients, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="prep-time">Prep Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'All' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('All')}
                >
                  All Items
                </Button>
                {categories.slice(1).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Menu Categories Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Menu Items Grid */}
        <div className="grid gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gold/20 hover:border-gold/40">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Item Image */}
                  <div className="relative md:w-48 h-48 bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
                    <span className="text-6xl">{item.image}</span>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                      />
                    </button>
                    {item.availability === 'soldOut' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Sold Out</Badge>
                      </div>
                    )}
                    {item.availability === 'limited' && (
                      <Badge className="absolute top-3 left-3 bg-orange-500">Limited</Badge>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          {item.isVeg && <Leaf className="w-4 h-4 text-green-600" />}
                          {item.isSpicy && <Flame className="w-4 h-4 text-red-500" />}
                          {item.isSignature && <Award className="w-4 h-4 text-gold" />}
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-gold fill-gold" />
                            <span className="font-medium">{item.rating}</span>
                            <span className="text-sm text-muted-foreground">({item.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {item.preparationTime}
                          </div>
                          {item.calories && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Zap className="w-4 h-4" />
                              {item.calories} cal
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-primary">${item.price}</span>
                        </div>
                        {item.originalPrice && (
                          <Badge variant="destructive" className="text-xs">
                            Save ${item.originalPrice - item.price}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.isPopular && <Badge variant="secondary" className="text-xs">🔥 Popular</Badge>}
                      {item.isSignature && <Badge variant="secondary" className="text-xs">⭐ Signature</Badge>}
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                      </Dialog>

                      <div className="flex items-center gap-2">
                        {cart.find(cartItem => cartItem.item.id === item.id) ? (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const cartItem = cart.find(c => c.item.id === item.id);
                                if (cartItem) updateCartQuantity(item.id, cartItem.quantity - 1);
                              }}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">
                              {cart.find(cartItem => cartItem.item.id === item.id)?.quantity || 0}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const cartItem = cart.find(c => c.item.id === item.id);
                                if (cartItem) updateCartQuantity(item.id, cartItem.quantity + 1);
                              }}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() => addToCart(item)}
                            disabled={item.availability === 'soldOut'}
                            className="bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Item Detail Modal */}
        {selectedItem && (
          <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedItem.name}
                  {selectedItem.isVeg && <Leaf className="w-5 h-5 text-green-600" />}
                  {selectedItem.isSpicy && <Flame className="w-5 h-5 text-red-500" />}
                  {selectedItem.isSignature && <Award className="w-5 h-5 text-gold" />}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Main Info */}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-gold/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl">{selectedItem.image}</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-gold fill-gold" />
                      <span className="font-bold">{selectedItem.rating}</span>
                      <span className="text-muted-foreground">({selectedItem.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground">{selectedItem.description}</p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-warm/30 rounded-lg">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-medium">{selectedItem.preparationTime}</div>
                    <div className="text-xs text-muted-foreground">Prep Time</div>
                  </div>
                  {selectedItem.calories && (
                    <div className="p-3 bg-warm/30 rounded-lg">
                      <Zap className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="text-sm font-medium">{selectedItem.calories}</div>
                      <div className="text-xs text-muted-foreground">Calories</div>
                    </div>
                  )}
                  <div className="p-3 bg-warm/30 rounded-lg">
                    <DollarSign className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-medium">${selectedItem.price}</div>
                    <div className="text-xs text-muted-foreground">Price</div>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <ChefHat className="w-3 h-3 mr-1" />
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Nutrition Info */}
                {selectedItem.nutritionInfo && (
                  <div>
                    <h4 className="font-semibold mb-2">Nutrition Information</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-medium text-green-700">Protein</div>
                        <div>{selectedItem.nutritionInfo.protein}</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-medium text-blue-700">Carbs</div>
                        <div>{selectedItem.nutritionInfo.carbs}</div>
                      </div>
                      <div className="text-center p-2 bg-orange-50 rounded">
                        <div className="font-medium text-orange-700">Fat</div>
                        <div>{selectedItem.nutritionInfo.fat}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Allergens */}
                {selectedItem.allergens.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">⚠️ Allergen Information</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.allergens.map((allergen, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-2xl font-bold text-primary">${selectedItem.price}</div>
                  <Button
                    onClick={() => {
                      addToCart(selectedItem);
                      setSelectedItem(null);
                    }}
                    disabled={selectedItem.availability === 'soldOut'}
                    className="bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Experience Butterfly?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Book your table or order for delivery and let us take you on a culinary journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/booking">
              <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90">
                <Users className="w-5 h-5 mr-2" />
                Reserve a Table
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10">
              <Phone className="w-5 h-5 mr-2" />
              Call: 7992240355
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
