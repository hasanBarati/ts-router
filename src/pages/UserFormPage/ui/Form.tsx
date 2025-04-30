import React from 'react';
import { useUserFormStore } from '../model/userFormStore';
import { useUserForm } from '../hooks/useUserForm';



export const UserForm: React.FC = () => {
  const { data, setData } = useUserFormStore();
  const mutation = useUserForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {/* <Input placeholder="First Name" value={data.firstName} onChange={e => setData({ firstName: e.target.value })} />
      <Input placeholder="Last Name" value={data.lastName} onChange={e => setData({ lastName: e.target.value })} />
      <Input placeholder="Email" type="email" value={data.email} onChange={e => setData({ email: e.target.value })} />
      <Button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Submitting...' : 'Submit'}
      </Button> */}
    </form>
  );
};
