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
    engagedContacts: 3,
    websiteVisits: 8,
    objection: 'migration risk',
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
    engagedContacts: 2,
    websiteVisits: 5,
    objection: 'already on AWS/Aurora/etc.',
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
    engagedContacts: 1,
    websiteVisits: 2,
    objection: 'bad timing',
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
    engagedContacts: 1,
    websiteVisits: 1,
    objection: 'technical concern',
  },
  {
    account: 'OpenAI',
    contact: 'Maya Chen · Head of Platform Partnerships',
    segment: 'Strategic',
    rounds: 3,
    lastTouch: '2026-03-22',
    status: 'In sequence',
    result: 'Requested security overview',
    channel: 'Email',
    openRate: 71,
    replyRate: 16,
    meetingRate: 0,
    engagedContacts: 2,
    websiteVisits: 7,
    objection: 'technical concern',
  },
  {
    account: 'Grok',
    contact: 'Ethan Cole · VP Engineering',
    segment: 'Enterprise',
    rounds: 2,
    lastTouch: '2026-03-25',
    status: 'Researching',
    result: 'Mapping org structure',
    channel: 'LinkedIn',
    openRate: 34,
    replyRate: 0,
    meetingRate: 0,
    engagedContacts: 1,
    websiteVisits: 3,
    objection: 'already on AWS/Aurora/etc.',
  },
  {
    account: 'Observe.AI',
    contact: 'Lena Patel · Director of Revenue Operations',
    segment: 'Mid-Market',
    rounds: 4,
    lastTouch: '2026-03-21',
    status: 'In sequence',
    result: 'Asked for pricing details',
    channel: 'Mixed',
    openRate: 67,
    replyRate: 19,
    meetingRate: 5,
    engagedContacts: 3,
    websiteVisits: 6,
    objection: 'no budget',
  },
  {
    account: 'Perplexity',
    contact: 'Samir Rao · Head of Business Development',
    segment: 'Growth',
    rounds: 1,
    lastTouch: '2026-03-27',
    status: 'Researching',
    result: 'First outbound sequence queued',
    channel: 'Email',
    openRate: 0,
    replyRate: 0,
    meetingRate: 0,
    engagedContacts: 1,
    websiteVisits: 1,
    objection: 'bad timing',
  },
  {
    account: 'Playground AI',
    contact: 'Avery Brooks · COO',
    segment: 'Growth',
    rounds: 3,
    lastTouch: '2026-03-19',
    status: 'Closed - no response',
    result: 'No engagement after follow-up',
    channel: 'Phone',
    openRate: 22,
    replyRate: 0,
    meetingRate: 0,
    engagedContacts: 1,
    websiteVisits: 2,
    objection: 'too small to evaluate',
  },
  {
    account: 'Robust.AI',
    contact: 'Priya Malhotra · VP Operations',
    segment: 'Enterprise',
    rounds: 5,
    lastTouch: '2026-03-20',
    status: 'Meeting booked',
    result: 'Technical intro scheduled',
    channel: 'Mixed',
    openRate: 74,
    replyRate: 24,
    meetingRate: 20,
    engagedContacts: 4,
    websiteVisits: 9,
    objection: 'migration risk',
  },
  {
    account: 'Snorkel AI',
    contact: 'Jonas Reed · Head of Data Platform',
    segment: 'Strategic',
    rounds: 4,
    lastTouch: '2026-03-23',
    status: 'In sequence',
    result: 'Reviewing use case fit',
    channel: 'LinkedIn',
    openRate: 58,
    replyRate: 11,
    meetingRate: 0,
    engagedContacts: 2,
    websiteVisits: 4,
    objection: 'technical concern',
  },
  {
    account: 'Tavus',
    contact: 'Olivia Hart · Partnerships Lead',
    segment: 'Mid-Market',
    rounds: 2,
    lastTouch: '2026-03-24',
    status: 'In sequence',
    result: 'Requested customer stories',
    channel: 'Email',
    openRate: 63,
    replyRate: 14,
    meetingRate: 0,
    engagedContacts: 2,
    websiteVisits: 5,
    objection: 'bad timing',
  },
  {
    account: 'Mercor',
    contact: 'Daniel Kim · Chief of Staff',
    segment: 'Growth',
    rounds: 3,
    lastTouch: '2026-03-18',
    status: 'Meeting booked',
    result: 'Discovery meeting confirmed',
    channel: 'Phone',
    openRate: 49,
    replyRate: 17,
    meetingRate: 17,
    engagedContacts: 2,
    websiteVisits: 4,
    objection: 'no budget',
  },
];

const storedAccounts = JSON.parse(localStorage.getItem('outreach-accounts') || 'null');
const mergedAccounts = storedAccounts
  ? [
      ...storedAccounts,
      ...defaultAccounts.filter(
        (defaultAccount) => !storedAccounts.some((storedAccount) => storedAccount.account === defaultAccount.account)
      ),
    ]
  : defaultAccounts;

const state = {
  accounts: mergedAccounts,
  filters: { status: 'all', channel: 'all', search: '' },
};

const statsGrid = document.getElementById('statsGrid');
const tableBody = document.getElementById('accountsTableBody');
const analyticsCards = document.getElementById('analyticsCards');
const topPlays = document.getElementById('topPlays');
const nextBestActions = document.getElementById('nextBestActions');
const heatScoreCards = document.getElementById('heatScoreCards');
const objectionTracker = document.getElementById('objectionTracker');
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
const daysSinceTouch = (value) => Math.round((Date.now() - new Date(`${value}T00:00:00`).getTime()) / 86400000);

function getNextBestAction(account) {
  if (account.rounds <= 1 || account.status === 'Researching') return 'send first touch';
  if (account.replyRate >= 15 && account.meetingRate === 0) return 'call';
  if (account.channel === 'LinkedIn' && account.replyRate === 0) return 'send follow-up';
  if (daysSinceTouch(account.lastTouch) >= 30) return 're-engage after 30 days';
  if (account.rounds >= 5 || account.status === 'Closed - no response') return 'break-up email';
  if (account.channel === 'Email' && account.replyRate < 10) return 'LinkedIn touch';
  return 'send follow-up';
}

function getHeatScore(account) {
  const touchScore = Math.min(account.rounds * 8, 24);
  const engagementScore = Math.round((account.openRate * 0.18) + (account.replyRate * 0.45) + (account.meetingRate * 0.55));
  const recencyScore = Math.max(0, 25 - daysSinceTouch(account.lastTouch));
  const websiteScore = Math.min((account.websiteVisits || 0) * 3, 15);
  const contactScore = Math.min((account.engagedContacts || 1) * 6, 18);
  return Math.min(100, touchScore + engagementScore + recencyScore + websiteScore + contactScore);
}

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

function renderNextBestActions(accounts) {
  const prioritized = [...accounts]
    .sort((left, right) => getHeatScore(right) - getHeatScore(left))
    .slice(0, 4);

  nextBestActions.innerHTML = prioritized.map((account) => `
    <article class="action-row">
      <div class="action-copy">
        <strong>${account.account}</strong>
        <p>${account.contact} · ${account.channel} · heat ${getHeatScore(account)}</p>
      </div>
      <span class="action-pill">${getNextBestAction(account)}</span>
    </article>
  `).join('');
}

function renderHeatScores(accounts) {
  const ranked = [...accounts]
    .sort((left, right) => getHeatScore(right) - getHeatScore(left))
    .slice(0, 4);

  heatScoreCards.innerHTML = ranked.map((account) => `
    <article class="heat-score-card">
      <div class="heat-score-header">
        <div>
          <strong>${account.account}</strong>
          <p>${account.engagedContacts || 1} engaged contacts · ${account.websiteVisits || 0} site visits</p>
        </div>
        <span class="heat-pill">${getHeatScore(account)}</span>
      </div>
      <div class="metric-row"><span>Touch pressure</span><span>${account.rounds} rounds</span></div>
      <div class="metric-row"><span>Engagement</span><span>${account.replyRate}% reply / ${account.meetingRate}% meeting</span></div>
    </article>
  `).join('');
}

function renderObjectionTracker(accounts) {
  const ranked = Object.entries(accounts.reduce((acc, account) => {
    const key = account.objection || 'no budget';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {})).sort((left, right) => right[1] - left[1]);

  objectionTracker.innerHTML = ranked.map(([objection, count]) => `
    <article class="objection-row">
      <div>
        <strong>${objection}</strong>
        <p>Use this objection trend to adjust messaging, talk tracks, and follow-up strategy.</p>
      </div>
      <span class="objection-count">${count}</span>
    </article>
  `).join('');
}

function render() {
  const filtered = getFilteredAccounts();
  renderStats(filtered);
  renderTable(filtered);
  renderAnalytics(filtered);
  renderTopPlays(filtered);
  renderNextBestActions(filtered);
  renderHeatScores(filtered);
  renderObjectionTracker(filtered);
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
    engagedContacts: 1,
    websiteVisits: 0,
    objection: 'no budget',
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
