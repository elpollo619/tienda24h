import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext.jsx';

const SuccessPage = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Order Confirmed - BC Market</title>
        <meta name="description" content="Your order has been successfully placed. Thank you for shopping with BC Market!" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block p-6 bg-green-500/10 rounded-full mb-6"
            >
              <CheckCircle className="h-24 w-24 text-green-500" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('success.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('success.subtitle')}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Package className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t('success.orderNumber')}</span>
            </div>
            <p className="text-3xl font-bold mb-6">#{orderNumber}</p>
            
            <div className="border-t border-border pt-6">
              <p className="text-muted-foreground mb-2">
                {t('success.emailSent')}
              </p>
              <p className="text-muted-foreground">
                {t('success.processing')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">{t('success.estimatedDelivery')}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">{t('success.orderStatus')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('success.statusProcessing')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="flex-1 sm:flex-initial">
              <Button size="lg" className="w-full">
                <ShoppingBag className="mr-2 h-5 w-5" />
                {t('success.continueShopping')}
              </Button>
            </Link>
            <Link to="/" className="flex-1 sm:flex-initial">
              <Button size="lg" variant="outline" className="w-full">
                <Home className="mr-2 h-5 w-5" />
                {t('success.backToHome')}
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <p>{t('success.needHelp')}</p>
            <Link to="/contact" className="text-foreground hover:underline font-medium">
              {t('success.contactSupport')}
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SuccessPage;