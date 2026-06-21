export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-foreground mb-6">
        Terms of Use
      </h1>
      <div className="text-sm text-foreground/80 space-y-4 leading-relaxed">
        <p>
          This demo application is provided for presentation purposes during a
          hackathon.
        </p>
        <p>
          The application uses the Vapi platform for voice interactions. Only
          the data required for voice processing is transmitted. We do not
          permanently store conversation content ourselves.
        </p>
        <p>
          Use of this demo is at your own risk. We assume no liability for
          damage arising from the use of this demo.
        </p>
        <p>
          All rights reserved. Updated June 2026.
        </p>
      </div>
    </div>
  );
}
