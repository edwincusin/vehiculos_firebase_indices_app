import { useEffect, useState } from "react";
import { obtenerVehiculosPaginados, TAMANIO_PAGINA, type Vehiculo } from "../scripts/consultaVehiculos";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { FaCar, FaCarSide, FaCarAlt, FaTruckPickup } from "react-icons/fa";


type Cursor = QueryDocumentSnapshot<DocumentData> | undefined;

function VehiculoListaPaginada() {

    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [ultimoDocumento, setUltimoDocumento] = useState<Cursor>(undefined);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [cursores, setCursores] = useState<Cursor[]>([]);
    const [hayMas, setHayMas] = useState(true);

    const documentoInicial = (numeroPagina - 1) * TAMANIO_PAGINA + 1;

    const documentoFinal = documentoInicial + vehiculos.length - 1;

    useEffect(() => {

        const cargarPrimeraPagina = async () => {
            const resultado = await obtenerVehiculosPaginados();
            setVehiculos(resultado.listaVehiculos);
            setUltimoDocumento(resultado.cursor);
            setCursores([undefined]);
            setNumeroPagina(1);
            setHayMas(resultado.listaVehiculos.length === TAMANIO_PAGINA);
        }

        cargarPrimeraPagina();
    }, [])


    const siguientePagina = async () => {
        if (!ultimoDocumento) return;

        const resultado = await obtenerVehiculosPaginados(ultimoDocumento);

        const copia = [...cursores];
        copia[numeroPagina] = ultimoDocumento;
        setCursores(copia);

        setVehiculos(resultado.listaVehiculos);
        setUltimoDocumento(resultado.cursor)
        setNumeroPagina(numeroPagina + 1);

        setHayMas(resultado.listaVehiculos.length === TAMANIO_PAGINA);
    }

    const regresarPagina = async () => {

        const resultado = await obtenerVehiculosPaginados(cursores[numeroPagina - 2]);

        setVehiculos(resultado.listaVehiculos);
        setUltimoDocumento(resultado.cursor)
        setNumeroPagina(numeroPagina - 1);

        setHayMas(true);
    }


    return (
        <div className="vh-app">

            <header className="vh-cabecera">
                <h1>Catálogo de vehículos -Paginación</h1>
                <p>Explora nuestro inventario de vehículos disponibles.</p>
            </header>



            {vehiculos.length === 0 ? (
                <div className="vh-vacio">
                    No hay vehículos para mostrar.
                </div>
            ) : (

                <div className="vh-grid">

                    {vehiculos.map((vehiculo) => {

                        const tipo = vehiculo.tipo.toLowerCase();

                        const Icono =
                            tipo === "camioneta" || tipo === "pickup"
                                ? FaTruckPickup
                                : tipo === "suv"
                                    ? FaCarSide
                                    : tipo === "sedan"
                                        ? FaCarAlt
                                        : FaCar;

                        const claseTipo =
                            tipo === "camioneta" || tipo === "pickup"
                                ? "pickup"
                                : tipo === "suv"
                                    ? "suv"
                                    : tipo === "sedan"
                                        ? "sedan"
                                        : "hatchback";

                        return (
                            <article
                                className={`vh-card vh-tipo--${claseTipo}`}
                                key={vehiculo.id}
                            >

                                <div className="vh-card__visual">

                                    <span className="vh-card__tipo">
                                        {vehiculo.tipo}
                                    </span>

                                    <div className="vh-card__icono">
                                        <Icono />
                                    </div>

                                </div>

                                <div className="vh-card__cuerpo">

                                    <p className="vh-card__marca">
                                        {vehiculo.marca}
                                    </p>

                                    <h2 className="vh-card__modelo">
                                        {vehiculo.modelo}
                                    </h2>

                                    <div className="vh-card__meta">
                                        <span>Año: {vehiculo.anio}</span>

                                        <span className={`vh-stock ${vehiculo.stock === 0
                                            ? "vh-stock--agotado"
                                            : ""
                                            }`}>
                                            {vehiculo.stock === 0
                                                ? "Agotado"
                                                : `${vehiculo.stock} disponibles`}
                                        </span>
                                    </div>

                                    <div className="vh-card__pie">

                                        <span className="vh-card__precio">
                                            ${vehiculo.precio.toLocaleString("en-US")}
                                        </span>

                                        <span className="vh-card__id">
                                            ID: {vehiculo.id}
                                        </span>

                                    </div>

                                </div>

                            </article>
                        );
                    })}

                </div>
            )}
            <div className="vh-paginacion-info">

                <h3>Página {numeroPagina}</h3>

                <p>
                    Documentos del <strong>{documentoInicial}</strong>
                    al <strong>{documentoFinal}</strong>
                </p>

                <span>
                    Vehículos cargados: {vehiculos.length}
                </span>

            </div>
            <footer className="vh-paginacion">

                <button
                    type="button"
                    className="vh-btn vh-btn--anterior"
                    onClick={regresarPagina}
                    disabled={numeroPagina <= 1}
                >
                    &laquo; Página anterior
                </button>


                <button
                    type="button"
                    className="vh-btn vh-btn--siguiente"
                    onClick={siguientePagina}
                    disabled={!hayMas}
                >
                    Siguiente página &raquo;
                </button>

            </footer>

        </div>
    );

}

export default VehiculoListaPaginada;