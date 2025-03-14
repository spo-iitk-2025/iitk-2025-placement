// src/components/Details.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const Details = () => {
  const { index } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setCompany(data[index]))
      .catch((err) => console.error('Error loading data:', err));
  }, [index]);

  // Helper: Render eligibility icon using MUI icons
  const formatEligibility = (char) => {
    if (char === 'Y') return <CheckIcon color="success" />;
    if (char === 'N') return <CloseIcon color="error" />;
    return char;
  };

  // Helper: Generate the eligibility table using MUI components
  const generateEligibilityTable = (eligibilityString) => {
    const programs = [
      'AE', 'BSBE', 'CE', 'CHE', 'CSE', 'EE', 'MSE', 'ME', 'CHM', 'ECO',
      'ES', 'MTH', 'SDS', 'PHY', 'CGS', 'DES', 'IME', 'MSP', 'NET', 'PSE',
      'Stats', 'HSS', 'Mathematics', 'SEE', 'SSA'
    ];
    const columns = [
      'BT', 'BS', 'DoubleMajor', 'DualA', 'DualB', 'DualC', 'MT', 'MSR', 'MSc', 'MDes', 'MBA', 'PhD'
    ];
    const eligibilityRows = eligibilityString.match(/.{1,12}/g) || [];

    return (
      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white' }}>
                Program
              </TableCell>
              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  align="center"
                  sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white' }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {eligibilityRows.map((row, i) =>
              i < programs.length && (
                <TableRow key={i}>
                  <TableCell align="center">{programs[i]}</TableCell>
                  {[...row].map((char, j) => (
                    <TableCell key={j} align="center">
                      {formatEligibility(char)}
                    </TableCell>
                  ))}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Prepare detail items to display in cards
  const detailItems = [
    { label: 'Company Name', value: company?.["Company Name"] || 'NA' },
    { label: 'Nature of Business', value: company?.["Nature of Business"] || 'NA' },
    { label: 'Profile', value: company?.["Profile"] || 'NA' },
    { label: 'Job Location', value: company?.["Job Location"] || 'NA' },
    { label: 'Job Description', value: company?.["Job Description"] || 'NA' },
    { label: 'CTC (INR)', value: company?.["CTC (in INR)"] || 'NA' },
    { label: 'CTC (Foreign Currency)', value: company?.["CTC (in foreign currency)"] || 'NA' },
    { label: 'Cost To Company', value: company?.["Cost To Company"] || 'NA' },
    { label: 'Gross (per annum)', value: company?.["Gross (per annum)"] || 'NA' },
    { label: 'Fixed Take Home Salary', value: company?.["Fixed take home salary (per annum)"] || 'NA' },
    { label: 'Base Salary', value: company?.["Base Salary"] || 'NA' },
    { label: 'Joining Bonus', value: company?.["Joining Bonus"] || 'NA' },
    { label: 'Relocation Bonus', value: company?.["Relocation Bonus"] || 'NA' },
    { label: 'Retention Bonus', value: company?.["Retention Bonus"] || 'NA' },
    { label: 'Deductions', value: company?.["Deductions"] || 'NA' },
    { label: '1st Year CTC', value: company?.["1st Year CTC"] || 'NA' },
    { label: 'Total CTC', value: company?.["Total CTC"] || 'NA' },
    { label: 'Perks', value: company?.["Perks"] || 'NA' },
    { label: 'Bond Details', value: company?.["Bond Details"] || 'NA' },
    { label: 'Medical Requirements', value: company?.["Medical Requirements"] || 'NA' }
  ];

  if (!company) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 8 }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3, mt: '64px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Typography
        variant="h5" // Made title smaller
        align="center"
        gutterBottom
        sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}
      >
        {company["Company Name"]} - Company Details
      </Typography>
      <Grid container spacing={2}>
        {detailItems.map((item, idx) => (
          <Grid item xs={12} sm={6} key={idx} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                flex: 1,
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: 'white'
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', p: 1.5 }}> {/* Reduced padding */}
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333', mb: 0.5 }}>
                  {item.label}
                </Typography>
                {/* <Divider sx={{ mb: 0.5, borderColor: '#1976d2' }} /> */}
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#555' }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="h6" // Made eligibility title slightly smaller
          align="center"
          gutterBottom
          sx={{fontWeight: 'bold', mb: 2 }}
        >
          Eligibility
        </Typography>
        {generateEligibilityTable(company.Eligibility || '')}
      </Box>
    </Box>
  );
};

export default Details;
