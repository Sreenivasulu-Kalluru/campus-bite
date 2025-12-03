import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Campus Bite',
  description:
    'Terms of Service for Campus Bite. Read our terms and conditions for using our services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing our website and using our services, you agree to be
                bound by these Terms of Service. If you do not agree to any part
                of the terms, then you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                2. Use of Service
              </h2>
              <p>
                You represent and warrant that you are at least 18 years of age
                and are fully able and competent to enter into the terms,
                conditions, obligations, affirmations, representations, and
                warranties set forth in these Terms.
              </p>
              <p className="mt-2">
                You agree to use the Service only for lawful purposes and in
                accordance with these Terms. You agree not to use the Service:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  In any way that violates any applicable national or
                  international law or regulation.
                </li>
                <li>
                  To transmit, or procure the sending of, any advertising or
                  promotional material, including any "junk mail&quot;, "chain
                  letter," "spam," or any other similar solicitation.
                </li>
                <li>
                  To impersonate or attempt to impersonate the Company, a
                  Company employee, another user, or any other person or entity.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                3. Orders and Payments
              </h2>
              <p>
                All orders are subject to availability and confirmation of the
                order price. Dispatch times may vary according to availability
                and subject to any delays resulting from postal delays or force
                majeure for which we will not be responsible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                4. Intellectual Property
              </h2>
              <p>
                The Service and its original content, features and functionality
                are and will remain the exclusive property of Campus Bite and
                its licensors. The Service is protected by copyright, trademark,
                and other laws of both the India and foreign countries.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                5. Termination
              </h2>
              <p>
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms. Upon termination,
                your right to use the Service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                6. Changes to Terms
              </h2>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material we
                will try to provide at least 30 days notice prior to any new
                terms taking effect. What constitutes a material change will be
                determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                7. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
                <a
                  href="mailto:support@campusbitesvu.com"
                  className="text-indigo-600 hover:underline ml-1"
                >
                  support@campusbitesvu.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
