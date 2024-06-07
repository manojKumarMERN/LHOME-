import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TableContainer,
  Paper,
  Box
} from '@mui/material';
import { MDBDataTable } from 'mdbreact';
import { AxiosService } from '../../../services/ApiService';
import { getToken } from '../../../services/sessionProvider';

const IssuesTable = () => {
  const [issues, setIssues] = useState([]);
  const [replyIssues, setReplyIssues] = useState([]);
  const [replyComplaint, setComplaint] = useState([]);
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

  const handleOpen = async (issue) => {
    setSelectedIssue(issue);
    setOpen(true);
    setReplyIssues([]); // Reset reply issues when a new dialog is opened
    setSolution(''); // Reset solution input when a new dialog is opened
    
    try {
      const token = await getToken();
      const response = await AxiosService.get(`/user/complaint/message/${issue.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
console.log(response)
      const complaintMessages = response.data.data.messages;
      setReplyIssues(complaintMessages.filter(msg => msg.complaintId === issue.id));
      console.log();
    } catch (error) {
      console.error('Error fetching complaint messages:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIssue(null);
    setSolution('');
  };

  
  const handleStatusChange = async (newStatus) => {
    if (selectedIssue) {
      const updatedIssue = { ...selectedIssue, status: newStatus };

      try {
        const token = await getToken();

        await AxiosService.put(
          `/user/complaint/status/${selectedIssue.id}`,
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIssues((prevIssues) =>
          prevIssues.map((issue) =>
            issue.id === selectedIssue.id ? updatedIssue : issue
          )
        );
        setSelectedIssue(updatedIssue);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  const getStatusStyle = (status) => {
    return {
      color: status === 'open' ? 'red' : 'green',
      fontWeight: 'bold',
    };
  };

  const data = {
    columns: [
      {
        label: 'Title',
        field: 'title',
        sort: 'asc',
      },
      {
        label: 'Complaint ID',
        field: 'customerId',
        sort: 'asc',
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
      },
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc',
      },
    ],
    rows: issues.map((issue) => ({
      title: issue.title,
      customerId: issue.customerId,
      status: (
        <span style={getStatusStyle(issue.status)}>
          {issue.status}
        </span>
      ),
      actions: (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen(issue)}
        >
          Reply
        </Button>
      ),
    })),
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <MDBDataTable striped bordered small data={data} />
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '80%' } }}
      >
        <DialogTitle>Issue Details</DialogTitle>
        <DialogContent>
          {selectedIssue && (
            <div>
              <p><strong>Title:</strong> {selectedIssue.title}</p>
              <div>
                <p><strong>Status:</strong></p>
                <Box sx={{ display: 'flex', gap: 4 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleStatusChange('Open')}
                    style={{ backgroundColor: selectedIssue.status === 'Open' ? 'red' : '' }}
                  >
                    Open
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleStatusChange('Close')}
                    style={{ backgroundColor: selectedIssue.status === 'Close' ? 'green' : '' }}
                  >
                    Close
                  </Button>
                </Box>
              </div>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '10px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                }}
              >
                {replyIssues.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: '10px',
                      backgroundColor: message.sender === 'admin' ? '#e0f7fa' : '#ffecb3',
                      alignSelf: message.sender === 'admin' ? 'flex-start' : 'flex-end',
                      borderRadius: '10px',
                      maxWidth: '70%',
                    }}
                  >
                    {message.text}
                  </Box>
                ))}
              </Box>
              <TextField
                label="Solution"
                fullWidth
                multiline
                rows={4}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                disabled={selectedIssue.status !== 'Open'}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button  color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IssuesTable;


// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import { AxiosService } from '../../../services/ApiService';
// import { getToken } from '../../../services/sessionProvider';

// const IssuesTable = () => {
//   const [issues, setIssues] = React.useState([]);
//   const [replyIssues, setReplayIssues] = React.useState([]);
//   const [selectedIssue, setSelectedIssue] =React. useState(null);
//   const [solution, setSolution] = React.useState('');
//   const [open, setOpen] = React.useState(false);

//   React. useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const response = await AxiosService.get('/user/complaints');
//         setIssues(response.data.data);
//         console.log(response.data);
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
//     const customerId = selectedIssue.id;
  
//     try {
    
//       const token = await getToken();
  
//       const response = await AxiosService.post('/user/complaint/message',{ complaintId:customerId, text:solution },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       setReplayIssues(response.data.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching issues:', error);
//     }
  
//     // console.log(`Submitting solution for issue ${selectedIssue.id}: ${text}`);
//     handleClose();
//   };
  
//   const updateSelectedIssue = (newId) => {
//     setSelectedIssue((prevState) => ({
//       ...prevState,
//       id: newId,
//     }));
//   };
  
  
  

//   const sortedIssues = issues.sort((a, b) => a.id - b.id);

//   return (
//     <div>
//       <TableContainer component={Paper}>
//         <Table>
//           {/* <TableHead>
//             <TableRow>
//               <TableCell sx={{ padding: '8px', width: '30%', textAlign: 'center' }}>Complaint ID</TableCell>
//               <TableCell sx={{ padding: '8px', width: '30%' , textAlign: 'center' }}>Status</TableCell>
//               <TableCell sx={{ padding: '8px', width: '40%' , textAlign: 'center' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead> */}
//           <TableBody>
//             {sortedIssues.map((issue) => (
//               <TableRow key={issue.id}>
//                 <TableCell sx={{ padding: '8px', width: '30%', textAlign: 'center'  }}>{issue.customerId}</TableCell>
//                 <TableCell sx={{ padding: '8px', width: '30%', textAlign: 'center'  }}>{issue.status}</TableCell>
//                 <TableCell sx={{ padding: '8px', width: '40%', textAlign: 'center'  }}>
//                   <Button variant="contained" color="primary" onClick={() => handleOpen(issue)}>
//                     Reply
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>


//       <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '80%' } }}>
//         <DialogTitle>Issue Details</DialogTitle>
//         <DialogContent>
//           {selectedIssue && (
//             <div>
//               <p><strong>ID:</strong> {selectedIssue.id}</p>
//               <p><strong>Title:</strong> {selectedIssue.title}</p>
//               <p><strong>Status:</strong> {selectedIssue.status}</p>
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



// import React, { useEffect, useState } from "react";
// import css from "./Customersupport.module.scss";
// import { AxiosService } from "../../../services/ApiService";
// import Image from "next/image";
// import { format } from 'date-fns';
// import { getUserId } from '../../../services/sessionProvider';

// const MyIssue = () => {
//     const [issues, setIssues] = useState([]);
//     const customerId = getUserId();

//     useEffect(() => {
//         const fetchIssues = async () => {
//             try {
//                 const response = await AxiosService.get(`/user/complaints`);
//                 console.log("API response:", response.data); // Log the API response
//                 setIssues(response.data.data); // Set the issues state
    
//             } catch (error) {
//                 console.error('Error fetching issues:', error);
//             }
//         };
//         fetchIssues();
//     }, [customerId]);
    
//     console.log("Issues:", issues); // Log the issues variable
    
//     return (
//         <div className={css.dummycontainer}>
//             {Array.isArray(issues) && issues.length === 0 ? (
//                 <div className="flex items-center justify-center">
//                     <Image src={require("../../../public/assets/Tabimage/hand.png")} alt="" className={css.handicon} />
//                     <div className={css.noissue}>No Issues Found!</div>
//                 </div>
//             ) : (
//                 issues.map((issue, index) => (
//                     <div className={css.Box} key={index}>
//                         <span className={css.content}>{issue.title}</span>
//                         <p className={css.time}>{format(new Date(issue.createdAt), 'dd/MM/yyyy')}</p>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
    
// };

// export default MyIssue;


// import React from "react";
// import css from "./Customersupport.module.scss";
// import * as config from "../../../next.config.js";
// import { simpleCallInitAPI } from '../../../services/ApicallInit';
// import { AxiosService } from "../../../services/ApiService";
// import { getUserId } from "../../../services/sessionProvider";
// import Image from "next/image";
// import { format } from 'date-fns';
// import { getToken } from '../../../services/sessionProvider'; 


// const MyIssue = () => {
//     let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
//     const [Customersupport, setCustomersupport] = React.useState([]);

//         const userId = getToken();
//         if(userId){
//             AxiosService.get('/user/complaint/1/messages')
//                 .then((response) => {
//                     const issues = response.data.data.map((item: any) => {
//                         return {
//                             issue: item.text,
//                             createdAt: item.createdAt
//                         };
//                     });
//                     setCustomersupport(issues);
//                     console.log(response.data)
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching user data:", error);
//                 });
//         }

//     return (
//         <>
//             <React.Fragment>
//                 <div className={css.dummycontainer}>
//                     {Customersupport.length === 0 ?
//                         <div className="flex items-center justify-center">
//                             <Image src={require("../../../public/assets/Tabimage/hand.png")} alt="" className={css.handicon} />
//                             <div className={css.noissue}>No Issues Found!</div>
//                         </div>
//                         : Customersupport.map((issue, index) => (
//                             <div className={css.Box} key={index}>
//                                 <span className={css.content}>{issue.issue}</span>
//                                 <p className={css.time}>{format(new Date(issue?.createdAt) , 'dd/MM/yyyy') ?? issue?.createdAt}</p>
//                             </div>))
//                     }
//                 </div>
//             </React.Fragment>


//         </>
//     )
// }
// export default MyIssue;