import json
from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.services.databases import Databases
from appwrite.exception import AppwriteException
import os


endpoint = os.getenv("API_ENDPOINT")
key = os.getenv("API_KEY")
project = os.getenv("PROJECT_ID")


def main(context, userId, amount):
    client = (
        Client()
        .set_endpoint(endpoint)
        .set_project(key)
        .set_key(project)
    )
    users = Users(client)
    databases = Databases(client)

    try:
        if context == "get":
            result = databases.get_document('6760b9c20030df251f1c', 'badgerBucks', userId)
            return json.dumps({"badgerBucks": result['badgerBucks']})

        elif context == "set":
            databases.update_document(
                '6760b9c20030df251f1c', 'badgerBucks', userId,{"username": userId, "badgerBucks": amount})
            return json.dumps({"message": "BadgerBucks updated successfully."})

        elif context == "create":
            databases.create_document(
                '6760b9c20030df251f1c', 'badgerBucks', userId,
                {"username": userId, "badgerBucks": amount}
            )
            return json.dumps({"message": "BadgerBucks created successfully."})
        else:
            return json.dumps({"error": "Invalid context."})

    except AppwriteException as e:
        return json.dumps({"error": str(e)})
