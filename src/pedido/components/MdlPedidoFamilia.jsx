import { useArticuloStore } from "../../hooks"
import { BtnFamilia } from "./BtnFamilia";

export const MdlPedidoFamilia = () => {

    const { families } = useArticuloStore();

    return (
        <>
            <div className="list-group list-box-article mt-2">
                {
                    families.length > 0 
                    ?
                    ( 
                        families.map( family => (
                            <BtnFamilia family={family} key={family.familia_id} /> 
                        ))
                    )
                    : 'SIN VALORES EXISTENTES'
                }
            </div>
        </>
    )
}
