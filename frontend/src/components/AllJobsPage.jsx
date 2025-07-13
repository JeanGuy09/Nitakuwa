import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { jobs, sectors } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const AllJobsPage = () => {
  const { user, toggleFavorite, isFavorite } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  // Flatten all jobs from all sectors
  const allJobs = [];
  Object.entries(jobs).forEach(([sectorId, sectorJobs]) => {
    sectorJobs.forEach(job => {
      allJobs.push({ ...job, sectorId });
    });
  });

  // Filter and sort jobs
  const filteredJobs = allJobs
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.sector.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = selectedSector === 'all' || job.sectorId === selectedSector;
      return matchesSearch && matchesSector;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'sector':
          return a.sector.localeCompare(b.sector);
        case 'salary':
          // Extract first number from salary range for sorting
          const aSalary = parseInt(a.salaryRange.match(/\d+/)?.[0] || '0');
          const bSalary = parseInt(b.salaryRange.match(/\d+/)?.[0] || '0');
          return bSalary - aSalary;
        case 'hiring':
          const aHiring = parseInt(a.hiringRate.replace('%', ''));
          const bHiring = parseInt(b.hiringRate.replace('%', ''));
          return bHiring - aHiring;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Toutes les opportunités de carrière
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Découvrez {allJobs.length} opportunités d'emploi dans tous les secteurs clés de la RDC
            </p>

            {/* Search and Filters */}
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="md:col-span-1">
                <Input
                  type="text"
                  placeholder="Rechercher un emploi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les secteurs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les secteurs</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.id} value={sector.id}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Titre</SelectItem>
                    <SelectItem value="sector">Secteur</SelectItem>
                    <SelectItem value="salary">Salaire</SelectItem>
                    <SelectItem value="hiring">Taux d'embauche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Results Info */}
            <div className="mb-8">
              <p className="text-gray-600">
                {filteredJobs.length} emploi{filteredJobs.length !== 1 ? 's' : ''} trouvé{filteredJobs.length !== 1 ? 's' : ''}
                {searchTerm && ` pour "${searchTerm}"`}
                {selectedSector !== 'all' && ` dans ${sectors.find(s => s.id === selectedSector)?.name}`}
              </p>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2 text-pink-600 border-pink-200">
                            {job.sector}
                          </Badge>
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors mb-2">
                            {job.title}
                          </CardTitle>
                        </div>
                        {user && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(job.id)}
                            className={`text-xl ${isFavorite(job.id) ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-500`}
                          >
                            {isFavorite(job.id) ? '❤️' : '🤍'}
                          </Button>
                        )}
                      </div>
                      <CardDescription className="text-sm leading-relaxed line-clamp-3">
                        {job.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Key Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-green-50 rounded-lg p-3 text-center">
                            <div className="text-sm font-semibold text-green-700">{job.salaryRange}</div>
                            <div className="text-xs text-gray-600">Salaire</div>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3 text-center">
                            <div className="text-sm font-semibold text-blue-700">{job.hiringRate}</div>
                            <div className="text-xs text-gray-600">Embauche</div>
                          </div>
                        </div>

                        {/* Skills Preview */}
                        <div>
                          <div className="text-xs text-gray-600 mb-2">Compétences requises</div>
                          <div className="flex flex-wrap gap-1">
                            {job.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs px-2 py-1">
                                +{job.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Companies */}
                        <div>
                          <div className="text-xs text-gray-600 mb-2">Entreprises</div>
                          <div className="text-xs text-gray-800">
                            {job.companies.slice(0, 2).join(', ')}
                            {job.companies.length > 2 && ` +${job.companies.length - 2}`}
                          </div>
                        </div>

                        {/* Testimonial Preview */}
                        {job.testimonials && job.testimonials.length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <Avatar className="w-6 h-6 flex-shrink-0">
                                <AvatarImage src={job.testimonials[0].image} alt={job.testimonials[0].name} />
                                <AvatarFallback className="text-xs">{job.testimonials[0].name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-600 italic line-clamp-2">
                                  "{job.testimonials[0].quote.substring(0, 60)}..."
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  - {job.testimonials[0].name}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* CTA */}
                        <Link to={`/jobs/${job.id}`}>
                          <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-sm">
                            Voir les détails
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun emploi trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche ou explorez tous les secteurs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSector('all');
                    }}
                    variant="outline"
                  >
                    Effacer les filtres
                  </Button>
                  <Link to="/sectors">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                      Explorer par secteur
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      {!user && (
        <section className="py-16 bg-pink-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Envie de sauvegarder vos emplois favoris ?
            </h2>
            <p className="text-gray-600 mb-6">
              Créez un compte gratuit pour suivre votre progression et recevoir des recommandations personnalisées.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8">
                Créer un compte gratuit
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default AllJobsPage;