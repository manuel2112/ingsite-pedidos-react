import { Button, ButtonToolbar, FloatingLabel, Form, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useMdlClienteInsert } from "../../hooks";

export const MdlClienteInsert = () => {

    const { isShowMdlClienteInsert, handleClose, onSubmit, rutValid, formSubmitted, rut, updateRut, nombreFormValid, nombreForm, onInputChange, direccionFormValid, direccionForm, ciudadFormValid, ciudadForm, fonoFormValid, fonoForm, isCreditForm, onInputClick, isCreditFormValid, montoValid, montoCreditForm } = useMdlClienteInsert();

    return (
        <>
            <Modal
                show={isShowMdlClienteInsert}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title>NUEVO CLIENTE</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Form onSubmit={onSubmit}>

                        <div className="col-12 mb-3">
                            <FloatingLabel controlId="floatingRut" label="RUT (OPCIONAL)">
                                <Form.Control 
                                    type="text" 
                                    placeholder="RUT..."
                                    className={ rutValid && formSubmitted ? 'is-invalid' : ''}
                                    value={rut.formatted}
                                    onChange={(e) => updateRut(e.target.value)}
                                    />
                                <Form.Control.Feedback type="invalid" tooltip style={{ display: rutValid && formSubmitted ? 'block' : 'none' }}>{rutValid}</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                        <div className="col-12 mb-4">
                            <FloatingLabel controlId="floatingNombre" label="NOMBRE/RAZÓN SOCIAL">
                                <Form.Control 
                                    type="text" 
                                    placeholder="NOMBRE..." 
                                    className={ nombreFormValid && formSubmitted ? 'is-invalid' : ''}
                                    name="nombreForm"
                                    value={nombreForm}
                                    onChange={onInputChange}
                                    />
                                <Form.Control.Feedback type="invalid" tooltip style={{ display: nombreFormValid && formSubmitted ? 'block' : 'none' }}>{nombreFormValid}</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                        <div className="col-12 mb-4">
                            <FloatingLabel controlId="floatingDireccion" label="DIRECCIÓN">
                                <Form.Control 
                                    type="text" 
                                    placeholder="DIRECCIÓN..." 
                                    className={ direccionFormValid && formSubmitted ? 'is-invalid' : ''}
                                    name="direccionForm"
                                    value={direccionForm}
                                    onChange={onInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip style={{ display: direccionFormValid && formSubmitted ? 'block' : 'none' }}>{direccionFormValid}</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                        <div className="col-12 mb-4">
                            <FloatingLabel controlId="floatingCiudad" label="CIUDAD">
                                <Form.Control 
                                    type="text" 
                                    placeholder="CIUDAD..." 
                                    className={ ciudadFormValid && formSubmitted ? 'is-invalid' : ''}
                                    name="ciudadForm"
                                    value={ciudadForm}
                                    onChange={onInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip style={{ display: ciudadFormValid && formSubmitted ? 'block' : 'none' }}>{ciudadFormValid}</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                        <div className="col-12 mb-4">
                            <FloatingLabel controlId="floatingFono" label="TELÉFONO">
                                <Form.Control 
                                    type="number" 
                                    placeholder="TELÉFONO..." 
                                    className={ fonoFormValid && formSubmitted ? 'is-invalid' : ''}
                                    name="fonoForm"
                                    value={fonoForm}
                                    onChange={onInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip style={{ display: fonoFormValid && formSubmitted ? 'block' : 'none' }}>{fonoFormValid}</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                        <div className="col-12 mb-1">
                            <Form.Label className="text-center" style={{width: "100%"}}>¿TENDRÁ CRÉDITO?</Form.Label>
                            <ButtonToolbar className="d-flex justify-content-center">
                                <ToggleButtonGroup type="radio" name="isCreditForm">
                                    <ToggleButton variant={ isCreditForm === 'SI' ? 'primary' : 'outline-primary'} onClick={e => onInputClick(e,'SI')}>SI </ToggleButton>
                                    <ToggleButton variant={ isCreditForm === 'NO' ? 'primary' : 'outline-primary'} onClick={e => onInputClick(e,'NO')}>NO </ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                            <Form.Control.Feedback type="invalid" className="text-center" style={{ display: isCreditFormValid && formSubmitted ? 'block' : 'none' }}>{isCreditFormValid}</Form.Control.Feedback>
                        </div>
                        <div className="col-12 mb-4" style={{ display: isCreditForm === 'SI' ? 'block' : 'none' }}>
                            <FloatingLabel controlId="floatingMontoCredito" label="MONTO CRÉDITO">
                                <Form.Control 
                                    type="number" 
                                    placeholder="MONTO CRÉDITO..." 
                                    className={ montoValid && formSubmitted ? 'is-invalid' : ''}
                                    name="montoCreditForm"
                                    value={montoCreditForm}
                                    onChange={onInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip style={{ display: montoValid && formSubmitted ? 'block' : 'none' }}>{montoValid}</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>

                        <div className="row">
                            <div className="col-12 d-grid gap-2">
                                <Button 
                                    variant="primary" 
                                    type="submit">
                                    INGRESAR
                                </Button>
                            </div>
                        </div>

                    </Form>

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
