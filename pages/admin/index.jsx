import React from 'react';
import { Avatar, Button, Grid, Box, Typography, Card } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

class Admin extends React.Component {
  constructor() {
    super()
  }

  renderHeader() {
    return (
      <>
        <Box sx={{ display: 'flex', height: '70px' }}>
          <Avatar sx={{ width: '60px', height: '60px', ml: '10px', mt: '10px' }}>
            <AdminPanelSettingsIcon sx={{ width: '35px', height: '35px' }} />
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">Administrador</Typography>
        </Box>
        <Box sx={{ display: 'flex', height: '20px', ml: '85px', mt: '-20px', mb: '15px' }}>
          <Typography sx={{ fontSize: 15, color: 'rgb(150, 150, 150)', }}>Painel Admin</Typography>
        </Box>
      </>
    )
  }

  render() {
    return (
      <Box sx={{ backgroundColor: 'rgb(247, 247, 247)', pt: '10px', minWidth: '60vw', minHeight: '60vh' }}>
        {
          this.renderHeader()
        }
        <Box sx={{ pt: 13, pb: 13, height: '400px', width: '100%', bgcolor: 'rgb(247, 247, 247)', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Card sx={{ pt: '15px', height: '350px', minWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 2 }} >
            <Grid container
              direction="column"
              columns={4}
              spacing='10px'
              justifyContent="center"
              alignItems="center">
              <Grid item xs={1}>
                <Button href='/courses' variant="contained" endIcon={<AutoStoriesIcon />}>
                  Cursos
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button href='/badges' variant="contained" endIcon={<BadgeIcon />}>
                  Badges
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button href='/quizes' variant="contained" endIcon={<QuizIcon />}>
                  Quizes
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button href='/questions' variant="contained" endIcon={<QuestionAnswerIcon />}>
                  Questões
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button href='/competences' variant="contained" endIcon={<AssignmentIndIcon />}>
                  Competências
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button href='/users' variant="contained" endIcon={<AccountCircleIcon />}>
                  Usuários
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button href='/user-badges' variant="contained" endIcon={<MilitaryTechIcon />}>
                  Badges dos Usuários
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    );
  }
}

export default Admin;