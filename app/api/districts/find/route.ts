import { NextResponse } from 'next/server';
import { findDistrictForWell } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { latitude, longitude } = await request.json();

        if (!latitude || !longitude) {
            return NextResponse.json(
                { error: 'Latitude and longitude are required' },
                { status: 400 }
            );
        }

        const district = await findDistrictForWell(latitude, longitude);

        if (!district) {
            return NextResponse.json(
                { error: 'No district found for these coordinates' },
                { status: 404 }
            );
        }

        return NextResponse.json(district);
    } catch (error) {
        console.error('Error finding district:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
