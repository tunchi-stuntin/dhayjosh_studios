declare module '@prisma/client' {
  export type Role = 'ADMIN' | 'CUSTOMER';
  export type BookingStatus = 'PENDING' | 'PAID' | 'CANCELLED';

  export interface User {
    id: string;
    role: Role;
    name: string | null;
    email: string;
    phone: string | null;
    createdAt: Date;
  }

  export interface Package {
    id: string;
    name: string;
    description: string;
    hourlyRate: number;
    minHours: number;
    createdAt: Date;
  }

  export interface Addon {
    id: string;
    name: string;
    description: string | null;
    price: number;
    createdAt: Date;
  }

  export interface BookingAddon {
    id: string;
    bookingId: string;
    addonId: string;
    qty: number;
  }

  export interface Booking {
    id: string;
    userId: string;
    packageId: string;
    date: Date;
    startHour: number;
    hours: number;
    status: BookingStatus;
    amountNGN: number;
    reference: string | null;
    createdAt: Date;
    user?: User;
    package?: Package;
    addonItems?: BookingAddon[];
    invoice?: Invoice | null;
  }

  export interface Invoice {
    id: string;
    bookingId: string;
    email: string;
    totalNGN: number;
    sentAt: Date | null;
    paid: boolean;
  }

  export interface PrismaDelegate<T> {
    findMany(...args: unknown[]): Promise<T[]>;
    findUnique(...args: unknown[]): Promise<T | null>;
    create(...args: unknown[]): Promise<T>;
    upsert(...args: unknown[]): Promise<T>;
    update(...args: unknown[]): Promise<T>;
  }

  export class PrismaClient {
    constructor(...args: unknown[]);
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    user: PrismaDelegate<User>;
    package: PrismaDelegate<Package>;
    addon: PrismaDelegate<Addon>;
    booking: PrismaDelegate<Booking>;
    invoice: PrismaDelegate<Invoice>;
    bookingAddon: PrismaDelegate<BookingAddon>;
  }
}
