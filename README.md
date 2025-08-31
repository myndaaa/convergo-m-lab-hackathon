# Convergo ERP Chat Processing Application

A sophisticated React application that demonstrates AI-powered chat message processing for ERP systems.

## Features

### 🚀 Core Functionality
- **Slack Integration**: Connect to Slack workspaces and process messages
- **AI Classification**: Automatically classify messages as expenses, procurement, or approvals
- **ERP Integration**: Transform unstructured chat into structured ERP data
- **Dashboard Analytics**: Real-time insights and performance metrics
- **Admin Panel**: Configuration and management tools

### 🎯 Demo Features
- **Three Demo Scenarios**:
  1. **Asset Purchase**: Process $10,000 furniture procurement request
  2. **Mixed Language**: Handle Bangla + English expense messages
  3. **Receipt Upload**: OCR processing of receipt images

### 💾 Data Persistence
- **10-Minute Demo Data Retention**: Data persists across page refreshes for 10 minutes
- **Sent State Persistence**: "Sent" status of demo messages persists across page refreshes
- **Automatic Cleanup**: Expired data is automatically cleared
- **Manual Reset**: "Restore" button to clear all demo data

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Charts**: Recharts
- **OCR**: Tesseract.js

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to `http://localhost:5173`

## Usage

1. **Slack Tab**: Try the three demo scenarios
2. **Dashboard Tab**: View processed data and analytics
3. **ERP Tab**: Manage structured data entries
4. **Admin Tab**: Configure application settings

## Demo Data Persistence

- Demo messages and their processed data are stored for 10 minutes
- Data persists across page refreshes
- Use the "Restore" button to clear all demo data
- Automatic cleanup when data expires

## Project Structure

```
src/
├── components/
│   ├── Admin/          # Admin panel components
│   ├── Dashboard/      # Analytics and KPIs
│   ├── ERP/           # ERP system interface
│   ├── Layout/        # Navigation and layout
│   ├── Shared/        # Reusable components
│   └── Slack/         # Slack integration interface
├── hooks/             # Custom React hooks
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
└── App.tsx           # Main application component
```

## Development

- **Hot Reload**: Changes are automatically reflected in the browser
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency
- **Tailwind**: Utility-first CSS framework for styling
