import json
import time
from requests import get, post

##Clase 1
class Principal ():
      def __init__(self, endpoint , apim_key, model_id  ,source): ##PARAMETROS QUE SOLICITAMOS
        self.endpoint=endpoint
        self.apim_key=apim_key
        self.model_id =model_id 
        self.source=source
        post_url = endpoint + "/formrecognizer/v2.0-preview/custom/models/%s/analyze"  % model_id
        params = {
        "includeTextDetails": True
        }
        headers = {
            # Request headers
            #'image/png'
            #'application/pdf'
            #'Content-Type': 'image/png' ,
            'Content-Type': 'application/pdf' , #Se agrega el tipo de archivo a analizar
            'Ocp-Apim-Subscription-Key': apim_key,
        }
        with open(source, "rb") as f:
            data_bytes = f.read()
        try:
            resp = post(url = post_url, data = data_bytes, headers = headers, params = params)
            if resp.status_code != 202:
                print("POST analyze failed:\n%s" % json.dumps(resp.json()))
                quit()
            print("POST analyze succeeded:\n%s" % resp.headers)
            get_url = resp.headers["operation-location"]
        except Exception as e:
            print("POST analyze failed:\n%s" % str(e))
            quit()

        ##LLAMADA A OTRA CLASE
        return Resultado.__init__(self, get_url,headers,apim_key)
    
##Clase 2
class Resultado ():
    def __init__(self, get_url,headers,apim_key):
        self.get_url=get_url
        self.headers=headers
        
        n_tries = 15
        n_try = 0
        wait_sec = 5
        max_wait_sec = 60
        while n_try < n_tries:
            try:
                resp = get(url = get_url, headers = {"Ocp-Apim-Subscription-Key": apim_key})
                resp_json = resp.json()
                if resp.status_code != 200:
                    print("GET analyze results failed:\n%s" % json.dumps(resp_json))
                    quit()
                status = resp_json["status"]
                if status == "succeeded":
                    print("Analysis succeeded:\n%s" % json.dumps(resp_json))
                    quit()
                if status == "failed":
                    print("Analysis failed:\n%s" % json.dumps(resp_json))
                    quit()
                # Analysis still running. Wait and retry.
                time.sleep(wait_sec)
                n_try += 1
                wait_sec = min(2*wait_sec, max_wait_sec)     
            except Exception as e:
                msg = "GET analyze results failed:\n%s" % str(e)
                print(msg)
                quit()
        print("Analyze operation did not complete within the allocated time.")
        

##INGRESARMOS LOS PARAMETROS DE LA FUNION __INIT__
analizar=Principal(r"<EndPoint del servicio de Form Recognizer >",
                   "<Clave del servicio de Form Recognizer>","<modeID obtenido del entrenamiento>",
                   r"<ruta de la factura a analizar>")

##IMPRIMIR CLASE
print(analizar)


        
        
