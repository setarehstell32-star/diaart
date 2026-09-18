import { supabase } from "./supabase";

export async function signUp(params: {
  email: string;
  password: string;
  role: "buyer" | "artist";
  name: string;
  lastName?: string;
  mobile?: string;
  city?: string;
  address?: string;
  bio?: string;
  instagram?: string;
}) {
  // ۱. ساخت کاربر
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error("کاربر ساخته نشد");

  // ۲. ساخت پروفایل
  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    role: params.role,
    name: params.name,
    last_name: params.lastName || null,
    mobile: params.mobile || null,
    email: params.email,
    city: params.city || null,
    address: params.address || null,
    bio: params.bio || null,
    instagram: params.instagram || null,
  });

  if (profileError) {
    console.error("خطای پروفایل:", profileError);
    throw profileError;
  }

  return authData.user;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data.user;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data;
}
