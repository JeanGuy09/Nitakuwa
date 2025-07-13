import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { sectorsAPI, adminAPI } from '../services/api';

const HomePage = () => {
  const { user } = useAuth();
  const { t, getMultilingualText } = useLanguage();
  const [sectors, setSectors] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [sectorsData, statsData] = await Promise.all([
        sectorsAPI.getAll(),
        adminAPI.getStatistics().catch(() => ({ totalJobs: 0, totalStudents: 0, totalCompanies: 0, successStories: 0 }))
      ]);
      
      setSectors(sectorsData);
      setStatistics(statsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with animated background */}
      <section className="relative overflow-hidden">
        {/* Background gradients and animations */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.3)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(37,99,235,0.3)_0%,transparent_50%)]" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s ease-in-out infinite'
          }} />
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Large Logo with enhanced animation */}
            <div className="text-center mb-16">
              <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-8 tracking-wider relative">
                KONGENGA
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-600/20 bg-clip-text text-transparent animate-pulse" />
              </h1>
              
              {/* Animated subtitle */}
              <div className="text-2xl text-gray-400 animate-in fade-in-50 slide-in-from-bottom-10 duration-1000 delay-500">
                <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                  {t('nav.careers')} • RDC
                </span>
              </div>
            </div>

            {/* Main Content with enhanced animations */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="order-2 lg:order-1 animate-in slide-in-from-left duration-1000 delay-700">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  {t('home.title')}
                </h2>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  {t('home.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  {user ? (
                    <Link to="/dashboard">
                      <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                        {t('nav.dashboard')}
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/register">
                        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                          {t('home.cta.start')}
                        </Button>
                      </Link>
                      <Link to="/sectors">
                        <Button variant="outline" size="lg" className="px-10 py-6 text-lg border-2 border-gray-600 text-gray-300 hover:border-blue-500 hover:text-white hover:bg-blue-500/10 transition-all duration-300 hover:scale-105">
                          {t('home.cta.explore')}
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Right Illustration with enhanced 3D effect */}
              <div className="order-1 lg:order-2 flex justify-center animate-in slide-in-from-right duration-1000 delay-1000">
                <div className="relative group">
                  <div className="w-96 h-96 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-3xl backdrop-blur-sm border border-blue-500/30 flex items-center justify-center transform group-hover:scale-105 transition-all duration-500">
                    <div className="text-center">
                      <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                        <span className="text-6xl animate-bounce">💻</span>
                      </div>
                      <p className="text-gray-300 font-semibold text-lg">{t('sectors.technology')}</p>
                      <p className="text-gray-500">Construisez l'avenir</p>
                    </div>
                  </div>
                  
                  {/* Enhanced floating elements */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-bounce delay-300 hover:scale-110 transition-transform cursor-pointer">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center shadow-xl animate-bounce delay-700 hover:scale-110 transition-transform cursor-pointer">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div className="absolute top-1/2 -left-8 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-xl animate-pulse hover:scale-110 transition-transform cursor-pointer">
                    <span className="text-lg">🚀</span>
                  </div>
                  
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-3xl blur-2xl -z-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Statistics Section with enhanced design */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%233b82f6\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            width: '100%',
            height: '100%'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              KONGENGA en chiffres
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: statistics.totalJobs || 0, label: t('home.stats.jobs'), color: 'from-blue-500 to-blue-600', icon: '💼' },
              { value: statistics.totalStudents || 0, label: t('home.stats.students'), color: 'from-green-500 to-emerald-500', icon: '🎓' },
              { value: statistics.totalCompanies || 0, label: t('home.stats.companies'), color: 'from-blue-500 to-cyan-500', icon: '🏢' },
              { value: statistics.successStories || 0, label: t('home.stats.success'), color: 'from-orange-500 to-yellow-500', icon: '🏆' }
            ].map((stat, index) => (
              <div key={index} className="text-center group animate-in fade-in-50 slide-in-from-bottom duration-700" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative">
                  <div className={`text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}+
                  </div>
                  <div className="text-2xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                  
                  {/* Hover effect background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl blur-xl transition-opacity duration-300 -z-10`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section with enhanced cards */}
      <section className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Explorez les secteurs à fort impact
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Choisissez parmi les secteurs qui stimulent la croissance économique et le développement en RDC
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sectors.map((sector, index) => (
              <Card 
                key={sector.id} 
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm hover:from-gray-700 hover:to-gray-800 animate-in fade-in-50 slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${sector.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                    {sector.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
                    {getMultilingualText(sector.name)}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-base leading-relaxed">
                    {getMultilingualText(sector.description)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-400">
                          <span className="font-semibold text-white">{sector.jobCount}</span> emplois
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                        {sector.growth} croissance
                      </Badge>
                    </div>

                    <Link to={`/sectors/${sector.id}`} className="block">
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-blue-400 hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                      >
                        Explorer {getMultilingualText(sector.name)}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
                
                {/* Card background glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-500 -z-10`} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced background */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-30">
          <div style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M50 50c0-27.614 22.386-50 50-50v100c-27.614 0-50-22.386-50-50z\" fill=\"%23ffffff\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')",
            width: '100%',
            height: '100%'
          }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-bold mb-8 animate-in fade-in-50 slide-in-from-bottom duration-700">
            Prêt à commencer votre parcours professionnel ?
          </h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed animate-in fade-in-50 slide-in-from-bottom duration-700 delay-300">
            Rejoignez des milliers d'étudiants congolais qui construisent l'avenir de notre nation
          </p>
          {!user && (
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-xl font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom duration-700 delay-500">
                Créer votre compte gratuit
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Chat Widget with enhanced animation */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 animate-bounce">
            <span className="text-2xl">💬</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300 -z-10" />
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;