'use client';

import { Box, createTheme, CssBaseline, Skeleton, ThemeProvider, Typography } from "@mui/material";
import VideoDisplay from "./components/VideoDisplay";
import ProductCard from "./components/ProductCard";
import { CheckoutInfo } from "./models/CheckoutInfo";
import BuyProductModal from "./components/BuyProductModal";
import { useEffect, useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CheckoutInfo|undefined>();

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const res = await fetch("https://api-candidate.ogruposix.com/checkout/95BD9233-8FDC-48AD-B4C5-E5BAF7578C15", {
        headers: {
          'user-token': '2A50C22E-7954-4C73-9CF9-F6D298C047A7',
          'Content-Type': 'application/json'
        },
        cache: "force-cache"
      });

      setData(await res.json());
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const [buyProductId, setBuyProductId] = useState(-1);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const onBuyPressed = (productId: number) => {
    setBuyProductId(productId);
    setShowBuyModal(true);
  }
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BuyProductModal
        isOpen={showBuyModal}
        setIsOpen={setShowBuyModal}
        productId={buyProductId}
      />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          paddingTop: 4,
          paddingBottom: 4
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: {
              md: 700
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          {
            isLoading ? (
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "4em",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontFamily: "'Sora', Sans-serif",
                  paddingTop: 2,
                  paddingLeft: 1,
                  paddingRight: 1,
                }}
                width={'100%'}
              ></Skeleton>
            ) : (
              <Typography
                variant="h5"
                textAlign={"center"}
                fontWeight={"bold"}
                fontFamily={"'Sora', Sans-serif"}
                paddingTop={2}
                paddingLeft={1}
                paddingRight={1}
                width={'100%'}
            >
              {data?.object[0]?.video_headline}
            </Typography>
            )
          }
          {
            isLoading ? (
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "2em",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontFamily: "'Sora', Sans-serif",
                  paddingTop: 2,
                  paddingLeft: 1,
                  paddingRight: 1
                }}
                width={'100%'}
              ></Skeleton>
            ) : (
              <Typography
                variant="subtitle1"
                textAlign={"center"}
                fontFamily={"'Sora', Sans-serif"}
                paddingLeft={1}
                paddingRight={1}
                width={'100%'}
              >
                {data?.object[0]?.video_sub_headline}
              </Typography>
            )
          }

          <VideoDisplay
            src={data?.object[0]?.video_url}
            isLoading={isLoading}
          ></VideoDisplay>

          <Box
            sx={{
              paddingTop: 4,
              paddingBottom: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: {
                xs: 'column',
                sm: 'row'
              },
              gap: 2,
              width: '100%'
            }}
          >
            {
              isLoading ? (
                <Skeleton width={400} height={400} variant="rounded"></Skeleton>
              ) : (
                <ProductCard
                  bestChoice={data!.object[0].products[0].best_choice}
                  discount={data!.object[0].products[0].discount}
                  freight={data!.object[0].products[0].freight}
                  imageUrl={data!.object[0].products[0].image_url}
                  name={data!.object[0].products[0].name}
                  price={data!.object[0].products[0].price}
                  productId={data!.object[0].products[0].product_id}
                  onBuy={onBuyPressed}
                />
              )
            }
            {
              isLoading ? (
                <Skeleton width={400} height={400} variant="rounded"></Skeleton>
              ) : (
                <ProductCard
                  bestChoice={data!.object[0].products[1].best_choice}
                  discount={data!.object[0].products[1].discount}
                  freight={data!.object[0].products[1].freight}
                  imageUrl={data!.object[0].products[1].image_url}
                  name={data!.object[0].products[1].name}
                  price={data!.object[0].products[1].price}
                  productId={data!.object[0].products[1].product_id}
                  onBuy={onBuyPressed}
                />
              )
            }
            {
              isLoading ? (
                <Skeleton width={400} height={400} variant="rounded"></Skeleton>
              ) : (
                <ProductCard
                  bestChoice={data!.object[0].products[2].best_choice}
                  discount={data!.object[0].products[2].discount}
                  freight={data!.object[0].products[2].freight}
                  imageUrl={data!.object[0].products[2].image_url}
                  name={data!.object[0].products[2].name}
                  price={data!.object[0].products[2].price}
                  productId={data!.object[0].products[2].product_id}
                  onBuy={onBuyPressed}
                />
              )
            }
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
