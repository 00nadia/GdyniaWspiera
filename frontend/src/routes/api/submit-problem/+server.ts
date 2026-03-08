import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.firstName || !data.email || !data.category || !data.problemDescription) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email format' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Here you would typically:
        // 1. Save to database
        // 2. Send confirmation email
        // 3. Notify admin
        // For now, we'll just log and return success

        console.log('Problem submission received:', {
            timestamp: new Date().toISOString(),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            category: data.category,
            problemDescription: data.problemDescription,
            additionalDetails: data.additionalDetails
        });

        // TODO: Integrate with database
        // TODO: Send email notifications
        // TODO: Store submission for admin review

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Problem submission received successfully'
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Error processing problem submission:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
