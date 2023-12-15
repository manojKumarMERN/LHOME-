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
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phno: Yup.string().required('Phone number is required'),
    currentctc: Yup.string().required('current CTC is required'),
    expectedctc: Yup.string().required('Execpted CTC is required'),
    location: Yup.string().required('Loaction is required'),
    nperiod: Yup.boolean().oneOf([true, false], 'You must accept WhatsApp opt-in'),
    resume: Yup.mixed().required('Please upload your resume'),
});
const ApplyForJobForm: React.FC<ApplyForJobFormProps> = ({ header, joblocation, selectCat }) => {
    const [isselected, setSlected] = React.useState(selectCat);
    const [value, setValue] = React.useState(false);
    const [ResumeButton , setButton] = React.useState<string>('Upload Resume');
    const [PortfolioButton , setPortfolioButton] = React.useState<string>('Select File');

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
    const handleSelectPortfolio = (event) => {
        const selectedFile = event.target.files[0];
        setPortfolioButton(event.target.files[0].name);            
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
        },
        validationSchema: jobApplicationSchema,
        onSubmit: async (values) => {            
            try {
                const response = await AxiosService.post('/userdetail', {...values , portfolio : ''});
               
                console.log(response);
                
            } catch (error) {
                console.error('Error:', error.message);
            }
        },
    });
    const {  touched, errors } = formik;
    //
    const isErrorFirstName = touched.firstname && errors.firstname;
    const isErrorLastName = touched.lastname && errors.lastname;
    const isErrorEmail = touched.email && errors.email;
    const isErrorPhno = touched.phno && errors.phno;
    const isErrorCurrentctc = touched.currentctc && errors.currentctc;
    const isErrorExpectedctc = touched.expectedctc && errors.expectedctc;
    const isErrorLocation = touched.location && errors.location;
    const isErrorResume = touched.resume && errors.resume;
    
    const handleClick = (e) => {
        e.preventDefault();
        formik.handleSubmit();
        
    };
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
                <form >
                    <h1 className={css.formhead}>Apply for this job</h1>
                    <div className={css.formtxt}>Resume/CV *
                        <div className={css.padding}>
                            <input type='file' hidden id="Select_Resume" accept=".pdf, .doc, .docx"
                                onChange={(event) => {
                                    handleFileChange(event);
                                    formik.setFieldTouched('resume', true);
                                }} />
                            <Button className={css.formbtn} variant="outline-danger" onClick={handleResume}>{ResumeButton}</Button>
                        </div>

                    </div>
                    <p className={css.para_top}>Upload in either DOC, DOCX or PDF file format (file size not more than 1MB)</p>
                    <div className={css["row"]}>
                        <div className={css["col-50"]}>
                            <div className={css["row"]}>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>First Name*:</label>
                                    <input type="text" id="state" name="state" className={`${css.forminput} ${isErrorFirstName ? css.Error_style : ''}`} />
                                </div>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>Last Name*:</label>
                                    <input type="text" id="zip" name="zip" className={`${css.forminput} ${isErrorLastName ? css.Error_style : ''}`} />
                                </div>
                            </div>
                            <div className={css["row"]}>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>Email*:</label>
                                    <input type="text" id="state" name="state" className={`${css.forminput} ${isErrorEmail ? css.Error_style : ''}`} />
                                </div>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>Mobile*:</label>
                                    <input type="text" id="zip" name="zip" className={`${css.forminput} ${isErrorPhno ? css.Error_style : ''}`} />
                                </div>
                            </div>
                            {isselected ?
                                <div>
                                    <div className={css["row"]}>
                                        <div className={css["col-50"]} style={{ position: "relative" }}>
                                            <label className={css["formlabel"]} >Select department*:</label>
                                            <div style={{ display: "flex" }}>
                                                <input type="text" id="zip" name="zip" className={`${css.forminput} ${isErrorFirstName ? css.Error_style : ''}`} />
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
                                    <input type="text" id="state" name="state" className={`${css.forminput} ${isErrorCurrentctc ? css.Error_style : ''}`} />
                                </div>
                                <div className={css["col-30"]}>
                                    <label className={css["formlabel"]}>Expected CTC *</label>
                                    <input type="text" id="zip" name="zip" className={`${css.forminput} ${isErrorExpectedctc ? css.Error_style : ''}`} />
                                </div>
                                <div className={css["col-30"]}>
                                    <label className={css["formlabel"]}>Preferred Location *</label>
                                    <input type="text" id="zip" name="zip" className={`${css.forminput} ${isErrorLocation ? css.Error_style : ''}`} />
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
                                                <input type='file' hidden id="Select_File" onChange={handleSelectPortfolio} />
                                                <Button className={css.formbtn} variant="outline-danger" onClick={handleClickPortfolio}>{PortfolioButton}</Button>
                                            </div>
                                        </div>
                                        <p className={css.para}>Upload in either DOC, DOCX, PDF or EML file format (file size not more than 1MB)</p>
                                    </div>
                                </div>
                            </div>
                            <div className={css.flex_box}>
                                <button className={`${css.jobApplybtn} ${css.jobApplybtn2}`} type="submit" onClick={handleClick}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ApplyForJobForm;

