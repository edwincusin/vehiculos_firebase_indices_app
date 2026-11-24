import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export interface Vehiculo {
    marca: string;
    modelo: string;
    precio: number;
    stock: number;
    anio: number;
    tipo: string;
};

const vehiculos: Vehiculo[] = [
    // Sedan
        // 
    { marca: "Chevrolet", modelo: "Onix", precio: 16500, stock: 12, anio: 2022, tipo: "Deportivo" },
    { marca: "Toyota", modelo: "Yaris", precio: 17800, stock: 18, anio: 2023, tipo: "Deportivo" },
    { marca: "Kia", modelo: "Picanto", precio: 15200, stock: 20, anio: 2021, tipo: "Deportivo" },
    { marca: "Suzuki", modelo: "Swift", precio: 18900, stock: 0, anio: 2025, tipo: "Deportivo" },
    { marca: "Jeep", modelo: "Swift", precio: 18900, stock: 0, anio: 2025, tipo: "Deportivo" },
];


export const generarVehiculos = async () => {

    for (const vehiculo of vehiculos) {
        const referenciaVehiculo=await addDoc(collection(db, "vehiculos"), vehiculo)
        console.log("vehiculo registrado con id: ", referenciaVehiculo.id);
    }
    console.log("vehiculos generados exitosamente");
};

generarVehiculos();