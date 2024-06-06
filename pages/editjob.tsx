import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import css from "../styles/visitus.module.scss";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AxiosService } from '../services/ApiService';
import css1 from '../styles/createjob.module.scss';
import { Box } from '@mui/material'; 
import { useRouter } from 'next/router';

const columns = [
  { id: 'id', headerName: 'ID', minWidth: 90 },
  { id: 'title', headerName: 'Title', minWidth: 170 },
  { id: 'experience', headerName: 'Experience', minWidth: 150 },
  { id: 'location', headerName: 'Location', minWidth: 150 },
  { id: 'description', headerName: 'Description', minWidth: 150 },
  { id: 'vacancies', headerName: 'Vacancies', minWidth: 90 },
  { id: 'salary', headerName: 'Salary', minWidth: 150 },
  { id: 'department', headerName: 'Department', minWidth: 150 },
  { id: 'qualification', headerName: 'Qualification', minWidth: 150 },
  { id: 'job_type', headerName: 'Job Type', minWidth: 150 },
  { id: 'edit_job', headerName: 'Edit Job', minWidth: 150 },
];

export default function JobTable() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedJob, setSelectedJob] = useState(null);
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

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setFormValues(job);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosService.patch(`/jobs/${selectedJob.id}`, formValues);
      if (response.status === 200) {
        console.log('Job updated successfully!');
        fetchData();
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
      <div className="animate-fade-in">
        <div className={css.lhomePage}>
          <Paper sx={{ width: '100%', overflow: 'hidden', fontFamily: 'Montserrat' }}>
            {/* <h2 className={css1.joblist} style={{ textAlign: 'center', fontSize: '30px', color: '#EF5350' }}>Job List</h2> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ textAlign: 'center', fontSize: '30px', color: '#EF5350' }}>Job List</h2>
          <Button variant="contained" onClick={() => router.push('/createjob')}>
            Create Job
          </Button>
        </div>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.map((job) => (
                    <TableRow
                      key={job.id}
                      hover
                      style={{ cursor: 'pointer' }}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          {column.id === 'edit_job' ? (
                            <Button
                              variant="contained"
                              onClick={() => handleEditClick(job)}
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

          {selectedJob && (
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
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { AxiosService } from '../services/ApiService';
// import { DataGrid, GridColDef } from '@mui/x-data-grid'; // Import DataGrid from MUI
// import Box from '@mui/material/Box'; // Import Box from MUI
// import css from "./components/JoinusTable/joinusTable.module.scss";

// const columns = [
//   { id: 'name', field: 'name', headerName: 'Name', minWidth: 170 },
//   { id: 'email', field: 'email', headerName: 'Email', minWidth: 170 },
//   { id: 'phone', field: 'phone', headerName: 'Phone', minWidth: 170 },
// ];

// export default function UserTable() {
//   const [data, setData] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AxiosService.get('/user/list-all');
//         if (response.data && Array.isArray(response.data.customers)) {
//           setData(response.data.customers);
//         } else {
//           console.error('Unexpected response format:', response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <h2>User List</h2>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
//                     {columns.map((column) => {
//                       const value = row[column.field];
//                       return (
//                         <TableCell key={column.id}>
//                           {value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={data.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

// // Now use this table for your data rendering
// <Box sx={{ height: 400, width: '100%' }}>
//     <UserTable />
// </Box>

// import React, { useEffect, useState } from 'react';
// import css from '../styles/createjob.module.scss';
// import Button from 'react-bootstrap/Button';
// import { useFormik } from 'formik';
// import { AxiosService } from '../services/ApiService';
// import { useRouter } from 'next/router';
// import { toast } from 'react-toastify';
// import { getToken } from '../services/sessionProvider';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { TextField, Box } from '@mui/material';

// const CreateJob: React.FC = () => {
//     const [jobs, setJobs] = useState([]);
//     const [selectedJobId, setSelectedJobId] = useState(null);
//     const router = useRouter();

//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const token = getToken();
//                 const response = await AxiosService.get('/jobs', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (response.status === 200) {
//                     setJobs(response.data.data);
//                 } else {
//                     throw new Error(`Unexpected response status: ${response.status}`);
//                 }
//             } catch (error) {
//                 console.error('Error fetching jobs:', error);
//                 toast.error('An error occurred while fetching job details. Please try again.');
//             }
//         };

//         fetchJobs();
//     }, []);

//     const fetchJobDetails = async (jobId: string) => {
//         try {
//             const token = getToken();
//             const response = await AxiosService.get(`/jobs/${jobId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (response.status === 200) {
//                 const jobDetails = response.data;
//                 formik.setValues({
//                     title: jobDetails.title,
//                     experience: jobDetails.experience,
//                     location: jobDetails.location,
//                     description: jobDetails.description,
//                     vacancies: jobDetails.vacancies,
//                     salary: jobDetails.salary,
//                     department: jobDetails.department,
//                     qualification: jobDetails.qualification,
//                     job_type: jobDetails.job_type,
//                 });
//                 setSelectedJobId(jobId); // Set the selected job ID
//             } else {
//                 throw new Error(`Unexpected response status: ${response.status}`);
//             }
//         } catch (error) {
//             console.error('Error fetching job details:', error);
//             toast.error('An error occurred while fetching job details. Please try again.');
//         }
//     };

//     const formik = useFormik({
//         initialValues: {
//             title: '',
//             experience: '',
//             location: '',
//             description: '',
//             vacancies: '',
//             salary: '',
//             department: '',
//             qualification: '',
//             job_type: '',
//         },
//         onSubmit: async (values) => {
//             try {
//                 const token = getToken();
//                 const formData = new FormData();
//                 formData.append('title', values.title);
//                 formData.append('experience', values.experience);
//                 // Append other form fields...

//                 const response = await AxiosService.patch(`/jobs/${selectedJobId}`, formData, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (response.status === 200) {
//                     toast.success('Job updated successfully');
//                     setTimeout(() => {
//                         // Redirect to another page after successful submission
//                         router.push('/joinuspage');
//                     }, 2000);
//                 } else {
//                     throw new Error(`Unexpected response status: ${response.status}`);
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 toast.error('An error occurred while updating the job. Please try again.');
//             }
//         },
//     });

//     const columns: GridColDef[] = [
//         { field: 'id', headerName: 'ID', width: 90 },
//         { field: 'title', headerName: 'Title', width: 150 },
//         { field: 'location', headerName: 'Location', width: 150 },
//         { field: 'department', headerName: 'Department', width: 150 },
//     ];

//     const handleRowClick = (params: any) => {
//         fetchJobDetails(params.row.id);
//     };

//     return (
//         <div>
//             <div className={css.overallContainer}>
//                 <h1 className={css.jobHead}>Job Listings</h1>
//             </div>
//             <Box sx={{ height: 400, width: '100%' }}>
                
//                     <DataGrid
//                         rows={jobs}
//                         columns={columns}
//                         onRowClick={handleRowClick}
               
//             </Box>
//             {/* <form onSubmit={formik.handleSubmit}>
//                 <h1 className={css.formhead}>Edit Job</h1>
//                 <div className={css.row}>
//                     <div className={css["col-50"]}>
//                         <div className={css.row}>
//                             <div className={css["col-50"]}>
//                                 <label className={css.formlabel}>Role</label>
//                                 <TextField
//                                     type="text"
//                                     name="title"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.title}
//                                     error={formik.touched.title && Boolean(formik.errors.title)}
//                                     helperText={formik.touched.title && formik.errors.title}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-50"]}>
//                                 <label className={css.formlabel}>Job Location</label>
//                                 <TextField
//                                     type="text"
//                                     name="location"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.location}
//                                     error={formik.touched.location && Boolean(formik.errors.location)}
//                                     helperText={formik.touched.location && formik.errors.location}
//                                     fullWidth
//                                 />
//                             </div>
//                         </div>
//                         <div className={css.row}>
//                             <div className={css["col-50"]}>
//                                 <label className={css.formlabel}>Department</label>
//                                 <TextField
//                                     type="text"
//                                     name="department"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.department}
//                                     error={formik.touched.department && Boolean(formik.errors.department)}
//                                     helperText={formik.touched.department && formik.errors.department}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-50"]}>
//                                 <label className={css.formlabel}>Job Description</label>
//                                 <TextField
//                                     type="text"
//                                     name="description"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.description}
//                                     error={formik.touched.description && Boolean(formik.errors.description)}
//                                     helperText={formik.touched.description && formik.errors.description}
//                                     fullWidth
//                                 />
//                             </div>
//                         </div>
//                         <div className={css.row1}>
//                             <div className={css["col-20"]}>
//                                 <label className={css.formlabel}>Experience</label>
//                                 <TextField
//                                     type="text"
//                                     name="experience"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.experience}
//                                     error={formik.touched.experience && Boolean(formik.errors.experience)}
//                                     helperText={formik.touched.experience && formik.errors.experience}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-20"]}>
//                                 <label className={css.formlabel}>Qualification</label>
//                                 <TextField
//                                     type="text"
//                                     name="qualification"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.qualification}
//                                     error={formik.touched.qualification && Boolean(formik.errors.qualification)}
//                                     helperText={formik.touched.qualification && formik.errors.qualification}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-20"]}>
//                                 <label className={css.formlabel}>Job Type</label>
//                                 <TextField
//                                     type="text"
//                                     name="job_type"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.job_type}
//                                     error={formik.touched.job_type && Boolean(formik.errors.job_type)}
//                                     helperText={formik.touched.job_type && formik.errors.job_type}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-20"]}>
//                                 <label className={css.formlabel}>Salary</label>
//                                 <TextField
//                                     type="text"
//                                     name="salary"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.salary}
//                                     error={formik.touched.salary && Boolean(formik.errors.salary)}
//                                     helperText={formik.touched.salary && formik.errors.salary}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-20"]}>
//                                 <label className={css.formlabel}>Vacancies</label>
//                                 <TextField
//                                     type="text"
//                                     name="vacancies"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.vacancies}
//                                     error={formik.touched.vacancies && Boolean(formik.errors.vacancies)}
//                                     helperText={formik.touched.vacancies && formik.errors.vacancies}
//                                     fullWidth
//                                 />
//                             </div>
//                         </div>
//                         <div className={css.flex_box}>
//                             <Button variant="primary" type="submit">Submit</Button>
//                         </div>
//                     </div>
//                 </div>
//             </form> */}
//         </div>
//     );
// };

// export default CreateJob;



// import React, { useEffect, useState } from 'react';
// import css from '../styles/createjob.module.scss';
// import Button from 'react-bootstrap/Button';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import { AxiosService } from '../services/ApiService';
// import { useRouter } from 'next/router';
// import { toast } from 'react-toastify';
// import { getToken } from '../services/sessionProvider';
// import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
// import { TextField, Box } from '@mui/material';

// const CreateJob: React.FC = () => {
//     const [jobs, setJobs] = useState<GridRowsProp>([]);
//     const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
//     const router = useRouter();

//     const fetchJobs = async () => {
//         try {
//             const token = getToken();
//             const response = await AxiosService.get('/jobs', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (response.status === 200) {
//                 setJobs(response.data.data);
//             } else {
//                 throw new Error(`Unexpected response status: ${response.status}`);
//             }
//         } catch (error) {
//             console.error('Error fetching jobs:', error);
//             toast.error('An error occurred while fetching job details. Please try again.');
//         }
//     };

//     const fetchJobDetails = async (jobId: string) => {
//         try {
//             const token = getToken();
//             const response = await AxiosService.get(`/jobs/${jobId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (response.status === 200) {
//                 const jobDetails = response.data;
//                 formik.setValues({
//                     title: jobDetails.title,
//                     experience: jobDetails.experience,
//                     location: jobDetails.location,
//                     description: jobDetails.description,
//                     vacancies: jobDetails.vacancies,
//                     salary: jobDetails.salary,
//                     department: jobDetails.department,
//                     qualification: jobDetails.qualification,
//                     job_type: jobDetails.job_type,
//                 });
//                 setSelectedJobId(jobId); // Set the selected job ID
//             } else {
//                 throw new Error(`Unexpected response status: ${response.status}`);
//             }
//         } catch (error) {
//             console.error('Error fetching job details:', error);
//             toast.error('An error occurred while fetching job details. Please try again.');
//         }
//     };

//     useEffect(() => {
//         fetchJobs();
//     }, []);

//     const formik = useFormik({
//         initialValues: {
//             title: '',
//             experience: '',
//             location: '',
//             description: '',
//             vacancies: '',
//             salary: '',
//             department: '',
//             qualification: '',
//             job_type: '',
//         },
//         // validationSchema: Yup.object({
//         //     title: Yup.string().required('Role is required'),
//         //     experience: Yup.string().required('Experience is required'),
//         //     location: Yup.string().required('Job Location is required'),
//         //     description: Yup.string().required('Job Description is required'),
//         //     vacancies: Yup.number().required('Vacancies are required'),
//         //     salary: Yup.string().required('Salary is required'),
//         //     department: Yup.string().required('Department is required'),
//         //     qualification: Yup.string().required('Qualification is required'),
//         //     job_type: Yup.string().required('Job Type is required'),
//         // }),
//         onSubmit: async (values) => {
//             try {
//                 const token = getToken();
//                 console.log('Form Values:', values); // Log form values for debugging

//                 const formData = new FormData();
//                 formData.append('title', values.title);
//                 formData.append('experience', values.experience);
//                 formData.append('location', values.location);
//                 formData.append('description', values.description);
//                 formData.append('vacancies', values.vacancies);
//                 formData.append('salary', values.salary);
//                 formData.append('department', values.department);
//                 formData.append('qualification', values.qualification);
//                 formData.append('job_type', values.job_type);

//                 const response = await AxiosService.patch(`/jobs/${selectedJobId}`, formData, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (response.status === 200) {
//                     toast.success('Job updated successfully');
//                     setTimeout(() => {
//                         // router.push('/joinuspage');
//                     }, 2000);
//                 } else {
//                     throw new Error(`Unexpected response status: ${response.status}`);
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 toast.error('An error occurred while updating the job. Please try again.');
//             }
//         },
//     });

//     const columns: GridColDef[] = [
//         { field: 'id', headerName: 'ID', width: 90 },
//         { field: 'title', headerName: 'Title', width: 150 },
//         { field: 'location', headerName: 'Location', width: 150 },
//         { field: 'department', headerName: 'Department', width: 150 },
//     ];

//     const handleRowClick = (params: any) => {
//         fetchJobDetails(params.row.id);
//     };

//     return (
//         <div>
//             <div className={css.overallContainer}>
//                 <h1 className={css.jobHead}>Job Listings</h1>
//             </div>
//             <Box sx={{ height: 400, width: '100%' }}>
//                 {jobs && jobs.length > 0 ? (
//                     <DataGrid
//                         rows={jobs}
//                         columns={columns}
//                         onRowClick={handleRowClick}
//                     />
//                 ) : (
//                     <p>Loading...</p>
//                 )}
//             </Box>
//             <form onSubmit={formik.handleSubmit}>
//                 <h1 className={css.formhead}>Edit Job</h1>
//                 <div className={css.row}>
//                     <div className={css["col-50"]}>
//                         <div className={css.row}>
//                             <div className={css["col-50"]}>
//                                 <label className={css.formlabel}>Role</label>
//                                 <TextField
//                                     type="text"
//                                     name="title"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.title}
//                                     error={formik.touched.title && Boolean(formik.errors.title)}
//                                     helperText={formik.touched.title && formik.errors.title}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-50"]}>
//                                 <label className={css.formlabel}>Job Location</label>
//                                 <TextField
//                                     type="text"
//                                     name="location"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.location}
//                                     error={formik.touched.location && Boolean(formik.errors.location)}
//                                     helperText={formik.touched.location && formik.errors.location}
//                                     fullWidth
//                                 />
//                             </div>
//                         </div>
//                         <div className={css.row}>
//                             <div className={css["col-50"]}>
//                                 <label className={css.formlabel}>Department</label>
//                                 <TextField
//                                     type="text"
//                                     name="department"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.department}
//                                     error={formik.touched.department && Boolean(formik.errors.department)}
//                                     helperText={formik.touched.department && formik.errors.department}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-50"]}>
//                                 <label className={css.formlabel}>Job Description</label>
//                                 <TextField
//                                     type="text"
//                                     name="description"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.description}
//                                     error={formik.touched.description && Boolean(formik.errors.description)}
//                                     helperText={formik.touched.description && formik.errors.description}
//                                     fullWidth
//                                 />
//                             </div>
//                         </div>
//                         <div className={css.row1}>
//                             <div className={css["col-20"]}>
//                                 <label className={css.formlabel}>Experience</label>
//                                 <TextField
//                                     type="text"
//                                     name="experience"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.experience}
//                                     error={formik.touched.experience && Boolean(formik.errors.experience)}
//                                     helperText={formik.touched.experience && formik.errors.experience}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-20"]}>
//                                 <label className={css.formlabel}>Qualification</label>
//                                 <TextField
//                                     type="text"
//                                     name="qualification"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.qualification}
//                                     error={formik.touched.qualification && Boolean(formik.errors.qualification)}
//                                     helperText={formik.touched.qualification && formik.errors.qualification}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-20"]}>
//                                 <label className={css.formlabel}>Job Type</label>
//                                 <TextField
//                                     type="text"
//                                     name="job_type"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.job_type}
//                                     error={formik.touched.job_type && Boolean(formik.errors.job_type)}
//                                     helperText={formik.touched.job_type && formik.errors.job_type}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-20"]}>
//                                 <label className={css.formlabel}>Salary</label>
//                                 <TextField
//                                     type="text"
//                                     name="salary"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.salary}
//                                     error={formik.touched.salary && Boolean(formik.errors.salary)}
//                                     helperText={formik.touched.salary && formik.errors.salary}
//                                     fullWidth
//                                 />
//                             </div>
//                             <div className={css["col-20"]}>
//                                 <label className={css.formlabel}>Vacancies</label>
//                                 <TextField
//                                     type="text"
//                                     name="vacancies"
//                                     className={css.forminput}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     value={formik.values.vacancies}
//                                     error={formik.touched.vacancies && Boolean(formik.errors.vacancies)}
//                                     helperText={formik.touched.vacancies && formik.errors.vacancies}
//                                     fullWidth
//                                 />
//                             </div>
//                         </div>
//                         <div className={css.flex_box}>
//                             <Button variant="primary" type="submit">Submit</Button>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CreateJob;


// // import React, { useEffect } from 'react';
// // import css from '../styles/createjob.module.scss';
// // import Button from 'react-bootstrap/Button';
// // import * as Yup from 'yup';
// // import { useFormik } from 'formik';
// // import { AxiosService } from '../services/ApiService';
// // import { useRouter } from 'next/router';
// // import { toast } from 'react-toastify';
// // import { getToken } from '../services/sessionProvider';

// // interface ApplyForJobFormProps {
// //     header: string;
// //     joblocation: string;
// //     selectCat: boolean;
// //     jobId?: string;  // Added jobId prop
// // }

// // const CreateJob: React.FC<ApplyForJobFormProps> = ({ header, joblocation, selectCat, jobId }) => {
// //     const [ResumeButton, setButton] = React.useState<string>('Upload Resume');
// //     const router = useRouter();

// //     useEffect(() => {
// //         if (jobId) {
// //             // Fetch job details by ID and populate the form
// //             const fetchJobDetails = async () => {
// //                 try {
// //                     const token = getToken();
// //                     const response = await AxiosService.get(`/jobs/${jobId}`, {
// //                         headers: {
// //                             Authorization: `Bearer ${token}`,
// //                         },
// //                     });

// //                     if (response.status === 200) {
// //                         const jobDetails = response.data;
// //                         formik.setValues({
// //                             title: jobDetails.title,
// //                             experience: jobDetails.experience,
// //                             location: jobDetails.location,
// //                             description: jobDetails.description,
// //                             vacancies: jobDetails.vacancies,
// //                             salary: jobDetails.salary,
// //                             department: jobDetails.department,
// //                             qualification: jobDetails.qualification,
// //                             job_type: jobDetails.job_type,
// //                         });
// //                     } else {
// //                         throw new Error(`Unexpected response status: ${response.status}`);
// //                     }
// //                 } catch (error) {
// //                     console.error('Error fetching job details:', error);
// //                     toast.error('An error occurred while fetching job details. Please try again.');
// //                 }
// //             };

// //             fetchJobDetails();
// //         }
// //     }, [jobId]);

// //     const handleFileChange = (event) => {
// //         formik.setFieldValue('resume', event.target.files[0]);
// //         setButton(event.target.files[0].name);
// //     };

// //     const formik = useFormik({
// //         initialValues: {
// //             title: '',
// //             experience: '',
// //             location: '',
// //             description: '',
// //             vacancies: '',
// //             salary: '',
// //             department: '',
// //             qualification: '',
// //             job_type: '',
// //         },
// //         // validationSchema: Yup.object({
// //         //     title: Yup.string().required('Role is required'),
// //         //     experience: Yup.string().required('Experience is required'),
// //         //     location: Yup.string().required('Job Location is required'),
// //         //     description: Yup.string().required('Job Description is required'),
// //         //     vacancies: Yup.number().required('Vacancies are required'),
// //         //     salary: Yup.string().required('Salary is required'),
// //         //     department: Yup.string().required('Department is required'),
// //         //     qualification: Yup.string().required('Qualification is required'),
// //         //     job_type: Yup.string().required('Job Type is required'),
// //         // }),
// //         onSubmit: async (values) => {
// //             try {
// //                 const token = getToken();
// //                 console.log('Form Values:', values); // Log form values for debugging

// //                 const formData = new FormData();
// //                 formData.append('title', values.title);
// //                 formData.append('experience', values.experience);
// //                 formData.append('location', values.location);
// //                 formData.append('description', values.description);
// //                 formData.append('vacancies', values.vacancies);
// //                 formData.append('salary', values.salary);
// //                 formData.append('department', values.department);
// //                 formData.append('qualification', values.qualification);
// //                 formData.append('job_type', values.job_type);

// //                 const response = await AxiosService.patch(`/jobs/${jobId}`, formData, {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                     },
// //                 });

// //                 if (response.status === 200) {
// //                     toast.success('Job updated successfully');
// //                     setTimeout(() => {
// //                         router.push('/joinuspage');
// //                     }, 2000);
// //                 } else {
// //                     throw new Error(`Unexpected response status: ${response.status}`);
// //                 }
// //             } catch (error) {
// //                 console.error('Error:', error);
// //                 toast.error('An error occurred while updating the job. Please try again.');
// //             }
// //         },
// //     });

// //     const { values, handleChange, handleBlur, touched, errors } = formik;

// //     return (
// //         <div>
// //             <div className={css.overallContainer}>
// //                 <h1 className={css.jobHead}>{header}</h1>
// //                 <p className={css.jobpara}>{joblocation}</p>
// //             </div>
// //             <form onSubmit={formik.handleSubmit}>
// //                 <h1 className={css.formhead}>Create Job</h1>
// //                 <div className={css["row"]}>
// //                     <div className={css["col-50"]}>
// //                         <div className={css["row"]}>
// //                             <div className={css["col-50"]}>
// //                                 <label className={css["formlabel"]}>Role</label>
// //                                 <input type="text" name="title" className={css.forminput}
// //                                     onChange={handleChange}
// //                                     onBlur={handleBlur}
// //                                     value={values.title} />
// //                                 {touched.title && errors.title ? <span className='text-red-500'>{errors.title}</span> : null}
// //                             </div>
// //                             <div className={css["col-50"]}>
// //                                 <label className={css["formlabel"]}>Job Location</label>
// //                                 <input type="text" name="location" className={css.forminput}
// //                                     onChange={handleChange}
// //                                     onBlur={handleBlur}
// //                                     value={values.location} />
// //                                 {touched.location && errors.location ? <span className='text-red-500'>{errors.location}</span> : null}
// //                             </div>
// //                         </div>
// //                         <div className={css["row"]}>
// //                             <div className={css["col-50"]}>
// //                                 <label className={css["formlabel"]}>Department</label>
// //                                 <input type="text" name="department" className={css.forminput}
// //                                     onChange={handleChange}
// //                                     onBlur={handleBlur}
// //                                     value={values.department} />
// //                                 {touched.department && errors.department ? <span className='text-red-500'>{errors.department}</span> : null}
// //                             </div>
// //                             <div className={css["col-50"]}>
// //                                 <label className={css["formlabel"]}>Job Description</label>
// //                                 <input type="text" name="description" className={css.forminput}
// //                                     onChange={handleChange}
// //                                     onBlur={handleBlur}
// //                                     value={values.description} />
// //                                 {touched.description && errors.description ? <span className='text-red-500'>{errors.description}</span> : null}
// //                             </div>
// //                         </div>
// //                         <div className={css["row1"]}>
// //                             <div className={css["col-20"]}>
// //                                 <label className={css["formlabel"]}>Experience</label>
// //                                 <input type="text" name="experience" className={css.forminput}
// //                                     onChange={handleChange}
// //                                     onBlur={handleBlur}
// //                                     value={values.experience} />
// //                                 {touched.experience && errors.experience ? <span className='text-red-500'>{errors.experience}</span> : null}
// //                             </div>
// //                             <div className={css["col-20"]}>
// //                                 <label className={css["formlabel"]}>Qualification</label>
// //                                 <input type="text" name="qualification" className={css.forminput}
// //                                     onChange={handleChange}
// //                                     onBlur={handleBlur}
// //                                     value={values.qualification} />
// //                                 {touched.qualification && errors.qualification ? <span className='text-red-500'>{errors.qualification}</span> : null}
// //                             </div>
// //                             <div className={css["col-20"]}>
// //                                 <label className={css["formlabel"]}>Job Type</label>
// //                                 <input type="text" name="job_type" className={css.forminput}
// //                                     onChange={handleChange}
// //                                     onBlur={handleBlur}
// //                                     value={values.job_type} />
// //                                 {touched.job_type && errors.job_type ? <span className='text-red-500'>{errors.job_type}</span> : null}
// //                             </div>
// //                             <div className={css["col-20"]}>
// //                                 <label className={css["formlabel"]}>Salary</label>
// //                                 <input type="text" name="salary" className={css.forminput}
// //                                     onChange={handleChange}
// //                                     onBlur={handleBlur}
// //                                     value={values.salary} />
// //                                 {touched.salary && errors.salary ? <span className='text-red-500'>{errors.salary}</span> : null}
// //                             </div>
// //                             <div className={css["col-20"]}>
// //                                 <label className={css["formlabel"]}>Vacancies</label>
// //                                 <input type="text" name="vacancies" className={css.forminput}
// //                                     onChange={handleChange}
// //                                     onBlur={handleBlur}
// //                                     value={values.vacancies} />
// //                                 {touched.vacancies && errors.vacancies ? <span className='text-red-500'>{errors.vacancies}</span> : null}
// //                             </div>
// //                         </div>
// //                         <div className={css.flex_box}>
// //                             <button className={`${css.jobApplybtn} ${css.jobApplybtn2}`} type="submit">Submit</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };

// // export default CreateJob;
