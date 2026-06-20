export default function AnalysisPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
        Auswertung
      </h1>
      <p className="text-muted mb-8">
        Hier siehst du deine Trainingsergebnisse und Fortschritte.
      </p>

      <div className="grid gap-6 sm:grid-cols-3 mb-8">
        {[
          { label: "Trainings absolviert", value: "0" },
          { label: "Durchschnitts-Score", value: "—" },
          { label: "Bester Score", value: "—" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-5 shadow-sm"
          >
            <p className="text-xs text-muted uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-display font-semibold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-8 shadow-sm text-center">
        <p className="text-muted">
          Noch keine Trainingsdaten vorhanden. Starte ein Training, um deine
          Ergebnisse zu sehen.
        </p>
      </div>
    </div>
  );
}
