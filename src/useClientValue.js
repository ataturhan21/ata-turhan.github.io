import { useSyncExternalStore } from 'react';

const noSubscription = () => () => {};

// Returns `server` in the pre-rendered HTML and while React hydrates it, so the two renders match,
// then whatever `client()` returns.
export const useClientValue = (client, server) => useSyncExternalStore(noSubscription, client, () => server);
