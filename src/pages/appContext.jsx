import React, { useState, useEffect } from "react";

export const Context = React.createContext(null);

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            agendaSlug: "aforbidussi"
        },
        actions: {
            loadContacts: async () => {
                const store = getStore();
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data.contacts });
                    } else if (response.status === 404) {
                        await getActions().createAgenda();
                    }
                } catch (error) {
                    console.error("Error cargando contactos:", error);
                }
            },

            createAgenda: async () => {
                const store = getStore();
                await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}`, {
                    method: "POST"
                });
                getActions().loadContacts();
            },

            addContact: async (contactData) => {
                const store = getStore();
                const config = {
                    method: "POST",
                    body: JSON.stringify(contactData),
                    headers: { "Content-Type": "application/json" }
                };
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`, config);
                if (response.ok) {
                    getActions().loadContacts();
                }
            },
            updateContact: async (id, contactData) => {
                const store = getStore();
                const config = {
                    method: "PUT",
                    body: JSON.stringify(contactData),
                    headers: { "Content-Type": "application/json" }
                };
                try {
                    const response = await fetch(
                        `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${id}`, 
                        config
                    );
                    if (response.ok) {
                        getActions().loadContacts(); // Refrescamos la lista global
                        return true;
                    }
                } catch (error) {
                    console.error("Error actualizando contacto:", error);
                    return false;
                }
            },

            deleteContact: async (id) => {
                const store = getStore();
                try {
                    const response = await fetch(
                        `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${id}`,
                        { method: "DELETE" }
                    );
                    if (response.ok) {
                        getActions().loadContacts();
                        alert("Contacto eliminado con éxito");
                    }
                } catch (error) {
                    console.error("Error eliminando contacto:", error);
                }
            }
        }
    };
};

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            state.actions.loadContacts();
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;