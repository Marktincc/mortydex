"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// ATENTION: Hardcoded users for demonstration purposes.
// In a real application, you should fetch users from a database and use a secure password hashing mechanism.
const USERS = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as const,
    name: "Administrador",
  },
  {
    id: "2",
    username: "user",
    email: "user@example.com",
    password: "user123",
    role: "user" as const,
    name: "Usuario Normal",
  },
];

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginState = {
  message?: string;
};

export async function login(prevState: LoginState | undefined, formData: FormData) {
  try {
    const validatedFields = loginSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      // Return a single message for simplicity in LoginForm
      return { message: "Invalid input fields." };
    }

    const { username, password } = validatedFields.data;

    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return { message: "Invalid credentials." };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    const session = {
      ...userWithoutPassword,
    };

    (await cookies()).set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    redirect("/"); 
  } catch (error) {
    
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error; // Re-throw Next.js redirects
    }
    console.error("Login Server Action error:", error);
    return { message: "Failed to login. Please try again." };
  }
}

export async function logout() {
  console.log("Logout Server Action: Started");
  try {
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
    console.log("Logout Server Action: Session cookie cleared");
    return { success: true }; // Return success status instead of redirecting
  } catch (error) {
    console.error("Logout Server Action: Error during logout", error);
    // Do not re-throw NEXT_REDIRECT here as we are not redirecting from the action
    return { success: false, message: "Failed to logout." };
  }
}

export async function getSession() {
  const sessionCookie = (await cookies()).get("session")?.value;
  if (!sessionCookie) {
    return null;
  }
  return JSON.parse(sessionCookie);
}