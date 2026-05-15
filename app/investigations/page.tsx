import CategoryListing from '@/components/CategoryListing';

export const revalidate = 0;

export default function InvestigationsPage() {
  return (
    <CategoryListing
      sectionLabel="Investigations"
      emptyTitle={
        <>
          Press <span className="vs-i">Is</span> Ready.
          <br />Files Are Empty.
        </>
      }
      emptySubtitle="The first investigation is being written. When the case is filed, it drops here first — unfiltered, unsponsored, uncensored."
      emptyStatus="In Progress"
    />
  );
}
