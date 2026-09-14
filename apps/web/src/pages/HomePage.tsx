import { Header } from '../components/Header';
import { HomeHero } from '../components/HomeHero';

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <HomeHero />
    </div>
  );
}
