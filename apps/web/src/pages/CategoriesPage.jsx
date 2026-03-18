import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Laptop, PawPrint, Dumbbell, Heart, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext.jsx';

const CategoriesPage = () => {
  const { t } = useLanguage();

  const categories = [
    { 
      name: t('categories.items.homeLiving'), 
      icon: Home, 
      slug: 'home-living',
      description: t('categories.items.homeLivingDesc'),
      color: 'from-slate-500 to-slate-700'
    },
    { 
      name: t('categories.items.gadgets'), 
      icon: Laptop, 
      slug: 'gadgets',
      description: t('categories.items.gadgetsDesc'),
      color: 'from-gray-600 to-gray-800'
    },
    { 
      name: t('categories.items.pets'), 
      icon: PawPrint, 
      slug: 'pets',
      description: t('categories.items.petsDesc'),
      color: 'from-zinc-500 to-zinc-700'
    },
    { 
      name: t('categories.items.fitness'), 
      icon: Dumbbell, 
      slug: 'fitness',
      description: t('categories.items.fitnessDesc'),
      color: 'from-neutral-600 to-neutral-800'
    },
    { 
      name: t('categories.items.lifestyle'), 
      icon: Heart, 
      slug: 'lifestyle',
      description: t('categories.items.lifestyleDesc'),
      color: 'from-stone-500 to-stone-700'
    },
    { 
      name: t('categories.items.latinProducts'), 
      icon: Globe, 
      slug: 'latin-products',
      description: t('categories.items.latinProductsDesc'),
      color: 'from-gray-500 to-gray-700'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Categories - BC Market</title>
        <meta name="description" content="Explore our diverse product categories at BC Market. From home goods to gadgets, pets to fitness, find everything you need in one place." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('categories.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('categories.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/shop?category=${category.slug}`}>
                  <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                    
                    <div className="relative p-8">
                      <div className="mb-6 inline-block p-4 bg-muted rounded-full group-hover:scale-110 transition-transform">
                        <Icon className="h-12 w-12 text-foreground" />
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {category.name}
                      </h2>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {category.description}
                      </p>
                      
                      <div className="mt-6 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        <span>{t('categories.viewAll')}</span>
                        <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;