import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AxiosService } from '../services/ApiService';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function JobEditForm() {
  const router = useRouter();
  const { id } = router.query;
  const [formValues, setFormValues] = useState({
    title: '',
    location: '',
    department: '',
    description: '',
    experience: '',
    qualification: '',
    job_type: '',
    salary: '',
    vacancies: '',
  });

  useEffect(() => {
    if (id) {
      fetchJobDetails(id);
    }
  }, [id]);

  const fetchJobDetails = async (jobId) => {
    try {
      const response = await AxiosService.get(`/jobs/${jobId}`);
      if (response.status === 200) {
        setFormValues(response.data.job);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosService.patch(`/jobs/${id}`, formValues);
      if (response.status === 200) {
        console.log('Job updated successfully!');
        router.push('/editjob'); // Redirect to job list page after update
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            color: '#4D6797',
            fontSize: '20px'
          }}
        >
          <h1 style={{ textAlign: 'center', fontSize: '30px', color: '#EF5350' }}>Edit Job</h1>
          {Object.keys(formValues).map((key) => (
            <div key={key} style={{ marginBottom: '16px', width: '100%', maxWidth: '500px' }}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <TextField
                type="text"
                name={key}
                value={formValues[key]}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
          ))}
          <div style={{ marginTop: '16px' }}>
            <Button variant="contained" type="submit">Submit</Button>
          </div>
        </Box>
      </form>
    </div>
  );
}
