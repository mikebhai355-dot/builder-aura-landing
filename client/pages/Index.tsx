import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Phone, 
  MapPin, 
  ChefHat,
  Heart,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const menuHighlights = [
  {
    name: "Butterfly Special Pasta",
    description: "Fresh handmade pasta with truffle oil and wild mushrooms",
    price: "₹1,800",
    image: "🍝",
    category: "Main Course"
  },
  {
    name: "Golden Sunset Salmon",
    description: "Pan-seared Atlantic salmon with citrus glaze",
    price: "₹2,400",
    image: "🐟",
    category: "Seafood"
  },
  {
    name: "Garden Symphony Salad",
    description: "Fresh mixed greens with seasonal fruits and nuts",
    price: "₹1,350",
    image: "🥗",
    category: "Appetizer"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "The most amazing dining experience! Perfect for our anniversary.",
    date: "2 days ago"
  },
  {
    name: "Michael Chen",
    rating: 5,
    comment: "Exceptional food and service. The atmosphere is simply magical.",
    date: "1 week ago"
  },
  {
    name: "Emily Rodriguez",
    rating: 5,
    comment: "Butterfly restaurant exceeded all our expectations. Highly recommended!",
    date: "2 weeks ago"
  }
];

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm via-background to-warm">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-gold rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                Butterfly Garden
              </span>
            </div>
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors text-sm xl:text-base">Home</Link>
              <Link to="/menu" className="text-foreground hover:text-primary transition-colors text-sm xl:text-base">Menu</Link>
              <Link to="/booking" className="text-foreground hover:text-primary transition-colors text-sm xl:text-base">Reservations</Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors text-sm xl:text-base">Contact</Link>
            </div>
            <div className="flex items-center space-x-3">
              {/* Social Media Buttons */}
              <div className="flex items-center space-x-2">
                <a href="https://wa.me/917992240355" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm font-bold">W</span>
                </a>
                <a href="https://www.instagram.com/butterflygarden" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm font-bold">I</span>
                </a>
                <a href="https://www.facebook.com/butterflygarden" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm font-bold">F</span>
                </a>
                <a href="https://maps.google.com/?q=Dumri,Gobarsahi,Muzaffarpur,Bihar" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm font-bold">M</span>
                </a>
              </div>
              <Link to="/booking">
                <Button className="bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-primary-foreground font-semibold">
                  Book Table
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-gold/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <Badge className="mb-6 bg-gold/10 text-gold border-gold/20 hover:bg-gold/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Fine Dining Experience
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-gold to-copper bg-clip-text text-transparent leading-tight">
                Welcome to<br />
                Butterfly Garden<br />
                <span className="text-2xl md:text-4xl lg:text-5xl">Restaurant & Cafe</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Where culinary artistry meets elegant ambiance. Experience flavors that dance on your palate like butterflies in a garden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/booking">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-primary-foreground font-semibold px-8 py-6 text-lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Reserve Your Table
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/10 px-8 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: 7992240355
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Butterflies */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 text-4xl animate-[flutter_6s_ease-in-out_infinite] opacity-60">🦋</div>
          <div className="absolute top-40 right-20 text-3xl animate-[flutter_8s_ease-in-out_infinite_2s] opacity-50">🦋</div>
          <div className="absolute bottom-40 left-1/4 text-2xl animate-[flutter_10s_ease-in-out_infinite_4s] opacity-70">🦋</div>
          <div className="absolute top-1/3 right-1/3 text-3xl animate-[flutter_7s_ease-in-out_infinite_1s] opacity-40">🦋</div>
          <div className="absolute bottom-20 right-10 text-2xl animate-[flutter_9s_ease-in-out_infinite_3s] opacity-60">🦋</div>
          <div className="absolute top-60 left-1/2 text-xl animate-[flutter_5s_ease-in-out_infinite_2.5s] opacity-50">��</div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 left-10 w-16 h-16 bg-gradient-to-r from-gold to-primary rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-gradient-to-r from-primary to-copper rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-gold rounded-full opacity-20 animate-bounce delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">Why Choose Butterfly Garden?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We offer more than just a meal - we create unforgettable experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 group">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ChefHat className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
                <p className="text-muted-foreground">Award-winning chefs crafting exceptional dishes with the finest ingredients</p>
              </CardContent>
            </Card>
            <Card className="border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gold to-copper rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Elegant Ambiance</h3>
                <p className="text-muted-foreground">Sophisticated atmosphere perfect for romantic dinners and special celebrations</p>
              </CardContent>
            </Card>
            <Card className="border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-copper to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exceptional Service</h3>
                <p className="text-muted-foreground">Personalized attention to make every visit memorable and special</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-16 bg-warm/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Signature Dishes</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Taste our chef's carefully curated selection of exceptional dishes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {menuHighlights.map((dish, index) => (
              <Card key={index} className="border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                      {dish.image}
                    </div>
                    <Badge className="absolute top-4 right-4 bg-gold text-primary-foreground">
                      {dish.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{dish.name}</h3>
                      <span className="text-xl font-bold text-primary">{dish.price}</span>
                    </div>
                    <p className="text-muted-foreground">{dish.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/menu">
              <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/10">
                View Full Menu
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What Our Guests Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't just take our word for it - hear from our valued customers
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="border-gold/20 bg-gradient-to-r from-warm/50 to-background">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="text-lg mb-4 text-foreground">
                  "{testimonials[currentTestimonial].comment}"
                </blockquote>
                <div className="text-muted-foreground">
                  <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                  <div className="text-sm">{testimonials[currentTestimonial].date}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Booking CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">Ready for an Unforgettable Experience?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Book your table now and let us create magical moments for you and your loved ones
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/booking">
              <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90 px-8 py-6 text-lg font-semibold">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Table
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10 px-8 py-6 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: 7992240355
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-gold rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg md:text-xl font-bold">Butterfly Garden</span>
              </div>
              <p className="text-background/80 mb-4">
                Creating exceptional dining experiences with passion and artistry.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-background/80">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  7992240355
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Dumri, Gobarsahi, Muzaffarpur, Bihar
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Daily: 5:00 PM - 11:00 PM
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-background/80">
                <Link to="/menu" className="block hover:text-gold transition-colors">Menu</Link>
                <Link to="/booking" className="block hover:text-gold transition-colors">Reservations</Link>
                <Link to="/contact" className="block hover:text-gold transition-colors">Contact</Link>
                <Link to="/admin" className="block hover:text-gold transition-colors">Admin</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 Butterfly Garden Restaurant & Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
