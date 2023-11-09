import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { onHiddeBuscarPorFecha } from "../../store";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale';
import dateFormat from "dateformat";
registerLocale('es', es);
import "react-datepicker/dist/react-datepicker.css";
import { dateMax, dateMin } from "../../helpers/constants";
import { usePedidoStore } from "../../hooks";


export const MdlBuscarPorFecha = () => {

    const dispatch = useDispatch();
    const { isShowMdlBuscarPorFecha } = useSelector( state => state.ui );
    const { startSearchList } = usePedidoStore();
    
    const [dayDate, setDayDate] = useState(dateMax);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const handleClose = () => {
        dispatch(onHiddeBuscarPorFecha());
    }

    const onSearchDay = () => {
        const unica = dateFormat(dayDate, "yyyy-mm-dd");
        startSearchList({unica, desde: '', hasta: ''});
    }

    const onSearchRange = () => {
        if( !startDate || !endDate) return;
        if( startDate > endDate) return;
        
        const desde = dateFormat(startDate, "yyyy-mm-dd");        
        const hasta = dateFormat(endDate, "yyyy-mm-dd");
        startSearchList({unica: '', desde, hasta});
    }

    return (
        <>
            <Modal
                show={isShowMdlBuscarPorFecha}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title>BUSCAR POR FECHAS</Modal.Title>
                </Modal.Header>
                
                <Modal.Body id="mdl-date">
                    <Form>
                        <fieldset>
                            <legend>BUSCAR POR DÍA</legend>
                            <Row className="align-items-center">
                                <Col className="col-12 col-sm-6 mb-2">
                                    <DatePicker
                                        selected={dayDate}
                                        onChange={(date) => setDayDate(date)}
                                        minDate={dateMin}
                                        maxDate={dateMax}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        className="form-control"
                                        locale="es"
                                        dateFormat="dd/MM/yy"
                                        withPortal
                                        showIcon
                                        />
                                </Col>
                                <Col className="col-12 col-sm-6 d-grid">
                                    <Button 
                                        type="button"
                                        onClick={onSearchDay}>
                                        BUSCAR POR DÍA
                                    </Button>
                                </Col>
                            </Row>
                        </fieldset>
                    </Form> 

                    <hr />                   
                    
                    <form>
                        <fieldset>
                            <legend>BUSCAR ENTRE FECHAS</legend>
                            <Row className="align-items-center">
                                <Col className="col-12 col-sm-6 mb-2">
                                    <DatePicker
                                        className="form-control"
                                        locale="es"
                                        minDate={dateMin}
                                        maxDate={dateMax}
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="dd/MM/yy"
                                        onChange={(update) => {
                                            setDateRange(update);
                                        }}
                                        withPortal
                                        showIcon
                                        />
                                </Col>
                                <Col className="col-12 col-sm-6 d-grid">
                                    <Button 
                                        type="button"
                                        onClick={onSearchRange}>
                                        BUSCAR ENTRE FECHAS
                                    </Button>
                                </Col>
                            </Row>
                        </fieldset>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={handleClose}>
                        CERRAR
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
