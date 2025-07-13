import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { sectors } from '../data/mockData';

const SectorsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Secteurs d'activité
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Découvrez les secteurs économiques clés de la République Démocratique du Congo. 
              Chaque secteur représente une opportunité unique de contribuer au développement du pays 
              tout en construisant une carrière épanouissante.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sectors.map((sector) => (
              <Card 
                key={sector.id} 
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white"
              >
                <CardHeader className="pb-4">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${sector.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {sector.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors mb-3">
                    {sector.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {sector.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Statistics */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          <span className="font-semibold text-gray-900">{sector.jobCount}</span> emplois disponibles
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-0 px-3 py-1">
                        {sector.growth} croissance
                      </Badge>
                    </div>

                    {/* Key Benefits */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Pourquoi ce secteur ?</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Forte demande de talents qualifiés</li>
                        <li>• Impact direct sur le développement</li>
                        <li>• Opportunités de croissance rapide</li>
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Link to={`/sectors/${sector.id}`} className="block">
                      <Button 
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white group-hover:shadow-lg transition-all"
                      >
                        Explorer les opportunités
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Besoin d'aide pour choisir ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Notre équipe peut vous aider à identifier le secteur qui correspond le mieux à vos compétences et aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8">
                  Créer un compte
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="px-8 border-2">
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