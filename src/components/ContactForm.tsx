import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, User, Building, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  language: 'fr' | 'en';
}

export default function ContactForm({ language }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    fr: {
      title: "Contactez-nous",
      subtitle: "Prêt à transformer votre approche du coaching ? Parlons de vos besoins.",
      form: {
        name: "Nom complet",
        email: "Email professionnel",
        company: "Entreprise",
        phone: "Téléphone",
        subject: "Sujet",
        message: "Message",
        submit: "Envoyer le message",
        submitting: "Envoi en cours...",
        success: "Message envoyé avec succès !",
        successDesc: "Nous vous répondrons dans les plus brefs délais."
      },
      subjects: [
        "Demande de démonstration",
        "Information sur les tarifs",
        "Partenariat",
        "Support technique",
        "Autre"
      ],
      contact: {
        title: "Informations de contact", 
        email: "info@peoplefirst-technologies.com",
        phone: "+33 632 00 06 84",
        address: "34 rue Maisons Neuves, 13890 Mouriès, France"
      }
    },
    en: {
      title: "Contact Us",
      subtitle: "Ready to transform your coaching approach? Let's discuss your needs.",
      form: {
        name: "Full name",
        email: "Professional email",
        company: "Company",
        phone: "Phone",
        subject: "Subject",
        message: "Message",
        submit: "Send message",
        submitting: "Sending...",
        success: "Message sent successfully!",
        successDesc: "We will get back to you as soon as possible."
      },
      subjects: [
        "Demo request",
        "Pricing information",
        "Partnership",
        "Technical support",
        "Other"
      ],
      contact: {
        title: "Contact information",
        email: "lshivaswamy@peoplefirst-technologies.com",
        phone: "+1-860-217-0198",
        address: "550 Reserve Street, Suite 390, Southlake, Texas 76092, USA"
      }
    }
  };

  const t = content[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t.form.success}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.form.successDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16 animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                {t.contact.title}
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">Email</p>
                    <a href={`mailto:${t.contact.email}`} className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors break-all">
                      {t.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{language === 'fr' ? 'Téléphone' : 'Phone'}</p>
                    <a href={`tel:${t.contact.phone}`} className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{language === 'fr' ? 'Adresse' : 'Address'}</p>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      {t.contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                {language === 'fr' ? 'Pourquoi nous choisir ?' : 'Why choose us?'}
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                  <span className="text-sm">
                    {language === 'fr' ? 'Réponse sous 24h' : '24h response time'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                  <span className="text-sm">
                    {language === 'fr' ? 'Experts certifiés' : 'Certified experts'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                  <span className="text-sm">
                    {language === 'fr' ? 'Support personnalisé' : 'Personalized support'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.form.name} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                        placeholder={t.form.name}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.form.email} *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                        placeholder={t.form.email}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.form.company}
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                        placeholder={t.form.company}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.form.phone}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                        placeholder={t.form.phone}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.form.subject} *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                  >
                    <option value="">{language === 'fr' ? 'Sélectionnez un sujet' : 'Select a subject'}</option>
                    {t.subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.form.message} *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none text-sm sm:text-base"
                      placeholder={language === 'fr' ? 'Décrivez votre projet ou vos besoins...' : 'Describe your project or needs...'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-out flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 disabled:hover:translate-y-0 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-600 before:to-pink-600 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 disabled:hover:before:opacity-0"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{t.form.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{t.form.submit}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}