export const config = {
    runtime: "edge",
};

export default function handler(request) {
    const geo = request.geo || {};
    const country = geo.country || "unknown";
    const city = geo.city || "unknown";

    console.log("Geo:", { country, city });

    const redirectUrl = new URL(request.url).searchParams.get("to")
        || "https://google.com";

    return new Response(null, {
        status: 302,
        headers: {
            Location: redirectUrl,
        },
    });
}