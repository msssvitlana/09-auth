import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from 'next/font/google'
import "./globals.css";
import Header from "../components/Header/Header";
import TanStackProvider from '../components/TanStackProvider/TanStackProvider'
import Footer from '../components/Footer/Footer'


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',

})
export const metadata: Metadata = {
  title: "NoteHub Home Page",
  description: "description NoteHub App",
  openGraph: {
    title: 'NoteHub — менеджер нотаток',
    description: 'Створюй, зберігай та організовуй свої нотатки зручно.',
    url: 'https://08-zustand-cyan.vercel.app',
    images: [
      {
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      
      }

      ],
  },
};
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
       
      </body>
    </html>
  );
};



