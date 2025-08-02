import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ArrowLeft,
  Sparkles,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Settings,
  Upload,
  Star,
  Phone,
  MessageSquare
} from 'lucide-react';
import { BookingData } from '@shared/booking';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

interface PromoContent {
  id: string;
  title: string;
  description: string;
  image?: string;
  active: boolean;
  type: 'banner' | 'special' | 'event';
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [promoContent, setPromoContent] = useState<PromoContent[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
    averageGuests: 0
  });

  // New menu item form
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    available: true
  });

  // New promo content form
  const [newPromo, setNewPromo] = useState({
    title: '',
    description: '',
    type: 'banner' as 'banner' | 'special' | 'event',
    active: true
  });

  useEffect(() => {
    fetchBookings();
    loadMenuItems();
    loadPromoContent();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
        calculateStats(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const calculateStats = (bookingsData: BookingData[]) => {
    const totalBookings = bookingsData.length;
    const pendingBookings = bookingsData.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookingsData.filter(b => b.status === 'confirmed').length;
    const totalRevenue = bookingsData
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const averageGuests = bookingsData.length > 0 
      ? bookingsData.reduce((sum, b) => sum + parseInt(b.guests), 0) / bookingsData.length 
      : 0;

    setStats({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalRevenue,
      averageGuests: Math.round(averageGuests)
    });
  };

  const updateBookingStatus = async (id: string, status: 'confirmed' | 'rejected') => {
    try {
      const response = await fetch('/api/bookings/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      
      if (response.ok) {
        fetchBookings(); // Refresh bookings
        alert(`Booking ${status} successfully!`);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const loadMenuItems = () => {
    // Mock data - in production, fetch from API
    setMenuItems([
      {
        id: '1',
        name: 'Butterfly Garden Special Pasta',
        description: 'Fresh handmade pasta with truffle oil and wild mushrooms',
        price: 24,
        category: 'Main Course',
        available: true
      },
      {
        id: '2',
        name: 'Golden Sunset Salmon',
        description: 'Pan-seared Atlantic salmon with citrus glaze',
        price: 32,
        category: 'Seafood',
        available: true
      },
      {
        id: '3',
        name: 'Garden Symphony Salad',
        description: 'Fresh mixed greens with seasonal fruits and nuts',
        price: 18,
        category: 'Appetizer',
        available: false
      }
    ]);
  };

  const loadPromoContent = () => {
    // Mock data - in production, fetch from API
    setPromoContent([
      {
        id: '1',
        title: 'Valentine\'s Special Menu',
        description: 'Romantic 5-course dinner for couples',
        type: 'special',
        active: true
      },
      {
        id: '2',
        title: 'Live Jazz Night',
        description: 'Every Friday evening with dinner',
        type: 'event',
        active: true
      }
    ]);
  };

  const addMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.price) return;
    
    const item: MenuItem = {
      id: Date.now().toString(),
      name: newMenuItem.name,
      description: newMenuItem.description,
      price: parseFloat(newMenuItem.price),
      category: newMenuItem.category,
      available: newMenuItem.available
    };
    
    setMenuItems([...menuItems, item]);
    setNewMenuItem({ name: '', description: '', price: '', category: '', available: true });
  };

  const addPromoContent = () => {
    if (!newPromo.title) return;
    
    const promo: PromoContent = {
      id: Date.now().toString(),
      title: newPromo.title,
      description: newPromo.description,
      type: newPromo.type,
      active: newPromo.active
    };
    
    setPromoContent([...promoContent, promo]);
    setNewPromo({ title: '', description: '', type: 'banner', active: true });
  };

  const toggleMenuItemAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const togglePromoActive = (id: string) => {
    setPromoContent(promoContent.map(promo => 
      promo.id === id ? { ...promo, active: !promo.active } : promo
    ));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const deletePromoContent = (id: string) => {
    setPromoContent(promoContent.filter(promo => promo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm via-background to-warm">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-gold rounded-full flex items-center justify-center shadow-md">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 text-xs">🦋</div>
                </div>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                  Butterfly Garden
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-primary text-primary">
                Administrator
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Menu</span>
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Promotions</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">All time bookings</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">{stats.pendingBookings}</div>
                  <p className="text-xs text-muted-foreground">Awaiting approval</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.confirmedBookings}</div>
                  <p className="text-xs text-muted-foreground">Active reservations</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalRevenue}</div>
                  <p className="text-xs text-muted-foreground">From decorations</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary/10 to-gold/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{booking.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.guests} guests • {booking.date} at {booking.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          booking.status === 'confirmed' ? 'default' : 
                          booking.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {booking.status}
                        </Badge>
                        {booking.status === 'pending' && (
                          <div className="space-x-1">
                            <Button size="sm" onClick={() => updateBookingStatus(booking.id!, 'confirmed')}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => updateBookingStatus(booking.id!, 'rejected')}>
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Management */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-mono text-sm">{booking.reference}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.name}</div>
                            <div className="text-sm text-muted-foreground">{booking.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {booking.contactMethod === 'whatsapp' ? 
                              <MessageSquare className="w-4 h-4" /> : 
                              <Phone className="w-4 h-4" />
                            }
                            <span className="text-sm">{booking.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{booking.date}</div>
                            <div className="text-sm text-muted-foreground">{booking.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={booking.type === 'party' ? 'border-purple-500 text-purple-700' : 'border-blue-500 text-blue-700'}>
                            {booking.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{booking.guests}</TableCell>
                        <TableCell>
                          <Badge variant={
                            booking.status === 'confirmed' ? 'default' : 
                            booking.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Booking Details - {booking.reference}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="font-semibold">Guest Information</Label>
                                      <div className="mt-1">
                                        <div>{booking.name}</div>
                                        <div className="text-sm text-muted-foreground">{booking.email}</div>
                                        <div className="text-sm text-muted-foreground">{booking.phone}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="font-semibold">Booking Details</Label>
                                      <div className="mt-1">
                                        <div>{booking.date} at {booking.time}</div>
                                        <div className="text-sm text-muted-foreground">
                                          {booking.guests} guests • {booking.type} booking
                                        </div>
                                        {booking.duration && (
                                          <div className="text-sm text-muted-foreground">
                                            Duration: {booking.duration} hour(s)
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  {booking.specialRequests && (
                                    <div>
                                      <Label className="font-semibold">Special Requests</Label>
                                      <div className="mt-1 text-sm">{booking.specialRequests}</div>
                                    </div>
                                  )}
                                  {booking.decorations && booking.decorations.length > 0 && (
                                    <div>
                                      <Label className="font-semibold">Selected Decorations</Label>
                                      <div className="mt-1 space-y-1">
                                        {booking.decorations.map((decoration, index) => (
                                          <div key={index} className="flex justify-between text-sm">
                                            <span>{decoration.name}</span>
                                            <span>${decoration.price}</span>
                                          </div>
                                        ))}
                                        <div className="border-t pt-1 font-semibold">
                                          Total: ${booking.totalPrice}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            {booking.status === 'pending' && (
                              <>
                                <Button size="sm" onClick={() => updateBookingStatus(booking.id!, 'confirmed')}>
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => updateBookingStatus(booking.id!, 'rejected')}>
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Management */}
          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Menu Item</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="menuName">Item Name</Label>
                    <Input
                      id="menuName"
                      value={newMenuItem.name}
                      onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                      placeholder="e.g., Butterfly Garden Special"
                    />
                  </div>
                  <div>
                    <Label htmlFor="menuPrice">Price ($)</Label>
                    <Input
                      id="menuPrice"
                      type="number"
                      value={newMenuItem.price}
                      onChange={(e) => setNewMenuItem({...newMenuItem, price: e.target.value})}
                      placeholder="24.99"
                    />
                  </div>
                  <div>
                    <Label htmlFor="menuCategory">Category</Label>
                    <Select value={newMenuItem.category} onValueChange={(value) => setNewMenuItem({...newMenuItem, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Appetizer">Appetizer</SelectItem>
                        <SelectItem value="Main Course">Main Course</SelectItem>
                        <SelectItem value="Seafood">Seafood</SelectItem>
                        <SelectItem value="Dessert">Dessert</SelectItem>
                        <SelectItem value="Beverage">Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Button onClick={addMenuItem} className="bg-gradient-to-r from-primary to-gold">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="menuDescription">Description</Label>
                  <Textarea
                    id="menuDescription"
                    value={newMenuItem.description}
                    onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                    placeholder="Describe the dish..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Menu Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge variant={item.available ? 'default' : 'secondary'}>
                            {item.available ? 'Available' : 'Unavailable'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        <p className="font-semibold text-primary mt-1">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleMenuItemAvailability(item.id)}
                        >
                          {item.available ? 'Disable' : 'Enable'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteMenuItem(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promotions Management */}
          <TabsContent value="promotions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Promotion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="promoTitle">Title</Label>
                    <Input
                      id="promoTitle"
                      value={newPromo.title}
                      onChange={(e) => setNewPromo({...newPromo, title: e.target.value})}
                      placeholder="e.g., Valentine's Special"
                    />
                  </div>
                  <div>
                    <Label htmlFor="promoType">Type</Label>
                    <Select value={newPromo.type} onValueChange={(value: 'banner' | 'special' | 'event') => setNewPromo({...newPromo, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="banner">Banner</SelectItem>
                        <SelectItem value="special">Special Offer</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="promoDescription">Description</Label>
                  <Textarea
                    id="promoDescription"
                    value={newPromo.description}
                    onChange={(e) => setNewPromo({...newPromo, description: e.target.value})}
                    placeholder="Describe the promotion..."
                    rows={3}
                  />
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button onClick={addPromoContent} className="bg-gradient-to-r from-primary to-gold">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Promotion
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Promotions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promoContent.map((promo) => (
                    <div key={promo.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{promo.title}</h3>
                          <Badge variant="outline" className={
                            promo.type === 'banner' ? 'border-blue-500 text-blue-700' :
                            promo.type === 'special' ? 'border-green-500 text-green-700' :
                            'border-purple-500 text-purple-700'
                          }>
                            {promo.type}
                          </Badge>
                          <Badge variant={promo.active ? 'default' : 'secondary'}>
                            {promo.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{promo.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => togglePromoActive(promo.id)}
                        >
                          {promo.active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deletePromoContent(promo.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Guests per Booking</span>
                      <span className="font-bold">{stats.averageGuests}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Table Bookings</span>
                      <span className="font-bold">{bookings.filter(b => b.type === 'table').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Party Bookings</span>
                      <span className="font-bold">{bookings.filter(b => b.type === 'party').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>WhatsApp Preferred</span>
                      <span className="font-bold">{bookings.filter(b => b.contactMethod === 'whatsapp').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="w-16 h-16 mx-auto mb-2" />
                      <p>Analytics charts will be displayed here</p>
                      <p className="text-sm">Showing peak booking hours and dates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
