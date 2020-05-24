import json
import time
from requests import get, post


class FormRecognizer():
    __path = r"/formrecognizer/v2.0-preview/custom/models"
    #Constructor 
    def __init__(self, **config):
        self.subs_key = config["key"]
        self.endpoint = config["endpoint"]
        self.source = config["source"]
        self.prefix = config["prefix"]
        self.includeSubFolders = config["includeSubFolders"]
        self.useLabelFile = config["useLabelFile"]

    #Método para obtener los headers
    def __get_headers(self):
        return {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': self.subs_key,
        }
    #Método para obtener body
    def __get_body(self):
        return {
            "source": self.source,
            "sourceFilter": {
                "prefix": self.prefix,
                "includeSubFolders": self.includeSubFolders
            },
            "useLabelFile": self.useLabelFile
        }
            
    #Método para obtener la URL  
    def __get_url(self, post_url, body, headers):
        url = None

        try:
            resp = post(url=post_url, json=body, headers=headers)
            if resp.status_code != 201:
                print("Modelo POST fallido (%s):\n%s" %
                      (resp.status_code, json.dumps(resp.json())))
                quit()
            print("Modelo POST exitoso:\n%s" % resp.headers)
            url = resp.headers["location"]
        except Exception as e:
            print("Modelo POST fallido:\n%s" % str(e))
            quit()

        return url

    #Método para obtener los resultados
    def __obtener_resultados(self, get_url, headers):
        numero_intentos = 15
        numero_try = 0
        segundos_espera = 5
        maximo_seg_espera = 60

        while numero_try < numero_intentos:
            try:
                resp = get(url=get_url, headers=headers)
                resp_json = resp.json()

                if resp.status_code != 200:
                    print("Modelo GET fallido (%s):\n%s" %
                          (resp.status_code, json.dumps(resp_json)))
                    quit()

                model_status = resp_json["modelInfo"]["status"]

                if model_status == "ready":
                    print("Entrenamiento Exitoso:\n%s" % json.dumps(resp_json))
                    quit()
                if model_status == "invalid":
                    print("Entrenamiento fallido. El modelo es inválido:\n%s" %
                          json.dumps(resp_json))
                    quit()

                #El entrenamiento sigue corriendo. Espera y vuelve a intentarlo
                time.sleep(segundos_espera)
                numero_try += 1
                segundos_espera = min(2*segundos_espera, maximo_seg_espera)
            except Exception as e:
                msg = "Modelo GET fallido:\n%s" % str(e)
                print(msg)
                quit()
        print("La operación de entranimiento no se completó en el tiempo establecido.")
     
    #Método general
    def entrenar_modelo(self):
        headers = self.__get_headers()
        body = self.__get_body()

        post_url = self.endpoint + self.__path
        get_url = self.__get_url(post_url, body, headers)

        self.__obtener_resultados(get_url, headers)

# Declaración de variables para el constructor
_key='<Suscription Key del servicio de Form Recognizer>'
_endpoint=r"<EndPoint del servicio de Form Recognizer>"  
_source=r"URL del contendedor en Azure" 
_prefix=""
_subfolders=False
_labelFile=False


form_recognizer = FormRecognizer(key=_key, endpoint=_endpoint, source=_source, prefix=_prefix, includeSubFolders=_subfolders, useLabelFile=_labelFile)
#Llamada al método general
form_recognizer.entrenar_modelo()