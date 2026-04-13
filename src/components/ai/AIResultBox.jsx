export default function AIResultBox({ result = "AI output will appear here." }) {
  return <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">{result}</div>;
}
