import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Avatar, Typography, Card, Box } from '@mui/material';

const NotFound = () => (
  <Box sx={{ backgroundColor: 'rgb(247, 247, 247)', minWidth: '60vw', minHeight: '60vh', pt: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Card sx={{ height: '150px', width: '400px', mt: 8, ml: 2, mr: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 30, mb: '20px' }}>
        Esta página não existe
      </Typography>
      <Avatar sx={{ height: '80px', width: '80px' }}>
        <ReportProblemIcon sx={{ height: '50px', width: '50px', color: 'red' }}></ReportProblemIcon>
      </Avatar>
    </Card>
  </Box>
)

export default NotFound;