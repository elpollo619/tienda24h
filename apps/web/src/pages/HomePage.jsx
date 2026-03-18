import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Laptop, PawPrint, Dumbbell, Heart, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductsList from '@/components/ProductsList';
import { useLanguage } from '@/context/LanguageContext.jsx';

const HomePage = () => {
  const { t } = useLanguage();

  const categories = [
    { name: t('categories.items.homeLiving'), icon: Home, slug: 'home-living', description: t('categories.items.homeLivingDesc') },
    { name: t('categories.items.gadgets'), icon: Laptop, slug: 'gadgets', description: t('categories.items.gadgetsDesc') },
    { name: t('categories.items.pets'), icon: PawPrint, slug: 'pets', description: t('categories.items.petsDesc') },
    { name: t('categories.items.fitness'), icon: Dumbbell, slug: 'fitness', description: t('categories.items.fitnessDesc') },
    { name: t('categories.items.lifestyle'), icon: Heart, slug: 'lifestyle', description: t('categories.items.lifestyleDesc') },
    { name: t('categories.items.latinProducts'), icon: Globe, slug: 'latin-products', description: t('categories.items.latinProductsDesc') }
  ];

  return (
    <>
      <Helmet>
        <title>BC Market - Your Swiss Online Marketplace</title>
        <meta name="description" content="Discover quality products at BC Market, Switzerland's premier online marketplace. Shop home goods, gadgets, pet supplies, fitness equipment, and more." />
      </Helmet>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1679731980205-dbd3ab480caa" 
            alt="Modern shopping experience at BC Market" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200">
            {t('hero.subtitle')}
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6">
              {t('hero.ctaButton')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('featured.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('featured.subtitle')}
            </p>
          </motion.div>
          <ProductsList />
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button size="lg" variant="outline">
                {t('featured.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('categories.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('categories.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/shop?category=${category.slug}`}>
                    <div className="group bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <Icon className="h-12 w-12 mb-4 text-foreground group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-muted-foreground text-sm">{category.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('home.experienceTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('home.experienceDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  {t('home.startShopping')}
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t('home.learnMore')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;