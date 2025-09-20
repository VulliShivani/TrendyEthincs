import { Product } from '@/contexts/StoreContext';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Heart } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useStore();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Small delay for UX
    addToCart(product);
    setIsAdding(false);
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: isLiked 
        ? `${product.name} removed from your wishlist.`
        : `${product.name} added to your wishlist.`,
    });
  };

  return (
    <Card className="product-card group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="icon"
              className="glass transform scale-95 group-hover:scale-100 transition-transform duration-300"
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Quick add button */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full btn-hero"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="btn-category"
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;