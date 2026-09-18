import artistsData from "@/data/artists.json";
import { Artist } from "@/lib/types";
import ArtistCard from "@/components/ArtistCard";

export default function ArtistsPage() {
  const artists = (artistsData as Artist[]).slice().sort((a, b) => b.stars - a.stars);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl">همه‌ی هنرمندان</h1>
        <div className="museum-divider w-24 mx-auto mt-4" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {artists.map((a) => (
          <ArtistCard key={a.id} artist={a} />
        ))}
      </div>
    </div>
  );
}
