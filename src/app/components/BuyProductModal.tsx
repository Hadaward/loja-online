import React, { Dispatch, SetStateAction, useState } from 'react';
import { styled, Modal, Paper, Typography, Grid, TextField, Box, Button, Snackbar, Alert } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const StyledModal = styled(Modal)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none'
}));

const FormContainer = styled(Paper)(({ theme }) => ({
    width: '90%',
    maxWidth: 500,
    padding: theme.spacing(4),
    outline: 'none'
}));

export interface IBuyProductModal {
    productId: number,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const schema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    phone_number: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido'),
    street_number: z.string().min(1, 'Número é obrigatório'),
    street: z.string().min(1, 'Rua é obrigatória'),
    district: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(1, 'Estado é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export default function BuyProductModal({ productId, isOpen, setIsOpen }: IBuyProductModal) {
    const [successMessage, setSuccessMessage] = useState(false); // Estado para o sucesso
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            phone_number: '',
            street_number: '',
            street: '',
            district: '',
            city: '',
            state: ''
        }
    });

    const handleClose = () => {
        setIsOpen(false);
    };

    const onSubmit = async (data: FormData) => {
        try {
            const req = await fetch(`https://api-candidate.ogruposix.com/buy/${productId}`, {
                method: "POST",
                headers: {
                    'user-token': '2A50C22E-7954-4C73-9CF9-F6D298C047A7',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    product_id: productId
                })
            });

            if (req.ok) {
                setSuccessMessage(true); // Mostrar mensagem de sucesso
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <StyledModal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="purchase-form-title"
                aria-describedby="purchase-form-description"
            >
                <FormContainer>
                    <Typography id="purchase-form-title" variant="h6" gutterBottom>
                        Formulário de Compra
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Nome"
                                            variant="outlined"
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="phone_number"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Telefone"
                                            variant="outlined"
                                            error={!!errors.phone_number}
                                            helperText={errors.phone_number?.message}
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="street_number"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Número da Rua"
                                            variant="outlined"
                                            error={!!errors.street_number}
                                            helperText={errors.street_number?.message}
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="street"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Rua"
                                            variant="outlined"
                                            error={!!errors.street}
                                            helperText={errors.street?.message}
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="district"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Bairro"
                                            variant="outlined"
                                            error={!!errors.district}
                                            helperText={errors.district?.message}
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Cidade"
                                            variant="outlined"
                                            error={!!errors.city}
                                            helperText={errors.city?.message}
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="state"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Estado"
                                            variant="outlined"
                                            error={!!errors.state}
                                            helperText={errors.state?.message}
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={3} display="flex" justifyContent="space-between">
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleClose}
                            >
                                Fechar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Enviar
                            </Button>
                        </Box>
                    </form>
                </FormContainer>
            </StyledModal>
            <Snackbar
                open={successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage(false)}
            >
                <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Compra realizada com sucesso!
                </Alert>
            </Snackbar>
        </>
    );
}
