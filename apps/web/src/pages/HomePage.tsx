import { Header } from '../components/Header';
import { HomeHero } from '../components/HomeHero';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HomeHero />
    </div>
  );
}
