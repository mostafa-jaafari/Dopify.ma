import DynamicPageRenderer from "./DynamicPageRenderer";

export default function page({ params }: { params: { pageid: string } }) {
  return <DynamicPageRenderer pageid={params.pageid} />;
}