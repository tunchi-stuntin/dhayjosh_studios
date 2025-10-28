import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import type { Booking, Invoice, User, Package, Addon, BookingAddon } from '@prisma/client';

const resendKey = process.env.RESEND_API_KEY;

export async function sendInvoiceEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (resendKey) {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: 'DhayJosh Photos <studio@dhayjosh.com>',
      to,
      subject,
      html,
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });

  await transporter.sendMail({
    from: 'DhayJosh Photos <studio@dhayjosh.com>',
    to,
    subject,
    html,
  });
}

export function renderInvoiceHTML({
  invoice,
  booking,
  user,
  pkg,
  addons,
  bookingAddons,
}: {
  invoice: Invoice;
  booking: Booking;
  user: User;
  pkg: Package;
  addons: Addon[];
  bookingAddons: BookingAddon[];
}) {
  const addonLookup = new Map(addons.map((addon) => [addon.id, addon] as const));
  const addonLines = bookingAddons
    .map((ba) => {
      const addon = addonLookup.get(ba.addonId);
      if (!addon) return '';
      return `
        <tr>
          <td style="padding: 8px 0;">${addon.name} × ${ba.qty}</td>
          <td style="padding: 8px 0; text-align: right;">₦${(addon.price * ba.qty).toLocaleString()}</td>
        </tr>
      `;
    })
    .join('');

  const manageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/booking`;

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;font-family:'Montserrat',Arial,sans-serif;color:#111;background:#fff;padding:40px;">
      <tr>
        <td style="text-transform:uppercase;letter-spacing:0.4em;font-size:12px;color:#666;">DhayJosh Photos</td>
      </tr>
      <tr><td style="padding-top:24px;font-size:28px;font-weight:600;">Invoice</td></tr>
      <tr><td style="padding-top:12px;font-size:14px;color:#555;">Hi ${user.name || user.email}, thanks for reserving the studio.</td></tr>
      <tr><td style="padding-top:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 8px 0;">Booking Reference</td>
            <td style="padding: 8px 0; text-align: right;">${booking.reference || invoice.id}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">Package</td>
            <td style="padding: 8px 0; text-align: right;">${pkg.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">Date</td>
            <td style="padding: 8px 0; text-align: right;">${new Date(booking.date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">Time</td>
            <td style="padding: 8px 0; text-align: right;">${booking.startHour}:00 for ${booking.hours} hour(s)</td>
          </tr>
          ${addonLines}
          <tr>
            <td style="padding: 16px 0; font-weight:600;">Total</td>
            <td style="padding: 16px 0; text-align: right; font-weight:600;">₦${invoice.totalNGN.toLocaleString()}</td>
          </tr>
        </table>
      </td></tr>
      <tr>
        <td style="padding-top:24px;">
          <a href="${manageUrl}" style="display:inline-block;padding:12px 24px;border:1px solid #111;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;color:#fff;background:#111;text-decoration:none;">Manage Booking</a>
        </td>
      </tr>
    </table>
  `;
}
