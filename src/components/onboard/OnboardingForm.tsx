"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, User, Briefcase, Globe, IndianRupee, MapPin, CheckCircle } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(500, 'Bio must be less than 500 characters'),
  categories: z.array(z.string()).min(1, 'Please select at least one category'),
  languages: z.array(z.string()).min(1, 'Please select at least one language'),
  feeRange: z.string().min(1, 'Please select a fee range'),
  profileImage: z.any().optional(),
  location: z.string().min(2, 'Location must be at least 2 characters'),
});

type FormData = z.infer<typeof formSchema>;

const CATEGORIES = [
  'Singers',
  'Dancers',
  'Speakers',
  'DJs'
];

const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Chinese',
  'Japanese',
  'Korean',
  'Arabic',
  'Hindi',
  'Russian'
];

const FEE_RANGES = [
  'Rs50 - Rs200',
  'Rs200 - Rs500',
  'Rs500 - Rs1,000',
  'Rs1,000 - Rs2,500',
  'Rs2,500 - Rs5,000',
  'Rs5,000+'
];

interface OnboardingFormProps {
  onSubmit?: (data: FormData) => void;
  isLoading?: boolean;
}

export default function OnboardingForm({ onSubmit, isLoading = false }: OnboardingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      languages: [],
      feeRange: '',
      name: '',
      bio: '',
      location: ''
    }
  });

  const watchedCategories = watch('categories');
  const watchedLanguages = watch('languages');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('profileImage', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = watchedCategories || [];
    if (checked) {
      setValue('categories', [...currentCategories, category]);
    } else {
      setValue('categories', currentCategories.filter(c => c !== category));
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const currentLanguages = watchedLanguages || [];
    if (checked) {
      setValue('languages', [...currentLanguages, language]);
    } else {
      setValue('languages', currentLanguages.filter(l => l !== language));
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Artist Onboarding Data:', {
          ...data,
          profileImage: data.profileImage ? `File: ${data.profileImage.name}` : 'No image uploaded'
        });
      }
      
      setIsSubmitted(true);
      reset();
      setProfileImagePreview(null);
      
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewApplication = () => {
    setIsSubmitted(false);
    reset();
    setProfileImagePreview(null);
  };

  if (isSubmitted) {
    return (
      <Card className="text-center max-w-lg mx-auto">
        <CardContent className="pt-6">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-green-700 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in joining our platform. We'll review your application and get back to you soon.
          </p>
          <Button 
            onClick={handleNewApplication} 
            variant="outline"
            className="mt-2"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Artist Onboarding</CardTitle>
        <CardDescription className="text-center">
          Join our creative community by sharing your artistic journey with us
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          
          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b pb-2">
              <User className="h-5 w-5 text-blue-500" />
              <h3 className="text-xl font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="City, Country"
                    className={`pl-10 ${errors.location ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                {...register('bio')}
                placeholder="Tell us about yourself, your artistic journey, and what inspires you..."
                rows={4}
                className={errors.bio ? 'border-red-500' : ''}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
              <p className="text-sm text-gray-500">10-500 characters</p>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b pb-2">
              <Briefcase className="h-5 w-5 text-green-500" />
              <h3 className="text-xl font-semibold">Professional Information</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Categories * (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {CATEGORIES.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={watchedCategories?.includes(category) || false}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={category} className="text-sm font-normal">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.categories && (
                  <p className="text-sm text-red-500 mt-1">{errors.categories.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Fee Range *</Label>
                <Controller
                  name="feeRange"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.feeRange ? 'border-red-500' : ''}>
                        <IndianRupee className="h-4 w-4 mr-2 text-gray-400" />
                        <SelectValue placeholder="Select your fee range" />
                      </SelectTrigger>
                      <SelectContent>
                        {FEE_RANGES.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.feeRange && (
                  <p className="text-sm text-red-500">{errors.feeRange.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Languages & Media Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b pb-2">
              <Globe className="h-5 w-5 text-purple-500" />
              <h3 className="text-xl font-semibold">Languages & Media</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Languages Spoken * (Select all that apply)</Label>
                <div className="grid grid-cols-3 gap-4 mt-2 max-h-48 overflow-y-auto border rounded-md p-4">
                  {LANGUAGES.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={watchedLanguages?.includes(language) || false}
                        onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                      />
                      <Label htmlFor={language} className="text-sm font-normal">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.languages && (
                  <p className="text-sm text-red-500 mt-1">{errors.languages.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image (Optional)</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                  </div>
                  {profileImagePreview && (
                    <div className="flex-shrink-0">
                      <img
                        src={profileImagePreview}
                        alt="Profile preview"
                        className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">Upload a professional headshot (JPG, PNG, max 5MB)</p>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-6 border-t">
            <Button 
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isSubmitting || isLoading}
              className="w-full h-12 text-lg hover:cursor-pointer"
            >
              {(isSubmitting || isLoading) ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
              ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Submit Application
              </>
              )}
            </Button>
          </div>

          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                Please fix the errors above before submitting your application.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}