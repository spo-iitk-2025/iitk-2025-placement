// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const Home = () => {
  const [companies, setCompanies] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetch('${process.env.PUBLIC_URL}/data.json')
      .then(res => res.json())
      .then(data => {
        // Store original index with each row .
        console.log("data.json fetched");
        const dataWithIndex = data.map((company, index) => ({
          ...company,
          originalIndex: index, // Preserve original index
        }));
        setCompanies(dataWithIndex);
      })
      .catch(err => console.error('Error loading data:', err));
  }, []);

  const columns = [
    { name: 'Company Name', selector: row => row["Company Name"], sortable: true },
    { name: 'Nature of Business', selector: row => row["Nature of Business"], sortable: true },
    { name: 'Profile', selector: row => row["Profile"], sortable: true },
    {
      name: 'Details',
      cell: row => (
        <Link to={`/details/${row.originalIndex}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
          View Details
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Filter the data based on search input
  const filteredData = companies.filter(item =>
    Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px', marginTop: '20px' }}>
      <h1 style={{ textAlign: 'center', margin: '20px 0', color: '#1976d2', fontWeight: 'bold' }}>
        IITK 2025 Proforma
      </h1>
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search companies..."
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          style={{
            padding: '8px',
            width: '400px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '20px'
          }}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationRowsPerPageOptions={[10, 25, 50, 100]} // Added 100 as well
        highlightOnHover
        responsive
        defaultSortField="Company Name"
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

export default Home;
