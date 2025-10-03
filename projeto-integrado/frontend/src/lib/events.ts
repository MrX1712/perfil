// Event tracking utility for Roxedo
// Tracks user interactions and saves to localStorage for backend integration

export type EventType = 
  | 'landing_viewed'
  | 'hero_cta_clicked'
  | 'quiz_started'
  | 'quiz_completed'
  | 'result_viewed'
  | 'cta_clicked';

interface RoxedoEvent {
  event: EventType;
  timestamp: string;
  data?: Record<string, any>;
}

const EVENTS_KEY = 'roxedo_events';

/**
 * Track an event
 */
export const trackEvent = (eventType: EventType, data?: Record<string, any>) => {
  const event: RoxedoEvent = {
    event: eventType,
    timestamp: new Date().toISOString(),
    data,
  };

  // Log to console (development)
  console.log('[Roxedo Event]', event);

  // Save to localStorage
  try {
    const existingEvents = getEvents();
    existingEvents.push(event);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(existingEvents));
  } catch (error) {
    console.error('Error saving event:', error);
  }

  // In production, this would also send to backend
  // sendToBackend(event);
};

/**
 * Get all tracked events
 */
export const getEvents = (): RoxedoEvent[] => {
  try {
    const stored = localStorage.getItem(EVENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
};

/**
 * Clear all events
 */
export const clearEvents = () => {
  localStorage.removeItem(EVENTS_KEY);
};

/**
 * Export events as CSV
 */
export const exportEventsAsCSV = (): string => {
  const events = getEvents();
  
  if (events.length === 0) {
    return '';
  }

  const headers = ['event', 'timestamp', 'data'];
  const rows = events.map(event => [
    event.event,
    event.timestamp,
    event.data ? JSON.stringify(event.data) : '',
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');
};
