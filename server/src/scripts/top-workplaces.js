const axios = require('axios');

(async () => {
  // Base URL for the API
  const BASE_URL = 'http://localhost:3000';

  // Fetch all workplaces
  const workplacesRes = await axios.get(`${BASE_URL}/workplaces`);
  const workplaces = workplacesRes.data.data;

  // Fetch all shifts
  const shiftsRes = await axios.get(`${BASE_URL}/shifts`);
  const shifts = shiftsRes.data.data;

  // Filter active workplaces (status === 0)
  const activeWorkplaces = workplaces.filter(wp => wp.status === 0);

  // Count completed shifts for each active workplace
  const workplaceShiftCounts = activeWorkplaces.map(wp => {
    const count = shifts.filter(shift => shift.workplaceId === wp.id && shift.workerId !== null && shift.cancelledAt === null).length;
    return { name: wp.name, shifts: count };
  });

  // Sort by shift count descending and take top 3
  const top3 = workplaceShiftCounts.sort((a, b) => b.shifts - a.shifts).slice(0, 3);

  // Output in required format
  console.log(JSON.stringify(top3, null, 2));
})();
