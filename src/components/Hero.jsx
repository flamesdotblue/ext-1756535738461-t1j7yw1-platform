import Spline from '@splinetool/react-spline';
import { Home, Calculator, DollarSign } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://my.spline.design/3dspotifyapplevisionprodesigniyyappanar-SkzN3XQXnCZIRBEtt0uj6OV6/" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      <div className="relative z-10 h-full flex items-end">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
            <Home className="h-4 w-4 text-emerald-300" />
            <span className="text-xs text-emerald-100">Real Estate • Luxury • Urban</span>
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            Commission clarity for modern realtors
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Run precise commission splits, referral deductions, and brokerage fees in seconds. Save scenarios and present clean summaries to clients and teams.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-md bg-emerald-500/90 px-4 py-2 text-sm font-medium text-black shadow">
              <Calculator className="h-4 w-4" /> Quick Calculate
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm text-white/90">
              <DollarSign className="h-4 w-4" /> Transparent breakdowns
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
