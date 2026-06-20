export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-foreground mb-6">
        Datenschutzerklärung
      </h1>
      <div className="text-sm text-foreground/80 space-y-4 leading-relaxed">
        <p>
          Diese Demo-Anwendung verarbeitet nur die für die Sprachinteraktion
          notwendigen Daten. Es werden keine personenbezogenen Daten dauerhaft
          gespeichert oder an Dritte weitergegeben.
        </p>
        <p>
          Die Sprachverarbeitung erfolgt über die VAPI-Plattform. Die
          Übertragung erfolgt verschlüsselt. Wir speichern keine
          Gesprächsaufzeichnungen.
        </p>
        <p>
          Die optionale E-Mail-Adresse wird nur für die Zusendung einer
          Gesprächsanalyse verwendet und nicht an Dritte weitergegeben.
        </p>
        <p>
          Stand: Juni 2026.
        </p>
      </div>
    </div>
  );
}
