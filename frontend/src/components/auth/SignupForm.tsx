import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ArrowRight } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { signUp } from '../../api/api';




export default function SignupForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  
  const navigate = useNavigate();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {

      await signUp({name,email,password});
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSignUp}>
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
          Account created successfully! Redirecting to login...
        </div>
      )}
      
      <Input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        icon={<User size={18} />}
        required
      />
      
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        icon={<Mail size={18} />}
        required
      />
      
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        icon={<Lock size={18} />}
        required
      />
      
      <div className="mt-8">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading || success}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5" />
              Sign Up
            </span>
          )}
        </Button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <button
            type="button" 
            onClick={() => navigate('/login')}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors inline-flex items-center"
          >
            Login here
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </p>
      </div>
    </form>
  );
}