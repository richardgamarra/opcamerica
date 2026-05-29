# OPCAmerica — OPC Technical Glossary EN ↔ ES

> This is a living document. Update it as new terms are encountered.
> Rule: OPC technical terms are ALWAYS kept in English, even in Spanish content.
> This glossary defines how to USE those terms in Spanish context.

---

## Usage Rule

When writing Spanish content:
- Write the English term as-is (it IS the term — do not translate it)
- On first use in an article, add a brief Spanish explanation in parentheses
- Example: "El **namespace** (espacio de nombres) de un servidor OPC UA contiene todos los nodos..."

---

## Core OPC UA Terms

| English Term | How to use in Spanish | Brief Spanish explanation |
|---|---|---|
| OPC UA | OPC UA | OPC Unified Architecture — protocolo de comunicación industrial |
| OPC Classic | OPC Classic | Versión anterior del estándar OPC |
| OPC DA | OPC DA | OPC Data Access — acceso a datos en tiempo real |
| OPC AE | OPC AE | OPC Alarms & Events — alarmas y eventos |
| OPC HDA | OPC HDA | OPC Historical Data Access — datos históricos |
| address space | address space | Espacio de direcciones — estructura completa de nodos del servidor |
| namespace | namespace | Espacio de nombres — agrupa los nodos de una aplicación o fabricante |
| namespace index | namespace index | Índice numérico que identifica un namespace específico |
| node | node (o "nodo" en contexto general) | Elemento fundamental del address space |
| node ID | node ID | Identificador único de un nodo (ej. ns=2;i=1001) |
| BrowseName | BrowseName | Nombre de navegación del nodo |
| DisplayName | DisplayName | Nombre visible del nodo para el usuario |
| NodeClass | NodeClass | Tipo de nodo (Object, Variable, Method, etc.) |
| Object | Object | Nodo que representa un componente del sistema físico o lógico |
| Variable | Variable | Nodo que contiene un valor (dato) |
| Method | Method | Nodo que representa una función ejecutable |
| ObjectType | ObjectType | Definición del tipo de un Object |
| VariableType | VariableType | Definición del tipo de una Variable |
| ReferenceType | ReferenceType | Tipo de relación entre dos nodos |
| DataType | DataType | Tipo de dato del valor de una Variable |
| session | session | Sesión — conexión autenticada entre cliente y servidor |
| endpoint | endpoint | Punto de acceso al servidor OPC UA (URL + configuración de seguridad) |
| endpoint URL | endpoint URL | Dirección del servidor (ej. opc.tcp://192.168.1.10:4840) |
| certificate | certificate | Certificado digital para autenticación y cifrado |
| certificate store | certificate store | Almacén de certificados del servidor o cliente |
| subscription | subscription | Suscripción — mecanismo para recibir cambios de valor periódicamente |
| monitored item | monitored item | Elemento monitoreado dentro de una suscripción |
| PublishingInterval | PublishingInterval | Intervalo de publicación de datos (en milisegundos) |
| SamplingInterval | SamplingInterval | Intervalo de muestreo del dato en el servidor |
| publish/subscribe | publish/subscribe | Modelo de comunicación asíncrona de OPC UA PubSub |
| browse | browse | Navegar el address space para descubrir nodos |
| read | read | Leer el valor de uno o más nodos |
| write | write | Escribir un valor en un nodo Variable |
| call | call | Invocar un Method |
| StatusCode | StatusCode | Código de estado que indica la calidad del dato |
| Quality | Quality (o StatusCode) | Indica si el dato es confiable (Good, Uncertain, Bad) |
| security mode | security mode | Modo de seguridad: None, Sign, SignAndEncrypt |
| security policy | security policy | Política de cifrado: Basic256Sha256, Aes128, etc. |
| user token | user token | Token de autenticación de usuario (Anonymous, Username, Certificate) |
| information model | information model | Modelo de información — estructura de datos definida para una industria |
| companion specification | companion specification | Especificación complementaria para un sector (machinery, energy, etc.) |
| server | server (o "servidor OPC UA") | Aplicación que expone datos vía OPC UA |
| client | client (o "cliente OPC UA") | Aplicación que consume datos de un servidor OPC UA |
| aggregation server | aggregation server | Servidor que consolida datos de múltiples servidores |
| gateway | gateway | Dispositivo o software que traduce otro protocolo a OPC UA |
| PubSub | PubSub | Extensión de OPC UA para comunicación publicación/suscripción |
| broker | broker | Intermediario en arquitecturas PubSub (ej. MQTT broker) |

---

## Security Terms

| English Term | Spanish context usage | Explanation |
|---|---|---|
| PKI | PKI (Infraestructura de Clave Pública) | Sistema de gestión de certificados digitales |
| trust list | trust list | Lista de certificados de confianza del servidor |
| rejected list | rejected list | Lista de certificados rechazados |
| self-signed certificate | certificado auto-firmado | Certificado generado sin autoridad certificadora |
| CA (Certificate Authority) | CA (Autoridad Certificadora) | Entidad que emite y valida certificados |
| thumbprint | thumbprint | Huella digital del certificado |
| encryption | cifrado | Protección de datos en tránsito |
| signing | firma digital | Verificación de integridad y autenticidad |

---

## Industrial / Hardware Terms (Spanish OK)

These terms have established Spanish equivalents that are widely used in industry:

| English | Spanish | Notes |
|---|---|---|
| PLC | PLC o controlador lógico programable | "PLC" is universally used in Spanish |
| SCADA | SCADA (sistema SCADA) | Used as-is |
| HMI | HMI o interfaz hombre-máquina | Both used |
| DCS | DCS o sistema de control distribuido | Both used |
| historian | historiador (de datos) | Spanish term is common |
| tag | tag o etiqueta | "Tag" is more common in technical Spanish |
| I/O | I/O o entradas/salidas | Both used depending on context |
| fieldbus | fieldbus o bus de campo | Both used |
| gateway | gateway o pasarela | "Gateway" is more commonly used |
| edge | edge computing | "Edge" used as-is |
| cloud | nube (cloud) | "Nube" is established; "cloud" also used |

---

## Common Phrases in Bilingual Content

### English → Spanish (for tutorials and explanations)

| English phrase | Spanish equivalent |
|---|---|
| "Connect to an OPC UA server" | "Conectarse a un servidor OPC UA" |
| "Browse the address space" | "Navegar el address space del servidor" |
| "Subscribe to a node" | "Suscribirse a un node para recibir cambios" |
| "Read the value of a node" | "Leer el valor de un node" |
| "The OPC UA client connects to..." | "El cliente OPC UA se conecta a..." |
| "Configure the endpoint" | "Configurar el endpoint del servidor" |
| "Security certificate" | "Certificado de seguridad (certificate)" |
| "Data quality is Good/Bad/Uncertain" | "La calidad del dato (StatusCode) es Good/Bad/Uncertain" |
| "The subscription interval is 1000ms" | "El intervalo de la subscription es 1000ms" |
| "Node not found" | "Node no encontrado" |

---

## SEO Keywords by Language

### English — high priority targets
- opc ua tutorial
- opc ua python
- opc ua c#
- what is opc ua
- opc ua vs mqtt
- opc ua security
- opc ua address space
- opc ua server configuration
- kepware opc ua
- ignition opc ua
- opc ua for beginners

### Spanish — high priority targets (near-zero competition)
- tutorial opc ua español
- qué es opc ua
- opc ua en español
- configurar servidor opc ua
- opc ua python español
- opc ua para ingenieros
- protocolo opc ua
- opc ua industria 4.0
- opc ua automatización industrial
- conectar plc opc ua

---

*This glossary is a key SEO asset. Publish it as a standalone page at opcamerica.com/en/glossary and opcamerica.com/es/glosario*
*See also: context/BILINGUAL.md*
