"use client";
import React, { useEffect } from "react";
import { useABTest } from "@/lib/ab-testing";
import { useFormAnalytics } from "@/lib/analytics";
import ModernLeadForm from "./ModernLeadForm";

interface ABTestLeadFormProps {
  interestDefault?: string;
}

export default function ABTestLeadForm({ interestDefault }: ABTestLeadFormProps) {
  const { variant, variantId, trackConversion } = useABTest('form_design_test');
  const { trackStart, trackSuccess } = useFormAnalytics('lead_form_ab_test');

  const handleSuccess = () => {
    trackSuccess(100); // Assign conversion value
    trackConversion('form_submission', 100);
  };

  // Track test start
  useEffect(() => {
    trackStart({ variant: variantId });
  }, [variantId, trackStart]);

  if (variantId === 'modern') {
    return (
      <ModernLeadForm
        interestDefault={interestDefault}
        variant={variant.variant}
        onSuccess={handleSuccess}
      />
    );
  }

  // Control variant - basic form
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleSuccess}
            >
              {variant.buttonText || 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
