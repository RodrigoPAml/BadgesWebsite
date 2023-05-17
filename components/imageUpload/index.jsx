import React, { useState, useRef, useEffect } from "react";
import { IconButton, Box, Typography, Card, CardHeader } from '@mui/material';
import { size, get } from "lodash";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import UploadIcon from '@mui/icons-material/Upload';

export default function ImageUpload(props) {
  const inputFile = useRef(null)
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const id = get(props, 'id', '');
  const onChange = get(props, 'onChange', () => { });

  useEffect(() => {
    const endpoint = get(props, 'endpoint', null)

    if (endpoint !== null) {
      const itemId = get(props, 'item.id', undefined);
      if (itemId !== undefined) {
        setLoading(true)

        endpoint(itemId).then((response) => {
          setLoading(false)
          if (get(response, 'success', false) === true) {
            setValue(get(response, 'content', ''))
            onChange(id, get(response, 'content', ''), false)
          }
        }).catch(() => {
          setLoading(false)
        })
      }
    } else {
      const data = get(props, 'initialValue', null)
      setValue(data)
    }
  }, []);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const onInputClick = (event) => {
    event.target.value = ''
  }

  function handleFileSelect(e) {
    let reader = new FileReader();

    const maxSize = get(props, 'maxSize', 3_000_000) // padrão 3 MB
    const maxSizeMessage = get(props, 'maxSizeMessage', 'Imagem deve ter no máximo 3 MB') // padrão 10 megabytes

    if (size(e.target.files) > 0) {
      setLoading(true)
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = e => {
        setLoading(false)
        const val = get(e.target, 'result', null);

        if (val !== null && size(val) > maxSize) {
          window.snackbar.warn(maxSizeMessage)
          return
        } else {
          setValue(val)
          onChange(id, val)
        }
      };
    }
  }

  const centerMessage = get(props, 'centerMessage', 'Nenhuma imagem selecionada');
  const subMessage = get(props, 'subMessage', null);

  const isDisabled = (get(props, 'disabled', false) === true) || loading

  return (
    <Card sx={{
      ...get(props, 'sx', undefined), p: 1,
      boxShadow: 2,
    }}>
      <CardHeader
        sx={{
          display: "flex",
          overflow: "hidden",
          textAlign: 'center',
          m: 0,
          p: 1,
          mb: '5px',
          borderRadius: 2,
          backgroundColor: 'rgba(25, 120, 180, 1)',
          textShadow: true,
          boxShadow: 2,
          "& .MuiCardHeader-content": {
            overflow: "hidden"
          }
        }}
        title={get(props, 'label', '')}
        titleTypographyProps={{ noWrap: true, fontSize: 15, color: 'rgba(255, 255, 255, 0.8)' }}
      />
      {
        value !== null && value !== '' ?
          <Box
            component="img"
            sx={{ height: '80%', width: '100%', borderRadius: 100 }}
            src={value !== null ? value : undefined}
          />
          :
          <Box sx={{ height: '100px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{ textAlign: "center", color: 'rgb(150, 150, 150)' }}>
              {centerMessage}
            </Typography>
            {
              subMessage !== null ?
                <Typography sx={{ textAlign: "center", color: 'rgb(150, 150, 150)' }}>
                  {subMessage}
                </Typography>
                : <></>
            }
          </Box>
      }
      <label>
        <input accept={get(props, 'extensions', '*')} onClick={onInputClick} onChange={handleFileSelect} id="input_custom" ref={inputFile} type="file" hidden />
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {
              !isDisabled ?
                <>
                  <IconButton onClick={onButtonClick}>
                    <UploadIcon color="primary"></UploadIcon>
                  </IconButton>
                  <IconButton onClick={() => {
                    setValue(null)
                    onChange(id, null)
                  }}>
                    <CleaningServicesIcon color="primary"></CleaningServicesIcon>
                  </IconButton>
                </>
                :
                <></>
            }
          </Box>
        </div>
      </label>
    </Card >
  );
}