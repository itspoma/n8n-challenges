---
{
  "id": "opp_e6dcc3ca-bc54-4052-b7d2-5da5b2d1ecef",
  "locale": "es",
  "slug": "article-e6dcc3ca-bc54-4052-b7d2-5da5b2d1ecef",
  "urlSlug": "n8n-community-nodes-npm-crea-y-publica-un-nodo-personalizado",
  "publishedAt": "2026-10-02T15:19:24.882Z",
  "title": "n8n Community Nodes npm: Crea y Publica un Nodo Personalizado",
  "subtitle": "Guía práctica para crear community nodes de n8n para npm: reglas de nombres, estilo, pruebas, versionado y publicación.",
  "description": "Guía práctica para crear community nodes de n8n para npm: reglas de nombres, estilo, pruebas, versionado y publicación.",
  "date": "2026-10-02",
  "sourcesCheckedAt": "2026-10-02T14:48:01.478Z",
  "tags": [
    "n8n",
    "Integración de APIs",
    "Community nodes",
    "Guía extensa"
  ],
  "coverImage": "/blog/es/article-e6dcc3ca-bc54-4052-b7d2-5da5b2d1ecef/01075396bd3ec54053147301329198928a614914246bbbc1da9ea1dc93c9cc12.png",
  "coverAlt": "Una pieza conectora hecha a mano siendo envuelta y embalada para representar el empaquetado de community nodes de n8n para npm.",
  "seo": {
    "title": "n8n Community Nodes npm: Crea y Publica un Nodo Personalizado",
    "description": "Guía práctica para crear community nodes de n8n para npm: reglas de nombres, estilo, pruebas, versionado y publicación.",
    "keywords": []
  },
  "revision": "71e187f75689061e540df0b1ef9444e76f7321e821fe19fef809f1e429586727"
}
---

**Contenido**

- [Lo que se necesita para pasar de una idea de nodo a un paquete publicado en npm](#cf-section-1)
- [Fundamentos: qué convierte a un paquete en un community node de n8n](#cf-section-2)
  - [Nomenclatura, package.json y estándares requeridos](#cf-section-3)
- [Elegir un estilo de nodo declarativo o programático](#cf-section-4)
- [Compilación y pruebas de tu nodo](#cf-section-5)
  - [Generar la estructura y desarrollar con la CLI n8n-node](#cf-section-6)
  - [Estándares de código, linting y el ciclo local de desarrollo](#cf-section-7)
- [Versionar tu nodo para actualizaciones seguras](#cf-section-8)
- [Publicar community nodes de n8n en npm](#cf-section-9)
  - [GitHub Actions, procedencia y publicadores de confianza](#cf-section-10)
  - [Requisitos de la cuenta de npm: 2FA y paquetes con scope](#cf-section-11)
- [Enviar para verificación de n8n (opcional)](#cf-section-12)
  - [Requisitos de verificación y pautas técnicas](#cf-section-13)
  - [Solución de problemas: retrasos en la revisión y errores del escáner](#cf-section-14)
- [Seguridad, riesgo y mantenimiento continuo](#cf-section-15)
- [Conclusión: una lista de verificación práctica](#cf-section-16)

<a id="cf-section-1"></a>

## Lo que se necesita para pasar de una idea de nodo a un paquete publicado en npm

Convertir un nodo funcional en uno de los community nodes de n8n en npm tiene menos que ver con escribir código ingenioso y más con seguir una secuencia de convenciones que tanto n8n como npm verifican. Necesitas un paquete que siga las reglas de nomenclatura y estructura de n8n, una decisión sobre si el nodo debe ser declarativo o programático, un ciclo local de compilación y linting que detecte problemas antes de que alguien instale tu paquete, un hábito deliberado de versionado y, por último, una cuenta de npm configurada como npm ahora exige. La verificación opcional de n8n añade su propio paso de revisión por encima de todo esto.

Ninguno de estos pasos es difícil por sí solo, pero saltarse uno suele manifestarse más tarde como un envío rechazado, una actualización que rompe el workflow de otra persona o un comando de publicación que falla por una configuración de cuenta que no sabías que existía. El resto de esta guía recorre cada etapa en el orden en que probablemente te las encontrarás, empezando por lo que oficialmente convierte a un paquete en un community node.

![De la idea de nodo al paquete publicado: 1. Generar la estructura del paquete; 2. Elige un estilo; 3. Compila y verifica localmente; 4. Versiona con intención; 5. Publica en npm; 6. Envíalo opcionalmente para verificación](/blog/es/article-e6dcc3ca-bc54-4052-b7d2-5da5b2d1ecef/42eb815058a3665c4d42c21af1c412d607019c15cf3694bfd05fb125367792e7.png)

Sources: [Using the n8n-node tool | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/build-your-node/using-the-n8n-node-tool>), [GitHub - n8n-io/n8n-nodes-starter: Example starter module for custom n8n nodes. · GitHub](<https://github.com/n8n-io/n8n-nodes-starter>)

<a id="cf-section-2"></a>

## Fundamentos: qué convierte a un paquete en un community node de n8n

Un paquete npm cualquiera no cuenta automáticamente como community node. La propia documentación de n8n indica que el nombre de un paquete de community node debe empezar con n8n-nodes- (o el equivalente con scope) y debe incluir la palabra clave n8n-community-node-package en los metadatos del paquete, para que las herramientas de n8n puedan descubrirlo entre los demás community nodes en npm (F1).

Esa misma documentación se reserva el derecho de rechazar community nodes que compitan con las funciones de pago o empresariales propias de n8n, lo que marca un límite sobre lo que un paquete comunitario debe añadir y no reemplazar (F4). En nuestra opinión, tratar esta convención de nombres y metadatos como un primer paso y no como una ocurrencia tardía merece los cinco minutos que lleva, porque corregir un paquete mal nombrado después de que la gente ya lo haya instalado es mucho más complicado que hacerlo bien desde la primera publicación.

Sources: [Building community nodes | Nodes | n8n Docs](<https://docs.n8n.io/integrations/community-nodes/building-community-nodes>), [Submit community nodes | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/deploy-your-node/submit-community-nodes>)

<a id="cf-section-3"></a>

### Nomenclatura, package.json y estándares requeridos

En la práctica, esto significa que tu package.json necesita el prefijo n8n-nodes- en su campo name y la palabra clave community-node incluida entre sus keywords, tal como describe la documentación de n8n (F1). Un tutorial escrito por la comunidad en Medium, publicado en octubre de 2025, reitera de forma independiente la misma regla de nomenclatura, lo que corrobora la guía oficial en lugar de añadir detalles nuevos (F40).

Ese mismo tutorial también deja clara la unidad básica: cada nodo de n8n que publicas vive en su propio paquete npm, en lugar de agrupar varios nodos sueltos en una biblioteca de propósito general, según la guía de Medium de octubre de 2025 escrita por Omar Walied (F38). Más allá del nombre y la palabra clave, el paquete necesita los metadatos habituales de npm —una descripción, un enlace al repositorio y un campo de licencia—, que más adelante vuelven a ser relevantes si buscas la revisión de verificación opcional de n8n.

Sources: [Building community nodes | Nodes | n8n Docs](<https://docs.n8n.io/integrations/community-nodes/building-community-nodes>), [How to Create and Publish a Custom n8n Community Node | by Omar Walied | Medium](<https://medium.com/@omarwaliedismail/how-to-create-and-publish-a-custom-n8n-community-node-1fb4f32658c2>)

<a id="cf-section-4"></a>

## Elegir un estilo de nodo declarativo o programático

Según la documentación de n8n, todo nodo necesita un archivo base con un objeto description que define el nodo dentro de la clase del nodo (F13). A partir de ahí, eliges entre dos estilos. Un nodo de estilo programático necesita un método execute() que lea los datos entrantes y los parámetros antes de construir una solicitud, lo que te da control total sobre la solicitud y los datos que devuelve (F14).

La documentación de n8n también da dos reglas concretas para elegir entre los dos estilos: construye todos los nodos de tipo trigger en estilo programático, incluso cuando el nodo de acción complementario para el mismo servicio sea declarativo, y cuando no estés seguro de qué estilo necesita un nodo, opta por el declarativo por defecto (F15, F16). Respaldamos esa opción por defecto: empezar en modo declarativo y recurrir al programático solo cuando un trigger, una API que no es REST o una transformación de datos más pesada lo exijan mantiene la primera versión de un nodo más sencilla de revisar, probar y mantener.

**Estilos de nodo declarativo frente a programático, según la documentación de n8n**

| Estilo | Cuándo lo recomienda la documentación de n8n | Compatibilidad con versionado |
| --- | --- | --- |
| Declarativo | Opción por defecto cuando hay dudas; adecuado para la mayoría de servicios de estilo REST (F16) | Solo versionado ligero: los nodos declarativos no pueden usar versionado completo (F25) |
| Programático | Obligatorio para nodos trigger y lógica no REST o con transformaciones pesadas (F14, F15) | No está limitado al versionado ligero según la documentación de n8n; el versionado ligero está disponible para todos los tipos de nodo sea cual sea el estilo (F26) |

Sources: [Structure | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/build-your-node/reference/base-files/structure>), [Choose a node building style | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/plan-your-node/choose-a-node-building-style>), [Versioning | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/build-your-node/reference/versioning>)

<a id="cf-section-5"></a>

## Compilación y pruebas de tu nodo

![Tres estaciones de trabajo que muestran la idea de un nodo pasando del boceto al código y a la inspección durante las pruebas locales.](/blog/es/article-e6dcc3ca-bc54-4052-b7d2-5da5b2d1ecef/35ae021a4a3f6afe6d9eb2c8fc15f62ba860cdeb471287937843a4d92936fff1.png)

Generar la estructura, compilar y probar un nodo localmente ocurre como un ciclo repetido, no como un solo paso.

Una vez que sabes qué estilo vas a construir, el trabajo diario ocurre en un ciclo local de compilar-probar-corregir, usando las herramientas que n8n distribuye específicamente para esta tarea en lugar de scripts improvisados.

<a id="cf-section-6"></a>

### Generar la estructura y desarrollar con la CLI n8n-node

n8n describe n8n-node como la CLI oficial para desarrollar community nodes, usada para generar la estructura, compilar, verificar y publicar un paquete, y el paquete oficial @n8n/node-cli en npm se describe a sí mismo de la misma forma (F5, F10). El repositorio de inicio que se distribuye junto a ella enumera Node.js v22 o superior y npm como requisitos previos antes de empezar (F9).

Cuando un nodo no aparece dentro de n8n después de haberlo compilado, la propia sección de resolución de problemas del README de n8n-nodes-starter sugiere comprobar que realmente ejecutaste npm install para traer las dependencias (F8). Si en cambio el servidor de desarrollo local se comporta de forma extraña, la sección de resolución de problemas del README de @n8n/node-cli sugiere limpiar la caché de nodos personalizados de n8n, lo que resuelve una sorprendente proporción de fallos que solo ocurren en local (F12).

Sources: [Using the n8n-node tool | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/build-your-node/using-the-n8n-node-tool>), [GitHub - n8n-io/n8n-nodes-starter: Example starter module for custom n8n nodes. · GitHub](<https://github.com/n8n-io/n8n-nodes-starter>), [@n8n/node-cli - npm](<https://www.npmjs.com/package/@n8n/node-cli?activeTab=readme>)

<a id="cf-section-7"></a>

### Estándares de código, linting y el ciclo local de desarrollo

La documentación de estándares de código de n8n indica a los desarrolladores que nunca modifiquen los datos entrantes que recibe un nodo, ya que varios nodos pueden compartir esos mismos datos en memoria (F17). También indica a los autores de nodos que usen el módulo auxiliar de solicitudes HTTP integrado en n8n en lugar de incorporar una biblioteca de terceros para la misma tarea (F18).

Antes de publicar nada, la documentación indica que debes asegurarte de que tu nodo pasa las comprobaciones del linter (F19). La documentación del linter de nodos de n8n describe su plugin de ESLint como una herramienta que detecta problemas y corrige automáticamente muchos de ellos para ayudar a los autores a seguir buenas prácticas, e indica a los autores que ejecuten el comando de lint para ver los problemas detectados en la consola (F31, F32).

- [ ] Ejecuta el comando de lint y corrige lo que el plugin de ESLint señale o corrija automáticamente
- [ ] Confirma que el nodo nunca modifica los datos entrantes compartidos con otros nodos
- [ ] Usa el módulo auxiliar de solicitudes HTTP integrado en n8n en lugar de una biblioteca de terceros
- [ ] Vuelve a ejecutar el linter una vez más justo antes de publicar

Sources: [Code standards | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/build-your-node/reference/code-standards>), [Node linter | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/test-your-node/node-linter>)

<a id="cf-section-8"></a>

## Versionar tu nodo para actualizaciones seguras

La propia documentación de npm recomienda que los autores de paquetes empiecen a versionar en 1.0.0 e incrementen a partir de ahí siguiendo las reglas del versionado semántico (F29). Recomienda encarecidamente incrementar el número de versión mayor específicamente cuando un cambio rompe a los dependientes de un paquete (F30), lo que, en el caso de un community node, significa cualquier persona cuyo workflow guardado dependa del comportamiento anterior.

El número de versión es la única señal que ven los usuarios finales antes de que llegue una actualización, así que tratarlo con descuido arriesga romper los workflows de otras personas sin previo aviso. Una versión de parche solo debería corregir un error, una versión menor solo debería añadir comportamiento compatible con versiones anteriores, y una versión mayor es el único lugar honesto para cualquier cosa que pueda cambiar lo que hace un workflow existente.

1. Parche (x.x.1): correcciones de errores que no cambian el comportamiento del nodo para los usuarios existentes
2. Menor (x.1.x): nuevas funciones o parámetros compatibles con versiones anteriores
3. Mayor (1.x.x): cambios que podrían romper un workflow existente construido sobre el nodo

Sources: [About semantic versioning | npm Docs](<https://docs.npmjs.com/about-semantic-versioning/>)

Construir un community node fiable implica a la vez convenciones de nomenclatura, estándares de código, linting y versionado — exactamente el tipo de carencia práctica que aparece en todo un equipo de ingeniería, no solo en un desarrollador. El programa Advanced / Developer Training de n8n Balloon Challenges trabaja este nivel de desarrollo en n8n con un equipo sobre sus propias herramientas y su propio código, lo que consideramos el formato más útil para construir esta habilidad en equipo, en lugar de dejarla en manos de una sola persona que publicó un nodo por su cuenta. Esto abre la página Para empresas de nuestro sitio, donde puedes contactar sobre el programa.

**[Consulta sobre formación en n8n](https://n8n-challenges.app/es/companies)**

<a id="cf-section-9"></a>

## Publicar community nodes de n8n en npm

Una vez que tu nodo pasa las pruebas en local, publicar community nodes de n8n en npm consiste sobre todo en ejecutar un comando. La documentación de n8n indica que el comando release de la CLI n8n-node publica el paquete del community node en npm, y el README de @n8n/node-cli describe ese mismo comando como el que gestiona todo el proceso de publicación usando la herramienta release-it antes de que se ejecute el paso de publicación (F6, F11).

Sources: [Using the n8n-node tool | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/build-your-node/using-the-n8n-node-tool>), [@n8n/node-cli - npm](<https://www.npmjs.com/package/@n8n/node-cli?activeTab=readme>)

<a id="cf-section-10"></a>

### GitHub Actions, procedencia y publicadores de confianza

El propio repositorio de inicio de n8n indica que el workflow de GitHub Actions que incluye gestiona la publicación en npm automáticamente con cada envío de una etiqueta de versión, lo que elimina la tentación de ejecutar una publicación manual desde un portátil (F7). Esto importa más de lo que parece: la documentación de n8n indica que, a partir del 1 de mayo de 2026, los nodos enviados para la verificación del Creator Portal deberán publicarse usando GitHub Actions con una declaración de procedencia (F2).

Una segunda página, casi idéntica, en docs.n8n.io reitera que n8n no aceptará nodos verificados publicados directamente desde la máquina local de un desarrollador, lo que corrobora la misma regla en lugar de confirmarla de forma independiente (F3). Si la verificación está siquiera en tu hoja de ruta, configurar ese workflow de GitHub Actions antes de tu primera publicación te ahorra tener que reconfigurar tu proceso de publicación más adelante.

Sources: [GitHub - n8n-io/n8n-nodes-starter: Example starter module for custom n8n nodes. · GitHub](<https://github.com/n8n-io/n8n-nodes-starter>), [Building community nodes | Nodes | n8n Docs](<https://docs.n8n.io/integrations/community-nodes/building-community-nodes>), [Submit community nodes | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/deploy-your-node/submit-community-nodes>)

<a id="cf-section-11"></a>

### Requisitos de la cuenta de npm: 2FA y paquetes con scope

Si el nombre de tu paquete tiene scope, la documentación de npm indica que los paquetes con scope se publican con visibilidad privada por defecto, así que necesitas el indicador de acceso público para que cualquiera pueda instalarlo (F33, F34). Por separado, la documentación de npm indica que ahora todos los paquetes requieren autenticación de dos factores, o un token de acceso granular con bypass-2FA habilitado, para poder crear y publicar paquetes (F35).

- [ ] Si el paquete tiene scope, publícalo con el indicador de acceso público
- [ ] Activa la autenticación de dos factores en la cuenta de npm, o usa un token de acceso granular con bypass-2FA
- [ ] Confirma que el workflow de publicación de GitHub Actions está configurado antes de confiar en publicaciones automatizadas

Sources: [Creating and publishing scoped public packages | npm Docs](<https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/>), [Requiring 2FA for package publishing and settings modification | npm Docs](<https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/>)

<a id="cf-section-12"></a>

## Enviar para verificación de n8n (opcional)

![Una mano marcando elementos en una lista sobre una tabla sujetapapeles junto a un sobre sellado, representando el envío de un nodo para revisión.](/blog/es/article-e6dcc3ca-bc54-4052-b7d2-5da5b2d1ecef/7d50046b12fada3229f12caa0990182461a135a493233babde76d1e4c369a919.png)

La verificación opcional añade su propia lista de comprobación y su propio periodo de espera sobre un paquete npm ya publicado.

Publicar en npm hace que tu nodo sea instalable; no lo hace verificado. La verificación es un paso aparte y opcional a través del Creator Portal de n8n, y viene con su propia lista de requisitos técnicos y su propio calendario de revisión, a veces impredecible.

<a id="cf-section-13"></a>

### Requisitos de verificación y pautas técnicas

Las pautas de verificación de n8n indican que cada paquete de community node enviado debe integrar exactamente un servicio de terceros, en lugar de agrupar varias integraciones en un solo paquete (F20). Las mismas pautas exigen que un paquete destinado a la verificación no incluya dependencias de tiempo de ejecución externas y que su licencia sea MIT (F21, F22).

- [ ] Limita el paquete a exactamente un servicio de terceros
- [ ] Elimina las dependencias de tiempo de ejecución externas del paquete
- [ ] Licencia el paquete bajo MIT
- [ ] Publica a través de GitHub Actions con una declaración de procedencia, obligatorio a partir del 1 de mayo de 2026

Sources: [Verification guidelines | Connect | n8n Docs](<https://docs.n8n.io/connect/create-nodes/build-your-node/reference/verification-guidelines>), [Building community nodes | Nodes | n8n Docs](<https://docs.n8n.io/integrations/community-nodes/building-community-nodes>)

<a id="cf-section-14"></a>

### Solución de problemas: retrasos en la revisión y errores del escáner

Ninguna fuente de la investigación para esta guía ofrece un plazo oficial, promedio declarado o garantizado para la revisión del Creator Portal, así que trata lo siguiente solo como informes dispersos de la comunidad y no como una promesa de nivel de servicio. Un usuario identificado como ondics informó en una publicación del foro comunitario de n8n de julio de 2026 que la actualización de su nodo permanecía en estado "Update Changes Required" con una página de comentarios vacía (F43); otra respuesta del foro de julio de 2026 sugirió que una causa habitual es que la nueva versión no se publicó en npm antes de enviar la actualización al portal (F44).

**Experiencias de revisión del Creator Portal reportadas por la comunidad**

| Cuándo se informó | Qué describía el informe |
| --- | --- |
| Julio de 2026 | El estado de la actualización de un nodo mostraba "Update Changes Required" sin comentarios visibles durante varios días |
| Diciembre de 2025 | El envío de un nuevo nodo permaneció "Under Review" durante varias semanas |
| Julio de 2026 | El Creator Portal rechazó un paquete que la herramienta de escaneo pública vigente aprobaba |
| Agosto de 2026 | La revisión de un nuevo nodo permaneció pendiente durante 11 días sin comentarios |

Por otro lado, un usuario informó en una publicación del foro de diciembre de 2025 que el envío de un nuevo nodo seguía mostrando "Under Review" después de varias semanas, y otro usuario informó en una publicación de agosto de 2026 que una revisión seguía pendiente después de 11 días sin comentarios (F45, F48). Un desarrollador llamado atacan también informó en una publicación de julio de 2026 que el Creator Portal rechazó su paquete mientras que la herramienta de escaneo disponible en ese momento lo aprobaba, y una respuesta de la comunidad sugirió pedir a n8n que actualizara el proceso de verificación, limpiara la caché y volviera a ejecutar el envío (F46, F47).

Trataríamos esto como motivo de precaución y no de alarma: son informes aislados y no verificados ligados a paquetes concretos, no un patrón documentado. Nuestra conclusión práctica es mantener bien sincronizados la versión de tu paquete npm, los metadatos de tu repositorio de GitHub y tu envío al Creator Portal antes de enviarlo, ya que un desajuste entre ellos aparece en más de uno de estos informes como el probable desencadenante del retraso.

Sources: [Creators portal: Node still in review. Why? - Questions - n8n Community](<https://community.n8n.io/t/creators-portal-node-still-in-review-why/302391>), [I submitted a node, but it still shows “Under Review” after several weeks - Questions - n8n Community](<https://community.n8n.io/t/i-submitted-a-node-but-it-still-shows-under-review-after-several-weeks/240659?tl=en>), [Creator Portal False Rejection for n8n-nodes-speechall - Questions - n8n Community](<https://community.n8n.io/t/creator-portal-false-rejection-for-n8n-nodes-speechall/303760>), [Creators Portal: Node Review taking too long! - Questions - n8n Community](<https://community.n8n.io/t/creators-portal-node-review-dauer-zu-lange/308719>)

<a id="cf-section-15"></a>

## Seguridad, riesgo y mantenimiento continuo

Publicar un nodo es solo la mitad de la relación: una vez que alguien lo instala, la documentación de n8n indica que [los community nodes tienen acceso completo a la máquina en la que se ejecuta n8n](<https://n8n-challenges.app/es/blog/lista-de-seguridad-de-n8n-para-una-instancia-compartida-y-autoalojada>) y pueden realizar cualquier acción, incluidas las maliciosas, y que cualquier community node instalado tiene acceso a los datos que fluyen por los workflows de ese usuario (F23, F24). Es una limitación que merece decirse claramente una vez: publicar de forma responsable significa que el código que distribuyes conlleva confianza real, no solo funcionalidad.

**Riesgos que la documentación de n8n señala para cualquier community node instalado**

| Tipo de riesgo | Qué indica la documentación de n8n |
| --- | --- |
| Seguridad del sistema | Un community node instalado tiene acceso completo a la máquina que ejecuta n8n y puede realizar cualquier acción, incluidas las maliciosas |
| Seguridad de los datos | Cualquier community node instalado tiene acceso a los datos que fluyen por los workflows de ese usuario |

El desarrollador independiente Carlos Aragón ilustra el lado de la demanda en su propia entrada de blog de marzo de 2026, donde describe cómo creó el community node n8n-nodes-hyros porque estaba repitiendo el mismo patrón de HTTP puro en más de 20 workflows de clientes y quería que otros usuarios de Hyros con n8n no tuvieran que empezar desde cero (F36). [Según esa misma entrada de blog de marzo de 2026, su paquete había alcanzado 4.525 instalaciones en npm](<https://www.carlosaragon.online/blog/n8n-nodes-hyros>) en ese momento, una cifra autodeclarada en el propio blog comercial del autor y no un recuento auditado de forma independiente. Su entrada también documenta cómo se instalan en la práctica los community nodes de n8n en un workflow: el usuario va a Settings y luego a Community Nodes dentro de su propia instancia de n8n (F37).

De cara al futuro, la documentación de n8n para la versión 3.0 planeada, que su changelog describe como prevista para octubre de 2026, indica que n8n autoalojado requerirá un despliegue basado en Docker y dejará de admitir instalaciones por npm y npx, y que el valor por defecto de la configuración unverified-community-packages pasará de activado a desactivado en esa versión (F27, F28). Cambiar las instalaciones no verificadas a un modelo de activación voluntaria por defecto podría empujar a más autores de nodos hacia el camino de verificación que describe esta guía, pero los equipos que ejecutan n8n autoalojado deberían planificar su despliegue y proceso de actualización en torno al requisito de Docker bastante antes de que se publique.

Sources: [Risks | Nodes | n8n Docs](<https://docs.n8n.io/integrations/community-nodes/risks>), [I Built an n8n Node for Hyros — 4,525 Installs and Counting | Carlos Aragon](<https://www.carlosaragon.online/blog/n8n-nodes-hyros>), [v3.0 Breaking changes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/v30-breaking-changes>)

<a id="cf-section-16"></a>

## Conclusión: una lista de verificación práctica

Pasar de una idea de nodo funcional a un paquete mantenido en npm es una secuencia de pequeñas decisiones comprobables más que un único problema difícil: nombra y genera la estructura del paquete correctamente, elige el estilo adecuado, compílalo y verifícalo hasta que se comporte bien, versiónalo teniendo en cuenta los workflows guardados de tus usuarios, publícalo a través de una cuenta que cumpla los requisitos actuales de npm, y decide deliberadamente si la verificación opcional de n8n merece el proceso de revisión para tu caso de uso.

La siguiente lista reúne los pasos concretos y respaldados por fuentes que cubrió esta guía, en el orden en que probablemente los usarás.

- [ ] Nombra el paquete con el prefijo n8n-nodes- y la palabra clave community-node
- [ ] Genera la estructura y compila con la CLI oficial n8n-node en lugar de copiar estructuras de carpetas
- [ ] Opta por un nodo declarativo por defecto, salvo que sea un trigger o necesite lógica no REST o transformaciones más pesadas
- [ ] Ejecuta el linter y el ciclo local de desarrollo antes de cada publicación, y nunca modifiques los datos entrantes
- [ ] Versiona con intención: parche para correcciones, menor para adiciones, mayor para cualquier cosa que pueda romper un workflow
- [ ] Publica a través de GitHub Actions en lugar de una máquina local si la verificación es un objetivo
- [ ] Confirma que el acceso público de paquetes con scope y la 2FA o un token bypass-2FA están configurados en npm
- [ ] Si lo envías para verificación, limita el paquete a un servicio, sin dependencias externas, y con licencia MIT
- [ ] Trata cualquier community node que instales, incluido el tuyo, como si tuviera acceso completo al host y a los datos del workflow

Si tu equipo ya tiene nodos personalizados o workflows en producción y no estás seguro de que superarían el tipo de escrutinio que aplican las pautas de verificación de n8n, una Auditoría de Workflows de n8n Balloon Challenges revisa tu propia instancia de n8n y tus workflows en busca de fiabilidad, seguridad y mantenibilidad. Diríamos que es la forma más directa de averiguarlo antes de que lo haga una revisión de seguridad o una caída del servicio. Esto abre la página Para empresas de nuestro sitio, donde puedes ponerte en contacto sobre una auditoría.

**[Audita los workflows de tu equipo](https://n8n-challenges.app/es/companies)**

Tags: n8n, Integración de APIs, Community nodes, Guía extensa
