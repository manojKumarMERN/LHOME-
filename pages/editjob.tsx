import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { AxiosService } from '../services/ApiService';
import { useRouter } from 'next/router';
import css from "../styles/livingroom.module.scss";

const columns = [
  { id: 'title', headerName: 'Title', minWidth: 170 },
  { id: 'experience', headerName: 'Experience', minWidth: 150 },
  { id: 'location', headerName: 'Location', minWidth: 150 },
  { id: 'qualification', headerName: 'Qualification', minWidth: 150 },
  { id: 'edit_job', headerName: 'Edit Job', minWidth: 150 },
];

export default function JobTable() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosService.get('/jobs');
      if (response.status === 200) {
        const sortedData = response.data.jobs.sort((a, b) => a.id - b.id);
        setData(sortedData);
      } else {
        console.error('Unexpected response status:', response.status);
      } 
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (jobId) => {
    router.push(`/admineditjob?id=${jobId}`);
  };

  return (
    <div className="animate-fade-in">
    <div className={css.lhomePage}>
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden', fontFamily: 'Montserrat' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <h2 style={{ fontSize: '30px', color: '#EF5350' }}>Job List</h2>
          <Button 
            variant="contained" 
            onClick={() => router.push('/createjob')}
            sx={{ 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              '&:hover': {
                backgroundColor: '#45a049', 
              },
              padding: '10px 20px',
              fontSize: '16px'
            }}
          >
            Create Job
          </Button>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => (
                <TableRow key={job.id} hover>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'edit_job' ? (
                        <Button
                          variant="contained"
                          onClick={() => handleEditClick(job.id)}
                        >
                          Edit
                        </Button>
                      ) : (
                        job[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
    </div>
    </div>
  );
}

