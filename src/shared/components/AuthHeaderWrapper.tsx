import { getSession } from "@/app/(auth)/_actions/auth-actions";
import Header from "./Header";

export default async function AuthHeaderWrapper() {
  const user = await getSession();
  return <Header user={user} />;
}
