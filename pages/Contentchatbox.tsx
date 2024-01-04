import React from 'react';
import css from '../styles/Contentchatbox.module.scss';
import Modal from 'react-bootstrap/Modal';
import { BsChevronDown, BsEmojiSmile } from 'react-icons/bs'
import { IoArrowDownCircleOutline, IoSendSharp } from 'react-icons/io5'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AxiosService } from '../services/ApiService';
import { getChatUserId, getUserId } from '../services/sessionProvider';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


interface ChildProps {
    onDataReceived: (data: string) => void;
}

const userEntrySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    number: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    city: Yup.string().required('City is required'),
    message: Yup.string().optional()
});

const Contentchatbox = (props: ChildProps) => {
    const userId = getUserId();
    const district: string[] = [
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kanchipuram",
        "Kanniyakumari",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Mayiladuthurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivagangai",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar"
    ];
    const [chatConversation, setChatConversation] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const chatArea = React.useRef(null);
    const [processingResponse, setProcessingResponse] = React.useState(false);
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          number: '',
          city: '',
          message: '',
        },
        validationSchema: userEntrySchema,
        onSubmit: async(values) => {
            try{
          const response = await AxiosService.post('/chatbot' , values);
          console.log(response);
          if(response.status == 200){
            const { chatbotuser } = response.data;
            await Cookies.set('chatUserId', chatbotuser.id, { expires: 7, path: '/' });
            handleOpenModal();
          }
        }catch(err){
            toast.error(err?.response?.data?.error?.errors?.[0].message);
            
        }
          

        },
      });

      const { values, handleChange, handleBlur, touched, errors } = formik;



    const generateWavyClipPath = () => {
        const N = 100;
        let clipPath = "";

        for (let i = 0; i < N + 1; i++) {
            clipPath +=
                `${(100 / N) * i}% ${100 * (0.5 + 0.20 * Math.sin((2 * Math.PI * i) / N))
                }%,`;
        }

        clipPath = clipPath + "100% 100%,0 100%";
        return `polygon(${clipPath})`;
    };

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        const data = 'Hi there !';
        props.onDataReceived(data);
        setChatConversation(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            handleInput()
        }
    }

    const handleChatArea = () => {
        const element = document.getElementById('chatArea');
        if (element) {
            element.focus();
        }
    }

    const handleInput = () => {
        if (input.trim() === '') {
            return;
        }
        setProcessingResponse(true);

        let response;
        if (messages.length % 3 === 0) {
            response = { sender: 'Bot', text: 'would you like to take a look at our products ?', checkbox1: `Yes`, checkbox2: 'No' };
        } else if (messages.length % 3 !== 1 && input.toLowerCase() == 'yes') {
            response = { sender: 'Bot', text: '', products: ['kitchen', 'bedroom', 'living room', 'space saving furniture'] };
        } else if (messages.length % 3 !== 1 && input.toLowerCase() == 'no') {
            response = { sender: 'Bot', text: ' We are always available. Come back anytime!' };
        } else {
            response = { sender: 'Bot', text: ' Nice to have conversation with you' };
        }

        const updatedMessages = [...messages, { sender: 'You', text: input }];
        setMessages(updatedMessages);
        setTimeout(() => {
            setMessages([...updatedMessages, response]);
            setProcessingResponse(false);
        }, 1000)

        setInput('');
    }
    
    React.useEffect(() => {
        if (chatArea.current) {
            chatArea.current.scrollTop = chatArea.current.scrollHeight;
        }
        if(userId || getChatUserId()){
            setChatConversation(true);
        }
    }, [messages, processingResponse,userId]);



    return (
        <React.Fragment>
            <div className={css.maindivchatbot}>
                <div style={{ clipPath: generateWavyClipPath() }} className={css.chatboxback}>
                </div>

                <section className={css.sectionbg}>
                    {!chatConversation ?
                        <form onSubmit={formik.handleSubmit}>
                            <input type='text' name='name' placeholder='Enter your name'  onChange={handleChange} onBlur={handleBlur} value={values.name}/>
                            {formik.touched.name && formik.errors.name ? <span className='text-red-500 mt-[-4%]'>{formik.errors.name}</span> : null}
                            <input type='text' name='email' placeholder='Enter your email address' onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                            {formik.touched.email && formik.errors.email ? <span className='text-red-500 mt-[-4%]'>{formik.errors.email}</span> : null}
                            <input type='text' name='number' placeholder='Enter your mobile number ' onChange={handleChange} onBlur={handleBlur} value={values.number}/>
                            {formik.touched.number && formik.errors.number ? <span className='text-red-500 mt-[-4%]'>{formik.errors.number}</span> : null}

                            <select
                                className={css.select}
                                name='city'
                                onChange={handleChange} onBlur={handleBlur} value={values.city}
                                required
                            >
                                <option value="" disabled hidden>Select your city</option>

                                {district && district.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.city && formik.errors.city ? <span className='text-red-500 mt-[-4%]'>{formik.errors.city}</span> : null}
                            <textarea onChange={handleChange} onBlur={handleBlur} value={values.message} name='message' placeholder='Type your message here and click submit ' ></textarea>
                            <div className={css.btnDiv}>
                                <button type='submit' className={css.formBtn} >Submit</button>
                            </div>
                        </form> :
                        <div>
                            {messages.length != 0 && <div ref={chatArea} className={css.chatHistory}>
                                {messages.map((message, index) => (
                                    <div key={index} className={''}>
                                        <div className={message.sender == "You" ? css.user : css.bot}>
                                            {(message.products && !processingResponse) ? <></> : <span className={message.sender == "You" ? css.userText : css.botText}>{message.text}</span>}
                                            {
                                                message.checkbox1 && <div className='flex pl-[10%] pr-[15%] justify-between mt-[3%]'>
                                                    <span onClick={() => setInput('Yes')} className='bg-[#58B743] text-[#FFFFFF] px-[15%] py-[4%] rounded-3xl cursor-pointer'>{message.checkbox1}</span>
                                                    <span onClick={() => setInput('No')} className='bg-[#F44336] text-[#FFFFFF] px-[15%] py-[4%] rounded-3xl cursor-pointer'>{message.checkbox2}</span>
                                                </div>
                                            }

                                            {
                                                message.products && message.products.map((product, index) => (<div key={index} className={css.botText + " mt-2 flex justify-between"}><span>{product}</span><IoArrowDownCircleOutline size={32} style={{ color: '#737373', cursor: 'pointer' }} /></div>))
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>}
                            <div onClick={handleChatArea} className={css.type_Chat_Area}>
                                <input type='text' placeholder='Enter your message' id='chatArea' onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={handleKeyDown} className={css.TypeText} />
                                <div className={css.bottom_chat_Icon}>
                                    {messages.length != 0 && <div className={css.emojiIcon}><BsEmojiSmile /></div>}
                                    <div className={css.sendIcon} onClick={handleInput}><IoSendSharp className={css.sendIcon_content} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </section>


            </div>

            {isModalOpen && <Modal onClose={handleCloseModal} />}
        </React.Fragment>
    )
}

export default Contentchatbox;