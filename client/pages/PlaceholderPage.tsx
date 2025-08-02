import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Sparkles, Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm via-background to-warm">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-gold rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                  Butterfly
                </span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-gold/20">
            <CardContent className="p-12">
              <div className="w-24 h-24 bg-gradient-to-r from-primary/10 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Construction className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                {description}
              </p>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This page is currently under development. Please continue prompting to help us fill in the content for this section.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/">
                    <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                      Back to Home
                    </Button>
                  </Link>
                  <Link to="/booking">
                    <Button className="bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-primary-foreground">
                      Make a Reservation
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
