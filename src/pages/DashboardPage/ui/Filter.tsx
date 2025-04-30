import React from 'react';

interface Props {
  filter: string;
  setFilter: (f: string) => void;
}

export const Filter: React.FC<Props> = ({ filter, setFilter }) => (
  <input
    value={filter}
    onChange={e => setFilter(e.target.value)}
    placeholder="Search items..."
    className="border p-2 rounded"
  />
);
