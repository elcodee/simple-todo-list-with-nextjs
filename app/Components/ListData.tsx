import { Card, CardHeader, Heading, CardBody, Stack, Box, Text, StackDivider, Button } from '@chakra-ui/react'
import React from 'react'

const ListData = ({ datas, handleDelete }: any) => {
    const [isDelete, setIsDelete] = React.useState<boolean>(false);

    React.useEffect(() => { }, [datas.length]);
    return (
        <>
            <Card minW='lg' mt={5}>
                <div className="flex justify-between">
                    <CardHeader>
                        <Heading size='md'>Manage List</Heading>
                    </CardHeader>

                    {
                        datas.length >= 1 &&
                        <Button colorScheme='red' size='sm' m={6} onClick={() => setIsDelete(!isDelete)}>
                            Delete ?
                        </Button>
                    }
                </div>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        {
                            datas.length !== 0 ? datas.map((item: any, key: any) => {
                                return (
                                    <Box>
                                        <div className="flex justify-between" key={key + 1}>
                                            <div>
                                                <Heading size='xs' textTransform='uppercase'>
                                                    {item.title}
                                                </Heading>
                                                <Text pt='2' fontSize='sm'>
                                                    {item.desc}
                                                </Text>
                                            </div>
                                            {
                                                isDelete &&
                                                <Button colorScheme='red' size='xs' onClick={() => handleDelete(item.id)}>
                                                    X
                                                </Button>
                                            }
                                        </div>
                                    </Box>
                                )
                            }) :
                                <Box>
                                    <Heading size='xs' color="red.500" textTransform='uppercase'>
                                        No Data
                                    </Heading>
                                </Box>
                        }
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}

export default ListData