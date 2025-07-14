import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { jobs } from '../data/mockData';

const DashboardPage = () => {
  const { user, favorites } = useAuth();
  const [careerInterest, setCareerInterest] = useState([75]);
  const [skillLevel, setSkillLevel] = useState([60]);

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

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-pink-500 to-rose-500 text-white text-2xl">
                {user.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenue, {user.name} !
              </h1>
              <p className="text-gray-600 mb-2">
                {user.university} • {user.year} • {user.field}
              </p>
              <Badge className="bg-pink-100 text-pink-700">
                Étudiant actif
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📊</span>
                  <span>Votre progression</span>
                </CardTitle>
                <CardDescription>
                  Suivez votre avancement dans l'exploration de carrières
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Profil complété</span>
                        <span className="text-sm text-gray-500">{user.progress.profileComplete}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 transition-all duration-500"
                          style={{ width: `${user.progress.profileComplete}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600">{user.progress.jobsExplored}</div>
                        <div className="text-xs text-gray-600">Emplois explorés</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-600">{user.progress.trainingsStarted}</div>
                        <div className="text-xs text-gray-600">Formations démarrées</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-purple-600">{favorites.length}</div>
                        <div className="text-xs text-gray-600">Favoris sauvés</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-pink-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🎯 Prochaines étapes</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Complétez votre profil (+20%)</li>
                      <li>• Explorez 5 nouveaux emplois</li>
                      <li>• Commencez une formation en ligne</li>
                      <li>• Connectez-vous avec un mentor</li>
                    </ul>
                    <Button size="sm" className="mt-3 bg-pink-500 hover:bg-pink-600 text-white">
                      Améliorer mon profil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Favorite Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>❤️</span>
                  <span>Mes emplois favoris</span>
                </CardTitle>
                <CardDescription>
                  Les carrières que vous avez sauvegardées pour plus tard
                </CardDescription>
              </CardHeader>
              <CardContent>
                {favoriteJobs.length > 0 ? (
                  <div className="space-y-4">
                    {favoriteJobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-pink-200 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{job.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{job.sector}</p>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="text-xs">
                              {job.salaryRange}
                            </Badge>
                            <span className="text-xs text-green-600">
                              {job.hiringRate} taux d'embauche
                            </span>
                          </div>
                        </div>
                        <Link to={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                        </Link>
                      </div>
                    ))}
                    {favoriteJobs.length > 3 && (
                      <div className="text-center pt-4">
                        <Link to="/favorites">
                          <Button variant="outline">
                            Voir tous les favoris ({favoriteJobs.length})
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">💼</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Aucun favori pour le moment</h3>
                    <p className="text-gray-600 mb-4">
                      Explorez les secteurs et sauvegardez les emplois qui vous intéressent
                    </p>
                    <Link to="/sectors">
                      <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                        Explorer les secteurs
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📈</span>
                  <span>Activité récente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                      👁️
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Vous avez exploré {user.progress.jobsExplored} emplois
                      </p>
                      <p className="text-xs text-gray-600">Continuez à explorer pour découvrir plus d'opportunités</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      🎓
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {user.progress.trainingsStarted} formations commencées
                      </p>
                      <p className="text-xs text-gray-600">Excellent ! La formation continue est clé pour réussir</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                      ⭐
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Profil {user.progress.profileComplete}% complété
                      </p>
                      <p className="text-xs text-gray-600">
                        {user.progress.profileComplete < 100 ? 'Complétez votre profil pour de meilleures recommandations' : 'Profil complet ! Excellent travail'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/sectors" className="block">
                  <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                    Explorer les secteurs
                  </Button>
                </Link>
                <Link to="/jobs" className="block">
                  <Button variant="outline" className="w-full">
                    Voir tous les emplois
                  </Button>
                </Link>
                <Link to="/profile" className="block">
                  <Button variant="outline" className="w-full">
                    Modifier le profil
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>💡</span>
                  <span>Recommandations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Formation recommandée</h4>
                    <p className="text-sm text-yellow-800 mb-3">
                      Basé sur votre domaine ({user.field}), nous recommandons une formation en développement numérique.
                    </p>
                    <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                      En savoir plus
                    </Button>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Secteur en croissance</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      Le secteur Technologie connaît une croissance de +25%. Parfait pour votre profil !
                    </p>
                    <Link to="/sectors/technology">
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                        Explorer
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🏆</span>
                  <span>Récompenses</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gold-50 rounded-lg">
                    <div className="text-2xl">🥉</div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Explorateur débutant</p>
                      <p className="text-xs text-gray-600">Premier emploi exploré</p>
                    </div>
                  </div>
                  
                  {user.progress.profileComplete >= 50 && (
                    <div className="flex items-center space-x-3 p-3 bg-silver-50 rounded-lg">
                      <div className="text-2xl">🥈</div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Profil actif</p>
                        <p className="text-xs text-gray-600">50% du profil complété</p>
                      </div>
                    </div>
                  )}

                  {favorites.length >= 3 && (
                    <div className="flex items-center space-x-3 p-3 bg-gold-50 rounded-lg">
                      <div className="text-2xl">🏅</div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Collectionneur</p>
                        <p className="text-xs text-gray-600">3+ emplois en favoris</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;