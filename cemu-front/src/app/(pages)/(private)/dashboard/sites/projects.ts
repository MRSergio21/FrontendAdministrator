const generateMockProjects = (count: number) => {
  const orgs = [
    'org-001',
    'org-002',
    'org-003',
    'org-004',
    'org-005',
    'org-006',
  ];
  const siteNames = ['Marketing', 'Sales', 'Support', 'Admin', 'HR', 'Finance'];
  const domains = ['example.com', 'myapp.io', 'company.org'];

  const projects = Array.from({ length: count }, (_, i) => {
    const id = `site-${String(i + 1).padStart(3, '0')}`;
    const name = `${siteNames[i % siteNames.length]} Site ${i + 1}`;
    const domain = `${name.toLowerCase().replace(/\s+/g, '-')}.${
      domains[i % domains.length]
    }`;
    const createdAt = new Date(
      2025,
      i % 12,
      (i % 28) + 1,
      9,
      0,
      0,
    ).toISOString();
    const updatedAt = new Date(
      2025,
      i % 12,
      (i % 28) + 5,
      10,
      0,
      0,
    ).toISOString();
    const organizationIds = [orgs[i % orgs.length]];
    const totalProfiles = Math.floor(Math.random() * 20) + 1;

    return {
      id,
      name,
      domain,
      createdAt,
      updatedAt,
      organizationIds,
      totalProfiles,
    };
  });

  return projects;
};

const projects = () => ({
  total: 50,
  sites: generateMockProjects(50),
});

export default projects;
