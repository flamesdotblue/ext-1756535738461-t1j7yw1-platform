import { FileText, Trash2 } from 'lucide-react';

function currency(n) {
  if (Number.isNaN(n) || n === undefined || n === null) return '$0';
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

export default function CommissionTable({ scenarios = [] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <FileText className="h-5 w-5 text-white/80" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">Saved Scenarios</h3>
            <p className="text-xs text-white/60">Recent calculations you saved</p>
          </div>
        </div>
      </div>
      {scenarios.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="space-y-3">
          {scenarios.map((s) => (
            <li key={s.id} className="rounded-xl bg-black/30 ring-1 ring-white/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-xs text-white/50">Gross: {currency(s.gross)} • Net to Agent: {currency(s.netToAgent)}</p>
                </div>
                <button
                  title="Remove"
                  onClick={(e) => {
                    e.currentTarget.closest('li')?.remove();
                  }}
                  className="rounded-md border border-white/10 p-2 text-white/70 hover:bg-white/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-white/15 p-6 text-center">
      <p className="text-white/70">No scenarios yet. Use the calculator to save your first one.</p>
    </div>
  );
}
