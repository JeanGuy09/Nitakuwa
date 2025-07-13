import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { jobs } from '../data/mockData';

const FavoritesPage = () => {
  const { user, favorites, toggleFavorite } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
          <Link to="/login">
            <Button>Se connecter</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get user's favorite jobs
  const favoriteJobs = [];
  Object.values(jobs).forEach(sectorJobs => {
    sectorJobs.forEach(job => {
      if (favorites.includes(job.id)) {
        favoriteJobs.push(job);
      }
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mes emplois favoris
            </h1>
            <p className="text-xl text-gray-600">
              Vous avez sauvegardé {favoriteJobs.length} emploi{favoriteJobs.length !== 1 ? 's' : ''} pour plus tard
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {favoriteJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {favoriteJobs.map((job) => (
                  <Card key={job.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2 text-pink-600 border-pink-200">
                            {job.sector}
                          </Badge>
                          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors mb-2">
                            {job.title}
                          </CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(job.id)}
                          className="text-2xl text-pink-500 hover:text-red-500"
                        >
                          ❤️
                        </Button>
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        {job.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Key Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="text-sm text-gray-600">Salaire</div>
                            <div className="font-semibold text-green-700">{job.salaryRange}</div>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-sm text-gray-600">Taux d'embauche</div>
                            <div className="font-semibold text-blue-700">{job.hiringRate}</div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Compétences requises</div>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{job.skills.length - 4} autres
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Companies */}
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Entreprises qui recrutent</div>
                          <div className="text-sm text-gray-800">
                            {job.companies.slice(0, 3).join(', ')}
                            {job.companies.length > 3 && ` et ${job.companies.length - 3} autres`}
                          </div>
                        </div>

                        {/* Testimonial */}
                        {job.testimonials && job.testimonials.length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={job.testimonials[0].image} alt={job.testimonials[0].name} />
                                <AvatarFallback>{job.testimonials[0].name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-sm text-gray-600 italic mb-1">
                                  "{job.testimonials[0].quote.substring(0, 100)}..."
                                </p>
                                <p className="text-xs text-gray-500">
                                  - {job.testimonials[0].name}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Link to={`/jobs/${job.id}`} className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                              Voir les détails
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            onClick={() => toggleFavorite(job.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Retirer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">💼</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Aucun favori pour le moment
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Explorez les secteurs et sauvegardez les emplois qui vous intéressent 
                  en cliquant sur le cœur ❤️ sur chaque offre.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/sectors">
                    <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8">
                      Explorer les secteurs
                    </Button>
                  </Link>
                  <Link to="/jobs">
                    <Button variant="outline" size="lg" className="px-8">
                      Voir tous les emplois
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      {favoriteJobs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Prochaines étapes
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="text-3xl mb-3">🎓</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Commencer une formation</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Développez les compétences nécessaires pour vos emplois favoris
                  </p>
                  <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-100">
                    Voir les formations
                  </Button>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-3xl mb-3">🏢</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contacter les entreprises</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Prenez contact avec les employeurs de vos secteurs préférés
                  </p>
                  <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-100">
                    Voir les contacts
                  </Button>
                </div>
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="text-3xl mb-3">👥</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Réseau professionnel</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Connectez-vous avec des professionnels de votre domaine
                  </p>
                  <Button size="sm" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-100">
                    Voir le réseau
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default FavoritesPage;