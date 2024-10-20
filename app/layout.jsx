import "./globals.css";
import { SortingAlgorithmProvider } from "./VisualizerContext";

export const metadata = {
  title: "Sorting Visualizer",
  description: "Sorting Visualizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins">
        <SortingAlgorithmProvider>
          {children}
        </SortingAlgorithmProvider>
      </body>
    </html>
  );
}
