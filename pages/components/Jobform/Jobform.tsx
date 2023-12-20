import React from 'react';
import css from './form.module.scss';
import Switch from './Switch';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { BiSolidDownArrow } from 'react-icons/bi';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AxiosService } from '../../../services/ApiService';

interface ApplyForJobFormProps {
    header: string;
    joblocation: string;
    selectCat: boolean
}
const jobApplicationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Phone number is required').email('Invalid email address').required('Email is required'),
    phno: Yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Phone number must contain only digits').min(10, 'Phone number must be exactly 10 digits').max(10, 'Phone number cannot exceed 10 digits'),
    currentctc: Yup.string().required('current CTC is required').matches(/^\d+(\.\d{1,2})?LPA$/, 'Please provide a valid CTC in the format X.YLPA (e.g., 1.5LPA)'),
    expectedctc: Yup.string().required('Execpted CTC is required').matches(/^\d+(\.\d{1,2})?LPA$/, 'Please provide a valid CTC in the format X.YLPA (e.g., 1.5LPA)'),
    location: Yup.string().required('Loaction is required'),
    nperiod: Yup.boolean().oneOf([true, false], 'You must accept WhatsApp opt-in'),
    resume: Yup.mixed().required('Please upload your resume'),
    portfolio : Yup.mixed().optional()
});
const ApplyForJobForm: React.FC<ApplyForJobFormProps> = ({ header, joblocation, selectCat }) => {
    const [isselected, setSlected] = React.useState(selectCat);
    const [value, setValue] = React.useState(false);
    const [ResumeButton, setButton] = React.useState<string>('Upload Resume');
    const [PortfolioButton, setPortfolioButton] = React.useState<string>('Select File');

    const handleClickPortfolio = () => {
        const fileInput = document.getElementById('Select_File');
        if (fileInput) {
            fileInput.click();
        }
    };
    const handleResume = () => {
        console.log('handleResume function called');
        const fileInput = document.getElementById('Select_Resume');
        if (fileInput) {
            fileInput.click();
        }
    };
    const handleFileChange = (event) => {
        formik.setFieldValue('resume', event.target.files[0]);
        setButton(event.target.files[0].name);
    };
    // const handleSelectPortfolio = (event) => {
    //     const selectedFile = event.target.files[0];
    //     setPortfolioButton(event.target.files[0].name);
    // };
    const handleSelectPortfolio = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setPortfolioButton(selectedFile.name);
            formik.setFieldValue('portfolio', selectedFile);
        }
    };
    //yup form validation

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phno: '',
            currentctc: '',
            expectedctc: '',
            location: '',
            nperiod: '',
            resume: '',
            portfolio:''
        },
        validationSchema: jobApplicationSchema,
        onSubmit: async (values) => {
            try {
                console.log({ ...values, portfolio: '' });
                const formData = new FormData();
                formData.append('firstName', values.firstname);
                formData.append('lastName', values.lastname);
                formData.append('email', values.email);
                formData.append('phno', values.phno);
                formData.append('currentctc', values.currentctc);
                formData.append('expectedctc', values.expectedctc);
                formData.append('location', values.location);
                formData.append('nperiod', values.nperiod);
                formData.append('resume', values.resume);
                formData.append('portfolio', values.portfolio);

                console.log(formData);
                // const response = await AxiosService.post('/jobApplication',);
                // console.log(formData);
    
                const response = await AxiosService.post('/jobApplication', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
            
                console.log(response.data);

            } catch (error) {
                console.error('Error:', error.message);
            }
        },
    });
    const { values, handleChange, handleBlur, touched, errors } = formik;
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     formik.handleSubmit();

    // };
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "left" }}>
                <div className={css.jobLeftarrow}>
                    <Link href={{ pathname: "/joinuspage" }}>
                        <MdKeyboardArrowLeft className={css.LeftarrowIcon} />
                        <p>View all jobs</p>
                    </Link>
                </div>
            </div>
            <div className={css.overallContainer}>
                <h1 className={css.jobHead}>{header}</h1>
                <p className={css.jobpara}>{joblocation}</p>
            </div>
            <div className={css["container"]}>
                <form onSubmit={formik.handleSubmit} >
                    <h1 className={css.formhead}>Apply for this job</h1>
                    <div className={css.formtxt}>Resume/CV *
                        <div className={css.padding}>
                            <input type='file' hidden id="Select_Resume" accept=".pdf, .doc, .docx" name='resume'
                                onChange={(event) => {
                                    handleFileChange(event);
                                    formik.setFieldTouched('resume', true);
                                }} />
                            <Button className={css.formbtn} variant="outline-danger" onClick={handleResume}>{ResumeButton ? ResumeButton : 'Upload Resume'}</Button>
                        </div>

                    </div>
                    <p className={css.para_top}>Upload in either DOC, DOCX or PDF file format (file size not more than 1MB)</p>
                    <div className={css["row"]}>
                        <div className={css["col-50"]}>
                            <div className={css["row"]}>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>First Name*:</label>
                                    <input type="text" id="state" name="firstname" className={css.forminput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstname} />
                                    {formik.touched.firstname && formik.errors.firstname ? <span className='text-red-500'>{formik.errors.firstname}</span> : null}
                                </div>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>Last Name*:</label>
                                    <input type="text" id="zip" name="lastname" className={css.forminput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastname} />
                                    {formik.touched.lastname && formik.errors.lastname ? <span className='text-red-500'>{formik.errors.lastname}</span> : null}
                                </div>
                            </div>
                            <div className={css["row"]}>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>Email*:</label>
                                    <input type="text" id="state" name="email" className={css.forminput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email} />
                                    {formik.touched.email && formik.errors.email ? <span className='text-red-500'>{formik.errors.email}</span> : null}
                                </div>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>Mobile*:</label>
                                    <input type="text" id="zip" name="phno" className={css.forminput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phno} />
                                    {formik.touched.phno && formik.errors.phno ? <span className='text-red-500'>{formik.errors.phno}</span> : null}
                                </div>
                            </div>
                            {isselected ?
                                <div>
                                    <div className={css["row"]}>
                                        <div className={css["col-50"]} style={{ position: "relative" }}>
                                            <label className={css["formlabel"]} >Select department*:</label>
                                            <div style={{ display: "flex" }}>
                                                <input type="text" id="zip" name="zip" className={css.forminput} value={formik.values.firstname} />
                                                <div className={css.BiSolidDownArrow}><BiSolidDownArrow /></div>
                                            </div>
                                        </div>
                                        <div className={css["col-50"]}></div>
                                    </div>
                                </div> : ""
                            }
                            <h4 className={css['secondhead']}>Mandatory Questions</h4>
                            <div className={css["row"]}>
                                <div className={css["col-30"]}>
                                    <label className={css["formlabel"]}>Current CTC *</label>
                                    <input type="text" id="state" name="currentctc" className={css.forminput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.currentctc} />
                                    {formik.touched.currentctc && formik.errors.currentctc ? <span className='text-red-500'>{formik.errors.currentctc}</span> : null}
                                </div>
                                <div className={css["col-30"]}>
                                    <label className={css["formlabel"]}>Expected CTC *</label>
                                    <input type="text" id="zip" name="expectedctc" className={css.forminput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.expectedctc} />
                                    {formik.touched.expectedctc && formik.errors.expectedctc ? <span className='text-red-500'>{formik.errors.expectedctc}</span> : null}
                                </div>
                                <div className={css["col-30"]}>
                                    <label className={css["formlabel"]}>Preferred Location *</label>
                                    <input type="text" id="zip" name="location" className={css.forminput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.location} />
                                    {formik.touched.location && formik.errors.location ? <span className='text-red-500'>{formik.errors.location}</span> : null}
                                </div>
                            </div>
                            <div className={css["row"]}>
                                <div className={css["col-30"]}>
                                    <div className={css.highmade}>
                                        <h5 className={css.formhead1}>Are you currently serving your notice period? *</h5>
                                    </div>
                                    <div className="form-check form-switch" id={css['form-check']}>
                                        <Switch isOn={value} onColor="#048811" handleToggle={() => setValue(!value)}
                                        /></div>
                                </div>
                                <div className={css["vr"]}></div>
                                <div className={css["col-30"]}>
                                    <div className={css["rightside"]}>
                                        <div className={css.formhead1} >Portfolio (if available)
                                            <div className={css.padding}>
                                                <input type='file' hidden id="Select_File" name='portfolio' onChange={(e)=>{
                                                    handleSelectPortfolio(e);
                                                    handleChange(e)
                                                    }} />
                                                <Button className={css.formbtn} variant="outline-danger" onClick={handleClickPortfolio}>{PortfolioButton ? PortfolioButton : 'Select File'}</Button>
                                            </div>
                                        </div>
                                        <p className={css.para}>Upload in either DOC, DOCX, PDF or EML file format (file size not more than 1MB)</p>
                                    </div>
                                </div>
                            </div>
                            <div className={css.flex_box}>
                                <button className={`${css.jobApplybtn} ${css.jobApplybtn2}`} type="submit" >Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ApplyForJobForm;

