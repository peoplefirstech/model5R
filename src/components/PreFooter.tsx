import React from 'react';
import { ArrowRight, Users, Target, Zap, Award, TrendingUp, Brain } from 'lucide-react';

interface PreFooterProps {
  language: 'fr' | 'en';
}

export default function PreFooter({ language }: PreFooterProps) {
  const content = {
    fr: {
      cta: {
        title: "Prêt à transformer votre potentiel ?",
        subtitle: "Rejoignez des milliers de professionnels qui ont déjà révolutionné leur approche du coaching avec notre IA.",
        button: "Commencer maintenant",
        buttonSecondary: "Découvrir nos solutions"
      },
      features: {
        title: "Pourquoi choisir notre Coach Virtuel IA ?",
        items: [
          {
            icon: Brain,
            title: "Intelligence Artificielle Avancée",
            description: "Algorithmes de pointe pour un coaching personnalisé et adaptatif"
          },
          {
            icon: Target,
            title: "Résultats Mesurables",
            description: "Suivi précis de vos progrès avec des métriques détaillées"
          },
          {
            icon: Users,
            title: "Approche Humaine",
            description: "L'IA au service de l'humain pour un développement authentique"
          }
        ]
      }
    },
    en: {
      cta: {
        title: "Ready to transform your potential?",
        subtitle: "Join thousands of professionals who have already revolutionized their coaching approach with our AI.",
        button: "Get started now",
        buttonSecondary: "Discover our solutions"
      },
      features: {
        title: "Why choose our AI Virtual Coach?",
        items: [
          {
            icon: Brain,
            title: "Advanced Artificial Intelligence",
            description: "Cutting-edge algorithms for personalized and adaptive coaching"
          },
          {
            icon: Target,
            title: "Measurable Results",
            description: "Precise tracking of your progress with detailed metrics"
          },
          {
            icon: Users,
            title: "Human Approach",
            description: "AI serving humanity for authentic development"
          }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 dark:from-gray-950/50 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Features Section */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            {t.features.title}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white/5 dark:bg-white/3 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-2xl p-8 h-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {feature.title}
                    </h4>
                    
                    <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t.cta.title}
            </h2>
            
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              {t.cta.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://www.peoplefirst-technologies.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
              >
                <span>{t.cta.buttonSecondary}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-purple-500/30 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border border-pink-500/30 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 border border-purple-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
    </section>
  );
}