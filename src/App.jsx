import { useState } from 'react';
import Hero from './components/Hero';
import CommissionCalculator from './components/CommissionCalculator';
import CommissionTable from './components/CommissionTable';
import Footer from './components/Footer';

export default function App() {
  const [scenarios, setScenarios] = useState([]);

  const handleSaveScenario = (scenario) => {
    setScenarios((prev) => [
      { id: crypto.randomUUID(), date: new Date().toISOString(), ...scenario },
      ...prev,
    ].slice(0, 6));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <CommissionCalculator onSave={handleSaveScenario} />
          </div>
          <div className="lg:col-span-2">
            <CommissionTable scenarios={scenarios} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
