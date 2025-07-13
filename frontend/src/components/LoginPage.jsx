import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

const LoginPage = () => {
  const [studentForm, setStudentForm] = useState({ email: '', password: '' });
  const [managerForm, setManagerForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(studentForm.email, studentForm.password, 'student');
      if (result.success) {
        toast({
          title: "Connexion réussie !",
          description: `Bienvenue ${result.user.name}`,
        });
        navigate('/dashboard');
      } else {
        setError(result.error || 'Erreur de connexion');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleManagerLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(managerForm.email, managerForm.password, 'manager');
      if (result.success) {
        toast({
          title: "Connexion administrateur réussie !",
          description: `Bienvenue ${result.user.name}`,
        });
        navigate('/admin');
      } else {
        setError(result.error || 'Identifiants administrateur invalides');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Connexion à KONGENGA
          </h1>
          <p className="text-gray-600">
            Accédez à votre espace personnel pour continuer votre parcours professionnel
          </p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white">
            <TabsTrigger 
              value="student" 
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              Étudiant
            </TabsTrigger>
            <TabsTrigger 
              value="manager" 
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              Gestionnaire
            </TabsTrigger>
          </TabsList>

          {/* Student Login */}
          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Connexion Étudiant</CardTitle>
                <CardDescription>
                  Connectez-vous pour accéder à votre tableau de bord personnel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="votre.email@example.com"
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Mot de passe</Label>
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="Votre mot de passe"
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                      required
                    />
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
                    {loading ? 'Connexion...' : 'Se connecter'}
                  </Button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600">
                      Pas encore de compte ?{' '}
                      <Link to="/register" className="text-pink-600 hover:text-pink-700 font-medium">
                        Créer un compte
                      </Link>
                    </p>
                  </div>
                </form>

                {/* Demo Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Mode démonstration</h4>
                  <p className="text-sm text-blue-800">
                    Entrez n'importe quelle adresse email pour créer un compte de démonstration automatiquement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manager Login */}
          <TabsContent value="manager">
            <Card>
              <CardHeader>
                <CardTitle>Connexion Gestionnaire</CardTitle>
                <CardDescription>
                  Accès réservé aux gestionnaires du site pour la gestion de contenu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManagerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="manager-email">Email administrateur</Label>
                    <Input
                      id="manager-email"
                      type="email"
                      placeholder="admin@careerplatform.cd"
                      value={managerForm.email}
                      onChange={(e) => setManagerForm({ ...managerForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager-password">Mot de passe administrateur</Label>
                    <Input
                      id="manager-password"
                      type="password"
                      placeholder="Mot de passe administrateur"
                      value={managerForm.password}
                      onChange={(e) => setManagerForm({ ...managerForm, password: e.target.value })}
                      required
                    />
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
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    disabled={loading}
                  >
                    {loading ? 'Connexion...' : 'Accès gestionnaire'}
                  </Button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">🔑 Identifiants de démonstration</h4>
                  <div className="text-sm text-orange-800 space-y-1">
                    <p><strong>Email:</strong> admin@careerplatform.cd</p>
                    <p><strong>Mot de passe:</strong> admin123</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Link to="/" className="text-pink-600 hover:text-pink-700 font-medium">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;