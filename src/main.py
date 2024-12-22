

from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.services.account import Account
from appwrite.services.databases import Databases
from appwrite.exception import AppwriteException
import os



# This Appwrite function will be executed every time your function is triggered


def getBucks(userId):
    '''
    userId => account.get_session('current')
    '''
    # You can use the Appwrite SDK to interact with other services
    # For this example, we're using the Users service
    client = (
        Client()
        .set_endpoint("https://cloud.appwrite.io/v1")#os.environ["APPWRITE_FUNCTION_API_ENDPOINT"]
        .set_project("67609b010021900fc6e6") #os.environ["APPWRITE_FUNCTION_PROJECT_ID"]
        .set_key("standard_a766a87da91bf274575dc294722839045769920a97a36eed295705391e817cad896c81e52c5dd654b6e7b3e6ec13bd16f3d607e416a543d5813d0aab7d7eae27af014a01aa74c503196056bd82eea708c844f1dcbba43f42d81a8a1c455727e6c93536fa6de367f8b92c23961ef1e9982f40c6b9caf1b46064515391dd1de308")
    )
    users = Users(client)
    databases = Databases(client)
    account = Account(client)

    try:
        #get users id
       #passed in from function

        #find document with that name 
       doc= databases.get_document('6760b9c20030df251f1c','badgerBucks',userId)
        #read the number of badgerBucks in that document
       result = doc['badgerBucks']
        #return this
       print(result)
    except AppwriteException as err:
        print("there was an error")



getBucks('hi')

def createBucks(userId):
    '''
    userId => account.get_session('current')
    '''
    client = (
        Client()
        .set_endpoint("https://cloud.appwrite.io/v1")#os.environ["APPWRITE_FUNCTION_API_ENDPOINT"]
        .set_project("67609b010021900fc6e6") #os.environ["APPWRITE_FUNCTION_PROJECT_ID"]
        .set_key("standard_a766a87da91bf274575dc294722839045769920a97a36eed295705391e817cad896c81e52c5dd654b6e7b3e6ec13bd16f3d607e416a543d5813d0aab7d7eae27af014a01aa74c503196056bd82eea708c844f1dcbba43f42d81a8a1c455727e6c93536fa6de367f8b92c23961ef1e9982f40c6b9caf1b46064515391dd1de308")
    )
    users = Users(client)
    database = Databases(client)
    account = Account(client)
    
    database.create_document("6760b9c20030df251f1c","badgerBucks",userId,{userId,100})



def setBucks(number, userId):
    '''
    userId => account.get_session('current')
    '''
    client = (
        Client()
        .set_endpoint("https://cloud.appwrite.io/v1")#os.environ["APPWRITE_FUNCTION_API_ENDPOINT"]
        .set_project("67609b010021900fc6e6") #os.environ["APPWRITE_FUNCTION_PROJECT_ID"]
        .set_key("standard_a766a87da91bf274575dc294722839045769920a97a36eed295705391e817cad896c81e52c5dd654b6e7b3e6ec13bd16f3d607e416a543d5813d0aab7d7eae27af014a01aa74c503196056bd82eea708c844f1dcbba43f42d81a8a1c455727e6c93536fa6de367f8b92c23961ef1e9982f40c6b9caf1b46064515391dd1de308")
    )
    database = Databases(client)
    account = Account(client)
    database.update_document("6760b9c20030df251f1c","badgerBucks",userId,{userId, number})
    print("Success!")

setBucks(99)