import * as React from "react";
import {
  ChakraProvider,
  extendTheme,
  Box,
  theme,
  Card,
  Button,
  Avatar,
  Grid,
  SlideFade,
  useDisclosure,
  VStack,
  Text,
  TagLabel,
  FormLabel,
  Skeleton,
  border,
  background,
  SkeletonCircle, AvatarBadge, Flex, Stack, useColorModeValue, Slide, ControlBox, Heading, useColorMode,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import axios from "axios";
import {FaGithub, MdLabel, MdMenu} from "react-icons/all";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import "./style.css";
import { FaPaypal, FaEnvelope, FaServer } from "react-icons/fa";
import {IconContext} from "react-icons";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import {stat} from "fs";
import { hot } from "react-hot-loader/root";
import {LayoutGroup} from "framer-motion";

const App: React.FC = () => {

  const { isOpen, onToggle } = useDisclosure()
  const [activity, setActivity] = useState('');
  const [playing_status, setPlayingStatus] = useState('');
  const [status_color, setStatusColor] = useState('');
  const [status, setStatus] = useState('');
  const [lastCommitName, setLastCommitName] = useState('Please wait until the last commit is available ...');
  const [lastCommitUrl, setLastCommitUrl] = useState('');
  const [isStatusOffline, setIsStatusOffline] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [boxClassName, setBoxClassName] = useState(' h-6 w-6 absolute rounded-full z-10 border-4 mt-[3.25rem] ms-[3.25rem]');
  const [isFetchingLanyard, setIsFetchingLanyard] = useState(false);
  const [isFetchingLastCommit, setIsFetchingLastCommit] = useState(false);

  const fetchLanyard = async () => {
    try {
      setIsFetchingLanyard(true);
      const response = await axios.get("https://api.lanyard.rest/v1/users/591983759965028363");
      const discordStatus = response.data.data.discord_status;
      // Check the Discord status and update the className accordingly
      if (discordStatus === "offline") {
        setBoxClassName(prev => prev + ' bg-discord_offline');
        setStatusColor("#707A87FF");
        setIsStatusOffline(true);
        setStatus("Offline");
      } else if (discordStatus === "dnd") {
        setBoxClassName(prev => prev + ' bg-discord_dnd');
        setStatusColor("#f54848");
        setStatus("Do Not Disturb");
      } else if (discordStatus === "idle") {
        setBoxClassName(prev => prev + ' bg-discord_idle');
        setStatusColor("#FDA81AFF");
        setStatus("Idle");
      } else if (discordStatus === "online") {
        setBoxClassName(prev => prev + ' bg-discord_online');
        setStatusColor("#43B581FF");
        setStatus("Online");
      }

      const status = response.data.data.activities[0].name;

      if (status === "Spotify") {
        setActivity("Listening to");
      } else {
        setActivity("Playing");
      }

      setPlayingStatus(response.data.data.activities[0].name);
    } catch (err) {
      console.log("Internal Server Error: ", err);
    } finally {
      setIsFetchingLanyard(false);
    }
  };
  
  const fetchLastCommit = async () => {
    try {
      setIsFetchingLastCommit(true);
      const response = await axios.get("https://api.github.com/users/pixelwhiz/events/public");
      if (response.data[0].repo.url !== "") {
        console.log(response.data[0].repo.url)
        const responseLastCommit = await axios.get(response.data[0].repo.url);
        setLastCommitName(responseLastCommit.data.name);
        setLastCommitUrl(responseLastCommit.data.svn_url);
        setIsFetchingLastCommit(false);
      }
    } catch (err) {
      console.log("Internal Server Error: ", err);
    } finally {
    }
  };

  useEffect(() => {
    fetchLanyard();
    fetchLastCommit();
    onToggle();
  }, []);

  const routeToGithub = () => {
    window.location.href = 'https://github.com/pixelwhiz';
  };

  const routeToProjects = () => {
    window.location.href = 'https://github.com/pixelwhiz?tab=repositories';
  };

  const routeToContact = () => {
    window.location.href = 'mailto:daffa11futn@gmail.com';
  };

  const routeToDonate = () => {
    window.location.href = 'https://www.paypal.com/paypalme/mdafftfa';
  };

  const toggleSidebar = () => {

  };

  const theme = extendTheme({
    colors: {
      primary: {
        50: "#e3f2fd",
        100: "#bbdefb",
        200: "#90caf9",
        300: "#64b5f6",
        400: "#42a5f5",
        500: "#2196f3",
        600: "#1e88e5",
        700: "#1976d2",
        800: "#1565c0",
        900: "#0d47a1",
      },
      secondary: {
        50: "#ffe0b2",
        100: "#ffcc80",
        200: "#ffb74d",
        300: "#ffa726",
        400: "#ff9800",
        500: "#fb8c00",
        600: "#f57c00",
        700: "#ef6c00",
        800: "#e65100",
        900: "#d84315",
      },
    },
  });

  return (
      <ChakraProvider>
        <Card zIndex={"100"} roundedTopEnd={"1rem"} roundedBottomEnd={"1rem"} rounded={"0"} backgroundColor={""} position={"fixed"} className={`bg-base-content/5 h-full w-64 fixed transition-all duration-200 ease-in-out transform ${isMenuOpen ? 'left-0' : '-left-64'}`}>
          <Box className="grid gap-2.5 text-base-100 py-2.5 ps-2.5">
            <button onClick={routeToProjects} className={"p-3 text-base-content rounded-s-2xl font-medium hover:brightness-50 flex ps-5 gap-5 text hover:bg-base-100 hover:text-base-content hover:border-e-4 border-0 border-base-100 border"}>
              <FaServer className={"h-6 w-6"} />
              Projects
            </button>
            <button onClick={routeToContact} className={"p-3 text-base-content rounded-s-2xl font-medium hover:brightness-50 flex ps-5 gap-5 text hover:bg-base-100 hover:text-base-content hover:border-e-4 border-0 border-base-100 border"}>
              <FaEnvelope className={"h-6 w-6"} />
              Contact Me
            </button>
            <button onClick={routeToDonate} className={"p-3 text-base-content rounded-s-2xl font-medium hover:brightness-50 flex ps-5 gap-5 text hover:bg-base-100 hover:text-base-content hover:border-e-4 border-0 border-base-100 border"}>
              <FaPaypal className={"h-7 w-7"} />
              Donate
            </button>
          </Box>
        </Card>

        <motion.div
            className={`hero h-screen transition-all duration-200 ease-in-out transform z-10`}
            style={{
              transition: 'background-color 0.5s ease',
            }}
        >
          <Box className={`w-full justify-center flex fixed top-0 md:top-5 transition-all duration-200 ease-in-out transform ${isMenuOpen ? "lg:left-64 xl:left-36 sm:left-72 left-64" : "left-0"}`}>
            <SlideFade
                in={isOpen}
                offsetY={"1rem"}
                className={`grid overflow-x-hidden px-4 max-w-4xl pb-5 md:pb-0 sm:px-12 sm:py-12 gap-5`}
            >
              {/* Header */}
              <Box className="flex w-full justify-between sm:translate-y-0 translate-y-2.5 z-10">
                <Box className="flex gap-2.5">
                  <Button onClick={() => setIsMenuOpen(!isMenuOpen)} data-tip={"Menu"} className={"tooltip text tooltip-bottom md:tooltip-top"} paddingX={"2px"} rounded={"full"} background={"transparent"}>
                    <MdMenu fontSize={"1.75rem"} />
                  </Button>
                </Box>
                <Box className="flex gap-2.5">
                  <Button data-tip={"Github Account"} className={"tooltip text tooltip-bottom md:tooltip-top"} onClick={routeToGithub} paddingX={"2px"} rounded={"full"} background={"transparent"}>
                    <FaGithub fontSize={"1.5rem"} />
                  </Button>
                  <ColorModeSwitcher data-tip={"Theme Controller"} className={"tooltip text tooltip-left lg:tooltip-top"} fontSize={"1.5rem"} paddingX={"2px"} rounded={"full"} background={"transparent"} />
                </Box>
              </Box>

              {/* Content */}
              <Box rounded={"1rem"} backgroundColor={"teal.300"} backgroundBlendMode={"color-dodge"} className={"brightness-95 px-0 py-4"}>
                <Box className={"flex gap-3 ms-4 me-4 justify-center"}>
                  <Box className="avatar my-auto">
                    <Avatar name={"Muhammad Daffa"} height={"6rem"} width={"6rem"} className="rounded-full" src={"https://avatars.githubusercontent.com/u/111522987?v=4"}>
                      {isFetchingLanyard ? (
                          <Card position={"absolute"} boxShadow={"none"} backgroundColor={"teal.300"} rounded={"full"} className={"h-7 w-7 ms-16 mt-16 absolute z-10 rounded-2xl"} >
                            <SkeletonCircle data-tip={"Loading..."} width={"1.4rem"} height={"1.4rem"} alignItems={"center"} rounded={"full"} className={"mt-[0.28rem] tooltip ms-[0.3rem]"} />
                          </Card>
                          // <AvatarBad ge className={"tooltip skeleton text z-10"} m={"0.25rem"} cursor={"pointer"} data-tip={"Loading"} textTransform={"none"} borderWidth={"0.4rem"} borderColor={"green.500"} boxSize='2rem' bg='gray.500' />
                      ) : (
                          <Card position={"absolute"} boxShadow={"none"} backgroundColor={"teal.300"} rounded={"full"} className={"h-7 w-7 ms-16 mt-16 absolute z-10 rounded-2xl"} >
                            <Card boxShadow={"none"} cursor={"pointer"} backgroundColor={`${status_color}`} data-tip={`${status}`} width={"1.4rem"} height={"1.4rem"} alignItems={"center"} rounded={"full"} className={"mt-[0.28rem] ms-[0.3rem] text tooltip normal-case"} />
                          </Card>
                          // <AvatarBadge className={"tooltip skeleton text z-10"} m={"0.25rem"} cursor={"pointer"} data-tip={`${status}`} textTransform={"none"} borderWidth={"0.4rem"} borderColor={"green.500"} boxSize='2rem' bg={`${status_color}`} />
                      )}
                    </Avatar>
                  </Box>
                  <div className={"grid my-auto"}>
                    <label style={{ fontSize: '2em' }} className={"text text-white fill-white font-extrabold"}>pixelwhiz</label>
                    <div className={"font-normal text text-white flex gap-1 fill-white"}>
                      {isFetchingLanyard ? (
                          <Skeleton className={"skeleton h-3 w-28 rounded animate-pulse"}></Skeleton>
                      ) : (
                          <label>
                            {playing_status ? (
                                <span className={"flex-wrap font-medium text-wrap"}>{activity} <span className={"me-0.5 font-semibold"}>{playing_status}</span> <svg width="26" height="26" viewBox="0 0 16 16" fill="currentColor" className="inline-flex -mt-0.5"><path d="M6,7 L2,7 L2,6 L6,6 L6,7 Z M8,5 L2,5 L2,4 L8,4 L8,5 Z M8,3 L2,3 L2,2 L8,2 L8,3 Z M8.88888889,0 L1.11111111,0 C0.494444444,0 0,0.494444444 0,1.11111111 L0,8.88888889 C0,9.50253861 0.497461389,10 1.11111111,10 L8.88888889,10 C9.50253861,10 10,9.50253861 10,8.88888889 L10,1.11111111 C10,0.494444444 9.5,0 8.88888889,0 Z" transform="translate(0 3)"></path></svg></span>
                            ) : (
                                <span className={"flex-wrap font-medium text-wrap"}>{status}</span>
                            )}
                          </label>
                      )}
                    </div>
                  </div>
                </Box>
              </Box>

              {/* Main Cards */}
              <Box className="grid md:flex gap-5" style={{ overflowX: 'hidden' }}>
                <Box rounded={"1rem"} className="shadow-sm bg-base-content/5 w-full p-4 lg:p-5 md:h-[20rem] border-base-content/25 ">
                  <Text className="text-3xl mb-2.5 text font-bold">Hello there!</Text>
                  <Box className={"grid gap-5"}>
                    <span className="font-normal brightness-150 text text-base-content">I'm a programmer who loves to code and learn
                        new things. I'm currently learning web development and I'm also interested in game development. I'm also a
                        huge fan of anime and manga. </span>
                    <label className="font-normal brightness-150 text text-base-content">When I'm not coding, you can find me
                      battling it out in VALORANT or Counter Strike, exploring the world of Genshin Impact, tapping away in
                      osu!, or building incredible structures in Minecraft.</label>
                  </Box>
                </Box>
                <Box rounded={"1rem"} backgroundColor={""} className="shadow-sm justify-center md:w-96 p-4 lg:p-5 md:h-[20rem] bg-base-content/5">
                  <Box className={"grid md:mt-14 gap-2.5"}>
                    <label className="text-3xl text font-bold">Latest Project</label>
                    {isFetchingLanyard ? (
                        <Skeleton className={"h-3 w-28"} />
                    ) : (
                        <a href={`${lastCommitUrl}`} className="font-normal brightness-150 text underline text-base-content">{lastCommitName}</a>
                    )}
                  </Box>
                </Box>
              </Box>
            </SlideFade>
          </Box>
        </motion.div>

      </ChakraProvider>
  );
};

export default hot(App);
