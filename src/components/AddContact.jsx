import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../pages/appContext.jsx";

const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        actions.addContact(contact);

        navigate("/");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6 shadow p-4 rounded bg-white">
                    <h2 className="text-center mb-4">Agregar un Nuevo Contacto</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name" name="name"
                                placeholder="Full Name" value={contact.name} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email"
                                placeholder="name@example.com" value={contact.email} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>

                            <input type="tel" className="form-control" id="phone" name="phone"
                                placeholder="Phone" value={contact.phone} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" name="address"
                                placeholder="Address" value={contact.address} onChange={handleChange} required />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <Link className="text-decoration-none text-secondary" to="/">
                                ← Regresar a contactos
                            </Link>
                            <button type="submit" className="btn btn-primary px-5">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContact;