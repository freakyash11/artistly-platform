"use client";

import { useState } from 'react';
import OnboardingForm from '@/components/onboard/OnboardingForm';

// Type definition for form data
interface ArtistFormData {
  name: string;
  bio: string;
  categories: string[];
  languages: string[];
  feeRange: string;
  profileImage?: File;
  location: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    status: string;
  };
  errors?: string[];
}

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Custom submit handler for the form
  const handleFormSubmit = async (data: ArtistFormData) => {
    setIsSubmitting(true);
    setSubmissionResult({ type: null, message: '' });
    
    try {
      // Prepare form data for API submission
      const formDataToSubmit = {
        ...data,
        profileImage: data.profileImage ? data.profileImage.name : null,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch('/api/artists/onboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit application');
      }

      if (result.success) {
        setSubmissionResult({
          type: 'success',
          message: `Application submitted successfully!`,
        });



        // Show success toast notification
        console.log('✅ Application submitted successfully:', result.data);
        
      } else {
        throw new Error(result.message || 'Submission failed');
      }
      
    } catch (error) {
      console.error('❌ Error submitting application:', error);
      
      setSubmissionResult({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  const dismissAlert = () => {
    setSubmissionResult({ type: null, message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Component */}
          <OnboardingForm 
            onSubmit={handleFormSubmit}
            isLoading={isSubmitting}
          />

          {/* Status Information */}
          {isSubmitting && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-blue-700 font-medium">Processing your application...</span>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-12 text-center text-gray-500">
            <p className="mb-2">
              By submitting this form, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline transition-colors">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:underline transition-colors">Privacy Policy</a>
            </p>
            <p className="text-sm">
              Need help? Contact us at{' '}
              <a href="mailto:support@artisthub.com" className="text-blue-600 hover:underline transition-colors">
                support@artisthub.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}