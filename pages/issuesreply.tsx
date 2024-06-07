import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { AxiosService } from '../services/ApiService';
import { getToken } from '../services/sessionProvider';

const IssuesTable = (complaintId) => {
  const [issues, setIssues] = useState([]);
  const [replyIssues, setReplyIssues] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [solution, setSolution] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await AxiosService.get('/user/complaints');
        setIssues(response.data.data);
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
    const customerId = selectedIssue.id;

    try {
      const token = await getToken();

      const response = await AxiosService.post('/user/complaint/message', { complaintId: customerId, text: solution }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReplyIssues(response.data.data);
    } catch (error) {
      console.error('Error submitting solution:', error);
    }

    handleClose();
  };

  const updateSelectedIssue = (newId) => {
    setSelectedIssue((prevState) => ({
      ...prevState,
      id: newId,
    }));
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AxiosService.get(`/user/complaint/${complaintId}/messages`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [complaintId]);

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

  const sortedIssues = issues.sort((a, b) => a.id - b.id);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: '8px', width: '30%', textAlign: 'center' }}>Complaint ID</TableCell>
              <TableCell sx={{ padding: '8px', width: '30%', textAlign: 'center' }}>Status</TableCell>
              <TableCell sx={{ padding: '8px', width: '40%', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell sx={{ padding: '8px', width: '30%', textAlign: 'center' }}>{issue.customerId}</TableCell>
                <TableCell sx={{ padding: '8px', width: '30%', textAlign: 'center' }}>
                  <span style={getStatusStyle(issue.status)}>
                    {issue.status}
                  </span>
                </TableCell>
                <TableCell sx={{ padding: '8px', width: '40%', textAlign: 'center' }}>
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
  <DialogTitle>Chat Conversation</DialogTitle>
  <DialogContent>
    {selectedIssue && (
      <div>
        {/* <div className='text-right'> */}
          <p><strong>Status:
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
          </strong></p>
        {/* </div> */}
        <p><strong>ID:</strong> {selectedIssue.id}</p>
        <p><strong>Title:</strong> {selectedIssue.title}</p>
       
       <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
  {selectedIssue && Array.isArray(selectedIssue.messages) && selectedIssue.messages.map((message) => (
    <Box
      key={message.id}
      sx={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '16px',
        marginLeft: message.sender === 'admin' ? 'auto' : 0, // Align admin messages to the right
        marginRight: message.sender === 'customer' ? 'auto' : 0, // Align customer messages to the left
        textAlign: message.sender === 'admin' ? 'right' : 'left', // Set text alignment based on sender
        backgroundColor: message.sender === 'admin' ? '#f0f0f0' : '#e0f7fa', // Set background color based on sender
      }}
    >
      {message.text}
    </Box>
  ))}
</Box>



      </div>
    )}
  </DialogContent>
  <DialogActions sx={{ justifyContent: 'flex-end' }}>
    <TextField
      label="Message"
      fullWidth
      multiline
      rows={1}
      value={solution}
      onChange={(e) => setSolution(e.target.value)}
    />
    <Button onClick={handleSubmitSolution} variant="contained" color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>


    </div>
  );
};

export default IssuesTable;
