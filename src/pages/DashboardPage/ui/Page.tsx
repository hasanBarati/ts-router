import React, { useState } from 'react';
// import { useDashboard } from '../hooks/useDashboard';
// import { Filter } from './Filter';
// import { List } from './List';
import { useLoaderData } from '@tanstack/react-router';
import { dashboardRoute } from '../route';



export const DashboardPage: React.FC = () => {
  // const { items, isLoading } = useDashboard();
  const [filter, setFilter] = useState('');

  // const filtered = items.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()));
  const { users } = useLoaderData({ from: dashboardRoute.id })
  // if (isLoading) return <div>Loading dashboard...</div>;
   console.log("usersusers",users)
  return (
    <div>
      <h1 className="text-2xl mb-4">Dashboard</h1>
      {/* <Filter filter={filter} setFilter={setFilter} />
      <List items={filtered} /> */}
    </div>
  );
};
