export default async function ProblemPage({ params }) {
  const { id } = await params;

  return <div className="p-6">Problem detail page for problem #{id}</div>;
}
