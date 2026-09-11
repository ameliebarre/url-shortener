import { SignupForm } from '../components/SignupForm';
import { SignupHero } from '../components/SignupHero';

export function SignupPage() {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <SignupForm />
      <SignupHero />
    </div>
  );
}
