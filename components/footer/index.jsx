import { Avatar, Box, Typography, Grid, IconButton, Link, SvgIcon } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from '../../public/logo2.jpg';

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

const Footer = () => {
  return (
    <Box sx={{ height: '100%', bgcolor: '#24232b' }}>
      <Grid container direction={'column'} justify="flex-end" alignItems="center">
        <Grid item xs={2} sx={{ mb: 1, mt: 4 }}>
          <a href='https://www.eia.ai/'>
            <Avatar variant="rounded" sx={{ height: '80px', width: '160px' }} src={logo.src} >
            </Avatar>
          </a>
        </Grid>
        <Grid item xs={2} sx={{ mb: 1, mt: 3 }}>
          <Typography textAlign={'center'} color='white'>
            <strong>F&I Treinamentos e Consultoria em Informática LTDA</strong>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography color='white'>
            CNPJ: 26.785.031/0001-99
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography color='white'>
            Novo Hamburgo - RS
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, mb: 2 }}>
          <Grid container sx={{ bgcolor: '#24232b', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Grid item>
              <IconButton target="_blank" href='https://www.facebook.com/proffernandoamaral' sx={{ "&:hover": { backgroundColor: "white" }, bgcolor: 'transparent' }}>
                <FacebookIcon sx={{ color: '#0888ff' }}></FacebookIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton target="_blank" href='https://www.instagram.com/prof.fernandoamaral/' sx={{ "&:hover": { color: 'black', backgroundColor: "white" }, ml: 3 }}>
                <InstagramIcon sx={{ "&:hover": { color: "black" }, color: 'white' }}></InstagramIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton target="_blank" href='https://www.linkedin.com/company/escolaia/' sx={{ "&:hover": { backgroundColor: "white" }, ml: 3, mr: 3, bgcolor: 'transparent' }}>
                <Linkedin sx={{ color: '#2196f3 ' }}></Linkedin>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton target="_blank" href='https://www.youtube.com/channel/UC6w56wRjrbbZk-cX46SuxPA' sx={{ "&:hover": { backgroundColor: "white" }, bgcolor: 'transparent' }}>
                <Youtube sx={{ color: 'red' }}></Youtube>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body2" color="white" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.eia.ai/">
              EIA
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Footer;