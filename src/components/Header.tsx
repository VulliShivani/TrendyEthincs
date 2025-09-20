import { ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/contexts/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const { getCartItemsCount } = useStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemsCount = getCartItemsCount();

  const categories = [
    { name: 'Tops & Tees', path: '/category/tops' },
    { name: 'Dresses', path: '/category/dresses' },
    { name: 'Bottoms', path: '/category/bottoms' },
    { name: 'Ethnic Wear', path: '/category/ethnic' }
  ];

  return (
    <header className="glass sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold gradient-text">
            TrendyEthnic
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;