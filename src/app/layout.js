import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryBar from "../components/CategoryBar";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import SideBar from "../components/SideBar";
import Main from "../components/Main";
import ClerkAuthWatcher from "@/components/ClerkAuthWatcher";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Commerce app",
  description: "E-Commerce app",
  icons: {
    icon: [{ url: "/website_logo.ico", type: "image/ico" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased  relative`}
        >
          <StoreProvider>
            <ClerkProvider>
              <ClerkAuthWatcher />
              <Header />
              <CategoryBar />
              <Main>{children}</Main>
              <Footer />
              <SideBar />
            </ClerkProvider>
          </StoreProvider>
          <ToastContainer
            autoClose={3000}
            newestOnTop={true}
            closeOnClick={true}
            hideProgressBar
            className="w-fit"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
