import "./globals.css";

export const metadata = {
  title: "Mohith Srinivasalu | Operations & Supply Chain",
  description:
    "Resume website for Mohith Srinivasalu, Operations and Supply Chain professional.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
