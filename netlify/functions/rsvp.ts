import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { rsvpSubmissions } from "../../db/schema.js";
import { desc } from "drizzle-orm";

export default async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method === "POST") {
    const { name, attendance, comment } = await req.json();

    if (!name || !attendance) {
      return Response.json(
        { error: "이름과 참석 여부는 필수입니다." },
        { status: 400, headers: corsHeaders }
      );
    }

    const [row] = await db
      .insert(rsvpSubmissions)
      .values({ name, attendance, comment: comment || "" })
      .returning();

    return Response.json(row, { status: 201, headers: corsHeaders });
  }

  if (req.method === "GET") {
    const rows = await db
      .select()
      .from(rsvpSubmissions)
      .orderBy(desc(rsvpSubmissions.createdAt));

    return Response.json(rows, { headers: corsHeaders });
  }

  return new Response("Method not allowed", { status: 405, headers: corsHeaders });
};

export const config: Config = {
  path: "/api/rsvp",
};
