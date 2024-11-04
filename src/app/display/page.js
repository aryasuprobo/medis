"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactDOM from 'react-dom';
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Box, Container, Heading, Text, HStack, SimpleGrid, Stack, Flex, Input, VStack, Button, Bleed, Table } from "@chakra-ui/react";

const DisplayPage = () => {
    const router = useRouter()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientSnapshot = await getDocs(collection(db, "clients"));
                const animalSnapshot = await getDocs(collection(db, "animals"));
                const physicalExamSnapshot = await getDocs(collection(db, "physical_exams"));

                const clients = clientSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const animals = animalSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const exams = physicalExamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Combine data based on IDs
                const combinedData = exams.map(exam => {
                    const animal = animals.find(a => a.id === exam.animalId); // Link by animalId
                    return { ...exam, animalId: animal ? animal.id : null, animalName: animal ? animal.name : "Unknown" };
                });

                const sortedData = combinedData.sort((a, b) => {
                    return new Date(b.examDate) - new Date(a.examDate);
                });

                setData({ clients, animals, exams: sortedData });
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <center>
                <p>Loading data...</p>
            </center>
        );
    }


    return (
        <Box Box bg="gray.200" minH="100vh" py={10} display="flex" flexDirection="column">
            <Container maxW="container.lg" flex="1">
                <Stack align="flex-start">
                    <HStack>
                        <Image
                            src="/img/IMG_9042-removebg.png"
                            alt="Pelangi Vet Klinik"
                            width={100}
                            height={100}
                        />
                        <Heading size="2xl" color="gray.950">Pelangi Vet Klinik</Heading>
                    </HStack>
                </Stack>
                <Box display="flex" flexDirection="column" alignItems="center" mt={4} >



                    <Box width="80%" overflowX="auto" mb={4}>
                        <Text mb="5" fontSize="2xl" fontWeight="bold" color="gray.950" >
                            Data Klien
                        </Text>
                        <Table.Root size="sm" variant="striped" colorScheme="gray" >
                            <Table.ColumnGroup>
                                <Table.Column htmlWidth="50%" />
                                <Table.Column htmlWidth="40%" />
                                <Table.Column />
                            </Table.ColumnGroup>
                            <Table.Header>

                                <Table.Row bg="gray.500" color="white" fontWeight="bold">
                                    <Table.ColumnHeader textAlign="center">No</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">ID Klien</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Nama Klien</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Alamat</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Nomor Telp</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Tanggal Pemeriksaan</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">DVM</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {data.clients.map((client, index) => (
                                    <Table.Row key={client.id} _hover={{ bg: "gray.300", color: "white" }}>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{index + 1}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{client.id}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{client.name}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{client.address}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{client.phone}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{client.examDate}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{client.dvm}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>


                    <Box width="80%" overflowX="auto" mb={4}>
                        <Text mb="5" fontSize="2xl" fontWeight="bold" color="gray.950" >
                            Data Hewan
                        </Text>
                        <Table.Root size="sm" variant="striped" colorScheme="gray" >
                            <Table.ColumnGroup>
                                <Table.Column htmlWidth="50%" />
                                <Table.Column htmlWidth="40%" />
                                <Table.Column />
                            </Table.ColumnGroup>
                            <Table.Header>

                                <Table.Row bg="gray.500" color="white">
                                    <Table.ColumnHeader textAlign="center">No</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">ID Hewan</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Nama Hewan</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Spesies</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Breed</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Berat</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Umur</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Gender</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {data.animals.map((animal, index) => (
                                    <Table.Row key={animal.id} _hover={{ bg: "gray.300", color: "white" }}>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{index + 1}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{animal.id}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{animal.name}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{animal.species}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{animal.breed}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{animal.weight}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{animal.age}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{animal.gender}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>



                    <Box width="80%" overflowX="auto" mb={4}>
                        <Text mb="5" fontSize="2xl" fontWeight="bold" color="gray.950" >
                            Kondisi Hewan
                        </Text>
                        <Table.Root size="sm" variant="striped" colorScheme="gray" >
                            <Table.ColumnGroup>
                                <Table.Column htmlWidth="50%" />
                                <Table.Column htmlWidth="40%" />
                                <Table.Column />
                            </Table.ColumnGroup>

                            <Table.Header>

                                <Table.Row bg="gray.500" color="white" mb="3" fontWeight="bold">
                                    <Table.ColumnHeader textAlign="center">No</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Temperature</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Appearance</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Mata</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Telinga</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Hidung</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Mulut</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Kulit & Rambut</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">lymphNodes</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Mucosa</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Abdomen</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Thorax</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Gastro</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Respiratory</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Hear rate</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Tulang & Otot</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Extremities</Table.ColumnHeader>

                                    <Table.ColumnHeader textAlign="center">Urogenital</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {data.exams.map((exam, index) => (
                                    <Table.Row key={exam.id} _hover={{ bg: "gray.300", color: "white" }}>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{index + 1}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.temperature}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.appearance}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.eyes}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.ears}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.nose}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.mouth}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.skinHair}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.lymphNodes}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.mucosa}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.abdomen}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.thorax}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.gastro}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.respiration}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.heartRate}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.boneMuscle}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.extremities}</Table.Cell>
                                        <Table.Cell color="black" fontWeight="bold" textAlign="center">{exam.urogenital}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>




                    <VStack justify="center" width="full" spacing={1} mt={1} >
                        <Button bg="grey.800" _hover={{ bg: "grey.200", color: "white" }} type="submit" variant="surface" maxWidth="600px" width="full" mb={8} onClick={() => router.push("/")}>Kembali</Button>
                    </VStack>

                </Box >
            </Container>
            <Bleed blockEnd="8" mt="auto" width={"100%"}>
                <Box bg="gray.800" color="white" py={4} textAlign="center" mt="auto">
                    <Text>© 2024 Pelangi Vet Klinik. All rights reserved.</Text>
                </Box>
            </Bleed>
        </Box>




    );

};
export default DisplayPage;
