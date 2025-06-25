import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, IndianRupee } from "lucide-react";

interface ArtistCardProps {
  artist: {
    id: number;
    name: string;
    category: string;
    priceRange: string;
    location: string;
  };
}

export default function ArtistCard({ artist }: ArtistCardProps) {

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight">{artist.name}</h3>
          <Badge variant="secondary" className="w-fit">
            {artist.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-2">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <IndianRupee className="h-4 w-4 mr-1" />
            <span>{artist.priceRange}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{artist.location}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button
          asChild
          className="w-full cursor-pointer hover:cursor-pointer"
          variant="default"
        >
          <a href={`/ask-quote`}>Ask for Quote</a>
        </Button>
      </CardFooter>
    </Card>
  );
}