# dhayjosh-photos

A minimalist, premium studio rental experience designed to attract discerning photography clients. Built with Next.js 14, Prisma, Tailwind CSS, and Paystack.

## Features
- Real-time hourly availability with public calendar
- Package-based pricing with add-ons and automated invoices
- Secure Paystack payments with webhook fulfillment
- Cloudinary-powered portfolio gallery and Sanity-ready content structure
- Lightweight AI assistant (Rasa proxy or rules fallback)
- GA4 + Vercel Analytics for actionable insights

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- Paystack test account
- (Optional) Cloudinary, Resend/Nodemailer SMTP, Rasa endpoint

### Installation

```bash
npm install
cp .env.example .env
# update environment variables
npm run db:push
npm run db:seed
npm run dev
```

App runs at `http://localhost:3000`.

### Database & Seeding
- `npm run db:push` syncs the Prisma schema.
- `npm run db:seed` creates the default Full and Partial packages with common add-ons.

### Payments
1. Configure Paystack keys in `.env`.
2. Set Paystack callback/webhook URL to `https://<your-domain>/api/paystack/webhook`.
3. Use the Booking page to test a transaction.

### AI Assistant
- Set `RASA_URL` in `.env` to proxy chat messages to a hosted Rasa instance.
- Without Rasa, the assistant responds with curated FAQ-based rules.

### Deployment
Deploy seamlessly to Vercel:

1. Create a new project and import this repository.
2. Set environment variables in Vercel dashboard.
3. Ensure database and external services are reachable.

### Analytics
- Provide GA4 Measurement ID via `GA_MEASUREMENT_ID`.
- Vercel Analytics enabled by default in layout.

### Non-Goals (v1)
- No direct Meta/Instagram integrations (icons only).
- No public file uploads; content managed via seeds or CMS.

## Scripts

- `npm run dev` – local development
- `npm run build` – generate Prisma client & build Next app
- `npm run start` – start production server
- `npm run lint` – Next.js lint
- `npm run typecheck` – TypeScript type checking
- `npm run db:push` – push Prisma schema to DB
- `npm run db:seed` – seed base content

## License
MIT
