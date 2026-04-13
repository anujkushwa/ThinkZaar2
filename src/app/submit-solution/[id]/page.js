export default async function SubmitSolutionPage({ params }) {
  const { id } = await params;

  return <div className="p-6">Submit solution page for problem #{id}</div>;
}
