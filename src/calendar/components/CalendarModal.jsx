import React, { useMemo, useState } from 'react';
import Modal from 'react-modal';

import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { addHours, differenceInSeconds } from 'date-fns';

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    //States
    const [isOpen, setIsOpen] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: 'Edu Estula',
        notes: 'Estudiando ando',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    //Memos
    const titleClass = useMemo(() => {
        if(!formSubmitted)
            return "";

        return !formValues.title ? "is-valid" : "";

    }, [formValues.title, formSubmitted]);

    const onCloseModal = () => {
        setIsOpen(false);
    }

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (date, field) => {
        setFormValues({
            ...formValues,
            [field]: date
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const dateDifference = differenceInSeconds(formValues.end, formValues.start);
        if(isNaN(dateDifference) || dateDifference <= 0){
            Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
            return console.log("Error en fechas");
        }

        if(!formValues.title)
            return;

        console.log("formValues", formValues);

    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        className="form-control"
                        selected={formValues.start}
                        onChange={(event) => onDateChange(event, 'start')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        className="form-control"
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChange(event, 'end')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
