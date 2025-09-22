# 🎓 Gestión de Prácticas Profesionales - CEMU Uneatlantico

Este proyecto es una aplicación web para la **gestión de prácticas profesionales**, que permite administrar grados universitarios, empresas colaboradoras y las prácticas asignadas a los estudiantes.  

## 🚀 Funcionalidades principales

### 📘 Grados Universitarios
- Alta, edición y eliminación de grados universitarios.  
- Visualización de todos los grados disponibles.  
- Asociación de prácticas profesionales a cada grado.  

### 🏢 Empresas
- Registro, edición y eliminación de empresas colaboradoras.  
- Consulta de las empresas asociadas a prácticas.  
- Estadísticas de cuántas prácticas tiene asignada cada empresa.  

### 💼 Prácticas Profesionales
- Creación de ofertas de prácticas con campos como:  
  - Título de la práctica  
  - Ubicación  
  - Salario  
  - Modalidad (presencial, remoto, híbrido)  
  - Tipo de práctica  
  - Jornada  
  - Estudios mínimos  
  - Idiomas requeridos  
  - Fecha de inicio  
  - Periodo  
  - Experiencia mínima  
  - Conocimientos previos  
  - Descripción detallada  
  - Relación con un **grado universitario** y una **empresa**  
- Edición y eliminación de prácticas.  
- Búsqueda y filtrado de prácticas.  

### 📊 Estadísticas
- Solicitudes por grado universitario.  
- Solicitudes por estado (revisadas / sin revisar).  
- Prácticas disponibles por grado.  
- Prácticas asignadas a cada empresa.  

---

## 🛠️ Tecnologías utilizadas

- **Frontend:** React + Next.js + TypeScript  
- **Estilos:** TailwindCSS + Material UI (MUI)  
- **Gráficas:** Recharts  
- **Autenticación:** JSON Web Token (JWT)  

---

## 📦 Instalación y ejecución

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/MRSergio21/FrontendAdministrator.git
   cd cemu-front/

2. Instalar dependiencias:  
   ```bash
   npm i

3. Instalar dependiencias:  
   ```bash
   npm run dev
