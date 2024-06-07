import React from 'react';
import css from '../styles/createjob.module.scss';
import { useFormik } from 'formik';
import { AxiosService } from '../services/ApiService';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getToken } from '../services/sessionProvider';
import * as config from "../next.config";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer/Footer";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { ListItemButton, ListItemIcon, ListItemText, Container, Grid, Paper, Button } from '@mui/material';
import UserTable from './userlist';
import JobTable from './editjob';
import IssuesTable from './issuesreply';

interface ApplyForJobFormProps {
    header: string;
    joblocation: string;
    selectCat: boolean
}

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();
const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon />, value: 'Dashboard' },
    { name: 'Users', icon: <PeopleIcon />, value: 'Users' },
    { name: 'Job', icon: <PeopleIcon />, value: 'Job' },
    { name: 'Issues', icon: <DashboardIcon />, value: 'Issues' },
    { name: '', value: 'EditJob' },
  
  ];
  
  const componentMapping = {
    Dashboard: <Typography variant="h4">Hi</Typography>,
    Users: <UserTable />,
    Job: <JobTable />,
    Issues: <IssuesTable />,
    // EditJob: <JobEditForm />, // Add JobEditForm here
  };

  const [open, setOpen] = React.useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('Dashboard');

  const toggleDrawer = () => {
    setOpen(!open);
  };

const CreateJob: React.FC<ApplyForJobFormProps> = ({ header, joblocation, selectCat }) => {
    const [ResumeButton, setButton] = React.useState<string>('Upload Resume');
    const router = useRouter();

    const handleFileChange = (event) => {
        formik.setFieldValue('resume', event.target.files[0]);
        setButton(event.target.files[0].name);
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            experience: '',
            location: '',
            description: '',
            vacancies: '',
            salary: '',
            department: '',
            qualification: '',
            job_type: '',
        },
        onSubmit: async (values) => {
            try {
                const token = getToken();

                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('experience', values.experience);
                formData.append('location', values.location);
                formData.append('description', values.description);
                formData.append('vacancies', values.vacancies);
                formData.append('salary', values.salary);
                formData.append('department', values.department);
                formData.append('qualification', values.qualification);
                formData.append('job_type', values.job_type);

                const response = await AxiosService.put('/jobs', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                      },
                });

                if (response.status === 201) {
                    toast.success('Job created successfully');
                    setTimeout(() => {
                        // router.push('/joinuspage');
                    }, 2000);
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred while creating the job. Please try again.');
            }
        },
    });

    const { values, handleChange, handleBlur, touched, errors } = formik;


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

    const renderContent = () => {
        return componentMapping[selectedMenuItem] || <UserTable />;
      };

    return (
        <>
        <div className="animate-fade-in">
                <div className={css.lhomePage}>
                    <div className={hidden ? "hidden" : ""}>
                        <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />
                    </div>
                    <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                {menuItems.map((item) => (
                  <ListItemButton key={item.value} onClick={() => setSelectedMenuItem(item.value)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      {renderContent()}
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
        <div>
            <div className={css.overallContainer}>
                <h1 className={css.jobHead}>{header}</h1>
                <p className={css.jobpara}>{joblocation}</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <h1 className={css.formhead}>Create Job</h1>
                <div className={css["row"]}>
                    <div className={css["col-50"]}>
                        <div className={css["row"]}>
                            <div className={css["col-50"]}>
                                <label className={css["formlabel"]}>Role</label>
                                <input type="text"  name="title" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title} />
                            </div>
                            <div className={css["col-50"]}>
                                <label className={css["formlabel"]}>Job Location</label>
                                <input type="text"  name="location" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.location} />
                            </div>
                        </div>
                        <div className={css["row"]}>
                            <div className={css["col-50"]}>
                                <label className={css["formlabel"]}>Department</label>
                                <input type="text"  name="department" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.department} />
                            </div>
                            <div className={css["col-50"]}>
                                <label className={css["formlabel"]}>Job Description</label>
                                <input type="text"  name="description" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description} />
                            </div>
                        </div>
                        <div className={css["row1"]}>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Experience</label>
                                <input type="text"  name="experience" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.experience} />
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Qualification</label>
                                <input type="text" name="qualification" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.qualification} />
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Job Type</label>
                                <input type="text"  name="job_type" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.job_type} />
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Salary</label>
                                <input type="text"  name="salary" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.salary} />
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Vacancies</label>
                                <input type="text"  name="vacancies" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.vacancies} />
                            </div>
                        </div>
                        <div className={css.flex_box}>
                            <button className={`${css.jobApplybtn} ${css.jobApplybtn2}`} type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <Footer />
        </div>
        </div>
        </>
    );
};

export default CreateJob;
