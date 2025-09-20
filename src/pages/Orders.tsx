import { useStore } from '@/contexts/StoreContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { orders } = useStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center animate-fade-in">
            <Package className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">No orders yet</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              When you place your first order, it will appear here.
            </p>
            <Link to="/">
              <Button className="btn-hero">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold gradient-text">Your Orders</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <Card key={order.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Order #{order.id.slice(-8).toUpperCase()}</CardTitle>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Placed on {new Date(order.date).toLocaleDateString()}</span>
                  <span className="font-semibold text-primary text-lg">₹{order.total.toFixed(2)}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {order.items.reduce((total, item) => total + item.quantity, 0)} items
                    </span>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-xl font-bold text-primary">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;