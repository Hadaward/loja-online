'use client';

import { Box, createTheme, CssBaseline, Skeleton, ThemeProvider, Typography } from "@mui/material";
import useSWR from "swr";
import VideoDisplay from "./components/VideoDisplay";

const fetcher = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init).then(res => res.json())

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const { data, isLoading } = useSWR(
    `https://api-candidate.ogruposix.com/checkout/95BD9233-8FDC-48AD-B4C5-E5BAF7578C15`,
    url => fetcher(
      url,
      {
        headers: {
          'user-token': '2A50C22E-7954-4C73-9CF9-F6D298C047A7',
          'Content-Type': 'application/json'
        },
        cache: "force-cache"
      }
    )
  );
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          paddingTop: 4,
          paddingBottom: 4,
          background: "url('https://media.istockphoto.com/id/1256373514/pt/foto/3d-illustration-of-colon-cancer-colon-tumor.jpg?s=612x612&w=0&k=20&c=egS4syfX-brHCkOLwGWQdTJseHKncAqAdieQVTsNqLo=')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 0",
          "&::after": {
            backdropFilter: "blur(5px)"
          }
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
              {data?.object?.[0]?.video_headline}
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
                {data?.object?.[0]?.video_sub_headline}
              </Typography>
            )
          }

          <VideoDisplay
            src={data?.object?.[0]?.video_url}
            isLoading={isLoading}
          ></VideoDisplay>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
