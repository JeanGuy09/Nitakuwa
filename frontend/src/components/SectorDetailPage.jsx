import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { sectors, jobs } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const SectorDetailPage = () => {
  const { sectorId } = useParams();
  const { user, toggleFavorite, isFavorite } = useAuth();
  
  const sector = sectors.find(s => s.id === sectorId);
  const sectorJobs = jobs[sectorId] || [];

  if (!sector) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Secteur non trouvé</h1>
          <Link to="/sectors">
            <Button>Retour aux secteurs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-6">
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${sector.color} flex items-center justify-center text-4xl flex-shrink-0`}>
                {sector.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{sector.name}</h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">{sector.description}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-pink-600">{sector.jobCount}</span>
                    <span className="text-gray-600">emplois disponibles</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-0 px-4 py-2 text-sm">
                    {sector.growth} de croissance
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Opportunités d'emploi en {sector.name}
            </h2>
            
            {sectorJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {sectorJobs.map((job) => (
                  <Card key={job.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors mb-2">
                            {job.title}
                          </CardTitle>
                          <Badge variant="outline" className="mb-3">
                            {job.sector}
                          </Badge>
                        </div>
                        {user && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(job.id)}
                            className={`text-2xl ${isFavorite(job.id) ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-500`}
                          >
                            {isFavorite(job.id) ? '❤️' : '🤍'}
                          </Button>
                        )}
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        {job.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Salary and Hiring Rate */}
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

                        {/* Skills Preview */}
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Compétences clés</div>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{job.skills.length - 3} autres
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Companies Preview */}
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Entreprises qui recrutent</div>
                          <div className="text-sm text-gray-800">
                            {job.companies.slice(0, 2).join(', ')}
                            {job.companies.length > 2 && ` et ${job.companies.length - 2} autres`}
                          </div>
                        </div>

                        {/* Testimonial Preview */}
                        {job.testimonials && job.testimonials.length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={job.testimonials[0].image} alt={job.testimonials[0].name} />
                                <AvatarFallback>{job.testimonials[0].name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-sm text-gray-600 italic mb-1">
                                  "{job.testimonials[0].quote.substring(0, 80)}..."
                                </p>
                                <p className="text-xs text-gray-500">
                                  - {job.testimonials[0].name}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* CTA */}
                        <Link to={`/jobs/${job.id}`}>
                          <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                            Voir les détails complets
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Contenu en cours de développement
                </h3>
                <p className="text-gray-600 mb-6">
                  Les opportunités d'emploi pour ce secteur seront bientôt disponibles.
                </p>
                <Link to="/sectors">
                  <Button variant="outline">Retour aux secteurs</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sector Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Impact du secteur {sector.name} en RDC
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-pink-50 rounded-xl p-6">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-semibold text-gray-900 mb-2">Croissance économique</h3>
                <p className="text-gray-600 text-sm">
                  Contribue significativement au PIB national et à la création d'emplois
                </p>
              </div>
              <div className="bg-pink-50 rounded-xl p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  Moteur d'innovation et de modernisation des pratiques
                </p>
              </div>
              <div className="bg-pink-50 rounded-xl p-6">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="font-semibold text-gray-900 mb-2">Développement durable</h3>
                <p className="text-gray-600 text-sm">
                  Promotion du développement durable et responsable
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectorDetailPage;