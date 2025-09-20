import { useParams } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const categoryNames: Record<string, string> = {
  tops: 'Tops & Tees',
  dresses: 'Dresses',
  bottoms: 'Bottoms', 
  ethnic: 'Ethnic Wear'
};

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  if (!categoryId || !categoryNames[categoryId]) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  const categoryProducts = products.filter(product => product.category === categoryId);
  const categoryName = categoryNames[categoryId];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{categoryName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Category Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-4">{categoryName}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our beautiful collection of {categoryName.toLowerCase()} designed for the modern woman who values style and comfort.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categoryProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              We're currently updating our {categoryName.toLowerCase()} collection. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;