import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Star,
  MessageSquare,
  Send,
  Car,
  Train,
  Plane,
  Users,
  Heart,
  Award
} from 'lucide-react';

const contactInfo = {
  phone: '7992240355',
  email: 'hello@butterflygarden.com',
  address: 'Dumri, Gobarsahi, Muzaffarpur, Bihar 842001',
  hours: {
    'Monday - Thursday': '5:00 PM - 10:00 PM',
    'Friday - Saturday': '5:00 PM - 11:00 PM',
    'Sunday': '4:00 PM - 9:00 PM'
  }
};

const teamMembers = [
  {
    name: 'Chef Marco Butterfly',
    role: 'Head Chef & Owner',
    image: '👨‍🍳',
    bio: 'Michelin-starred chef with 15+ years of culinary excellence'
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Pastry Chef',
    image: '👩‍🍳',
    bio: 'Award-winning pastry artist specializing in French desserts'
  },
  {
    name: 'David Kim',
    role: 'Restaurant Manager',
    image: '👨‍💼',
    bio: 'Hospitality expert ensuring exceptional dining experiences'
  }
];

const faqs = [
  {
    question: 'Do you accommodate dietary restrictions?',
    answer: 'Absolutely! We offer vegetarian, vegan, gluten-free, and dairy-free options. Please inform us of any allergies when making your reservation.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We require at least 24 hours notice for cancellations. For parties of 8 or more, we require 48 hours notice.'
  },
  {
    question: 'Do you offer private dining?',
    answer: 'Yes! We have a private dining room that seats up to 20 guests, perfect for special occasions and business meetings.'
  },
  {
    question: 'Is there parking available?',
    answer: 'We offer complimentary valet parking for all our guests. Street parking is also available nearby.'
  },
  {
    question: 'Can I bring my own wine?',
    answer: 'We allow BYOB with a corkage fee of ₹1,500 per bottle. Our sommelier can also recommend wines from our extensive collection.'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: ''
    });
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
              <Link to="/booking">
                <Button className="bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90">
                  Reserve Table
                </Button>
              </Link>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                <Phone className="w-4 h-4 mr-2" />
                {contactInfo.phone}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-gold/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions, special requests, or just want to say hello, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-gold" />
              <span>Award-Winning Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span>5-Star Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Made with Love</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => setFormData({...formData, inquiryType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reservation">Reservation Inquiry</SelectItem>
                          <SelectItem value="catering">Catering Services</SelectItem>
                          <SelectItem value="private">Private Events</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="careers">Career Opportunities</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">{contactInfo.phone}</div>
                    <div className="text-sm text-muted-foreground">Available 24/7 for reservations</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">{contactInfo.email}</div>
                    <div className="text-sm text-muted-foreground">We respond within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-muted-foreground">{contactInfo.address}</div>
                    <div className="text-sm text-muted-foreground">Valet parking available</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Opening Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(contactInfo.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="font-medium">{day}</span>
                    <span className="text-muted-foreground">{hours}</span>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-warm/30 rounded-lg">
                  <div className="text-sm text-center">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Last seating 1 hour before closing
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Getting Here</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Car className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">By Car</div>
                    <div className="text-sm text-muted-foreground">Free valet parking</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Train className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Public Transit</div>
                    <div className="text-sm text-muted-foreground">Metro Station: 2 blocks away</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Plane className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">From Airport</div>
                    <div className="text-sm text-muted-foreground">25 minutes by taxi</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Meet Our Team */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate individuals behind every memorable dining experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-gold/20 hover:border-gold/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary/10 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">{member.image}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <Badge variant="outline" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions about dining with us
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-gold/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-primary">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary to-gold text-primary-foreground border-0">
            <CardContent className="p-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Visit Butterfly Garden?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join us for an unforgettable culinary experience in the heart of the city
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/booking">
                  <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90">
                    <Calendar className="w-5 h-5 mr-2" />
                    Make a Reservation
                  </Button>
                </Link>
                <Link to="/menu">
                  <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10">
                    <Users className="w-5 h-5 mr-2" />
                    View Our Menu
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
