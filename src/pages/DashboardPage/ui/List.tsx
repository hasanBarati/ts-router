import React from 'react';

import { ItemCard } from './Item';
import type { Item } from '../types/itemTypes';

interface Props {
  items: Item[];
}

export const List: React.FC<Props> = ({ items }) => (
  <div className="grid grid-cols-3 gap-4">
    {items.map(item => <ItemCard key={item.id} item={item} />)}
  </div>
);
