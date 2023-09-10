"use client";

import { Card, CardHeader, Flex, Avatar, Heading, IconButton, CardBody, CardFooter, Button, Image, Text, Box, Input, Textarea, FormControl, FormHelperText, FormLabel, useToast } from '@chakra-ui/react'
import * as React from 'react'
import ListData from './ListData'

const CardAdd = () => {
  const [inputData, setinputData] = React.useState<any>({});
  const [datas, setDatas] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isError, setisError] = React.useState<any>({
    show: false,
    input: ""
  });
  const toast = useToast();

  const handleSave = () => {
    setLoading(true);
    setisError({ show: false, input: "" });

    if (!inputData.title && !inputData.desc) {
      setTimeout(() => {
        setLoading(false);
        setisError({ show: false, input: "" });
        toast({
          title: 'Failed!',
          position: "top",
          description: "Title & Description is Required.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }, 1000);
    }

    if (!inputData.title) {
      setTimeout(() => {
        setisError({ show: true, input: "title" });
        setLoading(false);
      }, 1000);
    }

    if (!inputData.desc) {
      setTimeout(() => {
        setisError({ show: true, input: "desc" });
        setLoading(false);
      }, 1000);
    }

    if (inputData.title && inputData.desc) {
      setinputData({
        title: "",
        desc: "",
      });

      setTimeout(() => {
        toast({
          title: 'Success!',
          position: "top",
          description: "Your todo has been saved.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setisError({ show: false, input: "" });
        setLoading(false);
        setDatas([...datas, inputData]);
      }, 2000);
    }
  }

  const handleDelete = (id: any) => {
    const filtered = datas.filter((el: any) => el.id !== id);

    if (filtered) {
      setDatas(filtered);
    }
  }

  React.useEffect(() => { }, [inputData?.title, inputData?.desc])


  return (
    <>
      <Card minW='lg' mt={-8}>
        <CardHeader>
          <Flex>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Todo List' src='' />

              <Box>
                <Heading size='sm'>Todo List</Heading>
                <Text>Manage Your Activity</Text>
              </Box>
            </Flex>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input disabled={loading} isInvalid={isError.show && isError.input === "title"} variant='filled' placeholder='todo...' value={inputData?.title} onChange={(e) => setinputData({ ...inputData, id: Math.floor(Math.random() * 999), title: e.target.value })} />
            {isError.show && isError.input === "title" && <FormHelperText>Title is Required</FormHelperText>}
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea disabled={loading} isInvalid={isError.show && isError.input === "desc"} variant='filled' placeholder='details...' value={inputData?.desc} onChange={(e) => setinputData({ ...inputData, desc: e.target.value })} />
            {isError.show && isError.input === "desc" && <FormHelperText>Description is Required</FormHelperText>}
          </FormControl>

        </CardBody>

        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          {
            loading ?
              <Button
                isLoading
                flex='1'
                loadingText='Saving...'
                variant='solid'
                color="whitesmoke"
                bgColor="green.300"
              >
                Save
              </Button> :
              <Button flex='1' variant='solid' color="whitesmoke" bgColor="green.300" onClick={() => handleSave()}>
                Save
              </Button>
          }
        </CardFooter>
      </Card>

      <ListData handleDelete={handleDelete} datas={datas} />
    </>
  )
}

export default CardAdd