---
{
  "id": "opp_8ab3094d-f740-4fae-811c-bcd7858d04d0",
  "locale": "es",
  "slug": "article-8ab3094d-f740-4fae-811c-bcd7858d04d0",
  "urlSlug": "hetzner-vs-digitalocean-para-autoalojar-n8n",
  "publishedAt": "2026-09-30T11:57:25.340Z",
  "title": "Hetzner vs DigitalOcean para autoalojar n8n",
  "subtitle": "Comparamos Hetzner y DigitalOcean en especificaciones, precios y esfuerzo de configuración documentado para autoalojar n8n, más lo que la documentación oficial no cubre.",
  "description": "Comparamos Hetzner y DigitalOcean en especificaciones, precios y esfuerzo de configuración documentado para autoalojar n8n, más lo que la documentación oficial no cubre.",
  "date": "2026-09-30",
  "sourcesCheckedAt": "2026-09-30T11:30:49.704Z",
  "tags": [
    "Autoalojamiento",
    "Preparación para producción",
    "n8n",
    "Comparativa"
  ],
  "coverImage": "/blog/es/article-8ab3094d-f740-4fae-811c-bcd7858d04d0/9cf7b1f1255810e880789c4bf117a786063053dce8ea1f696de78625851c8705.png",
  "coverAlt": "Dos cajas de herramientas abiertas que representan la elección entre dos proveedores de autoalojamiento para un servidor de automatización.",
  "seo": {
    "title": "Hetzner vs DigitalOcean para autoalojar n8n",
    "description": "Comparamos Hetzner y DigitalOcean en especificaciones, precios y esfuerzo de configuración documentado para autoalojar n8n, más lo que la documentación oficial no cubre.",
    "keywords": []
  },
  "revision": "795c4c9a15e38246dd6b3ad5472a74c72b9ab9223c9dd7da620902697deb7030"
}
---

## Especificaciones del servidor de un vistazo: Hetzner Cloud vs DigitalOcean Droplets

![Cajas de servidor una junto a otra comparando las especificaciones de Hetzner vs DigitalOcean para autoalojar n8n.](/blog/es/article-8ab3094d-f740-4fae-811c-bcd7858d04d0/d1f60c01302bc02c26add9ba22e9040d05320a0e603718f69ed6633642289c39.png)

Una comparación conceptual de niveles de servidor comparables de dos proveedores de alojamiento.

Cuando un equipo compara Hetzner vs DigitalOcean para autoalojar n8n, la primera pregunta suele ser sencilla: ¿qué incluye realmente un servidor comparable? La línea Cloud Regular Performance de Hetzner incluye un nivel CPX22 con 2 vCPUs AMD, 4 GB de RAM y 80 GB de almacenamiento NVMe, según la propia página de precios de Hetzner. Por parte de DigitalOcean, un Droplet Basic con 4 GiB de RAM y 2 vCPUs equivalentes se sitúa en el nivel Regular CPU, según la documentación de DigitalOcean.

El ancho de banda se agrupa de forma distinta. La documentación de Hetzner indica que los servidores cloud en la región de la UE, incluidas sus ubicaciones de Falkenstein, Núremberg y Helsinki, incluyen al menos 20 TB de tráfico saliente antes de aplicar cargos adicionales. DigitalOcean posiciona sus Droplets Basic de CPU compartida como la opción de menor coste para cargas de trabajo que no necesitan cómputo dedicado garantizado, según las propias directrices de dimensionamiento de DigitalOcean, fechadas en 2026, una descripción que encaja con una instalación típica de n8n de una sola instancia.

**Niveles de servidor comparables para autoalojar n8n**

| Criterio | Hetzner CPX22 | DigitalOcean Basic (4 GiB / 2 vCPU) |
| --- | --- | --- |
| vCPUs | 2 vCPUs AMD | 2 vCPUs |
| RAM | 4 GB | 4 GiB |
| Almacenamiento | 80 GB NVMe | 80 GiB |
| Transferencia saliente incluida | Al menos 20 TB en ubicaciones de la UE | No documentado en las fuentes usadas para esta comparación |
| Fuente | Documentación de precios propia de Hetzner | Documentación de precios propia de DigitalOcean |

Sources: [Hetzner Virtual Private Server: Best Price-Performance Ratio](<https://www.hetzner.com/cloud/regular-performance/>), [Choosing the Right CPU Droplet Plan | DigitalOcean Documentation](<https://docs.digitalocean.com/products/droplets/concepts/choosing-a-plan/>), [Droplet Pricing | DigitalOcean](<https://www.digitalocean.com/pricing/droplets>)

Antes de comparar servidores, quienes aún no tengan una cuenta de n8n pueden registrarse en n8n Cloud a través de este enlace de socio, que abre la propia página de registro de n8n, y seguir el resto de esta comparación con su propio espacio de trabajo.

**[Regístrate en n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## Estructura de precios: facturación, límites y ancho de banda de Hetzner vs DigitalOcean

Las estructuras de precios de Hetzner vs DigitalOcean difieren más en la mecánica de facturación que en las cifras principales. Las tarifas publicadas por la propia Hetzner no incluyen un precio mensual para el nivel CPX22 usado en la comparación de especificaciones anterior. La cifra documentada más cercana es la instancia CX23 de Hetzner, un nivel de cloud de Hetzner distinto con sus propias especificaciones con precio independiente, no la línea CPX22 descrita anteriormente.

Un ajuste de precios a mediados de 2026 fijó la tarifa de CX23 en 6,49 $ al mes, frente a los 4,99 $ anteriores, vigente para nuevos pedidos a partir del 15 de junio de 2026, según las tarifas publicadas por la propia Hetzner. Esa cifra solo ilustra cómo se estructuran y ajustan los precios del cloud de Hetzner; no es un precio comparable directo frente al nivel equivalente a CPX22 de DigitalOcean, y excluye el IVA y cualquier complemento de IPv4.

Los planes de Droplet empaquetados de DigitalOcean comienzan desde tan solo 4 $ al mes para su nivel de entrada, según la página de precios de DigitalOcean. El nivel de 4 GiB / 2 vCPU que coincide con las especificaciones de CPX22 de Hetzner de la tabla anterior cuesta 24 $ al mes en el nivel Regular CPU de DigitalOcean.

**Cómo estructuran sus precios Hetzner y DigitalOcean**

| Criterio | Hetzner | DigitalOcean |
| --- | --- | --- |
| Granularidad de facturación | Tarifa por hora con un límite de precio mensual | Facturación por segundo, mínimo 60 segundos o 0,01 $ |
| Precio mensual de entrada | No disponible para el nivel CPX22 en estas fuentes | 4 $ al mes para el Droplet Basic más pequeño |
| Precio comparable documentado más cercano | CX23 (un nivel distinto): 6,49 $ al mes tras un ajuste a mediados de 2026 | 24 $ al mes para el Droplet Basic de 4 GiB / 2 vCPU |
| Ancho de banda más allá de la asignación incluida | Integrado en una asignación mayor incluida en el precio base para la UE | 0,01 $ por GiB más allá de la asignación incluida |

La granularidad de facturación también difiere. DigitalOcean factura los Droplets de planes empaquetados por segundo, con un cargo mínimo de 60 segundos o 0,01 $, lo que sea mayor, según la documentación de DigitalOcean fechada el 25 de agosto de 2026. Más allá de la asignación de transferencia incluida de cada Droplet, DigitalOcean cobra 0,01 $ por GiB de datos salientes, mientras que la transferencia entrante permanece gratuita. Hetzner, en cambio, integra una asignación de transferencia mayor en su precio base para la UE, de modo que ambos proveedores trasladan los costes de ancho de banda a partes distintas de la factura. Estas cifras reflejan las fechas indicadas anteriormente y pueden haber cambiado desde entonces, por lo que un equipo debería consultar la página de precios actual de cada proveedor antes de decidir.

Sources: [Hetzner Virtual Private Server: Best Price-Performance Ratio](<https://www.hetzner.com/cloud/regular-performance/>), [Hetzner Price Adjustment 15 June 2026 - Hetzner Docs](<https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/>), [Droplet Pricing | DigitalOcean Documentation](<https://docs.digitalocean.com/products/droplets/details/pricing/>), [Droplet Pricing | DigitalOcean](<https://www.digitalocean.com/pricing/droplets>)

## Esfuerzo de configuración: aprovisionamiento de firewall y red en cada plataforma

![Una secuencia de puertas que ilustra los pasos de aprovisionamiento de firewall para un servidor autoalojado.](/blog/es/article-8ab3094d-f740-4fae-811c-bcd7858d04d0/a65827ff96d658e52ac2e038006081b3a0d7212dfe3863c67e30d1160ef8b4c8.png)

Una secuencia ilustrativa para configurar reglas de red con denegación por defecto antes de exponer un servidor.

Ambos proveedores documentan un modelo de firewall basado en reglas y con denegación por defecto, por lo que el esfuerzo de configuración parece similar sobre el papel. Los Cloud Firewalls de Hetzner, creados manualmente en la Consola según documentación de 2021, admiten hasta 500 reglas efectivas de entrada y salida por firewall. Los Cloud Firewalls de DigitalOcean son un servicio con estado basado en red que se ofrece a los Droplets sin coste adicional, según la documentación de DigitalOcean fechada el 13 de julio de 2026, y por defecto bloquean todo el tráfico a menos que una regla lo permita explícitamente.

Para un equipo que expone los endpoints de webhook de n8n, esa postura de denegación por defecto importa más que la interfaz usada para configurarla. Ninguna de las documentaciones de firewall de ambos proveedores aportadas aquí explica cómo combinar estas reglas con la configuración propia de webhook o proxy inverso de n8n, por lo que un equipo debería tratar la documentación general de firewall como un punto de partida y no como una guía específica de n8n.

**Una secuencia típica de aprovisionamiento de firewall**

1. **Crear el firewall**: Definir un recurso de firewall con nombre en la consola o CLI del proveedor.
2. **Establecer la denegación por defecto**: Dejar bloqueado todo el tráfico entrante excepto las reglas añadidas explícitamente.
3. **Añadir reglas explícitas**: Abrir solo los puertos que realmente necesitan n8n y su proxy inverso.
4. **Vincular al servidor**: Asociar el firewall a la instancia en ejecución antes de exponerla públicamente.

Sources: [Creating a Firewall - Hetzner Docs](<https://docs.hetzner.com/cloud/firewalls/getting-started/creating-a-firewall/>), [How to Create Firewalls | DigitalOcean Documentation](<https://docs.digitalocean.com/products/networking/firewalls/how-to/create/>)

Decidir cuándo pasar de una única instancia al modo de cola de n8n es una decisión de arquitectura, no solo de dimensionamiento de servidor. La formación n8n Advanced / Developer Training de n8n Balloon Challenges cubre arquitectura, gestión de errores y configuración de producción sobre las propias herramientas e instancia del equipo, y puede ayudar a un equipo a tomar esa decisión con confianza. Se abre en la página Para empresas de este sitio.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

## Lo que la documentación oficial no cubre: instalar n8n en sí

Ni la documentación oficial de Hetzner ni la de DigitalOcean, tal como se han aportado para esta comparación, cubren la instalación de n8n en sí: no aparecen pasos específicos del proveedor para Docker, configuración de base de datos o TLS con proxy inverso en la documentación de ninguno de los dos proveedores. Esa carencia merece planificarse, porque un VPS básico de cualquiera de los dos proveedores es solo cómputo, almacenamiento y red, no una instancia de n8n en funcionamiento.

Sea cual sea el proveedor que elija un equipo, seguirá necesitando seguir la propia guía de instalación de autoalojamiento de n8n por separado de la documentación del proveedor del VPS. Para quienes quieran practicar la parte de construcción de flujos de trabajo de n8n antes de decidir sobre el servidor, los ejercicios prácticos de n8n Balloon Challenges pueden completarse usando [n8n Cloud o una instancia de n8n autoalojada](<https://n8n-challenges.app/es/challenges/idealista-morning-brief>), de modo que el mismo reto funciona sin importar qué camino de alojamiento elija finalmente un equipo.

## Dimensionar el servidor: lo que dice la propia guía de escalado de n8n

![Una única caja de servidor creciendo junto a un grupo de cajas worker que muestran dos formas de escalar n8n.](/blog/es/article-8ab3094d-f740-4fae-811c-bcd7858d04d0/175e10218b7360de2bc3c7177c1491a169a02d50e0c18e744f7878f34583db1e.png)

Una ilustración conceptual de redimensionar un servidor frente a añadir procesos worker en modo de cola.

En lugar de comprar una máquina única cada vez más grande, la propia documentación de n8n recomienda el [modo de cola (queue mode)](<https://n8n-challenges.app/es/blog/n8n-queue-mode-con-redis-cuando-dejar-el-modo-de-instancia-unica>) como la forma de escalar n8n entre varios procesos worker, calificándolo como la configuración que ofrece la mejor escalabilidad. Esa misma documentación indica que ejecutar n8n a escala, con muchos usuarios, flujos de trabajo o ejecuciones, requiere cambiar la configuración predeterminada para obtener un buen rendimiento.

La documentación de n8n, tal como se ha aportado aquí, no ofrece umbrales concretos de CPU o RAM para una instancia de producción de un equipo pequeño más allá de esa afirmación general. Eso convierte a un Hetzner CPX22 o a un Droplet Basic de DigitalOcean de tamaño comparable en un punto de partida razonable para un puñado de flujos de trabajo, con el modo de cola como el siguiente paso documentado a medida que crece el volumen de ejecuciones, en lugar de un servidor único más grande.

Sources: [Scaling | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling>)

## Elegir entre Hetzner y DigitalOcean para la instancia de n8n de un equipo

![Un portapapeles con etiquetas que se van marcando, representando la lista de comprobación de un equipo para elegir proveedor de alojamiento.](/blog/es/article-8ab3094d-f740-4fae-811c-bcd7858d04d0/b123fba0f650cf77b3e229c8d8c5952163ca5de96793e858215970ad0931c9fc.png)

Una lista de comprobación ilustrativa para que un equipo finalice su elección de proveedor y servidor.

Tras sopesar Hetzner vs DigitalOcean en especificaciones, precios y esfuerzo de configuración, ambos proveedores quedan lo bastante cerca como para que la decisión suela depender de cómo prefiere un equipo gestionar su infraestructura más que de un ganador claro en precio. Jonas, cofundador de Sliplane, lo expresó claramente en su propia comparación de proveedores de cloud para autoalojar n8n:

> “Si prefieres tener control total y no te importa hacer el trabajo, Hetzner y DigitalOcean son buenas opciones.”
>
> — Jonas, Co-Founder at Sliplane, as stated on the page (traducido)
>
> Original: “If you prefer full control and don't mind doing the work, Hetzner and DigitalOcean are good choices.” — Fuente: [What Cloud Provider Should You Use for Self-Hosted n8n? - DEV Community](<https://dev.to/code42cate/what-cloud-provider-should-you-use-for-self-hosted-n8n-2k8>)

Ese planteamiento coincide con lo que muestra la documentación: ambos proveedores requieren que un equipo configure su propio firewall, dimensione su propio servidor e instale n8n por separado de la propia VPS.

- [ ] Confirma el coste mensual real del nivel comparable, incluyendo el IVA, los complementos de IPv4 o copias de seguridad en Hetzner y cualquier exceso de ancho de banda en DigitalOcean
- [ ] Empieza con un nivel de CPU compartida, como la línea CPX de Hetzner o un Droplet Basic de DigitalOcean, dimensionado para un puñado de flujos de trabajo
- [ ] Planifica el paso al modo de cola de n8n cuando crezca el volumen de ejecuciones, en lugar de redimensionar indefinidamente un único servidor
- [ ] Configura un firewall con denegación por defecto en el proveedor elegido antes de exponer los endpoints de webhook de n8n
- [ ] Reserva tiempo aparte para la propia documentación de instalación de n8n, ya que la documentación de ningún proveedor cubre instalar n8n en sí

Sources: [Hetzner Price Adjustment 15 June 2026 - Hetzner Docs](<https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/>), [Droplet Pricing | DigitalOcean Documentation](<https://docs.digitalocean.com/products/droplets/details/pricing/>), [Scaling | Deploy | n8n Docs](<https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling>)

Una vez elegidos el proveedor y el tamaño del servidor, el paso siguiente más seguro es revisar la instancia real en lugar de adivinar. El Workflow Audit de n8n Balloon Challenges revisa la instancia y los flujos de trabajo de n8n de un equipo en cuanto a fiabilidad, seguridad y mantenibilidad, sobre la configuración propia del equipo. Se abre en la página Para empresas de este sitio.

**[Revisa la configuración de n8n de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: Autoalojamiento, Preparación para producción, n8n, Comparativa
