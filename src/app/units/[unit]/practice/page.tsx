import { redirect } from "next/navigation";

export default async function UnitPracticePage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  redirect(`/question-bank#unit-${unit}`);
}
