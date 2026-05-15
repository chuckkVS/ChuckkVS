import CategoryListing from '@/components/CategoryListing';

export const revalidate = 0;

export default function DomesticPage() {
  return (
    <CategoryListing
      sectionLabel="Domestic"
      category="Domestic"
      emptyTitle={
        <>
          Domestic <span className="vs-i">Files</span>
          <br />Coming Soon.
        </>
      }
      emptySubtitle="The first domestic case is being built. Housing, policy, the systems they say can't be fixed — receipts incoming."
      emptyStatus="Sourcing"
    />
  );
}
