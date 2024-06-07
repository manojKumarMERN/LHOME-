import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AxiosService } from '../services/ApiService';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { getToken } from '../services/sessionProvider';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
  });

  useEffect(() => {
    const userDetails = async () => {
      try {
        const token = await getToken();
        const response = await AxiosService.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const { name, email, phone, pincode } = response.data.customer;
          setFormValues({ name, email, phone, pincode });
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    userDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosService.patch(`/user`, formValues);
      if (response.status === 200) {
        router.push('/userdashboard'); 
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
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
            fontSize: '20px',
          }}
        >
          <h1 style={{ textAlign: 'center', fontSize: '30px', color: '#EF5350' }}>Edit Profile</h1>
          <div style={{ marginBottom: '16px', width: '100%', maxWidth: '500px' }}>
            <label>Name</label>
            <TextField
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '16px', width: '100%', maxWidth: '500px' }}>
            <label>Email</label>
            <TextField
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '16px', width: '100%', maxWidth: '500px' }}>
            <label>Number</label>
            <TextField
              type="text"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '16px', width: '100%', maxWidth: '500px' }}>
            <label>Pincode</label>
            <TextField
              type="text"
              name="pincode"
              value={formValues.pincode}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginTop: '16px' }}>
            <Button variant="contained" type="submit">Submit</Button>
          </div>
        </Box>
      </form>
    </div>
  );
}
