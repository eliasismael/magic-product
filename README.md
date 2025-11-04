# Magic Product – Catálogo de Productos

Aplicación web construida con Next.js (App Router) y TypeScript para administrar un catálogo de productos. Incluye un panel con métricas de inventario, páginas dedicadas para favoritos y productos creados por el usuario, y un flujo completo para crear, editar, eliminar y exportar productos.

## Características principales

- Búsqueda y filtrado en vivo con debounce, paginación y estados de carga en `ProductList`.
- Gestión completa de productos: creación mediante modal (`ProductForm`), edición en línea y eliminación desde `ProductDetails`, con confirmaciones y validaciones de formularios (`validateProduct`).
- Persistencia local en `ProductsContext` usando `localStorage`, manteniendo edición, favoritos y productos creados por el usuario entre sesiones.
- Dashboard interactivo con métricas calculadas, exportación a CSV (`exportProducts`) y alertas de bajo stock.
- Vistas dedicadas para `Favorites` y `MyProducts`, reutilizando tarjetas (`ProductCard`) y animaciones con Framer Motion.
- Integración con RainbowKit/Wagmi (`Web3Providers`) para habilitar conexión de billeteras Web3 (requiere `NEXT_PUBLIC_PROJECT_ID`).
- Componentes reutilizables y estilizados (Tailwind CSS v4) para cabecera, pie de página, formularios y badges de estado.
- Pruebas unitarias con Jest y Testing Library para los flujos principales de listado y filtrado (`__tests__/ProductList.test.tsx`).

## Arquitectura y stack

- `Next.js 16` + `React 19` + `TypeScript`.
- Tailwind CSS para estilos base.
- Animaciones con `framer-motion`.
- Estado global con `ProductsContext`, persistido en `localStorage`.
- Gestión Web3 con `wagmi`, `viem`, `@rainbow-me/rainbowkit` y React Query.
- Tipos compartidos en `app/types`, datos semilla en `app/data/products.ts`.

### Directorios relevantes

- `app/components`: tarjetas, formularios, modales y componentes compartidos.
- `app/context`: proveedor de estado y hooks (`ProductsContextProvider`).
- `app/dashboard`, `app/favorites`, `app/my-products`: páginas especializadas que reutilizan la capa de datos.
- `app/functions`: utilidades de negocio (`getProducts`, `exportCSV`, `validateForm`).
- `__tests__`: pruebas con Jest y Testing Library.

## Datos y flujo de estado

- Los productos iniciales se cargan desde `app/data/products.ts` mediante `getProducts`.
- `ProductsContext` hidrata el estado desde `localStorage` (`LS_PRODUCTS_KEY`), conserva favoritos y productos creados por el usuario y expone acciones para agregar, editar, eliminar y marcar favoritos.
- `GlobalModals` renderiza `ProductForm` y `ProductDetails` según el estado global, asegurando una experiencia consistente en todas las páginas.

## Requisitos previos

- Node.js 18.18 o superior.
- npm 9+ (o pnpm/yarn si preferís otro gestor).
- Variable de entorno `NEXT_PUBLIC_PROJECT_ID` válida para RainbowKit

### Variables de entorno

Creá un archivo `.env.local` en la raíz del proyecto:

```
NEXT_PUBLIC_PROJECT_ID=tu_project_id_de_walletconnect
```

> La ausencia de esta variable produce un error en `Web3Providers` durante el arranque.

## Instalación y ejecución local

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000` en el navegador. El layout principal (`app/layout.tsx`) monta el `Header`, el contenido enrutado y el `Footer`, además de inyectar los proveedores de Web3 y el contexto de productos.

## Scripts de npm

- `npm run dev`: servidor de desarrollo de Next.js.
- `npm run build`: build de producción.
- `npm run start`: sirve el build generado.
- `npm run lint`: ejecuta ESLint con la configuración de Next.js.
- `npm run test`: corre Jest en modo headless (`jest.config.ts`).

## Pruebas

Las pruebas viven en `__tests__/`. El caso `ProductList.test.tsx` valida el debounce de búsqueda, los filtros por estado y los mensajes de vacíos. Ejecutalas con:

```bash
npm run test
```

## Despliegue

El proyecto puede desplegarse en Vercel sin configuración adicional, siempre que se suministre `NEXT_PUBLIC_PROJECT_ID` en el entorno. Para builds auto-hosted, corré `npm run build && npm run start` detrás de un proxy HTTP.
