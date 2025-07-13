import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    year: '',
    field: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      if (result.success) {
        toast({
          title: "Compte créé avec succès !",
          description: `Bienvenue ${result.user.name}, votre parcours professionnel commence maintenant.`,
        });
        navigate('/dashboard');
      } else {
        setError(result.error || 'Erreur lors de la création du compte');
      }
    } catch (err) {
      setError('Erreur lors de la création du compte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rejoindre KONGENGA
          </h1>
          <p className="text-gray-600">
            Créez votre compte pour commencer votre parcours professionnel en RDC
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Créer votre compte étudiant</CardTitle>
            <CardDescription>
              Complétez vos informations pour personnaliser votre expérience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jean Mukongo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jean.mukongo@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Au moins 6 caractères"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Répétez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Academic Information */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Informations académiques</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="university">Université / Institution</Label>
                    <Select onValueChange={(value) => handleSelectChange('university', value)}>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Niveau d'études</Label>
                    <Select onValueChange={(value) => handleSelectChange('year', value)}>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="field">Domaine d'études</Label>
                    <Select onValueChange={(value) => handleSelectChange('field', value)}>
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
                  </div>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                disabled={loading}
              >
                {loading ? 'Création du compte...' : 'Créer mon compte'}
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Déjà un compte ?{' '}
                  <Link to="/login" className="text-pink-600 hover:text-pink-700 font-medium">
                    Se connecter
                  </Link>
                </p>
              </div>
            </form>

            {/* Benefits */}
            <div className="mt-8 p-4 bg-pink-50 rounded-lg">
              <h4 className="font-medium text-pink-900 mb-3">🎯 Avec votre compte KONGENGA, vous pourrez :</h4>
              <ul className="text-sm text-pink-800 space-y-2">
                <li>• Sauvegarder vos emplois favoris</li>
                <li>• Suivre votre progression de carrière</li>
                <li>• Recevoir des recommandations personnalisées</li>
                <li>• Accéder à des formations spécialisées</li>
                <li>• Connecter avec des professionnels du secteur</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-pink-600 hover:text-pink-700 font-medium">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;