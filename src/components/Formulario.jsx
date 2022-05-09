import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, Select, MenuItem, FormControl, Avatar, TextField, Grid, Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import { api } from '../utils/api';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const theme = createTheme();

export const Formulario = ({ tituloFormulario }) => {
    const [colchao, setColchao] = useState({
        marca: '',
        descricao: '',
        quantidade: '',
        dataDeEntrada: '',
        preco: '',
        urlImagem: '',
    });

    const [open, setOpen] = useState(false);
    const [enviando, setEnviando] = useState();
    const [error, setError] = useState(false);

    const valorInput = (e) => setColchao({ ...colchao, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviando(true);
        api.post(`/salvar-colchao`, colchao)
            .then((response) => {
                setOpen(true);
                setError(false);
                setEnviando(false);
            })
            .catch((err) => {
                setOpen(true);
                setError('Erro ao carregar produto!');
                setEnviando(false);
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }} variant="filled">
                    {error ? 'Falha ao Cadastrar' : 'Produto Cadastrado com sucesso!'}
                </Alert>
            </Snackbar>

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#4e20a5' }}>
                            <AssignmentIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {tituloFormulario}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Marca</InputLabel>
                                        <Select required label="Marca" name="marca" onChange={valorInput}>
                                            <MenuItem value="MaxFlex">MaxFlex</MenuItem>
                                            <MenuItem value="Castor">Castor</MenuItem>
                                            <MenuItem value="Ortobom">Ortobom</MenuItem>
                                            <MenuItem value="Orthocrin">Orthocrin</MenuItem>
                                            <MenuItem value="Orthoflex">Orthoflex</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField required fullWidth name="dataDeEntrada" type="date" onChange={valorInput} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField required fullWidth label="Quantidade" name="quantidade" type="number" onChange={valorInput} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField required fullWidth name="preco" label="Preço" type="number" onChange={valorInput} value={colchao.preco} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required fullWidth label="Descrição" name="descricao" onChange={valorInput} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Url da Imagem" name="urlImagem" onChange={valorInput} />
                                </Grid>
                            </Grid>

                            <LoadingButton type="submit" fullWidth loading={enviando} loadingPosition="start" startIcon={<SendIcon />} variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#4e20a5' }}>
                                Enviar
                            </LoadingButton>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};
