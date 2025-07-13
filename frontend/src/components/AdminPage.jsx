import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { sectors, jobs, statistics } from '../data/mockData';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const { user } = useAuth();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  if (!user || user.role !== 'site_manager') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
          <p className="text-gray-600 mb-4">Cette page est réservée aux gestionnaires du site.</p>
          <Link to="/login">
            <Button>Se connecter</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Flatten all jobs for management
  const allJobs = [];
  Object.entries(jobs).forEach(([sectorId, sectorJobs]) => {
    sectorJobs.forEach(job => {
      allJobs.push({ ...job, sectorId });
    });
  });

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Gestion du site KONGENGA
            </h1>
            <p className="text-xl opacity-90">
              Panneau d'administration pour gérer le contenu et les données du site
            </p>
            <div className="mt-6">
              <Badge className="bg-white text-orange-600 px-4 py-2">
                Gestionnaire: {user.name}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white h-12">
              <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Aperçu
              </TabsTrigger>
              <TabsTrigger value="jobs" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Gestion des emplois
              </TabsTrigger>
              <TabsTrigger value="sectors" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Secteurs
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Utilisateurs
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Emplois</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{statistics.totalJobs}</div>
                    <p className="text-xs text-gray-500">Across all sectors</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Étudiants Inscrits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{statistics.totalStudents}</div>
                    <p className="text-xs text-gray-500">Active users</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Entreprises Partenaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">{statistics.totalCompanies}</div>
                    <p className="text-xs text-gray-500">Partner companies</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Histoires de Réussite</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">{statistics.successStories}</div>
                    <p className="text-xs text-gray-500">Success stories</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Croissance par secteur</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sectors.map((sector) => (
                        <div key={sector.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{sector.icon}</span>
                            <span className="font-medium">{sector.name}</span>
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            {sector.growth}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Ajouter un nouvel emploi
                    </Button>
                    <Button variant="outline" className="w-full">
                      Importer des données CSV
                    </Button>
                    <Button variant="outline" className="w-full">
                      Exporter les statistiques
                    </Button>
                    <Button variant="outline" className="w-full">
                      Gérer les témoignages
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Jobs Management Tab */}
            <TabsContent value="jobs" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des emplois</h2>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  + Ajouter un emploi
                </Button>
              </div>

              <div className="grid gap-6">
                {allJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            <Badge variant="outline">{job.sector}</Badge>
                          </div>
                          <CardDescription className="text-sm">
                            {job.description.substring(0, 150)}...
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditJob(job)}
                          >
                            Modifier
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Salaire:</span>
                          <div className="font-medium">{job.salaryRange}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Taux d'embauche:</span>
                          <div className="font-medium">{job.hiringRate}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Entreprises:</span>
                          <div className="font-medium">{job.companies.length}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Formations:</span>
                          <div className="font-medium">{job.training.length}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Sectors Management Tab */}
            <TabsContent value="sectors" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des secteurs</h2>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  + Ajouter un secteur
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectors.map((sector) => (
                  <Card key={sector.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sector.color} flex items-center justify-center text-xl`}>
                          {sector.icon}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Modifier
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{sector.name}</CardTitle>
                      <CardDescription>{sector.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Emplois:</span>
                          <span className="font-medium">{sector.jobCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Croissance:</span>
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            {sector.growth}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Users Management Tab */}
            <TabsContent value="users" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h2>
                <div className="flex space-x-3">
                  <Button variant="outline">
                    Exporter la liste
                  </Button>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Inviter des utilisateurs
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques des utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-2">1,547</div>
                      <div className="text-gray-600">Étudiants inscrits</div>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">423</div>
                      <div className="text-gray-600">Utilisateurs actifs ce mois</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
                      <div className="text-gray-600">Nouveaux cette semaine</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Actions de modération</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Examiner les témoignages en attente
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Modérer les commentaires
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Gérer les signalements
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Envoyer une newsletter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;