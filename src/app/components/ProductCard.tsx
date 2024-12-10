import { Card, CardMedia, CardContent, Typography, Button, Box, Chip, styled } from "@mui/material";

export interface IProductCardOptions {
    bestChoice: boolean,
    discount: number,
    freight: string,
    imageUrl: string,
    name: string,
    price: number,
    productId: number,
    onBuy: (productId: number) => void
}

const StyledCard = styled(Card)(() => ({
  width: '100%',
  margin: 'auto',
  position: 'relative',
}));

const ProductCard = ({
  name,
  price,
  freight,
  discount,
  bestChoice,
  imageUrl,
  productId,
  onBuy
}: IProductCardOptions) => {
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return (
    <StyledCard>
      {bestChoice && (
        <Chip
          label="Melhor Escolha"
          color="warning"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 1
          }}
        />
      )}

      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={name}
      />

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Typography variant="body1" color="textSecondary" textAlign={"center"}>
            {discount > 0 ? (
              <>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textDecoration: 'line-through', marginRight: 1 }}
                  component="span"
                >
                  {currencyFormatter.format(price)}
                </Typography>
                <Typography variant="body1" component="span">
                {currencyFormatter.format(Math.abs(price - price * (discount / 100)))}
                </Typography>
              </>
            ) : (
              <>{currencyFormatter.format(price)}</>
            )}
          </Typography>
        </Box>

        <Typography variant="body2" color="textSecondary" gutterBottom>
          {freight}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            height: 40,
            marginTop: 2,
            paddingTop: 0.2,
            paddingBottom: 0.2,
            paddingLeft: 0.5,
            paddingRight: 0.5
          }}
          onClick={() => onBuy(productId)}
        >
          Comprar Agora
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;