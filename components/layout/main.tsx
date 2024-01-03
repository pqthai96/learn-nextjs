import {LayoutProps} from "@/models";
import Link from "next/link";

export interface IMainLayoutProps {

}

export function MainLayout({children}: LayoutProps) {
  return (
    <div>
      <h1>Main Layout</h1>

      <Link href="/about">
        Home
      </Link>

      <div>
        {children}
      </div>
    </div>
  )
}