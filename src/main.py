from appwrite.client import Client
from appwrite.services.databases import Databases

def main(req, res):
    # Initialize Appwrite client
    client = Client()
    client.set_endpoint('https://cloud.appwrite.io/v1')  # Replace with your Appwrite endpoint
    client.set_project('67609b010021900fc6e6')  # Replace with your project ID
    client.set_key('standard_a766a87da91bf274575dc294722839045769920a97a36eed295705391e817cad896c81e52c5dd654b6e7b3e6ec13bd16f3d607e416a543d5813d0aab7d7eae27af014a01aa74c503196056bd82eea708c844f1dcbba43f42d81a8a1c455727e6c93536fa6de367f8b92c23961ef1e9982f40c6b9caf1b46064515391dd1de308')  # Replace with your API key (or use OAuth)

    # Initialize Appwrite Databases service
    databases = Databases(client)

    # Get parameters from the request
    action = req.params.get("action")
    collection_id = 'badgerBucks'
    user_id = req.params.get("userId")  # userId is used as the document_id
    data = req.params.get("data")  # Data is for 'create' or 'update'

    if action == "create":
        created_document = databases.create_document(collection_id=collection_id,document_id=user_id,data=data, read=['*'],write=['*'])
        res.json({"success": True, "document": created_document})

    elif action == "update":
        # Update an existing document using userId as document_id
        updated_document = databases.update_document(collection_id=collection_id,document_id=user_id, data = data)
        res.json({"success": True, "document": updated_document})

    elif action == "get":
        # Get a document using userId as document_id
        document = databases.get_document(collection_id=collection_id,document_id=user_id)
        res.json({"success": True, "document": document})

    else:
        res.json({"success": False, "message": "Invalid action"})
