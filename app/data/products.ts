import { Product } from "../types/product";

import tazaCeramica from "@/public/assets/taza-ceramica.jpeg";
import camisaNegra from "@/public/assets/camisa-negra.jpg";
import agenda2025 from "@/public/assets/agenda-2025.jpg";
import almohadaViscoelastica from "@/public/assets/almohada-viscoelastica.jpg";
import auricularesBluetooth from "@/public/assets/auriculares-bluetooth.webp";
import boligrafoMetalico from "@/public/assets/boligrafo-metalico.jpg";
import botellaAgua1L from "@/public/assets/botella-agua-1l.jpeg";
import cajaOrganizadora from "@/public/assets/caja-organizadora.webp";
import camisetaBlanca from "@/public/assets/camiseta-blanca.webp";
import cargadorUSBC from "@/public/assets/cargador-usb-c.jpg";
import cuadernoA5 from "@/public/assets/cuaderno-a5.jpg";
import gorraAzul from "@/public/assets/gorra-azul.webp";
import lamparaLedEscritorio from "@/public/assets/lampara-led-escritorio.jpg";
import mochilaUrbana from "@/public/assets/mochila-urbana.webp";
import mouseInalambrico from "@/public/assets/mouse-inalambrico.jpg";
import tecladoMecanico from "@/public/assets/teclado-mecanico.jpg";
import vasoTermico from "@/public/assets/vaso-termico.jpg";
import zapatillasRunning from "@/public/assets/zapatillas-running.jpeg";
import termoAceroInoxidable from "@/public/assets/termo-acero-inoxidable.png";
import paraguasPlegable from "@/public/assets/paraguas-plegable.jpg";

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Taza Cerámica",
    sku: "TAZ-001",
    price: 9.99,
    stock: 50,
    status: "active",
    imgUrl: tazaCeramica,
  },
  {
    id: "2",
    name: "Camisa Negra",
    sku: "CAM-NEG-002",
    price: 19.99,
    stock: 15,
    status: "active",
    imgUrl: camisaNegra,
  },
  {
    id: "3",
    name: "Cuaderno A5",
    sku: "CUE-A5-003",
    price: 4.5,
    stock: 0,
    status: "inactive",
    imgUrl: cuadernoA5,
  },
  {
    id: "4",
    name: "Mouse Inalámbrico",
    sku: "MOU-004",
    price: 25.99,
    stock: 40,
    status: "active",
    imgUrl: mouseInalambrico,
  },
  {
    id: "5",
    name: "Botella de Agua 1L",
    sku: "BOT-005",
    price: 12.99,
    stock: 30,
    status: "active",
    imgUrl: botellaAgua1L,
  },
  {
    id: "6",
    name: "Auriculares Bluetooth",
    sku: "AUR-006",
    price: 49.99,
    stock: 20,
    status: "active",
    imgUrl: auricularesBluetooth,
  },
  {
    id: "7",
    name: "Agenda 2025",
    sku: "AGE-007",
    price: 7.5,
    stock: 10,
    status: "inactive",
    imgUrl: agenda2025,
  },
  {
    id: "8",
    name: "Lámpara LED de Escritorio",
    sku: "LAM-008",
    price: 29.99,
    stock: 18,
    status: "active",
    imgUrl: lamparaLedEscritorio,
  },
  {
    id: "9",
    name: "Camiseta Blanca",
    sku: "CAM-BLA-009",
    price: 14.99,
    stock: 35,
    status: "active",
    imgUrl: camisetaBlanca,
  },
  {
    id: "10",
    name: "Bolígrafo Metálico",
    sku: "BOL-010",
    price: 3.25,
    stock: 100,
    status: "active",
    imgUrl: boligrafoMetalico,
  },
  {
    id: "11",
    name: "Cargador USB-C",
    sku: "CAR-011",
    price: 22.5,
    stock: 12,
    status: "active",
    imgUrl: cargadorUSBC,
  },
  {
    id: "12",
    name: "Almohada Viscoelástica",
    sku: "ALM-012",
    price: 39.99,
    stock: 0,
    status: "inactive",
    imgUrl: almohadaViscoelastica,
  },
  {
    id: "13",
    name: "Gorra Azul",
    sku: "GOR-013",
    price: 9.49,
    stock: 27,
    status: "active",
    imgUrl: gorraAzul,
  },
  {
    id: "14",
    name: "Termo Acero Inoxidable",
    sku: "TER-014",
    price: 24.99,
    stock: 22,
    status: "active",
    imgUrl: termoAceroInoxidable,
  },
  {
    id: "15",
    name: "Zapatillas Running",
    sku: "ZAP-015",
    price: 64.99,
    stock: 8,
    status: "active",
    imgUrl: zapatillasRunning,
  },
  {
    id: "16",
    name: "Paraguas Plegable",
    sku: "PAR-016",
    price: 15.5,
    stock: 16,
    status: "active",
    imgUrl: paraguasPlegable,
  },
  {
    id: "17",
    name: "Mochila Urbana",
    sku: "MOC-017",
    price: 44.99,
    stock: 5,
    status: "inactive",
    imgUrl: mochilaUrbana,
  },
  {
    id: "18",
    name: "Caja Organizadora",
    sku: "CAJ-018",
    price: 8.75,
    stock: 60,
    status: "active",
    imgUrl: cajaOrganizadora,
  },
  {
    id: "19",
    name: "Teclado Mecánico",
    sku: "TEC-019",
    price: 79.99,
    stock: 14,
    status: "active",
    imgUrl: tecladoMecanico,
  },
  {
    id: "20",
    name: "Vaso Térmico",
    sku: "VAS-020",
    price: 13.99,
    stock: 25,
    status: "active",
    imgUrl: vasoTermico,
  },
];
