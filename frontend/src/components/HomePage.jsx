import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { sectors, statistics } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Large Logo */}
            <div className="text-center mb-12">
              <h1 className="text-8xl md:text-9xl font-bold text-gray-200 mb-8 tracking-wider">
                KONGENGA
              </h1>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Façonnez votre avenir professionnel en République Démocratique du Congo
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  KONGENGA est une plateforme qui vous accompagne dans l'exploration de votre carrière et 
                  vous offre la possibilité de découvrir des opportunités d'emploi dans des secteurs clés. 
                  Nous contribuons aussi à mettre en avant le savoir-faire des étudiants congolais.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {user ? (
                    <Link to="/dashboard">
                      <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-6 text-lg">
                        Accéder au tableau de bord
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/register">
                        <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-6 text-lg">
                          Commencer votre parcours
                        </Button>
                      </Link>
                      <Link to="/sectors">
                        <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 hover:bg-gray-50">
                          Explorer les carrières
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Right Illustration */}
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl">💻</span>
                      </div>
                      <p className="text-gray-600 font-medium">Carrières Digitales</p>
                      <p className="text-gray-500 text-sm">Construisez l'avenir</p>
                    </div>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">🎯</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pourquoi choisir KONGENGA pour votre carrière ?
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Cliquez sur les secteurs d'activité pour sélectionner le domaine auquel vous souhaitez 
                vous orienter et découvrir directement les opportunités, formations et témoignages 
                disponibles. Nous vous offrons en plus de cela un accompagnement personnalisé pour 
                réussir votre insertion professionnelle.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">🎓</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Formation</h4>
                  <p className="text-sm text-gray-600">Accès aux meilleures formations</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Opportunités</h4>
                  <p className="text-sm text-gray-600">Milliers d'offres d'emploi</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">🤝</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Accompagnement</h4>
                  <p className="text-sm text-gray-600">Suivi personnalisé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              KONGENGA en chiffres
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">{statistics.totalJobs}+</div>
              <div className="text-gray-600">Opportunités de carrière</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{statistics.totalStudents}+</div>
              <div className="text-gray-600">Étudiants accompagnés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{statistics.totalCompanies}+</div>
              <div className="text-gray-600">Entreprises partenaires</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{statistics.successStories}+</div>
              <div className="text-gray-600">Histoires de réussite</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explorez les secteurs à fort impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez parmi les secteurs qui stimulent la croissance économique et le développement en RDC. 
              Chaque secteur offre des opportunités uniques pour avoir un impact significatif.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sectors.map((sector) => (
              <Card 
                key={sector.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white shadow-sm"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {sector.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {sector.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {sector.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        {sector.jobCount} emplois
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
                        {sector.growth} croissance
                      </Badge>
                    </div>
                  </div>
                  <Link to={`/sectors/${sector.id}`}>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-pink-50 group-hover:border-pink-200 group-hover:text-pink-600 transition-all"
                    >
                      Explorer {sector.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à commencer votre parcours professionnel ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Rejoignez des milliers d'étudiants congolais qui construisent l'avenir de notre nation. 
            Créez votre profil aujourd'hui et découvrez des opportunités qui correspondent à votre passion.
          </p>
          {!user && (
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg bg-white text-pink-600 hover:bg-gray-100">
                Créer votre compte gratuit
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Chat Widget Placeholder */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-lg">
          <span className="text-xl">💬</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;