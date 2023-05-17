import React, { useEffect, useState } from 'react';
import { Card, IconButton, Box, Typography, Avatar, Divider, SvgIcon, ImageListItemBar, Grid } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import { get, size } from 'lodash'
import { GetPublicProfile } from '../../services/Users';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from '@mui/material/CircularProgress';
import Masonry from '@mui/lab/Masonry';

let Youtube = (props) => (
  <SvgIcon {...props} >
    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
  </SvgIcon>
);

let Linkedin = (props) => (
  <SvgIcon {...props} >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </SvgIcon>
);

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const MyPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  }

  const getColumns = (width) => {
    if (width < breakpoints.sm) {
      return 1
    } else if (width < breakpoints.md) {
      return 2
    } else if (width < breakpoints.lg) {
      return 2
    } else if (width < breakpoints.xl) {
      return 4
    } else {
      return 4
    }
  }

  const [columns, setColumns] = useState(8)
  const updateDimensions = () => {
    setColumns(getColumns(window.innerWidth))
  }

  useEffect(() => {
    updateDimensions()
    window.addEventListener("resize", updateDimensions);

    setLoading(true)
    if (window.location.search.startsWith("?key=")) {
      const profile = window.location.search.substring(5)
      GetPublicProfile(profile).then((response) => {
        if (get(response, 'success', false) === true) {
          setLoading(false)
          setProfile(get(response, 'content', null))
        } else {
          window.snackbar.error(get(response, 'message', ''))
        }
      })
    } else {
      window.snackbar.error('Nenhum perfil informado')
    }

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (loading) {
    return <Box sx={{
      minHeight: '600px', pt: 1, backgroundColor: 'rgb(247, 247, 247)', display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <CircularProgress color="primary" />
    </Box>
  }

  let description = get(profile, 'bio', 'Nenhum biografia informada')

  const linkedin = get(profile, 'linkedin', '')
  const youtube = get(profile, 'youtube', '')
  const facebook = get(profile, 'facebook', '')
  const github = get(profile, 'github', '')

  if (description === null || description === '' || description === undefined) {
    description = 'Nenhuma biografia encontrada'
  }

  const badges = get(profile, 'badges', []);

  return (
    <Box sx={{ minHeight: '600px', pt: 1, pb: 1, backgroundColor: 'rgb(247, 247, 247)' }}>
      <Card sx={{ m: '20px', boxShadow: 3 }}>
        {
          loading ?
            <Box sx={{ height: '200px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress sx={{ height: '100%', width: '100%', mt: '70px' }} />
            </Box> :
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ m: '10px' }}>
                <Avatar sx={{ align: "center", minHeight: '100px', minWidth: '100px', height: '10vw', width: '10vw' }} src={get(profile, 'image')}></Avatar>
              </Box>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', ml: '10px', alignContent: 'center', justifyContent: 'center' }}>
                <Typography fontWeight={70} sx={{
                  fontSize: { lg: 30, md: 25, sm: 20, xs: 17 }, m: 0, p: 0, float: 'left'
                }}>{get(profile, 'name')}</Typography>
                <Typography sx={{
                  color: 'rgba(0.5, 0.5, 0.5, 0.3)',
                  fontSize: { lg: 20, md: 17, sm: 15, xs: 10 }, float: 'left'
                }}>{get(profile, 'url')}</Typography>
                <Divider></Divider>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: '10px' }}>
                  <IconButton onClick={() => openInNewTab('https://www.github.com/' + github)} disabled={github === null}>
                    <GitHubIcon sx={{ color: github === null ? 'grey' : 'black ' }}></GitHubIcon>
                  </IconButton>
                  <IconButton onClick={() => openInNewTab('https://www.linkedin.com/' + linkedin)} disabled={linkedin === null}>
                    <Linkedin sx={{ color: linkedin === null ? 'grey' : '#2196f3 ' }}></Linkedin>
                  </IconButton>
                  <IconButton onClick={() => openInNewTab('https://www.youtube.com/' + youtube)} disabled={youtube === null}>
                    <Youtube sx={{ color: youtube === null ? 'grey' : 'red' }}></Youtube>
                  </IconButton>
                  <IconButton onClick={() => openInNewTab('https://www.facebook.com/' + facebook)} disabled={facebook === null}>
                    <FacebookIcon sx={{ color: facebook === null ? 'grey' : '#219fff ' }}></FacebookIcon>
                  </IconButton>
                </Box>
              </Box>
            </Box>
        }
      </Card >
      <Card sx={{ m: '20px', display: 'flex', boxShadow: 2 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography align='center' sx={{ color: 'rgba(0.5, 0.5, 0.5, 0.75)', fontWeight: 600, mt: '5px', mb: '5px', fontSize: { lg: 21, md: 17, sm: 10, xs: 9 } }}>Sobre mim</Typography>
          <Divider></Divider>
          <Box sx={{ display: 'flex', m: '20px' }}>
            <Avatar sx={{ bgcolor: 'transparent' }}>
              <FormatQuoteIcon sx={{ color: 'black' }}></FormatQuoteIcon>
            </Avatar>
            <Typography align='left' sx={{ fontSize: { lg: 18, md: 15, sm: 13, xs: 12 }, m: '10px', wordWrap: 'break-word', mt: '10px', color: 'rgba(0.5, 0.5, 0.5, 0.7)' }}>
              {description}
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card sx={{ m: '20px', boxShadow: 2 }}>
        <Box sx={{ minHeight: 550, display: 'flex', flexDirection: 'column' }}>
          <Typography align='center' sx={{ color: 'rgba(0.5, 0.5, 0.5, 0.75)', fontWeight: 600, mt: '10px', mb: '10px', fontSize: { lg: 21, md: 17, sm: 10, xs: 9 } }}>Meus Badges</Typography>
          <Divider></Divider>
          {
            badges === null || size(badges) === 0
              ? <Typography align='center' sx={{ color: 'rgba(0.5, 0.5, 0.5, 0.3)', mt: '225px' }}>Parece que esse usário ainda não possui nenhum Badge</Typography>
              :
              <Masonry variant="masonry" sx={{
                minHeight: 550, minWidth: '100px', mt: '10px', ml: '1px'
              }} columns={columns} spacing={2}>
                {badges.map((item, index) => (
                  <Card sx={{ boxShadow: 5 }}>
                    <ImageListItem key={index} >
                      <Avatar
                        style={{ borderRadius: 0, minHeight: '150px', height: '100%', width: '100%' }}
                        src={get(item, 'image')}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={get(item, 'name')}
                        sx={{ borderRadius: 0 }}
                        subtitle={get(item, 'courseName')}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.title}`}
                          >
                            <VisibilityIcon onClick={
                              () => {
                                if (get(item, 'isExternal', false) === true) {
                                  openInNewTab(get(item, 'url'))
                                } else {
                                  openInNewTab('/certificado?code=' + get(item, 'uniqueCode'))
                                }
                              }
                            } />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  </Card>
                ))}
              </Masonry>
          }
        </Box>
      </Card >
    </Box >
  )
}

export default MyPage;