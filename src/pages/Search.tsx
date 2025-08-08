import React from 'react';
import { SmartSearch } from '../components/SmartSearch';
import { useAuth } from '../contexts/AuthContext';
import { SubscriptionGate } from '../components/SubscriptionGate';

export function Search() {
  const { hasAccess } = useAuth();

  if (!hasAccess('search')) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SubscriptionGate feature="search">
          {/* This will show the upgrade prompt */}
        </SubscriptionGate>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SmartSearch />
    </div>
  );
} 