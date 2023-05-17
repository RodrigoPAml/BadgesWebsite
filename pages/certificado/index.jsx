import React, { useEffect, useState } from 'react';
import { Card, Grid, Box, Typography, Avatar, Chip, Link, Divider } from '@mui/material';
import { get, isEmpty, toString } from 'lodash'
import { GetStaticBadgePage } from '../../services/Users';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import Head from 'next/head';
import CheckIcon from '@mui/icons-material/Check';

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const Certificate = ({ page, url, currentUrl }) => {
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(null)

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setSize({ height, width });

    setLoading(true)
    setTimeout(() => {
      if (page !== null) {
        if (get(page, 'success', false) === true) {
          setLoading(false)
        } else {
          window.snackbar.error(get(page, 'message', ''))
        }
      } else {
        window.snackbar.error('Nenhum código informado na requisição')
      }
    })
  }, []);

  const date = moment(get(page, 'content.date', null)).format('DD/MM/YYYY')
  const haveCourseLink = !isEmpty(toString(get(page, 'content.badge.link')))
  const haveUdemyCourseLink = !isEmpty(toString(get(page, 'content.badge.udemyLink')))
  const isUdemy = get(page, 'content.isUdemy', false)
  const emitterName = isUdemy ? "Udemy" : "EIA"

  return (
    <>
      <Head>
        <title>Certificados EIA</title>
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:image:width"
          content="600"
        />
        <meta
          property="og:image:height"
          content="300"
        />
        <meta
          property="og:image:height"
          content="300"
        />
        <meta property="fb:app_id" content="966242223397117"></meta>
        <meta
          property="og:title"
          content={get(page, 'content.badge.name') + " • " + get(page, 'content.badge.courseName') + " • Emitido para " + get(page, 'content.user.name') + " • " + emitterName}
        />
        <meta
          property="og:description"
          content={"Veja o Badge que eu conquistei!"}
        />
        <meta
          property="og:image"
          content={url}
        />
        <meta
          property="og:url"
          content={currentUrl}
        />
        <meta
          property="og:image:secure_url"
          content={url}
        />
      </Head>
      <Box sx={{ minHeight: '600px', pt: 1, pb: 1, backgroundColor: 'rgb(247, 247, 247)' }}>
        <Card sx={{ minHeight: '600px', mt: 3, mb: 3, ml: 2, mr: 2, boxShadow: 5 }}>
          {
            loading ?
              <Box sx={{ height: '300px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress sx={{ height: '100%', width: '100%', mt: '250px' }} />
              </Box> :
              <>
                <Box sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  justifyItems: 'center',
                  display: 'flex',
                  backgroundSize: 'cover',
                  minHeight: '70px',
                  backgroundColor: 'rgba(205,205,205, 0.2)'
                }}>
                  <Typography fontSize={{ lg: 20, md: 18, sm: 15, xs: 11 }}>
                    Emitido e validado por <Link href='https://www.eia.ai/'>Escola de Inteligência Artifical</Link>
                  </Typography>
                  <CheckIcon sx={{ color: 'green', ml: '10px' }}></CheckIcon>
                </Box>
                <Divider></Divider>
                <Box sx={{ alignContent: 'center', justifyContent: 'center', width: '100%', height: '100%', flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                  {
                    size.width < 700 ?
                      <></>
                      : <Box sx={{ mt: 7, display: 'flex', alignItems: 'flex-start' }}>
                        <Avatar sx={{
                          float: 'right',
                          borderRadius: 10,
                          overflow: 'clip',
                          objectFit: 'cover',
                          minHeight: '230px',
                          minWidth: '230px',
                          height: '17vw',
                          width: '17vw',
                          maxHeight: '300px',
                          maxWidth: '300px',
                        }}
                          src={url} />
                      </Box>
                  }
                  <Box sx={{ ml: '4vw', mt: 7, maxWidth: '1000px', height: '100%', width: '100%' }}>
                    {
                      size.width >= 700 ?
                        <></>
                        : <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex' }}>
                          <Avatar sx={{
                            borderRadius: 10,
                            overflow: 'clip',
                            objectFit: 'cover',
                            minHeight: '180px',
                            minWidth: '180px',
                            height: '17vw',
                            width: '17vw',
                            maxHeight: '300px',
                            maxWidth: '300px',
                          }}
                            src={url} />
                        </Box>
                    }
                    <Typography textAlign={size.width >= 700 ? 'left' : 'center'} sx={{ mr: '30px', fontSize: { lg: 40, md: 35, sm: 30, xs: 29 }, fontStyle: 'bold' }}>
                      <strong>{get(page, 'content.badge.name', '')}</strong>
                    </Typography>
                    <Typography textAlign={size.width >= 450 ? 'left' : 'center'} sx={{ mr: '30px', fontSize: { lg: 20, md: 20, sm: 17, xs: 15 }, pt: 5 }}>{get(page, 'content.badge.learningDescription', '')}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: false }}>
                      <Grid container>
                        <Grid item>
                          <Chip
                            clickable={true}
                            onClick={
                              () => {
                                if (isUdemy && haveUdemyCourseLink) {
                                  openInNewTab(get(page, 'content.badge.udemyLink', ''))
                                }
                                else if (haveCourseLink) {
                                  openInNewTab(get(page, 'content.badge.link', ''))
                                }
                              }
                            }
                            color="primary"
                            variant='outlined'
                            sx={{ '& .MuiChip-label': { fontSize: { lg: 15, md: 15, sm: 13, xs: 9 } }, mt: 5 }}
                            icon={<AutoStoriesIcon />}
                            label={'Curso: ' + get(page, 'content.badge.courseName', '')} />
                        </Grid>
                      </Grid>
                    </Box>
                    <Typography sx={{ fontStyle: 'italic', fontSize: { lg: 20, md: 20, sm: 20, xs: 19 }, pt: 5, mb: 2 }}>Competências</Typography>
                    <Grid container>
                      {
                        get(page, 'content.badge.competences', []).map((item, index) => {
                          return <Grid item>
                            <Chip key={index} icon={<MilitaryTechIcon />} sx={{ mr: '10px', mb: '10px' }} label={get(item, 'description', '')} />
                          </Grid>
                        })
                      }
                    </Grid>
                  </Box>
                </Box>
                <Box sx={{ alignContent: 'center', justifyContent: 'center', width: '100%', height: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '10px' }}>
                  <Typography textAlign={'center'} sx={{ fontSize: { lg: 20, md: 18, sm: 17, xs: 15 }, fontStyle: 'bold', mt: 10 }}>Concedido a <strong>{get(page, 'content.user.name', '')}</strong> em {date} </Typography>
                  <Typography>
                    <Link sx={{ fontSize: { lg: 22, md: 20, sm: 18, xs: 18 }, fontStyle: 'bold' }} href={'/perfil?key=' + get(page, 'content.user.url')}>Ver perfil completo</Link>
                  </Typography>
                  <Typography textAlign={'center'} sx={{ fontSize: 13, fontStyle: 'bold', mt: 3, mb: '10px' }}>Código de validação único <strong>{get(page, 'content.code', '')}</strong> </Typography>
                </Box>
              </>
          }
        </Card >
      </Box >
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { code } = context.query;
  const empty = isEmpty(toString(code))
  let data = null;

  if (!empty) {
    data = await GetStaticBadgePage(code).then((response) => {
      return response
    }).catch(() => { return null })
  } else {
    return null
  }

  return {
    props: {
      page: data,
      currentUrl: "http://localhost/certificado?code=" + get(data, 'content.code', ""),
      url: "http://localhost/api/image?code=" + get(data, 'content.badge.code', "")
    },
  }
}

export default Certificate;