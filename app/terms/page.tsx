export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-foreground mb-6">
        Nutzungsbedingungen
      </h1>
      <div className="text-sm text-foreground/80 space-y-4 leading-relaxed">
        <p>
          Diese Demo-Anwendung wird ausschließlich zu Präsentationszwecken im
          Rahmen eines Hackathons bereitgestellt.
        </p>
        <p>
          Die Anwendung nutzt die VAPI-Plattform für Sprachinteraktionen. Es
          werden ausschließlich die für die Sprachverarbeitung notwendigen Daten
          übertragen. Es erfolgt keine dauerhafte Speicherung von
          Gesprächsinhalten durch uns.
        </p>
        <p>
          Die Nutzung der Demo erfolgt auf eigene Verantwortung. Wir
          übernehmen keine Haftung für Schäden, die durch die Nutzung dieser
          Demo entstehen.
        </p>
        <p>
          Alle Rechte vorbehalten. Stand: Juni 2026.
        </p>
      </div>
    </div>
  );
}
