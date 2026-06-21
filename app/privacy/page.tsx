export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-foreground mb-6">
        Privacy Policy
      </h1>
      <div className="text-sm text-foreground/80 space-y-4 leading-relaxed">
        <p>
          This demo application processes only the data required for the voice
          interaction. No personal data is stored permanently or shared with
          third parties.
        </p>
        <p>
          Voice processing is handled through the Vapi platform. Transmission is
          encrypted. We do not store call recordings.
        </p>
        <p>
          The optional email address is used only to send a conversation
          summary and is not shared with third parties.
        </p>
        <p>
          Updated June 2026.
        </p>
      </div>
    </div>
  );
}
