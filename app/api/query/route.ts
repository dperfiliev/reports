export async function POST(request: Request) {
    const data = await request.json();

    const query = data.query;
    const recaptchaToken = data.recaptchaToken;

    const params = new URLSearchParams();
    params.append('secret', process.env.RECAPTCHA_SECRET_KEY || '');
    params.append('response', recaptchaToken);

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });

    const jsonRes = await res.json();

    if (!jsonRes.success) {
        return new Response(JSON.stringify({ error: 'reCAPTCHA verification failed' }), { status: 400 });
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}/query`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query }),
        });

        if (!response.ok) {
            response.text().then(text => { throw new Error(text) })
        }

        const aiResponse = await response.json();

        return new Response(JSON.stringify(aiResponse), { status: 200 });
    } catch (error: any) {
        console.error('Ошибка при отправке запроса:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
