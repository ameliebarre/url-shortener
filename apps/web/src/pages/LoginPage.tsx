import { LoginForm } from '../components/LoginForm';
import { SignupHero } from '../components/SignupHero';

export function LoginPage() {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <LoginForm />
      <SignupHero />
    </div>
  );
}
