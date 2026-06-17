import { ReactNode } from "react";
import Header from "./Header";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
