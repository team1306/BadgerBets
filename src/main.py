from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.services.databases import Databases
from appwrite.exception import AppwriteException
import os
key = os.API_KEY
# This Appwrite function will be executed every time your function is triggered
def main(context,function, userId, amount):
    # You can use the Appwrite SDK to interact with other services
    # For this example, we're using the Users service
    client = (
        Client()
        .set_endpoint('https://cloud.appwrite.io/v1')
        .set_project('67609b010021900fc6e6')
        .set_key(key)
    )
    users = Users(client)
    databases = Databases(client)
    if(function == "get"):
        result = databases.get_document('6760b9c20030df251f1c','badgerBucks', userId)
        return res.result['badgerBucks']
    elif(function == "set"):
         databases.update_document('6760b9c20030df251f1c','badgerBucks', userId, {'username': userId, 'badgerBucks': amount})
    elif(function == "create"):
        database.creat_document('6760b9c20030df251f1c','badgerBucks',userId,{'username':userId,'badgerBucks':amount})