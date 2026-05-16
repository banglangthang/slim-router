import { NextResponse } from "next/server";
import { execSync } from "child_process";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const token = execSync("gh auth token", {
      encoding: "utf-8",
      timeout: 10000,
    }).trim();

    if (!token) {
      return NextResponse.json({ error: "No token found. Run 'gh auth login' first." }, { status: 400 });
    }

    return NextResponse.json({ token });
  } catch (error) {
    const message = error.message || "";

    if (message.includes("not found") || message.includes("command not found")) {
      return NextResponse.json({ error: "GitHub CLI (gh) is not installed. Install it from https://cli.github.com/" }, { status: 400 });
    }

    if (message.includes("not authenticated") || message.includes("auth")) {
      return NextResponse.json({ error: "Not authenticated with GitHub CLI. Run 'gh auth login' first." }, { status: 400 });
    }

    return NextResponse.json({ error: `Failed to get GitHub token: ${message}` }, { status: 500 });
  }
}
