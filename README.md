## Invoice-Recognizer

Utilizar del aprendizaje automatizado o Machine Learning es la tendencia actual ya que ayuda a reducir gastos económicos y de tiempo debido a que las computadoras aprenden a desarrollar procesos por sí mismas mediante el aprendizaje; en este caso, trasladar información  de una factura física para digitalizarla logrando así que el proceso sea más eficiente, en una empresa privada. 

## Primer Entregable

El primer entregable consiste en realizar el entrenamiento con facturas
de diferentes proveedores y luego realizar el análisis con una factura que
no es del entrenamiento para poder validar los resultados, esto de forma 
manual. 

[![Ejemplo](/imagenes/Ejemplo_1.PNG)](imagenes/Ejemplo_1.PNG)

[![Ejemplo](/imagenes/Ejemplo_11.PNG)](imagenes/Ejemplo_11.PNG)

[![Ejemplo](/imagenes/Ejemplo2.PNG)](imagenes/Ejemplo2.PNG)

[![Ejemplo](/imagenes/Ejemplo2-2.PNG)](imagenes/Ejemplo2-2.PNG)

[![Ejemplo](/imagenes/Ejemplo3.PNG)](imagenes/Ejemplo3.PNG)

## Segundo Entregable

El segundo entregable consiste en crear una página web para poder subir las facturas que el usuario desee, al contenedor de azure, y así realizar el entrenamiento posteriormente.

[![PáginaWeb](/imagenes/SegundoEntregable.PNG)](imagenes/SegundoEntregable.PNG)

[![PáginaWeb](/imagenes/SegundoEntregable1.PNG)](imagenes/SegundoEntregable1.PNG)

[![PáginaWeb](/imagenes/SegundoEntregable2.PNG)](imagenes/SegundoEntregable2.PNG)

## Tercer Entregable

El tercer entregable consiste realizar el análisis de una factura y ver los resultados desde la página web.

[![PáginaWeb](/imagenes/Analisis1.PNG)](imagenes/Analisis1.PNG)

[![PáginaWeb](/imagenes/Resultados.PNG)](imagenes/Resultados.PNG)

### Tecnologías utilizadas

1. [Form Recognizer](https://azure.microsoft.com/es-es/services/cognitive-services/form-recognizer/)
2. [React](https://reactjs.org/)
3. [Axios](https://alligator.io/react/axios-react/)
4. [Material_UI](https://material-ui.com/getting-started/installation/)
5. [Node_JS](https://nodejs.org/es/)
6. [Multer](https://www.npmjs.com/package/multer)
7. [Express](https://www.npmjs.com/package/express)
8. [@azure/ai-form-recognizer](https://www.npmjs.com/package/@azure/ai-form-recognizer)
9. [@azure/storage-blob](https://www.npmjs.com/package/@azure/storage-blob)

# Versiones

A continuación se muestra en la Tabla I el detalle de cada etapa del proyecto y la descripción de la funcionalidad incluida.

| No. | Commit | Descripción |
| ------ | ------ | ------ |
| - |  Primer Entregable|||
| 1 |  95d9f47e14deb2e6d128094212bdd1e4056c5a1c  | Agregar códigos para entrenamiento y análisis manual|
| 2 |  a7afe8b347e5fef0ec6677f724e57d4791f3e674  | Agregar presentación del primer entregable|
| - |  Segundo Entregable||| 
| 1 |  edb6f217ab73f7d1e16376ccce3c3444a858b20f | Agregar el proyecto de React que contiene el frontend|
| 2 | 50217d77ff792b8f7f9b36a748da187dc257de2a | Agregar API en Node JS|
| 3 | c219118ec6018f063f888120bf15b8bd5ccd4811 | Agregar librería para acceder al contenedor de Azure|
| 4 | 9fc1e3d3e4b94e5eb42db8f74956e389af2d56c7 | Instalar depenencia CORS para aceptar peticiones desde la APP cliente|
| 5 |  35a918bbbd479cb4fa3c2e4fe9af42c5e2b56e05 | Agregar endpoint para obtener los blobs del contenedor|
| 6 |   2147c8053debbb238ca4011c89fcfc32154f3d7c | Agregar endpoint para subir facturas al contenedor|
| 7 |   6f31c32981e6fe888bcd6709227d0264b224f42b | Agregar la carpeta facturas y cambios en el backend|
| - |  Tercer Entregable||| 
| 1 |  d7503452e731d21a2343085943357030033ec7f8 | Crear el endpoint para anlizar las facturas|
| 2 |  3ce99d84adb8dea8e67e6f241eaea5d80e687678 | Agregar funcionalidaad al formulario de análisis de facturas|
| 3 |   1d0c7bc5ce9820e86a88281bf049c89305542712 | Mostrar los resultados en la tabla|


