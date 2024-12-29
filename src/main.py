import json
from appwrite.client import Client
from appwrite.services.databases import Databases
import os

apiKey = os.API_KEY
def main(context):
    client = (
        Client()
        .set_endpoint('https://cloud.appwrite.io/v1')
        .set_project('67609b010021900fc6e6')
        .set_key(apiKey)
    )
    databases = Databases(client)

    try:
        # Parse the context to get payload
        payload = json.loads(context['payload'])  # Extract payload from context
        context_action = payload.get("context")
        userId = payload.get("userId")
        amount = payload.get("amount")

        if not userId:
            return json.dumps({"error": "Missing userId in payload."})

        if context_action == "get":
            result = databases.get_document('6760b9c20030df251f1c', 'badgerBucks', userId)
            return json.dumps({"badgerBucks": result['badgerBucks']})

        elif context_action == "set":
            databases.update_document(
                '6760b9c20030df251f1c', 'badgerBucks', userId,
                {"username": userId, "badgerBucks": amount}
            )
            return json.dumps({"message": "BadgerBucks updated successfully."})

        elif context_action == "create":
            databases.create_document(
                '6760b9c20030df251f1c', 'badgerBucks', userId,
                {"username": userId, "badgerBucks": amount}
            )
            return json.dumps({"message": "BadgerBucks created successfully."})

        else:
            return json.dumps({"error": "Invalid context action provided."})

    except Exception as e:
        return json.dumps({"error": str(e)})
