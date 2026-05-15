import CategoryListing from '@/components/CategoryListing';

export const revalidate = 0;

export default function InternationalPage() {
  return (
    <CategoryListing
      sectionLabel="International"
      category="International"
      emptyTitle={
        <>
          International <span className="vs-i">Cases</span>
          <br />Coming Soon.
        </>
      }
      emptySubtitle="The stories happening past the front page — the conflicts, the sanctions, the populations the cameras forgot. Filing soon."
      emptyStatus="In Progress"
    />
  );
}
