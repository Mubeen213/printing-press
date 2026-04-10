import { siteConfig } from '@/config/site';
import type { WhatsAppProductPayload, WhatsAppCartPayload } from '@/types';

/**
 * Build a WhatsApp deep link URL with pre-filled message.
 */
export function buildWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodedMessage}`;
}

/**
 * Format a product inquiry message for WhatsApp.
 */
export function formatProductMessage(payload: WhatsAppProductPayload): string {
  const lines = [
    `Hello, I'm interested in this product:`,
    ``,
    `Product: ${payload.title}`,
    `Category: ${payload.category}`,
    `Quantity: ${payload.quantity}`,
  ];

  if (payload.offer) {
    lines.push(`Offer: ${payload.offer}`);
  }

  if (payload.productUrl) {
    lines.push(`Product URL: ${payload.productUrl}`);
  }

  lines.push(`Notes: I would like more details.`);
  lines.push(``);
  lines.push(`Please share pricing, timeline, and available options.`);

  return lines.join('\n');
}

/**
 * Format a cart inquiry message for WhatsApp.
 */
export function formatCartMessage(payload: WhatsAppCartPayload): string {
  const lines = [
    `Hello, I'd like a quote for the following items:`,
    ``,
  ];

  payload.items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.title} — Qty: ${item.quantity}`);
  });

  lines.push(``);

  if (payload.userName) {
    lines.push(`Name: ${payload.userName}`);
  }
  if (payload.userPhone) {
    lines.push(`Phone: ${payload.userPhone}`);
  }
  if (payload.businessType) {
    lines.push(`Business/Event Type: ${payload.businessType}`);
  }
  if (payload.notes) {
    lines.push(`Notes: ${payload.notes}`);
  }

  lines.push(`Service Area: Hyderabad`);
  lines.push(`Request: Please share pricing, production timeline, and next steps.`);

  return lines.join('\n');
}

/**
 * Build a WhatsApp URL for a product inquiry.
 */
export function buildProductWhatsAppUrl(payload: WhatsAppProductPayload): string {
  return buildWhatsAppUrl(formatProductMessage(payload));
}

/**
 * Build a WhatsApp URL for a cart inquiry.
 */
export function buildCartWhatsAppUrl(payload: WhatsAppCartPayload): string {
  return buildWhatsAppUrl(formatCartMessage(payload));
}

/**
 * Build a WhatsApp URL with default message.
 */
export function buildDefaultWhatsAppUrl(): string {
  return buildWhatsAppUrl(siteConfig.whatsapp.defaultMessage);
}
