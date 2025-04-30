import React from 'react';
import type { Item } from '../types/itemTypes';


interface Props {
  item: Item;
}

export const ItemCard: React.FC<Props> = ({ item }) => (
  <div className="border p-4 rounded shadow">
    <h2 className="font-bold">{item.name}</h2>
    <p>Status: {item.status}</p>
  </div>
);
