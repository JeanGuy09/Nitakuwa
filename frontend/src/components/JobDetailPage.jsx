import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { jobs } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const { user, toggleFavorite, isFavorite, updateProgress } = useAuth();
  
  // Find job across all sectors
  let job = null;
  Object.values(jobs).forEach(sectorJobs => {
    const foundJob = sectorJobs.find(j => j.id === jobId);
    if (foundJob) job = foundJob;
  });

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Emploi non trouvé</h1>
          <Link to="/jobs">
            <Button>Retour aux emplois</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleExploreJob = () => {
    if (user) {
      updateProgress({ jobsExplored: user.progress.jobsExplored + 1 });
    }
  };

  React.useEffect(() => {
    handleExploreJob();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <Badge variant="outline" className="mb-4 text-pink-600 border-pink-200">
                  {job.sector}
                </Badge>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{job.description}</p>
              </div>
              {user && (
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => toggleFavorite(job.id)}
                  className={`text-3xl ${isFavorite(job.id) ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-500 ml-6`}
                >
                  {isFavorite(job.id) ? '❤️' : '🤍'}
                </Button>
              )}
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{job.salaryRange}</div>
                <div className="text-gray-600">Fourchette salariale</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{job.hiringRate}</div>
                <div className="text-gray-600">Taux d'embauche</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{job.growthProjection}</div>
                <div className="text-gray-600">Projection de croissance</div>
              </div>
            </div>

            {!user && (
              <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Créez un compte pour accéder à plus de fonctionnalités</h3>
                <p className="text-gray-600 mb-4">Sauvegardez vos emplois favoris, suivez votre progression et accédez à des recommandations personnalisées</p>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                    Créer un compte gratuit
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white border border-gray-200 h-12">
                <TabsTrigger value="overview" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Aperçu
                </TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Formation
                </TabsTrigger>
                <TabsTrigger value="companies" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Entreprises
                </TabsTrigger>
                <TabsTrigger value="training" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Formations
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Témoignages
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compétences requises</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {job.skills.map((skill, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-700">{skill}</span>
                            <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                              Essentiel
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Opportunités de carrière</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">Demande du marché</h4>
                          <p className="text-green-700 text-sm">Forte demande avec {job.hiringRate} de taux de réussite</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Évolution de carrière</h4>
                          <p className="text-blue-700 text-sm">Progression rapide possible avec les bonnes compétences</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Impact social</h4>
                          <p className="text-purple-700 text-sm">Contribution directe au développement de la RDC</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Formations et diplômes requis</CardTitle>
                    <CardDescription>
                      Voici les parcours éducatifs recommandés pour accéder à ce poste
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {job.education.map((edu, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{edu}</h4>
                            <div className="flex items-center space-x-4">
                              <Badge variant="outline" className="text-xs">
                                Option {index + 1}
                              </Badge>
                              {index === 0 && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  Recommandé
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-6 bg-pink-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3">💡 Conseil KONGENGA</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        En RDC, la formation continue et l'auto-apprentissage sont souvent aussi valorisés que les diplômes formels. 
                        N'hésitez pas à compléter votre formation par des certifications en ligne et des projets pratiques.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Companies Tab */}
              <TabsContent value="companies" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Entreprises qui recrutent</CardTitle>
                    <CardDescription>
                      Principales organisations offrant des opportunités dans ce domaine en RDC
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {job.companies.map((company, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-pink-200 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white font-bold">
                              {company.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{company}</h4>
                              <p className="text-sm text-gray-600">
                                {index < 2 ? 'Recrute activement' : 'Opportunités régulières'}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {index < 2 ? 'Top employeur' : 'Partenaire'}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">💼 Opportunités d'entrepreneuriat</h4>
                      <p className="text-blue-800 text-sm">
                        En plus des emplois salariés, ce secteur offre de nombreuses possibilités de créer votre propre entreprise ou de travailler en freelance.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Training Tab */}
              <TabsContent value="training" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Formations recommandées</CardTitle>
                      <CardDescription>
                        Programmes de formation pour développer les compétences nécessaires
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {job.training.map((training, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-pink-200 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-lg mb-2">{training.name}</h4>
                                <p className="text-gray-600 mb-3">Par {training.provider}</p>
                              </div>
                              <Badge className="bg-pink-100 text-pink-700">
                                {training.cost}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="text-sm text-gray-600">Durée</div>
                                <div className="font-semibold text-gray-900">{training.duration}</div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="text-sm text-gray-600">Coût</div>
                                <div className="font-semibold text-gray-900">{training.cost}</div>
                              </div>
                            </div>

                            <Button 
                              variant="outline" 
                              className="w-full hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600"
                              onClick={() => {
                                if (user) {
                                  updateProgress({ trainingsStarted: user.progress.trainingsStarted + 1 });
                                }
                              }}
                            >
                              En savoir plus sur cette formation
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-semibold text-yellow-900 mb-3">🎓 Bourses et financements</h4>
                    <p className="text-yellow-800 text-sm leading-relaxed mb-4">
                      Plusieurs organisations offrent des bourses pour les étudiants congolais souhaitant se former dans ce domaine. 
                      Contactez-nous pour plus d'informations sur les opportunités de financement disponibles.
                    </p>
                    <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                      Explorer les options de financement
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Testimonials Tab */}
              <TabsContent value="testimonials" className="mt-6">
                <div className="space-y-6">
                  {job.testimonials.map((testimonial, index) => (
                    <Card key={index} className="border-l-4 border-l-pink-500">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-rose-500 text-white text-lg">
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <blockquote className="text-lg text-gray-700 italic mb-4 leading-relaxed">
                              "{testimonial.quote}"
                            </blockquote>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                <div className="text-sm text-gray-600">{testimonial.position}</div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                Professionnel vérifié
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="text-center py-8">
                    <h4 className="font-semibold text-gray-900 mb-3">Vous travaillez dans ce domaine ?</h4>
                    <p className="text-gray-600 mb-4">Partagez votre expérience pour aider d'autres étudiants congolais</p>
                    <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                      Partager mon témoignage
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à poursuivre cette carrière ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Commencez dès aujourd'hui votre parcours vers {job.title}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <Link to="/register">
                <Button size="lg" variant="secondary" className="px-8 bg-white text-pink-600 hover:bg-gray-100">
                  Créer un compte pour commencer
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="px-8 bg-white text-pink-600 hover:bg-gray-100">
                  Voir mon tableau de bord
                </Button>
              </Link>
            )}
            <Link to="/sectors">
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-pink-600">
                Explorer d'autres secteurs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetailPage;