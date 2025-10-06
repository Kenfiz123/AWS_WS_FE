'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Dumbbell,
  Zap,
  Shield,
  CheckCircle
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);

      // Get user info after login
      const { user } = useAuthStore.getState();
      console.log('✅ Login successful! User role:', user?.role);

      // Redirect based on user role
      if (user) {
        if (user.role === 'CLIENT_USER') {
          // Client users go to homepage
          router.push('/');
        } else {
          // Admin, GYM_STAFF, PT_USER go to their respective dashboards
          switch (user.role) {
            case 'ADMIN':
              router.push('/dashboard/admin');
              break;
            case 'GYM_STAFF':
              router.push('/dashboard/gym-staff');
              break;
            case 'PT_USER':
              router.push('/dashboard/pt');
              break;
            default:
              router.push('/dashboard');
          }
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Show error message in UI instead of alert
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      // You can add a toast notification here or display error in the form
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Epic Background */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-600/8 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-700/10 rounded-full blur-[140px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Left Side - Brand & Features */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 animate-fade-in-up">
          {/* Brand Logo */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative h-16 w-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl flex items-center justify-center shadow-neon group-hover:shadow-neon-lg transition-all duration-500">
                  <Dumbbell className="text-white h-8 w-8 group-hover:rotate-180 transition-transform duration-500" />
                </div>
              </div>
              <div className="ml-4">
                <div className="flex items-baseline">
                  <span className="text-5xl font-black text-white tracking-tighter">VER</span>
                  <span className="text-5xl font-black text-gradient tracking-tighter">TEX</span>
                </div>
                <div className="text-sm text-gray-400 font-bold tracking-wider uppercase">Fitness Revolution</div>
              </div>
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Welcome Back to Your
                <br />
                <span className="text-gradient">FITNESS JOURNEY</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Sign in to access your personalized dashboard and continue your transformation with <span className="text-primary-400 font-bold">elite trainers</span> and <span className="text-primary-400 font-bold">premium facilities</span>.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                { icon: CheckCircle, text: 'Access to 1000+ premium gyms' },
                { icon: CheckCircle, text: 'Connect with elite personal trainers' },
                { icon: CheckCircle, text: 'Exclusive member deals & offers' },
                { icon: CheckCircle, text: 'Track your fitness progress' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-glow">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.3s' }}>

            {/* Form Container với 3D Effects */}
            <div className="relative perspective-1000">
              <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-3d-lg border border-primary-600/30 transform-3d hover:scale-[1.02] transition-all duration-500">
                {/* Animated border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 rounded-3xl opacity-20 blur-xl" />

                <div className="relative">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary-600/30 mb-6">
                      <Shield className="w-4 h-4 text-primary-500" />
                      <span className="text-sm text-primary-400 font-bold uppercase tracking-wider">Secure Login</span>
                    </div>

                    <h2 className="text-3xl font-black text-white mb-3">
                      Welcome <span className="text-gradient">Back</span>
                    </h2>
                    <p className="text-gray-400">
                      Sign in to your Vertex account to continue your fitness journey
                    </p>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500 z-10" />
                        <Input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="pl-12"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500 z-10" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="pl-12 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-500 transition-colors z-10"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors"
                      >
                        Forgot your password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary w-full btn-lg shadow-neon group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3" />
                          <span className="relative z-10 font-black">SIGNING IN...</span>
                        </div>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                          <span className="relative z-10 font-black">SIGN IN</span>
                          <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                        </>
                      )}

                      {/* Epic shine effect */}
                      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    </Button>
                  </form>

                  {/* Sign Up Link */}
                  <div className="text-center mt-8 pt-6 border-t border-dark-700/50">
                    <p className="text-gray-400 mb-4">
                      Don't have an account yet?
                    </p>
                    <Link href="/auth/register">
                      <Button variant="outline" className="btn-outline group">
                        <span className="font-bold group-hover:text-white transition-colors">Create Account</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
