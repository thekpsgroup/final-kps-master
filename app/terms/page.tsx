import GlassCard from '@/components/ui/GlassCard';

export default function TermsPage() {
  return (
    <section className="py-24">
      <div className="container">
        <GlassCard className="p-8 md:p-12 max-w-3xl mx-auto border border-black/5 shadow-glass">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6">
            Terms of Service
          </h1>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              These terms of service govern your use of The KPS Group website and services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our website and services, you agree to these terms and our privacy policy. If
              you do not agree to these terms, please do not use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our services are provided &quot;as is&quot; without warranties of any kind. We strive
              to provide accurate and helpful information, but we cannot guarantee that our services
              will be error-free or uninterrupted.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of our services
              after changes constitutes acceptance of the new terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For questions about these terms, please contact us at sales@thekpsgroup.com.
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
