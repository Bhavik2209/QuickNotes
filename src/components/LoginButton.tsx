import { useAuth } from '../contexts/AuthContext';
import { LogIn, LogOut } from 'lucide-react';

const LoginButton = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  return user ? (
    <button
      onClick={logout}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors w-full md:w-auto justify-center md:justify-start"
    >
      <LogOut className="h-5 w-5" />
      <span>Sign Out</span>
    </button>
  ) : (
    <button
      onClick={signInWithGoogle}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-800 transition-colors w-full md:w-auto justify-center md:justify-start"
    >
      <LogIn className="h-5 w-5" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default LoginButton;