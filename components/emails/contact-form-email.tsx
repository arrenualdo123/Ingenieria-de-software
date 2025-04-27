import type * as React from "react"
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components"

interface ContactFormEmailProps {
  name: string
  email: string
  phone?: string
  message: string
}

const ContactFormEmail: React.FC<ContactFormEmailProps> = ({ name, email, phone = "No proporcionado", message }) => {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de contacto de {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nuevo mensaje de contacto</Heading>
          <Text style={text}>Has recibido un nuevo mensaje de contacto desde el sitio web de TasDrives.</Text>

          <Section style={section}>
            <Text style={sectionHeader}>Información del remitente:</Text>
            <Text style={sectionContent}>
              <strong>Nombre:</strong> {name}
            </Text>
            <Text style={sectionContent}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={sectionContent}>
              <strong>Teléfono:</strong> {phone}
            </Text>
          </Section>

          <Section style={section}>
            <Text style={sectionHeader}>Mensaje:</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>© {new Date().getFullYear()} TasDrives. Todos los derechos reservados.</Text>
        </Container>
      </Body>
    </Html>
  )
}

// Estilos para el correo
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "5px",
}

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
  padding: "0",
  lineHeight: "1.5",
}

const text = {
  color: "#333",
  fontSize: "16px",
  margin: "0 0 20px 0",
  lineHeight: "1.5",
}

const section = {
  margin: "20px 0",
  backgroundColor: "#f9f9f9",
  padding: "15px",
  borderRadius: "5px",
  border: "1px solid #eee",
}

const sectionHeader = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 10px 0",
}

const sectionContent = {
  margin: "5px 0",
  fontSize: "16px",
}

const messageStyle = {
  whiteSpace: "pre-wrap",
  margin: "10px 0",
  fontSize: "16px",
  lineHeight: "1.6",
}

const hr = {
  borderColor: "#eee",
  margin: "30px 0",
}

const footer = {
  color: "#888",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "20px 0",
}

export default ContactFormEmail
