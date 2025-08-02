import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  PartyPopper,
  Utensils,
  Heart,
  Music,
  Cake,
  Flower,
} from "lucide-react";

const decorationOptions = [
  {
    id: "flowers",
    name: "Fresh Flower Arrangements",
    price: 3500,
    icon: Flower,
  },
  {
    id: "balloons",
    name: "Elegant Balloon Setup",
    price: 2000,
    icon: PartyPopper,
  },
  { id: "music", name: "Live Music Performance", price: 15000, icon: Music },
  { id: "cake", name: "Custom Celebration Cake", price: 5500, icon: Cake },
  { id: "romantic", name: "Romantic Candle Setup", price: 3000, icon: Heart },
];

const timeSlots = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

export default function Booking() {
  const [bookingType, setBookingType] = useState("table");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    duration: "1",
    specialRequests: "",
    decorations: [],
    contactMethod: "sms",
  });

  // Geolocation state
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState("prompt");
  const [distanceToRestaurant, setDistanceToRestaurant] = useState(null);

  // Restaurant location (Dumri, Gobarsahi, Muzaffarpur, Bihar)
  const restaurantLocation = {
    lat: 26.1197,
    lng: 85.3906,
    address: "Dumri, Gobarsahi, Muzaffarpur, Bihar 842001"
  };

  const [selectedDecorations, setSelectedDecorations] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setLocationPermission("requesting");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userPos);
        setLocationPermission("granted");

        // Calculate distance to restaurant
        const distance = calculateDistance(
          userPos.lat,
          userPos.lng,
          restaurantLocation.lat,
          restaurantLocation.lng
        );
        setDistanceToRestaurant(distance.toFixed(1));
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationPermission("denied");
        let errorMessage = 'Unable to retrieve your location.';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. You can still make a booking without location.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        alert(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  useEffect(() => {
    // Auto-detect location when component mounts
    getUserLocation();
  }, []);

  const handleDecorationChange = (decorationId, checked) => {
    if (checked) {
      const decoration = decorationOptions.find((d) => d.id === decorationId);
      setSelectedDecorations([...selectedDecorations, decoration]);
      setTotalPrice(totalPrice + decoration.price);
    } else {
      const decoration = decorationOptions.find((d) => d.id === decorationId);
      setSelectedDecorations(
        selectedDecorations.filter((d) => d.id !== decorationId),
      );
      setTotalPrice(totalPrice - decoration.price);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate only required fields
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in your name and phone number');
      return;
    }

    const bookingData = {
      ...formData,
      type: bookingType,
      decorations: selectedDecorations,
      totalPrice,
      status: "pending",
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Booking submitted successfully! Reference: ${result.reference}`);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
          duration: "1",
          specialRequests: "",
          decorations: [],
          contactMethod: "sms",
        });
        setSelectedDecorations([]);
        setTotalPrice(0);
      } else {
        alert("Error submitting booking. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting booking. Please try again.");
    }
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
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call: 7992240355
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
            Reserve Your Experience
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether it's an intimate dinner or a grand celebration, we'll make
            it unforgettable
          </p>
        </div>

        {/* Location & Distance Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-gold/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Restaurant Location
                  </h3>
                  <p className="text-muted-foreground">{restaurantLocation.address}</p>
                  {userLocation && distanceToRestaurant && (
                    <div className="mt-2 flex items-center text-sm">
                      <span className="text-green-600 font-medium">
                        📍 You are approximately {distanceToRestaurant} km away
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {!userLocation ? (
                    <Button
                      onClick={getUserLocation}
                      variant="outline"
                      size="sm"
                      disabled={locationPermission === "requesting"}
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      {locationPermission === "requesting" ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Detecting...
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4 mr-2" />
                          Get My Location
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="text-center">
                      <div className="text-sm text-green-600 font-medium">✅ Location detected</div>
                      <Button
                        onClick={getUserLocation}
                        variant="outline"
                        size="sm"
                        className="mt-1 text-xs"
                      >
                        Refresh Location
                      </Button>
                    </div>
                  )}
                  <a
                    href={`https://maps.google.com/dir/${userLocation ? `${userLocation.lat},${userLocation.lng}` : ''}/${restaurantLocation.lat},${restaurantLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button size="sm" className="bg-gradient-to-r from-primary to-gold w-full">
                      <Map className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </a>
                </div>
              </div>

              {locationPermission === "denied" && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    📱 Location access was denied. You can still make a booking, or enable location in your browser settings for distance calculation.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs
            value={bookingType}
            onValueChange={setBookingType}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="table"
                className="flex items-center space-x-2"
              >
                <Utensils className="w-4 h-4" />
                <span>Table Reservation</span>
              </TabsTrigger>
              <TabsTrigger
                value="party"
                className="flex items-center space-x-2"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Party Booking</span>
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  <TabsContent value="table" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Utensils className="w-5 h-5 text-primary" />
                          <span>Table Reservation Details</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="guests">Number of Guests *</Label>
                            <Select
                              value={formData.guests}
                              onValueChange={(value) =>
                                setFormData({ ...formData, guests: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select guests" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num} {num === 1 ? "Guest" : "Guests"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="date">Reservation Date *</Label>
                            <Input
                              id="date"
                              type="date"
                              value={formData.date}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  date: e.target.value,
                                })
                              }
                              required
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div>
                            <Label htmlFor="time">Preferred Time *</Label>
                            <Select
                              value={formData.time}
                              onValueChange={(value) =>
                                setFormData({ ...formData, time: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="party" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <PartyPopper className="w-5 h-5 text-primary" />
                          <span>Party Booking Details</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="guests">Number of Guests *</Label>
                            <Select
                              value={formData.guests}
                              onValueChange={(value) =>
                                setFormData({ ...formData, guests: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select guests" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  10, 15, 20, 25, 30, 35, 40, 50, 60, 80, 100,
                                ].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num} Guests
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="date">Event Date *</Label>
                            <Input
                              id="date"
                              type="date"
                              value={formData.date}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  date: e.target.value,
                                })
                              }
                              required
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div>
                            <Label htmlFor="time">Start Time *</Label>
                            <Select
                              value={formData.time}
                              onValueChange={(value) =>
                                setFormData({ ...formData, time: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="duration">
                            Event Duration (hours) *
                          </Label>
                          <Select
                            value={formData.duration}
                            onValueChange={(value) =>
                              setFormData({ ...formData, duration: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map((hours) => (
                                <SelectItem
                                  key={hours}
                                  value={hours.toString()}
                                >
                                  {hours} {hours === 1 ? "Hour" : "Hours"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Decoration Options */}
                        <div>
                          <Label className="text-base font-semibold mb-4 block">
                            Decoration Options
                          </Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            {decorationOptions.map((decoration) => {
                              const IconComponent = decoration.icon;
                              return (
                                <div
                                  key={decoration.id}
                                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-warm/30 transition-colors"
                                >
                                  <Checkbox
                                    id={decoration.id}
                                    onCheckedChange={(checked) =>
                                      handleDecorationChange(
                                        decoration.id,
                                        checked,
                                      )
                                    }
                                  />
                                  <IconComponent className="w-5 h-5 text-primary" />
                                  <div className="flex-1">
                                    <label
                                      htmlFor={decoration.id}
                                      className="font-medium cursor-pointer"
                                    >
                                      {decoration.name}
                                    </label>
                                    <div className="text-sm text-muted-foreground">
                                      +₹{decoration.price}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Special Requests */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="specialRequests">
                          Special Requests or Dietary Requirements
                        </Label>
                        <Textarea
                          id="specialRequests"
                          placeholder="Tell us about any special occasions, dietary restrictions, or specific requests..."
                          value={formData.specialRequests}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specialRequests: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label className="text-base font-semibold mb-3 block">
                          Preferred Contact Method
                        </Label>
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="sms"
                              checked={formData.contactMethod === "sms"}
                              onCheckedChange={() =>
                                setFormData({
                                  ...formData,
                                  contactMethod: "sms",
                                })
                              }
                            />
                            <Label
                              htmlFor="sms"
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>SMS</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="whatsapp"
                              checked={formData.contactMethod === "whatsapp"}
                              onCheckedChange={() =>
                                setFormData({
                                  ...formData,
                                  contactMethod: "whatsapp",
                                })
                              }
                            />
                            <Label
                              htmlFor="whatsapp"
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <Phone className="w-4 h-4" />
                              <span>WhatsApp</span>
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary Sidebar */}
                <div className="space-y-6">
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle>Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <Badge
                            variant="outline"
                            className="border-primary text-primary"
                          >
                            {bookingType === "table"
                              ? "Table Reservation"
                              : "Party Booking"}
                          </Badge>
                        </div>
                        {formData.guests && (
                          <div className="flex justify-between">
                            <span>Guests:</span>
                            <span>{formData.guests}</span>
                          </div>
                        )}
                        {formData.date && (
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span>
                              {new Date(formData.date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {formData.time && (
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span>{formData.time}</span>
                          </div>
                        )}
                        {bookingType === "party" && formData.duration && (
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{formData.duration} hour(s)</span>
                          </div>
                        )}
                      </div>

                      {bookingType === "party" &&
                        selectedDecorations.length > 0 && (
                          <>
                            <div className="border-t pt-4">
                              <h4 className="font-semibold mb-2">
                                Selected Decorations:
                              </h4>
                              <div className="space-y-2">
                                {selectedDecorations.map((decoration) => (
                                  <div
                                    key={decoration.id}
                                    className="flex justify-between text-sm"
                                  >
                                    <span>{decoration.name}</span>
                                    <span>₹{decoration.price}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="border-t pt-4">
                              <div className="flex justify-between font-semibold text-lg">
                                <span>Additional Services:</span>
                                <span className="text-primary">
                                  ₹{totalPrice}
                                </span>
                              </div>
                            </div>
                          </>
                        )}

                      <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          You will receive confirmation via{" "}
                          {formData.contactMethod === "sms"
                            ? "SMS"
                            : "WhatsApp"}{" "}
                          at: 7992240355
                        </p>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-primary-foreground font-semibold"
                          size="lg"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Submit Reservation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h4 className="font-semibold mb-2">Need Help?</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Call us directly for immediate assistance
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gold text-gold hover:bg-gold/10"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          7992240355
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
