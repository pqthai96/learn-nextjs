import {LayoutProps} from "@/models";
import Link from "next/link";

export interface IAdminLayoutProps {

}

export function AdminLayout({children}: LayoutProps) {
  return (
    <div>
      <h1>Main Layout</h1>
      <div>Sidebar</div>

      <Link href="/about">
        Home
      </Link>

      <div>
        {children}
      </div>
    </div>
  )
}