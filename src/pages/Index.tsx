import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Star, Truck, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';
import categoryTops from '@/assets/category-tops.jpg';
import categoryDresses from '@/assets/category-dresses.jpg';
import categoryBottoms from '@/assets/category-bottoms.jpg';
import categoryEthnic from '@/assets/category-ethnic.jpg';

const Index = () => {
  const categories = [
    {
      id: 'tops',
      name: 'Tops & Tees',
      description: 'Casual & elegant tops for every occasion',
      image: categoryTops,
      itemCount: '120+ styles'
    },
    {
      id: 'dresses',
      name: 'Dresses',
      description: 'From casual to party wear',
      image: categoryDresses,
      itemCount: '85+ styles'
    },
    {
      id: 'bottoms',
      name: 'Bottoms',
      description: 'Jeans, trousers & more',
      image: categoryBottoms,
      itemCount: '95+ styles'
    },
    {
      id: 'ethnic',
      name: 'Ethnic Wear',
      description: 'Traditional meets contemporary',
      image: categoryEthnic,
      itemCount: '150+ styles'
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over ₹4000'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure checkout'
    },
    {
      icon: Heart,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Handpicked materials'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            TrendyEthnic
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Discover elegant fashion that celebrates your unique style
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/category/dresses">
              <Button size="lg" className="btn-hero text-lg px-8 py-4">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Collection
              </Button>
            </Link>
            <Link to="/category/ethnic">
              <Button size="lg" variant="outline" className="glass text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary">
                Explore Ethnic Wear
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-float" style={{ animationDelay: '0s' }}>
          <div className="w-20 h-20 rounded-full bg-primary/20 blur-xl"></div>
        </div>
        <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-32 h-32 rounded-full bg-accent/20 blur-xl"></div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our curated collections designed for the modern woman
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <Card className="category-card h-full animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm opacity-90">{category.itemCount}</p>
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Subscribe to get updates on new arrivals and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
              />
              <Button className="btn-hero">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
