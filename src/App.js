import './App.css';
import Approutes from './routes/Approutes';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './config/theme/ThemeProvider';



function App() {
  return (
   <div>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Approutes/>
    </ThemeProvider>
   </div>
  );
}

export default App;
