# Project Title
Fundnode

## Description
This application is designed to monitor transaction history and CRUD operations.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Contact Information](#contact-information)

## Installation
### Prerequisites
- Node.js (https://nodejs.org/)

### Steps
- Cloning the repository: git clone https://bitbucket.org/marketnode/fundintegrate-ui.git
- Navigating to the project directory: cd project-directory
- Installing dependencies: npm install 

## Usage
Commands to start the development server "npm start dev"
The app will be available at http://localhost:3000.

## Configuration
For env variables refer .env-cmdrc.json file

## Folder Structure
```plaintext
src/
├── Asset/
│   ├── # Static assets like images and fonts
├── CommonFunctions/
│   ├── # Reusable components and functions
├── Hooks/
│   ├── # Custom hooks
├── Layout/
│   ├── Mainlayout/
│   │   ├── # Main component
│   ├── Header/
│   │   ├── # This folder contains header and navigation components and styles
│   ├── Sidebar/
│   │   ├── # This folder contains all sidebar-related info and styles
├── Router/
│   ├── commonRouter.js
│   │   ├── # This component will take care of routing functionality
│   ├── route.js
│   │   ├── # This file contains all the route paths and component details
├── Pages/
│   ├── Administration/
│   │   ├── Common/
│   │   │   ├── # Reusable components for pages under Administration
│   │   ├── JobFieldMap/
│   │   │   ├── # This component contains JobFieldMap related info and styles.
│   │   │   ├── # Only users having Admin role can able see this page in the UI.
│   │   ├── appConfig.js
│   │   │   ├── # This component contains AppConfig info.
│   │   ├── appDomain.js
│   │   │   ├── # This component contains AppDomain info.
│   │   ├── appLov.js
│   │   │   ├── # This component contains AppLov info.
│   │   ├── jobConfig.js
│   │   │   ├── # This component contains jobConfig info.
│   │   ├── participantBoarding.js
│   │   │   ├── # This component contains Participant info.
│   ├── AgentBank/
│   │   ├── # This folder contains AB inbound, outbound, and Acknowledgement components
│   ├── Distributor/
│   │   ├── ExceptionTrades/
│   │   │   ├── # This folder contains components related to swift trades.
│   │   ├── acknowledgement.js
│   │   │   ├── # This component contains DB Ack info.
│   │   ├── inbound.js
│   │   │   ├── # This component contains DB Inbound info.
│   │   ├── inboundFdltDataTable.js
│   │   │   ├── # This component contains FDLT Error/status info.
│   │   ├── outbound.js
│   │   │   ├── # This component contains DB Outbound info.
│   │   ├── upload.js
│   │   │   ├── # This component will have the file upload functionality.
│   ├── Healper/
│   │   ├── # This folder contains helper components
│   ├── Home/
│   │   ├── Common/
│   │   │   ├── # Reusable components for pages under Home
│   │   ├── DistributorUser/
│   │   │   ├── # This folder contains Distributor Report
│   │   ├── OpsUser/
│   │   │   ├── DB_Orders/
│   │   │   │   ├── # Folder contains Distributor file-level/order-level info.
│   │   │   ├── Reconciliation/
│   │   │   │   ├── # Folder contains Reconciliation related components
│   │   ├── dashboard.js
│   │   │   ├── # This component contains AB/DB Statistics (in bar chart format)
│   ├── LoginPage/
│   │   ├── # This folder contains login page component
│   ├── Table/
│   │   ├── # This folder contains reusable table component
│   ├── index.js
│   │   ├── # It is the component mapping file
│   ├── search.js
│   │   ├── # This is a reusable search component
│   ├── actionToggler.js
│   │   ├── # This component is used in distributor pages as excludeEmptyBatch toggle button
├── Redux/
│   ├── reducers/
│   │   ├── # All reducers are organized in this folder
│   ├── action.js
│   │   ├── # All API calls (except login and download api) are managed in this file using redux-thunk method
│   ├── store.js
│   │   ├── # This is the centralized store for the entire application
├── Services/
│   ├── apiVariables.js
│   │   ├── # All API-related info is stored in this file
├── App.js
│   ├── # Main Application
├── index.js
│   ├── # Application starts here (Application + Redux Store)

## Contact Information
For any questions or feedback, contact sakthivel.kalaiselvan@theoptimum.net.





        

    

