import './appointment.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Loading from '../loading';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Appointment = () => {

    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [date,setDate] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const sessionActive = useSelector((store) => store.user.sessionActive);
    const user = useSelector((store) => sessionActive ? store.user.user : null);
    const token = useSelector((store) => sessionActive ? store.user.token : null);

    const params = new URLSearchParams(location.search);
    const patientId = params.get('patientId');

    const config = {
        headers: { 
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json' 
        },
        withCredentials: true
    };

    useEffect(()=>{
        // window.location.reload();
    },[patientId])

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorResponse = await axios.get("/API/doctors", config);
                setDoctors(doctorResponse.data.doctors);
                // console.log('doc response', doctorResponse.data.doctors);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setError("Error fetching doctor data");
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [token]);

    function handleImageSource(source) {
        if (source.slice(0, 4) === "file") {
            return `http://localhost:5100/${source}`;
        } else {
            return source;
        }
    }

    function handleCloseBtn(){
        navigate('/home')
    }

    async function handleAdmit(doctorId){
        setLoading(true)
        const bodyParameter={
            patientId:patientId,
            date:date
        }

        try {
            const appointmentResponse = await axios.post(`/API/bookappointment/${doctorId}`, bodyParameter, config);
            // if (appointmentResponse.status === 201) {
            //     navigate('/home');
            // }
            console.log('response', appointmentResponse.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return(
        <>
        <div className='auth justify-content-center align-items-center'>
                <div className='container-fluid'>
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
                <div className='container-fluid table-container'>
                    <div className='row'>
                        <div className='col-12'>
                            <h2 className='text-center my-4'>Doctors</h2>
                            <div className="table-responsive">
                                <table className='table table-striped table-bordered'>
                                    <thead>
                                        <tr className="table-heading bg-warning">
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Phone Number</th>
                                            <th>department</th>
                                            <th>fee</th>
                                            <th>Pick Date^</th>
                                            <th>Appointment^</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctors && doctors.slice().reverse().map((doctor) => (
                                            <tr key={doctor._id}>
                                                <td>
                                                    <img 
                                                        src={doctor.profilePicture ? handleImageSource(doctor.profilePicture) : ''} 
                                                        alt='doctor image' 
                                                        className='table-image'  
                                                    />
                                                </td>
                                                <td>{doctor.name}</td>
                                                <td>{doctor.phone}</td>
                                                <td>{doctor.department}</td>
                                                <td>{doctor.fee}</td>
                                                <td>      
                                                <input
                                                    type="date"
                                                    name="date"
                                                    id="date"
                                                    className="form-control"
                                                    onChange={(e)=>setDate(e.target.value)}
                                                    value={date}
                                                    required
                                                />
                                                </td>
                                                <td>
                                                    <button 
                                                        className="btn btn-primary btn-sm" 
                                                        onClick={() => handleAdmit(doctor._id)}
                                                    >
                                                        Book Appointment
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            </div>        
        </>
    )
}

export default Appointment;