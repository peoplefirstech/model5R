import React from 'react';
import { Brain, Users, Target, TrendingUp, Mail, Globe } from 'lucide-react';

interface PresentationPageProps {
  language?: 'fr' | 'en';
  isDarkMode?: boolean;
}

const PresentationPage: React.FC<PresentationPageProps> = ({ 
  language = 'fr', 
  isDarkMode = false 
}) => {
  const content = {
    fr: {
      hero: {
        title: "Coach Virtuel IA",
        subtitle: "Basé sur le modèle 5R®",
        description: "Transformez votre management avec l'intelligence artificielle et la méthode éprouvée 5R®",
        cta: "Commencer maintenant"
      },
      features: {
        title: "Pourquoi choisir notre Coach IA ?",
        items: [
          {
            icon: Brain,
            title: "Intelligence Artificielle Avancée",
            description: "Algorithmes de pointe pour des conseils personnalisés"
          },
          {
            icon: Users,
            title: "Approche Humaine",
            description: "Centré sur les relations et le développement personnel"
          },
          {
            icon: Target,
            title: "Résultats Mesurables",
            description: "Suivi des progrès et objectifs concrets"
          }
        ]
      },
      useCases: {
        title: "Cas d'usage",
        items: [
          "Gestion d'équipe",
          "Résolution de conflits",
          "Développement du leadership",
          "Communication efficace"
        ]
      },
      cta: {
        title: "Prêt à transformer votre management ?",
        description: "Découvrez comment notre Coach IA peut vous aider",
        button: "Essayer maintenant"
      }
    },
    en: {
      hero: {
        title: "AI Virtual Coach",
        subtitle: "Based on the 5R® model",
        description: "Transform your management with artificial intelligence and the proven 5R® method",
        cta: "Start now"
      },
      features: {
        title: "Why choose our AI Coach?",
        items: [
          {
            icon: Brain,
            title: "Advanced Artificial Intelligence",
            description: "Cutting-edge algorithms for personalized advice"
          },
          {
            icon: Users,
            title: "Human Approach",
            description: "Focused on relationships and personal development"
          },
          {
            icon: Target,
            title: "Measurable Results",
            description: "Progress tracking and concrete objectives"
          }
        ]
      },
      useCases: {
        title: "Use Cases",
        items: [
          "Team management",
          "Conflict resolution",
          "Leadership development",
          "Effective communication"
        ]
      },
      cta: {
        title: "Ready to transform your management?",
        description: "Discover how our AI Coach can help you",
        button: "Try now"
      }
    }
  };

  const t = content[language];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            {t.hero.title}
          </h1>
          <p className="text-xl mb-2 text-gray-600">
            {t.hero.subtitle}
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {t.hero.description}
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
            {t.hero.cta}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t.features.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300">
                  <IconComponent className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {t.useCases.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.useCases.items.map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                <p className="font-medium text-gray-900">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.cta.title}
          </h2>
          <p className="text-lg mb-8 text-gray-600">
            {t.cta.description}
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
            {t.cta.button}
          </button>
        </div>
      </section>
    </div>
  );
};

export default PresentationPage;