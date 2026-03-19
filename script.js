const defaultAccounts = [
  {
    account: 'Northstar Health',
    contact: 'Jade Kim · VP Revenue Ops',
    segment: 'Enterprise',
    rounds: 4,
    lastTouch: '2026-03-17',
    status: 'Meeting booked',
    result: 'Discovery call booked',
    channel: 'Mixed',
    openRate: 76,
    replyRate: 25,
    meetingRate: 25,
  },
  {
    account: 'Crestline Logistics',
    contact: 'Marco Alvarez · COO',
    segment: 'Mid-Market',
    rounds: 3,
    lastTouch: '2026-03-14',
    status: 'In sequence',
    result: 'Asked for pricing deck',
    channel: 'Email',
    openRate: 64,
    replyRate: 18,
    meetingRate: 0,
  },
  {
    account: 'Bluepeak Software',
    contact: 'Nina Shah · Head of Sales',
    segment: 'Growth',
    rounds: 5,
    lastTouch: '2026-03-18',
    status: 'Closed - no response',
    result: 'No reply after 5 touches',
    channel: 'LinkedIn',
    openRate: 42,
    replyRate: 4,
    meetingRate: 0,
  },
  {
    account: 'Sable Security',
    contact: 'Devon Brooks · CRO',
    segment: 'Enterprise',
    rounds: 2,
    lastTouch: '2026-03-16',
    status: 'Researching',
    result: 'Persona mapping in progress',
    channel: 'Phone',
    openRate: 0,
    replyRate: 0,
    meetingRate: 0,
  },
];

const state = {
  accounts: JSON.parse(localStorage.getItem('outreach-accounts') || 'null') || defaultAccounts,
  filters: { status: 'all', channel: 'all', search: '' },
};

const statsGrid = document.getElementById('statsGrid');
const tableBody = document.getElementById('accountsTableBody');
const analyticsCards = document.getElementById('analyticsCards');
const topPlays = document.getElementById('topPlays');
const statusFilter = document.getElementById('statusFilter');
const channelFilter = document.getElementById('channelFilter');
const searchInput = document.getElementById('searchInput');
const dialog = document.getElementById('accountDialog');
const form = document.getElementById('accountForm');

const formatDate = (value) => new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const saveAccounts = () => localStorage.setItem('outreach-accounts', JSON.stringify(state.accounts));
const uniqueValues = (key) => [...new Set(state.accounts.map((item) => item[key]))].sort();

function hydrateFilters() {
  [
    [statusFilter, 'status'],
    [channelFilter, 'channel'],
  ].forEach(([select, key]) => {
    uniqueValues(key).forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.append(option);
    });
  });
}

function getFilteredAccounts() {
  return state.accounts.filter((account) => {
    const matchesStatus = state.filters.status === 'all' || account.status === state.filters.status;
    const matchesChannel = state.filters.channel === 'all' || account.channel === state.filters.channel;
    const query = state.filters.search.trim().toLowerCase();
    const matchesSearch = !query || [account.account, account.contact, account.segment, account.result]
      .join(' ')
      .toLowerCase()
      .includes(query);
    return matchesStatus && matchesChannel && matchesSearch;
  });
}

function renderStats(accounts) {
  const totals = {
    total: accounts.length,
    active: accounts.filter((a) => a.status === 'In sequence').length,
    meetings: accounts.filter((a) => a.status === 'Meeting booked').length,
    avgRounds: accounts.length ? (accounts.reduce((sum, a) => sum + a.rounds, 0) / accounts.length).toFixed(1) : '0.0',
  };

  const cards = [
    ['Target accounts', totals.total, 'Total accounts currently in your outbound book.'],
    ['Active sequences', totals.active, 'Accounts still receiving touches.'],
    ['Meetings booked', totals.meetings, 'Accounts that converted into meetings.'],
    ['Avg. outreach rounds', totals.avgRounds, 'How many touches it takes on average.'],
  ];

  statsGrid.innerHTML = cards.map(([label, value, copy]) => `
    <article>
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${copy}</p>
    </article>
  `).join('');
}

function renderTable(accounts) {
  tableBody.innerHTML = accounts.map((account) => `
    <tr>
      <td><strong>${account.account}</strong></td>
      <td>${account.contact}</td>
      <td>${account.segment}</td>
      <td>${account.rounds}</td>
      <td>${formatDate(account.lastTouch)}</td>
      <td><span class="badge status-${account.status.replace(/\s+/g, '-')}">${account.status}</span></td>
      <td>${account.result}</td>
    </tr>
  `).join('');
}

function renderAnalytics(accounts) {
  const avg = (key) => accounts.length ? Math.round(accounts.reduce((sum, account) => sum + account[key], 0) / accounts.length) : 0;
  const byRound = Object.values(accounts.reduce((acc, account) => {
    const bucket = acc[account.rounds] || { rounds: account.rounds, count: 0, meetings: 0 };
    bucket.count += 1;
    if (account.meetingRate > 0 || account.status === 'Meeting booked') bucket.meetings += 1;
    acc[account.rounds] = bucket;
    return acc;
  }, {})).sort((a, b) => a.rounds - b.rounds);

  analyticsCards.innerHTML = `
    <article>
      <strong>${avg('openRate')}%</strong>
      <div class="metric-row"><span>Average open rate</span><span>Across filtered outreach</span></div>
    </article>
    <article>
      <strong>${avg('replyRate')}%</strong>
      <div class="metric-row"><span>Average reply rate</span><span>Signal of message resonance</span></div>
    </article>
    <article>
      <strong>${avg('meetingRate')}%</strong>
      <div class="metric-row"><span>Average meeting rate</span><span>Conversion to next step</span></div>
    </article>
    ${byRound.map((bucket) => `
      <article>
        <strong>Round ${bucket.rounds}</strong>
        <div class="metric-row"><span>Accounts</span><span>${bucket.count}</span></div>
        <div class="metric-row"><span>Meetings influenced</span><span>${bucket.meetings}</span></div>
      </article>
    `).join('')}
  `;
}

function renderTopPlays(accounts) {
  const ranking = [...accounts]
    .sort((left, right) => (right.replyRate + right.meetingRate) - (left.replyRate + left.meetingRate))
    .slice(0, 3);

  topPlays.innerHTML = ranking.map((account) => `
    <li>
      <strong>${account.account}</strong>
      <span>${account.channel} · ${account.contact}</span>
      <div class="metric-row"><span>Reply rate</span><span>${account.replyRate}%</span></div>
      <div class="metric-row"><span>Meeting rate</span><span>${account.meetingRate}%</span></div>
    </li>
  `).join('');
}

function render() {
  const filtered = getFilteredAccounts();
  renderStats(filtered);
  renderTable(filtered);
  renderAnalytics(filtered);
  renderTopPlays(filtered);
}

function resetAndHydrateSelect(select) {
  select.innerHTML = '<option value="all">All ' + (select === statusFilter ? 'statuses' : 'channels') + '</option>';
}

document.getElementById('openAddAccount').addEventListener('click', () => dialog.showModal());
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());

statusFilter.addEventListener('change', (event) => {
  state.filters.status = event.target.value;
  render();
});
channelFilter.addEventListener('change', (event) => {
  state.filters.channel = event.target.value;
  render();
});
searchInput.addEventListener('input', (event) => {
  state.filters.search = event.target.value;
  render();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  state.accounts.unshift({
    account: data.get('account'),
    contact: data.get('contact'),
    segment: data.get('segment'),
    status: data.get('status'),
    rounds: Number(data.get('rounds')),
    lastTouch: new Date().toISOString().slice(0, 10),
    result: data.get('result'),
    channel: data.get('channel'),
    openRate: Number(data.get('openRate')),
    replyRate: Number(data.get('replyRate')),
    meetingRate: Number(data.get('meetingRate')),
  });
  saveAccounts();
  resetAndHydrateSelect(statusFilter);
  resetAndHydrateSelect(channelFilter);
  hydrateFilters();
  render();
  form.reset();
  dialog.close();
});

resetAndHydrateSelect(statusFilter);
resetAndHydrateSelect(channelFilter);
hydrateFilters();
render();
