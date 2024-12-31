from appwrite.client import Client
from appwrite.services.databases import Databases
import json

def main(context):
    # Initialize Appwrite client
    client = Client()
    client.set_endpoint('https://cloud.appwrite.io/v1')  # Replace with your Appwrite endpoint
    client.set_project('67609b010021900fc6e6')  # Replace with your project ID
    client.set_key('standard_a766a87da91bf274575dc294722839045769920a97a36eed295705391e817cad896c81e52c5dd654b6e7b3e6ec13bd16f3d607e416a543d5813d0aab7d7eae27af014a01aa74c503196056bd82eea708c844f1dcbba43f42d81a8a1c455727e6c93536fa6de367f8b92c23961ef1e9982f40c6b9caf1b46064515391dd1de308')  # Replace with your API key (or use OAuth)

    # Initialize Appwrite Databases service
    databases = Databases(client)
    parameters = context.req.body_json

    # Get parameters from the request
    action = parameters['action']
    my_database_id = '6760b9c20030df251f1c'
    my_collection_id = 'badgerBucks'
    user_id = parameters['userId']  # userId is used as the document_id
    data = parameters['badgerBucks']  # Data is for 'create' or 'update'

    try:
        if action == "create":
            created_document = databases.create_document(
                database_id=my_database_id,
                collection_id=my_collection_id,
                document_id=user_id,
                data=data,
                read=['*'],
                write=['*']
            )
            return context.res.json({"success": True, "document": created_document})

        elif action == "update":
            updated_document = databases.update_document(
                database_id=my_database_id,
                collection_id=my_collection_id,
                document_id=user_id,
                data=data
            )
            return context.res.json({"success": True, "document": updated_document})

        elif action == "get":
             try:
                document = databases.get_document(
                database_id=my_database_id,
                collection_id=my_collection_id,
                document_id=user_id
                )
        # Directly access `badgerBucks` in the document
                badger_bucks = document.get('badgerBucks', None)
        if badger_bucks is not None:
            return context.res.json({"success": True, "badgerBucks": badger_bucks})
        else:
            return context.res.json({"success": False, "message": "'badgerBucks' not found in document"})
    except Exception as e:
        return context.res.json({"success": False, "message": str(e)})

        else:
            return context.res.json({"success": False, "message": "Invalid action"})
    except Exception as e:
        return context.res.json({"success": False, "message": str(e)})
