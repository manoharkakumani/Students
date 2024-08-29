import supabase from "../../config/superbaseClient";

export async function POST({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ error: "Passwords don't match" }), {
      status: 400,
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(
    JSON.stringify({
      message:
        "Registration successful. Please check your email to confirm your account.",
      data,
    }),
    { status: 201 }
  );
}
