// /api/artists/onboard/route.js
import { NextResponse } from 'next/server';


// POST handler for creating new artist applications
export async function POST(request) {
  try {
    
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.bio || !body.categories || !body.languages || !body.feeRange || !body.location) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'All required fields must be filled'
        },
        { status: 400 }
      );
    }
    
    

    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        status: 'pending',
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process application. Please try again.' 
      },
      { status: 500 }
    );
  }
}

