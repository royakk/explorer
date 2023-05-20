import { Container, Typography,Box } from '@mui/material';
import './App.css';
import Explorer from './explorer';

function App() {
  return (
    <div style={{backgroundColor:'#f7f7f7',height:'100vh'}}>
    <Container sx={{padding:8}} maxWidth='xs'>
      <Box my={3} sx={{border :'2px dashed gray',padding:1,justifyContent:'center',display:'flex'}}>
      <Typography variant='h5'>
        File Explorer
      </Typography>
      </Box>
      <Explorer/>
    </Container>
    </div>
  );
}

export default App;
