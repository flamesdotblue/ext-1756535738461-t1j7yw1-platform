import { useMemo, useState } from 'react';
import { Calculator, Save, RefreshCw } from 'lucide-react';

function currency(n) {
  if (Number.isNaN(n) || n === undefined || n === null) return '$0';
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

function pct(n) {
  if (Number.isNaN(n) || n === undefined || n === null) return '0%';
  return `${(n * 100).toFixed(2)}%`;
}

export default function CommissionCalculator({ onSave }) {
  const [salePrice, setSalePrice] = useState(750000);
  const [ratePct, setRatePct] = useState(0.03); // your side
  const [splitToAgentPct, setSplitToAgentPct] = useState(0.8); // 80% to agent
  const [referralPct, setReferralPct] = useState(0);
  const [transactionFee, setTransactionFee] = useState(250);
  const [otherDeductions, setOtherDeductions] = useState(0);

  const calc = useMemo(() => {
    const price = Number(salePrice) || 0;
    const gross = price * (Number(ratePct) || 0);
    const referral = gross * (Number(referralPct) || 0);
    const netBeforeSplit = gross - referral;
    const agentSplit = netBeforeSplit * (Number(splitToAgentPct) || 0);
    const netToAgent = agentSplit - (Number(transactionFee) || 0) - (Number(otherDeductions) || 0);
    const brokerageSplit = netBeforeSplit - agentSplit;

    return {
      price,
      ratePct: Number(ratePct) || 0,
      splitToAgentPct: Number(splitToAgentPct) || 0,
      referralPct: Number(referralPct) || 0,
      transactionFee: Number(transactionFee) || 0,
      otherDeductions: Number(otherDeductions) || 0,
      gross,
      referral,
      netBeforeSplit,
      agentSplit,
      brokerageSplit,
      netToAgent,
    };
  }, [salePrice, ratePct, splitToAgentPct, referralPct, transactionFee, otherDeductions]);

  const reset = () => {
    setSalePrice(750000);
    setRatePct(0.03);
    setSplitToAgentPct(0.8);
    setReferralPct(0);
    setTransactionFee(250);
    setOtherDeductions(0);
  };

  const handleSave = () => {
    onSave?.({
      title: `Listing ${calc.price.toLocaleString()}`,
      ...calc,
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
          <Calculator className="h-5 w-5 text-emerald-300" />
        </span>
        <div>
          <h2 className="text-xl font-semibold">Commission Calculator</h2>
          <p className="text-white/60 text-sm">Compute splits, referrals, and fees with live results.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Sale Price" prefix="$">
          <input
            inputMode="decimal"
            value={salePrice}
            onChange={(e) => setSalePrice(Number(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
            className="w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-emerald-400/60"
          />
        </Field>
        <Field label="Your Commission Rate" suffix="%">
          <input
            inputMode="decimal"
            value={(ratePct * 100).toString()}
            onChange={(e) => setRatePct((Number(e.target.value) || 0) / 100)}
            className="w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-emerald-400/60"
          />
        </Field>
        <Field label="Your Split (Agent)" suffix="%">
          <input
            inputMode="decimal"
            value={(splitToAgentPct * 100).toString()}
            onChange={(e) => setSplitToAgentPct((Number(e.target.value) || 0) / 100)}
            className="w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-emerald-400/60"
          />
        </Field>
        <Field label="Referral Fee" suffix="%">
          <input
            inputMode="decimal"
            value={(referralPct * 100).toString()}
            onChange={(e) => setReferralPct((Number(e.target.value) || 0) / 100)}
            className="w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-emerald-400/60"
          />
        </Field>
        <Field label="Transaction Fee" prefix="$">
          <input
            inputMode="decimal"
            value={transactionFee}
            onChange={(e) => setTransactionFee(Number(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
            className="w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-emerald-400/60"
          />
        </Field>
        <Field label="Other Deductions" prefix="$">
          <input
            inputMode="decimal"
            value={otherDeductions}
            onChange={(e) => setOtherDeductions(Number(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
            className="w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-emerald-400/60"
          />
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryItem label="Gross Commission" value={currency(calc.gross)} highlight />
        <SummaryItem label="Referral Deduction" value={`- ${currency(calc.referral)}`} />
        <SummaryItem label="Brokerage Split" value={`${pct(1 - calc.splitToAgentPct)} = ${currency(calc.brokerageSplit)}`} />
        <SummaryItem label="Agent Split" value={`${pct(calc.splitToAgentPct)} = ${currency(calc.agentSplit)}`} />
        <SummaryItem label="Transaction Fee" value={`- ${currency(calc.transactionFee)}`} />
        <SummaryItem label="Other Deductions" value={`- ${currency(calc.otherDeductions)}`} />
      </div>

      <div className="mt-4 rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-white/60">Net to Agent</p>
            <p className="text-3xl font-semibold text-emerald-300">{currency(calc.netToAgent)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm hover:bg-white/10">
              <RefreshCw className="h-4 w-4" /> Reset
            </button>
            <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-400">
              <Save className="h-4 w-4" /> Save Scenario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, prefix, suffix, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wide text-white/60">{label}</span>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/60">{prefix}</span>
        )}
        {children}
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">{suffix}</span>
        )}
      </div>
    </label>
  );
}

function SummaryItem({ label, value, highlight = false }) {
  return (
    <div className={`rounded-lg px-4 py-3 ring-1 ring-white/10 ${highlight ? 'bg-emerald-500/10' : 'bg-white/5'}`}>
      <p className="text-xs text-white/60">{label}</p>
      <p className="mt-1 text-lg">{value}</p>
    </div>
  );
}
