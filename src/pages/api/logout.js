import { sessions } from "../../utils/session";

export async function POST({ request }) {
  const { token } = await request.json(); // Extract token from the request body

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  if (sessions.delete(token)) {
    return new Response(JSON.stringify({ message: "Logout successful." }), {
      status: 200,
    });
  }

  return new Response(JSON.stringify({ error: "Logout failed." }), {
    status: 400,
  });
}
