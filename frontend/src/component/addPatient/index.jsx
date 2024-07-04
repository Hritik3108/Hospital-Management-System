import { useRef, useState } from 'react';
import './AddPatient.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../loading';

const AddPatient = () => {

    const [name, setName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [sex, setSex] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const sessionActive = useSelector((store) => store.user.sessionActive);
    const token = useSelector((store) => sessionActive ? store.user.token : null);

    const formRef = useRef();
    const navigate = useNavigate();
    const config = {
        headers: { 
            'Authorization': `JWT ${token}`,
            'Content-Type': 'multipart/form-data' 
        },
        withCredentials: true
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        console.log('submit');

        const formData = new FormData();
        if (profilePicture) {
            // console.log('profile pic found')
            formData.append('file', profilePicture);
        }
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('sex', sex);
        formData.append('birthdate', birthdate);

        try {
            const patientResponse = await axios.post("/API/addPatient", formData, config);
            if (patientResponse.status === 201) {
                toast.success("Patient Added!");
                navigate('/home');
            }
            console.log('response', patientResponse.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            toast.error("Failed to add patient. Please try again.");
            setLoading(false);
        }
    }

    function handlePicture(e) {
        const file = e.target.files[0];
        setProfilePicture(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicturePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    function handleCloseBtn() {
        navigate('/home');
    }

    if (loading) {
        return <Loading />;
    }
    
    return (
        <>
            <div className='auth d-flex justify-content-center align-items-center vh-100'>
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />

                <div className='container-fluid auth-container'>
                    <button
                        type="button"
                        className="close-btn align-items-center justify-content-center"
                        onClick={handleCloseBtn}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>

                    <div className="row">
                        <div className="form-col d-flex align-items-center justify-content-center">
                            <form className="auth-form" ref={formRef} onSubmit={handleSubmit}>
                                <h2>Add Patient</h2>
                                <div className="profile-photo-group">
                                    <label htmlFor="profilePicture" className="label-cls">
                                        {!profilePicture && (
                                            <FontAwesomeIcon id='profile-picture-icon' className='profile-picture-icon fa-fw' icon={faUser} />
                                        )}
                                        {profilePicture && (
                                            <img
                                                src={profilePicturePreview}
                                                className='profile-img'
                                                alt="Profile Preview"
                                            />
                                        )}
                                    </label>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        name="profilePicture"
                                        className="profilePicture"
                                        style={{ display: 'none' }}
                                        onChange={handlePicture}
                                    />
                                </div>
                                
                                <div className="name-group">
                                    <input
                                        type="text"
                                        id="name"
                                        name='name'
                                        value={name}
                                        className="form-control"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                                
                                <div className="phone-group mt-3">
                                    <input
                                        type="number"
                                        id="phone"
                                        name='phone'
                                        value={phone}
                                        className="form-control"
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone Number"
                                        required
                                    />
                                </div>
                
                                <div className="address-group mt-3">
                                    <input
                                        type="text"
                                        id="address"
                                        name='address'
                                        value={address}
                                        className="form-control"
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Address"
                                        required
                                    />
                                </div>
                                
                                <div className="gender-group mt-3">
                                    <input
                                        type="text"
                                        id="sex"
                                        name='sex'
                                        value={sex}
                                        className="form-control"
                                        onChange={(e) => setSex(e.target.value)}
                                        placeholder="Gender"
                                        required
                                    />
                                </div>

                                <div className="birthdate-group mt-3"> 
                                    <label htmlFor="dob" className="edit-label">
                                        Date of birth
                                    </label>       
                                    <input
                                        type="date"
                                        name="birthdate"
                                        id="birthdate"
                                        className="form-control"
                                        onChange={(e)=>setBirthdate(e.target.value)}
                                        value={birthdate}
                                        required
                                    />
                                </div>

                                <button type="submit" className='btn btn-dark mt-3'>Add Patient</button>
                                {error && <span className="error m-3">{error}</span>}
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>    
        </>
    )
}

export default AddPatient;
