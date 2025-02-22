from appwrite.client import Client
from appwrite.services.databases import Databases
import json

def main(context):
    # Initialize Appwrite client
    client = Client()
    client.set_endpoint('https://cloud.appwrite.io/v1')  # Replace with your Appwrite endpoint
    client.set_project('67609b010021900fc6e6')  # Replace with your project ID
    
    # Initialize Appwrite Databases service
    databases = Databases(client)
    parameters = context.req.body_json

    # Get parameters from the request
    action = parameters['action']
    my_database_id = '6760b9c20030df251f1c'
    my_collection_id = 'badgerBucks'
    user_id = parameters['userId']  # userId is used as the document_id
    data = parameters['badgerBucks']  # Data is for 'create' or 'update'
    if action == "create":
        created_document = databases.create_document(database_id=my_database_id,collection_id=my_collection_id,document_id=user_id,data=data,read=['*'],write=['*'])
        return context.res.json({"success": True, "document": created_document})

    elif action == "update":
        updated_document = databases.update_document(database_id=my_database_id,collection_id=my_collection_id,document_id=user_id,data=data)
        return context.res.json({"success": True, "document": updated_document})

    elif action == "get":
        document = databases.get_document(database_id=my_database_id,collection_id=my_collection_id,document_id=user_id)
        # Directly access `badgerBucks` in the document
        badger_bucks = document.get('badgerBucks', None)
        if badger_bucks is not None:
            return context.res.json({"success": True, "badgerBucks": badger_bucks})
        else:
            return context.res.json({"success": False, "message": "'badgerBucks' not found in document"})
