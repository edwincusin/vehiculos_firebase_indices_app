import { useState } from "react";
import { consulta1, consulta2, consulta3, consulta4, obtenerVehiculos, type Vehiculo } from "../scripts/consultaVehiculos";

function TarjetasVehiculos() {

    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [detalleConsulta, setDetalleConsulta] = useState(0);

    const ejecutarConsulta = async (consulta: () => Promise<Vehiculo[]>, numero: number) => {
        try {
            const resultado = await consulta();
            setVehiculos(resultado);
            setDetalleConsulta(numero);
            console.log("Consulta ", numero ," : ",resultado)
        } catch (error) {
            console.error(`ERROR en consulta ${numero}:`, error);
        }
    };

    const mostrarDetalleConsulta = () => {
        if (detalleConsulta === 0) {
            return (
                <div className="detalle-consulta">
                    <p>Todos</p>
                </div>
            );
        }

        if (detalleConsulta === 1) {
            return (
                <div className="detalle-consulta">
                    <h3>Consulta 1</h3>
                    <p><strong>Filtros:</strong> stock &gt; 0</p>
                    <p><strong>Orden:</strong> precio ASC</p>
                    <p><strong>Descripción:</strong> Vehículos disponibles ordenados de menor a mayor precio.</p>
                </div>
            );
        }

        if (detalleConsulta === 2) {
            return (
                <div className="detalle-consulta">
                    <h3>Consulta 2</h3>
                    <p><strong>Filtros:</strong> tipo == "SUV", stock &gt; 0</p>
                    <p><strong>Orden:</strong> precio ASC</p>
                </div>
            );
        }

        if (detalleConsulta === 3) {
            return (
                <div className="detalle-consulta">
                    <h3>Consulta 3</h3>
                    <p><strong>Filtros:</strong> precio &gt;= 20000, precio &lt;= 40000, stock &gt; 0</p>
                    <p><strong>Orden:</strong> precio ASC</p>
                </div>
            );
        }

        if (detalleConsulta === 4) {
            return (
                <div className="detalle-consulta">
                    <h3>Consulta 4 — Reto</h3>
                    <p><strong>Filtros:</strong> tipo == "Sedan", anio &gt;= 2023, stock &gt; 0</p>
                    <p><strong>Orden:</strong> anio DESC</p>
                </div>
            );
        }

        return null;   // por si llega un número que no existe
    };

    return (

        <>
            <div>
                <button type="button" onClick={()=>ejecutarConsulta(obtenerVehiculos,0)}>VER TODOS</button>
                <button type="button" onClick={()=>ejecutarConsulta(consulta1,1)}>CONSULTA 1</button>
                <button type="button" onClick={()=>ejecutarConsulta(consulta2,2)}>CONSULTA 2</button>
                <button type="button" onClick={()=>ejecutarConsulta(consulta3,3)}>CONSULTA 3</button>
                <button type="button" onClick={()=>ejecutarConsulta(consulta4,4)}>CONSULTA 4</button>
            </div>

            <div>Regla Consulta</div>
            {mostrarDetalleConsulta()}

            <div>Total vehiculos{vehiculos.length}</div>
            <div>
                {vehiculos.map((vehiculo) => (
                    <div
                        key={vehiculo.id}
                    >
                        <p>{vehiculo.id}</p>
                        <p>{vehiculo.marca}</p>
                        <p>{vehiculo.modelo}</p>
                        <p>{vehiculo.precio}</p>
                        <p>{vehiculo.stock}</p>
                        <p>{vehiculo.anio}</p>
                        <p>{vehiculo.tipo}</p>

                    </div>
                ))}
            </div>
        </>
    );

}

export default TarjetasVehiculos;