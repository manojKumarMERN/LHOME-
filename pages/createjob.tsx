import React from 'react';
import css from '../styles/createjob.module.scss';
import { useFormik } from 'formik';
import { AxiosService } from '../services/ApiService';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getToken } from '../services/sessionProvider';
import DashboardLayout from './admindashboard';

interface ApplyForJobFormProps {
    header: string;
    joblocation: string;
    selectCat: boolean;
}

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

    return (
        <DashboardLayout>
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
                                <input
                                    type="text"
                                    name="title"
                                    className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                            </div>
                            <div className={css["col-50"]}>
                                <label className={css["formlabel"]}>Job Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.location}
                                />
                            </div>
                        </div>
                        <div className={css["row"]}>
                            <div className={css["col-50"]}>
                                <label className={css["formlabel"]}>Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.department}
                                />
                            </div>
                            <div className={css["col-50"]}>
                                <label className={css["formlabel"]}>Job Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                            </div>
                        </div>
                        <div className={css["row1"]}>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Experience</label>
                                <input
                                    type="text"
                                    name="experience"
                                    className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.experience}
                                />
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Qualification</label>
                                <input
                                    type="text"
                                    name="qualification"
                                    className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.qualification}
                                />
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Job Type</label>
                                <input
                                    type="text"
                                    name="job_type"
                                    className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.job_type}
                                />
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Salary</label>
                                <input
                                    type="text"
                                    name="salary"
                                    className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.salary}
                                />
                            </div>
                            <div className={css["col-20"]}>
                                <label className={css["formlabel"]}>Vacancies</label>
                                <input
                                    type="text"
                                    name="vacancies"
                                    className={css.forminput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.vacancies}
                                />
                            </div>
                        </div>
                        <div className={css.flex_box}>
                            <button className={`${css.jobApplybtn} ${css.jobApplybtn2}`} type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </DashboardLayout>
    );
};

export default CreateJob;
