import React from 'react';
import { ArrowLeft, FileText, Shield, Cookie } from 'lucide-react';

interface LegalPagesProps {
  page: 'legal' | 'privacy' | 'cookies';
  language: 'fr' | 'en';
  onBack: () => void;
}

export default function LegalPages({ page, language, onBack }: LegalPagesProps) {
  const content = {
    legal: {
      fr: {
        title: "Mentions Légales",
        icon: FileText,
        sections: [
          {
            title: "Éditeur du site",
            content: `
              <p><strong>People First Technologies</strong></p>
              <p>Société par actions simplifiée au capital de 50 000 €</p>
              <p>Siège social : 123 Avenue de l'Innovation, 75001 Paris, France</p>
              <p>RCS Paris : 123 456 789</p>
              <p>SIRET : 123 456 789 00012</p>
              <p>TVA intracommunautaire : FR12 123456789</p>
              <p>Téléphone : +33 1 23 45 67 89</p>
              <p>Email : contact@peoplefirst.tech</p>
            `
          },
          {
            title: "Directeur de la publication",
            content: `
              <p>Le directeur de la publication est le représentant légal de People First Technologies.</p>
            `
          },
          {
            title: "Hébergement",
            content: `
              <p><strong>Netlify, Inc.</strong></p>
              <p>2325 3rd Street, Suite 296</p>
              <p>San Francisco, CA 94107, États-Unis</p>
              <p>Site web : https://www.netlify.com</p>
            `
          },
          {
            title: "Propriété intellectuelle",
            content: `
              <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
              <p>La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.</p>
            `
          },
          {
            title: "Responsabilité",
            content: `
              <p>Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.</p>
              <p>Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email en décrivant le problème de la manière la plus précise possible.</p>
            `
          }
        ]
      },
      en: {
        title: "Legal Notice",
        icon: FileText,
        sections: [
          {
            title: "Site Publisher",
            content: `
              <p><strong>People First Technologies</strong></p>
              <p>Simplified joint-stock company with capital of €50,000</p>
              <p>Registered office: 123 Innovation Avenue, 75001 Paris, France</p>
              <p>RCS Paris: 123 456 789</p>
              <p>SIRET: 123 456 789 00012</p>
              <p>EU VAT: FR12 123456789</p>
              <p>Phone: +33 1 23 45 67 89</p>
              <p>Email: contact@peoplefirst.tech</p>
            `
          },
          {
            title: "Publication Director",
            content: `
              <p>The publication director is the legal representative of People First Technologies.</p>
            `
          },
          {
            title: "Hosting",
            content: `
              <p><strong>Netlify, Inc.</strong></p>
              <p>2325 3rd Street, Suite 296</p>
              <p>San Francisco, CA 94107, United States</p>
              <p>Website: https://www.netlify.com</p>
            `
          },
          {
            title: "Intellectual Property",
            content: `
              <p>This entire site is subject to French and international copyright and intellectual property legislation. All reproduction rights are reserved, including for downloadable documents and iconographic and photographic representations.</p>
              <p>Reproduction of all or part of this site on any electronic medium is strictly prohibited without express authorization from the publication director.</p>
            `
          },
          {
            title: "Liability",
            content: `
              <p>The information contained on this site is as accurate as possible and the site is periodically updated, but may nevertheless contain inaccuracies, omissions or gaps.</p>
              <p>If you notice a gap, error or what appears to be a malfunction, please report it by email describing the problem as precisely as possible.</p>
            `
          }
        ]
      }
    },
    privacy: {
      fr: {
        title: "Politique de Confidentialité",
        icon: Shield,
        sections: [
          {
            title: "Collecte des données personnelles",
            content: `
              <p>Nous collectons les données personnelles suivantes :</p>
              <ul class="list-disc ml-6 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Nom de l'entreprise</li>
                <li>Fonction dans l'entreprise</li>
                <li>Données de navigation (cookies, adresse IP)</li>
              </ul>
            `
          },
          {
            title: "Finalités du traitement",
            content: `
              <p>Vos données personnelles sont traitées pour les finalités suivantes :</p>
              <ul class="list-disc ml-6 space-y-2">
                <li>Répondre à vos demandes de contact</li>
                <li>Vous proposer nos services de coaching IA</li>
                <li>Améliorer nos services</li>
                <li>Vous envoyer notre newsletter (avec votre consentement)</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            `
          },
          {
            title: "Base légale",
            content: `
              <p>Le traitement de vos données personnelles est fondé sur :</p>
              <ul class="list-disc ml-6 space-y-2">
                <li>Votre consentement pour la newsletter</li>
                <li>L'exécution d'un contrat ou de mesures précontractuelles</li>
                <li>Notre intérêt légitime pour améliorer nos services</li>
                <li>Le respect d'obligations légales</li>
              </ul>
            `
          },
          {
            title: "Conservation des données",
            content: `
              <p>Vos données personnelles sont conservées :</p>
              <ul class="list-disc ml-6 space-y-2">
                <li>3 ans pour les prospects</li>
                <li>5 ans pour les clients</li>
                <li>Jusqu'à désinscription pour la newsletter</li>
                <li>Selon les obligations légales applicables</li>
              </ul>
            `
          },
          {
            title: "Vos droits",
            content: `
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul class="list-disc ml-6 space-y-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
                <li>Droit de retirer votre consentement</li>
              </ul>
              <p class="mt-4">Pour exercer ces droits, contactez-nous à : contact@peoplefirst.tech</p>
            `
          }
        ]
      },
      en: {
        title: "Privacy Policy",
        icon: Shield,
        sections: [
          {
            title: "Personal Data Collection",
            content: `
              <p>We collect the following personal data:</p>
              <ul class="list-disc ml-6 space-y-2">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Job title</li>
                <li>Navigation data (cookies, IP address)</li>
              </ul>
            `
          },
          {
            title: "Processing Purposes",
            content: `
              <p>Your personal data is processed for the following purposes:</p>
              <ul class="list-disc ml-6 space-y-2">
                <li>Respond to your contact requests</li>
                <li>Offer you our AI coaching services</li>
                <li>Improve our services</li>
                <li>Send you our newsletter (with your consent)</li>
                <li>Comply with our legal obligations</li>
              </ul>
            `
          },
          {
            title: "Legal Basis",
            content: `
              <p>The processing of your personal data is based on:</p>
              <ul class="list-disc ml-6 space-y-2">
                <li>Your consent for the newsletter</li>
                <li>Performance of a contract or pre-contractual measures</li>
                <li>Our legitimate interest to improve our services</li>
                <li>Compliance with legal obligations</li>
              </ul>
            `
          },
          {
            title: "Data Retention",
            content: `
              <p>Your personal data is retained for:</p>
              <ul class="list-disc ml-6 space-y-2">
                <li>3 years for prospects</li>
                <li>5 years for customers</li>
                <li>Until unsubscription for newsletter</li>
                <li>According to applicable legal obligations</li>
              </ul>
            `
          },
          {
            title: "Your Rights",
            content: `
              <p>In accordance with GDPR, you have the following rights:</p>
              <ul class="list-disc ml-6 space-y-2">
                <li>Right of access to your data</li>
                <li>Right of rectification</li>
                <li>Right to erasure</li>
                <li>Right to restriction of processing</li>
                <li>Right to data portability</li>
                <li>Right to object</li>
                <li>Right to withdraw consent</li>
              </ul>
              <p class="mt-4">To exercise these rights, contact us at: contact@peoplefirst.tech</p>
            `
          }
        ]
      }
    },
    cookies: {
      fr: {
        title: "Politique des Cookies",
        icon: Cookie,
        sections: [
          {
            title: "Qu'est-ce qu'un cookie ?",
            content: `
              <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet de reconnaître votre navigateur et de collecter certaines informations.</p>
            `
          },
          {
            title: "Types de cookies utilisés",
            content: `
              <h4 class="font-semibold mb-2">Cookies strictement nécessaires</h4>
              <p>Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés.</p>
              
              <h4 class="font-semibold mb-2 mt-4">Cookies de performance</h4>
              <p>Ces cookies nous permettent d'analyser l'utilisation du site pour améliorer ses performances.</p>
              
              <h4 class="font-semibold mb-2 mt-4">Cookies de fonctionnalité</h4>
              <p>Ces cookies permettent d'améliorer votre expérience utilisateur (préférences de langue, etc.).</p>
              
              <h4 class="font-semibold mb-2 mt-4">Cookies publicitaires</h4>
              <p>Ces cookies permettent de vous proposer des publicités personnalisées.</p>
            `
          },
          {
            title: "Cookies tiers",
            content: `
              <p>Nous utilisons les services suivants qui peuvent déposer des cookies :</p>
              <ul class="list-disc ml-6 space-y-2">
                <li><strong>Google Analytics</strong> : Analyse d'audience</li>
                <li><strong>LinkedIn</strong> : Boutons de partage</li>
                <li><strong>Twitter</strong> : Boutons de partage</li>
                <li><strong>Facebook</strong> : Boutons de partage</li>
              </ul>
            `
          },
          {
            title: "Gestion des cookies",
            content: `
              <p>Vous pouvez gérer vos préférences de cookies de plusieurs façons :</p>
              
              <h4 class="font-semibold mb-2 mt-4">Via votre navigateur</h4>
              <p>Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies.</p>
              
              <h4 class="font-semibold mb-2 mt-4">Via notre bandeau de cookies</h4>
              <p>Lors de votre première visite, un bandeau vous permet de choisir vos préférences.</p>
              
              <h4 class="font-semibold mb-2 mt-4">Liens utiles</h4>
              <ul class="list-disc ml-6 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" class="text-purple-400 hover:text-purple-300">Chrome</a></li>
                <li><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" class="text-purple-400 hover:text-purple-300">Firefox</a></li>
                <li><a href="https://support.microsoft.com/fr-fr/help/17442" class="text-purple-400 hover:text-purple-300">Edge</a></li>
                <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" class="text-purple-400 hover:text-purple-300">Safari</a></li>
              </ul>
            `
          },
          {
            title: "Contact",
            content: `
              <p>Pour toute question concernant notre politique de cookies, contactez-nous à :</p>
              <p><strong>Email :</strong> contact@peoplefirst.tech</p>
              <p><strong>Adresse :</strong> 123 Avenue de l'Innovation, 75001 Paris, France</p>
            `
          }
        ]
      },
      en: {
        title: "Cookie Policy",
        icon: Cookie,
        sections: [
          {
            title: "What is a cookie?",
            content: `
              <p>A cookie is a small text file placed on your device (computer, tablet, smartphone) when visiting a website. It allows your browser to be recognized and certain information to be collected.</p>
            `
          },
          {
            title: "Types of cookies used",
            content: `
              <h4 class="font-semibold mb-2">Strictly necessary cookies</h4>
              <p>These cookies are essential for the website to function and cannot be disabled.</p>
              
              <h4 class="font-semibold mb-2 mt-4">Performance cookies</h4>
              <p>These cookies allow us to analyze website usage to improve its performance.</p>
              
              <h4 class="font-semibold mb-2 mt-4">Functionality cookies</h4>
              <p>These cookies enhance your user experience (language preferences, etc.).</p>
              
              <h4 class="font-semibold mb-2 mt-4">Advertising cookies</h4>
              <p>These cookies allow us to offer you personalized advertisements.</p>
            `
          },
          {
            title: "Third-party cookies",
            content: `
              <p>We use the following services that may place cookies:</p>
              <ul class="list-disc ml-6 space-y-2">
                <li><strong>Google Analytics</strong>: Audience analysis</li>
                <li><strong>LinkedIn</strong>: Share buttons</li>
                <li><strong>Twitter</strong>: Share buttons</li>
                <li><strong>Facebook</strong>: Share buttons</li>
              </ul>
            `
          },
          {
            title: "Cookie management",
            content: `
              <p>You can manage your cookie preferences in several ways:</p>
              
              <h4 class="font-semibold mb-2 mt-4">Via your browser</h4>
              <p>You can configure your browser to accept or refuse cookies.</p>
              
              <h4 class="font-semibold mb-2 mt-4">Via our cookie banner</h4>
              <p>During your first visit, a banner allows you to choose your preferences.</p>
              
              <h4 class="font-semibold mb-2 mt-4">Useful links</h4>
              <ul class="list-disc ml-6 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" class="text-purple-400 hover:text-purple-300">Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" class="text-purple-400 hover:text-purple-300">Firefox</a></li>
                <li><a href="https://support.microsoft.com/en-us/help/17442" class="text-purple-400 hover:text-purple-300">Edge</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" class="text-purple-400 hover:text-purple-300">Safari</a></li>
              </ul>
            `
          },
          {
            title: "Contact",
            content: `
              <p>For any questions regarding our cookie policy, contact us at:</p>
              <p><strong>Email:</strong> contact@peoplefirst.tech</p>
              <p><strong>Address:</strong> 123 Innovation Avenue, 75001 Paris, France</p>
            `
          }
        ]
      }
    }
  };

  const pageContent = content[page][language];
  const IconComponent = pageContent.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Retour' : 'Back'}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pageContent.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            {pageContent.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{section.title}</h2>
                <div 
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </div>
          
          {/* Last updated */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'fr' 
                ? 'Dernière mise à jour : 15 janvier 2024'
                : 'Last updated: January 15, 2024'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}