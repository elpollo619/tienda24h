import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getProducts } from '@/api/EcommerceApi';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext.jsx';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useLanguage();

  const displayVariant = useMemo(() => product.variants[0], [product]);
  const hasSale = useMemo(() => displayVariant && displayVariant.sale_price_in_cents !== null, [displayVariant]);
  const displayPrice = useMemo(() => hasSale ? displayVariant.sale_price_formatted : displayVariant.price_formatted, [displayVariant, hasSale]);
  const originalPrice = useMemo(() => hasSale ? displayVariant.price_formatted : null, [displayVariant, hasSale]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.variants.length > 1) {
      return;
    }

    const defaultVariant = product.variants[0];

    try {
      await addToCart(product, defaultVariant, 1, defaultVariant.inventory_quantity);
      toast({
        title: t('messages.addedToCart'),
        description: `${product.title} ${t('messages.addedDesc')}`,
      });
    } catch (error) {
      toast({
        title: t('messages.errorCart'),
        description: error.message,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="relative">
            <img
              src={product.image || placeholderImage}
              alt={product.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.ribbon_text && (
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {product.ribbon_text}
              </div>
            )}
            <div className="absolute top-3 right-3 bg-card/90 text-card-foreground text-xs font-bold px-3 py-1 rounded-full flex items-baseline gap-1.5">
              {hasSale && (
                <span className="line-through opacity-70">{originalPrice}</span>
              )}
              <span>{displayPrice}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold truncate">{product.title}</h3>
            <p className="text-sm text-muted-foreground h-10 overflow-hidden">{product.subtitle || 'Check out this amazing product!'}</p>
            <Button onClick={handleAddToCart} className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              <ShoppingCart className="mr-2 h-4 w-4" /> {t('shop.addToCart')}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const categoryParam = searchParams.get('category') || 'all';
  const { t } = useLanguage();

  const categories = [
    { name: t('shop.allProducts'), slug: 'all' },
    { name: t('categories.items.homeLiving'), slug: 'home-living' },
    { name: t('categories.items.gadgets'), slug: 'gadgets' },
    { name: t('categories.items.pets'), slug: 'pets' },
    { name: t('categories.items.fitness'), slug: 'fitness' },
    { name: t('categories.items.lifestyle'), slug: 'lifestyle' },
    { name: t('categories.items.latinProducts'), slug: 'latin-products' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        setProducts(response.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => {
        const priceA = a.variants[0]?.sale_price_in_cents ?? a.variants[0]?.price_in_cents ?? 0;
        const priceB = b.variants[0]?.sale_price_in_cents ?? b.variants[0]?.price_in_cents ?? 0;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => {
        const priceA = a.variants[0]?.sale_price_in_cents ?? a.variants[0]?.price_in_cents ?? 0;
        const priceB = b.variants[0]?.sale_price_in_cents ?? b.variants[0]?.price_in_cents ?? 0;
        return priceB - priceA;
      });
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }

    return filtered;
  }, [products, searchQuery, sortBy]);

  const handleCategoryChange = (value) => {
    if (value && value !== 'all') {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <Helmet>
        <title>Shop - BC Market</title>
        <meta name="description" content="Browse our complete collection of quality products at BC Market. Find home goods, gadgets, pet supplies, fitness equipment, and more." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8">{t('shop.title')}</h1>

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="h-5 w-5" />
              <span className="font-semibold">{t('shop.filter')}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category" className="mb-2 block">{t('shop.category')}</Label>
                <Select value={categoryParam} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder={t('shop.allProducts')} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="search" className="mb-2 block">{t('shop.search')}</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    type="text"
                    placeholder={t('shop.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="sort" className="mb-2 block">{t('shop.sort')}</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort">
                    <SelectValue placeholder={t('shop.sortOptions.default')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">{t('shop.sortOptions.default')}</SelectItem>
                    <SelectItem value="price-low">{t('shop.sortOptions.priceLow')}</SelectItem>
                    <SelectItem value="price-high">{t('shop.sortOptions.priceHigh')}</SelectItem>
                    <SelectItem value="newest">{t('shop.sortOptions.newest')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-16 w-16 text-foreground animate-spin" />
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center text-muted-foreground p-8">
              <p>{t('shop.noResults')}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {t('shop.showing')} {filteredAndSortedProducts.length} {filteredAndSortedProducts.length !== 1 ? t('shop.products') : t('shop.product')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ShopPage;