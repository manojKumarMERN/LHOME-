import React, { useEffect } from 'react';
import css from '../styles/createjob.module.scss';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AxiosService } from '../services/ApiService';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getToken } from '../services/sessionProvider';

interface ApplyForJobFormProps {
    header: string;
    joblocation: string;
    selectCat: boolean;
    jobId?: string;  // Added jobId prop
}

const CreateJob: React.FC<ApplyForJobFormProps> = ({ header, joblocation, selectCat, jobId }) => {
    const [ResumeButton, setButton] = React.useState<string>('Upload Resume');
    const router = useRouter();

    useEffect(() => {
        if (jobId) {
            // Fetch job details by ID and populate the form
            const fetchJobDetails = async () => {
                try {
                    const token = getToken();
                    const response = await AxiosService.get(`/jobs/${jobId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.status === 200) {
                        const jobDetails = response.data;
                        formik.setValues({
                            title: jobDetails.title,
                            experience: jobDetails.experience,
                            location: jobDetails.location,
                            description: jobDetails.description,
                            vacancies: jobDetails.vacancies,
                            salary: jobDetails.salary,
                            department: jobDetails.department,
                            qualification: jobDetails.qualification,
                            job_type: jobDetails.job_type,
                        });
                    } else {
                        throw new Error(`Unexpected response status: ${response.status}`);
                    }
                } catch (error) {
                    console.error('Error fetching job details:', error);
                    toast.error('An error occurred while fetching job details. Please try again.');
                }
            };

            fetchJobDetails();
        }
    }, [jobId]);

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
        validationSchema: Yup.object({
            title: Yup.string().required('Role is required'),
            experience: Yup.string().required('Experience is required'),
            location: Yup.string().required('Job Location is required'),
            description: Yup.string().required('Job Description is required'),
            vacancies: Yup.number().required('Vacancies are required'),
            salary: Yup.string().required('Salary is required'),
            department: Yup.string().required('Department is required'),
            qualification: Yup.string().required('Qualification is required'),
            job_type: Yup.string().required('Job Type is required'),
        }),
        onSubmit: async (values) => {
            try {
                const token = getToken();
                console.log('Form Values:', values); // Log form values for debugging

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

                const response = await AxiosService.patch(`/jobs/${jobId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    toast.success('Job updated successfully');
                    setTimeout(() => {
                        router.push('/joinuspage');
                    }, 2000);
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred while updating the job. Please try again.');
            }
        },
    });

    const { values, handleChange, handleBlur, touched, errors } = formik;

    return (
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
                                <input type="text" name="title" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title} />
                                {touched.title && errors.title ? <span className='text-red-500'>{errors.title}</span> : null}
                            </div>
                            <div className={css["col-50"]}>
                                <label className={css["formlabel"]}>Job Location</label>
                                <input type="text" name="location" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.location} />
                                {touched.location && errors.location ? <span className='text-red-500'>{errors.location}</span> : null}
                            </div>
                        </div>
                        <div className={css["row"]}>
                            <div className={css["col-50"]}>
                                <label className={css["formlabel"]}>Department</label>
                                <input type="text" name="department" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.department} />
                                {touched.department && errors.department ? <span className='text-red-500'>{errors.department}</span> : null}
                            </div>
                            <div className={css["col-50"]}>
                                <label className={css["formlabel"]}>Job Description</label>
                                <input type="text" name="description" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description} />
                                {touched.description && errors.description ? <span className='text-red-500'>{errors.description}</span> : null}
                            </div>
                        </div>
                        <div className={css["row1"]}>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Experience</label>
                                <input type="text" name="experience" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.experience} />
                                {touched.experience && errors.experience ? <span className='text-red-500'>{errors.experience}</span> : null}
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Qualification</label>
                                <input type="text" name="qualification" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.qualification} />
                                {touched.qualification && errors.qualification ? <span className='text-red-500'>{errors.qualification}</span> : null}
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Job Type</label>
                                <input type="text" name="job_type" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.job_type} />
                                {touched.job_type && errors.job_type ? <span className='text-red-500'>{errors.job_type}</span> : null}
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Salary</label>
                                <input type="text" name="salary" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.salary} />
                                {touched.salary && errors.salary ? <span className='text-red-500'>{errors.salary}</span> : null}
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Vacancies</label>
                                <input type="text" name="vacancies" className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.vacancies} />
                                {touched.vacancies && errors.vacancies ? <span className='text-red-500'>{errors.vacancies}</span> : null}
                            </div>
                        </div>
                        <div className={css.flex_box}>
                            <button className={`${css.jobApplybtn} ${css.jobApplybtn2}`} type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateJob;
