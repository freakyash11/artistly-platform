'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export interface Artist {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  location: string;
}

interface ArtistTableProps {
  data: Artist[];
  onAction?: (artist: Artist) => void;
}

export const ArtistTable: React.FC<ArtistTableProps> = ({ data, onAction }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((artist) => (
          <TableRow key={artist.id}>
            <TableCell>{artist.name}</TableCell>
            <TableCell>{artist.category}</TableCell>
            <TableCell>{artist.location}</TableCell>
            <TableCell>
                <span className="font-semibold text-blue-600">{artist.priceRange}</span>
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                onClick={() => onAction?.(artist)}
                className="cursor-pointer"
              >
                Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ArtistTable;