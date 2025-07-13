import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, updateProgress } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: user?.university || '',
    year: user?.year || '',
    field: user?.field || ''
  });

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

  const universities = [
    'Université de Kinshasa',
    'Université de Lubumbashi',
    'Université de Kisangani',
    'Université Pédagogique Nationale',
    'Université Protestante au Congo',
    'Institut Supérieur de Commerce',
    'Institut Supérieur des Techniques Appliquées',
    'Université Libre des Pays des Grands Lacs',
    'Université Simon Kimbangu',
    'Autre'
  ];

  const years = [
    'Première année',
    'Deuxième année',
    'Troisième année',
    'Quatrième année',
    'Cinquième année',
    'Master',
    'Doctorat',
    'Diplômé'
  ];

  const fields = [
    'Informatique / Technologies',
    'Médecine / Santé',
    'Ingénierie',
    'Économie / Gestion',
    'Droit',
    'Sciences Sociales',
    'Éducation / Pédagogie',
    'Arts / Communication',
    'Agriculture',
    'Géologie / Mines',
    'Autre'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    toast({
      title: "Profil mis à jour !",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
    
    // Update progress if profile completion improved
    const completedFields = Object.values(formData).filter(value => value && value.trim()).length;
    const totalFields = Object.keys(formData).length;
    const newCompletionPercentage = Math.round((completedFields / totalFields) * 100);
    
    if (newCompletionPercentage > user.progress.profileComplete) {
      updateProgress({ profileComplete: newCompletionPercentage });
    }
    
    setIsEditing(false);
  };

  const getCompletionPercentage = () => {
    const completedFields = Object.values(formData).filter(value => value && value.trim()).length;
    const totalFields = Object.keys(formData).length;
    return Math.round((completedFields / totalFields) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-rose-500 text-white text-3xl">
                  {user.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Mon Profil
                </h1>
                <p className="text-gray-600 mb-4">
                  Gérez vos informations personnelles et suivez votre progression
                </p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-pink-100 text-pink-700">
                    Étudiant KONGENGA
                  </Badge>
                  <Badge variant="outline">
                    Profil {getCompletionPercentage()}% complété
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>
                      Mettez à jour vos informations pour améliorer vos recommandations
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={isEditing ? "bg-pink-500 hover:bg-pink-600 text-white" : ""}
                  >
                    {isEditing ? 'Sauvegarder' : 'Modifier'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>

                {/* Academic Information */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations académiques</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="university">Université / Institution</Label>
                      {isEditing ? (
                        <Select value={formData.university} onValueChange={(value) => handleSelectChange('university', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre université" />
                          </SelectTrigger>
                          <SelectContent>
                            {universities.map((university) => (
                              <SelectItem key={university} value={university}>
                                {university}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input value={formData.university} disabled className="bg-gray-50" />
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="year">Niveau d'études</Label>
                        {isEditing ? (
                          <Select value={formData.year} onValueChange={(value) => handleSelectChange('year', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez votre niveau" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input value={formData.year} disabled className="bg-gray-50" />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="field">Domaine d'études</Label>
                        {isEditing ? (
                          <Select value={formData.field} onValueChange={(value) => handleSelectChange('field', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez votre domaine" />
                            </SelectTrigger>
                            <SelectContent>
                              {fields.map((field) => (
                                <SelectItem key={field} value={field}>
                                  {field}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input value={formData.field} disabled className="bg-gray-50" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex justify-end space-x-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setFormData({
                            name: user.name || '',
                            email: user.email || '',
                            university: user.university || '',
                            year: user.year || '',
                            field: user.field || ''
                          });
                          setIsEditing(false);
                        }}
                      >
                        Annuler
                      </Button>
                      <Button 
                        onClick={handleSave}
                        className="bg-pink-500 hover:bg-pink-600 text-white"
                      >
                        Sauvegarder les modifications
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progression du profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Complété</span>
                      <span className="text-sm text-gray-500">{getCompletionPercentage()}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"
                        style={{ width: `${getCompletionPercentage()}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className={formData.name ? "text-green-600" : "text-gray-400"}>
                        {formData.name ? "✓" : "○"}
                      </span>
                      <span>Nom complet</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={formData.email ? "text-green-600" : "text-gray-400"}>
                        {formData.email ? "✓" : "○"}
                      </span>
                      <span>Adresse email</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={formData.university ? "text-green-600" : "text-gray-400"}>
                        {formData.university ? "✓" : "○"}
                      </span>
                      <span>Université</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={formData.year ? "text-green-600" : "text-gray-400"}>
                        {formData.year ? "✓" : "○"}
                      </span>
                      <span>Niveau d'études</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={formData.field ? "text-green-600" : "text-gray-400"}>
                        {formData.field ? "✓" : "○"}
                      </span>
                      <span>Domaine d'études</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Résumé d'activité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Emplois explorés</span>
                    <Badge variant="secondary">{user.progress.jobsExplored}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Formations démarrées</span>
                    <Badge variant="secondary">{user.progress.trainingsStarted}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Emplois favoris</span>
                    <Badge variant="secondary">{user.favoriteJobs?.length || 0}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/dashboard" className="block">
                  <Button variant="outline" className="w-full">
                    Voir le tableau de bord
                  </Button>
                </Link>
                <Link to="/favorites" className="block">
                  <Button variant="outline" className="w-full">
                    Mes favoris
                  </Button>
                </Link>
                <Link to="/sectors" className="block">
                  <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                    Explorer les secteurs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;