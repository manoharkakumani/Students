import supabase from "../../config/superbaseClient";
import { sessions } from "../../utils/session";
// import { v4 as uuidv4 } from "uuid";

export async function POST({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  const { user } = data;
  const token = user.id;
  sessions.set(token, data);

  return new Response(
    JSON.stringify({
      message: "Login successful.",
      token,
      user: {
        email: user.email,
        name: user.user_metadata.full_name,
      },
    }),
    { status: 201 }
  );
}
