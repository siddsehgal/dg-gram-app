import Profile from "@/components/profile";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const router = useRouter();
  const user_id: number = router.query?.user_id
    ? Number(router.query?.user_id)
    : 0;
  return <Profile user_id={user_id} />;
}
