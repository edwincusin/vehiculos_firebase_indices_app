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

const vehiculos = [
    { marca: "Chevrolet", modelo: "Onix", precio: 16500, stock: 12, anio: 2022, tipo: "Deportivo" },
    { marca: "Toyota", modelo: "Yaris", precio: 17800, stock: 18, anio: 2023, tipo: "Deportivo" },
    { marca: "Kia", modelo: "Picanto", precio: 15200, stock: 20, anio: 2021, tipo: "Deportivo" },
    { marca: "Suzuki", modelo: "Swift", precio: 18900, stock: 0, anio: 2025, tipo: "Deportivo" },
    { marca: "Jeep", modelo: "Renegade", precio: 28500, stock: 5, anio: 2024, tipo: "SUV" },

    { marca: "Hyundai", modelo: "Accent", precio: 19500, stock: 10, anio: 2022, tipo: "Sedan" },
    { marca: "Mazda", modelo: "Mazda 3", precio: 26000, stock: 8, anio: 2023, tipo: "Sedan" },
    { marca: "Nissan", modelo: "Versa", precio: 18500, stock: 15, anio: 2022, tipo: "Sedan" },
    { marca: "Ford", modelo: "EcoSport", precio: 27000, stock: 4, anio: 2021, tipo: "SUV" },
    { marca: "Volkswagen", modelo: "Polo", precio: 21000, stock: 9, anio: 2023, tipo: "Deportivo" },

    { marca: "Honda", modelo: "Civic", precio: 32000, stock: 6, anio: 2024, tipo: "Sedan" },
    { marca: "Toyota", modelo: "Corolla", precio: 28500, stock: 14, anio: 2023, tipo: "Sedan" },
    { marca: "Chevrolet", modelo: "Tracker", precio: 29500, stock: 7, anio: 2024, tipo: "SUV" },
    { marca: "Kia", modelo: "Sportage", precio: 34000, stock: 3, anio: 2025, tipo: "SUV" },
    { marca: "Hyundai", modelo: "Tucson", precio: 36500, stock: 8, anio: 2024, tipo: "SUV" },

    { marca: "Mitsubishi", modelo: "L200", precio: 42000, stock: 5, anio: 2023, tipo: "Camioneta" },
    { marca: "Ford", modelo: "Ranger", precio: 48000, stock: 4, anio: 2025, tipo: "Camioneta" },
    { marca: "Toyota", modelo: "Hilux", precio: 45000, stock: 10, anio: 2024, tipo: "Camioneta" },
    { marca: "Chevrolet", modelo: "D-Max", precio: 39000, stock: 6, anio: 2022, tipo: "Camioneta" },
    { marca: "Nissan", modelo: "Frontier", precio: 41000, stock: 2, anio: 2023, tipo: "Camioneta" },

    { marca: "Renault", modelo: "Duster", precio: 26500, stock: 11, anio: 2022, tipo: "SUV" },
    { marca: "Suzuki", modelo: "Vitara", precio: 27500, stock: 7, anio: 2023, tipo: "SUV" },
    { marca: "Mazda", modelo: "CX-5", precio: 38000, stock: 5, anio: 2024, tipo: "SUV" },
    { marca: "Jeep", modelo: "Compass", precio: 36500, stock: 3, anio: 2023, tipo: "SUV" },
    { marca: "Volkswagen", modelo: "Tiguan", precio: 39000, stock: 6, anio: 2025, tipo: "SUV" },

    { marca: "BMW", modelo: "Serie 3", precio: 52000, stock: 2, anio: 2024, tipo: "Deportivo" },
    { marca: "Mercedes-Benz", modelo: "Clase A", precio: 49000, stock: 4, anio: 2023, tipo: "Deportivo" },
    { marca: "Audi", modelo: "A3", precio: 46000, stock: 3, anio: 2024, tipo: "Deportivo" },
    { marca: "Porsche", modelo: "Macan", precio: 85000, stock: 1, anio: 2025, tipo: "SUV" },
    { marca: "Lexus", modelo: "IS 300", precio: 58000, stock: 2, anio: 2024, tipo: "Sedan" },

    { marca: "Chery", modelo: "Tiggo 2", precio: 18500, stock: 16, anio: 2023, tipo: "SUV" },
    { marca: "Great Wall", modelo: "Wingle 7", precio: 32000, stock: 8, anio: 2024, tipo: "Camioneta" },
    { marca: "JAC", modelo: "T8", precio: 31000, stock: 5, anio: 2023, tipo: "Camioneta" },
    { marca: "BYD", modelo: "Yuan Plus", precio: 35000, stock: 7, anio: 2025, tipo: "SUV" },
    { marca: "MG", modelo: "ZS", precio: 23000, stock: 12, anio: 2024, tipo: "SUV" },

    { marca: "Fiat", modelo: "Mobi", precio: 14500, stock: 20, anio: 2022, tipo: "Deportivo" },
    { marca: "Renault", modelo: "Logan", precio: 17500, stock: 9, anio: 2021, tipo: "Sedan" },
    { marca: "Peugeot", modelo: "2008", precio: 29500, stock: 4, anio: 2024, tipo: "SUV" },
    { marca: "Subaru", modelo: "Forester", precio: 42000, stock: 3, anio: 2025, tipo: "SUV" },
    { marca: "Tesla", modelo: "Model 3", precio: 55000, stock: 0, anio: 2025, tipo: "Electrico" },
    { marca: "Volvo", modelo: "XC40", precio: 48000, stock: 5, anio: 2024, tipo: "SUV" }
];

export const generarVehiculos = async () => {

    for (const vehiculo of vehiculos) {
        const referenciaVehiculo=await addDoc(collection(db, "vehiculos"), vehiculo)
        console.log("vehiculo registrado con id: ", referenciaVehiculo.id);
    }
    console.log("vehiculos generados exitosamente");
};

generarVehiculos();