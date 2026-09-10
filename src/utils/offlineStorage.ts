// Utility for offline data storage & auto-sync when network returns

export interface QueuedOfflineAction {
  id: string;
  type: 'ATTENDANCE_SCAN' | 'BACKUP_REQUEST' | 'PROFILE_UPDATE';
  timestamp: string;
  payload: Record<string, unknown>;
  synced: boolean;
}

const STORAGE_KEYS = {
  OFFLINE_QUEUE: 'ccs_app_offline_queue',
  ATTENDANCE_CACHE: 'ccs_app_attendance_cache',
  BACKUP_REQUESTS_CACHE: 'ccs_app_backup_requests_cache',
  USER_PREFERENCES: 'ccs_app_user_prefs',
};

// Queue action for sync when offline
export const queueOfflineAction = (type: QueuedOfflineAction['type'], payload: Record<string, unknown>): QueuedOfflineAction => {
  const existingQueue = getOfflineQueue();
  const newItem: QueuedOfflineAction = {
    id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    type,
    timestamp: new Date().toISOString(),
    payload,
    synced: false,
  };

  const updatedQueue = [...existingQueue, newItem];
  localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(updatedQueue));
  return newItem;
};

// Retrieve offline action queue
export const getOfflineQueue = (): QueuedOfflineAction[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading offline queue:', err);
    return [];
  }
};

// Mark items as synced or clear synced items
export const clearSyncedOfflineQueue = () => {
  try {
    const queue = getOfflineQueue();
    const pending = queue.filter(item => !item.synced);
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(pending));
  } catch (err) {
    console.error('Error clearing offline queue:', err);
  }
};

// Cache data locally for instant offline loading
export const setLocalCache = (key: string, data: unknown) => {
  try {
    localStorage.setItem(`ccs_app_cache_${key}`, JSON.stringify(data));
  } catch (err) {
    console.error('Error writing local cache:', err);
  }
};

// Get cached data for offline usage
export const getLocalCache = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(`ccs_app_cache_${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (err) {
    console.error('Error reading local cache:', err);
    return fallback;
  }
};

// Listen for network reconnect and auto-sync
export const initOfflineSyncManager = (onSyncComplete?: (count: number) => void) => {
  const syncPendingQueue = async () => {
    if (!navigator.onLine) return;
    const queue = getOfflineQueue();
    const unsynced = queue.filter(item => !item.synced);

    if (unsynced.length === 0) return;

    console.log(`[App Offline Sync] Syncing ${unsynced.length} offline actions...`);
    
    // Simulate syncing actions to backend API
    for (const item of unsynced) {
      item.synced = true;
    }

    clearSyncedOfflineQueue();
    if (onSyncComplete) {
      onSyncComplete(unsynced.length);
    }
  };

  window.addEventListener('online', syncPendingQueue);
  
  // Initial sync check if already online
  if (navigator.onLine) {
    syncPendingQueue();
  }

  return () => {
    window.removeEventListener('online', syncPendingQueue);
  };
};
