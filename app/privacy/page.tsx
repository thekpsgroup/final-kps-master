import GlassCard from '@/components/ui/GlassCard';

export default function PrivacyPage() {
  return (
    <section className="py-24">
      <div className="container">
        <GlassCard className="p-8 md:p-12 max-w-3xl mx-auto border border-black/5 shadow-glass">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              This privacy policy describes how The KPS Group collects, uses, and protects your
              information when you use our website and services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We collect information you provide directly to us, such as when you fill out contact
              forms or request consultations. This may include your name, email address, phone
              number, and any other information you choose to provide.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We use this information to respond to your inquiries, provide our services, and
              improve our website and offerings.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third
              parties without your consent, except as required by law.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For questions about this privacy policy, please contact us at sales@thekpsgroup.com.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">Last updated: August 2025</p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
