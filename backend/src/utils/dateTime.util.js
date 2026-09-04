const dayjs = require('dayjs');

/**
 * Checks whether the current time falls within a given start/end window.
 * Used to enforce that a user can only start an exam within the
 * admin-defined time window.
 *
 * @param {Date|string} startTime
 * @param {Date|string} endTime
 * @returns {boolean}
 */
function isWithinWindow(startTime, endTime) {
  const now = dayjs();
  return now.isAfter(dayjs(startTime)) && now.isBefore(dayjs(endTime));
}

/**
 * Returns a human-readable description of how long until a given time,
 * or how long ago it passed. Useful for "exam starts in X" messages.
 */
function describeTimeUntil(targetTime) {
  const now = dayjs();
  const target = dayjs(targetTime);
  const diffMinutes = target.diff(now, 'minute');

  if (diffMinutes > 0) {
    return `Starts in ${diffMinutes} minute(s)`;
  }
  if (diffMinutes < 0) {
    return `Started ${Math.abs(diffMinutes)} minute(s) ago`;
  }
  return 'Starting now';
}

/**
 * Returns remaining seconds until endTime - useful for exam countdown timers.
 * Returns 0 if already past.
 */
function secondsRemaining(endTime) {
  const diff = dayjs(endTime).diff(dayjs(), 'second');
  return diff > 0 ? diff : 0;
}

module.exports = {
  isWithinWindow,
  describeTimeUntil,
  secondsRemaining,
};
