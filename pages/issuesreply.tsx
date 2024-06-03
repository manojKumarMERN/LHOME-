import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { AxiosService } from '../services/ApiService';

const IssuesTable = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [solution, setSolution] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await AxiosService.get('/user/complaints');
        setIssues(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };
    fetchIssues();
  }, []);

  const handleOpen = (issue) => {
    setSelectedIssue(issue);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIssue(null);
    setSolution('');
  };

  const handleSubmitSolution = async () => {
    // Submit the solution to the API (implementation needed)
    console.log(`Submitting solution for issue ${selectedIssue.id}: ${solution}`);
    handleClose();
  };

  const sortedIssues = issues.sort((a, b) => a.id - b.id);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: '8px', width: '30%', textAlign: 'center' }}>Complaint ID</TableCell>
              <TableCell sx={{ padding: '8px', width: '30%' , textAlign: 'center' }}>Status</TableCell>
              <TableCell sx={{ padding: '8px', width: '40%' , textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell sx={{ padding: '8px', width: '30%', textAlign: 'center'  }}>{issue.customerId}</TableCell>
                <TableCell sx={{ padding: '8px', width: '30%', textAlign: 'center'  }}>{issue.status}</TableCell>
                <TableCell sx={{ padding: '8px', width: '40%', textAlign: 'center'  }}>
                  <Button variant="contained" color="primary" onClick={() => handleOpen(issue)}>
                    View & Solve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '80%' } }}>
        <DialogTitle>Issue Details</DialogTitle>
        <DialogContent>
          {selectedIssue && (
            <div>
              <p><strong>ID:</strong> {selectedIssue.id}</p>
              <p><strong>Title:</strong> {selectedIssue.title}</p>
              <p><strong>Status:</strong> {selectedIssue.status}</p>
              <TextField
                label="Solution"
                fullWidth
                multiline
                rows={4}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitSolution} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IssuesTable;



// import React, { useEffect, useState } from 'react';
// import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   TextField} from '@mui/material';
// import { AxiosService } from '../services/ApiService';

// const IssuesTable = () => {
//   const [issues, setIssues] = React.useState([]);
//   const [selectedIssue, setSelectedIssue] = React.useState(null);
//   const [solution, setSolution] = React.useState('');
//   const [open, setOpen] = React.useState(false);

//   React.useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const response = await AxiosService.get('/user/complaints');
//         setIssues(response.data.data);
//         console.log(response.data)
//       } catch (error) {
//         console.error('Error fetching issues:', error);
//       }
//     };
//     fetchIssues();
//   }, []);

//   const handleOpen = (issue) => {
//     setSelectedIssue(issue);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedIssue(null);
//     setSolution('');
//   };

//   const handleSubmitSolution = async () => {
//     // Submit the solution to the API (implementation needed)
//     console.log(`Submitting solution for issue ${selectedIssue.id}: ${solution}`);
//     handleClose();
//   };

//   return (
//     <div>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Complaint ID</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {issues.map((issue) => (
//               <TableRow key={issue.id}>
//                 <TableCell>{issue.id}</TableCell>
//                 <TableCell>{issue.customerId}</TableCell>
//                 {/* <TableCell>{issue.title}</TableCell> */}
//                 <TableCell>{issue.status}</TableCell>
//                 {/* <TableCell>{new Date(issue.createdAt).toLocaleString()}</TableCell>
//                 <TableCell>{new Date(issue.updatedAt).toLocaleString()}</TableCell> */}
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleOpen(issue)}>
//                     View & Solve
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Issue Details</DialogTitle>
//         <DialogContent>
//           {selectedIssue && (
//             <div>
//               <p><strong>ID:</strong> {selectedIssue.id}</p>
//               <p><strong>Title:</strong> {selectedIssue.title}</p>
//               <p><strong>Status:</strong> {selectedIssue.status}</p>
//               {/* <p><strong>Created At:</strong> {new Date(selectedIssue.createdAt).toLocaleString()}</p>
//               <p><strong>Updated At:</strong> {new Date(selectedIssue.updatedAt).toLocaleString()}</p> */}
//               <TextField
//                 label="Solution"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={solution}
//                 onChange={(e) => setSolution(e.target.value)}
//               />
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
         
//           <Button onClick={handleSubmitSolution} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default IssuesTable;
