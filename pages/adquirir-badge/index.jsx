import { Card, Box, Typography, Avatar, Chip, Button, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { GetBadgeInfo } from '../../services/Badges'
import { get, size, isEmpty, toString } from 'lodash';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';
import QuizIcon from '@mui/icons-material/Quiz';
import PercentIcon from '@mui/icons-material/Percent';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import AswerBadge from './aswer'

const AdquireBadge = () => {
  const [loading, setLoading] = useState(true);
  const [aswerQuestion, setAswerQuestion] = useState(false);
  const [badgeInfo, setBadgeInfo] = useState(null);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code')
    const is_udemy = query.get('u') === 't'

    setLoading(true)
    if (!isEmpty(toString((code)))) {
      const code = window.location.search.substring(6)
      GetBadgeInfo(code).then((response) => {
        if (get(response, 'success', false) === true) {
          setLoading(false)
          setBadgeInfo(get(response, 'content', null))
        } else {
          window.snackbar.error(get(response, 'message', ''))
          setTimeout(() => {
            window.location.href = '/meus-badges'
          }, 4000)
        }
      })
    } else {
      window.snackbar.error('Nenhum código informado')
      setTimeout(() => {
        window.location.href = '/meus-badges'
      }, 4000)
    }
  }, []);

  const currentCompetence = get(badgeInfo, 'competences', []).at(activeStep)
  const lenCompetences = size(get(badgeInfo, 'competences', []))

  if (aswerQuestion) {
    return <AswerBadge badge={badgeInfo}></AswerBadge>
  }

  return (
    <Box sx={{ backgroundColor: 'rgb(247, 247, 247)', minHeight: '400px', pt: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card sx={{ p: '20px', minHeight: '400px', minWidth: '250px', width: '35vw', maxWidth: '450px', mt: 3, ml: 2, mr: 2, mb: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
          loading ?
            <>
              <Typography sx={{ fontSize: { lg: 20, md: 15, sm: 15, xs: 15 }, fontStyle: 'bold', mb: '15px' }}><strong>Procurando Badge</strong></Typography>
              <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '150px' }}>
                <CircularProgress sx={{ height: '100%', width: '100%' }} />
              </Box>
            </>
            :
            <>
              <Typography sx={{ fontSize: { lg: 20, md: 15, sm: 15, xs: 15 }, fontStyle: 'bold', mb: '15px' }}><strong>Adquirir Badge</strong></Typography>
              <Avatar sx={{ borderRadius: 0, minWidth: '200px', minHeight: '100px', height: '100%', width: '100%', mb: '50px' }} src={get(badgeInfo, 'image', '')} />
              <Chip sx={{ fontSize: { lg: 14, md: 13, sm: 12, xs: 9 }, mb: '10px' }} icon={<BadgeIcon />} label={'Badge: ' + get(badgeInfo, 'description', '')} />
              <Chip sx={{ fontSize: { lg: 14, md: 13, sm: 12, xs: 9 }, mb: '10px' }} icon={<AutoStoriesIcon />} label={'Curso: ' + get(badgeInfo, 'course.name', '')} />
              <Chip sx={{ fontSize: { lg: 14, md: 13, sm: 12, xs: 9 }, mb: '10px' }} icon={<QuizIcon />} label={'Número de Questões: ' + size(get(badgeInfo, 'quizes.questions', []))} />
              <Chip sx={{ fontSize: { lg: 14, md: 13, sm: 12, xs: 9 }, mb: '10px' }} icon={<PercentIcon />} label={'Taxa de Acerto: 70%'} />
              {
                lenCompetences !== 0
                  ?
                  <>
                    <Chip sx={{ fontSize: { lg: 14, md: 13, sm: 12, xs: 9 }, }} color="primary" variant='outlined' icon={<AssignmentIndIcon />} label={"Compêtencia: " + get(currentCompetence, 'description')} />
                    <MobileStepper
                      variant="dots"
                      steps={lenCompetences}
                      position="static"
                      activeStep={activeStep}
                      sx={{ minWidth: '200px', flexGrow: 1, mb: '10px' }}
                      nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === lenCompetences - 1}>
                          {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                          ) : (
                            <KeyboardArrowRight />
                          )}
                        </Button>
                      }
                      backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                          {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                          ) : (
                            <KeyboardArrowLeft />
                          )}
                        </Button>
                      }
                    />
                  </>
                  : <></>
              }
              <Grid container sx={{ mt: '40px' }}>
                <Grid item xs={6}>
                  <Button onClick={() => { window.location.href = '/meus-badges' }} variant="outlined" color="error" sx={{ float: "right", mr: '5px' }}>
                    Cancelar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={() => { setAswerQuestion(true) }} variant="contained" color="success" >
                    Aplicar
                  </Button>
                </Grid>
              </Grid>
            </>
        }
      </Card>
    </Box>
  )
}

export default AdquireBadge;