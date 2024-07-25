import { NextRequest, NextResponse } from 'next/server';
import { searchPeople } from '../../lib/actions/searchPeople';

export async function POST(req: NextRequest) {
  const { number } = await req.json();

  if (!number) {
    return NextResponse.json({ message: "Phone number is required" }, { status: 400 });
  }

  try {
    const user = await searchPeople(number);
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
