import { NextResponse } from 'next/server';
import { queryRegulations } from '@/lib/vertex-ai';

export async function POST(request: Request) {
    try {
        const { districtId, question } = await request.json();

        if (!districtId || !question) {
            return NextResponse.json(
                { error: 'District ID and question are required' },
                { status: 400 }
            );
        }

        const result = await queryRegulations(districtId, question);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error querying regulations:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
