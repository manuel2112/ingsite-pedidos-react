import { Table } from "react-bootstrap";
import { TiEdit, TiTrash } from "react-icons/ti";
import { useTblResumenPedido } from '../../hooks';
import { currencyFormat, nameArticle } from "../../helpers";

export const TblResumenPedido = () => {

    const { pedido, onEdit, onDelete, total, onClean, onSend } = useTblResumenPedido();    

    return (
        <>
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="text-right">ARTÍCULO</th>
                        <th>VALOR</th>
                        <th>CANTIDAD</th>
                        <th>TOTAL</th>
                        <th>EDITAR</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        pedido.map( (ped, idx) => (
                            <tr key={ ped.articulos_id }>
                                <td width={ '2%' }>{ idx + 1 }</td>
                                <td>{ nameArticle(ped.familia.familia_nombre, ped.articulos_descripcion) }</td>
                                <td>{ currencyFormat(ped.valor) }</td>
                                <td width={ '10%' }>{ ped.cantidad }</td>
                                <td>{ currencyFormat(ped.total) }</td>
                                <td width={ '10%' }>
                                    <button className="btn btn-warning btn-sm" onClick={ e => onEdit(e,ped) }>
                                        <TiEdit size="1.5em" color="white" />
                                    </button>
                                </td>
                                <td width={ '10%' }>
                                    <button className="btn btn-danger btn-sm" onClick={ e => onDelete(e,ped) }>
                                        <TiTrash size="1.5em" color="white" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                    <tr className="table-dark">
                        <th colSpan="6">
                            TOTAL
                        </th>
                        <th>
                            { currencyFormat(total) }
                        </th>
                    </tr>
                    
                </tbody>
            </Table>

            <div className="col-12 d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={onClean}>
                    LIMPIAR
                </button>
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={onSend}>
                    ENVIAR
                </button>
            </div>
        </>
    )
}
