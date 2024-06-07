import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { AxiosService } from '../../../services/ApiService';
import { getToken } from '../../../services/sessionProvider';

const IssuesTable = () => {
  const [issues, setIssues] = useState([]);
  const [replyIssues, setReplyIssues] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [solution, setSolution] = useState('');
  const [open, setOpen] = useState(false);
  const [complaintId, setComplaintId] = useState(null);

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
    console.log(issue)
    setSelectedIssue(issue);
    setComplaintId(issue.id);
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
        const token = await getToken();

        const response = await AxiosService.get(`/user/complaint/${complaintId}/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       // Log the full response to inspect its structure
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


console.log(messages);
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
                    Reply
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
              {/* <p><strong>ID:</strong> {selectedIssue.id}</p> */}
              {/* <p><strong>Title:</strong> {selectedIssue.title}</p> */}
              <div className='border-1 h-[250px] w-[100%]'>
                {messages.map((message, index) => (
                  <div 
                  key={index}
                  style={{
                    backgroundColor: message.sender === 'admin' ? 'red' : 'white',
                    color: message.sender === 'admin' ? 'white' : 'black',
                    padding: '8px',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    textAlign: message.sender === 'admin' ? 'left' : 'right',
                    marginLeft: message.sender === 'admin' ? '0' : 'auto',
                    marginRight: message.sender === 'admin' ? 'auto' : '0',
                    maxWidth: '60%' // Optional: to keep the messages within a reasonable width
                  }}
                >
                  {message.text}
                </div>
                
                ))}
              </div>




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
