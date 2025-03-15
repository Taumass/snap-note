import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// ** COMPONENTS **
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import NotificationContainer from '@/components/notifications/NotificationContainer';
import AlertDialog from '@/components/notifications/AlertDialog';

import ReduxProvider from '@/providers/ReduxProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: 'SnapNote | %s',
    default: 'SnapNote',
  },
  description: 'An app for taking notes and managing tasks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <SidebarProvider>
            <div className="flex h-screen w-full">
              <AppSidebar className="flex-shrink-0" />
              <main className="w-full h-full overflow-auto">{children}</main>
            </div>
          </SidebarProvider>

          {/* Manage By Redux */}
          <NotificationContainer />
          <AlertDialog />
        </ReduxProvider>
      </body>
    </html>
  );
}
