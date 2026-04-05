import React, { useContext, useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import { Context } from "../pages/appContext.jsx"; 

export const Home = () => {
    const { store, actions } = useContext(Context);

    const [editId, setEditId] = useState(null);
    const [draft, setDraft] = useState({ name: "", address: "", phone: "", email: "" });

    useEffect(() => {
        actions.loadContacts();
    }, []);

    const startEditing = (contacto) => {
        setEditId(contacto.id);
        setDraft(contacto); 
    };

    const saveChanges = async (id) => {
        const success = await actions.updateContact(id, draft);
        if (success) {
            setEditId(null); 
        }
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4 text-white">Mi lista de contactos</h2>
            
            <div className="d-flex justify-content-end mb-3">
                <Link to="/AddContact">
                    <button className="btn btn-primary">
                        <i className="fa-solid fa-plus me-2"></i>Nuevo contacto
                    </button>
                </Link>
            </div>

            <div className="list-group shadow-sm">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contacto) => (
                        <div key={contacto.id} className="list-group-item p-3">
                            
                            {editId === contacto.id ? (
                                <div className="row g-3 align-items-center">
                                    <div className="col-12 col-md-4">
                                        <input 
                                            type="text" className="form-control form-control-sm mb-2" 
                                            placeholder="Nombre" value={draft.name}
                                            onChange={(e) => setDraft({...draft, name: e.target.value})}
                                        />
                                        <input 
                                            type="text" className="form-control form-control-sm" 
                                            placeholder="Dirección" value={draft.address}
                                            onChange={(e) => setDraft({...draft, address: e.target.value})}
                                        />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <input 
                                            type="text" className="form-control form-control-sm mb-2" 
                                            placeholder="Teléfono" value={draft.phone}
                                            onChange={(e) => setDraft({...draft, phone: e.target.value})}
                                        />
                                        <input 
                                            type="email" className="form-control form-control-sm" 
                                            placeholder="Email" value={draft.email}
                                            onChange={(e) => setDraft({...draft, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="col-12 col-md-4 d-flex justify-content-end gap-2">
                                        <button className="btn btn-success" onClick={() => saveChanges(contacto.id)}>
                                            <i className="fa-solid fa-floppy-disk me-1"></i> Guardar
                                        </button>
                                        <button className="btn btn-secondary" onClick={() => setEditId(null)}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center">
                                    <img
                                        src={`https://i.pravatar.cc/150?u=${contacto.id}`}
                                        className="rounded-circle me-3" 
                                        width="70" height="70" alt="Avatar"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-2 fs-5">{contacto.name}</h6>
                                        <div className="text-muted small">
                                            <p className="mb-1"><i className="fa-solid fa-location-dot me-2"></i>{contacto.address}</p>
                                            <p className="mb-1"><i className="fa-solid fa-phone me-2"></i>{contacto.phone}</p>
                                            <p className="mb-0"><i className="fa-solid fa-envelope me-2"></i>{contacto.email}</p>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button 
                                            className="btn btn-outline-primary border-0"
                                            onClick={() => startEditing(contacto)}
                                        >
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger border-0"
                                            onClick={() => actions.deleteContact(contacto.id)} 
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-5">
                        <p className="text-muted">No hay contactos disponibles.</p>
                    </div>
                )}
            </div>
        </div>
    );
};