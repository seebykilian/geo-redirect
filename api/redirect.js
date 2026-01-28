export const config = {
  runtime: "edge",
};

export default async function handler(request) {
  // 1️⃣ IP depuis Vercel
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  // 2️⃣ Appel API IP
  let country = "unknown";
  let city = "unknown";

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();

    country = data.country || data.country_name || "unknown";
    city = data.city || "unknown";
  } catch (e) {
    console.log("IP API error");
  }

  console.log({ ip, country, city });

  const redirectUrl =
    new URL(request.url).searchParams.get("to") ||
    "https://www.swisstransfer.com/d/64062d24-a008-4e6d-b4c5-eaa0e680929e";

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl,
    },
  });
}