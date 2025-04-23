import { NextResponse } from 'next/server';

interface ChargeRequest {
  name: string;
  description: string;
  local_price: {
    amount: string;
    currency: string;
  };
}

export async function POST(req: Request) {
  try {
    const { name, description, local_price }: ChargeRequest = await req.json();
    const apiKey = process.env.COINBASE_COMMERCE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Coinbase API key not configured.' }, { status: 500 });
    }

    const response = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': apiKey,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify({
        name,
        description,
        local_price,
        pricing_type: 'fixed_price'
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Coinbase error:', data);
      return NextResponse.json({ error: data.error?.message || 'Coinbase charge creation failed.' }, { status: 500 });
    }

    // Return only the hosted_url (and charge ID if needed)
    return NextResponse.json({ hosted_url: data.data.hosted_url, id: data.data.id });
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
