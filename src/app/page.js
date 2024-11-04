"use client";


import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Container, Heading, Text, HStack, SimpleGrid, Stack, Flex, Input, VStack, Button, Bleed, Select, FormLabel, FormErrorMessage, FormControl } from '@chakra-ui/react';
import { FaUser, FaDog, FaStethoscope } from 'react-icons/fa';

import { Field } from "@/components/ui/field"




const Feature = ({ icon, title, description }) => (
  <Stack align="center" bg="white" p={6} shadow="md" borderRadius="md">
    <Flex justify="center" align="center" mb={4}>
      <Box color="teal.500">
        {icon}
      </Box>
    </Flex>
    <Heading as="h3" size="md" color="teal.700" mt={4}>
      {title}
    </Heading>
    <Text fontSize="sm" color="gray.600" textAlign="center">
      {description}
    </Text>
  </Stack>
);


export default function Home() {

  const router = useRouter(); // Initialize useRouter

  const [client, setClient] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    examDate: "",
    dvm: ""
  });

  const [animal, setAnimal] = useState({
    id: "",
    name: "",
    species: "",
    breed: "",
    weight: "",
    age: "",
    gender: ""
  });

  const [physicalExam, setPhysicalExam] = useState({
    temperature: "",
    appearance: "",
    eyes: "",
    ears: "",
    nose: "",
    mouth: "",
    skinHair: "",
    lymphNodes: "",
    mucosa: "",
    abdomen: "",
    thorax: "",
    gastro: "",
    respiration: "",
    boneMuscle: "",
    extremities: "",
    urogenital: ""
  });

  const handleInputChange = (e, setState, state) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi apakah semua field telah diisi
    const isClientComplete = Object.values(client).every((value) => value.trim() !== "");
    const isAnimalComplete = Object.values(animal).every((value) => value.trim() !== "");
    const isPhysicalExamComplete = Object.values(physicalExam).every((value) => value.trim() !== "");

    if (!isClientComplete || !isAnimalComplete || !isPhysicalExamComplete) {
      alert("Mohon lengkapi semua field.");
      return;
    }

    try {
      await addDoc(collection(db, "clients"), client);
      await addDoc(collection(db, "animals"), animal);
      await addDoc(collection(db, "physical_exams"), physicalExam);

      alert("Data berhasil disimpan!");
      // router.push("/display");
    } catch (error) {
      console.error("Error menyimpan data: ", error);
      alert("Gagal menyimpan data");
    }
  };

  return (
    <Box bg="gray.200" minH="100vh" py={10} display="flex" flexDirection="column">
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
          <Text mb="3" fontSize="md" color="gray.950" maxWidth="600px" width="full">
            Pelangi Vet Klinik menyediakan layanan kesehatan hewan yang komprehensif dan profesional. Dari perawatan medis hingga konsultasi, kami siap membantu menjaga hewan kesayangan Anda tetap sehat dan bahagia.
          </Text>
        </Stack>


        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
          <Feature icon={<FaUser size={40} />} title="Data Klien" description="Kelola data klien dengan mudah dan teratur." />
          <Feature icon={<FaDog size={40} />} title="Data Hewan" description="Simpan informasi hewan milik klien Anda." />
          <Feature icon={<FaStethoscope size={40} />} title="Cek Fisik Hewan" description="Rekam hasil pemeriksaan fisik hewan." />
        </SimpleGrid>

        <br></br>


        {/* Inputan Client dan Hewan */}

        <form onSubmit={handleSubmit}>
          <HStack spacing={10}
            width="full"
            align="flex-start"
            justify="center"
            padding={4}
            flexDirection={{ base: "column", md: "row" }} >
            <VStack width="100%" align="flex-start">
              <Text mb="3" fontSize="2xl" fontWeight="bold" color="gray.950" >
                Identitas Anda
              </Text>
              <Field label="ID Klien" color="gray.950" >
                <Input placeholder="" variant="outline" type="text" maxWidth="600px" width="full" name="id" value={client.id} onChange={(e) => handleInputChange(e, setClient, client)} />
              </Field>
              <Field label="Nama" color="gray.950" >
                <Input placeholder="" variant="outline" type="text" maxWidth="600px" width="full" name="name" value={client.name} onChange={(e) => handleInputChange(e, setClient, client)} />
              </Field>
              <Field label="Alamat" color="gray.950" >
                <Input placeholder="" variant="outline" type="text" maxWidth="600px" width="full" name="address" value={client.address} onChange={(e) => handleInputChange(e, setClient, client)} />
              </Field>
              <Field label="No. Telp" color="gray.950" >
                <Input placeholder="" variant="outline" type="text" maxWidth="600px" width="full" name="phone" value={client.phone} onChange={(e) => handleInputChange(e, setClient, client)} />
              </Field>
              <Field label="Tanggal pemeriksaan" color="gray.950" >
                <Input placeholder="" variant="outline" type="date" maxWidth="600px" width="full" name="examDate" value={client.examDate} onChange={(e) => handleInputChange(e, setClient, client)} />
              </Field>
              <Field label="DVM" color="gray.950" >
                <Input placeholder="" variant="outline" type="text" maxWidth="600px" width="full" name="dvm" value={client.dvm} onChange={(e) => handleInputChange(e, setClient, client)} />
              </Field>
              <br></br>
            </VStack>

            <VStack width="100%" align="flex-start" >
              <Text mb="3" fontSize="2xl" fontWeight="bold" color="gray.950">
                Identitas Hewan
              </Text>
              <Field label="ID Hewan" color="gray.950" >
                <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="id" value={animal.id} onChange={(e) => handleInputChange(e, setAnimal, animal)} />
              </Field>
              <Field label="Nama Hewan" color="gray.950" >
                <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="name" value={animal.name} onChange={(e) => handleInputChange(e, setAnimal, animal)} />
              </Field>
              <Field label="Spesies" color="gray.950" >
                <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="species" value={animal.species} onChange={(e) => handleInputChange(e, setAnimal, animal)} />
              </Field>
              <Field label="Breed" color="gray.950" >
                <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="breed" value={animal.breed} onChange={(e) => handleInputChange(e, setAnimal, animal)} />
              </Field>
              <Field label="Berat badan" color="gray.950" >
                <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="weight" value={animal.weight} onChange={(e) => handleInputChange(e, setAnimal, animal)} />
              </Field>
              <Field label="Umur" color="gray.950" >
                <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="number" name="age" value={animal.age} onChange={(e) => handleInputChange(e, setAnimal, animal)} />
              </Field>
              <Field label="Gender" color="gray.950" >
                <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="gender" value={animal.gender} onChange={(e) => handleInputChange(e, setAnimal, animal)} />

              </Field>

            </VStack>
          </HStack>
          <br></br><br></br><br></br>

          {/* Inputan kondisi hewan */}

          <VStack width="full"
            align="flex-start"
            justify="center"
            padding={4}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.950">
              Kondisi Hewan
            </Text>
            <Field label="Suhu" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="temperature" value={animal.temperature} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Penampilan" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="appearance" value={animal.appearance} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Mata" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="eyes" value={animal.eyes} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Telinga" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="ears" value={animal.ears} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Hidung" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="nose" value={animal.nose} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Mulut" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="mouth" value={animal.mouth} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Kulit rambut" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="skinHair" value={animal.skinHair} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Limfonodus" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="lymphNodes" value={animal.lymphNodes} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Mukosa" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="mucosa" value={animal.mucosa} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Abdomen" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="abdomen" value={animal.abdomen} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Thoraks" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="thorax" value={animal.thorax} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Gastro" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="gastro" value={animal.gastro} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Respirasi" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="respiration" value={animal.respiration} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Tulang dan otot" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="boneMuscle" value={animal.boneMuscle} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Ekstremitas" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="extremities" value={animal.extremities} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
            <Field label="Urogenital" color="gray.950" >
              <Input placeholder="" variant="outline" maxWidth="600px" width="full" type="text" name="urogenital" value={animal.urogenital} onChange={(e) => handleInputChange(e, setPhysicalExam, physicalExam)} />
            </Field>
          </VStack>

          <VStack justify="center" width="full" spacing={4} mt={8} >
            <Button bg="teal.500" _hover={{ bg: "teal.700", color: "white" }} type="submit" variant="surface" maxWidth="600px" width="full" mb={8} >Simpan</Button>
          </VStack>
          <VStack justify="center" width="full" spacing={1} mt={1} >
            <Button bg="grey.800" _hover={{ bg: "grey.200", color: "white" }} type="submit" variant="surface" maxWidth="600px" width="full" mb={8} onClick={() => router.push("/display")}>Lihat data</Button>
          </VStack>

        </form>
      </Container>
      {/* Footer */}
      <Bleed blockEnd="8" mt="auto">
        <Box bg="gray.800" color="white" py={4} textAlign="center" mt="auto">
          <Text>© 2024 Pelangi Vet Klinik. All rights reserved.</Text>
        </Box>
      </Bleed>
    </Box >

  );
}
