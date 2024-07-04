import React from "react";
import './home.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Loading from '../loading';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../util/userSlice';
import formatDateString from "../../util/formatDateString";

function Home() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null); // Added error state
    const navigate = useNavigate();
    const sessionActive = useSelector((store) => store.user.sessionActive);
    const user = useSelector((store) => sessionActive ? store.user.user : null);
    const token = useSelector((store) => sessionActive ? store.user.token : null);

    const config = {
        headers: { 
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json' 
        },
        withCredentials: true
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientResponse = await axios.get("/API/patients", config);
                setPatients(patientResponse.data.patients);
                // console.log('patient response', patientResponse.data.patients);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setError("Error fetching patient data");
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

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

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsResponse = await axios.get("/API/rooms", config);
                setRooms(roomsResponse.data.rooms);
                // console.log('room response', roomsResponse.data.rooms);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setError("Error fetching Rooms data");
                setLoading(false);
            }
        };

        fetchRooms();
    }, [token]);

    async function handleDelete(patientId) {
        console.log('delete');
        try {
            const patientResponse = await axios.delete(`/API/patient/delete/${patientId}`, config);
            setLoading(false);
            if(patientResponse.status===200){
                window.location.reload();
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setError("Error fetching patient data");
            setLoading(false);
        }
        
    }

    async function handleAdmit(patientId) {
        console.log('Admit');
        // Implement admit functionality here
    }

    async function handleAppointment(patientId) {
        console.log('Appointment');
        navigate(`/bookappointment?patientId=${patientId}`);
    }

    // function handleEdit(patientId) {
    //     navigate(`/patient?patientId=${patientId}`);
    // }

    function handleRoomAllotment(patientId) {
        console.log('allotment');
        // Implement room allotment functionality here
    }

    function handleOnClick(patientId) {
        navigate(`/patient?patientId=${patientId}`);
    }

    function handleImageSource(source) {
        if (source.slice(0, 4) === "file") {
            return `http://localhost:5100/${source}`;
        } else {
            return source;
        }
    }

    function handleLogout() {
        dispatch(logoutUser());
        navigate('/');
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="dashboard">
            <span className="home-heading">
                {user && (
                    <span className="d-flex profile-desc">
                        <img 
                            src={user.profilePicture ? handleImageSource(user.profilePicture) : ''} 
                            alt='Profile image' 
                            className='profile-image rounded-circle me-2'
                            width="62" 
                            height="62"  
                        />
                        <btn className="btn username">{user && user.name}</btn>
                        <btn className="btn logout-btn" onClick={handleLogout}>Logout</btn>
                    </span>
                )}
                <h1 className="text-center mb-4">Dashboard</h1>
            </span>
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card text-white bg-primary">
                        <div className="card-header">Patients</div>
                        <div className="card-body">
                            <h5 className="card-title">{patients ? patients.length : '0'}</h5>
                            <p className="card-text">Total registered Patients</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card text-white bg-success">
                        <div className="card-header">Doctors</div>
                        <div className="card-body">
                            <h5 className="card-title">{doctors?doctors.length:'0'}</h5>
                            <p className="card-text">Total available doctors</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card text-white bg-warning">
                        <div className="card-header">Rooms</div>
                        <div className="card-body">
                            <h5 className="card-title">{rooms?rooms.length:'0'}</h5>
                            <p className="card-text">Total available Rooms</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className='container-fluid table-container'>
                    <div className='row'>
                        <div className='col-12'>
                            <button className='btn btn-dark w-25' onClick={() => navigate('/addPatient')}>Add Patients</button>
                            <h2 className='text-center my-4'>Patients</h2>
                            <div className="table-responsive">
                                <table className='table table-striped table-bordered'>
                                    <thead>
                                        <tr className="table-heading bg-warning">
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Phone Number</th>
                                            <th>Address</th>
                                            <th>Sex</th>
                                            <th>Date Of Birth</th>
                                            {/* <th>Room Number</th> */}
                                            <th>Admit^</th>
                                            <th>Appointment^</th>
                                            {/* <th>Edit^</th> */}
                                            <th>Delete^</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients && patients.slice().reverse().map((patient) => (
                                            <tr key={patient._id}>
                                                <td>
                                                    <img 
                                                        src={patient.profilePicture ? handleImageSource(patient.profilePicture) : ''} 
                                                        alt='patient image' 
                                                        className='table-image' 
                                                        onClick={() => handleOnClick(patient._id)} 
                                                    />
                                                </td>
                                                <td>{patient.name}</td>
                                                <td>{patient.phone}</td>
                                                <td>{patient.address}</td>
                                                <td>{patient.sex}</td>
                                                <td>{formatDateString(patient.birthdate)}</td>
                                                {/* <td>
                                                    {patient.room ? patient.room.room_no : (
                                                        <button 
                                                            className="btn btn-warning btn-sm" 
                                                            onClick={() => handleRoomAllotment(patient._id)}
                                                        >
                                                            Allot Room
                                                        </button>
                                                    )}
                                                </td> */}
                                                <td>
                                                    <button 
                                                        className="btn btn-primary btn-sm" 
                                                        onClick={() => handleAdmit(patient._id)}
                                                    >
                                                        Admit
                                                    </button>
                                                </td>
                                                <td>
                                                    {patient.appointments.length==0?
                                                        <button 
                                                            className="btn btn-secondary btn-sm" 
                                                            onClick={() => handleAppointment(patient._id)}
                                                        >
                                                            Book
                                                        </button>
                                                        :
                                                        <div>{formatDateString(patient.appointments[0].date)}</div>
                                                    }
                                                    
                                                </td>
                                                {/* <td>
                                                    <button 
                                                        className="btn btn-warning btn-sm" 
                                                        onClick={() => handleEdit(patient._id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </td> */}
                                                <td>
                                                    <button 
                                                        className="btn btn-danger btn-sm" 
                                                        onClick={() => handleDelete(patient._id)}
                                                    >
                                                        Delete
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
    );
}

export default Home;
