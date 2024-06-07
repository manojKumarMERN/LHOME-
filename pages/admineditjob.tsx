import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AxiosService } from '../services/ApiService';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import * as config from "../next.config";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer/Footer";
import css from '../styles/createjob.module.scss';
import DashboardLayout from './admindashboard';

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

  const [screenwidth, setWidth] = React.useState(window.innerWidth);
  let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
  let hgtt = 0;
  if (window.innerWidth < 600) {
      hgtt = window.innerHeight - 210;
      if (window.innerWidth > 490 && window.innerWidth < 512) {
          hgtt += 10;
      }
  } else {
      hgtt = window.innerHeight - 160;
  }
  const [screenheight, setHeight] = React.useState(hgtt);
  const [hidden, setHidden] = React.useState(false)
  const handleResize = React.useCallback(() => {
      setWidth(window.innerWidth);
      let hgtt = 0;
      if (window.innerWidth < 600) {
          hgtt = window.innerHeight - 210;
          if (window.innerWidth > 490 && window.innerWidth < 512) {
              hgtt += 10;
          }
          if (window.innerWidth > 571 && window.innerWidth < 599) {
              hgtt += 50;
          }
          if (window.innerWidth > 570 && window.innerWidth < 572) {
              hgtt += 45;
          }
          if (window.innerWidth > 509 && window.innerWidth < 571) {
              hgtt += 25;
          }
          if (window.innerWidth > 500 && window.innerWidth < 510) {
              hgtt += 15;
          }
          if (window.innerWidth < 500) {
              hgtt -= 10;
          }
      } else {
          hgtt = window.innerHeight - 160;
      }
      setHeight(hgtt);
  }, []);

  const handleResized = React.useCallback(() => {
      setTimeout(() => {
          handleResize();
      }, 1000);
  }, [handleResize]);


  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
