import React, { useReducer, useEffect } from 'react';
import { Card, Radio, Button, Box, Typography, Avatar, RadioGroup, FormControlLabel } from '@mui/material';
import { get, size, toNumber, isEmpty, toString } from 'lodash'
import { AdquireBadgeForUser } from '../../services/Badges'
import Result from './result'
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array
}

const AdquireBadge = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [mobile, setMobile] = React.useState(true);
  const [isUdemy, setIsUdemy] = React.useState(false);
  const [badge, setBadge] = React.useState(get(props, 'badge'));
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [questions,] = React.useState(shuffleArray(['question1', 'question2', 'question3', 'question4', 'question5']));

  const quizes = get(badge, 'quizes', null)

  const question = get(quizes, 'questions', [])[activeStep]
  const currentValue = get(question, 'correct', null)

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setMobile(width < 550)
    const query = new URLSearchParams(window.location.search);
    setIsUdemy(query.get('u') === 't')
  }, []);

  return (
    <Box sx={{ minHeight: '600px', pt: 1, pb: 1, backgroundColor: 'rgb(247, 247, 247)' }}>
      <Card sx={{ m: '20px', boxShadow: 4, minWidth: '300px' }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ m: '10px' }}>
            <Avatar src={get(badge, 'image')} sx={{ borderRadius: 0, minWidth: '120px', minHeight: '120px', ml: '10px', mt: '10px' }}></Avatar>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px', alignContent: 'center', justifyContent: 'center' }}>
            <Typography fontWeight={70} sx={{ fontSize: { lg: 30, md: 25, sm: 20, xs: 17 }, m: 0, p: 0, float: 'left' }}>
              Aplicação de Badge
            </Typography>
            <Typography sx={{ color: 'rgba(0.5, 0.5, 0.5, 0.5)', fontSize: { lg: 20, md: 20, sm: 19, xs: 13 }, float: 'left' }}>
              Badge: {get(badge, 'description')}
            </Typography>
            <Typography sx={{ color: 'rgba(0.5, 0.5, 0.5, 0.5)', fontSize: { lg: 20, md: 17, sm: 17, xs: 10 }, float: 'left' }}>
              Curso: {get(badge, 'course.name')}
            </Typography>
            <Typography sx={{ color: 'rgba(0.5, 0.5, 0.5, 0.5)', fontSize: { lg: 20, md: 17, sm: 17, xs: 10 }, float: 'left' }}>
              Respondendo questão {activeStep + 1} de {size(get(badge, 'quizes.questions', []))}
            </Typography>
          </Box>
        </Box>
      </Card >
      <Card sx={{ m: '20px', boxShadow: 4 }}>
        {
          get(badge, 'quizes.questions', []).map((item, index) => {
            if (activeStep === index) {
              return <Box key={index} sx={{ m: '20px' }}>
                <Card sx={{ backgroundColor: 'rgba(1, 1, 1, 0.01)', p: '10px', mb: '10px' }}>
                  <Typography sx={{ fontSize: 17 }}>{get(item, 'name')}</Typography>
                </Card>
                <Card sx={{ p: '10px', backgroundColor: 'rgba(1, 1, 1, 0.01)' }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={currentValue}
                    onChange={(event) => {
                      const value = event.target.value

                      const {
                        quizes
                      } = badge

                      const question = quizes.questions[activeStep]
                      question['correct'] = value
                      setBadge(badge)
                      forceUpdate();
                    }}
                  >
                    {
                      questions.map((q, index) => {
                        let l = get(item, q)
                        if (isEmpty(toString(l))) {
                          return <></>
                        } else {
                          return <FormControlLabel sx={{ mb: '15px' }} key={index} value={q} control={<Radio />} label={get(item, q)} />
                        }
                      })
                    }
                  </RadioGroup>
                </Card>
              </Box>
            }
          })
        }
        <MobileStepper
          sx={{ ml: '20px', mr: '20px' }}
          variant={mobile ? "progress" : "dots"}
          steps={size(get(badge, 'quizes.questions', []))}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              onClick={() => {
                if (activeStep + 1 === size(get(badge, 'quizes.questions', []))) {
                  const obj = {
                    isUdemy: isUdemy,
                    code: get(badge, 'code'),
                    questions: get(badge, 'quizes.questions', []).map((item) => {
                      return { id: get(item, 'id'), correct: toNumber(get(item, 'correct', '').slice(-1)) }
                    })
                  }

                  AdquireBadgeForUser(obj).then((response) => {
                    window.openDialog({
                      title: 'Resultado',
                      container: Result,
                      containerProps: { success: get(response, 'success', false), message: get(response, 'message') },
                    })
                  }).catch(() => {
                    window.snackbar.error('Erro interno. Nos desculpe pelo transtorno')
                  })
                } else {
                  setActiveStep(activeStep + 1)
                }
              }}
              sx={{ ml: '5px' }}
              variant='contained'
              disabled={currentValue === null || currentValue === 0}
            >
              {
                mobile ? "" : activeStep + 1 === size(get(badge, 'quizes.questions', [])) ? 'Finalizar' : 'Próxima'
              }
              {(
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              onClick={() => { setActiveStep(activeStep - 1) }}
              variant='contained'
              sx={{ mr: '5px' }}
              disabled={activeStep === 0}>
              {(
                <KeyboardArrowLeft />
              )}
              {mobile ? "" : 'Anterior'}
            </Button>
          }
        />
      </Card>
    </Box >
  )
}

export default AdquireBadge;