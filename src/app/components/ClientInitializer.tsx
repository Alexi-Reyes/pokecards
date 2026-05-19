'use client';

import { useEffect } from 'react';
import { initObservers } from '@/observers';

export default function ClientInitializer() {
  useEffect(() => {
    initObservers();
  }, []);

  return null;
}
