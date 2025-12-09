import { Code } from "@repo/ui/code";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center flex-col w-full">
      <h1 className="italic font-bold text-4xl">Hello</h1>
      <Code>A</Code>
    </div>
  );
}
