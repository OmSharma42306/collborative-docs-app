import AuthLayout from '../components/layout/AuthLayout';
import SignupForm from '../components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout 
      title="Create an Account" 
      subtitle="Join SyncSpace to start collaborating"
    >
      <SignupForm />
    </AuthLayout>
  );
}
