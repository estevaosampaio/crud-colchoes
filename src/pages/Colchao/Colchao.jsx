import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer';
import CardColchao from '../../components/CardColchao';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Container, Box, Avatar, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, CircularProgress, Snackbar, Alert, Dialog, DialogActions, DialogTitle, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

const Colchao = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [error, setError] = useState();
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [errorDelete, setErrorDelete] = useState(false);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editando, setEditando] = useState(false);

    const [colchao, setColchao] = useState({
        id,
        marca: '',
        descricao: '',
        quantidade: '',
        dataDeEntrada: '',
        preco: '',
    });

    const valorInput = (e) => setColchao({ ...colchao, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditando(true);
        api.post(`/salvar-colchao`, colchao)
            .then((response) => {
                setOpen(true);
                setErrorDelete(false);
                setErrorSubmit(false);
                setEditando(false);
            })
            .catch((err) => {
                setOpen(true);
                setErrorDelete(false);
                setErrorSubmit('Erro ao editar produto!');
                setEditando(false);
            });
    };

    const handleDelete = (id) => {
        setOpenDialog(false);
        api.delete(`/excluir-colchao/${id}`)
            .then(() => {
                // alert('Produto deletado!');

                navigate('/');
            })
            .catch((err) => {
                setOpen(true);
                setErrorSubmit(false);
                setErrorDelete('Não foi possível deletar item!');
            });
    };

    useEffect(() => {
        setLoading(true);
        api.get(`/consultar-colchao/${id}`)
            .then((response) => {
                setColchao(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Erro ao carregar produto!');
                setLoading(false);
            });
    }, [id]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setOpenDialog(false);
    };

    return (
        <>
            <NavBar />

            <Dialog fullScreen={fullScreen} open={openDialog} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Deseja realmente <span style={{ color: 'red' }}>EXCLUIR</span> este item?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => handleDelete(colchao.id)} variant="contained" color="success">
                        SIM
                    </Button>
                    <Button onClick={handleClose} variant="contained" color="error">
                        NÃO
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity={errorSubmit || errorDelete ? 'error' : 'success'} sx={{ width: '100%' }} variant="filled">
                    {errorSubmit && 'Erro ao editar produto!'}
                    {errorDelete && 'Erro ao deletar produto!'}
                    {!errorSubmit && !errorDelete && 'Produto Editado com sucesso!'}
                </Alert>
            </Snackbar>

            {loading && <CircularProgress sx={{ marginTop: 40, marginBottom: 50 }} />}

            {error && (
                <>
                    <img width={'10%'} src="https://cdn-icons-png.flaticon.com/512/458/458594.png" alt="Imagem de Erro" style={{ marginTop: '12%' }} />
                    <h2 style={{ marginTop: '2%', marginBottom: '7%' }}>{error}</h2>
                </>
            )}

            {!loading && !error && (
                <Grid
                    container
                    sx={{
                        marginTop: 8,
                    }}
                >
                    <Grid item xs={12} sm={6} sx={{ alignItems: 'center' }}>
                        <Container maxWidth="xs">
                            <CardColchao
                                id={colchao.id}
                                marca={colchao.marca}
                                urlImagem={colchao.urlImagem}
                                descricao={colchao.descricao}
                                quantidade={colchao.quantidade}
                                dataDeEntrada={colchao.dataDeEntrada}
                                preco={colchao.preco}
                                handleDelete={() => setOpenDialog(true)}
                            />
                        </Container>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Container component="main" maxWidth="xs">
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: '#4e20a5' }}>
                                    <AssignmentIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Editar
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Marca</InputLabel>
                                                <Select required label="Marca" name="marca" onChange={valorInput} value={colchao.marca}>
                                                    <MenuItem value="MaxFlex">MaxFlex</MenuItem>
                                                    <MenuItem value="Castor">Castor</MenuItem>
                                                    <MenuItem value="Ortobom">Ortobom</MenuItem>
                                                    <MenuItem value="Orthocrin">Orthocrin</MenuItem>
                                                    <MenuItem value="Orthoflex">Orthoflex</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField required fullWidth name="dataDeEntrada" type="date" onChange={valorInput} value={colchao.dataDeEntrada} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField required fullWidth label="Quantidade" name="quantidade" type="number" onChange={valorInput} value={colchao.quantidade} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField required fullWidth name="preco" label="Preço" type="number" onChange={valorInput} value={parseFloat(colchao.preco).toFixed(2)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField required fullWidth label="Descrição" name="descricao" onChange={valorInput} value={colchao.descricao} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Url da Imagem" name="urlImagem" onChange={valorInput} value={colchao.urlImagem} />
                                        </Grid>
                                    </Grid>

                                    <LoadingButton type="submit" fullWidth loading={editando} loadingPosition="start" startIcon={<SaveIcon />} variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#4e20a5' }}>
                                        Enviar
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
            )}

            <Footer />
        </>
    );
};

export default Colchao;
