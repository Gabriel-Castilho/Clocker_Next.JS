import { Logo,useAuth } from './../components'
import { Container, Box, Input, Button, Text, FormControl, FormLabel, FormHelperText} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/Link'
import { useEffect } from "react"
import {useRouter} from 'next/router'






const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenhcimento obrigatório'),
  password: yup.string().required("Preenchimento Obrigatório"),
})  
export default function Login() {

  const [auth,{login}]=useAuth()
    const router = useRouter()
  


  const {values,errors,touched,handleChange,handleSubmit,handleBlur,isSubmitting} = useFormik({
    onSubmit: login,
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ''
    }

  })
  useEffect(()=>{
    auth.user && router.push("/agenda")
  },[auth.user])

  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>
      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel >Email </FormLabel>
          <Input size="lg" type="email" values={values.email} onChange={handleChange} onBlur={handleBlur} />
         {touched.email &&<FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel >Senha</FormLabel>
          <Input size="lg" type="password" values={values.password} onChange={handleChange} onBlur={handleBlur} />
         {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText>}
        </FormControl>

        <Box p={4}>
          <Button colorScheme="blue" width="100%" onClick={handleSubmit} isLoading={isSubmitting}>Entrar</Button>
        </Box>
      </Box>

      <Link href="/signup">Ainda não tem uma conta? Cadastre-se</Link>
    </Container>
  )
}
