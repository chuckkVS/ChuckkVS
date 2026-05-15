import CategoryListing from '@/components/CategoryListing';

export const revalidate = 0;

export default function ArchivePage() {
  return (
    <CategoryListing
      sectionLabel="Archive"
      emptyTitle={
        <>
          Archive <span className="vs-i">Is</span>
          <br />Being Built.
        </>
      }
      emptySubtitle="Every case filed here lives here forever. Once the first dispatch drops, this becomes the permanent record. No takedowns. No memory holes."
      emptyStatus="Awaiting First Case"
    />
  );
}
