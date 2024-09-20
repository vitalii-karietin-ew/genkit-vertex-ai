import { NextResponse } from "next/server";
import { PromptGenerationChain } from "@/app/chains";

export async function POST(request: Request) {
  const body = await request.json();
  const { input } = body;

	if (!input) {
		return NextResponse.json({ error: "Missing input parameter" }, { status: 400 });
	};

	try {
		const promptGenerationChain = new PromptGenerationChain();
		const res = await promptGenerationChain.invoke({
			text: input
		});

		return NextResponse.json(res);
  } catch (error) {
		return NextResponse.json({ error: "Error processing while the prompt generation" }, { status: 500 });
  };
};
