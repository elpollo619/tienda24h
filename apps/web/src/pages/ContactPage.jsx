import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext.jsx';

const ContactPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: t('messages.missingInfo'),
        description: t('messages.missingInfoDesc'),
        variant: 'destructive'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t('messages.invalidEmail'),
        description: t('messages.invalidEmailDesc'),
        variant: 'destructive'
      });
      return;
    }

    try {
      const submissions = JSON.parse(localStorage.getItem('bc-market-contact-submissions') || '[]');
      
      const newSubmission = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };

      submissions.push(newSubmission);
      localStorage.setItem('bc-market-contact-submissions', JSON.stringify(submissions));

      toast({
        title: t('messages.messageSent'),
        description: t('messages.messageSentDesc'),
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: t('messages.submitError'),
        description: t('messages.submitErrorDesc'),
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - BC Market</title>
        <meta name="description" content="Get in touch with BC Market. We're here to help with any questions about our products or services." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">{t('contactPage.title')}</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            {t('contactPage.subtitle')}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('contactPage.getInTouch')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{t('contactPage.form.name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('contactPage.form.namePlaceholder')}
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t('contactPage.form.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('contactPage.form.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">{t('contactPage.form.subject')}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder={t('contactPage.form.subjectPlaceholder')}
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t('contactPage.form.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t('contactPage.form.messagePlaceholder')}
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  {t('contactPage.form.submit')}
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">{t('contactPage.infoTitle')}</h2>
              
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-muted rounded-full">
                      <Mail className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contactPage.email')}</h3>
                      <p className="text-muted-foreground">info@bcmarket.ch</p>
                      <p className="text-muted-foreground">support@bcmarket.ch</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-muted rounded-full">
                      <Phone className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contactPage.phone')}</h3>
                      <p className="text-muted-foreground">+41 44 123 45 67</p>
                      <p className="text-sm text-muted-foreground mt-1">{t('contactPage.phoneHours')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-muted rounded-full">
                      <MapPin className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contactPage.location')}</h3>
                      <p className="text-muted-foreground">BC Market AG</p>
                      <p className="text-muted-foreground">Bahnhofstrasse 100</p>
                      <p className="text-muted-foreground">8001 Zurich, Switzerland</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold mb-2">{t('contactPage.businessHours')}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{t('contactPage.hours.weekdays')}</p>
                  <p>{t('contactPage.hours.saturday')}</p>
                  <p>{t('contactPage.hours.sunday')}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;