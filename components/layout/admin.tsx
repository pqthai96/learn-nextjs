import {LayoutProps} from "@/models";
import Link from "next/link";
import {Auth} from "@/components/common";
import {useAuth} from "@/hooks";
import {useRouter} from "next/router";

export interface IAdminLayoutProps {

}

export function AdminLayout({children}: LayoutProps) {

  const router = useRouter();
  const {logout} = useAuth();

  async function handleLogoutClick() {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.log("Failed to logout: " + error);
    }
  }

  return (
    <Auth>
      <h1>Main Layout</h1>
      <div>Sidebar</div>
      <button onClick={handleLogoutClick}>Logout</button>

      <Link href="/about">
        Home
      </Link>

      <div>
        {children}
      </div>
    </Auth>
  )
}