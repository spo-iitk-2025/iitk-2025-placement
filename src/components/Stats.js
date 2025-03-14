// src/components/Stats.js
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const Stats = () => {
  const [statsData, setStatsData] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetch('https://spo-iitk-2025.github.io/iitk-2025-placement/stats.json')
      .then(res => res.json())
      .then(data => setStatsData(data))
      .catch(err => console.error('Error loading data:', err));
  }, []);

  // Define the table columns
  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Roll No.', selector: row => row.roll_no, sortable: true },
    { name: 'Company Name', selector: row => row.company_name, sortable: true },
    { name: 'Profile', selector: row => row.profile, sortable: true },
    { name: 'Branch', selector: row => row.program_department, sortable: true },
  ];

  // Filter data based on search text
  const filteredData = statsData.filter(item =>
    Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const containerStyle = {
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    padding: '20px',
    marginTop: '20px' // Reduced margin from navbar
  };

  const headingStyle = {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    color: '#1976d2',
    fontWeight: 'bold'
  };

  const searchStyle = {
    padding: '8px',
    width: '400px', // Wider search box
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>IITK 2025 Placement Stats</h1>
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          style={searchStyle}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationRowsPerPageOptions={[10, 25, 50, 100]} // Allow 50 rows option
        defaultSortField="name"
        highlightOnHover
        responsive
        customStyles={{
          headRow: {
            style: {
              backgroundColor: '#1976d2',
              color: 'white',
              fontWeight: 'bold',
            },
          },
          headCells: {
            style: {
              color: 'white',
            },
          },
        }}
      /> 
    </div>
  );
};

export default Stats;
