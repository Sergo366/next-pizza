import type { Metadata } from "next";
import { Header } from "@/components/shared/header";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Next Pizza | Main",
};

export default function HomeLayout({
    children,
    modal
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
      <main className={'min-h-screen'}>
          <Header/>
          {children}
          {modal}
      </main>
  );
}
