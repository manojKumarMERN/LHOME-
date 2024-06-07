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
      
      const complaintMessages = response.data.data.messages;
      setReplyIssues(complaintMessages.filter(msg => msg.complaintId === issue.id));
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
        <TextField
                label="Message"
                fullWidth
                multiline
                rows={1}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
              />
          <Button  color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IssuesTable;

