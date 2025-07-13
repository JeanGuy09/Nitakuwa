import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { sectorsAPI } from '../services/api';

const SectorsPage = () => {
  const { t, getMultilingualText } = useLanguage();
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSectors();
  }, []);

  const loadSectors = async () => {
    try {
      const data = await sectorsAPI.getAll();
      setSectors(data);
    } catch (error) {
      console.error('Failed to load sectors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Section with animated background */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.3)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.3)_0%,transparent_50%)]" />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-pink-500/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-white mb-8 animate-in fade-in-50 slide-in-from-bottom duration-1000">
              Secteurs d'activité
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-8 rounded-full" />
            <p className="text-2xl text-gray-300 leading-relaxed animate-in fade-in-50 slide-in-from-bottom duration-1000 delay-300">
              Découvrez les secteurs économiques clés de la République Démocratique du Congo. 
              Chaque secteur représente une opportunité unique de contribuer au développement du pays 
              tout en construisant une carrière épanouissante.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors Grid with enhanced animations */}
      <section className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/30 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {sectors.map((sector, index) => (
              <Card 
                key={sector.id} 
                className="group hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border-0 bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm hover:from-gray-700 hover:to-gray-800 animate-in fade-in-50 slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="pb-6">
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${sector.color} flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-2xl relative`}>
                    {sector.icon}
                    <div className={`absolute inset-0 bg-gradient-to-br ${sector.color} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 -z-10`} />
                  </div>
                  <CardTitle className="text-3xl font-bold text-white group-hover:text-pink-400 transition-colors mb-4">
                    {getMultilingualText(sector.name)}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg leading-relaxed">
                    {getMultilingualText(sector.description)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {/* Statistics */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-400">
                          <span className="font-bold text-2xl text-white">{sector.jobCount}</span> emplois disponibles
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm">
                        {sector.growth} croissance
                      </Badge>
                    </div>

                    {/* Key Benefits */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                      <h4 className="font-semibold text-white mb-3">Pourquoi ce secteur ?</h4>
                      <ul className="text-sm text-gray-400 space-y-2">
                        <li className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                          <span>Forte demande de talents qualifiés</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                          <span>Impact direct sur le développement</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                          <span>Opportunités de croissance rapide</span>
                        </li>
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Link to={`/sectors/${sector.id}`} className="block">
                      <Button 
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 text-lg font-semibold shadow-xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105"
                      >
                        Explorer les opportunités
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
                
                {/* Card glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-700 -z-10`} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA with enhanced background */}
      <section className="py-24 bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M50 50c0-27.614 22.386-50 50-50v100c-27.614 0-50-22.386-50-50z\" fill=\"%23ec4899\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')",
            width: '100%',
            height: '100%'
          }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 animate-in fade-in-50 slide-in-from-bottom duration-700">
              Besoin d'aide pour choisir ?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed animate-in fade-in-50 slide-in-from-bottom duration-700 delay-300">
              Notre équipe peut vous aider à identifier le secteur qui correspond le mieux à vos compétences et aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in-50 slide-in-from-bottom duration-700 delay-500">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 py-4 text-lg font-semibold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105">
                  Créer un compte
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="px-10 py-4 text-lg border-2 border-gray-600 text-gray-300 hover:border-pink-500 hover:text-white hover:bg-pink-500/10 transition-all duration-300 hover:scale-105">
                  Voir tous les emplois
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectorsPage;