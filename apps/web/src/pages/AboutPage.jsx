import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Heart, Zap, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext.jsx';

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: t('aboutPage.values.quality'),
      description: t('aboutPage.values.qualityDesc')
    },
    {
      icon: Heart,
      title: t('aboutPage.values.customer'),
      description: t('aboutPage.values.customerDesc')
    },
    {
      icon: Zap,
      title: t('aboutPage.values.innovation'),
      description: t('aboutPage.values.innovationDesc')
    },
    {
      icon: Users,
      title: t('aboutPage.values.community'),
      description: t('aboutPage.values.communityDesc')
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - BC Market</title>
        <meta name="description" content="Learn about BC Market, Switzerland's premier online marketplace. Discover our mission, values, and commitment to quality." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">{t('aboutPage.title')}</h1>
          <p className="text-xl text-muted-foreground text-center mb-16">
            {t('aboutPage.subtitle')}
          </p>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('aboutPage.missionTitle')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('aboutPage.mission1')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('aboutPage.mission2')}
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('aboutPage.valuesTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="mb-4 inline-block p-3 bg-muted rounded-full">
                      <Icon className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('aboutPage.storyTitle')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('aboutPage.story1')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('aboutPage.story2')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('aboutPage.story3')}
            </p>
          </section>

          <section className="bg-muted/30 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('aboutPage.joinTitle')}</h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t('aboutPage.joinDesc')}
            </p>
            <p className="text-muted-foreground">
              {t('aboutPage.joinThanks')}
            </p>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default AboutPage;