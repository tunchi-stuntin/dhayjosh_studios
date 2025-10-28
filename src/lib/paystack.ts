import axios from 'axios';

type InitializePayload = {
  email: string;
  amountKobo: number;
  reference: string;
  metadata?: Record<string, unknown>;
  callback_url?: string;
};

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  console.warn('Paystack secret key is not set. Initialize and verification calls will fail in production.');
}

export async function initializeTransaction(payload: InitializePayload) {
  if (!PAYSTACK_SECRET_KEY) throw new Error('Paystack secret key missing');
  const response = await axios.post(
    'https://api.paystack.co/transaction/initialize',
    {
      email: payload.email,
      amount: payload.amountKobo,
      reference: payload.reference,
      callback_url: payload.callback_url,
      metadata: payload.metadata,
      channels: ['card', 'bank'],
      currency: 'NGN',
    },
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
}

export async function verifyPaystackSignature(signature: string | undefined, rawBody: string) {
  if (!PAYSTACK_SECRET_KEY) return false;
  const crypto = await import('crypto');
  const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(rawBody).digest('hex');
  return hash === signature;
}
